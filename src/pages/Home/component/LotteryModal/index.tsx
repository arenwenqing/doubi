import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Mask, Button } from 'antd-mobile'
import { setLotteryModal, Context, lotteryDraw, setViewModal, setShowCurrentBroadCast } from '../../store'
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
    if (findObj.giftColor === '#FFFFFF') {
      findObj.giftColor = '#2FBFFF'
    }
    setMaxValue(findObj)
    setList(tempArr)
    if (findObj.lotteryLevel === 1) {
      dispatch(setShowCurrentBroadCast({
        value: findObj.giftName,
        img: findObj.mainPicUrl
      }))
    }
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
          {
            maxValue.bigPicUrl && <div className='max-value-lottery' style={{ boxShadow: `inset 0px 0px 22px 0px ${maxValue.giftColor}`, border: `1px solid ${maxValue.giftColor}` }}>
              <div className='max-value-lottery-content'>
                <img src={maxValue.mainPicUrl} />
                <div style={{ color: maxValue.giftColor }}>{maxValue.giftName}</div>
                <div style={{ color: maxValue.giftColor }}>(价值抖币{maxValue.dyMoneyAmount})</div>
              </div>
            </div>
          }
          <ul className='lottery-list-ul'>
            {
              list.map((item, i) => {
                return <li className='lottery-list-item' key={i}>
                  <img src={item.mainPicUrl} />
                  <span className='lottery-list-title' style={{ color: item.giftColor }}>{item.giftName}</span>
                  <span className='lottery-list-dymomeny-amount' style={{ color: item.giftColor }}>
                    <label>价值抖币</label>
                    <label className='lottery-list-amount'>{item.dyMoneyAmount}</label>
                  </span>
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