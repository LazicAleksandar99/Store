import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginInfo } from '../models/user';
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

  getDetails(id: number){
    return this.http.get(this.baseUrl + '/api/user/details/' + id, this.headersService.getHttpHeaderWithToken());
  }

  getSalesmans(){
    return this.http.get(this.baseUrl + '/api/user/salesman', this.headersService.getHttpHeaderWithToken());
  }
}
