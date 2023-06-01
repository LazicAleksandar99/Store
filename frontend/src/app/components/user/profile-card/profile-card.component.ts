import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  user!: User;

  constructor(private tokenService: TokenService,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(){
    this.userService.getUser(this.tokenService.getUserId(localStorage.getItem('token') as string)).subscribe(
      data=>{
        this.user = data as User;
      }, error =>{
        console.log('Error occurred at profile-card.component.ts')
      }

    );
  }
}
