import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { skillinsert } from '../Models/myskills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  private readonly apiurl = 'https://shreygandhi.bsite.net/api/Skills';

  getskills() {
    return this.http.get(`${this.apiurl}/GetSkills`);
  }
  addskills(skill:skillinsert){
    return this.http.post(`${this.apiurl}/Insertskills`,skill);
  }
  updateskill(id:number,skill:skillinsert){
    return this.http.put(`${this.apiurl}/UpdatedSkills/${id}`,skill);
  }
  deleteskill(id:number){
    return this.http.delete(`${this.apiurl}/deleteskill/${id}`);
  }
}
