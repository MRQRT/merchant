import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 首页 */
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index')

/* 商铺相关 */
const openshopguide = r => require.ensure([], () => r(require('../pages/merchants/openshopguide')), 'openshopguide')
const uploadcertificate = r => require.ensure([], () => r(require('../pages/merchants/uploadcertificate')), 'uploadcertificate')
const confirminfo = r => require.ensure([], () => r(require('../pages/merchants/confirminfo')), 'confirminfo')
const applicationresults = r => require.ensure([], () => r(require('../pages/merchants/applicationresults')), 'applicationresults')
const qcmscommitresult = r => require.ensure([], () => r(require('../pages/merchants/qcmscommitresult')), 'qcmscommitresult')

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
const myBank = r => require.ensure([], () => r(require('../pages/assets/bank/myBank')), 'myBank')
const bindingBank = r => require.ensure([], () => r(require('../pages/assets/bank/bindingBank')), 'bindingBank')

/* 帐户管理 */
const account = r => require.ensure([], () => r(require('../pages/account/account')), 'account')
const addressList = r => require.ensure([], () => r(require('../pages/account/address/addressList')), 'addressList')
const addAddress = r => require.ensure([], () => r(require('../pages/account/address/addAddress')), 'addAddress')

/* 协议页面 */
const registerArg = r => require.ensure([], () => r(require('../pages/arguments/registerArg')), 'registerArg')
const storeArg = r => require.ensure([], () => r(require('../pages/arguments/storeArg')), 'storeArg')

/* 登录注册页面 */
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const findPassword = r => require.ensure([], () => r(require('../pages/login/findPassword')), 'findPassword')
const register = r => require.ensure([], () => r(require('../pages/login/register')), 'register')
const bindingWechat = r => require.ensure([], () => r(require('../pages/login/bindingWechat')), 'bindingWechat')
const changePassword = r => require.ensure([], () => r(require('../pages/login/changePassword')), 'changePassword')
const changeMobile = r => require.ensure([], () => r(require('../pages/login/changeMobile')), 'changeMobile')


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
            path: '/openshopguide',  // 入驻引导页
            component: openshopguide,
        },
        {
            path: '/uploadcertificate',  // 上传资质页
            component: uploadcertificate,
        },
        {
            path: '/confirminfo',  // 核实信息页
            component: confirminfo,
        },
        {
            path: '/qcmscommitresult', //审核信息提交成功
            component: qcmscommitresult,

        },
        {
            path: '/applicationresults',  // 审核结果页
            component: applicationresults,
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
            path: '/storegold',  // 存金页
            component: storeGold,
        },
        {
            path: '/storeresult',  // 存金结果页
            component: storeResult,
        },
        {
            path: '/storeorderlist',  // 存金订单列表页
            component: storeOrderList,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/storeorderdetail',  // 存金订单详情页
            component: storeOrderDetail,
        },
        {
            path: '/waitPayOrder',  // 存金订单待支付页
            component: waitPayOrder,
        },
        {
            path: '/assets',  // 我的资产页
            component: assets,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/mybank',   // 我的银行卡页
            component: myBank,
        },
        {
            path: '/bindingbank',  // 绑定银行卡页
            component: bindingBank,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/account',  // 帐户管理页
            component: account,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/addressList',  // 地址列表页
            component: addressList,
        },
        {
            path: '/addAddress',  // 新增地址页
            component: addAddress,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/registerArg',  // 注册协议
            component: registerArg,
        },
        {
            path: '/storearg',  // 存金协议
            component: storeArg,
        },
        {
            path: '/login', //登录
            component: login
        },
        {
            path: '/findPassword', //找回密码
            component: findPassword
        },
        {
            path: '/register', //注册页
            component: register
        },
        {
            path: '/bindingWechat', //绑定手机
            component: bindingWechat
        },
        {
            path: '/changeMobile', //修改绑定手机号
            component: changeMobile
        },
        {
            path: '/changePassword', //修改密码
            component: changePassword
        },
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
