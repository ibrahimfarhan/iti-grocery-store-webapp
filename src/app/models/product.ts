export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  categoryName?: string;
  imgUrl?: string;
  categoryId?: number;
}
