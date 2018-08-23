import {fetch} from '../config/fetch.js'
import {getStore} from '../config/mUtils.js'

/**
 * 发送验证码
 */

export const sendsms = (mobile,type) => fetch('/user/sms/send',{'mobile':mobile,'type':type},'post')

/**
 * 检测是否已注册
 */

export const checkexist = (mobile) => fetch('user/check/exist',{'mobile':mobile},'post')

/**
 * 用户进行注册
 */

export const registry = (mobile,smsCode,password) => fetch('/user/registry',{'mobile':mobile,'smsCode':smsCode,'password':password},'post')

/**
* 用户进行登录
*/

export const login = (userName,password) => fetch('/user/login',{'userName':userName,'password':password},'post')

/**
* 用户进行登录
*/

export const quicklogin = (mobile,smsCode) => fetch('/user/quick/login',{'mobile':mobile,'smsCode':smsCode},'post')

/**
 * 获取当前时间
 */

export const queryNow = () => fetch('/wap/sys/now',{},'get')

/**
 * 获取实时金价
 */

export const queryGoldPrice = () => fetch('/wap/price/current',{},'get')

/**
 * 交易规则详情(限制条件)
 */

export const queryTradeConfig = () => fetch('/wap/trade/limit',{},'get')

/**
 * 查询当日价格曲线图
 */

export const queryPriceTo24h = () => fetch('/wap/price/history',{},'get')

/**
 * 查询历史收盘价
 */

export const queryClosePriceToDay = (month) => fetch('/wap/price/closing?month='+month,{},'get')


/**
 * 查询我的持仓克重
 */

export const queryMyProfil = (userId) => fetch('/wap/user/stock?userId='+userId,{},'get')


/**
 * 新闻资讯列表
 */

export const queryNewsPager = (lastModifiedTime,pageNum,pageSize) => fetch('/wap/news/page?lastModifiedTime='+lastModifiedTime+'&pageNum='+pageNum+'&pageSize='+pageSize,{},'get')

/**
 * 新闻资讯详情
 */

export const queryNewsDetail = (id) => fetch('/wap/news/detail?id='+id,{},'get')

/**
 * 创建活期金买入订单
 */

export const demandBuyOrder = (userId,tradeAmount,maxBuyPrice,tradeWeight) => fetch('/wap/trade/buy',{'userId':userId,'tradeAmount':tradeAmount,'maxBuyPrice':maxBuyPrice,'tradeWeight':tradeWeight},'post')


/**
 * 买入订单支付
 */

export const payOrder = (userId,orderNo,mobile) => fetch('/wap/trade/payOrder',{'userId':userId,'orderNo':orderNo,'mobile':mobile},'post')


/**
 * 创建活期金卖出订单
 */

export const demandSellOrder = (userId,tradeWeight,minSellPrice,mobile) => fetch('/wap/trade/sell',{'userId':userId,'tradeWeight':tradeWeight,'minSellPrice':minSellPrice,'mobile':mobile},'post')


/**
 * 交易状态查询
 */

export const dealState = (orderNo) => fetch('/wap/order/state?orderNo='+orderNo,{},'get')


/**
* 查询用户交易列表
*/

export const queryOrderList = (months,beginDate,endDate,userId,tradeType) => fetch('/wap/order/list?months='+months+'&beginDate='+beginDate+'&endDate='+endDate+'&userId='+userId+'&tradeType='+tradeType,{},'get')


/**
* 查询用户交易详情
*/

export const tradeInfoDetail = (orderNo) => fetch('/wap/order/detail?orderNo='+orderNo,{},'get')


/********实物金部分*******/

/**
 * 商品列表
 */

export const queryGoods = (lastTime, hotGoodsPageNum, hotGoodsPageSize,moreGoodsPageNum, moreGoodsPageSize) => fetch('/xiamen/goods/goodsIndexList?lastTime=' + lastTime + '&hotGoodsPageNum=' + hotGoodsPageNum + '&hotGoodsPageSize=' + hotGoodsPageSize + '&moreGoodsPageNum=' + moreGoodsPageNum + '&moreGoodsPageSize=' + moreGoodsPageSize,{},'get')


/**
 * 商品基本详情
 */

export const queryGoodsBasicDetail = (id) => fetch('/xiamen/goods/queryGoodsInfo?id=' + id,{},'get')

/**
 * 商品更多详情
 */


export const queryGoodsMoreDetail = (id) => fetch('/xiamen/goods/goodsDetailList?id=' + id,{},'get')

/**
 *  查询用户地址
 */

export const queryAddress = (userSerialNo) => fetch('/xiamen/address/query?userSerialNo=' + userSerialNo,{},'get')

/**
 *  新增地址
 */

export const addAddress = (userSerialNo,name,mobile,address,isDefault) => fetch('/xiamen/address/add',{'userSerialNo':userSerialNo, 'name':name, 'mobile':mobile, 'address':address,'isDefault':isDefault},'post')

/**
 *  设置默认地址
 */

export const putDefault = (id) => fetch('/xiamen/address/isDefault',{'id':id},'post')

/**
 *  删除地址
 */

export const delAddress = (id) => fetch('/xiamen/address/delete/',{'id':id},'post')

/**
 *  修改地址
 */

export const putAddress = (id, name, mobile, address, isDefault) => fetch('/xiamen/address/edit',{'id':id, 'name':name, 'mobile':mobile, 'address':address, 'isDefault':isDefault},'post')

/**
 *  创建订单
 */

export const addGoodsOrder = (goodsId, addressId, accountCode,accountSerialCode,userSerialNo,count,totalPrice) => fetch('/xiamen/order/add',{'goodsId':goodsId, 'addressId':addressId, 'accountCode':accountCode,'accountSerialCode':accountSerialCode,'userSerialNo':userSerialNo,'count':count,'totalPrice':totalPrice},'post')

/**
 *  查询订单列表
 */

export const queryOrderlist = (lastTime, userSerialNo, stateCode, pageNum, pageSize) => fetch('/xiamen/order/list?lastTime=' + lastTime + '&userSerialNo=' + userSerialNo + '&stateCode=' + stateCode +'&pageNum=' + pageNum + '&pageSize=' + pageSize,{},'get')


/**
 *  查询订单详情
 */
export const queryOrderDetail = (id, stateCode) => fetch('/xiamen/order/detail?id=' + id + '&stateCode=' + stateCode,{},'get')


/**
 *  取消订单
 */
export const cancelOrder = (id) => fetch('/xiamen/order/cancel',{'id':id},'post')

/**
 *  确认收货
 */

export const receiveGoods = (id) => fetch('/xiamen/order/receive',{'id':id},'post')

/**
 *  物流信息
 */

export const queryExpressInfo = (code) => fetch('/xiamen/order/queryExpressInfo?code=' + code,{},'get')
