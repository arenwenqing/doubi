import srcConfig from '../requestConfig'
import { getRequestsByRoot } from 'axios-service'

const root = srcConfig.APIS.root

const { post, get } = getRequestsByRoot({ root })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   * 获取验证码
   */
  getVerifyCode = post('/mystery/user/register/phone/verifyCode')

  /**
   * 注册
   */
  registerFromPhone = post('/mystery/user/register/phone')

  /**
   * 登录
   */
  login = post('/mystery/user/login/phone')

  /**
   * 用户-找回密码
   */
  getBackPwd = post('/mystery/user/password/reset')

  /**
   * 用户-钥匙数量信息
   */
  getKeyMessage = get('/mystery/user/keyInfo')

  /**
   * 用户-抖币信息
   */
  getDymoney = get('/mystery/user/dymoney')

  /**
   * 【首页】飘屏
   */
  getFloatScreen = get('/mystery/announce/floatScreen')

  /**
   * 【首页】公屏
   */
  getCommonScreen = get('/mystery/announce/commonScreen')

  /**
   * 【首页】盲盒-开
   */
  lotteryDraw = post('/mystery/box/lottery/draw')

  /**
   * 获取钥匙数量
   */
  getKeys = get('/mystery/user/keyInfo')
}

export const ServiceApis = Apis;
export default new Apis()
