import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderComponent } from './order/order.component';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [OrderComponent, OrdersContainerComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
