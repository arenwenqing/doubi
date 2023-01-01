import React, { useContext, useEffect, useState } from 'react'
import { Mask, Button } from 'antd-mobile'
import { setLotteryModal, Context, lotteryDraw } from '../../store'
import './index.less'

interface MaxValueType {
  bigPicUrl?: string
  smallPicUrl?: string
  [key: string]: any
}
const Lottery: React.FC = () => {
  const [maxValue, setMaxValue] = useState<MaxValueType>({})
  const [list, setList] = useState<MaxValueType[]>([])
  const { state, dispatch } = useContext(Context)
  const {
    lotteryModal
  } = state
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')

  // const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const closeModal = () => {
    dispatch(setLotteryModal({
      visible: false
    }))
  }

  const showLotteryModal = (num) => {
    dispatch(lotteryDraw({
      userId: userInfo.userId,
      keyInfo: {
        keyType: lotteryModal.currentBoxType,
        keyCount: num
      }
    }))
  }

  useEffect(() => {
    const index = lotteryModal.lotteryDataSource?.giftList?.findIndex(item => item.giftId === lotteryModal.lotteryDataSource?.maxValueGiftId)
    const findObj = lotteryModal.lotteryDataSource?.giftList?.find(item => item.giftId === lotteryModal.lotteryDataSource?.maxValueGiftId) || {}
    setMaxValue(findObj)
    const tempArr = JSON.parse(JSON.stringify(lotteryModal.lotteryDataSource?.giftList || []))
    tempArr.splice(index, 1)
    setList(tempArr)
  }, [lotteryModal])

  return <div className='lottery-wrapper'>
    <Mask visible={lotteryModal.visible}>
      <div className='lottery-content'>
        <img onClick={closeModal} className='lottery-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='max-value-lottery'>
          <img src={maxValue.bigPicUrl} />
        </div>
        <ul className='lottery-list-ul'>
          {
            list.map((item, i) => {
              return <li className='lottery-list-item' key={i}>
                <img src={item.smallPicUrl} />
              </li>
            })
          }
        </ul>
        <div className='lottery-box-xiang-btn-wrapper'>
          <Button shape='rounded' className='one-key-btn' onClick={showLotteryModal.bind(this, 1)}>
            <span className='one-key-bg-icon'></span>
            <span>X 1</span>
          </Button>
          <Button shape='rounded' className='ten-key-btn' onClick={showLotteryModal.bind(this, 10)}>
            <span className='ten-key-bg-icon'></span>
            <span>X 10</span>
          </Button>
        </div>
      </div>
    </Mask>

  </div>
}
export default Lottery