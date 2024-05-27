export interface Product {
  id: number,
  name: string,
  price: number,
  image: string,
  description: string
}

export interface ProductState {
  products: Product[],
  fetchProducts: () => Promise<void>
}