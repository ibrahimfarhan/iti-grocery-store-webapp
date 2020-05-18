import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartProducts: Product[] = [
    { id: 1, name: 'P1', price: 100, imgUrl: '../assets/images/icon1.png' },
    { id: 2, name: 'P2', price: 200, imgUrl: '../assets/images/icon1.png' }
  ];

  private productUrl = '../assets/products.json';


  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(data => console.log('All Products: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  getCartProducts(): Product[] {
    return this.cartProducts;
  }

  // getProductById(id: number): Observable<Product> {
  //   return this.http.get<Product>(this.productUrl + `/${id}`).pipe(
  //     tap(data => console.log('getProductById: ' + JSON.stringify(data))),
  //     catchError(this.HandleError)
  //   );
  // }

  // getProductsByCategory(category: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productUrl + `/${category}`).pipe(
  //     tap(data => console.log('getProductsByCategory: ' + JSON.stringify(data))),
  //     catchError(this.HandleError)
  //   );
  // }

  // addProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<Product>(this.productUrl, product, { headers: headers }).pipe(
  //     tap(data => console.log('addProduct: ' + JSON.stringify(data))),
  //     catchError(this.HandleError)
  //   );
  // }

  // deleteProduct(id: number): Observable<Product>{
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.delete<Product>(this.productUrl+`/${id}`, { headers: headers }).pipe(
  //     tap(() => console.log('deleteProduct: ' + id)),
  //     catchError(this.HandleError)
  //   );
  // }

  // updateProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put<Product>(this.productUrl, product, { headers: headers }).pipe(
  //     tap(() => console.log('updateProduct: ' + product.id)),
  //     map(() => product),
  //     catchError(this.HandleError)
  //   );
  // }


  HandleError(err: HttpErrorResponse) {
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
