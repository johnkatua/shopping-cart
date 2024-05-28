import { FC, useEffect } from "react";
import { Button, Table, Tooltip } from "antd";
import type { TableColumnsType } from "antd";

import { Product } from "../types/Product";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";


const ProductsPage: FC = () => {
  const { addToCart } = useCartStore(state => ({
    addToCart: state.addToCart
  }))
  const { products, fetchProducts } = useProductStore((state) => ({ 
    products: state.products, fetchProducts: state.fetchProducts 
  }));

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
          onClick={() => addToCart(record)}
        >
          Add To Cart
        </Button>
      )
    }
  ]

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Table 
      columns={columns}
      dataSource={products}
    />
  )
}

export default ProductsPage