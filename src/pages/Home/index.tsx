import React, { useEffect, useState } from 'react'
// import Api from './apis'
import { Divider, CapsuleTabs, Button } from 'antd-mobile'
import RollingList from '@pages/Component/RollingList'
import { useNavigate } from 'react-router-dom'
import TopRolling from '@pages/Component/TopRolling'
import useEnhancedReducerv from '../Component/UseEnhancedReducer'
import reducer, { Context, setViewModal, initialState, setDetailModal, setLotteryModal } from './store'
import RechargeKey from './component/RechargeKey'
import DetailDescription from './component/DetailDescription'
import Lottery from './component/LotteryModal'
// import Apis from 'src/apis'
import './index.less'

const boxMap = {
  tong: 'https://cdn.tuanzhzh.com/doubi-image/tong-box.png',
  yin: 'https://cdn.tuanzhzh.com/doubi-image/yin-box.png',
  gold: 'https://cdn.tuanzhzh.com/doubi-image/gold-box.png'
}
const Home: React.FC = () => {
  const [currentBox, setCurrentBox] = useState('tong')
  // const [keyData, setKeyData] = useState([{
  //   keyType: 3,
  //   keyCount: 0
  // }, {
  //   keyType: 4,
  //   keyCount: 0
  // }, {
  //   keyType: 5,
  //   keyCount: 0
  // }])
  const [state, dispatch] = useEnhancedReducerv(reducer, initialState)
  const navigate = useNavigate()
  useEffect(() => {
    // Api.getUser()
  }, [])


  const skipLoginPage = () => {
    navigate({
      pathname: '/login'
    })
  }

  const extractHandle = () => {
    navigate({
      pathname: '/extract'
    })
  }

  const addRechargeKey = (type) => {
    dispatch(setViewModal({
      visible: true,
      type
    }))
  }

  const capsuleTabChange = (key) => {
    setCurrentBox(key)
  }

  const showDetailDescription = () => {
    dispatch(setDetailModal({
      visible: true
    }))
  }

  const showLotteryModal = (num) => {
    dispatch(setLotteryModal({
      visible: true,
      num
    }))
  }

  // const getUserKeyInfo = () => {
  //   Apis.getKeyMessage().then(res => {
  //     res.data.keyCountInfoList?.length
  //   })
  // }

  useEffect(() => {
    if (window.localStorage.getItem('userId')) {

    }
  }, [])

  return <>
    <Context.Provider value={{ state, dispatch }}>
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
            <span className='key-add-btn' onClick={addRechargeKey.bind(this, 'tong')}>
              <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
            </span>
          </div>
          <div className='key-item'>
            <img className='key-type' src='https://cdn.tuanzhzh.com/doubi-image/yin-yaoshi.png' />
            <span className='key-num'>99999</span>
            <span className='key-add-btn' onClick={addRechargeKey.bind(this, 'yin')}>
              <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
            </span>
          </div>
          <div className='key-item'>
            <img className='key-type' src='https://cdn.tuanzhzh.com/doubi-image/jin-yaoshi.png' />
            <span className='key-num'>--</span>
            <span className='key-add-btn' onClick={addRechargeKey.bind(this, 'gold')}>
              <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
            </span>
          </div>
        </div>
        <Divider className='home-keys-divider' />
        <CapsuleTabs className='blind-box-btn-wrapper' onChange={capsuleTabChange}>
          <CapsuleTabs.Tab title='铜质盲盒' key='tong' />
          <CapsuleTabs.Tab title='银光盲盒' key='yin' />
          <CapsuleTabs.Tab title='金闪盲盒' key='gold' />
        </CapsuleTabs>
        <div className='home-box-xiang-wrapper'>
          <img className='box-xiang-icon' src={boxMap[currentBox]} />
          <span className='box-xiang-instructions' onClick={showDetailDescription}>详细说明</span>
        </div>
        <div className='home-box-xiang-btn-wrapper'>
          <Button shape='rounded' className='one-key-btn' onClick={showLotteryModal.bind(this, 1)}>
            <span className='one-key-bg-icon'></span>
            <span>X 1</span>
          </Button>
          <Button shape='rounded' className='ten-key-btn' onClick={showLotteryModal.bind(this, 10)}>
            <span className='ten-key-bg-icon'></span>
            <span>X 10</span>
          </Button>
        </div>
        <div className='home-doubi-extract' onClick={extractHandle}>
          <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/doubi-tiqu-icon.png' />
          <span className='doubi-tiqu-text'>抖币提取</span>
        </div>
        <RollingList />
      </div>
      <RechargeKey />
      <DetailDescription />
      <Lottery />
    </Context.Provider>
  </>
}
export default Home