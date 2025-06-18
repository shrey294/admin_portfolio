import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectsService } from '../Services/projects.service';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  ProjectForm: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  isSubmitting = false;
  projects: Project[] = []; // Array to hold projects data
  isLoading = true;
  id: number = 0;
  isSubmittingdeelet = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiservice: ProjectsService
  ) {
    this.ProjectForm = this.fb.group({
      Link: ['', Validators.required],
      Title: ['', Validators.required],
      ShortDescription: ['', Validators.required],
      StackPill: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.fetchProjects();
  }
  fetchProjects() {
    this.isLoading = true;
    this.apiservice.getproject().subscribe({
      next: (data: any) => {
        this.projects = data.map((project: any) => ({
          id: project.id,
          title: project.title,
          shortDescription: project.shortDescription,
          link: project.link,
          imageUrl: project.imageurl,
          stackPill: project.stackPill
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to load projects data', 'Error');
        this.isLoading = false;
      }
    });
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        const preview = document.querySelector('.preview-image') as HTMLImageElement;
        if (preview) {
          preview.src = reader.result as string;
          preview.classList.remove('d-none');
        }
      };
      // Only call readAsDataURL if we have a file
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      // Clear preview if no file selected
      const preview = document.querySelector('.preview-image') as HTMLImageElement;
      if (preview) {
        preview.src = '';
        preview.classList.add('d-none');
      }
    }
  }

  onSubmit() {
    if (this.ProjectForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.', 'Error');
      return;
    }

    if (!this.selectedFile) {
      this.toastr.error('Please select a valid image file.', 'Error');
      return;
    }
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('Link', this.ProjectForm.get('Link')?.value);
    formData.append('Title', this.ProjectForm.get('Title')?.value);
    formData.append('ShortDescription', this.ProjectForm.get('ShortDescription')?.value);
    formData.append('StackPill', this.ProjectForm.get('StackPill')?.value);
    formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    if (this.id == 0) {
      this.apiservice.addproject(formData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Success');
          this.fetchProjects();
          this.ProjectForm.reset();
          this.selectedFile = null;
          this.fileInput.nativeElement.value = '';
          const preview = document.querySelector('.preview-image') as HTMLImageElement;
          if (preview) {
            preview.src = '';
            preview.classList.add('d-none');
          }
        },
        error: (err) => {
          this.toastr.error('Failed to submit. Please try again.', 'Error');
          console.error('Error:', err);
        },
        complete: () => {
          this.isSubmitting = false; // Hide loader when complete
        }
      });
    }
    else{
      this.apiservice.updateproject(this.id,formData).subscribe({
        next:(res:any)=>{
          this.toastr.success('Success',res.message);
          this.id=0;
          this.fetchProjects();
          this.ProjectForm.reset();
          this.selectedFile = null;
          this.fileInput.nativeElement.value = '';
          const preview = document.querySelector('.preview-image') as HTMLImageElement;
          if (preview) {
            preview.src = '';
            preview.classList.add('d-none');
          }
        },
        error: (err) => {
          this.toastr.error('Failed to submit. Please try again.', 'Error');
          console.error('Error:', err);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false; // Hide loader when complete
        }
      })
    }


  }
  fillcontrolls(project: any) {
    this.ProjectForm.patchValue({
      Link: project.link,
      Title: project.title,
      ShortDescription: project.shortDescription,
      StackPill: project.stackPill,

    });
    this.id = project.id;
  }
  delete(id:number){
    this.isSubmittingdeelet = true;
    this.apiservice.deleteproject(id).subscribe({
      next:(res:any)=>{
        this.toastr.success('Success',res.message);
        this.fetchProjects();
      },
      error: (err) => {
          this.toastr.error('Failed to submit. Please try again.', 'Error');
          console.error('Error:', err);
          this.isSubmittingdeelet = false;
        }
    })
  }
}