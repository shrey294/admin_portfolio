import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Skill, SkillMst, SkillResponse } from '../Models/skills.model';
import { ApiaboutmeService } from '../Services/apiaboutme.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillCounter = 0;
  constructor(private apiService: ApiaboutmeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchskills()
  }
  fetchskills() {
    this.apiService.getskills().subscribe({
      next: (data: SkillResponse[]) => {
        //console.log(data);
        this.skills = data.map((s, index) => ({
          id: s.id,
          name: s.skillName,
          value: s.skillPercantage,
          isEditable: false
        }));
        this.skillCounter = this.skills.length;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to load skills data', 'Error')
      }
    })
  }

  
  addSkill() {
  this.skills.forEach(skill => skill.isEditable = false);

  this.skills.push({
    name: 'New Skill',
    value: 50,
    isEditable: true,
    isNew: true
  });
}

  removeSkill(id: number) {
    this.skills = this.skills.filter(skill => skill.id !== id);
  }
  enableEdit(skill: Skill) {
  this.skills.forEach(s => s.isEditable = false);
  skill.isEditable = true;
}

  updateSkillValue(skill: Skill, event: Event) {
  const input = event.target as HTMLInputElement;
  skill.value = +input.value;
  skill.isModified = true;
}
disableEdit(skill: Skill) {
  skill.isEditable = false;
  skill.isModified = true;
}

//   saveSkills() {
// //alert(123);
//     // const payload: SkillMst[] = this.skills.map(s=>({
//     //   // id:s.id,
//     //   skillName:s.name,
//     //   skillPercantage:s.value
//     // }));

//     // this.apiService.insertskill(payload).subscribe({
//     //   next:(res)=>{
//     //      this.skills.forEach(skill => skill.isEditable = false);
//     //     this.toastr.success(res.message,'Success');
//     //   },
//     //   error:(err)=>{
//     //     this.toastr.error(err?.error?.message || 'Failed to save skills', 'Error');
//     //   }
//     // })
    
//     const newSkills: SkillMst[] = this.skills.filter(s => !s.id || s.id === 0).map(s => ({
//       skillName: s.name,
//       skillPercantage: s.value
//     }));

//     const updatedSkills: SkillResponse[] = this.skills.filter(s => s.id && s.id !== 0 && s.isEditable).map(s => ({
//       id: s.id,
//       skillName: s.name,
//       skillPercantage: s.value
//     }));
// console.log(newSkills.length);
// console.log(updatedSkills.length);
//     if (newSkills.length > 0) {
//       this.apiService.insertskill(newSkills).subscribe({
//         next: (res) => {
//           this.toastr.success(res.message, 'Success');
//           this.fetchskills();
//         },
//         error: (err) => {
//           this.toastr.error(err?.error?.message || 'Failed to save skills', 'Error');
//         }
//       });
//     }
//     if (updatedSkills.length > 0) {
//       this.apiService.updateskill(updatedSkills).subscribe({
//         next: (res) => {
//           this.toastr.success(res.message, 'Success');
//           this.fetchskills();
//         },
//         error: (err) => {
//           this.toastr.error(err?.error?.message || 'Failed to save skills', 'Error');
//         }
//       })
//     }
//   }
saveSkills() {
  const newSkills: SkillMst[] = this.skills
    .filter(s => s.isNew)
    .map(s => ({
      skillName: s.name,
      skillPercantage: s.value
    }));

  const updatedSkills: SkillResponse[] = this.skills
    .filter(s => !s.isNew && s.id && s.isModified)
    .map(s => ({
      id: s.id!,
      skillName: s.name,
      skillPercantage: s.value
    }));

  if (newSkills.length > 0) {
    this.apiService.insertskill(newSkills).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Inserted');
        this.fetchskills(); // Refresh to get IDs and reset flags
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Insert failed', 'Error');
      }
    });
  }

  if (updatedSkills.length > 0) {
    this.apiService.updateskill(updatedSkills).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Updated');
        this.fetchskills();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Update failed', 'Error');
      }
    });
  }
}

}