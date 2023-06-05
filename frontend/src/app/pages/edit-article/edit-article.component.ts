import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  updateArticleForm!: FormGroup;
  articleId!: string;
  article!: Article;
  selectedArticlePicture!: File;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private articleService: ArticleService,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id') as string;
    }); 
    this.createUpdateArticleForm()
    this.getArticleDetails();
  }

  createUpdateArticleForm() {
    this.updateArticleForm = this.formBuilder.group({
      name: [null,Validators.required],
      price: [1,[Validators.required,Validators.min(1), Validators.max(10000)]],
      quantity: [1,[Validators.required,Validators.min(1), Validators.max(10000)]],
      description: [null,[Validators.required,Validators.minLength(3)]],
    });
  }

  SaveChanges(){
    if (this.updateArticleForm.valid) {
        this.articleService.updateArticle(this.updatedArticleData()).subscribe(
          data=>{
            this.toastr.success('Article updated!', 'Succes!', {
              timeOut: 3000,
              closeButton: true,
            });
          }, error =>{
            this.toastr.error("Invalid input", 'Error!' , {
              timeOut: 3000,
              closeButton: true,
            });
          }

        );

    }
    else{
      this.toastr.error("Invalid input", 'Error!' , {
        timeOut: 3000,
        closeButton: true,
      });
    }
  }

  updatedArticleData(): Article {
    return this.article = {
        id:parseInt(this.articleId, 10),
        name: this.name.value,
        description: this.description.value,
        price: this.price.value,
        quantity: this.quantity.value,
        picture: this.article.picture,
        salesmanId: this.tokenService.getUserId(localStorage.getItem('token') as string),
        file: this.selectedArticlePicture
    };
  }

  
  onPictureChanged(imageInput: any){
    this.selectedArticlePicture = imageInput.files[0];
  }


  getArticleDetails(){
    this.articleService.getArticle(parseInt(this.articleId, 10)).subscribe(
      data => {
        this.article = data as Article;
        this.updateArticleForm.patchValue({
          name : this.article.name,
          description: this.article.description,
          price: this.article.price,
          quantity: this.article.quantity,
        });
      }, error =>{
          this.toastr.error("Article Id is most likly to be a problem", 'Error!' , {
            timeOut: 3000,
            closeButton: true,
          });
      }
    );
  }

  onFileChanged(imageInput: any){
    this.selectedArticlePicture = imageInput.files[0];
  }

  get name() {
    return this.updateArticleForm.get('name') as FormControl;
  }
  get quantity() {
    return this.updateArticleForm.get('quantity') as FormControl;
  }
  get price() {
    return this.updateArticleForm.get('price') as FormControl;
  }
  get description() {
    return this.updateArticleForm.get('description') as FormControl;
  }
}
