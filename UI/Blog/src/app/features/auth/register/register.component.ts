import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../models/login-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model:RegisterRequest;
  registermodel:LoginRequest

  constructor(private authService : AuthService, private router : Router) {
    this.model ={
      email: '',
      password: '',
      confirmpassword:''
    }

    this.registermodel={
      email:'',
      password:''
    }
  }
 
  onFormSubmit(){
    if(this.model.password== this.model.confirmpassword){
      this.registermodel={
        email:this.model.email,
        password:this.model.password
      }
      this.authService.register(this.registermodel).subscribe({
        next:(response)=>{
          // redirect to home page
          this.router.navigateByUrl('/');
        }
      })
      
    }
    else{
      alert("password doesn't match")
    }
  }
}
