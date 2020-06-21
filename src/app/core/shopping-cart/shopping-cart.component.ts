import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SignalRService } from './../../services/signal-r.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService, private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.products = this.productService.getCartProducts();
  }

  submitOrder()
  {
    //ordering logic

    //simulation for new order( for testing only )
    let order: Order ={id:1,totalPrice:50,userId:"5",status:1,orderItems:null} 


    this.signalRService.userAddedOrder(order);
  }

}
