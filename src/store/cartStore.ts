import { create } from "zustand";
import { CartState } from "../types/Cart";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(persist((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const existingProduct = get().cart.find((item) => item.id === product.id)
    if (existingProduct) {
      set(state => ({
        cart: state.cart.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
        )
      }));
    } else {
      set(state => ({
        cart: [...state.cart, { ...product, quantity: 1 }]
      }));
    }
  },
  removeFromCart: (productId) => {
    set(state => ({
      cart: state.cart.filter(item => item.id !== productId)
    }));
  },
  updateQuantity(productId, value) {
    set(state => ({
      cart: state.cart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + value } : item
      ).filter(item => item.quantity > 0)
    }));
  }
}), { name: 'cart-storage'}))