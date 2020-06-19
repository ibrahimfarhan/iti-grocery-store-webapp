import { orderItem } from './orderItem';

export interface Order {
  id: number;
  totalPrice?: number;
  status:number;
  userId: number;
  address?:string;
  orderItems: orderItem[];
  // id: string;
  // status: string;
  // totalPrice:number;
  // address:string;
  // userId:number;
}

