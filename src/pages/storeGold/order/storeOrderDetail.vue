<template>
    <div class="storeGoldDetail">
        <!-- 头部标题部分 -->
        <head-top headTitle='订单详情' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体内容 -->
        <div class="main-cont">
            <!-- 顶部状态 -->
            <div class="top-info">
                <div class="orderNo">
                    <span>订单编号：{{'CJ20180305001'}}</span>
                    <span class="status">{{statusJson[status].name}}</span>
                </div>
                <div class="create-time">提交时间：2018-03-05 09:38</div>
            </div>
            <div class="distans"></div>
            <!-- 中间进度显示 -->
            <div class="middle-step">
                <div class="step-img">
                    <ul>
                        <li class="step-item">
                            <span class="step-icon"></span>
                            <span class="step-txt">订单审核</span>
                            <span class="left-line"></span>
                            <span class="squre"></span>
                        </li>
                        <li class="step-item">
                            <span class="step-icon"></span>
                            <span class="step-txt">物流运输</span>
                            <span class="left-line"></span>
                        </li>
                        <li class="step-item">
                            <span class="step-icon"></span>
                            <span class="step-txt">存金检测</span>
                            <span class="left-line"></span>
                        </li>
                        <li class="step-item">
                            <span class="step-icon"></span>
                            <span class="step-txt">订单确认</span>
                            <span class="left-line"></span>
                        </li>
                    </ul>
                </div>
                <div class="step-tip">
                    我们正在马不停蹄的审核您的订单，审核结果将在2个工作日内通知到您！请耐心等待～
                </div>
            </div>
            <div class="distans"></div>
            <!-- 底部订单信息 -->
            <div class="bottom-orderInfo">
                <h3>存金信息</h3>
                <div class="order-info">
                    <p>
                        <span>存金类型</span>
                        <span>投资金</span>
                    </p>
                    <p>
                        <span>存金克重</span>
                        <span>200克</span>
                    </p>
                    <p>
                        <span>存金方式</span>
                        <span>直接变现</span>
                    </p>
                    <p>
                        <span>锁价保证金</span>
                        <span>1500.00元</span>
                    </p>
                    <p>
                        <span>锁定金价<b @click="lockPricePopup"></b></span>
                        <span class="special-color">276.15元/克</span>
                    </p>
                </div>
            </div>
            <!-- 拨打电话 -->
            <div class="tel">
                <a href="tel:4001669999">联系客服</a>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox } from 'mint-ui';

    export default {
        data(){
            return{
                status:'',    // 状态
                statusJson:{  // 订单状态
                    '0':{name:'待支付'},
                    '1':{name:'物流中'},
                    '2':{name:'审核中'},
                    '3':{name:'审核通过'},
                    '4':{name:'检测中'},
                    '5':{name:'待确认'},
                    '6':{name:'已完成'},
                    '7':{name:'已失效'},
                    '8':{name:'已取消'},
                },
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
            lockPricePopup(){
                MessageBox({
                  title: '名词解释',
                  message:'锁定金价：当前订单将以您锁定金 价成交。' ,
                  confirmButtonText: '我知道了'
                })
            }
        },
        created(){
            this.status = this.$route.query.status;
        },
        mounted(){

        },
    }

</script>

<style scoped lang="scss">
@import '../../../sass/mixin';
.storeGoldDetail{
    width: 100%;
    .main-cont{
        min-height: 100vh;
        padding-top:.88rem;
        position: relative;
        .distans{
            width:100%;
            height:.2rem;
            background-color: #f8f8f8;
        }
        .top-info{
            padding:.4rem;
            color: #666;
            font-size: .28rem;
            background-color: #fff;
            .orderNo{
                color: #000;
                margin-bottom: .15rem;
                @include flex-box();
                @include justify-content();
                .status{
                    color: #C09C60;
                }
            }
        }
        .middle-step{
            padding:.4rem;
            background-color: #fff;
            .step-img{
                ul{
                    width:100%;
                    @include flex-box();
                    @include justify-content();
                    .step-item{
                        text-align: center;
                        flex-direction: column;
                        position: relative;
                        @include flex-box();
                        @include justify-content();

                        &:nth-of-type(1){
                            .left-line{
                                display: none;
                            }
                        }
                        &:nth-of-type(2){
                            .step-icon{
                                @include bg-image('/static/images/delivery-wait.png');
                            }
                        }
                        &:nth-of-type(3){
                            .step-icon{
                                @include bg-image('/static/images/no-test.png');

                            }
                        }
                        &:nth-of-type(4){
                            .step-icon{
                                @include bg-image('/static/images/order-error.png');

                            }
                        }
                        .step-icon{
                            display: inline-block;
                            width: .8rem;
                            height: .8rem;
                            margin: 0 auto .15rem;
                            @include border-radius(50%);
                            @include bg-image('/static/images/check-ing.png');
                        }
                        .step-txt{
                            color: #333;
                            font-size: .22rem;
                        }
                        .left-line{
                            width: 1rem;
                            height: .4rem;
                            position: absolute;
                            left:-120%;
                            top:.4rem;
                            @include bg-image('/static/images/step-nomal.png');
                        }
                        .squre{
                            display: inline-block;
                            width: .24rem;
                            height: .24rem;
                            background-color: #F5F5F5;
                            position: absolute;
                            bottom:-.3rem;
                            left:50%;
                            @include rotate(45deg);
                        }
                    }
                }
            }
            .step-tip{
                width:100%;
                color: #666;
                font-size: .24rem;
                line-height: .4rem;
                padding:.1rem .2rem;
                margin-top:.2rem;
                background-color: #F5F5F5;
                @include border-radius(4px);
            }
        }
        .bottom-orderInfo{
            padding:.4rem;
            background-color: #fff;
            h3{
                color: #000;
                font-size: .34rem;
                margin-bottom: .3rem;
                font-family:PingFangSC-Regular;
            }
            .order-info{
                p{
                    width: 100%;
                    color: #666;
                    font-size: .28rem;
                    line-height: .5rem;
                    font-family:PingFangSC-Regular;
                    @include flex-box();
                    @include justify-content();
                    span{
                        b{
                            display: inline-block;
                            width: .24rem;
                            height: .24rem;
                            margin-left:.1rem;
                            vertical-align: -.02rem;
                            @include bg-image('/static/images/order-question.png');
                        }
                    }
                    .special-color{
                        color: #C09C60;
                    }
                }
            }
        }
        .tel{
            padding:.4rem;
            text-align: right;
            position: absolute;
            right:.4rem;
            bottom:.4rem;
            a{
                display: inline-block;
                width: 2.2rem;
                height: .7rem;
                color: #fff;
                font-size: .28rem;
                font-family:PingFangSC-Regular;
                text-align: center;
                line-height: .7rem;
                background-color: #000;
                @include border-radius(4px);
            }
        }
    }
}
</style>
