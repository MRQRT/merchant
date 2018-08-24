<template>
    <div class="register">
        <!-- 头部标题部分 -->
        <head-top headTitle='注册' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- logo -->
        <div class="logo"></div>
        <!-- input-message -->
        <div class="message">
            <div class="tel">
                <input type="text" maxlength="11" placeholder="请输入手机号" v-model="tel" pattern="[0-9]*" @input="checkInput(tel,'telphone')">
                <span v-show="clear"><img src="static/images/clearinput.png" alt="" @click="clears"></span>
            </div>
            <section class="line"></section>
            <div class="ver_code">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="vercode" pattern="[0-9]*" @input="checkInput(vercode,'vercode')">
                <span class="text_click" @click="get_vercode" ref="send_smscode">{{clickText}}</span>
            </div>
            <section class="line"></section> 
            <div class="password">
                <input :type="texorpas" minlength="6" maxlength="20" placeholder="6~20位字母、数字组合" ref="password" class="passwords" v-model="password">
                <span class="eye" @click="check_eye"><img :src="eye" alt="a"></span>
            </div>
            <section class="line"></section> 
        </div>
        <!-- 注册协议 -->
        <div class="agr"><img :src="readicon" alt="" @click="isread">我已阅读并接受<span @click="$router.push('/registerArg')">《存金通商户版用户协议》</span></div>
        <!-- 按钮 -->
        <div class="create_acount">
            <section class="noActived" :class="{'hasActived':isSubmit==true}" @click="commit">创建账号</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import op_eye from 'static/images/open_eye.png'
