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
    const formData: FormData = new FormData();

    formData.append('id' , updatedArticle.id.toString());
    formData.append('name' , updatedArticle.name);
    formData.append('price' , updatedArticle.price.toString());
    formData.append('quantity',updatedArticle.quantity.toString());
    formData.append('description',updatedArticle.description);
    formData.append('picture',updatedArticle.picture);
    formData.append('salesmanId',updatedArticle.salesmanId.toString());
    formData.append('file',updatedArticle.file);

    return this.http.patch(this.baseUrl + '/api/article/update', formData, this.headersService.getHttpHeaderWithToken());
  }

  deleteArticle(articleId: number, salesmanId: number){
    return this.http.delete(this.baseUrl + '/api/article/delete/' + articleId + '/' + salesmanId , this.headersService.getHttpHeaderWithToken());
  }

  createArticle(newArticle: CreateArticle, pic: File){
    const formData: FormData = new FormData();
    newArticle.salesmanId = this.tokenService.getUserId(localStorage.getItem('token') as string);

    formData.append('name' , newArticle.name);
    formData.append('price' , newArticle.price.toString());
    formData.append('quantity',newArticle.quantity.toString());
    formData.append('description',newArticle.description);
    formData.append('picture','empty');
    formData.append('salesmanId',newArticle.salesmanId.toString());
    formData.append('file',pic);


    return this.http.post(this.baseUrl + '/api/article/create', formData, this.headersService.getHttpHeaderWithToken())
  }

}
