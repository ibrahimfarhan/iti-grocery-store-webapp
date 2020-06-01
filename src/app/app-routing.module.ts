import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './products/categories-list/categories-list.component';
import { CategoriesListResolver } from './products/categories-list-resolver.service';
import { HomeComponent } from './core/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesListComponent, resolve: {categories: CategoriesListResolver}},
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: ' ', redirectTo: 'home', pathMatch: 'full' },
  // Error page 404
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 