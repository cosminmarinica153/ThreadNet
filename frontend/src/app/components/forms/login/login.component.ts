import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submit: boolean;
  accountFound: boolean;

  constructor(private router: Router, private fb: FormBuilder,
              private userService: UserService, private authService: AuthentificationService) 
    { this.submit = false;
      this.accountFound = true;
    }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onLogin(){
    const user = this.authService.authUser(this.loginForm.value);

    if(this.authService.login(user)){
      this.accountFound = true;
      this.router.navigate(['/']);
    } else
      this.accountFound = false;

    this.submit =  true;
  }
}
