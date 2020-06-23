import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listing-products',
  templateUrl: './listing-products.component.html',
  styleUrls: ['./listing-products.component.scss']
})
export class ListingProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productsSub: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSub = this.productService.getProductsSubject().subscribe({
      next: products => {
        this.products = products;
      }
    });
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
