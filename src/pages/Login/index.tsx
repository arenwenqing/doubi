import React, { useCallback, useContext } from 'react'
import TopRolling from '@pages/Component/TopRolling'
import { NavBar, CapsuleTabs } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import LoginForm from '@pages/Component/LoginForm'
import RegisteredForm from '@pages/Component/RegisteredForm'
import { Tmap } from './interface'
import { Context, setLoginCurrentKey } from 'src/store'
import './index.less'

const Login: React.FC = () => {
  // const [currentKey, setCurrentKey] = useState('login')
  const { state, dispatch } = useContext(Context)
  const {
    loginCurrentKey
  } = state
  const navigate = useNavigate()
  const componentMap: Tmap = {
    login: <LoginForm />,
    registered: <RegisteredForm />
  }
  const back = useCallback(() => {
    navigate({
      pathname: '/home',
      search: window.location.search
    })
  }, [])

  const tabChangeHandle = useCallback((key: string) => {
    dispatch(setLoginCurrentKey(key))
  }, [])

  return <div className='login-wrapper'>
    <NavBar
      onBack={back}
      back='返回'
    >
    </NavBar>
    <TopRolling height={48} speed={3} />
    <CapsuleTabs className='login-btn-wrapper' onChange={tabChangeHandle} activeKey={loginCurrentKey}>
      <CapsuleTabs.Tab title='登录' key='login' />
      <CapsuleTabs.Tab title='注册' key='registered' />
    </CapsuleTabs>
    {
      componentMap[loginCurrentKey]
    }
  </div>
}
export default Login