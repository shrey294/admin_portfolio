import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http:HttpClient) { }

  private readonly apiurl = 'https://shreygandhi.bsite.net/api/Projects';

  getproject(){
    return this.http.get(`${this.apiurl}/GetProjectList`);
  }
  addproject(formData:FormData){
    return this.http.post(`${this.apiurl}/AddProject`,formData);
  }
  updateproject(id:number,formData:FormData){
    return this.http.put(`${this.apiurl}/updateproject/${id}`,formData);
  }
  deleteproject(id:number){
    return this.http.delete(`${this.apiurl}/deleteproject/${id}`);
  }
}
