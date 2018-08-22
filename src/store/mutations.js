import {
	RECORD_CURRENTIME,
	RECORD_CURRENPRICE,
} from './mutation-types.js'

import {setStore, getStore, setCookie ,getCookie, removeCookie, removeStore} from '../config/mUtils'


export default {
	// 记录当前时间
	[RECORD_CURRENTIME](state,now){
		state.now = now;
	},
	//记录实时金价
	[RECORD_CURRENPRICE](state,currentPrice) {
		state.currentPrice = currentPrice;
		setStore('currentPrice',currentPrice,'session')
	},
}
