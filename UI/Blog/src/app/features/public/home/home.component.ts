import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?:Observable<BlogPost[]>
  searchtext:string='';
  page:number=1;
  model?:BlogPost[];
  user?: User;
 totalRecords:number=100;
  // currentPagenumber:string =1;

  constructor(private blogPostService: BlogPostService, private authService: AuthService) { }

  ngOnInit(): void {
    //this.blogs$ = this.blogPostService.getAllBlogPost();
    this.blogPostService.getAllBlogPost().subscribe({
      next:(response)=>{
        this.model = response;
        this.totalRecords = this.model.length;
      }
    });

    this.authService.user().subscribe({
      next:(response)=>{
        this.user=response;
      }
    });
    
    this.user = this.authService.getUser();
  }

  // pageNumber(incomingPageNumber:number){
  //   this.currentPagenumber = incomingPageNumber;
  // }

}
