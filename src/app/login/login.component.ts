import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService:AuthService, private router:Router){}
  

  onLogin(){
      this.loading = true; 
    this.authService.login({userName:this.userName,password:this.password}).subscribe({
      next:(res)=>{
        this.authService.saveTokens(res.accessToken,res.refreshToken);
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error:(err)=>{
        this.errorMessage = err.error.message || 'Login Failed';
        this.loading = false;
      }
    })
  }
}
