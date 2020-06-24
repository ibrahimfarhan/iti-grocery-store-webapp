import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

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
 // imgslider: string[]
  imageObject = [{
    image: 'assets/img/products/product1.jpeg',
    thumbImage: 'assets/img/products/product1.jpeg',
    }
    , { image: 'assets/img/products/product-1.jpg',
    thumbImage: 'assets/img/products/product-1.jpg',
    }
    ,{ image: 'assets/img/products/product-grey-9.jpg',
    thumbImage: 'assets/img/products/product-grey-9.jpg',
   }
    ,{ image: 'assets/img/products/product-grey-9.jpg',
    thumbImage: 'assets/img/products/product-grey-9.jpg',
    }
    ,{ image: 'assets/img/products/product-grey-9.jpg',
    thumbImage: 'assets/img/products/product-grey-9.jpg',
   }
]
  // wait to test

  constructor(public translate: TranslateService, private route: ActivatedRoute,
              private products: ProductService )
  {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.product={id:11,name:'test Product',price:100,imgUrl:['assets/img/products/product1.jpeg',
    'assets/img/products/product-1.jpg',
    'assets/img/products/product-grey-9.jpg',
    'assets/img/products/product-grey-6.jpg']}
   // this.imgslider=this.product.imgUrl
   // wait to test
    // this.route.params.subscribe((params) => {
    //   this.x = +params['id'];
    //   this.products.getProductById(this.product.id).subscribe({
    //     next: (product) => (this.product = product),
    //   });
    // });
    console.log(this.product)
    console.log(this.x)
  }

  categoryName() {
    console.log(this.x)
    console.log('cate name');
  }
}
