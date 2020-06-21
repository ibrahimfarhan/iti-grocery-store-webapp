import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listing-products',
  templateUrl: './listing-products.component.html',
  styleUrls: ['./listing-products.component.scss']
})
export class ListingProductsComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
      }
    });
  }

}
