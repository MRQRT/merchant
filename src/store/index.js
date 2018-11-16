import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import {getStore} from '@/config/mUtils'
import getters from './getters'
Vue.use(Vuex)

const state = {
	accessToken: getStore('accessToken','local'),//用户会话
	userId:getStore('userId','local'),			 //用户userId
	mobile:getStore('mobile','local'),		 //用户登录手机号
	merchantId:getStore('merchantId','local'), //商户号
	shopId:getStore('shopId','local'),   		 //店铺ID
	shopStatus:getStore('shopStatus','session'), //店铺审核状态
	now:'',										 //当前时间
	currentPrice:getStore('currentPrice','session'),// 当前实时金价
	storeOrderInfo:'',							 //保存的存金填写信息
	addressid:getStore('addressid','session'),	 //所选的地址id
	applyShopId:getStore('applyShopId','session'), //要认领的店铺id
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
})
