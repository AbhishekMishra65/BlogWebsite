import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
 
  constructor(private categoryService:CategoryService) { }  

  categories$?:Observable<Category[]>  //using Async Pipe to subscribe to observable

  //categories? : Category[]
  // or categories : any

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    //using observable subscription
    // .subscribe({
    //   next: (response)=>{
    //     this.categories = response;
    //   }
    // });
  }


}
