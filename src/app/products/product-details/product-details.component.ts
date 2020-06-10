import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  subscription: Subscription;
  category: Category[];
  x: any;
  constructor(
    private route: ActivatedRoute,
    private products: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.x = +params['id'];
      this.products.getProductById(this.product.id).subscribe({
        next: (product) => (this.product = product),
      });
    });
    console.log(this.product)
    console.log(this.x)
  }

  categoryName() {
    //   const cid=this.product.categoryId;
    //  const result= this.category.find(c=>c.id==cid);
    //  return result.name;

    console.log('cate name');
  }
}
