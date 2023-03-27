import React, { useContext } from 'react'
import { Mask, Input, Button } from 'antd-mobile'
import { Context, setExchangeCodeModal } from '../../store'

import './index.less'

const ExchangeCode = () => {
  const { state, dispatch } = useContext(Context)
  const {
    exchangeCodeModal
  } = state

  const closeModal = () => {
    dispatch(setExchangeCodeModal({
      ...exchangeCodeModal,
      visible: false
    }))
  }

  return <div className='exchange-wrapper'>
    <Mask visible={exchangeCodeModal.visible} opacity={0.8}>
      <div className='exchange-code-wrapper'>
        <img onClick={closeModal} className='recharge-key-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='exchange-code-content'>
          <Input placeholder='请输入兑换码' className='input-style' />
          <Button shape='rounded' className='sure-btn'>
            <span>确定</span>
          </Button>
        </div>
      </div>
    </Mask>
  </div>
}
export default ExchangeCode
