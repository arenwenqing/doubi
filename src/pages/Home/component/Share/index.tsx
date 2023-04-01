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
          <div className='share-title'>抖盒子真的能开出抖币</div>
          <div className='share-gift'>
            <img src='https://cdn.tuanzhzh.com/doubi-image/share1.png' />
            <img src='https://cdn.tuanzhzh.com/doubi-image/share2.png' />
            <img src='https://cdn.tuanzhzh.com/doubi-image/share3.png' />
          </div>
          <img className='share-code' src='https://cdn.tuanzhzh.com/doubi-image/new-share-code.png' />
        </div>
      </div>
    </Mask>
  </div>
}
export default Share