import { Product } from "../../products/product.model";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}
