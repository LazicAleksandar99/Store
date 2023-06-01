import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActiveOrders } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {
  active!: ActiveOrders[]

  constructor(private orderService: OrderService,
              private toastr: ToastrService,
              private tokenService: TokenService) { }

  ngOnInit() {
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
}
