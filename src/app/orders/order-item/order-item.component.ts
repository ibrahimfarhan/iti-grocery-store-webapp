import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { orderItem } from './../../models/orderItem';
import { Product } from 'src/app/models/product';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit, OnChanges {
  @Input() orderItem: orderItem
  product: Product;

  constructor(private productService: ProductService) {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    //for testing only
    this.product = { 
      id: 1, name: 'product', price: 10, imgUrl: "https://i.pinimg.com/originals/5b/33/29/5b3329d43efc1792543ab088265ec68c.png"
     }


    // this.productService.getProductById(this.orderItem.productId).subscribe({
    //   next: product => this.product = product
    // });

    this.orderItem.price = this.getPrice();
    
  }

  ngOnInit(): void {
  }

  getPrice(): number {
    return this.orderItem.quantity * this.product.price;
  }



}
