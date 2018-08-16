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
                <input type="text" maxlength="11" placeholder="请输入手机号" v-model="tel">
            </div>
            <section class="line"></section>
            <div class="ver_code">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="vercode">
                <span class="text_click">获取验证码</span>
            </div>
            <section class="line"></section> 
        </div>
        <!-- 注册协议 -->
        <div class="agr"><img :src="readicon" alt="" @click="isread">我已阅读并接受<span @click="$router.push('/registerArg')">《存金通商户版用户协议》</span></div>
        <!-- 按钮 -->
        <div class="create_acount">
            <section :class="{'hasActived':highLight,'noActived':dark}" @click="commit">立即绑定</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import store_readed from 'static/images/store-readed.png'
import store_read from 'static/images/store-read.png'

    export default {
        data(){
            return{
                tel: '',//手机号
                vercode: '',//验证码
                readicon: store_readed,
                highLight: false,
                dark: true,
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{

        },
        methods: {
            isread(){
                this.readicon==store_readed?this.readicon=store_read:this.readicon=store_readed;
            },
            //提交信息
            commit(){
                
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
.hasActived{
    background-color: #C09C60;
}
.noActived{
    background-color: #e8ddc4;
}
</style>
