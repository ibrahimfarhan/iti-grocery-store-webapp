import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderDetailsComponent } from './../admin/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'orders', component: OrdersContainerComponent,
    children: [
      { path: '', component: OrdersContainerComponent, pathMatch: 'full'},
      { path: ':id', component: OrderDetailsComponent }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OrdersRoutingModule { }
