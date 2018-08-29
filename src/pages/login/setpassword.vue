<template>
    <div class="account">
        <!-- 头部标题部分 -->
        <head-top headTitle='设置登录密码' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- password -->
        <section class="password">
             <input type="password" minlength="6" maxlength="20" placeholder="6~20位字母、数字或组合" ref="password1" class="passwords" v-model="password1" @onblur="ckeckpassword">
        </section>
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
        confirm(){
            if(this.check_password1){
                Toast('请输入正确的密码')
                return
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
    padding: 0 .4rem 0 .4rem;
    padding-top:.32rem;
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
</style>
