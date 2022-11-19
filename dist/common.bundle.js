(self["webpackChunkdoubi"] = self["webpackChunkdoubi"] || []).push([[592],{

/***/ 953:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(787);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);
// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(156);
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_);
// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js
var dist = __webpack_require__(250);
// EXTERNAL MODULE: external "antd-mobile"
var external_antd_mobile_ = __webpack_require__(862);
;// CONCATENATED MODULE: ./requestConfig/build.ts
/**
 * build 层配置信息
 * 注意: build层是基于node的, 不能用import等语法, 不能对讲exports出去的对象给pages进行计算, 不能有window等对象,
 */
// const process = require('process')
var IS_DEV = false; // process && process.env.NODE_ENV === 'development';
var PROD_CONF = {};
var DEV_CONF = {};
var CONFIG = {
    IS_DEV: IS_DEV,
    DEV: DEV_CONF,
    PROD: PROD_CONF,
    ENV: {
        SSO_LOGIN: true,
        PHONE_LOGIN: false
    }
};
// module.exports = CONFIG;
/* harmony default export */ var build = (CONFIG);

;// CONCATENATED MODULE: ./requestConfig/index.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var requestConfig_IS_DEV = build.IS_DEV;
var HOST = window.location.host;
var ORIGIN = window.location.origin;
var PATHNAME = window.location.pathname;
var SERACH = window.location.search;
var prodRootMap = {
    'test-legal.inkept.cn': {
        uploadMediaRoot: 'https://upload.inkept.cn/',
        uploadRoot: 'https://family-upload.inkept.cn/',
        root: 'https://test-legal.inkept.cn/',
        authRoot: 'https://test-purview.inkept.cn/',
        flowRoot: 'https://test-workflow.inkept.cn/'
    },
    'gray-legal.inkept.cn': {
        uploadMediaRoot: 'https://upload.inkept.cn/',
        uploadRoot: 'https://family-upload.inkept.cn/',
        root: 'https://gray-legal.inkept.cn/',
        authRoot: 'https://gray-purview.inkept.cn/',
        flowRoot: 'https://gray-workflow.inkept.cn/'
    },
    'legal.inkept.cn': {
        uploadMediaRoot: 'https://upload.inkept.cn/',
        uploadRoot: 'https://family-upload.inkept.cn/',
        root: 'https://legal.inkept.cn/',
        authRoot: 'https://purview.inkept.cn/',
        flowRoot: 'https://workflow.inkept.cn/'
    }
};
var rootObj = prodRootMap[Object.keys(prodRootMap).find(function (key) { return HOST.indexOf(key) === 0; })] || {};
var DEFAULT_ROOT = '/';
var getRootStr = function (rootStr) {
    return rootStr || DEFAULT_ROOT;
};
var PROD = {
    APIS: {
        uploadMediaRoot: getRootStr(rootObj.uploadMediaRoot),
        uploadRoot: getRootStr(rootObj.uploadRoot),
        flowRoot: getRootStr(rootObj.flowRoot),
        root: getRootStr(rootObj.root),
        authRoot: getRootStr(rootObj.authRoot)
    }
};
var DEV = {
    APIS: {
        uploadMediaRoot: DEFAULT_ROOT,
        uploadRoot: DEFAULT_ROOT,
        flowRoot: DEFAULT_ROOT,
        root: DEFAULT_ROOT,
        authRoot: DEFAULT_ROOT
    }
};
var ssoService = encodeURIComponent("".concat(ORIGIN + PATHNAME + SERACH));
// 开发环境权限总开关 false - 关闭权限菜单， true - 开启权限菜单
var devAuthority = true;
var OBJ = __assign(__assign(__assign({ SUPER_ADMIN: ['wanghl@inke.cn', 'lin@inke.cn'], IS_DEV: requestConfig_IS_DEV, USER_INFO_MOCK: false, 
    // 手机登录情况下，登录页面路由地址
    PHONE_LOGGIN_PATH: 'login', SSO_PAGE_SERVICE: "http://sso.inkept.cn/?service=".concat(ssoService), SSO_PAGE_URL: 'http://sso.inkept.cn', SSO_LOGOUT_PAGE_SERVICE: "https://sso.inkept.cn/api/v1/user/logout/?service=".concat(ssoService), build: build }, build.ENV), requestConfig_IS_DEV ? DEV : PROD), { 
    // 该系统权限标识，获取请联系 @李宁，2 为测试系统
    // http://wiki.inkept.cn/pages/viewpage.action?pageId=50851740
    AUTH_SYSTEM_ID: 2, 
    // 系统中文名称
    SYSTEM_CHINA_NAME: '固定资产管理系统 ', 
    // 系统英文缩写
    SYSTEM_US_NAME: 'Legal', 
    // 系统地址
    SYSTEM_URL: 'legal.inkept.cn', 
    // 权限总开关 false - 关闭权限菜单， true - 开启权限菜单
    authority: requestConfig_IS_DEV ? devAuthority : true, 
    // 使用情况监控，获取请联系 @赵通，-1 则全局关闭监控
    // http://wiki.inkept.cn/pages/viewpage.action?pageId=54597351
    LOG_SYSTEM_SOURCE: -1 });
/* harmony default export */ var requestConfig = (OBJ);

// EXTERNAL MODULE: ./node_modules/axios-service/index.js
var axios_service = __webpack_require__(127);
;// CONCATENATED MODULE: ./src/pages/Home/apis.ts


// const root = srcConfig.APIS.root
console.log(axios_service.getRequestsByRoot, requestConfig);
// const { get } = getRequestsByRoot({ root })
// console.log(get)
// class Apis  {
//   getUser = get('/legal/api/v1/user/loginInfo')
// }
var Apis = {
    getUser: function () {
        return 111;
    }
};
/* harmony default export */ var apis = (Apis);

;// CONCATENATED MODULE: ./src/pages/Home/index.tsx




var Home = function () {
    (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
        apis.getUser();
    }, []);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(external_root_React_commonjs2_react_commonjs_react_amd_react_.Suspense, { fallback: '\u52A0\u8F7D\u4E2D...' },
        external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", { className: 'home-page' },
            "\u8FD9\u662F\u9996\u9875",
            external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(external_antd_mobile_.Button, { block: true, color: 'primary', size: 'large' }, "Block Button"),
            external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(external_antd_mobile_.Tabs, null,
                external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(external_antd_mobile_.Tabs.Tab, { title: '\u6C34\u679C', key: 'fruits' }, "\u83E0\u841D"),
                external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(external_antd_mobile_.Tabs.Tab, { title: '\u852C\u83DC', key: 'vegetables' }, "\u897F\u7EA2\u67FF"),
                external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(external_antd_mobile_.Tabs.Tab, { title: '\u52A8\u7269', key: 'animals' }, "\u8682\u8681"))));
};
/* harmony default export */ var pages_Home = (Home);

