import React, { useCallback } from 'react'
import TopRolling from '@pages/Component/TopRolling'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import './index.less'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const back = useCallback(() => {
    navigate({
      pathname: '/home'
    })
  }, [])

  return <div className='login-wrapper'>
    <NavBar
      onBack={back}
      back='返回'
    >
    </NavBar>
    <TopRolling />
  </div>
}
export default Login