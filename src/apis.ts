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
  getVerifyCode = post('/api/mystery/user/register/phone/verifyCode')

  /**
   * 注册
   */
  registerFromPhone = post('/api/mystery/user/register/phone')

  /**
   * 登录
   */
  login = post('/api/mystery/user/login/phone')

  /**
   * 用户-找回密码
   */
  getBackPwd = post('/api/mystery/user/password/reset')

  /**
   * 用户-钥匙数量信息
   */
  getKeyMessage = get('/api/mystery/user/keyInfo')

  /**
   * 用户-抖币信息
   */
  getDymoney = get('/api/mystery/user/dymoney')

  /**
   * 【首页】飘屏
   */
  getFloatScreen = get('/api/mystery/announce/floatScreen')

  /**
   * 【首页】公屏
   */
  getCommonScreen = get('/api/mystery/announce/commonScreen')

  /**
   * 【首页】盲盒-开
   */
  lotteryDraw = post('/api/mystery/box/lottery/draw')

  /**
   * 获取钥匙数量
   */
  getKeys = get('/api/mystery/user/keyInfo')

  /**
   * 【抖币】抖币-提取记录
   */
  getCoinHostory = post('/api/mystery/dymoney/draw/history')

  /**
   * 【用户】用户-抖币信息
   */
  getCoinInfo = get('/api/mystery/user/dymoney')

  /**
   * 【抖币】抖币-提取
   */
  coinExtract = post('/api/mystery/dymoney/draw')

  /**
   * 【首页】钥匙-充值-钥匙信息列表
   */
  rechargeKeysList = get('/api/mystery/key/deposit/list')

  /**
   * 【首页】钥匙-充值-预支付-微信
   */
  prepareWx = post('/api/mystery/key/deposit/prepare/wx')

  /**
   * 【支付】钥匙-充值-预支付-支付宝
   */
  prepareAliPay = post('/api/mystery/key/deposit/prePay/ali')

  /**
   * 【抖币】抖币提取-抖音号记录
   */
  getDyIds = get('/api/mystery/dymoney/draw/history/dyId')

  /**
   * 【盲盒】盲盒-记录
   */
  getLotteryHistory = post('/api/mystery/box/lottery/history')
}

export const ServiceApis = Apis;
export default new Apis()
