import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 首页 */
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index')

/* 商铺相关 */
const openShopGuide = r => require.ensure([], () => r(require('../pages/merchants/openShopGuide')), 'openShopGuide')
const uploadCertificate = r => require.ensure([], () => r(require('../pages/merchants/uploadCertificate')), 'uploadCertificate')
const confirmInfo = r => require.ensure([], () => r(require('../pages/merchants/confirmInfo')), 'confirmInfo')
const applicationResults = r => require.ensure([], () => r(require('../pages/merchants/applicationResults')), 'applicationResults')

/* 店铺相关 */
const myShop = r => require.ensure([], () => r(require('../pages/shop/myShop')), 'myShop')
const editShopInfo = r => require.ensure([], () => r(require('../pages/shop/editShopInfo')), 'editShopInfo')

/* 存金相关 */
const storeGold = r => require.ensure([], () => r(require('../pages/storeGold/storeGold')), 'storeGold')
const storeResult = r => require.ensure([], () => r(require('../pages/storeGold/storeResult')), 'storeResult')
const storeOrderList = r => require.ensure([], () => r(require('../pages/storeGold/order/storeOrderList')), 'storeOrderList')
const storeOrderDetail = r => require.ensure([], () => r(require('../pages/storeGold/order/storeOrderDetail')), 'storeOrderDetail')
const waitPayOrder = r => require.ensure([], () => r(require('../pages/storeGold/order/waitPayOrder')), 'waitPayOrder')

/* 我的资产 */
const assets = r => require.ensure([], () => r(require('../pages/assets/assets')), 'assets')
const bindingBank = r => require.ensure([], () => r(require('../pages/assets/bindingBank')), 'bindingBank')

/* 帐户管理 */
const account = r => require.ensure([], () => r(require('../pages/account/account')), 'account')
const addressList = r => require.ensure([], () => r(require('../pages/account/address/addressList')), 'addressList')
const addAddress = r => require.ensure([], () => r(require('../pages/account/address/addAddress')), 'addAddress')

/* 协议页面 */
const registerArg = r => require.ensure([], () => r(require('../pages/arguments/registerArg')), 'registerArg')
const storeArg = r => require.ensure([], () => r(require('../pages/arguments/storeArg')), 'storeArg')

/* 登录页面 */
const login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login')
const findPassword = r => require.ensure([], () => r(require('../pages/login/findPassword.vue')), 'findPassword')



const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',  // 重定向
            redirect: '/index',
        },
        {
            path: '/index',  // 首页
            component: index,
        },
        {
            path: '/openShopGuide',  // 入驻引导页
            component: openShopGuide,
        },
        {
            path: '/uploadCertificate',  // 上传资质页
            component: uploadCertificate,
        },
        {
            path: '/confirmInfo',  // 核实信息页
            component: confirmInfo,
        },
        {
            path: '/applicationResults',  // 审核结果页
            component: applicationResults,
        },
        {
            path: '/myShop',  // 我的店铺页
            component: myShop,
        },
        {
            path: '/editShopInfo',  // 编辑店铺信息页
            component: editShopInfo,
        },
        {
            path: '/storeGold',  // 存金页
            component: storeGold,
        },
        {
            path: '/storeResult',  // 存金结果页
            component: storeResult,
        },
        {
            path: '/storeOrderList',  // 存金订单列表页
            component: storeOrderList,
        },
        {
            path: '/storeOrderDetail',  // 存金订单详情页
            component: storeOrderDetail,
        },
        {
            path: '/waitPayOrder',  // 存金订单待支付页
            component: waitPayOrder,
        },
        {
            path: '/assets',  // 我的资产页页
            component: assets,
        },
        {
            path: '/bindingBank',  // 绑定银行卡页
            component: bindingBank,
        },
        {
            path: '/account',  // 帐户管理页
            component: account,
        },
        {
            path: '/addressList',  // 地址列表页
            component: addressList,
        },
        {
            path: '/addAddress',  // 新增地址页
            component: addAddress,
        },
        {
            path: '/registerArg',  // 注册协议
            component: registerArg,
        },
        {
            path: '/storeArg',  // 存金协议
            component: storeArg,
        },
        {
            path: '/login', //登录
            component: login
        },
        {
            path: '/findPassword', //找回密码
            component: findPassword
        }

    ],
    scrollBehavior (to, from, savedPosition) { // 记录滚动位置
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0}
        }
    }
})
export default router;
