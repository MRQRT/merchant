<template>
    <div class="storeGoldList">
        <!-- 头部标题部分 -->
        <head-top headTitle='我的订单' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                bottomPullText="上滑加载更多" bottomDropText="松开加载" ref="loadmore" class="loadmore">
                <ul class="order-list">
                    <li class="order-item" v-for="(item,index) in orderList" :key="index" @click="$router.push({path:'/storeOrderDetail',query:{id:index,status:index}})">
                        <div class="type-status">
                            <span class="gold-type">{{item.goldType}}</span>
                            <span class="status" v-if="index==0" style="color:#FF6D39;font-size:.24rem">请在13分20秒内完成支付</span>
                            <span class="status" v-else :class="{'overStatus':index==7 || index==8}">{{statusJson[index].name}}</span>
                        </div>
                        <div class="orderNo">
                            <b>订单编号：</b>{{item.orderNo}}
                        </div>
                        <div class="trade-type">
                            <span>{{typeJson[item.tradeType]}}</span>
                            <span class="lock-price" v-if="item.lockStatus==1 && item.tradeType==0">锁价</span>
                        </div>
                        <div class="weight-time">
                            <span>克重：{{item.weight}}克</span>
                            <span>{{item.time}}</span>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{
                allLoaded:false,   // 是否全部加载完毕
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
    padding-top:.88rem;
    background-color: #f8f8f8;
    .main-cont{
        overflow: scroll;
        .order-list{
            .order-item{
                width:100%;
                padding:.3rem .4rem;
                color: #666;
                font-size: .28rem;
                font-family:PingFangSC-Regular;
                background-color: #fff;
                div{
                    margin-bottom: .12rem;
                }
                .type-status, .trade-type,.weight-time{
                    @include flex-box();
                    @include justify-content();
                    .gold-type{
                        color: #333;
                        font-size: .32rem;
                    }
                    .status{
                        color: #C09C60;
                    }
                    .overStatus{
                        color: #999999;
                    }
                    .lock-price{
                        color: #333;
                    }
                }
                .orderNo{
                    color: #000;
                }
            }
        }
    }
}
</style>
