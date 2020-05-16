import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { Category } from '../category';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
@Input()product:Product;
category:Category[];
  constructor() { }

  ngOnInit(): void {
    this.product={id:1,name:"Blue Ladies Handbag",price:1000,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nibh sed elimttis adipiscing. Fusce in hendrerit purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus nibh sed elimttis adipiscing. Fusce in hendrerit purus."
  ,imgUrl:"assets/img/products/product-grey-7.jpg" ,categoryId:11}
  this.category=[{id:11,name:"Fruit"}]
  }
  categoryName():string
  {
    const cid=this.product.categoryId;   
   const result= this.category.find(c=>c.id==cid);
   return result.name;
    
  }

}
