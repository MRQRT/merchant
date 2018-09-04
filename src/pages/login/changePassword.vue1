<template>
    <div class="changePassword">
        <!-- 头部标题部分 -->
        <head-top headTitle='修改登录密码' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- input-message -->
        <div class="password orpassword">
            <input type="password" maxlength="20" placeholder="请输入原登录密码" v-model="password">
            <span class="clear" v-show="password" style="z-index:3"><img src="static/images/clearinput.png" alt="" @click="clears('old')"></span>
        </div>
        <div class="message">
            <div class="password">
                <input type="password" maxlength="20" placeholder="请输入新密码，6-18位数字、字母组合" v-model="newPassword1">
                <span class="clear" v-show="newPassword1" style="z-index:3"><img src="static/images/clearinput.png" alt="" @click="clears('new1')"></span>
            </div>
            <section class="line"></section>
            <div class="password">
                <input type="password" maxlength="20" placeholder="再次确认密码" v-model="newPassword2">
                <span class="clear" v-show="newPassword2" style="z-index:3"><img src="static/images/clearinput.png" alt="" @click="clears('new2')"></span>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="create_acount">
            <section class="noActived" :class="{'hasActived':isSubmit}" @click="commit">确认修改</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import store_readed from 'static/images/store-readed.png'
import store_read from 'static/images/store-read.png'
import {MessageBox,Toast} from 'mint-ui'
import {change_password} from '@/service/getData.js'
import md5 from 'js-md5'
    export default {
        data(){
            return{
                tel: '',//手机号
                password: '',//旧密码
                check_old: false,
                newPassword1: '',//新密码
                check_new1: false,
                newPassword2: '',//确定新密码
                check_new2: false,
                isSubmit: false,
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{
            //旧密码
            password(val){
                let d = this.check_passwords(val,'old');
                if(this.check_old&&this.check_new1&&this.check_new2&&this.newPassword1==this.newPassword2){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //新密码1
            newPassword1(val){
                let d = this.check_passwords(val,'new1');
                if(this.check_old&&this.check_new1&&this.check_new2&&this.newPassword1==this.newPassword2){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            },
            //新密码2
            newPassword2(val){
                let d = this.check_passwords(val,'new2');
                if(this.check_old&&this.check_new1&&this.check_new2&&this.newPassword1==this.newPassword2){
                    this.isSubmit=true
                }else{
                    this.isSubmit=false
                }
            }  
        },
        methods: {
            //提交信息
            async commit(){
                if(this.newPassword1!=this.newPassword2){
                    Toast('两次新密码输入不一致')
                    return
                }
                if(!this.isSubmit)return
                let a = md5(this.password);
                let b = md5(this.newPassword1);
                const res = await change_password(a,b);
                if(res.code=='000000'){
                    MessageBox.alert('登录密码已更新').then(action => {
                       this.$router.push('/account')
                    });
                }else{
                    Toast(res.message)
                }
            },
            //校验密码格式是否正确
            check_passwords(val,val2){
                let reg = /^[a-z0-9]+$/i;
                if(val.length<6||val.length>20){
                    if(val2=='old'){
                        this.check_old=false
                    }else if(val2=='new1'){
                        this.check_new1=false
                    }else if(val2=='new2'){
                        this.check_new2=false
                    }
                    return
                }
                if(val.match(reg)){
                    if(val2=='old'){
                        this.check_old=true
                    }else if(val2=='new1'){
                        this.check_new1=true
                    }else if(val2=='new2'){
                        this.check_new2=true
                    }
                    return
                }else if(val ==''){
                     if(val2=='old'){
                        this.check_old=false
                    }else if(val2=='new1'){
                        this.check_new1=false
                    }else if(val2=='new2'){
                        this.check_new2=false
                    }
                    return
                }else{
                     if(val2=='old'){
                        this.check_old=false
                    }else if(val2=='new1'){
                        this.check_new1=false
                    }else if(val2=='new2'){
                        this.check_new2=false
                    }
                    return
                }
            },
            //清空输入框
            clears(val){
                if(val=='old'){
                    this.password=''
                }else if(val=='new1'){
                    this.newPassword1=''
                }else if(val=='new2'){
                    this.newPassword2=''
                }
            },
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
    width: 90%;
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
.noActived{
    background-color: #e8ddc4;
}
.hasActived{
    background-color: #C09C60;
}
.clear img{
    width: .36rem;
}   
</style>
