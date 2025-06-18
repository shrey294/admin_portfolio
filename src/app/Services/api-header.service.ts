import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { header } from '../Models/header.model';

@Injectable({
  providedIn: 'root'
})
export class ApiHeaderService {

  constructor(private http:HttpClient) { }
  
  private readonly apiurl='https://localhost:7071/api/Admin_header_CRUD';

  insertHeader(data: header): Observable<any>{
    return this.http.post(`${this.apiurl}/Insert`,data);
  }

  GetHeader(){
    return this.http.get(`${this.apiurl}/Header`);
  }
  Updatedheader(id:number,data:header):Observable<any>{
     console.log('Sending update:', { id, data });
    return this.http.put(`${this.apiurl}/update/${id}`, data);
  }
}
