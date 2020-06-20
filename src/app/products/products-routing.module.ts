import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductsResolverService } from '../services/products-resolver.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const productsRoutes = [
  {
    path: '',
    component: ProductsPageComponent,
    children: [
      {
        path: 'a',
        component: ProductsContainerComponent,
        resolve: {resolvedProducts: ProductsResolverService}
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
