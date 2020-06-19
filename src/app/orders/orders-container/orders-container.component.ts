import { Component, OnInit } from '@angular/core';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-orders-container',
  templateUrl: './orders-container.component.html',
  styleUrls: ['./orders-container.component.scss']
})
export class OrdersContainerComponent implements OnInit {

  orders:Order[] = [];
  constructor(
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orders => {
        this.orders = orders;
      }
    });
  }

}
