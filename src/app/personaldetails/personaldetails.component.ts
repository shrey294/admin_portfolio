import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiaboutmeService } from '../Services/apiaboutme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personaldetails',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personaldetails.component.html',
  styleUrl: './personaldetails.component.css'
})
export class PersonaldetailsComponent implements OnInit {
  form: FormGroup;
  id:number | null=null;
  imageurl: string | null = null; // Stores the API image URL
  imagePreview: string | null = null;
  imageFile: File | null = null;
imageTouched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiservice: ApiaboutmeService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      Description: ['', [Validators.required, Validators.minLength(10)]],
      Experience: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      imageFile: [null, Validators.required]
    });
  }
  ngOnInit(): void {
   this.fetchintrodata()
  }

  fetchintrodata():void{
    this.apiservice.getintro().subscribe({
      next:(data:any)=>{
        console.log(data);
        this.id = data.id;
        this.imageurl = data.imageurl;
        this.form.patchValue({
          Description:data.description || '',
          Experience:data.experience
        })
      },
      error:(err)=> {
        this.toastr.error(err?.error?.message || 'Failed to load header data', 'Error');
      },
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Get the actual File object
    
    if (file && file instanceof File) {
      this.form.patchValue({
        imageFile: file // Store the File object
      });
      this.form.get('imageFile')?.markAsTouched();
      // console.log('imageFile control value after patch:', this.form.get('imageFile')?.value); // Debug: Verify form control
    } else {
      this.form.patchValue({
        imageFile: null // Reset if no file is selected
      });
      this.form.get('imageFile')?.markAsTouched();
      console.log('No valid file selected, imageFile reset to null');
    }
  }

  onSubmit(): void {
    
    if (this.form.invalid) {
      this.toastr.error('Please fill out all required fields correctly.', 'Error');
      this.form.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    const formData = new FormData();
    formData.append('Description', this.form.get('Description')?.value);
    formData.append('Experience', this.form.get('Experience')?.value);

    const imageFile = this.form.get('imageFile')?.value;
    if (imageFile instanceof File) {
      formData.append('imageFile', imageFile, imageFile.name); // Include filename
      // console.log('Appending file to FormData:', imageFile.name); // Debug: Confirm file append
    } else {
      console.warn('No valid file selected for imageFile');
      this.toastr.error('Please select a valid image file.', 'Error');
      return;
    }

    if(this.id){
      this.apiservice.updateintro(this.id,formData).subscribe({
        next:(res)=>{
          this.toastr.success(res.message,'Success');
          this.fetchintrodata();
        },
        error:(err)=>{
          this.toastr.error(err?.error?.message || 'Update failed', 'Error')
        }
      });
    }
    else{
      this.apiservice.insertintro(formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, 'Success');
        this.form.reset();
      },
      error: (err) => {
        this.toastr.error('Failed to submit. Please try again.', 'Error');
        
      }
    });
    }

    
  }
}