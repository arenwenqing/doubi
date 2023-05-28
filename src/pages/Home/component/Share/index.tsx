import React, { useContext } from 'react'
import { Mask } from 'antd-mobile'
import { Context, setShareModal } from '../../store'
import './index.less'

const Share = () => {
  const { state, dispatch } = useContext(Context)
  const {
    shareModal
  } = state

  const closeModal = () => {
    dispatch(setShareModal({
      ...shareModal,
      visible: false
    }))
  }

  return <div className='share-wrapper'>
    <Mask visible={shareModal.visible} opacity={0.8}>
      <div className='share-content-wrapper'>
        <img onClick={closeModal} className='share-key-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='share-content'>
          <div className='share-title'>邀请朋友拿钥匙</div>
          <div className='share-gift'>
            <img src='https://cdn.tuanzhzh.com/doubi-image/share1.png' />
            <img src='https://cdn.tuanzhzh.com/doubi-image/share2.png' />
            <img src='https://cdn.tuanzhzh.com/doubi-image/share3.png' />
          </div>
          <img className='share-code' src={shareModal.data?.shareQrCodeUrl} />
          <div className='share-text-style'>
            <span>每邀请1名用户注册，双方各获得3把铜钥匙</span>
            <span>每名用户每日最多可通过邀请获得9把铜钥匙</span>
          </div>
        </div>
      </div>
    </Mask>
  </div>
}
export default Share