import { Component, OnInit } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { header } from '../Models/header.model';
import { ApiHeaderService } from '../Services/api-header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-description',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,EditorModule],
  templateUrl: './header-description.component.html',
  styleUrl: './header-description.component.css'
})
export class HeaderDescriptionComponent implements OnInit {
  form:FormGroup;
  loading = false;
  id: number | null = null;

  constructor(private fb:FormBuilder, private apiService: ApiHeaderService, private toastr:ToastrService){
    this.form = this.fb.group({
      initials:['',Validators.required],
      name:['',Validators.required],
      designation:['',Validators.required],
      ShortDescription:['',Validators.required],
      icons:['',Validators.required],
    });
  }
  
  onSubmit() {
  if (this.form.valid) {
    
    this.loading = true;
    const formData: header = this.form.value;

    if (this.id) {
      // Update mode
      this.apiService.Updatedheader(this.id, formData).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'Success');
          this.loading = false;
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Update failed', 'Error');
          this.loading = false;
        }
      });
    } else {
      // Insert mode
      this.apiService.insertHeader(formData).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'Saved');
          this.loading = false;
          this.form.reset();
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Insert failed', 'Error');
          this.loading = false;
        }
      });
    }
  } else {
    this.form.markAllAsTouched();
  }
}

  ngOnInit(): void {
  this.fetchHeaderData();
}
fetchHeaderData(): void {
  this.apiService.GetHeader().subscribe({
    next:(data:any)=>{
      // console.log(data);
       if (data && data.length > 0) {
        const headerData = data[0]; // ✅ access first object
         this.id = headerData.id;
        this.form.patchValue({
          initials: headerData.initials || '',
          name: headerData.name || '',
          designation: headerData.designation || '',
          ShortDescription: headerData.shortDescription || '',
          icons: headerData.icons || ''
        });
      }
    },
    error:(err)=>{
      this.toastr.error(err?.error?.message || 'Failed to load header data', 'Error');
    }
  })
}
}
