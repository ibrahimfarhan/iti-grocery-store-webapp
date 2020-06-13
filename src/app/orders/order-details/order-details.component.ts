import { Component, OnInit } from '@angular/core';
import { Order } from './../../models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order:Order;
  constructor(private activatedRoute : ActivatedRoute , 
    private orderService : OrderService ,
    private router : Router ) { }

  ngOnInit(): void {
    const id= +this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id).subscribe({
      next: order => this.order = order
    });
  }

}
