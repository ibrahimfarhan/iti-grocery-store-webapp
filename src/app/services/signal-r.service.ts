import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  orderReceived = new EventEmitter<any>();

  constructor() { 
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () =>{
    this.hubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:22459/orderHub")
    .build();
  };

  public startConnection = () => {
    this.hubConnection.start()
    .then(()=> console.log("connection started..."))
    .catch(err => {
      console.log("Error happened while starting connection: "+ err);
    });

  };

  private registerOrders(){
    this.hubConnection.on("OrderReceived",(data)=>{
    console.log(data);
    this.orderReceived.emit(data);
    });
  }
}
