import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductsResolverService } from './products-resolver.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'products/:category-name',
        component: ProductsContainerComponent,
        resolve: {resolvedProducts: ProductsResolverService}         
      }
    ])
  ]
})
export class ProductsRoutingModule { }
