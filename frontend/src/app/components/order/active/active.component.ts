import { Component, OnInit } from '@angular/core';
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
