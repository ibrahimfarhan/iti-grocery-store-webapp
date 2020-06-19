import { Component, OnInit } from '@angular/core';
import { Category } from './../../models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-listing-categories',
  templateUrl: './listing-categories.component.html',
  styleUrls: ['./listing-categories.component.scss']
})
export class ListingCategoriesComponent implements OnInit {

  Categories: Category[] = [];
  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next:categories => {
        this.Categories = categories;
      },
    });
  }

}
