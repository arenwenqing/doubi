/// <reference types="src/types/axios-service" />
/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
declare class Apis {
    /**
     * 获取验证码
     */
    getVerifyCode: import("axios-service").IAxiosFun;
    /**
     * 注册
     */
    registerFromPhone: import("axios-service").IAxiosFun;
    /**
     * 登录
     */
    login: import("axios-service").IAxiosFun;
    /**
     * 用户-找回密码
     */
    getBackPwd: import("axios-service").IAxiosFun;
    /**
     * 用户-钥匙数量信息
     */
    getKeyMessage: import("axios-service").IAxiosFun;
    /**
     * 用户-抖币信息
     */
    getDymoney: import("axios-service").IAxiosFun;
    /**
     * 【首页】飘屏
     */
    getFloatScreen: import("axios-service").IAxiosFun;
    /**
     * 【首页】公屏
     */
    getCommonScreen: import("axios-service").IAxiosFun;
    /**
     * 【首页】盒子-开
     */
    lotteryDraw: import("axios-service").IAxiosFun;
    /**
     * 获取钥匙数量
     */
    getKeys: import("axios-service").IAxiosFun;
    /**
     * 【抖币】抖币-提取记录
     */
    getCoinHostory: import("axios-service").IAxiosFun;
    /**
     * 【用户】用户-抖币信息
     */
    getCoinInfo: import("axios-service").IAxiosFun;
    /**
     * 【抖币】抖币-提取
     */
    coinExtract: import("axios-service").IAxiosFun;
    /**
     * 【首页】钥匙-充值-钥匙信息列表
     */
    rechargeKeysList: import("axios-service").IAxiosFun;
    /**
     * 【首页】钥匙-充值-预支付-微信
     */
    prepareWx: import("axios-service").IAxiosFun;
    /**
     * 【支付】钥匙-充值-预支付-支付宝
     */
    prepareAliPay: import("axios-service").IAxiosFun;
    /**
     * 【抖币】抖币提取-抖音号记录
     */
    getDyIds: import("axios-service").IAxiosFun;
    /**
     * 【盒子】盒子-记录
     */
    getLotteryHistory: import("axios-service").IAxiosFun;
    /**
     * 【用户代理】推广员个人信息
     */
    getProxyUser: import("axios-service").IAxiosFun;
    /**
     * 【用户代理】续期
     */
    userRenewal: import("axios-service").IAxiosFun;
    /**
     * 【用户代理】修改支付宝
     */
    modifyAlipay: import("axios-service").IAxiosFun;
    /**
     * 【用户代理】注册新的推广员
     */
    proxyUserRegister: import("axios-service").IAxiosFun;
    /**
     * 【用户代理】下级代理用户数据检索
     */
    getSubList: import("axios-service").IAxiosFun;
    /**
     * 【用户代理】推广员个人销售数据
     */
    getSaleData: import("axios-service").IAxiosFun;
    /**
     * 【首页】兑换钥匙
     */
    exchargeCode: import("axios-service").IAxiosFun;
    /**
     * 【小程序】生成跳转小程序链接
     */
    createMiniProgram: import("axios-service").IAxiosFun;
}
export declare const ServiceApis: typeof Apis;
declare const _default: Apis;
export default _default;
