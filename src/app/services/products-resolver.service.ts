import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Product[]> | Promise<Product[]> | Product[] {
    const categoryName = route.paramMap.get('category-name').toLocaleLowerCase();

    console.log("Opaaa: " + categoryName);
    // if (!categoryName) as the url won't be having any params for categories
    if (categoryName === 'all') {
      return this.productService.getProducts();
    }
    else {
      //check if categoryName is an existing category
      //access category service
      if (true) {
        //return null if it's not a category
      }
      // return this.productService.getProductsByCategory(categoryName);
    }
  }

}
