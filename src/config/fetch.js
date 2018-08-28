import router from '@/router'
import {a} from '@/main.js'//将vue实例引入
// import apiConfig from '../../config/api.config' // 请求接口时判断环境
import axios from 'axios'
import qs from 'qs'
import { Toast, MessageBox,Indicator} from 'mint-ui'
import store from '../store'

// axios.defaults.baseURL = process.env.API_ROOT   //配置接口地址

axios.defaults.baseURL = '/api'   //配置接口地址
// axios.defaults.timeout = 5000; //配置请求的超时时间，超时将被中断

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前将参数序列化
    if(config.method  === 'post' || config.method === 'put') {
        let isFormData = (v) => {
            return Object.prototype.toString.call(v) === '[object FormData]';
        }
        var a = isFormData(config.data);
        if(!a){
            config.data = qs.stringify(config.data,{ skipNulls: true });
            config.params = qs.stringify(config.url,{ skipNulls: true });
        }
        config.headers['Accept'] = 'application/json'
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if(config.method === 'get') {
        config.params = qs.stringify(config.data)
    }
    if(store.getters.token) {
        config.headers['accessToken'] = store.getters.token// 让每个请求携带token
    }
    if(config.url.indexOf('checkCaptcha')!=-1){
        config.withCredentials = true
    }else{
        config.withCredentials = false
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    // return Promise.reject(error);
});

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
    response => {
    /*通过response自定义code来标示请求状态*/
        const res = response;

        return Promise.resolve(response)
    },error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    Toast({
                        message: '请求出错',
                        position: 'bottom',
                        duration: 3000
                    });
                    break;
                case 504:
                    Toast({
                        message:'请求超时',
                        position:'bottom',
                        duration:3000,
                    })
                case '000001':
                    Indicator.close();
                    router.replace({path:'/systemError'})  //跳转到500页面
                    break;
            }
        }
        return Promise.reject(error)  // 返回接口返回的错误信息
    })

//返回一个Promise(发送post请求)
export function fetch(url, params, method) {
    var method=method.toLowerCase();
    return new Promise((resolve, reject) => {
        axios[method](url, params)
        .then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
        .catch((error) => {
           reject(error)
       })
    })
}
