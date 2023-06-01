import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from './headers.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private headersService: HeadersService) { }


    getHistory(id: number){
      return this.http.get(this.baseUrl + '/api/order/history/' + id, this.headersService.getHttpHeaderWithToken());
    }

    getActive(id: number){
      return this.http.get(this.baseUrl + '/api/order/active/' + id, this.headersService.getHttpHeaderWithToken());
    }

    getAllOrders(){
      return this.http.get(this.baseUrl + '/api/order/all', this.headersService.getHttpHeaderWithToken());
    }
}
