import React, { useCallback, useContext, useEffect, useRef, useState} from 'react'
// import TopRolling from '@pages/Component/TopRolling'
import { useNavigate } from 'react-router-dom'
import { NavBar, Modal, Input, List, InfiniteScroll, Toast } from 'antd-mobile'
// import { sleep } from 'antd-mobile/es/utils/sleep'
import Api from 'src/apis'
import moment from 'moment'
import CustomServiceModal from '../Component/CustomServiceModal'
import { Context, setCustomServiceModal } from '../../store'
import GiftBroadcast from '@pages/Component/GiftBroadcast'
import './index.less'

const showText = {
  1: '提取中',
  2: '已完成',
  3: '已退回'
}
let cacheDyIds = []
const DoubiExtract:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [coinNum, setCoinNum] = useState(0)
  const [extractNum, setEextractNum] = useState<any>('')
  const [douyin, setDouyin] = useState('')
  const [dyIds, setDyIds] = useState([])
  const [showDyIds, setShowDyIds] = useState(false)
  // const [customerVisible, setCustomerVisible] = useState(false)

  const { dispatch } = useContext(Context)

  const numRef = useRef(1)
  const isLoad = useRef(true)

  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  const navigate = useNavigate()
  // let number = 1
  const closeModal = () => {
    setVisible(false)
  }
  const back = useCallback(() => {
    navigate({
      pathname: '/home',
      search: window.location.search
    })
  }, [])

  // 抖币提取
  const getCoinHistory = async () => {
    if (!isLoad.current) return
    isLoad.current = false
    Api.getCoinHostory({
      page: numRef.current,
      pageSize: 10,
      userId: userInfo.userId
    }).then(res => {
      setData(val => {
        const temArr = [...val, ...res.data]
        temArr.forEach(item => {
          item.drawTime = moment(item.lotteryTime).format('YYYY-MM-DD HH:mm:ss')
        })
        return [...val, ...res.data]
      })
      setHasMore(res.data?.length > 0)
      if (res.data?.length) {
        numRef.current += 1
      }
    }, err => {
      Toast.show({
        content: err.err_msg
      })
    }).finally(() =>{
      isLoad.current = true
    })
  }

  async function loadMore() {
    await getCoinHistory()
  }

  const contactCustomService = () => {
    dispatch(setCustomServiceModal({
      visible: true
    }))
  }

  const homeBack = () => {
    navigate({
      pathname: '/home',
      search: window.location.search
    })
  }

  const extractHandle = () => {
    // if (!coinNum) {
    //   return Toast.show({
    //     content: <span>当前抖币数量为 <label style={{ color: 'red' }}>0</label></span>
    //   })
    // }
    if (!userInfo.userId) {
      return Toast.show({
        content: '请先登录',
        duration: 2000
      })
    }
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
    if ((extractNum * 1) % 10 !== 0 || extractNum * 1 > 50000) {
      Toast.show({
        content: '请输入10的整数倍,最大50000',
        duration: 2000
      })
      return
    }
    if (!extractNum || !douyin) {
      Toast.show({
        content: '抖币数量或抖音号为空',
        duration: 2000
      })
      return
    }
    setConfirmModalVisible(true)
  }

  const suerHandle = () => {
    setConfirmModalVisible(false)
    Toast.show({
      icon: 'loading',
      content: '加载中…'
    })
    Api.coinExtract({
      userId: userInfo.userId,
      drawDyMoneyAmount: extractNum * 1,
      dyId: douyin
    }).then(res => {
      if (!res.data.isDrawEnable) {
        Toast.show({
          content: res.data.drawFailedMsg
        })
      } else {
        Toast.clear()
        Toast.show({
          content: '提取申请将在1小时内完成',
          duration: 2000
        })
        // number = 1
        numRef.current = 1
        setData([])
        getCoinInfo()
        getCoinHistory()
        setVisible(false)
        // setTimeout(() => {
        //   setCustomerVisible(true)
        // }, 500);
      }
    }, err => {
      Toast.show({
        content: err.drawFailedMsg
      })
      setTimeout(() => {
        Toast.clear()
      }, 3000)
    })
  }

  // 获取抖币信息
  const getCoinInfo = () => {
    Api.getCoinInfo({
      userId: userInfo.userId
    }).then((res => {
      setCoinNum(res.data.dyMoneyAmount??0)
    }), err => {
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

  const cancelHandle = () => {
    setConfirmModalVisible(false)
  }

  useEffect(() => {
    getCoinInfo()
  }, [])

  useEffect(() => {
    if (visible) {
      getDyIds()
      setEextractNum('')
      setDouyin('')
    }
  }, [visible])

  return <div className='extract-wrapper'>
    <NavBar
      onBack={back}
      back='返回'
    >
      抖币提取
    </NavBar>
    {/* <TopRolling height={48} speed={3} /> */}
    <GiftBroadcast />
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
    <div className='home-back contact-customer' onClick={contactCustomService}>
      <img className='doubi-tiqu' src='https://cdn.tuanzhzh.com/doubi-image/kefu.png' />
      <span className='doubi-tiqu-text'>联系客服</span>
    </div>
    <div className='extract-list-wrapper'>
      <List>
        {
          data.map((item, i) => {
            return <List.Item key={i}>
              <div className={ item.status.code === 3 ? 'extract-list-item extract-list-item2' : 'extract-list-item'}>
                <div className='extract-list-content'>
                  <div className='list-item-top'>
                    <span className='list-item-user'>{userInfo.nickName || '--'}</span>
                    <span>
                      <label>提取抖币</label>
                      <label className='list-item-num'>{item.drawDyMoneyAmount || 0}</label>
                    </span>
                    <span className='list-item-zhi'>至</span>
                    {
                      item.status.code === 3 ? <span className='list-item-error'>账号异常</span> : ''
                    }
                  </div>
                  <div className='list-item-bottom'>
                    <span className='list-item-time'>{item.drawTime || '--'}</span>
                    <span>
                      <label>抖音</label>
                      <label className='list-item-douyin-number'>{item.dyId || '--'}</label>
                    </span>
                    <span className={ item.status.code === 3 ? 'list-item-operation-btn list-item-operation-btn2' : 'list-item-operation-btn'}>
                      <label>{showText[item.status.code]}</label>
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
              placeholder='请输入10的整数倍,最大50000'
              className='form-input-style'
              onChange={coinChangeHandle}
              value={extractNum}
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
              dyIds.length && <ul className={ showDyIds ? 'form-douyin-id-ul' : 'form-douyin-id-ul hide'}>
                {
                  dyIds.map((list, k) => {
                    return <li key={k} onClick={choiceDyIds.bind(this, list)}>{list}</li>
                  })
                }
              </ul>
            }
          </div>
        </div>
        {/* <div className='extract-bottom-text-style'>
          <span>活动期间抖币最小提取1000</span>
          <span>活动期间每日9点~12点，16点~20点可提取抖币</span>
        </div> */}
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
    <Modal
      bodyClassName='confirm-modal-wrapper'
      visible={confirmModalVisible}
      title={null}
      content={
        <div className='confirm-modal-content'>
          <span className='confirm-content-title'>您将提取<label className='confirm-content-tip'>{extractNum}</label>抖币至抖音号<label className='confirm-content-tip'>{douyin}</label></span>
          <span className='confirm-content-tip'>当日多次小额提取抖币可能导致抖音账号风控，短时间内无法充值抖币</span>
          <div className='confirm-content-btn'>
            <span className='btn-cancle' onClick={cancelHandle}>取消</span>
            <span className='btn-sure' onClick={suerHandle}>确定</span>
          </div>
        </div>
      }
    />
    {/* <Modal
      bodyClassName='customer-service-modal-wrapper'
      visible={customerVisible}
      title='您的抖币提取已提交'
      content={<div className='customer-content'>
        <img className='customer-img' src='https://cdn.tuanzhzh.com/doubi-image/Wechat-k.jpeg' />
        <span className='customer-content-tip'>请务必添加客服微信以完成后续校验</span>
        <span className='customer-content-btn' onClick={() => setCustomerVisible(false)}>确定</span>
      </div>}
    /> */}
    <CustomServiceModal />
  </div>
}
export default DoubiExtract