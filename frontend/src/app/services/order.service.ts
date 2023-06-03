import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from './headers.service';
import { environment } from 'src/environments/environment';
import { CancelOrder, MakeOrder } from '../models/order';

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

    makeOrder(newOrder: MakeOrder){
      return this.http.post(this.baseUrl + '/api/order/create',newOrder ,this.headersService.getHttpHeaderWithToken());
    }

    cancel(cancelation: CancelOrder){
      return this.http.patch(this.baseUrl + '/api/order/cancel', cancelation ,this.headersService.getHttpHeaderWithToken());
    }
}
