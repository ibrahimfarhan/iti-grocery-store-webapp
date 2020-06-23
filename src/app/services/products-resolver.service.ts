// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { Product } from '../models/product';
// import { ProductService } from './product.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsResolverService implements Resolve<Product[]>{

//   constructor(private productService: ProductService) { }

// tslint:disable-next-line: max-line-length
//   resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Observable<Product[]>{
//     const categoryName = route.paramMap.get('category-name').toLocaleLowerCase();

//     console.log(categoryName)
//     if (categoryName === 'all') {
//       return this.productService.getProducts();
//     }
//     else {
//       //check if categoryName is an existing category
//       //access category service
//       if(true)
//       {
//         //return null if it's not a category
//       }
//       // return this.productService.getProductsByCategory(categoryName);
//     }
//   }

// }
