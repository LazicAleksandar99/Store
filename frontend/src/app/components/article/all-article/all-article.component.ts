import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/models/article';
import { MakeOrder } from 'src/app/models/order';
import { ArticleService } from 'src/app/services/article.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-all-article',
  templateUrl: './all-article.component.html',
  styleUrls: ['./all-article.component.css']
})
export class AllArticleComponent implements OnInit {
  page: number = 1;
  articlesData!: Article[]
  orderForm!: FormGroup;

  constructor(private articleService: ArticleService,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private orderService: OrderService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getCustomerArticles();
    this.createFormOrder();
  }
  
  getCustomerArticles(): void{
    this.articleService.getCustomerArticles().subscribe(
      data=>{
        this.articlesData = data as Article[];
      }, error =>{
        console.log('Error occurred at order-list.component.ts')
      }
    );
  }

  Order(article: Article){
    if(this.orderForm.valid){
      const order: MakeOrder = {
        salesmanId: article.salesmanId,
        address: this.address.value,
        comment: this.comment.value,
        userId: this.tokenService.getUserId(localStorage.getItem('token') as string),
        item: {
          articleId: article.id,
          quantity: this.quantity.value,
        }
      }
      this.orderService.makeOrder(order).subscribe(
        data => {
          this.toastr.success('Order created!', 'Succes!', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        error => {
          this.toastr.error("Invalid order", 'Error!' , {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
    else{
      this.toastr.error("Input not valid", 'Error!' , {
        timeOut: 3000,
        closeButton: true,
      });
    }
  }
  
  createFormOrder() {
    this.orderForm = this.formBuilder.group({
      quantity: [1,[Validators.required, Validators.min(1), Validators.max(10000)]],
      address: [null,[Validators.required,Validators.minLength(1)]],
      comment: [null,[Validators.required,Validators.minLength(1)]],
    });
  }

  get address() {
    return this.orderForm.get('address') as FormControl;
  }
  get comment() {
    return this.orderForm.get('comment') as FormControl;
  }
  get quantity() {
    return this.orderForm.get('quantity') as FormControl;
  }
}
