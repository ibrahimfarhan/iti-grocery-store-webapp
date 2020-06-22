import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { SignalRService } from './../../services/signal-r.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  sub: Subscription;
  products: Product[];
  constructor(private productService: ProductService, private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.sub = this.productService.getCartProducts().subscribe(p => this.products = p);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  submitOrder() {
    // ordering logic

    // simulation for new order( for testing only )
    const order = { id: 1, totalPrice: 50, userId: '5', status: 1, orderItems: null }


    this.signalRService.userAddedOrder(order);
  }

}
