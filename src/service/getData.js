import {fetch} from '../config/fetch.js'
import {getStore} from '../config/mUtils.js'



/***** V2.0新增接口 ******/

/**
* 商户锁价保证金比例
*/

export const margin_rate = () => fetch(' /merchant/margin_rate',{},'get')


/**
 * 判断是否在交易时段
 */

export const bizCloseCheck = (bizCode) => fetch('/TradeCalendar/bizCloseCheck',{'bizCode':bizCode},'post')


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
* 微信登录
*/

export const wechatlogin = (redirectUrl) => fetch('/user/auth/login?redirectUrl='+redirectUrl,{},'get')

/**
* 微信手机绑定
*/

export const wechat_bind_mobile = (openid,mobile,smsCode) => fetch('/user/auth/bind',{'openid':openid,'mobile':mobile,'smsCode':smsCode},'post')

/**
* 退出登录
*/

export const logout = () => fetch('/user/logout',{},'post')

/**
* 登录密码修改
*/

export const change_password = (oldPwd,newPwd) => fetch('/user/password/modify',{'oldPwd':oldPwd,'newPwd':newPwd},'post')

/**
* 设置密码
*/

export const set_password = (password) => fetch('/user/password/set',{'password':password},'POST')

/**
* 检查是否设置密码
*/

export const check_password = () => fetch('/user/password/check',{},'POST')

/**
* 修改绑定手机
*/

export const change_mobile = (mobile,smsCode,password) => fetch('/user/mobile/modify',{'mobile':mobile,'smsCode':smsCode,'password':password},'post')

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
* 获取营业资质
*/

export const business_qualification = () => fetch('/merchant_open_apply/business_qualification',{},'get')

/**
* 提交商户入驻申请
*/

export const merchant_open_apply = (companyName,businessLicenseCode,businessLicenseBeginDate,businessLicenseEndDate,personName,personCode,personCardEndDate) => fetch('/merchant_open_apply',{'companyName':companyName,'businessLicenseCode':businessLicenseCode,'businessLicenseBeginDate'
:businessLicenseBeginDate,'businessLicenseEndDate':businessLicenseEndDate,'personName':personName,'personCode':personCode,'personCardEndDate':personCardEndDate},'post')

/*
* 获取最新的商户申请信息
*/

export const merchant_open_apply_status = () => fetch('/merchant_open_apply/latest',{},'get')

/*
* 获取最新的店铺申请信息
*/

export const shop_open_apply_status = () => fetch('/shop_open_apply/latest',{},'get')

/*
* 获取店铺信息
*/

export const shop = () => fetch('/shop',{},'get')

/**
 * 上传店铺头像
*/
export const upload_shop_pro = (file) => fetch('/attachment/upload',file,'post')

/**
 * 上传店铺门面图
*/
export const upload_shop_photo = (file) => fetch('/attachment/upload',file,'post')

/*
* 查询店铺经营范围
*/

export const business_scope = () => fetch('/shop/business_scope',{},'get')

/*
* 提交店铺入驻申请
*/

export const shop_open_apply = (logoId,name,areaId,address,lat,lng,mobile,introduce,facadeId,businessScopeId,shopId) => fetch('/shop_open_apply',{'logoId':logoId,'name':name,'areaId':areaId,'address':address,'lat':lat,'lng':lng,'mobile':mobile,'introduce':introduce,'facadeId':facadeId,'businessScopeId':businessScopeId,'shopId':shopId},'post')

/*
* 区域省市县
*/

export const province_area_list = (parentId) => fetch('/area/list?parentId='+parentId,{},'get')

/*
* 区域市县
*/

export const city_area_list = (spell) => fetch('/area/city_list?spell='+spell,{},'get')

/*
* 县级别接口
*/

export const area_list = () => fetch('/area/city_area_list',{},'get')

/*
* 区域县查询id
*/

export const cityName = (privinceName,cityName,countyName) => fetch('/area/city_name?privinceName='+privinceName+'&&cityName='+cityName+'&&countyName='+countyName,{},'get')
// export const cityName = (cityName) => fetch('/area/city_name?cityName='+cityName,{},'get')

/*
* 查询地址列表
*/

export const query_shop_address_list = () => fetch('/address/query_shop_address_list',{},'get')

/*
* 修改店铺地址
*/

export const update_shop_address = (addressId,contact,telephone,address,provinceId,cityId,areaId) => fetch('/address/update_shop_address',{'addressId':addressId,'contact':contact,'telephone':telephone,'address':address,'provinceId':provinceId,'cityId':cityId,'areaId':areaId},'post')

/*
* 新增店铺地址
*/

export const add_shop_address = (contact,telephone,address,provinceId,cityId,areaId) => fetch('/address/add_shop_address',{'contact':contact,'telephone':telephone,'address':address,'provinceId':provinceId,'cityId':cityId,'areaId':areaId},'post')

/*
* 删除店铺地址
*/

export const del_shop_address = (addressId) => fetch('/address/del_shop_address',{'addressId':addressId},'post')

/*
* 查询店铺地址详情
*/

export const query_shop_address_detail = (addressId) => fetch('/address/query_shop_address_detail?addressId='+addressId,{},'get')

/*
* 修改默认地址
*/

