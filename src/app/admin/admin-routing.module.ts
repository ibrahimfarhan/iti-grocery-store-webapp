import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';

const routes: Routes = [
  // {
  //   path: 'products/:id',
  //   component: AddOrEditProductComponent
  // },
  // {
  //   path: 'categories/:category-name',
  //   component: AddOrEditCategoryComponent
  // },
];


/// add the isAdminAuthorized guard before every route
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminRoutingModule { }
