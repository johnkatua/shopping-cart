import { FC } from "react";
import { Cart } from "../types/Cart";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useCartStore } from "../store/cartStore";


const CartPage: FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore(state => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    updateQuantity: state.updateQuantity
  }))

  const columns: TableColumnsType<Cart> = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Total Price (ksh)',
      dataIndex: 'totalPrice'
    },
    {
      title: 'Actions',
      dataIndex: '',
      render: (_, record) => (
        <>
          <Button
            type="primary" 
            onClick={() => updateQuantity(record.id, 1)}
          >
            Add
          </Button>
          {" "}
          <Button
            type="primary" 
            onClick={() => updateQuantity(record.id, -1)}
          >
            Subtract
          </Button>
          {" "}
          <Button
            type="primary" 
            onClick={() => removeFromCart(record.id)}
          >
            Remove
          </Button>
        </>
      )
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={cart}
    />
  )
}

export default CartPage;