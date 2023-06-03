import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-salesman-articles',
  templateUrl: './salesman-articles.component.html',
  styleUrls: ['./salesman-articles.component.css']
})
export class SalesmanArticlesComponent implements OnInit {
  page: number = 1;
  salesmanArticles!: Article[];

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private articleService: ArticleService,
    private router: Router,
    private tokenService: TokenService) {
  }
  ngOnInit(): void {
    this.getSalesmanArticles();
  }

  getSalesmanArticles(){
    this.articleService.getSalesmanArticles(this.tokenService.getUserId(localStorage.getItem('token') as string)).subscribe(
      data=>{
        this.salesmanArticles = data as Article[];
      }, error =>{
        console.log('Error occurred at all-articles.comp.ts')
      }

    );
  }

  Delete(id: number): void{
    this.articleService.deleteArticle(id,this.tokenService.getUserId(localStorage.getItem('token') as string)).subscribe(
      data=>{
        this.toastr.success('Article was deleted!', 'Succes!', {
        timeOut: 3000,
        closeButton: true,
      });
      }, error =>{
        this.toastr.error("Delete faild!", 'Error!', {
        timeOut: 3000,
        closeButton: true,
      });
      }
    )
  }

  Edit(id: number): void{
  this.router.navigateByUrl('dashboard/article/' + id);
  }
}
