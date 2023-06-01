import { Injectable } from '@angular/core';
import { TokenAuthorization } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenInformation!: TokenAuthorization;

constructor() { }

  getUserId(token: string): number{
    this.tokenInformation = JSON.parse(atob(token.split('.')[1]));
    return Number(this.tokenInformation.nameid);
  }

  getTokenInformation(token: string): TokenAuthorization {
    if(token){
      return JSON.parse(atob(token.split('.')[1])) as TokenAuthorization;
    }
    else {
      let noToken: TokenAuthorization = {
        unique_name: "0",
        nameid: "0",
        role: "0"
      }
      return noToken;
    }
  }
}
