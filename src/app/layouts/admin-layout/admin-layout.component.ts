import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  sidebarCollapsed = true;
userName = '';

constructor(private router:Router){}
  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userName = payload.unique_name || payload.given_name || payload.sub;
    }
  }

toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
