import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product/product.component';
import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { CategoriesListResolver } from '../services/categories-list-resolver.service';
import { RouterModule } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductComponent, ProductInCartComponent,
    CategoryComponent, CategoriesListComponent,
    ProductsContainerComponent, ProductDetailsComponent, ProductsPageComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ProductComponent,
    ProductsContainerComponent,
    ProductDetailsComponent,
    ProductInCartComponent
  ],
  providers: [CategoryService, CategoriesListResolver],
})
export class ProductsModule { }
