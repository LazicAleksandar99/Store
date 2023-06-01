import { Component, OnInit } from '@angular/core';
import { TokenAuthorization } from 'src/app/models/token';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole!: string;
  
  constructor(private tokenService: TokenService) {

    this.userRole = (this.tokenService.getTokenInformation(localStorage.getItem('token') as string) as TokenAuthorization).role;
   }

  ngOnInit() {
  }

}
