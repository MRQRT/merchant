// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'


import './config/rem'
import './style/common.css'
import 'swiper/dist/css/swiper.css'
import 'mint-ui/lib/style.css'
// import './config/vconsole.min.js'
Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)
Vue.config.productionTip = false

/* 全局过滤器 */

/* 保留2位小数 */
Vue.filter('formatPriceTwo' , function(val) {
    // return (val*1).toFixed(2)
    var newVal = parseFloat(val).toFixed(3);
    return newVal.substring(0,newVal.toString().length - 1)
});
/* 保留4位小数 */
Vue.filter('formatPriceFour' , function(val) {
    return (val*1).toFixed(4)
});
/* 改变时间样式(月-日 时-分) */
Vue.filter('changeTime',function(val){
    var arr=val.split(' ');

    var timeArr1=arr[0].split('-');
    timeArr1.shift();
    timeArr1=timeArr1.join('-');

    var timeArr2=arr[1].split(':');
    timeArr2.pop();
    timeArr2=timeArr2.join(':');
    return timeArr1 + ' ' + timeArr2;
});
// 删除时间秒数
Vue.filter('deleteSec',function(val){
    var arr=val.split(' ');
    var timeArr1 = arr[0];

    var timeArr2=arr[1].split(':');
    timeArr2.pop();
    timeArr2=timeArr2.join(':');
    return timeArr1 + ' ' + timeArr2;
});
/* 隐藏电话中间四位数 */
Vue.filter('hideMible',function(val){
    var reg = /^(\d{3})\d*(\d{4})$/;
    return (val+'').replace(reg,'$1****$2')
});

Vue.filter('clearStr',function(val){
    return (val+'').replace(/,/g, "");
})

/* 全局函数*/
/* 禁止页面滚动 */
Vue.prototype.fixed = function(status){
    var el = document.body || document.getElementsByTagName('html');
    el.style.position = status ? 'fixed' : 'static';
}
/* eslint-disable no-new */
export let a = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.accessToken) {    // 已登录
            next(true);
        } else {   // 未登录
            if(from.fullPath == '/storegold'){ //存金页点击绑卡和新增地址后仍跳转回存金页
                next({
                    path: '/login',
                    query: {redirect: from.fullPath}
                })
            }else{
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            }
        }
    }else{
        next(true)
    }
})