;// CONCATENATED MODULE: ./src/route/index.tsx



var ComponentAppRoute = function () {
    var routes = (0,dist/* useRoutes */.V$)([
        { path: '/', element: external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(dist/* Navigate */.Fg, { to: '/home' }) },
        { path: '/home', element: external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(pages_Home, null) }
    ]);
    return routes;
};
/* harmony default export */ var route = (ComponentAppRoute);

// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js
var react_router_dom_dist = __webpack_require__(655);
// EXTERNAL MODULE: ./node_modules/axios/index.js + 40 modules
var axios = __webpack_require__(721);
;// CONCATENATED MODULE: ./requestIntercept/index.ts
var requestIntercept_assign = (undefined && undefined.__assign) || function () {
    requestIntercept_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return requestIntercept_assign.apply(this, arguments);
};


// import loading from 'components/loading'
// import $user from 'user'
var setTicketToHeader = function (config) {
    var headers = config.headers;
    console.log(headers);
    // headers.ticket = cookie.getItem('ticket') || window.localStorage.getItem('ticket')
    // if (window.localStorage.getItem('mail')) {
    //   headers.mail = window.localStorage.getItem('mail')
    //   headers['Auth-Type'] = window.localStorage.getItem('Auth-Type')
    // }
};
var setTicketToParams = function (config) {
    var _a = config.params, params = _a === void 0 ? {} : _a;
    config.params = requestIntercept_assign({}, params);
};
// const TIME_OUT = 5000
// const TIME_OUT = 3e+4;
var TIME_OUT = 10 * 60 * 1000;
axios_service["default"].init(axios/* default */.ZP, {
    requestDefaults: {
        // 目前还没实现, 预计在下个版本中处理
        autoLoading: true,
        // response.data下面的配置
        // server端请求msg(
        msgKey: 'msg',
        // server端数据的key
        dataKey: 'data',
        // server端请求状态的key
        codeKey: 'status',
        // server端请求成功的状态, 注意: 此为response.data下该接口请求成功状态码, 非浏览器中http请求返回的成功状态(200)
        successCode: 0
    }
});
// 超时时间
axios/* default.defaults.timeout */.ZP.defaults.timeout = TIME_OUT;
// 打开withCredentials
axios/* default.defaults.withCredentials */.ZP.defaults.withCredentials = true;
// 请求拦截器
axios/* default.interceptors.request.use */.ZP.interceptors.request.use(function (config) {
    if (config.autoLoading === undefined || config.autoLoading === true) {
        // loading.show();
    }
    // 把 ticket 放入 header 和 query 中，按需选用
    setTicketToHeader(config);
    setTicketToParams(config);
    return config;
}, function (error) {
    // loading.hide();
    console.error('加载超时');
    return Promise.reject(error);
});
// 响应拦截器
axios/* default.interceptors.response.use */.ZP.interceptors.response.use(function (data) {
    var autoLoading = data.config.autoLoading;
    if (autoLoading === undefined || autoLoading === true) {
        // loading.hide()
    }
    // todo 返回 ticket 过期则退出
    /**
     * 处理status为0的情况
     */
    // else if (Object.prototype.hasOwnProperty.call(data.data, 'dm_error')) {
    //   data.data.dm_error = 0
    // }
    return data;
}, function (error) {
    // loading.hide();
    return Promise.reject(error);
});

// EXTERNAL MODULE: ./node_modules/antd-mobile/es/global/index.js + 2 modules
var global = __webpack_require__(618);
;// CONCATENATED MODULE: ./src/index.tsx



// import { BrowserRouter, Route, Routes } from 'react-router-dom'



external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().render(external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(react_router_dom_dist/* BrowserRouter */.VK, null,
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(route, null)), document.getElementById('root'));


/***/ }),

/***/ 654:
/***/ (function() {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=common.bundle.js.map