import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  orders!: Order[]

  constructor(private orderService: OrderService,
    private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.getActive();
  }

  
  getActive(): void{
    this.orderService.getAllOrders().subscribe(
      data=>{
        this.orders = data as Order[];
      }, error =>{
        this.toastr.error("Failed to get all orders", 'Error!' , {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
