import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Product } from '../models/product';
import { apiRoutes } from '../shared/configs/api-routes';
import { CartProduct } from '../models/cart-product';
import { ActivatedRoute } from '@angular/router';
import { ProductSearch } from '../models/product-search';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
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

  getProductById(id: number): Product {

    if (this.products) {
      return this.products.find(p => p.id === id);
    }

    return null;
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
    cartProducts$.subscribe(data => {
      this.cartProducts = data;
      this.cartProductsSubject.next(this.cartProducts);
    });
    return this.cartProductsSubject;
  }

  addCartProduct(product: CartProduct): void {

    const ids = this.cartProducts.map(p => p.productId);

    if (ids.includes(product.productId)) { return; }

    this.http.post<HttpResponse<any>>(apiRoutes.addCartProduct, product.productId, { observe: 'response'}).
      pipe(catchError(this.handleError)).
      subscribe(res => {
        if (res.ok) {
          this.cartProducts.push(product);
          this.cartProductsSubject.next(this.cartProducts);
        }
      });
  }

  editCartProduct(product: CartProduct): void {

    this.http.post<HttpResponse<any>>(apiRoutes.editCartProduct, product, { observe: 'response'}).
      pipe(catchError(this.handleError)).
      subscribe(res => {
        if (res.ok) {
          const editedIndex = this.cartProducts.findIndex(p => p.productId === product.productId);
          this.cartProducts[editedIndex] = product;
          this.cartProductsSubject.next(this.cartProducts);
        }
      });
  }

  removeCartProduct(product: CartProduct): void {

    this.http.post<HttpResponse<any>>(apiRoutes.deleteCartProduct, product, { observe: 'response'}).
      pipe(catchError(this.handleError)).
      subscribe(res => {
        if (res.ok) {
          this.cartProducts = this.cartProducts.filter(p => p.productId !== product.productId);
          this.cartProductsSubject.next(this.cartProducts);
        }
      });
  }

  // Admin panel products CRUD operations

  addProduct(product: Product): Observable<boolean> {

    product = {...product, price: Number(product.price), categoryId: Number(product.categoryId) };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<HttpResponse<any>>(apiRoutes.addProduct , product, { headers, observe: 'response' }).pipe(
      catchError(this.handleError), map(res => res.ok)
    );
  }

  deleteProduct(id: number): Observable<boolean>{

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(apiRoutes.deleteProduct, { id }, { headers, observe: 'response' }).pipe(
      catchError(this.handleError), map(res => res.ok)
    );
  }

  updateProduct(product: Product): Observable<boolean> {

    product = {...product, categoryId: Number(product.categoryId)};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(apiRoutes.editProduct , product, { headers, observe: 'response' }).pipe(
      catchError(this.handleError), map(res => res.ok)
    );
  }

  handleError = (err: HttpErrorResponse) => {

    this.errorService.errorMessageSubject.next(err.error);

    return throwError(err.error);
  }
}
