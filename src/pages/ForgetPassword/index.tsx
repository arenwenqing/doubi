import React, { useCallback, useState } from 'react'
import { NavBar, Form, Input, Button, Toast as ShowComToast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Toast from '../Component/Toast'
import Apis from 'src/apis'
import './index.less'

let count = 60
const ForgetPassword: React.FC = () => {
  const [verificaationText, setVerificaationText] = useState('获取验证码')
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const back = useCallback(() => {
    navigate({
      pathname: '/login'
    })
  }, [])

  const pkgNameRule = {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号不合法'
  }

  const passwordRule = {
    pattern: /^[a-zA-Z0-9]{8,16}$/,
    message: '8~16位数字、英文混合'
  }

  const registerHandle = async () => {
    const obj = await form.validateFields()
    Apis.getBackPwd(obj).then(res => {
      // 找回成功
      if (res.data.resetResult) {
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 2000);
        navigate({
          pathname: '/login'
        })
      } else {
        ShowComToast.show({
          icon: 'fail',
          content: res.data.resetMsg
        })
      }
    })
  }

  const getVerificationCode = useCallback(() => {
    if (count < 60) return
    form.validateFields(['phoneNum']).then(res => {
      console.log(res.data)
      let timerId = null
      verificationCode()
      setVerificaationText(`${count} s`)
      timerId = setTimeout(function run() {
        if (count < 1) {
          clearTimeout(timerId)
          setVerificaationText('获取验证码')
          count = 60
          return
        }
        count -= 1
        timerId = setTimeout(run, 1000)
        setVerificaationText(`${count} s`)
      }, 1000)
    }, err => {
      console.log(err)
    })
  }, [])

  const verificationCode = () => {
    Apis.getVerifyCode({
      phoneNum: form.getFieldsValue().phoneNum
    }).then(res => {
      console.log(res.data)
      if (!res.data.sendResult) {
        ShowComToast.show({
          icon: 'fail',
          content: res.data.sendMsg
        })
      }
    }, err => {
      ShowComToast.show({
        icon: 'fail',
        content: err.sendMsg
      })
    })
  }

  return <div className='forget-password-wrapper'>
    <NavBar
      onBack={back}
      back='返回'
    >
      找回密码
    </NavBar>
    <Form layout='horizontal' className='forget-form' form={form} requiredMarkStyle='none'>
      <div className='login-item'>
        <span className='login-item-title'>手机号</span>
        <div className='login-item-component'>
          <Form.Item name='phoneNum' validateTrigger={['onBlur']} rules={[
            { required: true, message: '请输入11位手机号'},
            pkgNameRule
          ]}>
            <Input placeholder='请输入11位手机号' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
      <div className='login-item'>
        <span className='login-item-title'>验证码</span>
        <div className='login-item-component'>
          <Form.Item noStyle name='verifyCode' rules={[{ required: true, message: '请输入验证码'}]}>
            <Input placeholder='请输入验证码' clearable className='input-style' />
          </Form.Item>
          <Button block shape='rounded' className='verification-btn' onClick={getVerificationCode}>
            {verificaationText}
          </Button>
        </div>
      </div>
      <div className='login-item'>
        <span className='login-item-title'>新密码</span>
        <div className='login-item-component'>
          <Form.Item name='passwd' validateTrigger={['onBlur']} rules={[
            { required: true, message: '8~16位数字、英文混合'},
            passwordRule
          ]}>
            <Input type='password' placeholder='8~16位数字、英文混合' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
    </Form>
    <div className='login-btn login-register-btn' onClick={registerHandle}>
      <span>确定</span>
    </div>
    <Toast content='密码修改成' visible={showToast} />
  </div>
}
export default ForgetPassword