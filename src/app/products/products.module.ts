import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderModule } from 'angular-image-slider';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProductComponent } from './product/product.component';
import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductInCartComponent,
    CategoryComponent,
    CategoriesListComponent,
    ProductsContainerComponent,
    ProductDetailsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    NgImageSliderModule,
    SliderModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: facthttp,
          deps: [HttpClient]
        }
      }
    )
  ],
  exports: [
    ProductComponent,
    ProductsContainerComponent,
    ProductDetailsComponent,
    ProductInCartComponent,
    ProductsComponent
  ]
})
export class ProductsModule { }
export function facthttp(http: HttpClient) {
  return new TranslateHttpLoader(http);
}