import { Product } from "./Product";

export interface Cart extends Product {
  quantity: number
}


export interface CartState {
  cart: Cart[],
  addToCart: (product: Product) => void;
}
