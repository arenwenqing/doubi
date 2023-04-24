import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Space } from 'antd-mobile'
import './index.less'

const phoneHead = [
  130, 131,132, 155, 156, 185, 186, 176,
  175, 134, 135, 136, 137, 138, 139, 147, 150, 151, 152,
  157, 158, 159, 182, 183, 187, 188, 133, 153, 180, 189,
  192
]

const giftMap = [{
  img: 'https://cdn.tuanzhzh.com/doubi-image/feichuan.png',
  value: '糖果飞船'
}, {
  img: 'https://cdn.tuanzhzh.com/doubi-image/douyinyihao.png',
  value: '抖音1号'
}, {
  img: 'https://cdn.tuanzhzh.com/doubi-image/jianianhua.png',
  value: '嘉年华'
}]
function rand (min, max) {
  return Math.floor(Math.random()*(max - min)) + min;
}

const interval = {
  _active: new Set(),
  _id: 0,

  set(callback, delay) {
    const id = this._id++
    this._active.add(id)

    const handler = () => {
      if (!this._active.has(id)) {
        return
      }
      setTimeout(() => {
        callback()
        // handler()
      }, delay)
    }
    handler()
    return id
  },
  clear(id) {
    this._active.delete(id)
  }
}
const GiftBroadcast = (props) => {
  const [flag, setFlag] = useState(false)
  const [iphoneStart, setIphoneStart] = useState<any>()
  const [iphoneEnd, setIphoneEnd] = useState<any>()
  const [giftInfo, setGiftInfo] = useState<any>()
  const creatTimeRef = useRef<any>()
  const clearTimeRef = useRef<any>()
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const {
    showCurrentUser
  } = props

  const closeGift = () => {
    const dom = document.getElementById('gift_id')
    dom.classList.add('hide-dh')
    dom.classList.remove('show-dh')
    setFlag(false)
  }

  const randomHandle = useCallback(() => {
    creatTimeRef.current = interval.set(() => {
      const dom = document.getElementById('gift_id')
      dom.classList.remove('hide-dh')
      dom.classList.add('show-dh')
      const start = phoneHead[Math.floor((Math.random() * phoneHead.length))]
      const end = rand(1000, 9999)
      const obj = giftMap[Math.floor((Math.random() * giftMap.length))]
      setIphoneStart(start)
      setIphoneEnd(end)
      setGiftInfo(obj)
      setFlag(true)
    }, rand(15, 30) * 1000)
  }, [])

  const closeCurrentUserBroadcast = () => {
    setTimeout(() => {
      closeGift()
      randomHandle()
    }, 3000);
  }

  useEffect(()=> {
    if (flag) {
      clearTimeRef.current = interval.set(() => {
        interval.clear(creatTimeRef.current)
        interval.clear(clearTimeRef.current)
        closeGift()
        randomHandle()
      }, 3000)
    }
  }, [flag])

  useEffect(() => {
    if (showCurrentUser?.value && userInfo) {
      interval.clear(creatTimeRef.current)
      interval.clear(clearTimeRef.current)
      setTimeout(() => {
        const dom = document.getElementById('gift_id')
        dom.classList.remove('hide-dh')
        dom.classList.add('show-dh')
        setIphoneStart(userInfo.phoneNum.slice(0, 3))
        setIphoneEnd(userInfo.phoneNum.slice(7))
        setGiftInfo(showCurrentUser)
        setFlag(true)
        closeCurrentUserBroadcast()
      }, 2000);
    }
  }, [showCurrentUser])

  useEffect(() => {
    randomHandle()
    return () => {
      interval.clear(creatTimeRef.current)
      interval.clear(clearTimeRef.current)
    }
  }, [])
  return <div className='gift-broadcast-wrapper' id='gift_id'>
    <div className='gift-left'>
      <Space direction='vertical' block>
        <span className='gift-left-top'>
          <label className='gift-title'>恭喜</label>
          <label className='gift-price'>{iphoneStart || phoneHead[5]}****{iphoneEnd || '328'}</label>
        </span>
        <span>
          <label className='gift-title'>开出了</label>
          <label className='gift-price'>{giftInfo?.value || giftMap[1].value}</label>
        </span>
      </Space>
    </div>
    <img className='gift-img' src={giftInfo?.img || giftMap[1].img} />
    {/* <img className='gift-close' onClick={closeGift} src='https://cdn.tuanzhzh.com/doubi-image/gift-close.png' /> */}
  </div>
}
export default GiftBroadcast