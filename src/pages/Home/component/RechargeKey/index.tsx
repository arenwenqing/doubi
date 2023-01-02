import React, { useContext, useEffect, useState } from 'react'
import { Mask, Toast } from 'antd-mobile'
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
interface RechargeKeyType {
  keyInfo?: {
    keyType: number
    keyCount: number
  }
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
  const [rechargeKeyInfo, setRechargeKeyInfo] = useState<RechargeKeyType>({})
  const [htmlText, setHtmlText] = useState('')
  const { state, dispatch } = useContext(Context)
  const {
    viewModal
  } = state

  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const closeModal = () => {
    dispatch(setViewModal({
      ...viewModal,
      visible: false
    }))
  }

  const closePay = () => {
    setPayVisible(false)
  }

  const selectItem = (index, num) => {
    setActive(index)
    setPayVisible(true)
    setRechargeKeyInfo({
      keyInfo: {
        keyType: viewModal.type,
        keyCount: num * 1
      }
    })
  }

  const aliPay = () => {
    // setHtmlText('')
    // console.log(document.forms[0].submit())
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    Api.prepareAliPay({
      userId: userInfo.userId,
      ...rechargeKeyInfo
    }).then(res => {
      console.log(res.data)
      setHtmlText(res.data.payForm??'')
      document.forms[0].submit();
    }, () => {
      Toast.show({
        content: '支付异常，稍后重试'
      })
    }).finally(() => {
      Toast.clear()
    })
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
              return <div key={i} className='key-item-wrapper'>
                <div onClick={selectItem.bind(this, i, item.allKeyCount)} className={ active === i ? 'key-item active' : 'key-item'}>
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
          <div className='pay-way-item' onClick={aliPay}>
            <img src='https://cdn.tuanzhzh.com/doubi-image/alipay.png' />
            <span className='pay-item-text'>支付宝支付</span>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlText }}>
        {/* <form name="punchout_form" method="post" action="https://openapi.alipay.com/gateway.do?alipay_sdk=alipay-easysdk-java-2.2.2&app_id=2021003172658150&charset=UTF-8&format=json&method=alipay.trade.wap.pay&notify_url=https%3A%2F%2Fmystery.tuanzhzh.com%2Fapi%2F&return_url=https%3A%2F%2Fmystery.tuanzhzh.com%2Fapi%2Fmystery%2Fali%2Fkey%2Fdeposit%2Fpay%2Fcallback&sign=X%2BFlmzzOJ1Np0lVbt1PYTXaDKS52tXMnGsyfxsLbJBd9CMWfXUQYbYf3GuldxkTsY8pBZIqe%2Bv1PTwpDXoTHVwVi%2FPQT4HA9d%2FQ6J4rQMb5WGOkJ9g%2FKJL1KfgjTQvIKHI9d6U1Wni6UzNhMNG9BP2HOSr8e4VRxSG78mKPhIHN%2FWeQI0lMoAu853dUK8hhstAQmwPei6MXuFYYSoUVi3ufT9EEQBUXNWBpc%2F0yXlYVmfnqxgGydzaZAl7Pgv8oXP5uhHcVek%2BxJbMsp%2FDT1%2FibFhy4AQ9%2FRtjxpP9YN03hLoE1treAi%2Fbw1sS9dNMiRV9OGtT0Nj%2FqAO3gGTpg2Wg%3D%3D&sign_type=RSA2&timestamp=2023-01-01+20%3A55%3A24&version=1.0">
          <input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;2234567890&quot;,&quot;total_amount&quot;:&quot;0.10&quot;,&quot;quit_url&quot;:&quot;https://mystery.tuanzhzh.com/home&quot;,&quot;subject&quot;:&quot;test&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_WAY&quot;}" />
          <input type="submit" value="立即支付" style={{ display: 'none' }} />
        </form> */}
        {/* <script>document.forms[0].submit();</script> */}
      </div>
    </Mask>
  </div>
}
export default RechargeKey