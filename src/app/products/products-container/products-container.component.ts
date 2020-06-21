import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent implements OnInit {

  products: Product[];
  errorMessage: string;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => this.onProductRetrieved(data),
      error: msg => this.errorMessage = msg
    });

    // this.route.data.subscribe({
    //   next: data => this.onProductRetrieved(data.resolvedProducts),
    //   error: msg => this.errorMessage = msg
    // });
  }

  onProductRetrieved(retrievedProducts: Product[]): void {
    // if it's == null
    if (!retrievedProducts) {
      this.errorMessage = 'There are no products found for this category';
    }
    this.products = retrievedProducts;
  }
  // checks if the user who loggedin is admin to display edit icon
  isAdmin(): boolean {
    // call auth service
    return this.authService.isAdmin();
  }
}
