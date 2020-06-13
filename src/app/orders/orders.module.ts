import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderComponent } from './order/order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [OrderComponent, OrdersContainerComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    RouterModule
  ],
  exports: [
    OrderComponent,
    OrdersContainerComponent,
    OrderDetailsComponent
  ]
})
export class OrdersModule { }
