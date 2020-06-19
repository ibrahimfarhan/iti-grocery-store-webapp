import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesListComponent } from './products/categories-list/categories-list.component';
import { CategoriesListResolver } from './services/categories-list-resolver.service';
import { HomeComponent } from './core/home/home.component';
import { ProductsPageComponent } from './products/products-page/products-page.component';
import { ProductsContainerComponent } from './products/products-container/products-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  { // this should be moved in products routings 
    path: 'categories', component: CategoriesListComponent, resolve: {categories: CategoriesListResolver},
    children: [
      { path: '', component: ProductsContainerComponent, pathMatch: 'full'},
      { path: ':d', component: ProductsContainerComponent },
    ]
  },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
