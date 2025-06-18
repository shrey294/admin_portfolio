import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../Services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactdetails',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contactdetails.component.html',
  styleUrl: './contactdetails.component.css'
})
export class ContactdetailsComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  id: number = 0;

  constructor(private apiservice: ContactService, private toastr: ToastrService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      location: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      githubUrl: ['', Validators.required],
      intsaUrl: ['', Validators.required],
      linkedInUrl: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.fetchconatct();
  }

  fetchconatct() {
  this.apiservice.getcontactdetails().subscribe({
    next: (data: any) => {
      console.log(data);
      
      // Check if data is an array and has at least one item
      if (Array.isArray(data) && data.length > 0) {
        const firstContact = data[0]; // Get the first contact from the array
        this.contactForm.patchValue({
          location: firstContact.location,
          email: firstContact.email,
          phone: firstContact.phone,
          githubUrl: firstContact.githubUrl,
          intsaUrl: firstContact.intsaUrl,
          linkedInUrl: firstContact.linkedInUrl
        });
        this.id = firstContact.id;
      }
    },
    error: (err) => {
      this.toastr.error(err?.error?.message || 'Failed to add experience', 'Error');
    }
  });
}
  // savecontact() {
  //   const contactdata = this.contactForm.value;
  //   this.apiservice.insertcontactdetails(contactdata).subscribe({
  //     next: (res: any) => {
  //       this.toastr.success(res.message, 'Success');
  //       this.contactForm.reset();
  //       this.fetchconatct();
  //     },
  //     error: (err) => {
  //       this.toastr.error(err?.error?.message || 'Failed to insert contact', 'Error');

  //     }
  //   })
  // }
  savecontact() {
    this.isSubmitting = true;
    if (this.contactForm.invalid) {
      this.toastr.warning('Please fill all required fields', 'Validation');
      return;
    }

    const contactdata = this.contactForm.value;

    if (this.id == 0) {
      this.apiservice.insertcontactdetails(contactdata).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          this.toastr.success(res.message, 'Success');
          //this.contactForm.reset();
          this.fetchconatct();
        },
        error: (err) => {
          this.isSubmitting = false;
          
          this.toastr.error(err?.error?.message || 'Failed to insert contact', 'Error');
        }
      });
    }
    else{
      this.apiservice.updatedcontact(contactdata).subscribe({
        next:(res:any)=>{
          this.isSubmitting = false;
          this.toastr.success(res.message, 'Success');
          //this.contactForm.reset();
          this.fetchconatct();
        },
        error: (err) => {
          this.isSubmitting = false;
          
          this.toastr.error(err?.error?.message || 'Failed to updated contact', 'Error');
        }
      })
    }
  }

}
