import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.scss'],
})
export class ProductInCartComponent implements OnInit {

  @Input() product: CartProduct;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  removeCartProduct(): void {
    this.productService.removeCartProduct({...this.product, quantity: 1});
  }

  onQuantityChange(quantityInput: HTMLInputElement): void {
    const newQuantity = Number(quantityInput.value);

    if (newQuantity <= 0) {
      quantityInput.value = this.product.quantity.toString();
      return;
    }

    this.product.quantity = newQuantity;
    this.productService.editCartProduct(this.product);
  }
}
