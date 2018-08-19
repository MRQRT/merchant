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
                    <span class="status">{{iconJson[status].name}}</span>
                </div>
                <div class="create-time">提交时间：2018-03-05 09:38</div>
            </div>
            <div class="distans"></div>
            <!-- 中间进度显示 -->
            <div class="middle-step">
                <div class="step-img">
                    <ul>
                        <li class="step-item" v-for="(item,index) in stepList" :key="index"
                        :class="{'stepSuccess':iconJson[status].status==1 && iconJson[status].iconType>=index,'stepError':iconJson[status].status==2 && iconJson[status].iconType==index}">
                            <span class="step-icon"></span>
                            <span class="step-txt">{{item.name}}</span>
                            <span class="left-line"></span>
                            <span class="squre" v-show="iconJson[status].iconType==index"></span>
                        </li>
                    </ul>
                </div>
                <div class="step-tip">
                    <!-- <p>我们正在马不停蹄的审核您的订单，审核结果将在2个工作日内通知到您！请耐心等待～</p> -->
                    <p>快递小哥正在用心传递速度，物流单号：<span style="color:#C09C60" @click="lookPopup(1)">023083120643</span>
                        孙吉光／138*******1 北京市海淀区海淀北一街中关村S</p>
                </div>
            </div>
            <div class="distans"></div>
            <!-- 地址信息 -->
            <div class="address-info">
                <div class="left-icon"></div>
                <div class="right-text">
                    <p class="name-tel">
                        <span class="name">张艺兴</span>
                        <span class="tel">{{13520842445 | hideMible}}</span>
                    </p>
                    <p class="add">北京市丰台区嘉和人家翠庭园3号楼1501和人家翠庭园楼1501</p>
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
                        <span>总克重</span>
                        <span>200克</span>
                    </p>
                    <p>
                        <span>数量</span>
                        <span>4件</span>
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
            <div class="distans"></div>
            <!-- 交易流水号等 -->
            <div class="deal-other-info">
                <p>
                    <span>交易流水号</span>
                    <span>420000000000000000</span>
                </p>
                <p>
                    <span>交易金额</span>
                    <span>{{2345.2344 | formatPriceTwo}}</span>
                </p>
                <p>
                    <span>成交时间</span>
                    <span>2018-08-18 12:13:23</span>
                </p>
                <p>
                    <span>支付银行卡</span>
                    <span>中国工商银行(尾号3232)</span>
                </p>
            </div>
            <div class="distans"></div>
            <!-- 订单追踪 -->
            <div class="order-tracking">
                <div class="title">
                    <span>订单追踪</span>
                    <span @click="showList" :class="{'rotate':trackingStatus}"></span>
                </div>
                <ul class="tracking-list" :class="{'showList':trackingStatus}">
                    <div class="line"></div>
                    <li class="tracking-item" v-for="(item,index) in orderTracking">
                        <div class="left-line">
                            <span class="dot" :class="{'recent-icon':index==0}"></span>
                        </div>
                        <div class="right-text" :class="{'recent':index==0}">
                            <p class="progress">{{item.status}}</p>
                            <p class="time">{{item.time}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 弹窗部分 -->
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="false">
            <!-- 物流信息 -->
            <div class="" v-if="popupNum==0">
                <div class="delivery-wrap">
                    <div class="top-wrap">
                        <h3>物流信息</h3>
                        <ul class="delivery-list">
                            <div class="line"></div>
                            <li class="delivery-item" :class="{'recent':index==0}"v-for="(item,index) in deliveryList" :key="index">
                                <span class="time">{{item.time | changeTime}}</span>
                                <span class="dot" :class="{'recent-icon':index==0}"></span>
                                <span class="text">{{item.status}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="close-icon" @click="closePopup"></div>
                </div>
            </div>
            <!-- 检测报告 -->
            <div class="" v-if="popupNum==1">
                <div class="report-wrap">
                    <div class="top-wrap">
                        <h3>检测报告</h3>
                        <div class="report-text">
                            <p>
                                <span>订单号：</span>
                                <span>CJ20180305001</span>
                            </p>
                            <p>
                                <span>实测总毛重：</span>
                                <span>32克</span>
                            </p>
                            <p>
                                <span>实测总净重：31克</span>
                                <span>31克</span>
                            </p>
                            <p>
                                <span>克重损耗：</span>
                                <span>1克</span>
                            </p>
                            <p>
                                <span>检测人：</span>
                                <span>小可爱</span>
                            </p>
                            <p>
                                <span>克重损耗：</span>
                                <span>1克</span>
                            </p>
                            <p>
                                <span>检测时间：</span>
                                <span>2018-03-12 13:38:00</span>
                            </p>
                            <p>
                                <span>检测说明：</span>
                                <span>——</span>
                            </p>
                            <p>
                                <span>检测结果：</span>
                                <span>通过</span>
                            </p>
                        </div>
                        <div class="report-img">
                            <img src="static/images/storeGold-banner.png" alt="">
                        </div>
                        <div class="report-btn">
                            <span>确认订单</span>
                            <span><a href="tel:4001689999">联系客服</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Popup } from 'mint-ui';

    export default {
        data(){
            return{
                status:'',    // 状态
                popupVisible:false,   // 信息弹窗显示隐藏
                popupNum:'',          // 哪个弹窗显示
                trackingStatus:false,  // 订单追踪显示、隐藏
                // statusJson:{  // 订单状态
                //     '0':{name:'待支付'},
                //     '1':{name:'审核中'},
                //     '2':{name:'审核通过'},
                //     '3':{name:'物流中'},
                //     '4':{name:'检测中'},
                //     '5':{name:'待确认'},
                //     '6':{name:'已完成'},
                //     '7':{name:'已失效'},
                //     '8':{name:'已取消'},
                // },
                stepList:[
                    {name:'订单审核'},
                    {name:'物流运输'},
                    {name:'存金检测'},
                    {name:'订单确认'},
                ],
                iconJson:{ // icon显示样式(0:未开始；1:进行中；2:失败)
                    '0':{name:'待审核',status:1,iconType:0},
                    '1':{name:'审核未通过',status:2,iconType:0},
                    '2':{name:'审核通过',status:1,iconType:0},
                    '3':{name:'物流中',status:1,iconType:1},
                    '4':{name:'检测中',status:1,iconType:2},
                    '5':{name:'待确认',status:1,iconType:2},
                    '6':{name:'检测不通过',status:2,iconType:2},
                    '7':{name:'用户不同意',status:1,iconType:2},
                    '8':{name:'已完成',status:1,iconType:3},
                    '9':{name:'已取消',status:2,iconType:3},
                    '10':{name:'已退货',status:0,iconType:3},
                    '11':{name:'未支付',status:0,iconType:3},
                    '12':{name:'已失败',status:0,iconType:3},
                    '13':{name:'物流异常',status:0,iconType:3},
                },
                orderTracking:[
                    {
                        time:'2018-08-20 12:23:00',
                        status:'订单已完成'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'锁价保证金已退还'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'已确认检测报告'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'存金检测完毕-检测通过'
                    }
                ],
                deliveryList:[
                    {
                        time:'2018-08-20 12:23:00',
                        status:'已签收！签收人：黄金管家'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'［北京市］海淀区科贸派件员：李冰   18910672345正在为您派件'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'北京市海淀区科贸 已收入'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'浙江省金华市义务中转站公司  已发出，下一站 北京运转中心'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'［北京市］海淀区科贸派件员：李冰   18910672345正在为您派件'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'北京市海淀区科贸 已收入'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'浙江省金华市义务中转站公司  已发出，下一站 北京运转中心'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'［北京市］海淀区科贸派件员：李冰   18910672345正在为您派件'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'北京市海淀区科贸 已收入'
                    },
                    {
                        time:'2018-08-20 12:23:00',
                        status:'浙江省金华市义务中转站公司  已发出，下一站 北京运转中心'
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
            popupVisible(val){
                if(!this.popupVisible){
                    this.fixed(false)
                }
            }
        },
        methods: {
            // 锁价解释弹窗
            lockPricePopup(){
                MessageBox({
                  title: '名词解释',
                  message:'锁定金价：当前订单将以您锁定金 价成交。' ,
                  confirmButtonText: '我知道了'
                })
            },
            // 信息弹窗显示
            lookPopup(num){
                this.popupNum = num;
                this.popupVisible = true;
                this.fixed(true);
            },
            // 关闭物流弹窗
            closePopup(){
                this.popupVisible = false;
                this.fixed(false);
            },
            showList(){
                this.trackingStatus = !this.trackingStatus;
            },
        },
        created(){
            this.status = this.$route.query.status;
        },
        mounted(){

        },
    }

</script>

<style media="screen">
    .mint-popup{
        background:none;
        /* border-radius: .2rem; */
    }
</style>

<style scoped lang="scss">
@import '../../../sass/mixin';
.recent {
    color:#333 !important;
    span{
        color:#C09C60 !important;
    }
}
.recent-icon{
    left:.1rem !important;
    top:.25rem !important;
    width: .24rem !important;
    height: .24rem !important;
    background:url('/static/images/dot-yes.png') no-repeat !important;
    background-size:100% !important;
}
.delivery-item{
    .recent-icon{
        left:.1rem !important;
        top:.25rem !important;
        width: .24rem !important;
        height: .24rem !important;
        background:url('/static/images/delivery-recent.png') no-repeat !important;
        background-size:100% !important;
    }
}
.storeGoldDetail{
    width: 100%;
    padding-bottom: .4rem;
    background-color: #f8f8f8;
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
                            width: .94rem;
                            height: .4rem;
                            position: absolute;
                            left:-1rem;
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
                    .stepSuccess{
                        &:nth-of-type(2){
                            .step-icon{
                                @include bg-image('/static/images/delivery-ing.png');
                            }
                        }
                        &:nth-of-type(3){
                            .step-icon{
                                @include bg-image('/static/images/testing.png');
                            }
                        }
                        &:nth-of-type(4){
                            .step-icon{
                                @include bg-image('/static/images/order-over.png');
                            }
                        }
                        .left-line{
                            @include bg-image('/static/images/step-special.png');
                        }
                    }
                    .stepError{
                        &:nth-of-type(1){
                            .step-icon{
                                @include bg-image('/static/images/check-error.png');
                            }
                        }
                        &:nth-of-type(2){
                            .step-icon{
                                @include bg-image('/static/images/delivery-ing.png');
                            }
                        }
                        &:nth-of-type(3){
                            .step-icon{
                                @include bg-image('/static/images/order-cancel.png');
                            }
                        }
                        &:nth-of-type(4){
                            .step-icon{
                                @include bg-image('/static/images/order-cancel.png');
                            }
                        }
                        .left-line{
                            @include bg-image('/static/images/step-special.png');
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
        .address-info{
            width: 100%;
            padding:.4rem;
            align-items: center;
            background-color: #fff;
            @include flex-box();
            .left-icon{
                width: .44rem;
                height: .44rem;
                margin-right:.3rem;
                background-color: #eee;
                @include bg-image('/static/images/add-icon.png');
            }
            .right-text{
                width:90%;
                color: #333;
                font-size: .32rem;
                .name-tel{
                    margin-bottom: .2rem;
                    .name{
                        margin-right: .2rem;
                    }
                }
                .add{
                    font-size: .26rem;
                    @include overflow();
                }
            }
        }
        .bottom-orderInfo,.deal-other-info{
            padding:.4rem;
            background-color: #fff;
            h3{
                color: #000;
                font-size: .34rem;
                margin-bottom: .3rem;
                font-family:PingFangSC-Regular;
            }
            p{
                width: 100%;
                color: #666;
                font-size: .26rem;
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
        .order-tracking{
            width: 100%;
            padding:0 .4rem;
            background-color: #fff;
            .title{
                width: 100%;
                height: 1.1rem;
                line-height: 1.1rem;
                align-items: center;
                @include flex-box();
                @include justify-content();
                span{
                    color: #333;
                    font-size: .32rem;
                    &:nth-of-type(2){
                        display: inline-block;
                        width: .24rem;
                        height: .24rem;
                        @include bg-image('/static/images/order-pull.png');
                    }
                }
                .rotate{
                    @include transition(.3s);
                    @include rotate(180deg);
                }
            }
            .tracking-list{
                height:0;
                display: none;
                position: relative;
                padding-bottom: .2rem;
                @include transition(.3s);
                .tracking-item{
                    width: 100%;
                    align-items: flex-start;
                    @include flex-box();
                    .left-line{
                        width: 10%;
                        padding:.2rem 0;
                        position: relative;
                        .dot{
                            display: inline-block;
                            width: .1rem;
                            height: .1rem;
                            position: absolute;
                            left:.15rem;
                            top:.34rem;
                            background:url('/static/images/dot-no.png') no-repeat;
                            background-size:100%;
                        }

                    }
                    .right-text{
                        width: 90%;
                        color: #999;
                        font-size: .24rem;
                        padding:.2rem 0 .1rem;
                        .progress{
                            font-size: .24rem;
                        }
                        .time{
                            font-size: .2rem;
                        }
                    }
                }
                .line{
                    width: 1px;
                    height:140%;
                    background-color:#E1E1E1;
                    position: absolute;
                    left:.2rem;
                    top:.45rem;
                }
            }
            .showList{
                height: auto;
                display: block;
                @include transition(.3s);
            }
        }
    }
    // 物流弹窗
    .delivery-wrap,.report-wrap{
        .top-wrap{
            width: 6.7rem;
            max-height: 9.2rem;
            padding:.3rem;
            background-color: #fff;
            overflow: scroll;
            @include border-radius(.2rem);
            h3{
                width: 100%;
                text-align: center;
                color: #333;
                font-size: .32rem;
                margin-bottom: .3rem;
                font-family:PingFangSC-Medium;
            }
            .delivery-list{
                height: 100%;
                position: relative;
                .line{
                    width:1px;
                    height: 160%;
                    position: absolute;
                    left:1.1rem;
                    top:.44rem;
                    background-color: #999999;
                }
                .delivery-item{
                    width:100%;
                    margin-bottom: .3rem;
                    align-items: center;
                    justify-content: flex-start;
                    @include flex-box();
                    span{
                        display: inline-block;
                        color: #999;
                        font-size: .24rem;
                    }
                    .time{
                        font-size: .2rem;
                        width: 1rem;
                    }
                    .dot{
                        width: .24rem;
                        height: .24rem;
                        margin:-.05rem .2rem 0 .1rem;
                        @include bg-image('/static/images/delivery-nomal.png');
                    }
                    .text{
                        width:85%;
                    }
                }
            }

        }
        .close-icon{
            width: .44rem;
            height: .44rem;
            margin:.8rem auto;
            background-color: none;
            @include bg-image('/static/images/delivery-close.png');
        }
    }
    .report-wrap{
        position: relative;
        @include border-radius(.2rem);
        .top-wrap{
            padding:.3rem 0 0;
        }
        .report-text{
            padding:0 .3rem;
            p{
                line-height: .45rem;
                span{
                    color: #666;
                    font-size: .26rem;
                }
            }
        }
        .report-img{
            width: 100%;
            height:3.8rem;
            margin:.3rem 0 1.2rem;
            padding:0 .3rem;
            img{
                width:100%;
            }
        }
        .report-btn{
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            position: absolute;
            bottom:0;
            left:0;
            right:0;
            background-color: #fff;
            border-bottom-left-radius: .2rem;
            border-bottom-right-radius: .2rem;
            border-top:1px solid rgba(238,238,238,1);
            @include flex-box();
            span,a{
                flex-grow: 1;
                text-align: center;
                color: #C09C60;
                font-size: .32rem;
                font-family:PingFangSC-Regular;
            }
            span{
                &:nth-of-type(1){
                    border-right:1px solid rgba(238,238,238,1);
                }
            }

        }
    }
}
</style>
