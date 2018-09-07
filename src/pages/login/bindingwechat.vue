<template>
    <div class="bingingWechat">
        <!-- 头部标题部分 -->
        <head-top headTitle='绑定手机号' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- logo -->
        <div class="logo">
            <p>为了保障您的账户安全，请绑定手机号</p>
        </div>
        <!-- input-message -->
        <div class="message">
            <div class="tel">
                <input type="text" maxlength="11" placeholder="请输入手机号" v-model="tel" @input="checkInput(tel,'telphone')">
            </div>
            <section class="line"></section>
            <div class="ver_code">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="vercode" @input="checkInput(vercode,'vercode')">
                <span class="text_click" @click="get_vercode" ref="send_smscode">{{clickText}}</span>
            </div>
            <section class="line"></section>
        </div>
        <!-- 注册协议 -->
        <!-- <div class="agr"><img :src="readicon" alt="" @click="isread">我已阅读并接受<span @click="$router.push('/registerArg')">《存金通商户版用户协议》</span></div> -->
        <!-- 按钮 -->
        <div class="create_acount">
            <section class="noActived" :class="{'hasActived':isSubmit==true}" @click="commit">立即绑定</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import store_readed from 'static/images/store-readed.png'
import store_read from 'static/images/store-read.png'
import {sendsms,wechat_bind_mobile} from '@/service/getData.js'
import {mapMutations,mapState} from 'vuex'
import { isNumber } from '@/config/mUtils.js'
import {Toast} from 'mint-ui'
import md5 from 'js-md5'
    export default {
        data(){
            return{
                tel: '',//手机号
                check_tel: false,//手机号正确与否
                vercode: '',//验证码
                check_vercode: false,//验证码正确与否
                readicon: store_readed,
                // arg:true,//存金通用户协议是否勾选
                isSubmit: false,
                clickText: '获取验证码',
                openid: '',//用户的openid
                iNow:true,//
                second:60,//
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
                if(this.check_tel&&this.check_vercode){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //验证码
            vercode(val){
               val.length==6?this.check_vercode=true:this.check_vercode=false;
               if(this.check_vercode&&this.check_tel){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //
            // arg(val){
            //    if(this.check_vercode&&this.check_tel&&this.arg){
            //         this.isSubmit=true
            //     }else{
            //         this.isSubmit=false
            //     } 
            // }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERID','RECORD_MOBILE','RECORD_MERCHANTID','RECORD_ACCESSTOKEN'
            ]),
            // isread(){
            //     if(this.readicon==store_readed){
            //         this.readicon=store_read;
            //         this.arg=0
            //     }else{
            //         this.readicon=store_readed;
            //         this.arg=1
            //     }
            // },
            async get_vercode(){
                if(this.iNow==false)return//还在读秒不能点击
                let send_smscode = this.$refs.send_smscode;
                let a = this.check_tels(this.tel);//检查手机号
                if(!a)return
                var that=this;
                this.iNow = false;
                let timer = setInterval(function(){
                    send_smscode.style.color="#666";
                    that.second--;
                    that.clickText = that.second+'s';
                    if(that.second==0){
                        clearInterval(timer);
                        that.iNow=true;
                        send_smscode.style.color="#C09C60";
                        that.clickText = '重新获取';
                        that.second = 60;
                    }
                },1000)
                let res1 = await sendsms(this.tel,3);
                if(res1.code!='000000'){
                    Toast({
                        message: res1.message,
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
            //提交信息
            async commit(){
                if(!this.isSubmit)return
                const res = await wechat_bind_mobile(this.openid,this.tel,this.vercode);
                if(res.code=='000000'){
                    this.RECORD_USERID(res.data.userId)
                    this.RECORD_ACCESSTOKEN(res.data.accessToken)
                    this.RECORD_MOBILE(res.data.mobile)
                    this.RECORD_MERCHANTID(res.data.merchantId)
                    this.$router.push('/index');
                }else if(res.code=='300111'){
                    Toast({
                        message: '短信验证失败',
                        position: 'bottom',
                        duration: 3000
                    });
                }else if(res.code=='300113'){
                    Toast({
                        message: '该手机已绑定，请更换其他手机号',
                        position: 'bottom',
                        duration: 3000
                    });
                }else{
                    Toast({
                         message: res.message,
                        position: 'bottom',
                        duration: 3000
                    })
                }
            }
        },
        created(){

        },
        mounted(){
            if(this.$route.query.openid){
                this.openid=this.$route.query.openid
            }
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
.bingingWechat{
    background:#fff;
    min-height:100vh;
}
.logo{
    width: 100%;
    height: 3.5rem;
    padding-top: .88rem;
    @include bg-image('/static/images/binding.png');
    background-size: 1.83rem;
    background-position: center 1.4rem;
}
.logo p{
    color: #999999;
    font-size: .22rem;
    text-align: center;
    margin-top: 1.4rem;

}
.message{
    width: 100%;
    height: 2.2rem;
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
    margin-top:2rem;
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
