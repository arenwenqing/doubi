import React, { useCallback } from 'react'
import TopRolling from '@pages/Component/TopRolling'
import { useNavigate } from 'react-router-dom'
import { NavBar, List } from 'antd-mobile'
import './index.less'

const History:React.FC = () => {
  const data = ['1', '1','1','1','1','1']
  const navigate = useNavigate()
  const back = useCallback(() => {
    navigate({
      pathname: '/home'
    })
  }, [])
  const homeBack = () => {
    navigate({
      pathname: '/home'
    })
  }
  return <div className='history-wrapper'>
    <NavBar
      onBack={back}
    >
      历史记录
    </NavBar>
    <TopRolling />
    <div className='home-back' onClick={homeBack}>
      <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/home-icon.png' />
      <span className='doubi-tiqu-text'>返回首页</span>
    </div>
    <div className='extract-list-wrapper'>
      <List>
        {
          data.map((item, i) => {
            console.log(item)
            return <List.Item key={i}>
              <div className={ i % 2 === 0 ? 'extract-list-item' : 'extract-list-item extract-list-item2'}>
                <div className='extract-list-content'>
                  <div className='list-item-top'>
                    <span>
                      <span className='list-item-user'>202210170098</span>
                      <span>海***</span>
                    </span>
                    {
                      i % 2 !== 0 ? <span className='list-item-prize-name'>小心心</span> : ''
                    }
                  </div>
                  <div className='list-item-bottom'>
                    <span className='list-item-time'>2022-03-24 23:34:12</span>
                    <span className='list-item-bottom-right'>
                      <label>抖音价值</label>
                      <label className='list-item-douyin-number'>99999</label>
                    </span>
                  </div>
                </div>
              </div>
            </List.Item>
          })
        }
      </List>
    </div>
  </div>
}
export default History