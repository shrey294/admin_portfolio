import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
sidebarCollapsed = true;
userName = 'John Doe';

constructor(private router:Router){}

 toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
