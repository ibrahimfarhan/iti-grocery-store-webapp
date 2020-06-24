import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { ListingProductsComponent } from './listing-products/listing-products.component';
import { ListingCategoriesComponent } from './listing-categories/listing-categories.component';
import { ListingOrdersComponent } from './listing-orders/listing-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AddOrEditProductComponent,
    AddOrEditCategoryComponent,
    ListingProductsComponent,
    ListingCategoriesComponent,
    ListingOrdersComponent,
    OrderDetailsComponent,
    OrderComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AddOrEditProductComponent,
    AddOrEditCategoryComponent,
    ListingCategoriesComponent,
    ListingProductsComponent,
    AdminComponent
  ]
})
export class AdminModule { }
