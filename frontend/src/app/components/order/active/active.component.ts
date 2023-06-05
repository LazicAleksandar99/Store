import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { ActiveOrders, CancelOrder } from 'src/app/models/order';
import { TokenAuthorization } from 'src/app/models/token';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {
  active!: ActiveOrders[]
  userRole!: string;
  countdownConfig!: CountdownConfig;

  constructor(private orderService: OrderService,
              private toastr: ToastrService,
              private tokenService: TokenService) {
    
    this.userRole = (this.tokenService.getTokenInformation(localStorage.getItem('token') as string) as TokenAuthorization).role;
  }

  ngOnInit() {
    this.getActive();
  }

  getActive(): void{
    this.orderService.getActive(this.tokenService.getUserId(localStorage.getItem('token') as string)).subscribe(
      data=>{
        this.active = data as ActiveOrders[];
        for(let key in this.active){
          let activeOrder = this.active[key];
          const currentTime = new Date().getTime();
          const endDeliveryTime = new Date(activeOrder.delivery).getTime();
          const time = endDeliveryTime - currentTime;
            this.countdownConfig = {
              leftTime: time / 1000,
              notify: 0,
              format: 'HH:mm:ss'
            };
            activeOrder.configCountDown = this.countdownConfig;
        }
      }, error =>{
        this.toastr.error("Failed to get all active orders", 'Error!' , {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }

  Cancel(id: number){
    const ordercancelation: CancelOrder = {
      userId: this.tokenService.getUserId(localStorage.getItem('token') as string),
      orderId: id 
    }
    this.orderService.cancel(ordercancelation).subscribe(
      data=> {
        this.toastr.success("Order canceled", 'Success!' , {
          timeOut: 3000,
          closeButton: true,
        });
      }, 
      error =>{
        this.toastr.error("Cancelation failed", 'Error!' , {
          timeOut: 3000,
          closeButton: true,
        });  
      }
    );
  }
}
