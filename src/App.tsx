import { ReactNode, FC, useState } from 'react'
import { Badge, Card } from 'antd'

import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage'
import './App.css'

const tabList = [
  {
    key: 'productList',
    label: 'Product List'
  },
  {
    key: 'cart',
    label: <Badge size='small' count={1} offset={[8, 1]} status='processing'>Cart</Badge>
  }
]

const App: FC = () => {
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
