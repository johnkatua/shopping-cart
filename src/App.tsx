import { ReactNode, FC, useState } from 'react'
import { Badge, Card } from 'antd'

import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage'
import './App.css'
import { useCartStore } from './store/cartStore'

const App: FC = () => {
  const { cart } = useCartStore(state => ({
    cart: state.cart
  }))

  const totalPrice: number = cart.reduce((total, { price, quantity }) => total + (price * quantity), 0);
  const [activeTabKey, setActiveTabKey] = useState<string>('productList');

  const onTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const contentList: Record<string, ReactNode> = {
    productList: <ProductsPage />,
    cart: (
      <CartPage />
    )
  }

  const tabList = [
    {
      key: 'productList',
      label: 'Product List'
    },
    {
      key: 'cart',
      label: <Badge size='small' count={cart.length} offset={[8, 1]} status='processing'>Cart</Badge>
    }
  ]
  return (
    <Card 
      style={{
        width: '100%',
        height: `calc(100vh - 20px)`,
        overflow: 'scroll'
      }}
      tabList={tabList}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<div>Total: {totalPrice}</div>}
      onTabChange={onTabChange}
      tabProps={{ size: 'middle' }}
    >
      {contentList[activeTabKey]}
    </Card>
  )
}

export default App
