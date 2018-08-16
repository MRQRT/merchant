<template>
    <div class="changePassword">
        <!-- 头部标题部分 -->
        <head-top headTitle='修改登录密码' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- input-message -->
        <div class="password orpassword">
            <input type="password" maxlength="18" placeholder="请输入原登录密码" v-model="password">
        </div>
        <div class="message">
            <div class="password">
                <input type="password" maxlength="18" placeholder="请输入新密码，6-18位数字、字母组合" v-model="newPassword">
            </div>
            <section class="line"></section>
            <div class="password">
                <input type="password" maxlength="18" placeholder="再次确认密码" v-model="newPassword2">
            </div>
        </div>
        <!-- 按钮 -->
        <div class="create_acount">
            <section :class="{'hasActived':highLight,'noActived':dark}" @click="commit">确认修改</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import store_readed from 'static/images/store-readed.png'
import store_read from 'static/images/store-read.png'
import {MessageBox} from 'mint-ui'

    export default {
        data(){
            return{
                tel: '',//手机号
                password: '',//旧密码
                newPassword: '',//新密码
                newPassword2: '',//确定新密码
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
            //提交信息
            commit(){
                MessageBox({
                    title: '提示',
                    message: '手机号已注册' ,
                    confirmButtonText: '去登录',
                    showCancelButton: '我知道了'
                })
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
.changePassword{
    width: 100%;
    background: #f8f8f8;
    min-height: 100vh;
}
.orpassword{
    width: 100%;
    height: 4.8rem;
    padding: .88rem .4rem 0 .4rem;
    background-color: #fff;
    margin-top: .88rem;
}
.message{
    margin-top: .2rem;
    padding: 0 .4rem 0 .4rem;
    background-color: #fff;
}
.password{
    width: 100%;
    height: 1.1rem;
    padding-top: .3rem;
    position: relative; 
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
.hasActived{
    background-color: #C09C60;
}
.noActived{
    background-color: #e8ddc4;
}
</style>
