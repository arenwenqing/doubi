import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Mask, Button } from 'antd-mobile'
import { setLotteryModal, Context, lotteryDraw, setViewModal } from '../../store'
import RechargeKey from '../RechargeKey'
import { genId } from 'src/utils'
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
    lotteryModal,
    keyInfo
  } = state
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')

  // const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const closeModal = () => {
    dispatch(setLotteryModal({
      visible: false
    }))
  }

  const showLotteryModal = (num) => {
    const currentKeyInfo = keyInfo.find(item => item.keyType === lotteryModal.currentBoxType)
    if (currentKeyInfo.keyCount === 0) {
      dispatch(setViewModal({
        visible: true,
        num: currentKeyInfo.keyCount,
        type: lotteryModal.currentBoxType
      }))
      return
    }
    dispatch(lotteryDraw({
      userId: userInfo.userId,
      keyInfo: {
        keyType: lotteryModal.currentBoxType,
        keyCount: num
      }
    }))
  }

  const renderDom = useMemo(() => {
    if (!maxValue.bigPicUrl) {
      const randomId = genId()
      return <img className='load-draw-img' src={`https://cdn.tuanzhzh.com/doubi-image/open-dh.png?id=${randomId}`} />
    }
    return ''
  }, [maxValue])

  useEffect(() => {
    const index = lotteryModal.lotteryDataSource?.giftList?.findIndex(item => item.giftId === lotteryModal.lotteryDataSource?.maxValueGiftId)
    const findObj = lotteryModal.lotteryDataSource?.giftList?.find(item => item.giftId === lotteryModal.lotteryDataSource?.maxValueGiftId) || {}
    const tempArr = JSON.parse(JSON.stringify(lotteryModal.lotteryDataSource?.giftList || []))
    tempArr.splice(index, 1)
    setMaxValue(findObj)
    setList(tempArr)
  }, [lotteryModal])

  return <div className='lottery-wrapper'>
    <Mask visible={lotteryModal.visible}>
      <div className='lottery-content'>
        <img onClick={closeModal} className='lottery-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='load-draw-dh'>
          {
            renderDom
          }
        </div>
        <div>
          <div className='max-value-lottery'>
            {
              maxValue.bigPicUrl && <img src={maxValue.bigPicUrl} />
            }
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
        </div>
        <div className='lottery-box-xiang-btn-wrapper'>
          <Button shape='rounded' className='one-key-btn' onClick={showLotteryModal.bind(this, 1)}>
            {/* <span className='one-key-bg-icon'></span> */}
            <span>抽1次</span>
          </Button>
          <Button shape='rounded' className='ten-key-btn' onClick={showLotteryModal.bind(this, 10)}>
            {/* <span className='ten-key-bg-icon'></span> */}
            <span>10连抽</span>
          </Button>
        </div>
      </div>
    </Mask>
    <RechargeKey />
  </div>
}
export default Lottery