import clo_eye from 'static/images/close_eye.png'
import store_readed from 'static/images/store-readed.png'
import store_read from 'static/images/store-read.png'
import {MessageBox,Toast} from 'mint-ui'
import { isNumber } from '@/config/mUtils.js'
import {sendsms,checkexist,registry} from '@/service/getData.js'
import {mapMutations,mapState} from 'vuex'
 import md5 from 'js-md5'
    export default {
        data(){
            return{
                eye: clo_eye,//眼睛 
                tel: '',//手机号
                check_tel: false,//手机号正确与否
                vercode: '',//验证码
                check_vercode: false,//验证码正确与否
                password: '',//密码
                check_password: false,//密码是否满足条件
                readicon: store_readed,
                clickText: '获取验证码',
                clear:false,
                texorpas: 'password',//密码框的类型
                isSubmit: false,
                iNow: true,//解决重复点击问题
                second: 60,//获取验证码的毫秒数
                arg:true,//存金通用户协议是否勾选
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{
            //手机号
            tel(val){
                val?this.clear=true:this.clear=false
                let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
                if(val.length<11&&val.length>0){
                    this.check_tel=false
                }
                if(val.match(reg)){
                    this.check_tel=true
                }else if(val ==''){
                    this.check_tel=false
                }else{
                    this.check_tel=false
                }
                if(this.check_tel&&this.check_vercode&&this.check_password&&this.arg){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //验证码
            vercode(val){
               val.length==6?this.check_vercode=true:this.check_vercode=false;
               if(this.check_vercode&&this.check_tel&&this.check_password&&this.arg){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //密码
            password(val){
                let d = this.check_passwords(val);
                if(this.check_vercode&&this.check_tel&&this.check_password&&this.arg){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //阅读协议
            arg(){
                if(this.check_vercode&&this.check_tel&&this.check_password&&this.arg){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERID','RECORD_MOBILE','RECORD_MERCHANTID','RECORD_ACCESSTOKEN'
            ]),
            check_eye(){
                this.eye==clo_eye?this.eye=op_eye:this.eye=clo_eye
                this.eye==clo_eye?this.texorpas='password':this.texorpas='text'
            },
            isread(){
                if(this.readicon==store_readed){
                    this.readicon=store_read;
                    this.arg=0
                }else{
                    this.readicon=store_readed;
                    this.arg=1
                }
            },
            //提交信息
            async commit(){
                if(!this.isSubmit)return
                const res = await checkexist(this.tel);
                if(res.code=="000000"&&(res.data&&res.data.isExist)){//请求成功且没有注册
                    let md5password=md5(this.password); 
                    const res = await registry(this.tel,this.vercode,md5password);
                    if(res.code=='300111'){
                        Toast('验证码错误')
                        return
                    }else if(res.code=='000000'){
                        this.RECORD_USERID(res.data.userId)
                        this.RECORD_ACCESSTOKEN(res.data.accessToken)
                        this.RECORD_MOBILE(res.data.mobile)
                        this.RECORD_MERCHANTID(res.data.merchantId)
                        this.$router.push('/login');
                    }
                }else if(res.code=="000000"&&(res.data&&!res.data.isExist)){//请求成功且已经注册
                    MessageBox({
                        title: '提示',
                        message: '手机号已注册',
                        confirmButtonText: '去登录',
                        showCancelButton: '我知道了',
                    }).then((action)=>{
                        if(action=='confirm'){
                            this.$router.push('/login')
                        }
                    })
                    return
                }else{
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 3000
                    });
                    return
                }
            },
            //清除输入框
            clears(){
                this.tel='';
            },
            //点击获取验证码
            async get_vercode(){
                if(this.iNow==false)return//还在读秒不能点击
                let send_smscode = this.$refs.send_smscode;
                let a = this.check_tels(this.tel);//检查手机号
                if(!a)return
                const res = await checkexist(this.tel);//检验是否已注册
                if(res.code=="000000"&&(res.data&&res.data.isExist)){//请求成功且没有注册
                    var that=this;
                    this.iNow = false;
                    let timer = setInterval(function(){
                        send_smscode.style.color="#666";
                        that.second--;
                        that.clickText = that.second+'s';
                        if(that.second==-1){
                            clearInterval(timer);
                            that.iNow=true;
                            send_smscode.style.color="#C09C60";
                            that.clickText = '获取验证码';
                            that.second = 60;
                        }
                    },1000)
                    let res = await sendsms(this.tel,0);
                }else if(res.code=="000000"&&(res.data&&!res.data.isExist)){//请求成功且已经注册
                    MessageBox({
                        title: '提示',
                        message: '手机号已注册' ,
                        confirmButtonText: '去登录',
                        showCancelButton: '我知道了'
                    }).then((action)=>{
                        if(action=='confirm'){
                            this.$router.push('/login')
                        }
                    })
                    return
                }else{
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            },
            //检查输入是否为数字
            checkInput(val,val2){
                var str = isNumber(val);
                var ss = '';
                if(str==null){
                    if(val2=="bankCard"){
                        this.bankCard=''
                    }else if(val2=="telphone"){
                        this.tel=''
                    }else if(val2=="vercode"){
                        this.vercode=''
                    }
                }else{
                    str.forEach(item => {
                        ss = ss + item
                    });
                    if(val2=="bankCard"){
                        this.bankCard=ss
                    }else if(val2=="telphone"){
                        this.tel=ss
                    }else if(val2=="vercode"){
                        this.vercode=ss
                    }
                }
            },
            //校验手机号是否正确
            check_tels(val){
                let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
                if(val.length<11&&val.length>0){
                    Toast('手机号格式不正确')
                    this.check_tel=false
                    this.vercode=''
                    return false
                }
                if(val.match(reg)){
                    this.check_tel=true
                    return true
                }else if(val ==''){
                    Toast('请输入手机号')
                    this.vercode=''
                    this.check_tel=false
                    return false
                }else{
                    Toast('手机号格式不正确')
                    this.check_tel=false
                    this.vercode=''
                    return false
                }
            },
            //校验密码格式是否正确
            check_passwords(val){
                let reg = /^[a-z0-9]+$/i;
                if(val.length<6||val.length>20){
                    this.check_password=false
                    return
                }
                if(val.match(reg)){
                    this.check_password=true
                    return
                }else if(val ==''){
                    this.check_password=false
                    return
                }else{
                    this.check_password=false
                    return
                }
            }
        },
        created(){

        },
        mounted(){
            
        },
    }

</script>
<style media="screen">
    .mint-msgbox-wrapper>.mint-msgbox{
        width:5rem;
        border-radius: 0;
    }
    .mint-msgbox-wrapper .mint-msgbox-message{
        font-size: .26rem;
    }
    .mint-msgbox-wrapper .mint-msgbox-confirm, .mint-msgbox .mint-msgbox-btns .mint-msgbox-cancel{
        color:#C09C60;
    }
    .mint-msgbox-wrapper .mint-msgbox-message{
        text-align: left;
    }
    .mint-msgbox-wrapper .mint-msgbox-message{
        padding:.1rem .2rem;
    }
</style>
<style scoped lang="scss">
@import '../../sass/mixin';
.logo{
    width: 100%;
    height: 2.48rem;
    padding-top: .88rem;
    @include bg-image('/static/images/logo.png');
    background-size: 1.83rem;
    background-position: center 1.4rem;
}
.message{
    width: 100%;
    height: 3.3rem;
    padding: 0 .4rem 0 .4rem;
}
.message div{
    width: 100%;
    height: 1.1rem;
    padding-top: .3rem;
    position: relative;
}
.tel input,.ver_code input,.password input{
    width: 100%;
    height: .35rem;
    font-size: .28rem;
}
.tel{
    position: relative;
}
.tel>span>img{
    width: .3rem;
}
.tel span{
    width: .4rem;
    height: .4rem;
    position: absolute;
    right: 0;
    top: .34rem;
}
.text_click{
   color: #C09C60;
   font-size: .26rem;
   position: absolute;
   right: 0;
   top: 35%; 
}
.eye{
    position: absolute;
    right: 0;
    top: .35rem;
    width: .44rem;
}
.agr{
    width: 100%;
    height: 2rem;
    padding: 1.4rem .4rem 0 .4rem;
    font-size: .24rem;
    color: #999999; 
}
.agr img{
    width: .24rem;
    margin-right: .1rem;
    vertical-align: middle; 
}
.agr span{
    color: #C09C60;
}
.create_acount{
    width: 100%;
    height: .88rem;
    padding-left: .4rem;
    padding-right: .4rem;
}
.create_acount section{
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    color: #fff;
    font-size: .34rem;
    text-align: center;
    border-radius: 4px;
}
.noActived{
    background-color: #e8ddc4;
}
.hasActived{
    background-color: #C09C60;
}
</style>
