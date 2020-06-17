import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderComponent } from './order/order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [OrderComponent, OrdersContainerComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    RouterModule
  ],
  exports: [
    OrderComponent,
    OrdersContainerComponent,
  ]
})
export class OrdersModule { }
