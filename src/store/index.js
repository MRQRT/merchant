import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import {getStore} from '@/config/mUtils'

Vue.use(Vuex)

const state = {
	now:'', 										// 当前时间
	currentPrice:getStore('currentPrice','session'),// 当前实时金价
}

export default new Vuex.Store({
	state,
	mutations,
})