export const update_default_address = (addressId) => fetch('/address/update_default_address',{'addressId':addressId},'POST')

/**
 * 查询店铺信息
 */

export const shopDetail = (id) => fetch('/shop?id='+id,{},'get');

/**
 * 查询店铺状态
 */

export const shop_status = () => fetch('/shop/exists',{},'get');


/**
 * 实时金价
 */

export const query_gold_price = () => fetch('/price/query',{},'get');

/**
 * 首页近一月交易量
 */

export const query_index_statistics = (orderId) => fetch('/order/query_index_statistics',{},'get');


/**
 * 绑卡获取商户信息
 */

export const merchant = () => fetch('/merchant',{},'get');


/**
 * 绑卡回显信息（卡类型）
 */

export const return_card_info = (code) => fetch('/bank_card?code='+code,{},'get');


/**
 * 绑卡发送短信验证码
 */

export const captcha = (code,mobile,id) => fetch('/bank_card/captcha',{'code':code,'mobile':mobile,'id':id},'post');


/**
 * 查看保证金
 */

export const query_ensure_cash = () => fetch('/order/query_ensure_cash',{},'get');


/**
 * 查看银行卡
 */

export const query_card_info = () => fetch('/bank_card',{},'get');

/**
 * 绑定银行卡
 */

export const bind_card = (id,code,mobile,captcha) => fetch('/bank_card',{'id':id,'code':code,'mobile':mobile,'captcha':captcha},'post');


/**
 * 创建订单验证接口(验证店铺是否存在或是否通过审核)
 */

export const add_recycle_order_check = () => fetch('/order/add_recycle_order_check',{},'get');

/**
 * 创建订单
 */

export const add_recycle_order = (applyQuantity,applyWeight,isLockPrice,isCash,contact,telephone,address) => fetch('/order/add_recycle_order',{'applyQuantity':applyQuantity,'applyWeight':applyWeight,'isLockPrice':isLockPrice,'isCash':isCash,'contact':contact,'telephone':telephone,'address':address},'post');

/**
 * 支付预下单(发送短信验证码)
 */

export const pay_beforehand_order = (orderId,countType) => fetch('/order/pay_beforehand_order',{'orderId':orderId,'countType':countType},'post');
// export const pay_beforehand_order = (id) => fetch('/order/margin/pay/captcha?id='+id,{},'get');


/**
 * 支付正式下单(判断验证码是否正确及继续走支付流程)
 */

export const pay_formal_order = (orderId,smsCode) => fetch('/order/pay_formal_order',{'orderId':orderId,'smsCode':smsCode},'post');
// export const pay_formal_order = (id,captcha) => fetch('/order/margin/pay',{'id':id,'captcha':captcha},'post');


/**
 * 定时查看订单状态
 */

export const query_status = (orderId) => fetch('/order/query_status?orderId='+orderId,{},'get');
// export const query_status = (id) => fetch('/order/margin/pay?id='+id,{},'get');


/**
 * 查看订单列表
 */

export const query_list = (page,size) => fetch('/order/query_list?page='+page+'&size='+size,{},'get');
// export const query_list = (page,size) => fetch('/order?page='+page+'&size='+size,{},'get');

/**
 * 查看订单详情
 */

export const query_detail = (orderId) => fetch('/order/query_detail?orderId='+orderId,{},'get');
// export const query_detail = (id) => fetch('/order?id='+id,{},'get');

/**
 * 查询物流信息(快递单号、编码)
 */

export const query_logistics_mess = (orderId,type) => fetch('/logistics/query_logistics_mess?orderId='+orderId+'&type='+type,{},'get');
// export const query_logistics_mess = (id) => fetch('/order/express?id='+id,{},'get');

/**
 * 查询快递信息
 */

export const query_express_mess = (expressNo,expressCode) => fetch('/logistics/query_express_mess?expressNo='+expressNo+'&expressCode='+expressCode,{},'get');
// export const query_express_mess = (code) => fetch('/express/route?code='+code,{},'get');


/**
 * 查询检测报告
 */

export const query_process_mess = (orderId) => fetch('/order/query_process_mess?orderId='+orderId,{},'get');
// export const query_process_mess = (id) => fetch('/order/detection?id='+id,{},'get');


/**
 * 查询检测报告明细
 */

export const query_report_detail = (id,page,size) => fetch('/order/goods/detection?id='+id+'&page='+page+'&size='+size,{},'get');


/**
 * 查询订单追踪
 */

export const query_status_flow_mess = (orderId) => fetch('/order_flow/query_status_flow_mess?orderId='+orderId,{},'get');
// export const query_status_flow_mess = (id) => fetch('/order/operate?id='+id,{},'get');

/**
 * 确认订单(用户确认检测报告)
 */

export const confirm_order = (orderId) => fetch('/order/confirm_order',{'orderId':orderId},'post');
// export const confirm_order = (id) => fetch('/order/confirm',{'id':id},'post');

/**
 *  取消订单
 */

export const cancel_order = (id) => fetch('/order/cancel',{'id':id},'post');


/**
 * 修改订单(为支付订单超时)
 */

export const update_status = (orderId) => fetch('/order/update_status',{'orderId':orderId},'post');
