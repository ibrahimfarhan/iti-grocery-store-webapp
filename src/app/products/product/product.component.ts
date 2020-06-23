import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  isAdmin: boolean;

  constructor(private router: Router, private authService: AuthService,
              private productService: ProductService) { }

  ngOnInit(): void {

    this.authService.isAdmin().subscribe(i => this.isAdmin = i);
  }

  // navigate to the admin panel to edit product
  goToAdminEditProduct(): void {

    this.router.navigate([`/admin/products/${this.product.id}`]);
  }

  addTocart(): void {

    this.productService.addCartProduct({
      productId: this.product.id,
      name: this.product.name,
      quantity: 1,
      discount: this.product.discount,
      price: this.product.price,
      imgUrl: this.product.imgUrl
    });
  }

}
