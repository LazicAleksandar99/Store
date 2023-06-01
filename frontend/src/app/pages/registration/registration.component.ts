import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegisteration!: FormGroup ;

  constructor(private router: Router,
              private fb: FormBuilder,) { }

  ngOnInit() {
    this.createRegisterationForm();
  }

  
  createRegisterationForm() {
    this.formRegisteration = this.fb.group({
      username: ["badname",Validators.required],
      firstName: ["Andrew",[Validators.required,Validators.minLength(3)]],
      lastName: ["Tate",[Validators.required,Validators.minLength(3)]],
      email: ["tate@tate.com",[Validators.required,Validators.email]],
      birthday: ["2003-05-05",[Validators.required]],
      address: ["Strazilovska",[Validators.required]],
      password: ["password", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["password", Validators.required],
    },{validators: this.passwordMatchingValidatior});
  }

  Register(role: string){

  }

  Login(){
    this.router.navigateByUrl('/register')
  }

  get username() {
    return this.formRegisteration.get('username') as FormControl;
  }
  get email() {
    return this.formRegisteration.get('email') as FormControl;
  }
  get firstName() {
    return this.formRegisteration.get('firstName') as FormControl;
  }
  get lastName() {
    return this.formRegisteration.get('lastName') as FormControl;
  }
  get address() {
    return this.formRegisteration.get('address') as FormControl;
  }
  get password() {
      return this.formRegisteration.get('password') as FormControl;
  }
  get confirmPassword() {
      return this.formRegisteration.get('confirmPassword') as FormControl;
  }

  
  passwordMatchingValidatior(fg: FormGroup): Validators {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? true : {notmatched: true};
}
}
