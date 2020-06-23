import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
// import { Subscription } from 'rxjs';

import { Category } from '../../models/category';
import { ActivatedRoute, Data } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @ViewChild ('sidebarCategories') sidebarCategories: ElementRef;
  categories: Category[];
  categoriesExpanded = false;


  // subscription: Subscription;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }

  toggleCategories(): void {
    const categoriesList = (document.getElementsByClassName('categoriesList-wrapper')[0] as HTMLElement);
    if (!this.categoriesExpanded) {
      categoriesList.style.transform = 'translateX(0)';
    } else {
      categoriesList.style.transform = 'translateX(-66.6%)';
    }
    this.categoriesExpanded = !this.categoriesExpanded;
  }
  close(){
    this.sidebarCategories.nativeElement.style.display ='none';
  }

  open(){
    this.sidebarCategories.nativeElement.style.display ='block';
  }

}
