import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  blogPosts$?:Observable<BlogPost[]>;
  currentPageNumber:string | null = null;

  constructor(private blogPostService:BlogPostService,private route:ActivatedRoute){
  }
  ngOnInit(): void {
    // this.route.paramMap.subscribe({       //Getting the id passed to this component using params
    //   next: (params) => {
    //     this.currentPageNumber = params.get('pagenumber');
    //   }
    // })
    //get all blog post 
    // using Async Pipe but its good in this case also where we don't want to send aur prrocess the data after fetching

      this.blogPosts$ = this.blogPostService.getAllBlogPost();

  }

  // pageNumber(incomingPageNumber:number){
  //   this.currentPageNumber = incomingPageNumber;
  // }

}
