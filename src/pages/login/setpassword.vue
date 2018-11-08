<template>
    <div class="account">
        <!-- 头部标题部分 -->
        <head-top headTitle='设置密码' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="goback()">
            <span slot="custom" class="custom" @click="stride">跳过</span>
        </head-top>
        <!-- header -->
        <!-- <header class="header">
            <img src="static/images/tip.png" alt="">
            <p>设置密码后，您就可以使用手机号+密码登录</p>
        </header> -->
        <!-- password -->
        <section class="password">
             <input type="password" minlength="6" maxlength="20" placeholder="请输入登录密码，6~20位字母、数字或组合" ref="password1" class="passwords" v-model="password1" v-on:blur="ckeckpassword(password1)" v-on:focus="focus()">
        </section>
        <div class="line" style="margin-left:.4rem;margin-right:.4rem;"></div>
        <!-- tip -->
        <section class="tip" v-show="check_password"><span><img src="static/images/bingding-error.png" alt=""></span>密码格式不正确，请输入6～20位字母、数字或组合</section>
        <!-- password2 -->
        <section class="password">
             <input type="password" minlength="6" maxlength="20" placeholder="再次确认密码" ref="password2" class="passwords" v-model="password2">
        </section>
        <!-- button -->
        <section class="button">
            <div @click="confirm()">确认</div>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {set_password} from '@/service/getData.js'
import {MessageBox,Toast} from 'mint-ui'
import md5 from 'js-md5'
export default {
    data(){
        return{
            check_password:false,
            password1:'',
            password2:'',
            tip:true,
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
        async confirm(){
            if(this.password1==''){
                Toast('请输入密码')
                return
            }
            if(this.check_password==true){
                return
            }
            if(this.password2==''){
                Toast('请再次输入密码')
                return
            }
            if(this.password1!=this.password2){
                Toast('两次输入密码不一致')
                return
            }
            var md5password = md5(this.password1);
            const res = await set_password(md5password);
            if(res.code=='000000'){
                var text = `<div style="text-align:center">登录密码已设置</div>`
                MessageBox({
                    title: '设置成功',
                    message: text ,
                    confirmButtonText: '确定',
                }).then((action)=>{
                    this.toNext();
                })
            }else{
                Toast({
                    message: res.message,
                    position: 'bottom',
                    duration: 3000
                });
            }

        },
        ckeckpassword(val){
            let reg = /^[a-z0-9]+$/i;
            if(val.length<6||val.length>20){
                this.check_password=true
                return
            }
            if(val.match(reg)){
                this.check_password=false
                return
            }else if(val ==''){
                this.check_password=true
                return
            }else{
                this.check_password=true
                return
            }
        },
        focus(){
            this.check_password=false
        },
        //返回上一页
        goback(){
            this.$router.push('/mine')
        },
        //跳过
        stride(){
            this.toNext();
        },
        //登录完成后进行页面跳转
        toNext(){
            //登录成功后去获取进入登录页的上一页,再跳转回去(带上对应的参数)
            var path="",id="";
            if(this.$route.query.redirect){
                path=this.$route.query.redirect
            }
            if(this.$route.query.from){
                path=this.$route.query.from
            }
            if(this.$route.query.id){
                id=this.$route.query.id
            }
            if(path!=''&&id==''){
                this.$router.replace({
                    path:path
                })
                return;
            }else if(path!=''&&id!=''){
                this.$router.replace({
                    path:path,
                    query: {
                        id: id
                    }
                })
                return
            }else{
                this.$router.push('/index');
            }
        }
    },
    created(){

    },
    mounted(){

    },
}
</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.account{
background-color:#f8f8f8;
min-height:100vh;
padding-top:.88rem;

}
.password{
    width:100%;
    height: 1.1rem;
    background:#fff;
    padding: .32rem .4rem 0 .4rem;
}
.password input{
    float:left;
    width: 100%;
    padding-left: .4rem;
    font-size: .32rem;
    height: .4rem;
    line-height: .4rem;
}
.tip{
    color:#333;
    font-size:.22rem;
    padding-left: .4rem;
    height: .6rem;
    padding-top:.1rem;
}
.tip img{
    width:.24rem;
    margin-top:.03rem;
    margin-right: .1rem;
}
.tip span{
    float:left;
}
.button{
    margin-top:.8rem;
    height: .88rem;
    line-height: .88rem;
    text-align:center;
    color:#fff;
    font-size:.34rem;
}
.button div{
    width:90%;
    display:inline-block;
    background-color:#DDC899;
    border-radius:4px;
}
.header{
    width: 100%;
    height: .63rem;
    line-height: .63rem;
    background:rgba(242,182,67,1);
    padding-left: .4rem;
}
.header img{
    width: .24rem;
    height: .24rem;
    float: left;
    margin-top: .18rem;
    margin-right: .08rem;
}
.header p{
    font-size: .22rem;
    color: #C09C60;
    float: left;
}
</style>
