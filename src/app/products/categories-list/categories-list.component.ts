import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';

import { Category } from '../../models/category';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[];
  categoriesExpanded: boolean = false;

  // subscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // as long as our categories doesn't change
    // at runtime while the route is already loaded
    // so using the snapshot only is enough
    // but if the data changes while
    // we are at the same route so we need to subscribe
    // to get the changes as soon as they happen
    // also angular handles the unscubsrition for us
    // but its always a good practice to add it manualy
    this.categories = this.route.snapshot.data['categories'];

    // this.subscription = this.route.data.subscribe(
    //   (data: Data) => {
    //     this.categories = data['categories'];
    //   }
    // );
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  toggleCategories(): void {
    let categoriesList = (<HTMLElement>document.getElementsByClassName('categoriesList-wrapper')[0]);
    if(!this.categoriesExpanded) {
      categoriesList.style.transform = "translateX(0)";
    } else {
      categoriesList.style.transform = "translateX(-66.6%)";
    }
    this.categoriesExpanded = !this.categoriesExpanded;
  }

}
