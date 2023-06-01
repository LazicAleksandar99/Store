import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginInfo, RegistrationInfo, UpdatedUser, VerifyOrDeny } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from './headers.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,
              private headersService: HeadersService) { }

  login(login: LoginInfo){
      return this.http.post(this.baseUrl + '/api/user/login', login, this.headersService.getHttpHeaderNoToken());
  }

  register(newUser: RegistrationInfo){
    return this.http.post(this.baseUrl + '/api/user/register', newUser, this.headersService.getHttpHeaderNoToken());
  }
  
  update(updatedUser: UpdatedUser){
    return this.http.patch(this.baseUrl + '/api/user/update', updatedUser, this.headersService.getHttpHeaderWithToken());
  }


  verify(id: number, action: string){
    const verification: VerifyOrDeny = {
      action: action
    }
    return this.http.patch(this.baseUrl + '/api/user/verify/' + id, verification , this.headersService.getHttpHeaderWithToken());
  }

  getUser(id: number){
    return this.http.get(this.baseUrl + '/api/user/details/' + id, this.headersService.getHttpHeaderWithToken());
  }

  getSalesmans(){
    return this.http.get(this.baseUrl + '/api/user/salesman', this.headersService.getHttpHeaderWithToken());
  }
}
