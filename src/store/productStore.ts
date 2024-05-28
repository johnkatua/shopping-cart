import { fetchProducts } from "../services/productService";
import { create } from 'zustand';
import { ProductState } from "../types/Product";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  fetchProducts: async () => {
    const products = await fetchProducts();
    set({ products })
  }
}))