import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Order } from './../models/order';
import { tap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = "../assets/orders.json"

  constructor(
    private http:HttpClient,
    private activatedRoute : ActivatedRoute) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.orderUrl).pipe(
      tap(data => console.log('All Orders: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    )
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.orderUrl + `/${id}`).pipe(
      tap(data => console.log('getOrderById: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  addOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Order>(this.orderUrl, order, { headers }).pipe(
      tap(data => console.log('addOrder: ' + JSON.stringify(data))),
      catchError(this.HandleError)
    );
  }

  // deleteOrder(id: number): Observable<Order> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.delete<Order>(this.orderUrl + `/${id}`, { headers }).pipe(
  //     tap(() => console.log('deleteOrder: ' + id)),
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
