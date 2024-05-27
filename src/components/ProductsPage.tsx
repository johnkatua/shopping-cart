import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Table, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { Product } from "../types/Product";
import { fetchProducts } from "../services/productService";
import { Cart } from "../types/Cart";

interface ProductsPageProps {
  setCart: Dispatch<SetStateAction<Cart[]>>,
  cart: Cart[]
}

const ProductsPage: FC<ProductsPageProps> = ({ cart, setCart }) => {
  const [products, setProducts] = useState<Product[]>([])

  const addItemToCart = (item: Product) => {
    const { id, name, price } = item;
    const existingProduct = cart.find(product => product.id === id);
    if (existingProduct) {
      setCart(cart.map((el) => el.id === id ? {
        ...el, name, quantity: el.quantity + 1, totalPrice: price * el.quantity
      } : el))
    } else {
      setCart([ ...cart, { id, name, quantity: 1, totalPrice: price }])
    }

  }

  const columns: TableColumnsType<Product> = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => (
        <img 
          src={image} 
          alt="Product Image" 
          style={{
            width: 80,
            height: 80,
            borderRadius: '5px'
          }}
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Price (ksh)',
      dataIndex: 'price'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: { showTitle: false },
      render: (description) => (
        <Tooltip title={description}>
          {description}
        </Tooltip>
      )
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => addItemToCart(record)}
        >
          Add To Cart
        </Button>
      )
    }
  ]

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchProducts();
      setProducts(res)
    }
    getProducts();
  }, [])
  return (
    <Table 
      columns={columns}
      dataSource={products}
    />
  )
}

export default ProductsPage