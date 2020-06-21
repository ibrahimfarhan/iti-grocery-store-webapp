import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Product } from '../models/product';
import { apiRoutes } from '../models/constants';
import { CartProduct } from '../models/cartProduct';
import { ActivatedRoute } from '@angular/router';
import { ProductSearch } from '../models/productSearch';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // TODO: Remove static data.
  cartProducts: CartProduct[] = [
    { id: 1, name: 'something long long', price: 100, imgUrl: ['../assets/images/profile.jpg'], quantity: 1 },
    { id: 2, name: 'P2', price: 200, imgUrl: ['../assets/images/profile.jpg'], quantity: 1 },
  ];

  cartProductsSubject = new BehaviorSubject<CartProduct[]>(null);
  productsSubject = new BehaviorSubject<Product[]>(null);

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  // Products CRUD operations

  getProductsSubject(apiRoute?: string): BehaviorSubject<Product[]> {
    const route = apiRoute ? apiRoute : apiRoutes.getProducts;
    this.http.get<Product[]>(route).pipe(
      catchError(this.handleError)
    ).subscribe(data => this.productsSubject.next(data));

    return this.productsSubject;
  }

  getProductsBySearchBar(productSearch: ProductSearch): void {
    this.getProductsSubject(apiRoutes.getProducts +
      `?product-name=${productSearch.searchTerm}&category-name=${productSearch.selectedCategoryName}`);
  }

  getProductsByCategory(categoryName: string): void {
    this.getProductsSubject(apiRoutes.getProducts + `/${categoryName}`);
  }

  // getProductById(id: number): Observable<Product> {
  //   return this.http.get<Product>(this.productUrl + `/${id}`).pipe(
  //     tap(data => console.log('getProductById: ' + JSON.stringify(data))),
  //     catchError(this.HandleError)
  //   );
  // }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(apiRoutes.getProducts + `${id}`).pipe(catchError(this.handleError));
  }

  // Cart products CRUD operations

  // TODO: get cart products from database.
  getCartProducts(): BehaviorSubject<CartProduct[]> {
    // const cartProducts$ = this.http.get<CartProduct[]>(apiRoutes.getCartProducts).
    //   pipe(catchError(this.HandleError));
    const cartProducts$ = of(this.cartProducts);
    cartProducts$.subscribe(data => this.cartProductsSubject.next(data));
    return this.cartProductsSubject;
  }

  addCartProduct(product: CartProduct): void {
    this.http.post<boolean>(apiRoutes.addCartProduct, product).
      pipe(catchError(this.handleError)).
      subscribe(success => {
        if (success) {
          this.cartProducts.push(product);
          this.cartProductsSubject.next(this.cartProducts);
        }
      });
  }

  editCartProduct(product: CartProduct): void {
    const editedIndex = this.cartProducts.findIndex(p => p.id === product.id);
    this.cartProducts[editedIndex] = product;
    this.cartProductsSubject.next(this.cartProducts);
    // this.http.post<boolean>(apiRoutes.editCartProduct, product).
    //   pipe(catchError(this.HandleError)).
    //   subscribe(success => {
    //     if (success) {
    //       const editedIndex = this.cartProducts.findIndex(p => p.id === product.id);
    //       this.cartProducts[editedIndex] = product;
    //       this.cartProductsSubject.next(this.cartProducts);
    //     }
    //   });
  }

  removeCartProduct(id: number): void {
    this.http.post<boolean>(apiRoutes.deleteCartProduct, { id }).
      pipe(catchError(this.handleError)).
      subscribe(success => {
        if (success) {
          this.cartProducts = this.cartProducts.filter(p => p.id !== id);
          this.cartProductsSubject.next(this.cartProducts);
        }
      });
  }

  // Admin panel products CRUD operations

  addProduct(product: Product): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(apiRoutes.addProduct , product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<boolean>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(apiRoutes.deleteProduct, { id }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<boolean>(apiRoutes.editProduct , product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    // console and throw error
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
