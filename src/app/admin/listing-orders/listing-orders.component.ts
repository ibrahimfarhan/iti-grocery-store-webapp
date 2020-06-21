import { Component, OnInit } from '@angular/core';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-listing-orders',
  templateUrl: './listing-orders.component.html',
  styleUrls: ['./listing-orders.component.scss']
})
export class ListingOrdersComponent implements OnInit {

  orders: Order[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orders => this.orders = orders
    });
  }

}
