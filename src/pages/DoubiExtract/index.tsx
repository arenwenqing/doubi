import React, { useCallback, useEffect, useState} from 'react'
import TopRolling from '@pages/Component/TopRolling'
import { useNavigate } from 'react-router-dom'
import { NavBar, Modal, Input, List, InfiniteScroll, Toast } from 'antd-mobile'
// import { sleep } from 'antd-mobile/es/utils/sleep'
import Api from 'src/apis'
import './index.less'

let number = 1
const showText = {
  1: '提取中',
  2: '已完成',
  3: '已退回'
}
let cacheDyIds = []
const DoubiExtract:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [coinNum, setCoinNum] = useState(0)
  const [extractNum, setEextractNum] = useState(0)
  const [douyin, setDouyin] = useState('')
  const [dyIds, setDyIds] = useState([])
  const [showDyIds, setShowDyIds] = useState(false)

  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const navigate = useNavigate()
  const closeModal = () => {
    setVisible(false)
  }
  const back = useCallback(() => {
    navigate({
      pathname: '/home'
    })
  }, [])

  // 抖币提取
  const getCoinHistory = async () => {
    Api.getCoinHostory({
      page: number,
      pageSize: 10,
      userId: userInfo.userId
    }).then(res => {
      setData(val => [...val, ...res.data])
      setHasMore(res.data?.length > 0)
      if (res.data?.length) {
        number += 1
      }
    }, err => {
      Toast.show({
        content: err.err_msg
      })
    })
  }

  // async function mockRequest() {
  //   await sleep(2000)
  //   if (number > 3) {
  //     return []
  //   }
  //   return ['1', '1', '1', '1']
  // }
  async function loadMore() {
    await getCoinHistory()
  }
  const homeBack = () => {
    navigate({
      pathname: '/home'
    })
  }

  const extractHandle = () => {
    // if (!coinNum) {
    //   return Toast.show({
    //     content: <span>当前抖币数量为 <label style={{ color: 'red' }}>0</label></span>
    //   })
    // }
    setVisible(true)
  }

  const coinChangeHandle = (val) => {
    setEextractNum(val)
  }

  const douYinChangeHandle = (val) => {
    setDouyin(val)
    const tempArr = cacheDyIds.filter(item => item.indexOf(val) !== -1)
    setDyIds(tempArr)
  }

  // 抖币提取
  const coinExtract = () => {
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    Api.coinExtract({
      userId: userInfo.userId,
      drawDyMoneyAmount: extractNum,
      dyId: douyin
    }).then(res => {
      if (!res.data.isDrawEnable) {
        Toast.show({
          content: res.data.drawFailedMsg
        })
      } else {
        Toast.clear()
        Toast.show({
          content: '提取成功'
        })
        number = 1
        getCoinInfo()
        getCoinHistory()
        setVisible(false)
      }
    }, err => {
      Toast.show({
        content: err.drawFailedMsg
      })
      setTimeout(() => {
        Toast.clear()
      }, 2000)
    })
  }

  // 获取抖币信息
  const getCoinInfo = () => {
    Api.getCoinInfo({
      userId: userInfo.userId
    }).then((res => {
      setCoinNum(res.data.dyMoneyAmount??0)
    }), err => {
      console.log(err)
      Toast.show({
        content: err.msg
      })
    })
  }

  // 抖音号记录
  const getDyIds = () => {
    Api.getDyIds({
      userId: userInfo.userId
    }).then(res => {
      setDyIds(res.data??[])
      cacheDyIds = res.data??[]
    }, () => {
      Toast.show({
        content: '获取抖音号失败，请输入'
      })
    })
  }

  // 获取焦点
  const dyFocus = () => {
    setTimeout(() => {
      setShowDyIds(true)
    }, 100)
  }

  // 失去焦点
  const dyBlur = () => {
    setTimeout(() => {
      setShowDyIds(false)
    }, 0)
  }

  // 选择抖音号
  const choiceDyIds = (val) => {
    setDouyin(val)
  }

  useEffect(() => {
    getCoinInfo()
  }, [])

  useEffect(() => {
    if (visible) {
      getDyIds()
    }
  }, [visible])

  return <div className='extract-wrapper'>
    <NavBar
      onBack={back}
      back='返回'
    >
      抖币提取
    </NavBar>
    <TopRolling />
    <div className='extract-header-wrapper'>
      <div className='extract-header'>
        <div className='extract-header-top'>
          <span className='user-portrait'>
            <img className='portrait-icon' src={userInfo.avatarUrl || 'https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'}></img>
          </span>
          <span className='user-name'>{userInfo.nickName || '游客'}</span>
        </div>
        <div className='extract-header-bottom'>
          <span>可提取抖币</span>
          <span>{coinNum}</span>
        </div>
      </div>
      <div className='extract-btn' onClick={extractHandle}>
        <span>提取</span>
      </div>
    </div>
    <div className='home-back' onClick={homeBack}>
      <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/home-icon.png' />
      <span className='doubi-tiqu-text'>返回首页</span>
    </div>
    <div className='extract-list-wrapper'>
      <List>
        {
          data.map((item, i) => {
            return <List.Item key={i}>
              <div className={ item.status === 3 ? 'extract-list-item extract-list-item2' : 'extract-list-item'}>
                <div className='extract-list-content'>
                  <div className='list-item-top'>
                    <span className='list-item-user'>{item.name || '--'}</span>
                    <span>
                      <label>提取抖币</label>
                      <label className='list-item-num'>{item.drawDyMoneyAmount || 0}</label>
                    </span>
                    <span className='list-item-zhi'>至</span>
                    {
                      item.status === 3 ? <span className='list-item-error'>抖音账号异常</span> : ''
                    }
                  </div>
                  <div className='list-item-bottom'>
                    <span className='list-item-time'>{item.drawTime || '--'}</span>
                    <span>
                      <label>抖音</label>
                      <label className='list-item-douyin-number'>{item.dyId || '--'}</label>
                    </span>
                    <span className={ item.status === 3 ? 'list-item-operation-btn list-item-operation-btn2' : 'list-item-operation-btn'}>
                      <label>{showText[item.status]}</label>
                    </span>
                  </div>
                </div>
              </div>
            </List.Item>
          })
        }
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
    <Modal
      bodyClassName='extract-modal-wrapper'
      visible={visible}
      title={<div className='extract-modal-title'>
        <span>可提取抖币</span>
        <img className='icon-close' onClick={closeModal} src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
      </div>}
      content={<div className='extract-modal-content'>
        <div className='extract-modal-doubi-num'>{coinNum}</div>
        <div className='extract-modal-form'>
          <div className='form-item'>
            <span className='form-item-name'>提取抖币</span>
            <Input
              placeholder='请输入10~50000整数'
              className='form-input-style'
              onChange={coinChangeHandle}
              type='number'
              clearable
            />
          </div>
          <div className='form-item'>
            <span className='form-item-name'>选择抖音号</span>
            <Input
              placeholder='请输入抖音号'
              className='form-input-style'
              clearable
              onChange={douYinChangeHandle}
              onFocus={dyFocus}
              value={douyin}
              onBlur={dyBlur}
            />
            {
              <ul className={ showDyIds ? 'form-douyin-id-ul' : 'form-douyin-id-ul hide'}>
                {
                  dyIds.map((list, k) => {
                    return <li key={k} onClick={choiceDyIds.bind(this, list)}>{list}</li>
                  })
                }
              </ul>
            }
          </div>
        </div>
        <div className='extract-bottom-wrapper'>
          <div className='extract-bottom-btn' onClick={coinExtract}>
            <span>确定</span>
          </div>
          <div className='extract-bottom-text'>系统会按照您选择或输入的抖音号进行充值</div>
        </div>
      </div>
      }
      closeOnAction
      onClose={() => {
        setVisible(false)
      }}
    />

  </div>
}
export default DoubiExtract