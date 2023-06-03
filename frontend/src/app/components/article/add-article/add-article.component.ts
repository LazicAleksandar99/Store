import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  formAddArticle!: FormGroup;
  selectedArticlePicture!: File;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.createAddArticleForm();
  }

  createAddArticleForm(){
    this.formAddArticle = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      price: [1,[Validators.required]],
      quantity: [1,[Validators.required]],
      description:[null,[Validators.required,Validators.minLength(2)]],
      picture:["url"]
    })
  }

  onFileChanged(imageInput: any){
    this.selectedArticlePicture = imageInput.files[0];
  }

  addArticle(): void {
    if (this.formAddArticle.valid){
      if(this.selectedArticlePicture){
        this.articleService.createArticle(this.formAddArticle.value, this.selectedArticlePicture).subscribe(
          data=>{
            this.toastr.success('You successfully added new product!', 'Succes!', {
              timeOut: 3000,
              closeButton: true,
            });
          }, error =>{
            this.toastr.error(error.error.errorMessage, 'Error!', {
              timeOut: 3000,
              closeButton: true,
            });
          }
        )
      }
      else{
        this.toastr.error("Select Picture", 'Error!' , {
          timeOut: 3000,
          closeButton: true,
        });
      }
    }
    else{
      this.toastr.error("Invalid input", 'Error!' , {
        timeOut: 3000,
        closeButton: true,
      });
    }
  }

  get name() {
    return this.formAddArticle.get('name') as FormControl;
  }
  get price() {
    return this.formAddArticle.get('price') as FormControl;
  }
  get quantity() {
    return this.formAddArticle.get('quantity') as FormControl;
  }
  get description() {
    return this.formAddArticle.get('description') as FormControl;
  }
}
