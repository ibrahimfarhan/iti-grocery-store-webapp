export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  categoryName?: string;
  categoryId?: number;
  imgUrl?: string;
  categoryId?:number;
}
