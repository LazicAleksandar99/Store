import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderHistory } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history!: OrderHistory[]

  constructor(private orderService: OrderService,
              private toastr: ToastrService,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(): void{
    this.orderService.getHistory(this.tokenService.getUserId(localStorage.getItem('token') as string)).subscribe(
      data=>{
        this.history = data as OrderHistory[];
      }, error =>{
        this.toastr.error("Failed to get order history", 'Error!' , {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
