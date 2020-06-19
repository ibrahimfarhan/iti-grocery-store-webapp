import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SliderModule } from 'angular-image-slider';

import { ProductComponent } from './product/product.component';
import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { CategoriesListResolver } from '../services/categories-list-resolver.service';
import { RouterModule } from '@angular/router';
import{TranslateModule,TranslateLoader}from '@ngx-translate/core';
import{TranslateHttpLoader}from '@ngx-translate/http-loader';



@NgModule({
  declarations: [ProductComponent, ProductInCartComponent,
    CategoryComponent, CategoriesListComponent,
    ProductsContainerComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    RouterModule,
    NgImageSliderModule,
   // BrowserModule,
    BrowserAnimationsModule,
    SliderModule,
    TranslateModule.forRoot(
      {
        loader:{
          provide:TranslateLoader,
          useFactory:facthttp,
          deps:[HttpClient]
          
        }
      }
    )
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
export function facthttp(http:HttpClient)
{
  return new TranslateHttpLoader(http);
}