import React, { useContext, useEffect, useState } from 'react'
import { Mask, Input, Button, Toast } from 'antd-mobile'
import { Context, setExchangeCodeModal, getKeys } from '../../store'
import Api from 'src/apis'
import './index.less'

const ExchangeCode = () => {
  const [value, setValue] = useState<string>()
  const { state, dispatch } = useContext(Context)
  const {
    exchangeCodeModal
  } = state

  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const closeModal = () => {
    dispatch(setExchangeCodeModal({
      ...exchangeCodeModal,
      visible: false
    }))
  }

  const valueChange = (e) => {
    setValue(e)
  }

  const exchargeCodeHandle = () => {
    Api.exchargeCode({
      userId: userInfo.userId,
      exchangeCode: value?.trim()
    }).then(res => {
      if (res.data.exchangeSuccess) {
        Toast.show({
          icon: 'success',
          content: '兑换成功'
        })
        dispatch(getKeys({
          userId: userInfo.userId
        }))
        dispatch(setExchangeCodeModal({
          ...exchangeCodeModal,
          visible: false
        }))
      } else {
        Toast.show({
          icon: 'fail',
          content: res.data.exchangeFailedMsg
        })
      }
    })
  }

  useEffect(() => {
    if (exchangeCodeModal.visible) {
      setValue('')
    }
  }, [exchangeCodeModal.visible])

  return <div className='exchange-wrapper'>
    <Mask visible={exchangeCodeModal.visible} opacity={0.8}>
      <div className='exchange-code-wrapper'>
        <img onClick={closeModal} className='recharge-key-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='exchange-code-content'>
          <Input placeholder='请输入兑换码' className='input-style' value={value} onChange={valueChange} />
          <Button shape='rounded' className='sure-btn' onClick={exchargeCodeHandle}>
            <span>确定</span>
          </Button>
        </div>
      </div>
    </Mask>
  </div>
}
export default ExchangeCode
