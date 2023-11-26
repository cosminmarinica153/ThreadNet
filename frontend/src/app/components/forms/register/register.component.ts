import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { generate } from 'randomstring';

import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submit: boolean;
  user: IUser;
  user_id: number;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { 
    this.submit = false 
    this.user_id = userService.getLastId();
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

    this.userService.addUser(this.userData());
    this.submit = false;

    this.router.navigate(['/']);
  }

  userData(): IUser{
    return this.user = {
      id: this.user_id,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      is_verified: false,
      register_date: "01-01-2001",
      auth_token: "222",
      auth_key: 1
    };
  }

}
