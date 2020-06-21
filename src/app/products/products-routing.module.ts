import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const productsRoutes: Routes = [
  {
    path: 'products', component: ProductsPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      { path: 'category/:category-name', component: ProductsContainerComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
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
