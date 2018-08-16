<template>
    <div class="bindingBank">
        <!-- 头部标题部分 -->
        <head-top headTitle='添加银行卡' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <div class="form-wrap">
                <section>
    				<input type="text" name="name" placeholder="请输入真实姓名" v-model="name">
    			</section>
                <section>
    				<input type="number" name="userID" placeholder="请输入身份证号" v-model="userID">
    			</section>
                <section>
    				<input type="text" name="bankNum" placeholder="请输入有效银行卡号" pattern="[0-9]*" v-model="bankNum" maxlength="19">
    			</section>
                <section>
    				<input type="text" name="telNum" placeholder="请输入银行预留手机号" v-model="telNum" pattern="[0-9]*" maxlength="11">
    			</section>
                <section>
    				<input type="text" name="verifiCode" placeholder="请输入短信验证码" v-model="verifiCode" pattern="[0-9]*">
    			</section>
            </div>
            <div class="store-btn">保存</div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{
                name:'',         // 姓名
                userID:'',       // 身份证号
                bankNum:'',      // 银行卡号
                telNum:'',       // 预留手机号
                verifiCode:'',   // 短信验证码
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

        },
        created(){

        },
        mounted(){

        },
    }

</script>

<style scoped lang="scss">
@import '../../../sass/mixin';
.bindingBank{
    width:100%;
    min-height: 100vh;
    padding-top:.88rem;
    background-color: #f8f8f8;
    .main-cont{
        .form-wrap{
            padding:0 .4rem;
            background-color: #fff;
            section{
                input{
                    width:100%;
                    padding:.35rem 0;
                    color:#BCBCBC;
                    font-size: .28rem;
                    font-family:PingFangSC-Regular;
                    border-bottom: 1px solid #eee;
                }
                &:nth-of-type(5) input{
                    border-bottom: none;
                }
            }
        }
        .store-btn{
            width:92%;
            height: .88rem;
            color: #fff;
            font-size: .34rem;
            text-align: center;
            line-height: .88rem;
            margin:1rem auto 0;
            background-color: #E9DEC7;
            @include border-radius(4px);
        }
    }
}
</style>
