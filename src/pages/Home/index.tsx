import React, { useEffect } from 'react'
// import Api from './apis'
import Test from '@pages/Test'
import './index.less'

const Home: React.FC = () => {
  useEffect(() => {
    // Api.getUser()
  }, [])

  return <>
    <div className='home2-page'>
      这是首页
    </div>
    <div className='renw'>呵呵呵</div>
    <Test />
  </>
}
export default Home