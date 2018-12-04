<template>
    <div class="paying">
        <!-- 头部标题部分 -->
        <head-top headTitle='支付处理中' class="head-top nomal-font" ref="topHead">
            <!-- <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)"> -->
        </head-top>
        <div class="main-cont">
            <div class="top-img">
                <img src="static/images/pay-inner.png" alt="">
                <img src="static/images/pay-outer.png" alt="">
            </div>
            <p>正在处理您的订单哦，请勿关闭～</p>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Toast} from 'mint-ui';
import { query_status } from '@/service/getData.js'

    export default {
        data(){
            return{
                code:'',
                time:0,   // 请求时间
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
            //间隔查询订单状态
            async query_status(){
                this.time += 1;
                var that = this;
                var res = await query_status(this.code);

                if(res.code == '000000'){
                    if(res.data != 'doing'){ // 如果得到支付结果直接跳转
                        this.$router.push({
                            path:'/payresult',
                            query:{
                                id:this.code,
                                status:res.data
                            }
                        })
                    }else if(this.time > 5){  // 如果5s后还是支付中直接跳转结果页
                        this.$router.push({
                            path:'/payresult',
                            query:{
                                id:this.code,
                                status:'doing'
                            }
                        })
                    }
                }else{
                    Toast(res.message)
                }
            },
        },
        created(){
            this.code = this.$route.query.code
        },
        mounted(){
            var that = this;
            // window.timer = setInterval(function(){
            //     that.query_status();
            // },1000)
        },
        beforeRouteLeave (to, from, next) { // 离开此路由时清除定时器
            if(window.timer){
                clearInterval(window.timer)
            }
            next()
        }
    }

</script>

<style scoped lang="scss">
@import '../../../sass/mixin';
.paying{
    .main-cont{
        min-height: 100vh;
        padding-top:1.8rem;
        @keyframes roundLoop2{
            0%{ transform: rotate(0deg); }
            100%{ transform: rotate(360deg); }
        }
        .top-img{
            width: 1.86rem;
            height: 1.86rem;
            margin:0 auto .8rem;
            position: relative;
            img{
                &:nth-of-type(1){
                    width:100%;
                    position: absolute;
                    top:0;
                    left:0;
                }
                &:nth-of-type(2){
                    animation: roundLoop2 1s linear infinite;
                }
            }
        }
        p{
            color: #666;
            font-size: .28rem;
            text-align: center;
        }
    }
}

</style>
