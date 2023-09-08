import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramssubscription?: Subscription       // question mark means undefined
  category?: Category               // question mark means undefined
  private updateCategorySubscription?: Subscription

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) { }


  ngOnInit(): void {
    this.paramssubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');  // here inside the get function parameter name should be same as given in routing module file
        if (this.id) {
          //get the data from API for this category Id if Id is not null
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response;
              }
            });
        }
      }
    })
  }

  onFormSubmit() {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };
    if (this.id) {
      this.updateCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            console.log('sucessfull');
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {

          }
        })
    }
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this category")) {
      if (this.id) {
        this.categoryService.deleteCategory(this.id).subscribe({
          next:(response)=>{
            this.router.navigateByUrl('/admin/categories');
          }
        })
      }
      
    }
  }

  ngOnDestroy(): void {
    this.paramssubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
  }
}
