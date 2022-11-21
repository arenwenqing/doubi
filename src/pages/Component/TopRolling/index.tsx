import React, { useMemo } from 'react'
import { NoticeBar } from 'antd-mobile'
import './index.less'

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
  return <div className='notice-wrapper'>
    <NoticeBar content={noticeDom} delay={800} icon={null} color='info' />
  </div>
}
export default TopRolling