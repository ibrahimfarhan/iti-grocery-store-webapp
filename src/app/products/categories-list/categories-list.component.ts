import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';

import { Category } from '../../models/category';
import { ActivatedRoute, Data } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[];
  categoriesExpanded = false;

  // subscription: Subscription;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(tap(d => console.log(d))).subscribe(c => this.categories = [null, ...c]);
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

}
