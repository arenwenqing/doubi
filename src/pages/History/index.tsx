import React, { useCallback, useEffect, useState } from 'react'
import TopRolling from '@pages/Component/TopRolling'
import { useNavigate } from 'react-router-dom'
import { NavBar, List, Toast } from 'antd-mobile'
import Apis from 'src/apis'
import './index.less'

const History:React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
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

  // 获取历史记录
  const getLotteryHistory = () => {
    Apis.getLotteryHistory({
      userId: userInfo.userId,
      page: 1,
      pageSize: 15
    }).then(res => {
      // let arr =[]
      res.data?.forEach((item, i) => {
        const tempArr = item.giftList?.filter(list => list.giftId === item.maxValueGiftId) || []
        res.data[i].giftList = tempArr
      })
      setData(res.data)
    }, () => {
      Toast.show({
        content: '获取历史记录出错'
      })
    })
  }

  useEffect(() => {
    getLotteryHistory()
  }, [])

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
            return <List.Item key={i}>
              <div className={ i % 2 === 0 ? 'extract-list-item' : 'extract-list-item extract-list-item2'}>
                <div className='extract-list-content'>
                  <div className='list-item-top'>
                    <span>
                      <span className='list-item-user'>{item.LotteryId??'--'}</span>
                      {/* <span>海***</span> */}
                    </span>
                    {
                      i % 2 !== 0 ? <span className='list-item-prize-name'>{item.giftList[0]?.giftName || '--'}</span> : ''
                    }
                  </div>
                  <div className='list-item-bottom'>
                    <span className='list-item-time'>{item.lotteryTime??'--'}</span>
                    <span className='list-item-bottom-right'>
                      <label>抖音价值</label>
                      <label className='list-item-douyin-number'>{item.giftList[0]?.dyMoneyAmount??0}</label>
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