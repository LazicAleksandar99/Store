import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

constructor() { }

getHttpHeaderNoToken(): { headers: HttpHeaders; }{
  const httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json"
    })
  };
  return httpOptions;
}
getHttpHeaderWithToken(): { headers: HttpHeaders; }{
  const httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      Authorization: 'Bearer '+ localStorage.getItem('token')
    })
  };
  return httpOptions;
}
}
