import React, { useEffect, useState } from 'react'
// import Api from './apis'
import { Divider, CapsuleTabs, Button, Modal, Toast, Space } from 'antd-mobile'
import RollingList from '@pages/Component/RollingList'
import { useNavigate } from 'react-router-dom'
// import TopRolling from '@pages/Component/TopRolling'
// import TopRolling2 from '@pages/Component/TopRolling/index'
import GiftBroadcast from '@pages/Component/GiftBroadcast'
import useEnhancedReducerv from '../Component/UseEnhancedReducer'
import reducer, {
  Context,
  setViewModal,
  initialState,
  setDetailModal,
  lotteryDraw,
  getKeys,
  setExchangeCodeModal,
  setShareModal
} from './store'
import RechargeKey from './component/RechargeKey'
import DetailDescription from './component/DetailDescription'
import ExchangeCode from './component/ExchangeCode'
import Lottery from './component/LotteryModal'
import { getUrlParams } from 'src/utils'
import CustomServiceModal from '../Component/CustomServiceModal'
import Share from './component/Share'
// import { Context as globalContext, setCustomServiceModal } from '../../store'
import './index.less'

const boxMap = {
  3: 'https://cdn.tuanzhzh.com/doubi-image/tong-box2.png',
  4: 'https://cdn.tuanzhzh.com/doubi-image/yin-box2.png',
  5: 'https://cdn.tuanzhzh.com/doubi-image/jin-box.png'
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
  // const { dispatch: globalDispatch } = useContext(globalContext)
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const [state, dispatch] = useEnhancedReducerv(reducer, initialState)
  const navigate = useNavigate()

  const {
    keyInfo,
    showCurrentBroadCast
  } = state

  const skipLoginPage = () => {
    if (!userInfo.userId) {
      navigate({
        pathname: '/login',
        search: window.location.search
      })
    }
  }

  // const contactCustomService = () => {
  //   globalDispatch(setCustomServiceModal({
  //     visible: true
  //   }))
  // }

  const extractHandle = () => {
    navigate({
      pathname: '/extract',
      search: window.location.search
    })
  }

  const addRechargeKey = (type, num) => {
    if (!userInfo.userId) {
      return Toast.show({
        content: '请先登录',
        duration: 2000
      })
    }
    dispatch(setViewModal({
      visible: true,
      num,
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
    // lotteryDraw(num)
    const currentKeyInfo = keyInfo.find(item => item.keyType === currentBox * 1)
    if (currentKeyInfo.keyCount < num) {
      Toast.show({
        content: '请点击上方+按钮购买钥匙',
        duration: 2000
      })
      return
    }
    if (currentKeyInfo.keyCount === 0) {
      dispatch(setViewModal({
        visible: true,
        num: currentKeyInfo.keyCount,
        type: currentBox * 1
      }))
      return
    }
    dispatch(lotteryDraw({
      userId: userInfo.userId,
      keyInfo: {
        keyType: currentBox * 1,
        keyCount: num
      }
    }))
  }

  const logout = () => {
    try {
      window.localStorage.removeItem('user')
      Toast.show({ content: '退出成功', position: 'center' })
      setLoginInfo({
        nickName: '请登录',
        avatarUrl: 'https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'
      })
      // forceUpdate()
    } catch (error) {
      Toast.show({ content: '退出失败', position: 'center' })
    }
  }

  const exchangeHandle = () => {
    dispatch(setExchangeCodeModal({
      visible: true
    }))
  }

  const shareHandle = () => {
    dispatch(setShareModal({
      visible: true
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
    const tempObj:any = getUrlParams()
    if (Object.keys(tempObj).length && tempObj.origin === 'finishPay') {
      Modal.show({
        content: <div className='modal-echarge-wrapper'>
          <span className='modal-echarge-title'>您已购成功充值<span className='modal-echarge-success'>{tempObj.keyCount}</span>把</span>
          <img className='modal-echarge-success-key' src={keyIcon[tempObj.keyType]} />
        </div>,
        actions: [{
          key: 'online',
          text: '确认',
          className: 'modal-echarge-success-btn',
          onClick: () => {
            window.location.replace(window.location.origin + window.location.pathname)
            Modal.clear()
          }
        }]
      })
    }
  }, [])

  return <>
    <Context.Provider value={{ state, dispatch }}>
      <div className='home-page'>
        {/* <TopRolling /> */}
        {/* <TopRolling2 height={48} speed={3} /> */}
        <GiftBroadcast showCurrentUser={showCurrentBroadCast} />
        <div className='home-user-wrapper'>
          <div className='home-user-content'>
            <span className='user-portrait'>
              <img className='portrait-icon' src={loginInfo.avatarUrl || 'https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'}></img>
            </span>
            <span className='user-name' onClick={skipLoginPage}>{loginInfo.nickName || '游客'}</span>
            <Button
              color='danger'
              className={ userInfo.userId ? 'user-logout-btn' : 'hide user-logout-btn'}
              size='mini'
              onClick={async () => {
                const result = await Modal.confirm({
                  content: '您确定要退出么？',
                  bodyClassName: 'user-logout-modal'
                })
                if (result) {
                  logout()
                  // Toast.show({ content: '点击了确认', position: 'center' })
                } else {
                  // Toast.show({ content: '点击了取消', position: 'center' })
                }
              }}
            >
              退出
            </Button>
          </div>
          <Space className='home-operation-btn'>
            <label onClick={shareHandle}>分享</label>
            <label onClick={exchangeHandle}>兑换钥匙</label>
          </Space>
        </div>
        <div className='home-keys-wrapper'>
          {
            keyInfo.map((item, i) => {
              return <div className='key-item' key={i}>
                <img className='key-type' src={keyIcon[item.keyType]} />
                <span className='key-num'>{item.keyCount}</span>
                <span className='key-add-btn' onClick={addRechargeKey.bind(this, item.keyType, item.keyCount)}>
                  <img className='add-plus-icon' src='https://cdn.tuanzhzh.com/doubi-image/plus.png' />
                </span>
              </div>
            })
          }
        </div>
        <img style={{ display: 'none' }} src='https://cdn.tuanzhzh.com/doubi-image/open-dh.png' />
        <Divider className='home-keys-divider' />
        <CapsuleTabs className='blind-box-btn-wrapper' onChange={capsuleTabChange}>
          <CapsuleTabs.Tab title='铜质盒子' key={3} />
          <CapsuleTabs.Tab title='银光盒子' key={4} />
          <CapsuleTabs.Tab title='金闪盒子' key={5} />
        </CapsuleTabs>
        <div className='home-box-xiang-wrapper'>
          <img className='box-xiang-icon' src={boxMap[currentBox]} />
          <span className='box-xiang-instructions' onClick={showDetailDescription}>详细说明</span>
        </div>
        <div className='home-box-xiang-btn-wrapper'>
          <Button shape='rounded' className='one-key-btn' onClick={showLotteryModal.bind(this, 1)}>
            {/* <span className='one-key-bg-icon'></span> */}
            <span>抽1次</span>
          </Button>
          <Button shape='rounded' className='ten-key-btn' onClick={showLotteryModal.bind(this, 10)}>
            {/* <span className='ten-key-bg-icon'></span> */}
            <span>10连抽</span>
          </Button>
        </div>
        <div className='home-doubi-extract' onClick={extractHandle}>
          <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/doubi-tiqu-icon.png' />
          <span className='doubi-tiqu-text'>抖币提取</span>
        </div>
        {/* <div className='home-doubi-extract contact-customer' onClick={contactCustomService}>
          <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/kefu.png' />
          <span className='doubi-tiqu-text'>联系客服</span>
        </div> */}
        <RollingList />
      </div>
      <RechargeKey />
      <DetailDescription />
      <Lottery />
      <CustomServiceModal />
      <ExchangeCode />
      <Share />
    </Context.Provider>
  </>
}
export default Home