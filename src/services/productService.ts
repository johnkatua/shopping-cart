import { Product } from "../types/Product";

const API_URL = 'http://localhost:5000/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const products =  await response.json()
  return products;
}