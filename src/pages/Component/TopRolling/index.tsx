import React, { useEffect, useMemo, useState } from 'react'
import { NoticeBar, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import './index.less'

// const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
const TopRolling:React.FC = () => {
  const [dataList, setDataList] = useState<any[]>([])
  const noticeDom = useMemo(() => {
    return <div className='notice-content-wrapper'>
      {
        dataList.map((item, i) => {
          return <span key={i}>
            恭喜
            <span className='notice-tip-concent'>{item.user.nickName || '游客'}</span>
            开出了 <span className='notice-tip-concent'>{ item.gift.giftName }</span>
            <img src={item.gift.smallPicUrl} className='notice-content-lottery' />
            价值抖币
            <span className='notice-tip-concent'>{item.dyMoneyAmount}</span>
          </span>
        })
      }
    </div>
  }, [dataList])

  // 获取飘屏内容
  const getFloatScreen = () => {
    Apis.getFloatScreen().then(res => {
      console.log(res.data)
      setDataList(res.data??[])
    }, err => {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: '错误'
      })
    })
  }

  useEffect(() => {
    getFloatScreen()
  }, [])
  return <div className='notice-wrapper'>
    <NoticeBar content={noticeDom} delay={800} icon={null} color='info' />
  </div>
}
export default TopRolling