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
* 用户进行快捷登录
*/

export const quicklogin = (mobile,smsCode) => fetch('/user/quick/login',{'mobile':mobile,'smsCode':smsCode},'post')

/**
* 找回密码
*/

export const findpassword = (mobile,smsCode,password) => fetch('/user/find/password',{'mobile':mobile,'smsCode':smsCode,'password':password},'post')

/**
* 微信等录
*/

export const wechatlogin = (redirectUrl) => fetch('/user/auth/login?redirectUrl='+redirectUrl,{},'get')

/**
* 退出登录
*/

export const logout = () => fetch('/user/logout',{},'post')

/**
* 上传营业执照
*/

export const business_license = (file) => fetch('/merchant_open_apply/business_license',file,'post')

/**
* 上传法人身份证正面
*/

export const person_card_front = (file) => fetch('/merchant_open_apply/person_card_front',file,'post')

/**
* 上传法人身份证反面
*/

export const person_card_back = (file) => fetch('/merchant_open_apply/person_card_back',file,'post')

/**
 * 实时金价
 */

export const query_gold_price = () => fetch('/price/query',{},'get');

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

export const bind_card = (code,mobile,captcha) => fetch('/bank_card',{'code':code,'mobile':mobile,'captcha':captcha},'post');


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

export const query_list = (shopId,page,size) => fetch('/order/query_list?orderId='+orderId+'&page='+page+'&size='+size,{},'get');

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

/**
 * 确认订单(用户确认检测报告)
 */

export const confirm_order = (orderId) => fetch('/order/confirm_order',{'orderId':orderId},'post');

/**
 * 修改订单(为支付订单超时)
 */

export const update_status = (orderId) => fetch('/order/update_status',{'orderId':orderId},'post');
