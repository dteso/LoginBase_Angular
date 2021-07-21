import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
   }

  ngOnInit(): void {
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

      });
      this.loginForm.reset();
    }
    return;
  }

}
