import React, { useEffect, useContext } from 'react'
import { ErrorBlock } from 'antd-mobile'
import { Context, getCommonScreen } from 'src/pages/Home/store'
import './index.less'

const RollingList:React.FC = () => {
  const { state, dispatch } = useContext(Context)

  const {
    commonScreenData
  } = state

  useEffect(() => {
    dispatch(getCommonScreen())
  }, [])

  return <div className='rolling-list-wrapper'>
    <div className='list-content'>
      {
        commonScreenData.map((item, i) => {
          return <div className='list-item' id={`listItem${i}`} key={i}>
            <span>
              <label className='list-item-name'>{item.userName.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')}</label>
              <label className='list-item-prize-name'>开出了{`”${item.giftName}“`}</label>
            </span>
            <span>
              <label className='list-item-value'>价值抖币</label>
              <label className='list-item-num'>{item.dyMoneyAmount}</label>
            </span>
          </div>
        })
      }
    </div>
    {
      !commonScreenData.length && <ErrorBlock
        className='err-block'
        title={null}
        image='https://cdn.tuanzhzh.com/doubi-image/home-empty.png'
        description={<span>暂无开奖信息</span>}
      />
    }
  </div>
}
export default RollingList
