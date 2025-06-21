import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TokenApi } from '../Models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='https://shreygandhi.bsite.net/api/User';
  constructor(private http:HttpClient) { }

  login(credentials:{userName:string; password:string}): Observable<TokenApi>{
    return this .http.post<TokenApi>(`${this.apiUrl}/authenticate`, credentials);
  }

  refreshToken(): Observable<TokenApi | null>{
    const refreshData = {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken()
    };

    return this.http.post<TokenApi>(`${this.apiUrl}/refresh`,refreshData).pipe(
     map(res=>{
      this.saveTokens(res.accessToken, res.refreshToken);
      return res;
     }),
     catchError(()=> of (null))
    );
  }

  saveTokens(accessToken:string, refreshToken:string){
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('refreshToken',refreshToken);
  }
  getAccessToken():string | null{
    return localStorage.getItem('accessToken');
  }
  getRefreshToken():string|null{
    return localStorage.getItem('refreshToken');
  }
  logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  isTokenExpired(token:string):boolean{
    if(!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now()/1000);
    return exp<now;
  }
}
