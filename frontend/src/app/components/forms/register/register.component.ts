import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateUserDto } from 'src/app/interfaces/Dto/ICreateUserDto';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submit: boolean;
  user: ICreateUserDto;
  token: string;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthentificationService,
              private userService: UserService) {
    this.submit = false
  }

  get email(){
    return this.registerForm.get('email') as FormControl;
  }

  get username(){
    return this.registerForm.get('username') as FormControl;
  }

  get password(){
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPwd(){
    return this.registerForm.get('confirmPwd') as FormControl;
  }

  get terms(){
    return this.registerForm.get('terms') as FormControl;
  }

  ngOnInit() {
    this.token = this.authService.generateUniqueToken(10);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPwd: [null, [Validators.required]],
      terms: [null, [Validators.required]]
    }, {validators: [this.confirmPwdValidation, this.checkTermsValidation]})
  }
  // Custom Validation
  confirmPwdValidation(fg: AbstractControl): Validators{
    return fg.get('password').value === fg.get('confirmPwd').value ? null : { notMatched: true };
  }
  checkTermsValidation(fg: AbstractControl): Validators{
    return fg.get('terms').value === true ? null : { notChecked: true };
  }

  checkUniqueUsername(username: string): Boolean{
    return this.userService.checkUniqueUsername(username);
  }

  onRegister() {
    this.submit = true;

    const uniqueUsername = this.checkUniqueUsername(this.username.value);

    if(!uniqueUsername) return

    if(!this.registerForm.valid) return

    this.userService.postUser(this.userData());
    this.submit = false;

    this.router.navigate(['/']);
  }

  userData(): ICreateUserDto{
    return this.user = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      isVerified: 0,
      registerDate: new Date(),
      authToken: this.token,
      authKey: 0
    };
  }

}
