import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';

interface Auth{
  name: String;
  password: String;
  email: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginUser: Auth;
  socialUser: SocialUser;
  isLoggedin: boolean;
  isGoogleLoggedin: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly storage: StorageService,
    private readonly socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isGoogleLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

  register(){
    if(!this.loginForm.invalid){
      this.loginUser = {
        name: this.loginForm.controls.user.value,
        password: this.loginForm.controls.password.value,
        email: this.loginForm.controls.email.value
      }
      console.info(this.loginUser);
      this.apiService.post("users",this.loginUser).subscribe( res=> {
        console.log(res);
        this.isLoggedin=true;
      });
      this.loginForm.reset();
    }
    return;
  }


  login(){
    if(!this.loginForm.invalid){
      this.loginUser = {
        name: this.loginForm.controls.user.value,
        password: this.loginForm.controls.password.value,
        email: this.loginForm.controls.email.value
      }
      console.info(this.loginUser);
      this.apiService.post("login",this.loginUser).subscribe( res=> {
        console.log(res);
        this.storage.setItem("USER",res);
        this.isLoggedin = true;
      }, (error)=>{
        console.log(`Error: >>> ${error}`);
      });
      this.loginForm.reset();
    }
    return;
  }

  logout(): void {
    this.storage.clear('USER');
    this.isLoggedin = false;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.isGoogleLoggedin=true;
  }

  logOutGoogle(): void {
    this.socialAuthService.signOut();
    this.isGoogleLoggedin=false;
  }

}
