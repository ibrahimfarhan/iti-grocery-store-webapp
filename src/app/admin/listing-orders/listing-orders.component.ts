import { Component, OnInit } from '@angular/core';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { SignalRService } from './../../services/signal-r.service';

@Component({
  selector: 'app-listing-orders',
  templateUrl: './listing-orders.component.html',
  styleUrls: ['./listing-orders.component.scss']
})
export class ListingOrdersComponent implements OnInit {

  orders: Order[];
  constructor(private orderService: OrderService, private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orders => this.orders = orders
    });

    this.signalRService.orderReceived.subscribe((order:any) => {
      this.orders.push(order)
    })
  }

}
