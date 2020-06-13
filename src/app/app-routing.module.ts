import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './products/categories-list/categories-list.component';
import { CategoriesListResolver } from './services/categories-list-resolver.service';
import { HomeComponent } from './core/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsContainerComponent } from './products/products-container/products-container.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrdersContainerComponent } from './orders/orders-container/orders-container.component';


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
  // {
  //   path: 'orders/:id',component: OrderDetailsComponent
  // },
  {
    path: 'orders',component:OrdersContainerComponent
  },
  {
    path: 'products',component:ProductsContainerComponent
  },
  // // Error page 404
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
