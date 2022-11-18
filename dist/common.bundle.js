"use strict";
(self["webpackChunkdoubi"] = self["webpackChunkdoubi"] || []).push([[592],{

/***/ 602:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
;// CONCATENATED MODULE: ./src/pages/Home/index.tsx



var Home = function () {
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
// EXTERNAL MODULE: ./node_modules/antd-mobile/es/global/index.js + 2 modules
var global = __webpack_require__(618);
;// CONCATENATED MODULE: ./src/index.tsx



// import { BrowserRouter, Route, Routes } from 'react-router-dom'


external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().render(external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(react_router_dom_dist/* BrowserRouter */.VK, null,
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(route, null)), document.getElementById('root'));


/***/ })

}]);
//# sourceMappingURL=common.bundle.js.map