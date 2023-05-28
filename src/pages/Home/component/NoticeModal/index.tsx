import React, { useContext } from 'react'
import { Mask } from 'antd-mobile'
import { Context, setNoticeModal } from '../../store'
import './index.less'

const NoticeModal: React.FC = () => {
  const { state, dispatch} = useContext(Context)
  const {
    noticeModal
  } = state

  const closeModal = () => {
    dispatch(setNoticeModal({
      visible: false
    }))
  }

  return <div className='notice-detail-description-wrapper'>
    <Mask visible={noticeModal.visible} opacity={0.8}>
      <div className='detail-description-content'>
        <img onClick={closeModal} className='detail-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='detail-title'>{noticeModal.data?.title || '公告'}</div>
        <ul className='detail-description-ul'>
          <li>{noticeModal.data.content || '暂无'}</li>
        </ul>
      </div>
    </Mask>
  </div>
}
export default NoticeModal