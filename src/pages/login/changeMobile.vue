<template>
    <div class="changeMobile">
        <!-- 头部标题部分 -->
        <head-top headTitle='修改绑定手机号' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- logo -->
        <div class="logo">
            <p>当前绑定手机号：{{bindinggMobile}}</p>
            <section>更换手机号后，将使用新绑定手机号码再次登录。</section>
        </div>
        <!-- input-message -->
        <div class="message">
            <div class="tel">
                <input type="text" maxlength="11" placeholder="请输入手机号" v-model="tel">
                <span class="clear" v-show="tel" style="z-index:3"><img src="static/images/clearinput.png" alt="" @click="clears"></span>
            </div>
            <section class="line"></section>
            <div class="ver_code">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="vercode">
                <span class="text_click">获取验证码</span>
            </div>
        </div>
        <div class="password">
            <input type="text" maxlength="20" placeholder="6~20位字母、数字组合" ref="password" v-model="password">
        </div>
        <!-- 按钮 -->
        <div class="create_acount">
            <section class="noActived" :class="{'hasActived':issubmit}" @click="commit">确认修改</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {MessageBox} from 'mint-ui'
import {change_mobile} from '@/service/getData.js'
import {mapState,mapMutations} from 'vuex'
import { isNumber } from '@/config/mUtils.js'
import md5 from 'js-md5'

export default {
    data(){
        return{
            bindinggMobile: '',
            tel: '',//手机号
            check_tel:false,
            vercode: '',//验证码
            check_vercode:false,
            password: '',//密码
            check_password:false,
            issubmit: false,
        }
    },
    components:{
        headTop,
    },
    computed: {
        ...mapState([
            'mobile'
        ])
    },
    watch:{

    },
    methods: {
        //提交信息
        commit(){
            MessageBox({
                title: '提示',
                message: '手机号已注册' ,
                confirmButtonText: '去登录',
                showCancelButton: '我知道了'
            })
        },
        clears(){
            this.tel=''
        }
    },
    created(){

    },
    mounted(){
        var a = new String(this.mobile);
        this.bindinggMobile = a.substring(0,3)+'****'+a.substring(7,11);
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
.changeMobile{
    background-color: #f8f8f8;
    min-height: 100vh;
}
.logo{
    width: 100%;
    height: 5.1rem;
    padding-top: 3.6rem;
    @include bg-image('/static/images/tel.png');
    background-size: 1.66rem;
    background-position: center 1.4rem;
    background-color: #fff;
}
.logo p{
    width: 100%;
    text-align: center;
    font-size: .32rem;
    color: #333;
}
.logo section{
    width: 100%;
    font-size: .26rem;
    text-align: center;
    padding-top: .12rem;
}
.message{
    width: 100%;
    height: 2.2rem;
    padding: 0 .4rem 0 .4rem;
    margin-top: .2rem;
    background-color: #fff;
}
.message div{
    width: 100%;
    height: 1.1rem;
    padding-top: .35rem;
    position: relative;
}
.tel input,.ver_code input,.password input{
    width: 92%;
    height: .35rem;
    font-size: .28rem;
}
.tel input{
    float:left;
}
.password{
    width: 100%;
    height: 1.1rem;
    position: relative;
    margin-top: .2rem;
    background-color: #fff;
    padding: .3rem .4rem 0 .4rem;
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
    margin-top: .8rem;
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
.clear{
    float: left;
    margin-top: .15rem;
}
.clear img{
    width: .36rem;
} 
</style>
