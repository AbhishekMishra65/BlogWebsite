import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible:boolean= false;
  imageSelectSubscription?:Subscription;

  constructor(private blogPostService : BlogPostService, private router : Router,private categoryService:CategoryService,private imageService:ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [],
    }
  }
 

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next:(response)=>{
        if(this.model){
          this.model.featuredImageUrl= response.url;
          this.closeImageSelector();
        }
      }
    })
  }

  onChange(value: string): void {
    if (this.model.categories.includes(value)) {
      this.model.categories = this.model.categories.filter((item) => item !== value);
    } else {
      this.model.categories.push(value);
    }
    console.log(this.model.categories);
  }

  onFormSubmit() :void {     // here void means that return type of this fucntion is void
    //console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    }) 
  }

  openImageSelector(){
    this.isImageSelectorVisible=true;
  }
  
  closeImageSelector(){
    this.isImageSelectorVisible=false;
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();          //here question marks mean that if it is undefined then don't go forward. or do nothing
  }

}
