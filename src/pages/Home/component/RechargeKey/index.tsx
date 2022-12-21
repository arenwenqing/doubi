import React, { useContext, useState } from 'react'
import { Mask } from 'antd-mobile'
import { Context, setViewModal } from '../../store'
import './index.less'

const keyMap = {
  tong: 'https://cdn.tuanzhzh.com/doubi-image/tong-yaoshi.png',
  yin: 'https://cdn.tuanzhzh.com/doubi-image/yin-yaoshi.png',
  gold: 'https://cdn.tuanzhzh.com/doubi-image/jin-yaoshi.png'
}
const RechargeKey: React.FC = () => {
  const [active, setActive] = useState(-1)
  const [payVisible, setPayVisible] = useState(false)
  const { state, dispatch } = useContext(Context)
  const {
    viewModal
  } = state

  const closeModal = () => {
    dispatch(setViewModal({
      ...viewModal,
      visible: false
    }))
  }

  const closePay = () => {
    setPayVisible(false)
  }

  const selectItem = (index) => {
    setActive(index)
    setPayVisible(true)
  }

  return <div className='recharge-key-wrapper'>
    <Mask visible={viewModal.visible} opacity={0.8}>
      <div className='recharge-key-content'>
        <img onClick={closeModal} className='recharge-key-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='recharge-key-title'>
          <span className='recharge-name'>最高可多赠</span>
          <span className='recharge-key-gift-num'>40</span>
          <img className='recharge-key-icon' src={keyMap[viewModal.type]} />
        </div>
        <div className='recharge-key-item-content'>
          {
            [1,1,1,1,1,1].map((item, i) => {
              console.log(item)
              return <div key={i} className='key-item-wrapper'>
                <div onClick={selectItem.bind(this, i)} className={ active === i ? 'key-item active' : 'key-item'}>
                  <img className='key-item-icon' src={keyMap[viewModal.type]} />
                  <span className='key-item-num'>23把</span>
                </div>
                <div className='key-item-gift-text'>
                  <span>已赠送</span>
                  <span>4%</span>
                </div>
                <div className='key-item-gift-money'>8元</div>
              </div>
            })
          }
        </div>
      </div>
    </Mask>
    <Mask
      visible={payVisible}
      opacity={0.8}
    >
      <div className='pay-content'>
        <img onClick={closePay} className='pay-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='pay-title'>请选择支付方式</div>
        <div className='pay-way-content'>
          <div className='pay-way-item pay-way-item-wechat'>
            <img src='https://cdn.tuanzhzh.com/doubi-image/wechat.png' />
            <span className='pay-item-text'>微信支付</span>
          </div>
          <div className='pay-way-item'>
            <img src='https://cdn.tuanzhzh.com/doubi-image/alipay.png' />
            <span className='pay-item-text'>支付宝支付</span>
          </div>
        </div>
      </div>
    </Mask>
  </div>
}
export default RechargeKey