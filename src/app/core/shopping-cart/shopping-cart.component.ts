import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  products: Product[];
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getCartProducts().subscribe(p => this.products = p);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
