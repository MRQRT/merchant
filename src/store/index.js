import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import {getStore} from '@/config/mUtils'
import getters from './getters'
Vue.use(Vuex)

const state = {
	accessToken: getStore('accessToken','local'),//用户会话
	userId:getStore('userId','local'),			 //用户userId
	mobile:'',//用户登录手机号
	merchantId:'',//商户号
	now:'',// 当前时间
	currentPrice:getStore('currentPrice','session'),// 当前实时金价
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
})
