import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from './../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss']
})
export class ProductsContainerComponent implements OnInit {

  products: Product[];
  errorMessage: string;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get all products or products of specific category
    let categoryName;
    this.route.data.subscribe({
      next: data => this.onProductRetrieved(data['resolvedProducts']) ,
      error: msg =>  this.errorMessage = msg 
    });
  }

  onProductRetrieved(retrievedProducts: Product[]): void
  {
    // if it's != null
    if(!retrievedProducts){
      this.errorMessage = "There is no category found with this name";
    } 
    this.products = retrievedProducts
  }
  //checks if the user who loggedin is admin to display edit icon
  isAdmin(): boolean {
    //call auth service 
    return true;
  }

}
