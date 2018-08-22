import {fetch} from '../config/fetch.js'
import {openAPI,checkAndroAgent,iosVersion} from '../config/mUtils.js'
const andVerson = checkAndroAgent();
const iosVerson = iosVersion();

/**
 * 发送短信验证码
 */

export const sendSms = (telephone) => fetch('/v3/member/smsCaptcha',{'phone':telephone},'post');
