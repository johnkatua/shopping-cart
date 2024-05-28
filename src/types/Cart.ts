import { Product } from "./Product";

export interface Cart extends Product {
  quantity: number
}


export interface CartState {
  cart: Cart[],
  addToCart: (product: Product) => void,
  removeFromCart: (productId: number) => void,
  updateQuantity: (productId: number, value: number) => void
}
