<template>
    <div class="storeResult">
        <!-- 头部标题部分 -->
        <head-top headTitle='存金结果' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push('/index')">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 顶部图标部分 -->
            <div class="top-info">
                <div class="top-img">
                    <img src="static/images/store-success.png" alt="" v-if="orderStatus=='success'">
                    <img src="static/images/shopmsnopass.png" alt="" v-else-if="orderStatus=='failure'">
                    <img src="static/images/paying-doing.png" alt="" v-else>
                </div>
                <p v-if="orderStatus=='success'">支付成功</p>
                <p v-else-if="orderStatus=='failure'">支付失败</p>
                <p v-else>支付处理中</p>
                <!-- 支付处理中说明 -->
                <div class="pay-doing" v-if="orderStatus=='doing'">
                    <div class="">最终支付结果以银行实际处理结果为准，</div>
                    <div class="">您可在订单详情中查看处理状态</div>
                </div>
            </div>
            <!-- 处理进度 -->
            <div class="pay-result">
                <h4>处理进度</h4>
                <div class="step-txt">
                    <p v-for="(item,index) in timeList" :class="{'pay-ing':nodeJson[item.typeCode].iconType==1}">
                        <span class="icon"></span>
                        <span class="txt">
                            <b>{{nodeJson[item.typeCode].name}}</b>
                            <b class="time">{{item.createdTime | clearYear}}</b>
                        </span>
                        <span class="left-line" v-if="index<2" :class="{'grey':orderStatus=='doing' && index==1}"></span>
                    </p>
                    <p v-if="orderStatus=='doing'" class="wait-pay">
                        <span class="icon"></span>
                        <span class="txt">等待结果~</span>
                    </p>
                </div>
            </div>
            <!-- 查看订单详情按钮 -->
            <div class="detail-btn" @click="goOrderDetail">查看订单</div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Toast, } from 'mint-ui';
import { query_status, paying_time } from '@/service/getData.js'

    export default {
        data(){
            return{
                code:'',           // 订单code
                orderStatus:'',    // 订单是否成功
                timeList:[],       // 节点信息
                nodeJson:{
                    'add':{name:'订单已创建',iconType:0},
                    'recharge_margin':{name:'银行处理中',iconType:1},
                    'recharge_margin_success':{name:'支付成功',iconType:0},
                    'recharge_margin_failure':{name:'支付失败',iconType:0},
                },
                paysFailReason:'', // 失败原因

            }
        },
        filters:{
            clearYear(val){
                var arr=val.split(' ');

                var timeArr1=arr[0].split('-');
                timeArr1.shift();
                timeArr1=timeArr1.join('-');

                var timeArr2=arr[1];
                return timeArr1 + ' ' + timeArr2;
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
            goOrderDetail(){
                var status;
                switch (this.orderStatus) {
                    case 'doing':
                        status = 2;
                        break;
                    case 'success':
                        status = 3;
                        break;
                    case 'failure':
                        status = 1;
                        break;
                }
                this.$router.push({
                    path:'/orderdetail',
                    query:{
                        code:this.code,
                        status:status,
                    }
                })
            },
            // 再次请求支付结果，记录状态
            async query_status(){
                var res = await query_status(this.code);
                if(res.code=='000000'){
                    this.orderStatus = res.data.stateCode;
                }else{
                    Toast(res.message)
                }
            },
            // 请求时间节点
            async paying_time(){
                var res = await paying_time(this.code);
                if(res.code=='000000'){
                    this.timeList = res.data;
                }else{
                    Toast(res.message)
                }
            },
        },
        created(){
            this.code = this.$route.query.code;
            this.orderStatus = this.$route.query.status; // 支付成功 or 失败 or 处理中

            if(this.$route.query.paysFailReason){
                this.paysFailReason = this.$route.query.paysFailReason;
            }
        },
        mounted(){
            this.query_status();
            this.paying_time();
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.storeResult{
    width: 100%;
    background-color: #f8f8f8;
    .main-cont{
        height: 100vh;
        padding-top:1.68rem;
        background-color: #fff;
        .top-info{
            text-align: center;
            .top-img{
                width: .99rem;
                height: 1rem;
                margin:0 auto;
                img{
                    width: 100%;
                }
            }
            p{
                color: #000;
                font-size: .34rem;
                margin-top:.42rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
            }
            .pay-doing{
                text-align: center;
                color: #999;
                font-size: .24rem;
                margin:.25rem auto 0;
            }
        }
        .pay-result{
            width: 100%;
            padding:.6rem .4rem 0;
            h4{
                color: #666;
                font-size: .26rem;
                padding:.5rem 0 .3rem;
                border-top:1px solid #F8f8f8;
            }
            .step-txt{
                padding-left:.2rem;
                position: relative;
                p{
                    color: #C09C60;
                    font-size: .26rem;
                    margin-bottom: .3rem;
                    position: relative;
                    align-items: flex-start;
                    @include flex-box();
                    span{
                        flex-direction: column;
                        @include flex-box();
                        .time{
                            color: #999;
                            font-size: .2rem;
                        }
                    }
                    .icon{
                        margin-right:.2rem;
                        margin-top:.05rem;
                        @include inline-block(.32rem,.32rem);
                        @include bg-image('/static/images/payresult-over.png');
                    }
                    .left-line{
                        width: 1px;
                        height: .6rem;
                        background: #C09C60;
                        position: absolute;
                        left:.15rem;
                        top:.38rem;
                    }
                    .grey{
                        background:#999;
                    }
                }
                .pay-ing{
                    .icon{
                        @include bg-image('/static/images/payresult-end.png');
                    }
                }
                .wait-pay{
                    color: #999;
                    .icon{
                        @include bg-image('/static/images/payresult-ing.png');
                    }
                }
            }
        }
        .detail-btn{
            width: 6.7rem;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            color: #fff;
            font-size: .34rem;
            position: absolute;
            bottom:.5rem;
            left:50%;
            margin-left:-3.35rem;
            background:linear-gradient(90deg,rgba(192,156,96,1),rgba(221,200,153,1));
            @include border-radius(44px);
        }
    }

}
</style>
