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
    const formData: FormData = new FormData();

    formData.append('address' , newUser.address);
    formData.append('birthday',newUser.birthday.toString());
    formData.append('email',newUser.email);
    formData.append('firstName',newUser.firstName);
    formData.append('lastName',newUser.lastName);
    formData.append('password',newUser.password);
    formData.append('file',newUser.picture);
    formData.append('role',newUser.role);
    formData.append('username',newUser.username);

    return this.http.post(this.baseUrl + '/api/user/register', formData, this.headersService.getHttpHeaderNoToken());
  }
  
  update(updatedUser: UpdatedUser){
    const formDataUpdate: FormData = new FormData();

    formDataUpdate.append('id' , updatedUser.id.toString());
    formDataUpdate.append('address' , updatedUser.address);
    formDataUpdate.append('birthday',updatedUser.birthday.toString());
    formDataUpdate.append('email',updatedUser.email);
    formDataUpdate.append('firstName',updatedUser.firstName);
    formDataUpdate.append('lastName',updatedUser.lastName);
    formDataUpdate.append('newpassword',updatedUser.newpassword || '');
    formDataUpdate.append('oldpassword',updatedUser.oldpassword || '');
    formDataUpdate.append('file',updatedUser.picture);
    formDataUpdate.append('username',updatedUser.username);
    return this.http.patch(this.baseUrl + '/api/user/update', formDataUpdate, this.headersService.getHttpHeaderWithToken());
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
