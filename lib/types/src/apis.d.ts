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
     * 【首页】盲盒-开
     */
    lotteryDraw: import("axios-service").IAxiosFun;
    /**
     * 获取钥匙数量
     */
    getKeys: import("axios-service").IAxiosFun;
}
export declare const ServiceApis: typeof Apis;
declare const _default: Apis;
export default _default;
