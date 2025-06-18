import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderDescriptionComponent } from './header-description/header-description.component';
import { authGuard } from './AuthGuard/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { TechstackComponent } from './techstack/techstack.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'headerdescription', component: HeaderDescriptionComponent },
      {path:'personaldetails',component:PersonaldetailsComponent},
      {path:'skills',component:SkillsComponent},
      {path:'experience',component:ExperienceComponent},
      {path:'education',component:EducationComponent},
      {path:'techstack',component:TechstackComponent},
      {path:'projects',component:ProjectsComponent},
      {path:'contactdetails',component:ContactdetailsComponent},
      {path:'enquiry',component:EnquiryComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
