import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './products/categories-list/categories-list.component';
import { CategoriesListResolver } from './services/categories-list-resolver.service';
import { HomeComponent } from './core/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsContainerComponent } from './products/products-container/products-container.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'categories', component: CategoriesListComponent, resolve: {categories: CategoriesListResolver},
    children: [
      { path: '', component: ProductsContainerComponent, pathMatch: 'full'},
      { path: ':d', component: ProductsContainerComponent }
    ]
  },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: ' ', redirectTo: 'home', pathMatch: 'full' },
  // Error page 404
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
