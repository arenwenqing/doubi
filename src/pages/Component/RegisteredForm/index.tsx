import React, { useCallback, useContext, useState } from 'react'
import { Form, Input, Button, Toast as ShowToast } from 'antd-mobile'
import Toast from '@pages/Component/Toast'
import Apis from 'src/apis'
import { Context, setLoginCurrentKey } from 'src/store'
import './index.less'
let count = 60
const RegisteredForm:React.FC = () => {
  const [verificaationText, setVerificaationText] = useState('获取验证码')
  const [text, setText] = useState('账号注册成功请登录')
  const { dispatch } = useContext(Context)
  const [showToast, setShowToast] = useState(false)
  const [form] = Form.useForm()
  const registerHandle = async () => {
    const obj = await form.validateFields()
    Apis.registerFromPhone(obj).then(res => {
      // 注册成功，跳转到登录
      if (res.data.registerResult) {
        ShowToast.show({
          icon: 'success',
          content: '注册成功，请登录'
        })
        dispatch(setLoginCurrentKey('login'))
      } else {
        setShowToast(true)
        setText(res.data.registerMsg)
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
    })
  }

  const pkgNameRule = {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号不合法'
  }

  const passwordRule = {
    pattern: /^[a-zA-Z0-9]{8,16}$/,
    message: '8~16位数字、英文混合'
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
        ShowToast.show({
          icon: 'fail',
          content: res.data.sendMsg
        })
      }
    }, err => {
      ShowToast.show({
        icon: 'fail',
        content: err.sendMsg
      })
    })
  }

  return <div className='resgister-form-wrapper'>
    <Form layout='horizontal' form={form} requiredMarkStyle='none'>
      <div className='login-item'>
        <span className='login-item-title'>邀请码</span>
        <div className='login-item-component'>
          <Form.Item name='invitationCode' rules={[{ required: true, message: '请输入邀请码'}]}>
            <Input placeholder='请输入邀请码' clearable className='input-style' />
          </Form.Item>
        </div>
      </div>
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
        <span className='login-item-title'>密码</span>
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
      <span>注册</span>
    </div>
    <Toast content={text} visible={showToast} />
  </div>
}
export default RegisteredForm