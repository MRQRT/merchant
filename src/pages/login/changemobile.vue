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
                <input type="text" maxlength="11" placeholder="请输入更换手机号" v-model="tel" @input="checkInput(tel,'telphone')">
                <span class="clear" v-show="tel" style="z-index:3"><img src="static/images/clearinput.png" alt="" @click="clears"></span>
            </div>
            <section class="line"></section>
            <div class="ver_code">
                <input type="text" maxlength="6" placeholder="请输入短信验证码" v-model="vercode" @input="checkInput(vercode,'vercode')">
                <span class="text_click" @click="get_vercode" ref="send_smscode">{{clickText}}</span>
            </div>
        </div>
        <div class="password">
            <input type="text" maxlength="20" placeholder="请输入登录密码" ref="password" v-model="password">
        </div>
        <!-- 按钮 -->
        <div class="create_acount">
            <section class="noActived" :class="{'hasActived':isSubmit}" @click="commit">确认修改</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {MessageBox,Toast} from 'mint-ui'
import {change_mobile,sendsms,checkexist} from '@/service/getData.js'
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
            isSubmit: false,
            clickText: '获取验证码',
            iNow: true,//解决重复点击问题
            second: 60,//获取验证码的毫秒数
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
            if(this.check_tel&&this.check_vercode&&this.check_password){
                this.isSubmit=true
            }else{
                this.isSubmit=false
            }
        },
        //验证码
        vercode(val){
            val.length==6?this.check_vercode=true:this.check_vercode=false;
            if(this.check_vercode&&this.check_tel&&this.check_password){
                this.isSubmit=true
            }else{
                this.isSubmit=false
            }
        },
        //密码
        password(val){
            let d = this.check_passwords(val);
            if(this.check_vercode&&this.check_tel&&this.check_password){
                this.isSubmit=true
            }else{
                this.isSubmit=false
            }
        },
    },
    methods: {
        //提交信息
        async commit(){
            let a = this.check_tels(this.tel);
            if(!a)return
            if(this.tel==this.mobile){
                Toast('与当前绑定手机号相同')
                return
            }
            if(!this.check_vercode&&this.vercode!=''){
                Toast('验证码格式不正确')
                return
            }else if(this.vercode==''){
                Toast('请输入验证码')
                return
            }
            if(!this.check_password){
                Toast('密码格式不正确')
                return
            }else if(this.check_password==''){
                Toast('请输入密码')
                return
            }
            if(!this.isSubmit)return
            var md5password = md5(this.password);
            const res = await change_mobile(this.tel,this.vercode,md5password);
            if(res.code=='000000'){
                MessageBox({
                    title: '修改成功',
                    message: '绑定手机号已修改，下次登录可使用新手机号码登录' ,
                    confirmButtonText: '确定',
                }).then(action=>{
                    this.$router.push('/account')
                })
            }else{
                Toast({
                    message: res.message,
                    position: 'bottom',
                    duration: 3000
                })
            }
        },
        //点击获取验证码
        async get_vercode(){
            if(this.iNow==false)return//还在读秒不能点击
            let send_smscode = this.$refs.send_smscode;
            let a = this.check_tels(this.tel);//检查手机号
            if(!a)return
            if(this.tel==this.mobile){
                Toast('与当前绑定手机号相同')
                return
            }
            const res = await checkexist(this.tel);//检验是否已注册
            if(res.code=="000000"&&(res.data&&res.data.isExist)){//请求成功且没有注册可以发送
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
                        that.clickText = '重新获取';
                        that.second = 60;
                    }
                },1000)
                let res1 = await sendsms(this.tel,4);
                if(res1.code!='000000'){
                    Toast({
                        message: res1.message,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            }else if(res.code=="000000"&&(res.data&&!res.data.isExist)){//请求成功且已经注册不可以发送
                Toast('该手机号已绑定')
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
                if(val2=="telphone"){
                    this.tel=''
                }else if(val2=="vercode"){
                    this.vercode=''
                }
            }else{
                str.forEach(item => {
                    ss = ss + item
                });
                if(val2=="telphone"){
                    this.tel=ss
                }else if(val2=="vercode"){
                    this.vercode=ss
                }
            }
        },
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
