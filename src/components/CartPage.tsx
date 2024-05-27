import { Dispatch, FC, SetStateAction } from "react";
import { Cart } from "../types/Cart";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useCartStore } from "../store/cartStore";

interface CartPageProps {
  cart: Cart[],
  setCart: Dispatch<SetStateAction<Cart[]>>,
}

const CartPage: FC<CartPageProps> = ({ setCart }) => {
  const { cart, removeFromCart } = useCartStore(state => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart
  }))

  const removeItemFromCart = (item: Cart) => {
    const { id } = item;
    setCart(cart.filter((el) => el.id !== id))
  }

  const updateQuantity = (item: Cart, action: string) => {
    const { id } = item;
    setCart(prev => prev.map(el => {
      if (el.id === id) {
        const { quantity } = el;
        const newQuantity = action === 'add' ? quantity + 1 : quantity - 1;
        if (newQuantity <= 0) {
          removeItemFromCart(el)
          return null
        }
        return { ...el, quantity: newQuantity }
      } else {
        return el
      }
    }).filter(Boolean) as Cart[])
  }
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
            onClick={() => updateQuantity(record, 'add')}
          >
            Add
          </Button>
          {" "}
          <Button
            type="primary" 
            onClick={() => updateQuantity(record, 'subtract')}
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