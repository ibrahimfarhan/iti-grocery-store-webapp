import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [AddOrEditProductComponent, AddOrEditCategoryComponent, OrdersContainerComponent, OrderComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
