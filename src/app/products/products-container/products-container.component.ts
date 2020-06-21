import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent implements OnInit, OnDestroy {

  products: Product[];
  productsSub: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p['category-name']) {
        this.productService.getProductsByCategory(p['category-name']);
      }
    });

    this.productsSub = this.productService.getProductsSubject().subscribe(p => this.products = p);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
