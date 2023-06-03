import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from './headers.service';
import { environment } from 'src/environments/environment';
import { Article, CreateArticle } from '../models/article';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,
              private headersService: HeadersService,
              private tokenService: TokenService) { }

  getCustomerArticles(){
    return this.http.get(this.baseUrl + '/api/article/all', this.headersService.getHttpHeaderWithToken());
  }

  getArticle(articleId: number){
    return this.http.get(this.baseUrl + '/api/article/detail/' + articleId, this.headersService.getHttpHeaderWithToken());
  }

  getSalesmanArticles(id: number){
    return this.http.get(this.baseUrl + '/api/article/salesman/' + id, this.headersService.getHttpHeaderWithToken());
  }

  updateArticle(updatedArticle: Article){
    return this.http.patch(this.baseUrl + '/api/article/update', updatedArticle, this.headersService.getHttpHeaderWithToken());
  }

  deleteArticle(articleId: number, salesmanId: number){
    return this.http.delete(this.baseUrl + '/api/article/delete/' + articleId + '/' + salesmanId , this.headersService.getHttpHeaderWithToken());
  }

  createArticle(newArticle: CreateArticle){
    newArticle.salesmanId = this.tokenService.getUserId(localStorage.getItem('token') as string);
    return this.http.post(this.baseUrl + '/api/article/create', newArticle, this.headersService.getHttpHeaderWithToken())
  }

}
