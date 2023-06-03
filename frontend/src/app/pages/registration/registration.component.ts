import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationInfo } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegisteration!: FormGroup ;
  newUser!: RegistrationInfo;
  selectedProfilePicture!: File;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,) { }

  ngOnInit() {
    this.createRegisterationForm();
  }

  
  createRegisterationForm() {
    this.formRegisteration = this.fb.group({
      username: ["badname123",Validators.required],
      firstName: ["Andrew",[Validators.required,Validators.minLength(3)]],
      lastName: ["Tate",[Validators.required,Validators.minLength(3)]],
      email: ["tat123e@tate.com",[Validators.required,Validators.email]],
      birthday: ["2003-05-05",[Validators.required]],
      address: ["Strazilovska",[Validators.required]],
      password: ["password", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["password", Validators.required],
    },{validators: this.doPasswordsMatchValidatior});
  }

  onPictureChanged(imageInput: any){
    this.selectedProfilePicture = imageInput.files[0];
  }

  Register(role: string){
    if (this.formRegisteration.valid) {
      if(this.selectedProfilePicture){
        this.userService.register(this.newUserInfo(role)).subscribe(
          data=>{
            this.toastr.success('Registred successfully!', 'Succes!', {
              timeOut: 3000,
              closeButton: true,
            });
            this.router.navigate(['/login']);
          }, error =>{
            this.toastr.error("Invalid input", 'Error!' , {
              timeOut: 3000,
              closeButton: true,
            });
          }

        );
      }
      else{
        this.toastr.error("Select Picture", 'Error!' , {
          timeOut: 3000,
          closeButton: true,
        });
      }
    }
    else{
      this.toastr.error("Invalid input", 'Error!' , {
        timeOut: 3000,
        closeButton: true,
      });
    }
  }

  Login(){
    this.router.navigateByUrl('/register')
  }

  newUserInfo(userRole: string): RegistrationInfo {
    return this.newUser = {
        username: this.username.value,
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        birthday: this.formRegisteration.value['birthday'],
        address: this.address.value,
        role: userRole,
        password: this.password.value,
        picture: this.selectedProfilePicture
    };
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

  
  doPasswordsMatchValidatior(fg: FormGroup): Validators {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? true : {notmatched: true};
}
}
