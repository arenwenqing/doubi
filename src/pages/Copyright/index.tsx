import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.less'

const Copyright: React.FC = () => {
  const [showHistoryRecord, setShowHistoryRecord] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const showHistoryRecordHandle = () => {
    navigate({
      pathname: '/history'
    })
  }

  useEffect(() => {
    if (location.pathname === '/extract') {
      setShowHistoryRecord(true)
    } else {
      setShowHistoryRecord(false)
    }
  }, [location.pathname])
  return <div className='copy-right'>
    <div className='copy-right-wrapper'>
      <span>Copyright</span>
      {
        showHistoryRecord && <span className='history-record' onClick={showHistoryRecordHandle}>历史记录</span>
      }
    </div>
  </div>
}
export default Copyright