// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'


import './config/rem'
import './style/common.css'
import 'swiper/dist/css/swiper.css'
import 'mint-ui/lib/style.css'

Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)
Vue.config.productionTip = false

/* 全局过滤器 */

/* 保留2位小数 */
Vue.filter('formatPriceTwo' , function(val) {
    return (val*1).toFixed(2)
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
/* 隐藏电话中间四位数 */
Vue.filter('hideMible',function(val){
    var reg = /^(\d{3})\d*(\d{4})$/;
    return (val+'').replace(reg,'$1****$2')
});
/* eslint-disable no-new */
export let a = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next(true)
        }else{
            alert('未登录')
            // next(
            //     window.location.href = 'http://m.baidu.com?redirect=localhost:8088/'+to.fullPath
            // )
        }
    }else{
        next(true)
    }
})
