import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderComponent } from './order/order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderItemComponent } from './order-item/order-item.component';



@NgModule({
  declarations: [OrderComponent, OrdersContainerComponent, OrderItemComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    HttpClientModule
  ],
  exports:[OrderComponent,OrdersContainerComponent]
})
export class OrdersModule { }
