import { orderItem } from './orderItem';

export interface Order {
  id: number;
  totalPrice?: number;
  status:number;
  address?:string;
  userId: string;
  orderItems: orderItem[];
  
  // Nehal's Code
  // id: string;
  // totalPrice:number;
  // status: string;
  // address:string;
  // userId:number;
}
