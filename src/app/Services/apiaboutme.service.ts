import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill, SkillMst, SkillResponse } from '../Models/skills.model';
import { experience, newexperience } from '../Models/experience.model';
import { education, updateeducation } from '../Models/education.model';

@Injectable({
  providedIn: 'root'
})
export class ApiaboutmeService {

  constructor(private http:HttpClient) { }

  private readonly apiurl = 'https://shreygandhi.bsite.net/api/About_me';

  insertintro(formData:FormData){
    return this.http.post(`${this.apiurl}/Addintro`,formData);
  }
  getintro(){
    return this.http.get(`${this.apiurl}/Getbasicintro`);
  }
  updateintro(id:number,formData:FormData):Observable<any>{
    return this.http.put(`${this.apiurl}/updateintro/${id}`,formData);
  }
  getskills(){
    // return this.http.get(`${this.apiurl}/getskills`);
    return this.http.get<SkillResponse[]>(`${this.apiurl}/getskills`);
  }
  insertskill(skills:SkillMst[]):Observable<any>{
    return this.http.post(`${this.apiurl}/addskills`,skills);
  }
  updateskill(skills:SkillResponse[]):Observable<any>{
    return this.http.put(`${this.apiurl}/updateskills`,skills);
  }
  getexperience(){
    return this.http.get(`${this.apiurl}/getexperience`);
  }
  insertexperience(experience:experience):Observable<any>{
    return this.http.post(`${this.apiurl}/insertexperience`,experience);
  }
  updateexperience(experience:newexperience):Observable<any>{
    return this.http.put(`${this.apiurl}/updateexperience`,experience);
  }
  geteducation(){
    return this.http.get(`${this.apiurl}/geteducation`);
  }
  inserteducation(education:education):Observable<any>{
    return this.http.post(`${this.apiurl}/inserteducation`,education);
  }
  updateeducation(education:updateeducation):Observable<any>{
    return this.http.put(`${this.apiurl}/updateeducation`,education);
  }
}
