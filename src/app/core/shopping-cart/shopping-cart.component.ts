import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getCartProducts();
  }

}
