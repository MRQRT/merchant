import {
	RECORD_CURRENTIME,
	RECORD_CURRENPRICE,
	RECORD_ACCESSTOKEN,
	RECORD_USERID,
	RECORD_MOBILE,
	RECORD_MERCHANTID,
	RECORD_SHOPID,
} from './mutation-types.js'

import {setStore, getStore, setCookie ,getCookie, removeCookie, removeStore} from '../config/mUtils'


export default {
	//记录会话值
	[RECORD_ACCESSTOKEN](state,accessToken){
		state.accessToken = accessToken;
		setStore('accessToken',accessToken,'local')
	},
	//记录用户的userId
	[RECORD_USERID](state,userId){
		state.userId = userId;
		setStore('userId',userId,'local')
	},
	//记录用户的的登录手机号
	[RECORD_MOBILE](state,mobile){
		state.mobile=mobile
	},
	//记录用户的商户号
	[RECORD_MERCHANTID](state,merchantId){
		state.merchantId=merchantId
	},
	//记录店铺ID
	[RECORD_SHOPID](state,shopId){
		state.shopId = shopId
		setStore('shopId',shopId,'local')
	},
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
