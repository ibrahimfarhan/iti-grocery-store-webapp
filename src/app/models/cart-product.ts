import { Product } from './product';

export interface CartProduct {
  productId: number;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  imgUrl?: string[];
}
