import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.scss']
})
export class ProductInCartComponent implements OnInit {
@Input() product:Product;
  constructor() { }

  ngOnInit(): void {
    this.product={id:1,name:"Blue Ladies Handbag",price:1000,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nibh sed elimttis adipiscing. Fusce in hendrerit purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nibh sed elimttis adipiscing. Fusce in hendrerit purus."
    ,imgUrl:"assets/img/products/product-grey-7.jpg" ,categoryId:11}
  }

}
