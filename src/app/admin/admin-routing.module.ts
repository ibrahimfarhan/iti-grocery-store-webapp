import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CONFIG } from '../shared/configs';
import { AdminComponent } from './admin.component';
import { ListingProductsComponent } from './listing-products/listing-products.component';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { ListingCategoriesComponent } from './listing-categories/listing-categories.component';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { ListingOrdersComponent } from './listing-orders/listing-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

/// add the isAdminAuthorized guard before every route
const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: CONFIG.admin.children.productsList.route },
      { path: CONFIG.admin.children.productsList.name, component: ListingProductsComponent },
      { path: CONFIG.admin.children.newProduct.name, component: AddOrEditProductComponent },
      { path: CONFIG.admin.children.editProduct.name, component: AddOrEditProductComponent },
      { path: CONFIG.admin.children.categoriesList.name, component: ListingCategoriesComponent },
      { path: CONFIG.admin.children.newCategory.name, component: AddOrEditCategoryComponent },
      { path: CONFIG.admin.children.editCategory.name, component: AddOrEditCategoryComponent },
      { path: CONFIG.admin.children.ordersList.name, component: ListingOrdersComponent },
      { path: CONFIG.admin.children.orderDetails.name, component: OrderDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
