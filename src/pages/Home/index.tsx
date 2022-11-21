import React, { useEffect } from 'react'
// import Api from './apis'
import { Divider, CapsuleTabs, Button } from 'antd-mobile'
import RollingList from '@pages/Component/RollingList'
import { useNavigate } from 'react-router-dom'
import TopRolling from '@pages/Component/TopRolling'
import './index.less'

const Home: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // Api.getUser()
  }, [])

  const skipLoginPage = () => {
    navigate({
      pathname: '/login'
    })
  }

  return <>
    <div className='home-page'>
      <TopRolling />
      <div className='home-user-wrapper'>
        <span className='user-portrait'>
          <img className='portrait-icon' src='https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'></img>
        </span>
        <span className='user-name' onClick={skipLoginPage}>请登录</span>
      </div>
      <div className='home-keys-wrapper'>
        <div className='key-item'>
          <img className='key-type' src='https://cdn.tuanzhzh.com/doubi-image/tong-yaoshi.png' />
          <span className='key-num'>99999</span>
          <span className='key-add-btn'>
            <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
          </span>
        </div>
        <div className='key-item'>
          <img className='key-type' src='https://cdn.tuanzhzh.com/doubi-image/yin-yaoshi.png' />
          <span className='key-num'>99999</span>
          <span className='key-add-btn'>
            <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
          </span>
        </div>
        <div className='key-item'>
          <img className='key-type' src='https://cdn.tuanzhzh.com/doubi-image/jin-yaoshi.png' />
          <span className='key-num'>--</span>
          <span className='key-add-btn'>
            <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
          </span>
        </div>
      </div>
      <Divider className='home-keys-divider' />
      <CapsuleTabs className='blind-box-btn-wrapper'>
        <CapsuleTabs.Tab title='铜质盲盒' key='fruits' />
        <CapsuleTabs.Tab title='银光盲盒' key='vegetables' />
        <CapsuleTabs.Tab title='金闪盲盒' key='animals' />
      </CapsuleTabs>
      <div className='home-box-xiang-wrapper'>
        <img className='box-xiang-icon' src='https://cdn.tuanzhzh.com/doubi-image/home-bao-xiang.png' />
        <span className='box-xiang-instructions'>详细说明</span>
      </div>
      <div className='home-box-xiang-btn-wrapper'>
        <Button shape='rounded' className='one-key-btn'>
          <span className='one-key-bg-icon'></span>
          <span>X 1</span>
        </Button>
        <Button shape='rounded' className='ten-key-btn'>
          <span className='ten-key-bg-icon'></span>
          <span>X 10</span>
        </Button>
      </div>
      <div className='home-doubi-extract'>
        <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/doubi-tiqu-icon.png' />
        <span className='doubi-tiqu-text'>抖币提取</span>
      </div>
      <RollingList />
    </div>
  </>
}
export default Home