/**
 * 解析url参数
 * Created by yi on 2016-12-28.
 * @return Object {id:12334}
 */
export function urlParse(){
    var url = window.location.search;
    var obj = {};
    var reg = /[?&][^?&]+=[^?&]+/g;
    var arr = url.match(reg);

    if (arr) {
        arr.forEach(function (item) {
            var tempArr = item.substring(1).split('=');
            var key = decodeURIComponent(tempArr[0]);
            var val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

export function imgip(){
    let imgip="http://cjtshrestest.au32.cn/";
    // let imgip="https://wap.au32.cn";
    return imgip
}

/**
 * 图片压缩
 */
export function compress(file,size,that){
    //将base64文件转成二进制文件
    var dataURLToBlob=function(url){
        var arr=url.split(','),mime=arr[0].match(/:(.*?);/)[1],
        bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);
        while(n--){
            u8arr[n]=bstr.charCodeAt(n);
        }
        return new Blob([u8arr],{type:mime});
    }
    var img = new Image,
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
    img.crossOrigin = "Anonymous";
    img.src = file.result
    // if(this.AndroVerson>4||this.iosVerson>10){
    img.onload =() => {
        var width = img.width;
        var height = img.height;
        var rate = ((size/1024/1024)*3).toFixed(1);
        var real_rate = (width<height ? width/height : height/width)/rate;
        canvas.width = width*real_rate;
        canvas.height = height*real_rate;
        ctx.drawImage(img,0,0,width,height,0,0,width*real_rate,height*real_rate);
        var src1 = canvas.toDataURL("image/jpg");
        var blob=dataURLToBlob(src1)
        //base64转换成二进制文件
        let formData = new FormData()
        formData.append('files', blob,'image.jpg')
        that.uploadimg(formData);
    }
    // }
    // }else{
        //如果浏览器版本都兼容，就不需要进行判断
    // }
}

/**
 * Created by yi on 2016-12-27.
 */

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 获取当前时间
export function curentTime(){
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";
    return(clock);
}

// 求两个天数的时间差
export function daysBetween(DateOne,DateTwo)  {
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('/'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('/')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('/'));

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('/'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('/')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('/'));

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return Math.abs(cha);
}

//清除非数字
export function clearNoNum(a,b){
    if(typeof a == 'number'){
        a = a+''
    }
    a=a.replace(/[^\d.]/g,"");
    a=a.replace(/^\./g,"");
    a=a.replace(/\.{2,}/g,".");
    a=a.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    a=a.replace(new RegExp("^(\\-)*(\\d+)\\.(\\d{0,"+b+"}).*$","gmi"),"$1$2.$3");
    return a;
}
/*
* 匹配中文字符和点
*/
export function cnCode(a){
    if(typeof a == 'number'){
        a = a+''
    }
    var reg = /[\u4e00-\u9fa5]+|\./gm;
    var str = a.match(reg);
    return str
} 

/*
* 匹配数字
*/
export function isNumber(a){
    if(typeof a == 'number'){
        a = a+''
    }
    // var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
    var reg = /[0-9]+/g;
    var str = a.match(reg);
    return str
}

/*
* 匹配数字或字母x
*/

export function isNumberOrx(a){
    if(typeof a == 'number'){
        a = a+''
    }
    var reg = /[0-9]{17}[x]|[0-9]{18}/gi;
    var str = a.match(reg);
    return str
}

/*
* 匹配数字或字母
*/

export function isNumberOrenleter(a){
    if(typeof a == 'number'){
        a = a+''
    }
    var reg = /^[a-z0-9]+$/i;
    var str = a.match(reg);
    return str
}

/**
 * Created by yi on 2016-12-28.
 */
export function savaToLocal(id, key, value) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromlLocal(id, key, def) {
    let seller = window.localStorage.__seller__;
        if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
}

/**
 * 设置本地存储
 */
export const setStore = (name, content, type) => {
    if (!name) return;
    content = JSON.stringify(content);
    if(window.localStorage && type=='local'){
        window.localStorage.setItem(name, content);
    }
    if(window.sessionStorage && type=='session'){
        window.sessionStorage.setItem(name, content);
    }
}

/**
 * 获取本地存储
 */
export const getStore = (name, type)=> {
    if (!name) return;
    if(window.localStorage && type=='local'){
        let val = window.localStorage.getItem(name)
        try{
            val = JSON.parse(val)
        }catch(err){
            val = window.localStorage.getItem(name)
        }finally{
            return val
        }
    }
    if(window.sessionStorage && type=='session'){
        let val = window.sessionStorage.getItem(name)
        try{
            val = JSON.parse(val)
        }catch(err){
            val = window.sessionStorage.getItem(name)
        }finally{
            return val
        }
    }
}

/**
 * 删除本地存储
 */
export const removeStore = (name, type) => {
    if (!name) return;
    if(window.localStorage && type=='local'){
        window.localStorage.removeItem(name)
    }
    if(window.sessionStorage && type=='session'){
        window.sessionStorage.removeItem(name)
    }
}

/**
 * 设置cookie
 */
export function setCookie(name, value, iDay){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay); //用来设置过期时间用的，获取当前时间加上传进来的iDay就是过期时间
    document.cookie=name+'='+value+';expires='+oDate;
};


/**
 * 获取cookie
 */
export function getCookie(name){
    var arr=document.cookie.split('; '); //多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    for(var i=0;i<arr.length;i++){ //历遍数组
        var arr2=arr[i].split('='); //原来割好的数组是：user=simon，再用split('=')分割成：user simon 这样可以通过arr2[0] arr2[1]来分别获取user和simon
        if(arr2[0]==name&&arr2[1]!=-1){ //如果数组的属性名等于传进来的name
            return arr2[1]; //就返回属性名对应的值
        }
    }
};

/**
 * 删除cookie
 */
export function removeCookie(name){
    setCookie(name, -1, -1);
};

/**
 * 格式化银行卡号
 */
export function formatBankNo (BankNo){
    var account = new String (BankNo);
    account = account.substring(0,22); /*帐号的总数, 包括空格在内 */
    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
        /* 对照格式 */
        if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
            var accountNumeric = accountChar = "", i;
            for (i=0;i<account.length;i++){
                accountChar = account.substr (i,1);
                if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
                if (i == 4) account = account + " "; /* 帐号第四位数后加空格 */
                if (i == 8) account = account + " "; /* 帐号第八位数后加空格 */
                if (i == 12) account = account + " ";/* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr (i,1)
            }
        }
    }
    else
    {
        account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
    }
    if (account != BankNo.value) BankNo.value = account;
}
/**
 * 添加自定义动画
 * @param  {[type]}   tag [description]
 * @param  {[type]}   obj [description]
 * @param  {Function} fn  [description]
 * @return {[type]}       [description]
 */
export function animate(tag, obj, fn1, fn2, that) {
    clearInterval(tag.timer);
    fn1 && fn1();
    tag.timer = setInterval(function () {
        var flag = true;
        for (var k in obj) {
            if (k == "opacity") {
                var target = obj[k] * 100;
                var leader = getStyle(tag, k) * 100 || 0;
                //缓动运动公式
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //设置的时候
                tag.style[k] = leader / 100;
            } else if (k == "zIndex") {
                //直接设置层级，不需要渐变
                tag.style.zIndex = obj[k];
            } else {
                //普通的，带单位的样式
                //k - 属性名 - 字符串形式 - attr
                //obj[k] - 属性值 - target
                var target = obj[k];//我想要变成得属性值，也就是我传进来的值
                var leader = parseInt(getStyle(tag, k)) || 0;//getStyle(tag, k)是当前被点击元素的属性值
                //缓动运动公式
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //设置的时候
                tag.style[k] = leader + "px";
                if(Math.abs(leader-target)<step){
                  tag.style[k] = target + "px";
                }
            }

            //检测，当前这个属性是否到达了指定位置
            if (leader != target) {
                //阻止清除定时器
                flag = false;
            }
        }

        //我们需要保证obj中每一个obj都运动到位置
        if (flag) {
            clearInterval(tag.timer);

            fn2 && fn2();
        }
    }, 50);
}
/*
获取样式
 */
export function getStyle(tag, attr) {
    return tag.currentStyle ? tag.currentStyle[attr] : getComputedStyle(tag, null)[attr];
}

/*
获取rem,设置动画时有用
 */
export function getRem(){
    var width = document.documentElement.getBoundingClientRect().width; //获取移动设备的宽度
    var maxWidth = 750;
    if (width > maxWidth) {
        width = maxWidth;
    }
    var rem = width * 100 / 750;
    return rem;
}


export function checkAgent(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid) return 'And';
    else return 'IOS';
}
export function isweixin(){
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        return true;
    }else{
        return false;
    }
}

