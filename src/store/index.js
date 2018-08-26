import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import {getStore} from '@/config/mUtils'
import getters from './getters'
Vue.use(Vuex)

const state = {
	accessToken: getStore('accessToken','local'),//用户会话
<<<<<<< HEAD
	userId:getStore('userId','local'),			 //用户userId
	mobile:'',		// 用户登录手机号
	merchantId:'',	// 商户号
	shopId:'',   	// 店铺ID
	now:'',			// 当前时间
=======
	userId:getStore('userId','local'),//用户userId
	mobile:getStore('mobile','session'),//用户登录手机号
	merchantId:getStore('merchantId','session'),//商户号
	now:'',// 当前时间
>>>>>>> 46f9b820915b21a4b1ade3ad21b3037d3a2240ef
	currentPrice:getStore('currentPrice','session'),// 当前实时金价
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
})
