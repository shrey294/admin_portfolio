import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../Services/skills.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-techstack',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './techstack.component.html',
  styleUrls: ['./techstack.component.css']
})
export class TechstackComponent implements OnInit {
  skillsList: any[] = [];
  skillForm: FormGroup<{
    title: FormControl<string>;
    pillText: FormControl<string>;
    imageUrl: FormControl<string>;
  }>;
  id: number;
  submitted = false;

  constructor(
    private apiservice: SkillsService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.id = 0;
    this.skillForm = this.fb.group({
      title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      pillText: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      imageUrl: this.fb.control('', { nonNullable: true, validators: [Validators.required] })
    });

  }

  ngOnInit(): void {
    this.fetchskills();
  }

  fetchskills() {
    this.apiservice.getskills().subscribe({
      next: (data) => {
        this.skillsList = data as any[];
        console.log(this.skillsList);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to load skills data', 'Error');
      }
    });
  }

  getMainSkill(pillText: string): string {
    return pillText ? pillText.split(',')[0] : '';
  }

  getsubskills(pillText: string): string[] {
    return pillText ? pillText.split(',').slice(1) : [];
  }

  onSubmit() {
    this.submitted = true;
    if (this.skillForm.invalid) return;
    const skill = this.skillForm.getRawValue();
    if (this.id == 0) {

      this.apiservice.addskills(skill).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Success');
          this.skillForm.reset;
          this.fetchskills();
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Insert failed', 'Error');
        }
      });
    }
    else {
      this.apiservice.updateskill(this.id,skill).subscribe({
        next:(res:any)=>{
          this.toastr.success(res.message,'Success');
          this.skillForm.reset;
          this.fetchskills();
          this.id = 0;
        },
        error:(err)=>{
          this.toastr.error(err?.error?.message || 'update failed', 'Error');
        }
      })
    }


  }

  onReset() {
    this.submitted = false;
    this.skillForm.reset();
  }
  filldata(skill:any){
    this.skillForm.patchValue({
      title:skill.title,
      pillText:skill.pillText,
      imageUrl:skill.imageurl,
    });
    this.id = skill.id;
  }
  deleteskill(id:number){
    this.apiservice.deleteskill(id).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message,'Success');
        this.fetchskills();
      },
      error:(err)=>{
        this.toastr.error(err?.error?.message || 'Insert failed', 'Error');
      }
    })
  }
}