import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [AddOrEditProductComponent, AddOrEditCategoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
