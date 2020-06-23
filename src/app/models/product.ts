export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  description?: string;
  categoryName?: string;
  imgUrl?: string[];
  categoryId?: number;
}
