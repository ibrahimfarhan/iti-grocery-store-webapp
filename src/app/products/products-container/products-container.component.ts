import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/models/user-role';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent implements OnInit, OnDestroy {

  products: Product[];
  productsSub: Subscription;
  isAdmin: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.route.params.subscribe(p => {
      if (p && p['category-name']) {
        this.productService.getProductsByCategory(p['category-name']);
      }
    });

    this.productsSub = this.productService.getProductsSubject().subscribe(prods => this.products = prods);

    this.authService.getCurrentUserSubject().pipe(map(u => u && u.roles.includes(UserRole.Admin))).
    subscribe(i => this.isAdmin = i);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
