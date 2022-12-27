import React, { useEffect, useMemo } from 'react'
import { NoticeBar, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import './index.less'

// const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
const TopRolling:React.FC = () => {
  const noticeDom = useMemo(() => {
    return <div className='notice-content-wrapper'>
      恭喜
      <span className='notice-tip-concent'>任文庆</span>
      开出了
      价值抖币价值抖币价值抖币价值抖币价值抖币
      <span className='notice-tip-concent'>3000</span>
    </div>
  }, [])

  // 获取飘屏内容
  const getFloatScreen = () => {
    Apis.getFloatScreen().then(res => {
      console.log(res.data)
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