import React, { useEffect, useState } from 'react'
// import Api from './apis'
import { Divider, CapsuleTabs, Button } from 'antd-mobile'
import RollingList from '@pages/Component/RollingList'
import { useNavigate } from 'react-router-dom'
import TopRolling from '@pages/Component/TopRolling'
import useEnhancedReducerv from '../Component/UseEnhancedReducer'
import reducer, { Context, setViewModal, initialState, setDetailModal, lotteryDraw, getKeys } from './store'
import RechargeKey from './component/RechargeKey'
import DetailDescription from './component/DetailDescription'
import Lottery from './component/LotteryModal'
// import Apis from 'src/apis'
import './index.less'

const boxMap = {
  3: 'https://cdn.tuanzhzh.com/doubi-image/tong-box.png',
  4: 'https://cdn.tuanzhzh.com/doubi-image/yin-box.png',
  5: 'https://cdn.tuanzhzh.com/doubi-image/gold-box.png'
}
const keyIcon = {
  3: 'https://cdn.tuanzhzh.com/doubi-image/tong-yaoshi.png',
  4: 'https://cdn.tuanzhzh.com/doubi-image/yin-yaoshi.png',
  5: 'https://cdn.tuanzhzh.com/doubi-image/jin-yaoshi.png'
}

const Home: React.FC = () => {
  const [currentBox, setCurrentBox] = useState(3)
  const [loginInfo, setLoginInfo] = useState({
    nickName: '请登录',
    avatarUrl: 'https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'
  })
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const [state, dispatch] = useEnhancedReducerv(reducer, initialState)
  const navigate = useNavigate()

  const {
    keyInfo
  } = state

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
    lotteryDraw(num)
    dispatch(lotteryDraw({
      userId: userInfo.userId,
      keyInfo: {
        keyType: currentBox * 1,
        keyCount: num
      }
    }))
  }

  useEffect(() => {
    if (Object.keys(userInfo).length) {
      dispatch(getKeys({
        userId: userInfo.userId
      }))
      setLoginInfo({
        ...userInfo
      })
    }
  }, [])

  return <>
    <Context.Provider value={{ state, dispatch }}>
      <div className='home-page'>
        <TopRolling />
        <div className='home-user-wrapper'>
          <span className='user-portrait'>
            <img className='portrait-icon' src={loginInfo.avatarUrl || 'https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'}></img>
          </span>
          <span className='user-name' onClick={skipLoginPage}>{loginInfo.nickName || '游客'}</span>
        </div>
        <div className='home-keys-wrapper'>
          {
            keyInfo.map((item, i) => {
              return <div className='key-item' key={i}>
                <img className='key-type' src={keyIcon[item.keyType]} />
                <span className='key-num'>{item.keyCount}</span>
                <span className='key-add-btn' onClick={addRechargeKey.bind(this, item.keyType)}>
                  <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
                </span>
              </div>
            })
          }
        </div>
        <Divider className='home-keys-divider' />
        <CapsuleTabs className='blind-box-btn-wrapper' onChange={capsuleTabChange}>
          <CapsuleTabs.Tab title='铜质盲盒' key={3} />
          <CapsuleTabs.Tab title='银光盲盒' key={4} />
          <CapsuleTabs.Tab title='金闪盲盒' key={5} />
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