import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsContainerComponent } from './products/products-container/products-container.component';

import { CategoriesListComponent } from './products/categories-list/categories-list.component';
import { CategoriesListResolver } from './products/categories-list-resolver.service';


const routes: Routes = [
  {path: 'categories', component: CategoriesListComponent, resolve: {categories: CategoriesListResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
