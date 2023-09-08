import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);
  constructor(private http:HttpClient,private cookieService: CookieService) { }

  login(request:LoginRequest): Observable<LoginResponse>{ 
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,request);
  }

  register(request:LoginRequest){
    return this.http.post<LoginRequest>(`${environment.apiBaseUrl}/api/auth/register`,request)
  }

  logout(){
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
  }

  setUser(user: User){
    localStorage.setItem("user-email",user.email);
    localStorage.setItem("user-roles",user.roles.join(','));
    this.$user.next(user);
  }

  user():Observable<User| undefined>{
    return this.$user.asObservable();
  }

  getUser():User | undefined{
    const email= localStorage.getItem('user-email');
    const roles= localStorage.getItem('user-roles');

    if(email && roles){
      const user:User={
        email:email,
        roles:roles.split(',')
      };
      return user;
    }
    return undefined;
  }
  
} 
