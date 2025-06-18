import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contact } from '../Models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  private readonly apiurl = 'https://localhost:7071/api/Contact_Deatils';

  private readonly apiurlenquiry = 'https://localhost:7071/api/enquiry';

  getcontactdetails() {
    return this.http.get(`${this.apiurl}/GetContactDetails`);
  }
  insertcontactdetails(contactDetail: contact) {
    return this.http.post(`${this.apiurl}/AddContact`, contactDetail);
  }
  updatedcontact(contactDetails:contact){
    return this.http.put(`${this.apiurl}/UpdateContact`,contactDetails);
  }
  getenquiry(){
    return this.http.get(`${this.apiurlenquiry}/getenquiry`);
  }
}
