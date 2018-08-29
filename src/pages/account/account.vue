<template>
    <div class="account">
        <!-- 头部标题部分 -->
        <head-top headTitle='帐户管理' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 模块 -->
        <section class="model" @click="go_changemobile()">
            <div class="icon"><img src="static/images/mobileicon.png" alt="手机"></div>
            <div class="text"><span>绑定手机号</span><span class="mobile">{{mobile | formate_mobile}}</span></div>
            <div class="nextpage"><img src="static/images/next.png" alt=""></div>
        </section>
        <!-- 模块 -->
        <section class="model" @click="go_address()">
            <div class="icon"><img src="static/images/addressicon.png" alt="地址"></div>
            <div class="text"><span>地址管理</span><span class="set">{{address_isset}}</span></div>
            <div class="nextpage"><img src="static/images/next.png" alt=""></div>
        </section>
        <!-- 模块 -->
        <section class="model" @click="go_password()">
            <div class="icon"><img src="static/images/passwordicon.png" alt="密码"></div>
            <div class="text"><span>登录密码</span><span class="set">{{password_isset}}</span></div>
            <div class="nextpage"><img src="static/images/next.png" alt=""></div>
        </section>
        <!-- button -->
        <section class="button">
            <div class="but_text" @click="quitLogin()">退出登录</div>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {logout,query_shop_address_list} from '@/service/getData.js'
import { MessageBox,Toast } from 'mint-ui';
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return{
            address_isset:'',
            password_isset:'未设置',
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
    filters:{
        formate_mobile(val){
            return val.substring(0,3)+'****'+val.substring(7,11);
        }
    },
    watch:{

    },
    methods: {
        ...mapMutations([
            'RECORD_USERID','RECORD_MOBILE','RECORD_MERCHANTID','RECORD_ACCESSTOKEN'
        ]),
        go_changemobile(){
            this.$router.push('/changemobile')
        },
        go_address(){
            if(this.address_isset=='未设置'){
                this.$router.push('/addaddress');
            }else if(this.address_isset=='已设置'){
                this.$router.push('/addresslist')
            }
        },
        go_password(){
            if(this.password_isset=='未设置'){
                this.$router.push('/setpassword');
            }else if(this.password_isset=='已设置'){
                this.$router.push('/changepassword');
            }
        },
        //获取用户地址
        async getAddress(){
            const res = await query_shop_address_list();
            if(res.code=='000000'&&res.data.content.length>0){
                this.address_isset='已设置'
            }else if(res.code=='000000'&&res.data.content.length==0){
                this.address_isset="未设置"
            }
        },
        //退出登录
        async quitLogin(){
            MessageBox({
                title: '提示',
                message: '确定要退出登录？',
                confirmButtonText: '取消',
                showCancelButton: true,
                cancelButtonText:'退出登录',
            }).then((action)=>{
                if(action=='cancel'){
                    this.logout();//接口触发
                }
            })
        },
        async logout(){
            const res = await logout();
            if(res.code=='000000'){
                this.RECORD_ACCESSTOKEN('');
                this.$router.push('/login')
            }else if(res.code=='000004'){
                this.RECORD_ACCESSTOKEN('');
                this.$router.push('/login')
            }else{
                Toast({
                    message: res.message,
                    position: 'bottom',
                    duration: 3000
                });
            }
        }
    },
    created(){

    },
    mounted(){
        this.getAddress();//获取地址列表
    },
}
</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.account{
    background:#fff;
    min-height: 100vh;
    padding-top: .88rem;
    color:#333;
}
.model{
    width: 100%;
    height: 1.1rem;
    padding: 0 .2rem 0 .2rem;
}
.icon,.nextpage{
    padding-top:.06rem;
    text-align: center;
    float:left;
    width: 7.5%;
    height: 1.1rem;
    line-height: 1.1rem;
}
.text{
    float:left;
    width: 85%;
    height: 1.1rem;
    line-height: 1.1rem;
}
.icon img{
    width: .36rem;
}
.nextpage img{
    width: .36rem;
}
.mobile,.set{
    float: right;
    line-height: 1.1rem;
}
.button{
    width:100%;
    position:fixed;
    height: .88rem;
    padding-left:.4rem;
    padding-right:.4rem;
    bottom:.8rem;
}
.mobile{
    color: #C09C60;
}
.but_text{
    background-color:#DDC899;
    color:#fff;
    font-size:.34rem;
    height: .88rem;
    line-height: .88rem;
    text-align:center;
    border-radius:4px;
}
</style>
