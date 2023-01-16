import React, { useEffect, useState } from 'react'
import { Toast } from 'antd-mobile'
import Apis from 'src/apis'
import './index.less'

interface ScrollProps {
  height: number; // 容器的高度
  speed: number; // 滚动的速度，越大则滚动的越快，反之越慢
  [key: string]: any
}

const TopRolling: React.FC<ScrollProps> = () => {
  const [dataList, setDataList] = useState<any[]>([])

  // 获取飘屏内容
  const getFloatScreen = () => {
    Apis.getFloatScreen().then(res => {
      const tempArr = res.data?.splice(0, 3)
      setDataList(tempArr)
    }, err => {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: err.msg
      })
    })
  }

  useEffect(() => {
    getFloatScreen()
  }, [])
  return <div className='top-rolling-wrapper'>
    <div className='top-rolling-content'>
      {
        [1, 2].map((list) => {
          return <ul className='top-rolling-ul' key={list}>
            {
              dataList.map((item, i) => {
                return <li key={i} className='item-list-li'>
                  {/* <span className='float-title'>恭喜</span> */}
                  <span className='float-user-name'>{item.user.nickName.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2') || '游客'}</span>
                  <span className='float-open-title'>开出</span>
                  <span className='float-open-gift-name'>{ item.gift.giftName }</span>
                  <img src={item.gift.bigPicUrl} className='notice-content-lottery' />
                  <span className='doubi-value'>价值抖币</span>
                  <span className='doubi-number'>{item.gift.dyMoneyAmount}</span>
                </li>
              })
            }
          </ul>
        })
      }
    </div>
  </div>
}
export default TopRolling