import { ReactNode, FC, useState } from 'react'
import { Card } from 'antd'

import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage'
import './App.css'
import { Cart } from './types/Cart'

const tabList = [
  {
    key: 'productList',
    label: 'Product List'
  },
  {
    key: 'cart',
    label: 'Cart'
  }
]

const App: FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('productList');
  const [cart, setCart] = useState<Cart[]>([]);

  const onTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const contentList: Record<string, ReactNode> = {
    productList: <ProductsPage 
      setCart={setCart}
      cart={cart}
    />,
    cart: (
      <CartPage  
        cart={cart}
        setCart={setCart}
      />
    )
  }
  return (
    <Card 
      style={{
        width: '100%',
        height: `calc(100vh - 20px)`,
        overflow: 'scroll'
      }}
      tabList={tabList}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<div>Total: 0</div>}
      onTabChange={onTabChange}
      tabProps={{ size: 'middle' }}
    >
      {contentList[activeTabKey]}
    </Card>
  )
}

export default App
