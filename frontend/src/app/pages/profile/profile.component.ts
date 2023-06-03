import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdatedUser, User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formUpdate!: FormGroup;
  user!: User;
  selectedProfilePicture!: File;
  updatedUser!: UpdatedUser;

  constructor(private route: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private tokenService: TokenService) {
    }

  ngOnInit() {      
    this.createUpdateForm(); 
    this.getUser();
  }

  createUpdateForm() {
    this.formUpdate = this.fb.group({
      username: [null,Validators.required],
      email: [null,[Validators.required,Validators.email]],
      firstname: [null,[Validators.required,Validators.minLength(3)]],
      lastname: [null,[Validators.required,Validators.minLength(3)]],
      birthday: [null,[Validators.required]],
      address: [null,[Validators.required]],
      oldpassword: [""],
      newpassword: [""],
    });
  }

  isFormValid(): boolean {
    return this.formUpdate.controls['username'].valid &&
      this.formUpdate.controls['email'].valid &&
      this.formUpdate.controls['firstname'].valid &&
      this.formUpdate.controls['lastname'].valid &&
      this.formUpdate.controls['birthday'].valid &&
      this.formUpdate.controls['address'].valid;
  }

  onPictureChanged(imageInput: any){
    this.selectedProfilePicture = imageInput.files[0];
  }

  Update(){
    if (this.isFormValid()) {
        this.userService.update(this.updatedUserData()).subscribe(
          data=>{
            this.toastr.success('Successfully updated', 'Succes!', {
              timeOut: 3000,
              closeButton: true,
            });
          }, error =>{
            this.toastr.error("Invalid input", 'Error!' , {
              timeOut: 3000,
              closeButton: true,
            });
          }

        );

    }
    else{
      this.toastr.error("Invalid input", 'Error!' , {
        timeOut: 3000,
        closeButton: true,
      });
    }
  }

  updatedUserData(): UpdatedUser {
    return this.updatedUser = {
        id: this.tokenService.getUserId(localStorage.getItem('token') as string),
        username: this.username.value,
        email: this.email.value,
        firstName: this.firstname.value,
        lastName: this.lastname.value,
        birthday: this.formUpdate.value['birthday'],
        address: this.address.value,
        oldpassword: this.oldpassword.value,
        newpassword: this.newpassword.value,
        picture: this.selectedProfilePicture
    };
  }

  getUser(){
    this.userService.getUser(this.tokenService.getUserId(localStorage.getItem('token') as string)).subscribe(
      data=>{
        this.user = data as User;
        this.formUpdate.patchValue({
          username: this.user.username,
          email: this.user.email,
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          address: this.user.address,
        });
        this.formUpdate.controls['birthday'].setValue(formatDate(this.user.birthday,'yyyy-MM-dd','en'));
      }, error =>{
        console.log('Error occurred at show-user-profile.component.ts')
      }

    );
  }

  get username() {
    return this.formUpdate.get('username') as FormControl;
  }
  get email() {
    return this.formUpdate.get('email') as FormControl;
  }
  get firstname() {
    return this.formUpdate.get('firstname') as FormControl;
  }
  get lastname() {
    return this.formUpdate.get('lastname') as FormControl;
  }
  get address() {
    return this.formUpdate.get('address') as FormControl;
  }
  get oldpassword() {
      return this.formUpdate.get('oldpassword') as FormControl;
  }
  get newpassword() {
      return this.formUpdate.get('newpassword') as FormControl;
  }
}
