import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { Routes, RouterModule } from '@angular/router';
import { OrdersContainerComponent } from './orders-container/orders-container.component';

const routes: Routes = [
  {
    path: 'orders', component: OrdersContainerComponent,
    children: [
      { path: '', component: OrdersContainerComponent, pathMatch: 'full'},
      { path: ':d', component: OrderDetailsComponent }
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
