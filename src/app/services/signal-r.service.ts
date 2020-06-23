import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  orderReceived = new EventEmitter<Order>();

  constructor() {
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:22459/orderHub")
      .build();
  };

  public startConnection = () => {
    this.hubConnection.start()
      .then(() => {
        console.log("connection started...")
        this.registerOrders();
      })
      .catch(err => {
        console.log("Error happened while starting connection: " + err);
      });

  };

  private registerOrders() {
    this.hubConnection.on("OrderReceived", (order: Order) => {
      console.log(order);
      this.orderReceived.emit(order);
    });
  }

  public userAddedOrder(order: Order) {
    if (this.hubConnection) {
      console.log(this.hubConnection);
      this.hubConnection.invoke("AddOrderToAdminPanel", order)
    }
  }
}
