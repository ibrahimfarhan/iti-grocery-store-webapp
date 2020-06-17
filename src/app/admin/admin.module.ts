import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListingProductsComponent } from './listing-products/listing-products.component';
import { ListingCategoriesComponent } from './listing-categories/listing-categories.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ListingOrdersComponent } from './listing-orders/listing-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [AddOrEditProductComponent, AddOrEditCategoryComponent, ListingProductsComponent, ListingCategoriesComponent, AdminPanelComponent, ListingOrdersComponent, OrderDetailsComponent, OrderComponent],
  imports: [
  CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports:[
    AddOrEditProductComponent,
    AddOrEditCategoryComponent,
    ListingCategoriesComponent,
    ListingProductsComponent,
    AdminPanelComponent
  ]
})
export class AdminModule { }
