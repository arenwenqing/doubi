import React, { useContext } from 'react'
import { Mask } from 'antd-mobile'
import { setLotteryModal, Context } from '../../store'
import './index.less'

const Lottery: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  const {
    lotteryModal
  } = state

  const closeModal = () => {
    dispatch(setLotteryModal({
      visible: false
    }))
  }

  return <div className='lottery-wrapper'>
    <Mask visible={lotteryModal.visible}>
      <div className='lottery-content'>
        <img onClick={closeModal} className='lottery-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
      </div>
    </Mask>

  </div>
}
export default Lottery