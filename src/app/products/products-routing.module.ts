import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsResolverService } from '../services/products-resolver.service';
import { CONFIG } from '../shared/configs';

const routes: Routes = [
  {
    path: CONFIG.products.name, component: ProductsComponent,
    children: [
      { path: '', pathMatch: 'full', component: ProductsContainerComponent },
      { path: CONFIG.products.children.productsByCategory.name, component: ProductsContainerComponent },
      { path: CONFIG.products.children.productDetails.name, component: ProductDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
