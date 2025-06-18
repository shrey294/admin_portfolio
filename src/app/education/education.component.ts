import { Component, OnInit } from '@angular/core';
import { ApiaboutmeService } from '../Services/apiaboutme.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  education:any[]=[];
  educationForm:FormGroup;
  Id: string | null = null;

  constructor(private Apiservice:ApiaboutmeService,private toastr:ToastrService,private fb:FormBuilder)
  {
    this.educationForm = this.fb.group({
      qualification:['',Validators.required],
      collegeName:['',Validators.required],
      duration:['',Validators.required],
      description:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.fetcheducation();
  }

  fetcheducation(){
    this.Apiservice.geteducation().subscribe({
      next:(data:any)=>{
        this.education = data;
        console.log(this.education);
        
      },
      error:(err)=>{
        this.toastr.error(err?.error?.message || 'Failed to load experience data', 'Error')
      }
    })
  }
  addEducation(){
    if(this.educationForm.invalid){
      this.educationForm.markAllAsTouched();
      return;
    }
    const educationData = this.educationForm.value;
    if(this.Id){
      const updateducation = {
        Id:+this.Id,
        qualification:educationData.qualification,
        collegeName:educationData.collegeName,
        duration:educationData.duration,
        description:educationData.description
      };
      this.Apiservice.updateeducation(updateducation).subscribe({
        next:(res)=>{
          this.toastr.success(res.message,'Success');
          this.educationForm.reset();
          this.Id = null;
          this.fetcheducation();
        },
        error:(err)=>{
          this.toastr.error(err?.error?.message || 'Failed to update experience', 'Error');
        }
      })
    }
    else{
      
    
    this.Apiservice.inserteducation(educationData).subscribe({
      next:(res)=>{
        this.toastr.success(res.message,'Success');
        this.educationForm.reset();
        this.fetcheducation();
      },
      error:(err)=>{
        this.toastr.error(err?.error?.message || 'Failed to add experience', 'Error');
      }
    });
  }
  }
  editeducation(exp:any){
    this.educationForm.patchValue({
      qualification:exp.qualification,
      collegeName:exp.collegeName,
      duration:exp.duration,
      description:exp.description
    });
    this.Id = exp.id;
  }
}