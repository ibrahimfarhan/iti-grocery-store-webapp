import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit,AfterViewInit {
  
  @Input() order: Order;
  
  constructor() { }
  
  ngAfterViewInit(): void {
    setTimeout(() => {

      this.order.totalPrice = this.getTotalPrice();
    },0);
   }

  ngOnInit(): void {
    
  }

  getTotalPrice(): number{
    let total=0;
    for( let orderItem of this.order.orderItems){

      total+=orderItem.price
      console.log("inside")
    }
  
    return total;
  }
}
