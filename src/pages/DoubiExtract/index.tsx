import React, { useCallback, useState} from 'react'
import TopRolling from '@pages/Component/TopRolling'
import { useNavigate } from 'react-router-dom'
import { NavBar, Modal, Input, List, InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import './index.less'

let number = 1
const DoubiExtract:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<string[]>(['1', '1','1','1','1','1'])
  const [hasMore, setHasMore] = useState(true)

  const navigate = useNavigate()
  const closeModal = () => {
    setVisible(false)
  }
  const back = useCallback(() => {
    navigate({
      pathname: '/home'
    })
  }, [])
  async function mockRequest() {
    await sleep(2000)
    if (number > 3) {
      return []
    }
    return ['1', '1', '1', '1']
  }
  async function loadMore() {
    const append = await mockRequest()
    number += 1
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }
  const homeBack = () => {
    navigate({
      pathname: '/home'
    })
  }
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
            <img className='portrait-icon' src='https://cdn.tuanzhzh.com/doubi-image/no-login-icon.png'></img>
          </span>
          <span className='user-name'>刘德华</span>
        </div>
        <div className='extract-header-bottom'>
          <span>可提取抖币</span>
          <span>9999999</span>
        </div>
      </div>
      <div className='extract-btn' onClick={() => setVisible(true)}>
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
            console.log(item)
            return <List.Item key={i}>
              <div className={ i % 2 === 0 ? 'extract-list-item' : 'extract-list-item extract-list-item2'}>
                <div className='extract-list-content'>
                  <div className='list-item-top'>
                    <span className='list-item-user'>垃圾***呀</span>
                    <span>
                      <label>提取抖币</label>
                      <label className='list-item-num'>1243</label>
                    </span>
                    <span className='list-item-zhi'>至</span>
                    {
                      i % 2 !== 0 ? <span className='list-item-error'>抖音账号异常</span> : ''
                    }
                  </div>
                  <div className='list-item-bottom'>
                    <span className='list-item-time'>2022-03-24 23:34:12</span>
                    <span>
                      <label>抖音</label>
                      <label className='list-item-douyin-number'>34223KJKAQ</label>
                    </span>
                    <span className={ i % 2 === 0 ? 'list-item-operation-btn' : 'list-item-operation-btn list-item-operation-btn2'}>
                      <label>{ i % 2 === 0 ? '已完成' : '已退回'}</label>
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
        <div className='extract-modal-doubi-num'>99999</div>
        <div className='extract-modal-form'>
          <div className='form-item'>
            <span className='form-item-name'>提取抖币</span>
            <Input
              placeholder='请输入10~50000整数'
              className='form-input-style'
            />
          </div>
          <div className='form-item'>
            <span className='form-item-name'>选择抖音号</span>
            <Input
              placeholder='请输入抖音号'
              className='form-input-style'
            />
          </div>
        </div>
        <div className='extract-bottom-wrapper'>
          <div className='extract-bottom-btn'>
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