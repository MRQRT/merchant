import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 404、500页面 */
const notFound = r => require.ensure([], () => r(require('../pages/error/404')), 'notFound')
const systemError = r => require.ensure([], () => r(require('../pages/error/500')), 'systemError')


/* 首页 */
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index')
/* 我的 */
const mine = r => require.ensure([], () => r(require('../pages/mine/mine')), 'mine')
/*路由分发页面*/
const pagetransfer = r => require.ensure([], () => r(require('../pages/pageTransfer/pagetransfer')), 'pagetransfer')

/* 商铺相关 */
const openshopguide = r => require.ensure([], () => r(require('../pages/merchants/openShopGuide')), 'openshopguide')
const uploadcertificate = r => require.ensure([], () => r(require('../pages/merchants/uploadCertificate')), 'uploadcertificate')
const confirminfo = r => require.ensure([], () => r(require('../pages/merchants/confirmInfo')), 'confirminfo')
const applicationresults = r => require.ensure([], () => r(require('../pages/merchants/applicationResults')), 'applicationresults')
const qcmscommitresult = r => require.ensure([], () => r(require('../pages/merchants/qcmscommitresult')), 'qcmscommitresult')

/* 店铺相关 */
const myshop = r => require.ensure([], () => r(require('../pages/shop/myshop')), 'myshop')
const editShopInfo = r => require.ensure([], () => r(require('../pages/shop/editShopInfo')), 'editShopInfo')
const location = r => require.ensure([], () => r(require('../pages/shop/location')), 'location')

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
const findpassword = r => require.ensure([], () => r(require('../pages/login/findpassword')), 'findpassword')
const register = r => require.ensure([], () => r(require('../pages/login/register')), 'register')
const bindingwechat = r => require.ensure([], () => r(require('../pages/login/bindingwechat')), 'bindingwechat')
const changepassword = r => require.ensure([], () => r(require('../pages/login/changepassword')), 'changepassword')
const changemobile = r => require.ensure([], () => r(require('../pages/login/changemobile')), 'changemobile')
const tran = r => require.ensure([], () => r(require('../pages/login/tran.vue')), 'tran')
const setpassword = r => require.ensure([], () => r(require('../pages/login/setpassword.vue')), 'setpassword')

/* 关于我们 */
const aboutus = r => require.ensure([], () => r(require('../pages/aboutus/aboutus')), 'aboutus')


const router = new Router({
    mode: 'history',
    base: "/",
    routes: [
        {
            path:'*',
            component:notFound,
        },
        {
            path:'/systemError',
            component:systemError,
        },
        {
            path: '/',  // 重定向
            redirect: '/index',
        },
        {
            path: '/index',  // 首页
            component: index,
        },
        {
            path: '/mine',  // 我的
            component: mine,
        },
        {
            path: '/pagetransfer',  // 路由分发页
            component: pagetransfer,
        },
        {
            path: '/openshopguide',  // 入驻引导页
            component: openshopguide,
        },
        {
            path: '/uploadcertificate',  // 上传资质页
            component: uploadcertificate,
            meta: {
                requireAuth: true,
            }
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
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/myshop',  // 我的店铺页
            component: myshop,
        },
        {
            path: '/editshopinfo',  // 编辑店铺信息页
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
            meta: {
                requireAuth: true,
            }
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
            path: '/addresslist',  // 地址列表页
            component: addressList,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/addaddress',  // 新增地址页
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
            path:'/tran',//微信等录过度页
            component:tran,
        },
        {
            path: '/findpassword', //找回密码
            component: findpassword
        },
        {
            path: '/register', //注册页
            component: register
        },
        {
            path: '/bindingwechat', //绑定手机
            component: bindingwechat
        },
        {
            path: '/changemobile', //修改绑定手机号
            component: changemobile
        },
        {
            path: '/changepassword', //修改密码
            component: changepassword,
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/location', //选择店铺地址页
            component: location,
        },
        {
            path: '/aboutus', //关于我们
            component: aboutus
        },
        {
            path: '/setpassword',//设置密码
            component:setpassword
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
