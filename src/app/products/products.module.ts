import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';
import { CategoryComponent } from './category/category.component';
import { CategoryInHomeComponent } from './category-in-home/category-in-home.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [ProductComponent, ProductInCartComponent, CategoryComponent, CategoryInHomeComponent, CategoriesListComponent, ProductsContainerComponent, ProductDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
