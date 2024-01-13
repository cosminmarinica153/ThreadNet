import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, map, tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
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

  loginUrl: string;

  constructor(private router: Router, private fb: FormBuilder,
              private authService: AuthentificationService, private http: HttpClient)
    {
      this.submit = false;
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
    this.authService.authUser(this.loginForm.get('username').value, this.loginForm.get('password').value).pipe(
    tap((data: IUser) => {
      if(this.authService.login(data)){
        this.accountFound = true;
      } else
        this.accountFound = false;

      this.submit =  true;
    }),
    finalize(() => {
      this.router.navigate(['/']).then(() => { window.location.reload() });
    })).subscribe();
  }
}
