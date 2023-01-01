import React, { useContext, useEffect, useState } from 'react'
import { Mask } from 'antd-mobile'
import { Context, setViewModal } from '../../store'
import Api from 'src/apis'
import './index.less'

interface ListObjectType {
  extraKeyCount: number
  allKeyCount: number
  keyType: number
  price: number
  extraRatio: number
}
interface KeysListType {
  extraKeyMaxAllCount?: number
  extraKeyInfoList?: ListObjectType []
}
const keyMap = {
  3: 'https://cdn.tuanzhzh.com/doubi-image/tong-yaoshi.png',
  4: 'https://cdn.tuanzhzh.com/doubi-image/yin-yaoshi.png',
  5: 'https://cdn.tuanzhzh.com/doubi-image/jin-yaoshi.png'
}
const RechargeKey: React.FC = () => {
  const [active, setActive] = useState(-1)
  const [payVisible, setPayVisible] = useState(false)
  const [keysListInfo, setKeysListInfo] = useState<KeysListType>({})
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

  // 获取钥匙列表
  const rechargeKeysList = () => {
    Api.rechargeKeysList({
      keyType: viewModal.type
    }).then(res => {
      const tempArr = res.data?.filter(item => item.keyType === viewModal.type) || []
      setKeysListInfo(tempArr[0]??{})
    })
  }

  useEffect(() => {
    if (viewModal.visible) {
      setActive(-1)
      rechargeKeysList()
    }
  }, [viewModal.visible])

  return <div className='recharge-key-wrapper'>
    <Mask visible={viewModal.visible} opacity={0.8}>
      <div className='recharge-key-content'>
        <img onClick={closeModal} className='recharge-key-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='recharge-key-title'>
          <span className='recharge-name'>最高可多赠</span>
          <span className='recharge-key-gift-num'>{keysListInfo.extraKeyMaxAllCount??0}</span>
          <img className='recharge-key-icon' src={keyMap[viewModal.type]} />
        </div>
        <div className='recharge-key-item-content'>
          {
            keysListInfo.extraKeyInfoList?.map((item, i) => {
              console.log(item)
              return <div key={i} className='key-item-wrapper'>
                <div onClick={selectItem.bind(this, i)} className={ active === i ? 'key-item active' : 'key-item'}>
                  <img className='key-item-icon' src={keyMap[viewModal.type]} />
                  <span className='key-item-num'>{item.allKeyCount}把</span>
                </div>
                <div className='key-item-gift-text'>
                  <span>已赠送</span>
                  <span>{item.extraRatio}%</span>
                </div>
                <div className='key-item-gift-money'>{(item.price / 100).toFixed(2)}元</div>
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