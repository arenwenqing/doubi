import React, { Suspense, useEffect } from 'react'
import { Button, Tabs } from 'antd-mobile'
import Api from './apis'
import './index.css'

const Home: React.FC = () => {
  useEffect(() => {
    Api.getUser()
  }, [])

  return <Suspense fallback='加载中...'>
    <div className='home-page'>
      这是首页
      <Button block color='primary' size='large'>
        Block Button
      </Button>
      <Tabs>
        <Tabs.Tab title='水果' key='fruits'>
          菠萝
        </Tabs.Tab>
        <Tabs.Tab title='蔬菜' key='vegetables'>
          西红柿
        </Tabs.Tab>
        <Tabs.Tab title='动物' key='animals'>
          蚂蚁
        </Tabs.Tab>
      </Tabs>
    </div>
  </Suspense>
}
export default Home