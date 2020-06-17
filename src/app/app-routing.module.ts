import { AdminComponent } from './admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './products/categories-list/categories-list.component';
import { CategoriesListResolver } from './services/categories-list-resolver.service';
import { HomeComponent } from './core/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsContainerComponent } from './products/products-container/products-container.component';
import { AddOrEditProductComponent } from './admin/add-or-edit-product/add-or-edit-product.component';
import { AddOrEditCategoryComponent } from './admin/add-or-edit-category/add-or-edit-category.component';
import { ListingProductsComponent } from './admin/listing-products/listing-products.component';
import { ListingCategoriesComponent } from './admin/listing-categories/listing-categories.component';
import { ListingOrdersComponent } from './admin/listing-orders/listing-orders.component';
import { OrderDetailsComponent } from './admin/order-details/order-details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'categories', component: CategoriesListComponent, resolve: {categories: CategoriesListResolver},
    children: [
      { path: '', component: ProductsContainerComponent, pathMatch: 'full'},
      { path: ':d', component: ProductsContainerComponent },
    ]
  },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: ' ', redirectTo: 'home', pathMatch: 'full' },

  //Admin routings
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: 'products', component: ListingProductsComponent},
      {path: 'products/new',component:AddOrEditProductComponent},
      {path: 'products/:id/edit', component:AddOrEditProductComponent},
      {path: 'categories',component:ListingCategoriesComponent},
      {path: 'categories/new',component:AddOrEditCategoryComponent},
      {path: 'categories/:id/edit',component:AddOrEditCategoryComponent},
      {path: 'orders', component:ListingOrdersComponent},
      {path: 'orders/:id',component:OrderDetailsComponent},
    ]
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
