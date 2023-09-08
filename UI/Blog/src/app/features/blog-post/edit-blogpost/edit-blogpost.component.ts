import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  routeSubscription?: Subscription
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  updateBlogPostSubscription?: Subscription
  getBlogPostSubscription?: Subscription
  deleteBlogPostSubscription?: Subscription
  imageSelectSubscription?: Subscription
  isImageSelectorVisible:boolean= false;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private categorySerrvice: CategoryService, private router: Router,private imageService:ImageService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.categories$ = this.categorySerrvice.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({       //Getting the id passed to this component using params
      next: (params) => {
        this.id = params.get('id');
      }
    })

    if (this.id) {
      this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
        next: (response) => {
          this.model = response;
          this.selectedCategories = response.categories.map(x => x.id)   // all the id will be stored in selectedcategories array
        }
      })
    }

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next:(response)=>{
        if(this.model){
          this.model.featuredImageUrl= response.url;
          this.closeImageSelector();
        }
      }
    })

  }

  onFormSubmit() {
    //convert this model into request Object i.e update model
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        author: this.model.author,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? []        //if the selectedcategories is undefined or null then assign empty array
      }
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.toastr.success('Updated Successfully');
          this.router.navigateByUrl('/admin/blogposts')
        }
      })

    }
  }

  onChange(value: string): void {
    if (this.selectedCategories) {
      if (this.selectedCategories.includes(value)) {
        this.selectedCategories = this.selectedCategories.filter((item) => item !== value);
      } else {
        this.selectedCategories.push(value);
      }
      console.log(this.selectedCategories);
    }
  }

  onDelete() {
      if (this.id && confirm('Are your sure want to delete')) {
        this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
          next: (response) => {
            this.toastr.info('Blog Deleted Successfully');
            this.router.navigateByUrl('/admin/blogposts');
          }
        })
      }
    
  }

  openImageSelector(){
    this.isImageSelectorVisible=true;
  }
  closeImageSelector(){
    this.isImageSelectorVisible=false;

  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
