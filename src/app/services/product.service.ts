import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Product } from '../models/product';
import { apiRoutes } from '../shared/configs/api-routes';
import { CartProduct } from '../models/cart-product';
import { ActivatedRoute } from '@angular/router';
import { ProductSearch } from '../models/product-search';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartProductsSubject = new BehaviorSubject<CartProduct[]>(null);
  productsSubject = new BehaviorSubject<Product[]>(null);
  cartProducts: CartProduct[] = [];
  products: Product[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private errorService: ErrorService) { }

  // Products CRUD operations

  getProductsSubject(categoryName?: string): BehaviorSubject<Product[]> {

    const route = categoryName ? apiRoutes.getProducts + `/${categoryName}` : apiRoutes.getAllProducts;
    return this.fetchProductsByRoute(route);
  }

  getProductsBySearchBar(productSearch: ProductSearch): void {

    this.fetchProductsByRoute(apiRoutes.getProducts +
      `?product-name=${productSearch.searchTerm}&category-name=${productSearch.selectedCategoryName}`);
  }

  getProductsByCategory(categoryName: string): void {

    this.fetchProductsByRoute(apiRoutes.getProducts + `/${categoryName}`);
  }

  getProductById(id: number): Observable<Product> {

    return this.http.get<Product>(apiRoutes.getProducts + `/${id}`).pipe(catchError(this.handleError));
  }

  private fetchProductsByRoute(apiRoute: string): BehaviorSubject<Product[]> {

    const route = apiRoute ? apiRoute : apiRoutes.getProducts;
    this.http.get<Product[]>(route).pipe(
      catchError(this.handleError)
    ).subscribe(data => this.productsSubject.next(data));

    return this.productsSubject;
  }

  // Cart products CRUD operations

  getCartProducts(): BehaviorSubject<CartProduct[]> {

    const cartProducts$ = this.http.get<CartProduct[]>(apiRoutes.getCartProducts).
      pipe(catchError(this.handleError));
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

    this.http.post<boolean>(apiRoutes.editCartProduct, product).
      pipe(catchError(this.handleError)).
      subscribe(success => {
        if (success) {
          const editedIndex = this.cartProducts.findIndex(p => p.id === product.id);
          this.cartProducts[editedIndex] = product;
          this.cartProductsSubject.next(this.cartProducts);
        }
      });
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

  handleError = (err: HttpErrorResponse) => {

    this.errorService.errorMessageSubject.next(err.error);

    return throwError(err.error);
  }
}
