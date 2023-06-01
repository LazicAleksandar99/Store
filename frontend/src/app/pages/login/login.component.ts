import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private toastr : ToastrService) { }

  ngOnInit() {
    this.createLoginForm()
  }

  
  createLoginForm(){
    this.formLogin = this.fb.group({
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required,Validators.minLength(8)]]
    })
  }

  Login(){
    console.log('RADI')
    if (this.formLogin.valid) {    console.log('RADI2')

      this.userService.login(this.formLogin.value).subscribe(
        (token: any) => {
          console.log('USAo')
          localStorage.setItem("token", token as string);
          this.toastr.success('Welcome', 'Succes!', {
            timeOut: 3000,
            closeButton: true,
          });
          this.router.navigateByUrl('/dashboard/main');
        },
        err => {
          console.log(err);
            this.toastr.error("Invalid email or password, try again", 'Error!' , {
              timeOut: 3000,
              closeButton: true,
            });
        }
      );
    }
  }

  Register(){
    this.router.navigateByUrl('/login')
  }
  get email() {
    return this.formLogin.get('email') as FormControl;
  }
  get password() {
    return this.formLogin.get('password') as FormControl;
  }
}
