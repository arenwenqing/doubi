import React from 'react'
import { ErrorBlock } from 'antd-mobile'
import './index.less'

const RollingList:React.FC = () => {
  return <div className='rolling-list-wrapper'>
    {/* <div className='list-content'>
      {
        [1,1,1,11,1,1,1].map((item, i) => {
          return <div className='list-item' key={i}>
            <span>
              <label className='list-item-name'>我***懂</label>
              <label className='list-item-prize-name'>开出了“嘉年华”</label>
            </span>
            <span>
              <label className='list-item-value'>价值抖币</label>
              <label className='list-item-num'>99999</label>
            </span>
          </div>
        })
      }
    </div> */}
    <ErrorBlock
      className='err-block'
      title={null}
      image='https://cdn.tuanzhzh.com/doubi-image/home-empty.png'
      description={<span>暂无开奖信息</span>}
    />
  </div>
}
export default RollingList
