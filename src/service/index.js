import {fetch} from '../config/fetch.js'
import {openAPI,checkAndroAgent,iosVersion} from '../config/mUtils.js'
// const andVerson = checkAndroAgent();
// const iosVerson = iosVersion();

/**
 * 发送短信验证码
 */

export const sendSms = (telephone) => fetch('/v3/member/smsCaptcha',{'phone':telephone},'post');


/**
 * 实时金价
 */

export const queryGoldPrice = () => fetch('/price/query',{},'get');

/**
 * 绑卡回显信息
 */

export const return_card_info = (code) => fetch('/bank_card?code='+code,{},'get');

/**
 * 查看银行卡
 */

export const query_card_info = () => fetch('/bank_card',{},'get');

/**
 * 绑定银行卡
 */

export const bind_card = (phone,captcha) => fetch('/bank_card',{'phone':phone,'captcha':captcha},'post');


/**
 * 创建订单验证接口(验证店铺是否存在或是否通过审核)
 */

export const check_shop_staus = (orderId) => fetch('/order/add_recycle_order_check',{},'post');

/**
 * 创建订单
 */

export const add_recycle_order = (applyQuantity,applyWeight,productType,isLockPrice,isCashshopId) => fetch('/order/add_recycle_order',{'applyQuantity':applyQuantity,'applyWeight':applyWeight,'productType':productType,'isLockPrice':isLockPrice,'isCash':isCash,'shopId':shopId},'post');

/**
 * 支付预下单(发送短信验证码)
 */

export const pay_beforehand_order = (orderId) => fetch('/order/pay_beforehand_order',{'orderId':orderId},'post');

/**
 * 查看订单列表
 */

export const query_list = (shopId,smsNo) => fetch('/order/query_list?orderId='+orderId+'&smsNo='+smsNo,{},'get');

/**
 * 查看订单详情
 */

export const query_detail = (orderId) => fetch('/order/query_detail?orderId='+orderId,{},'get');

/**
 * 查询物流信息(快递单号、编码)
 */

export const query_logistics_mess = (orderId,type) => fetch('/logistics/query_logistics_mess?orderId='+orderId+'&type='+type,{},'get');

/**
 * 查询快递信息
 */

export const query_express_mess = (expressNo,expressCode) => fetch('/logistics/query_express_mess?expressNo='+expressNo+'&expressCode='+expressCode,{},'get');

/**
 * 查询订单追踪
 */

export const query_status_flow_mess = (orderId) => fetch('/order_flow/query_status_flow_mess?orderId='+orderId,{},'get');
