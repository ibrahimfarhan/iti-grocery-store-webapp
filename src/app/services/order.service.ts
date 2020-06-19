import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  tempOrders: Order[] = [
    { id: 1 ,status: 1, userId:1, orderItems:[
      {id:1, orderId: 1, productId:1, quantity:3},
      {id:2, orderId: 1, productId:2, quantity:3}
      ]  
    },
    { id: 2 ,status: 2, userId:1, orderItems:[
      {id:2, orderId: 2, productId:2, quantity:3}
      ]  
    },
  ];
  private orderUrl = '';

  constructor(private http: HttpClient) { }

  getUserOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

}