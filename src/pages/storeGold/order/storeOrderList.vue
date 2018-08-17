<template>
    <div class="storeGoldList">
        <!-- 头部标题部分 -->
        <head-top headTitle='我的订单' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont" ref="wrapper" v-if="orderStatus" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                bottomPullText="上滑加载更多" bottomDropText="松开加载" ref="loadmore" class="loadmore">
                <ul class="order-list">
                    <li class="order-item" v-for="(item,index) in orderList" :key="index" @click="$router.push({path:'/storeOrderDetail',query:{id:index,status:index}})">
                        <!-- 左侧图片 -->
                        <div class="left-img">
                            <img src="static/images/order-touzijin.png" alt="" v-if="item.goldType=='投资金'">
                            <img src="static/images/order-shoushi.png" alt="" v-else>
                        </div>
                        <!-- 右侧文字 -->
                        <div class="right-text">
                            <!-- 变现or存入克重 -->
                            <div class="trade-type">
                                <div class="left">
                                    <span>{{typeJson[item.tradeType]}}</span>
                                    <span class="lock-price" v-if="item.lockStatus==1 && item.tradeType==0"></span>
                                </div>
                                <div class="right">
                                    <span class="status" :class="{'overStatus':index==7 || index==8}">{{statusJson[index].name}}</span>
                                </div>
                            </div>
                            <!-- 订单信息 -->
                            <div class="bottom-info">
                                <div class="orderNo">
                                    <b>订单编号：</b>{{item.orderNo}}
                                </div>
                                <div class="ensure-cash" v-if="item.lockStatus==1 && item.tradeType==0">保证金：{{500 | formatPriceTwo}}元</div>
                                <div class="weight-time">
                                    <span>总克重：{{item.weight}}克</span>
                                    <span>{{item.time}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
        <!-- 没有订单显示 -->
        <div class="no-order" v-else>
            <div class="top-img">
                <img src="static/images/no-order.png" alt="">
            </div>
            <p>您还没有订单！</p>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{
                orderStatus:true,   // 是否有订单
                allLoaded:false,     // 是否全部加载完毕
                wrapperHeight:0,     // 加载内容动态高度
                searchCondition: {   // 分页属性
                    pageNo: 1,
                    pageSize: 10
            	},
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
                typeJson:{ // 存金类型
                    '0':'直接变现',
                    '1':'存入克重',
                },
                orderList:[
                    {
                        goldType:'投资金',
                        status:0,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'首饰',
                        status:1,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:1,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:2,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:3,
                        orderNo:'TR180309141234033476',
                        tradeType:1,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:4,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:1,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:5,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:6,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:7,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                    {
                        goldType:'投资金',
                        status:8,
                        orderNo:'TR180309141234033476',
                        tradeType:0,
                        lockStatus:0,
                        weight:23.456,
                        time:'2018-03-05 09:38',
                    },
                ]
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
            loadBottom(){  //上拉加载
                var that = this;
                setTimeout(function(){
                    console.log('加载更多')
                    that.$refs.loadmore.onBottomLoaded();
                },800)
            },
        },
        created(){

        },
        mounted(){
            // 计算滚动内容的高度
    		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
    }

</script>

<style media="screen">
    .mint-loadmore-bottom{
        color: #999;
        font-size: .24rem;
        background-color: #f8f8f8;
    }
</style>

<style scoped lang="scss">
@import '../../../sass/mixin';
.storeGoldList{
    width:100%;
    min-height: 100vh;
    background-color: #f8f8f8;
    .main-cont{
        overflow: scroll;
        padding-top:.88rem;
        .order-list{
            .order-item{
                width:100%;
                padding:.3rem .4rem;
                color: #666;
                font-size: .28rem;
                margin-top:.2rem;
                font-family:PingFangSC-Regular;
                background-color: #fff;
                @include flex-box();
                .left-img{
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-right:.25rem;
                    background-color: #eee;
                    img{
                        width: 100%;
                    }
                }
                .right-text{
                    flex-grow: 2;
                    flex-direction: column;
                    @include flex-box();
                    @include justify-content();
                }
                .trade-type{
                    margin-top:-.05rem;
                    .left{
                        align-items: center;
                        @include flex-box();
                        span{
                            color: #333;
                            font-size: .28rem;
                        }
                        .lock-price{
                            display: inline-block;
                            width: .54rem;
                            height: .31rem;
                            margin-left:.1rem;
                            background-size: 100% 100% !important;
                            @include bg-image('/static/images/lock-price-icon.png');
                        }
                    }

                }
                .bottom-info{
                    justify-content: flex-end;
                    flex-direction: column;
                    @include flex-box();
                }
                .trade-type, .weight-time{
                    align-items: center;
                    @include flex-box();
                    @include justify-content();
                    .status{
                        color: #C09C60;
                    }
                    .overStatus{
                        color: #999999;
                    }
                }
                .orderNo,.ensure-cash, .weight-time{
                    color: #666;
                    font-size:.24rem;
                }
            }
        }
    }
    .no-order{
        width:100%;
        height: 100vh;
        padding-top:1.5rem;
        background-color: #fff;
        .top-img{
            width: 2.8rem;
            height: 2.6rem;
            margin:0 auto .4rem;
            img{
                width:100%;
            }
        }
        p{
            width:100%;
            color: #666;
            font-size: .28rem;
            text-align: center;
            padding-left:.4rem;
        }
    }
}
</style>
