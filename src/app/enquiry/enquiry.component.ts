import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent implements OnInit {
   enquiries: any[] = []; 
  constructor(private apiservice:ContactService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.fetchenquiry();
  }

  fetchenquiry(){
    this.apiservice.getenquiry().subscribe({
      next:(data)=>{
        this.enquiries = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
          this.toastr.error(err?.error?.message || 'Failed to load enquiry', 'Error');
        }
    })
  }
}
