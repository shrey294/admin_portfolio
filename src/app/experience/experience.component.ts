import { Component, OnInit } from '@angular/core';
import { ApiaboutmeService } from '../Services/apiaboutme.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];
  experienceForm: FormGroup;
  Id: string | null = null;

  constructor(
    private apiservice: ApiaboutmeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.experienceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.fetchexperience();
  }

  fetchexperience() {
    this.apiservice.getexperience().subscribe({
      next: (data: any) => {
        this.experiences = data;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to load experience data', 'Error')
      }
    });
  }

  addExperience() {
    if (this.experienceForm.invalid) {
      this.experienceForm.markAllAsTouched();
      return;
    }
    const experienceData = this.experienceForm.value;
    if (this.Id) {
        // update record

        const updateexperience = {
          Id: +this.Id,
          title: experienceData.title,
          companyName:experienceData.companyName,
          duration:experienceData.duration,
          description:experienceData.description
        };
        this.apiservice.updateexperience(updateexperience).subscribe({
          next:(res)=>{
            this.toastr.success(res.message,'Success');
            this.experienceForm.reset();
            this.Id = null;
            this.fetchexperience();
          },
          error:(err)=>{
            this.toastr.error(err?.error?.message || 'Failed to update experience', 'Error');

          }
        });
    }
    else {
      
      this.apiservice.insertexperience(experienceData).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'Success');
          this.experienceForm.reset();
          this.fetchexperience();
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Failed to add experience', 'Error');
        }
      })
    }

  }
  editExperience(exp: any) {
    this.experienceForm.patchValue({
      title: exp.title,
      companyName: exp.companyName,
      duration: exp.duration,
      description: exp.description
    });
    this.Id = exp.id;
  }
}