<template>
    <div class="order-detail">
        <!-- 头部标题部分 -->
        <head-top headTitle='订单详情' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push('/storeorderlist')">
        </head-top>
        <!-- 主体内容 -->
        <div class="main-cont">
            <!-- part1:顶部进度提示文字 -->
            <div class="step-tips">
                我们正在马不停蹄的审核您的订单哦，审核结果将在2个工作日内通知到您！请耐心等待～～
            </div>
            <!-- part2:订单信息状态部分 -->
            <div class="order-basic-info">
                <!-- 文字信息部分 -->
                <div class="info-text">
                    <div class="left-img">
                        <img src="" alt="">
                    </div>
                    <div class="center-txt">
                        <p>
                            <span>总&nbsp;&nbsp;克&nbsp;重：</span>
                            <span>100.00克</span>
                        </p>
                        <p>
                            <span>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</span>
                            <span>3</span>
                        </p>
                        <p>
                            <span>锁定金价：</span>
                            <span>273.12元/克</span>
                        </p>
                        <p>
                            <span>保&nbsp;&nbsp;证&nbsp;金：</span>
                            <span>100.00元</span>
                        </p>
                        <p>
                            <span>提交时间：</span>
                            <span>2018-12-12 12:12:12</span>
                        </p>
                    </div>
                    <div class="right-status">{{iconJson[status].name}}</div>
                </div>
                <div class="line"></div>
                <!-- 操作按钮部分 -->
                <div class="info-btn">
                    <div class="">
                        <!-- 待审核时显示 -->
                        <span v-if="status==0" class="border-btn" @click="cancelOrder">取消订单</span>
                        <span class="border-btn" @click="goStoreGold">再来一单</span>
                        <span class="bg-btn"><a href="tel:4008-196-199">联系客服</a></span>
                    </div>
                </div>
            </div>
            <!-- part3:订单关闭部分 -->
            <div class="order-closed" v-if="status==13">
                <div class="left-img"></div>
                <div class="right-text">
                    <h3>您的订单已关闭</h3>
                    <p>好遗憾哦～～</p>
                </div>
            </div>
            <!-- part3:进度图标部分 -->
            <div class="step-icon-wrap" v-else>
                <ul>
                    <li class="step-item" v-for="(item,index) in stepList" :key="index" @click="showTips(1,index,$event,status,isLockOrder)" ref="stepList"
                    :class="{'stepSuccess':(iconJson[status].status==1 || iconJson[status].beforeStatus==1) && iconJson[status].iconType>=index,
                    'stepError':iconJson[status].status==2 && iconJson[status].iconType==index,
                    'stepSpecial':iconJson[status].status==3 && (index==3 || index==4),
                    'stepClosed':iconJson[status].status==4 && index==4}">
                        <span class="step-icon"></span>
                        <span class="step-txt" v-if="index==3 && (status==5 || status==9 || status==13)">&nbsp;&nbsp;退货中&nbsp;</span>
                        <span class="step-txt" v-else-if="index==4 && (status==5 || status==9 || status==13)">订单关闭</span>
                        <span class="step-txt" v-else>{{item.name}}</span>
                        <span class="left-line" :class="{'active-line':status==2 && iconJson[status].iconType==(index -1)}"></span>
                    </li>
                </ul>
            </div>
            <!-- part4:订单其他信息 -->
            <div class="order-other-info">
                <p>
                    <span>订单编号</span>
                    <span>MR2018123455</span>
                </p>
                <p>
                    <span>取件地址</span>
                    <span class="user-address">
                        <b>小可爱   13520841445</b><br/>
                        <b class="address">北京市海淀区海淀北一街中关村SOHO1209室中关村SOHO1209室</b>
                    </span>
                </p>
                <p>
                    <span>银行卡号</span>
                    <span class="bank">中国工商银行（尾号0123）</span>
                </p>
            </div>
            <!-- part5:订单追踪 -->
            <div class="order-tracking">
                <div class="title" @click="showList">
                    <span>订单追踪</span>
                    <span :class="{'rotate':trackingStatus}"></span>
                </div>
                <ul class="tracking-list" :class="{'showList':trackingStatus}">
                    <div class="line"></div>
                    <li class="tracking-item" v-for="(item,index) in newTrackList" v-if="item.status!=3">
                        <div class="left-line">
                            <span class="dot" :class="{'recent-icon':index==0}"></span>
                        </div>
                        <div class="right-text" :class="{'recent':index==0}">
                            <p class="progress">{{item.name}}</p>
                            <p class="time">{{item.time}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 弹窗部分 -->
        <!-- 禁止取消订单弹窗 -->
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="false">
            <div class="not-cancel">
                <h4>提示</h4>
                <p>订单状态有更新，您暂时不能取消订单，请刷新页面以查看最新订单状态。</p>
                <div class="btn">
                    <span @click="closeCancelPopup">取消</span>
                    <span @click="refreshPage"><b></b>刷新</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Toast, } from 'mint-ui';
import { query_detail, query_card_info} from '@/service/getData.js'

    export default {
        data(){
            return{
                orderId:'',              // 订单ID
                status:2,                // 订单当前状态
                popupVisible:false,      // 禁止取消订单弹窗
                trackingStatus:false,    // 订单追踪显示、隐藏
                stepList:[               // 进度icon对应文字
                    {name:'订单审核'},
                    {name:'物流运输'},
                    {name:'检测确认'},
                    {name:'订单完成'},
                ],
                iconJson:{
                    /** icon显示样式
                        status: 0:未开始；1:进行中；2:失败；3:退货中；4:订单关闭
                        beforeStatus: 之前状态是否完成
                        iconType: 属于哪个图标
                    **/
                    '0':{name:'审核中',status:1,iconType:0,beforeStatus:1},
                    '1':{name:'审核失败',status:2,iconType:0,beforeStatus:1},
                    '2':{name:'待取货',status:1,iconType:0,beforeStatus:1},
                    '3':{name:'物流中',status:1,iconType:1,beforeStatus:0},
                    '4':{name:'检测中',status:1,iconType:2,beforeStatus:1},
                    '5':{name:'退货中',status:3,iconType:3,beforeStatus:1},
                    '6':{name:'待确认',status:1,iconType:3,beforeStatus:1},
                    '7':{name:'已完成',status:1,iconType:4,beforeStatus:1},
                    '8':{name:'已取消',status:1,iconType:3,beforeStatus:1},
                    '9':{name:'退货中',status:3,iconType:3,beforeStatus:1},
                    '10':{name:'未支付',status:0,iconType:'',beforeStatus:1},
                    '11':{name:'已失效',status:0,iconType:'',beforeStatus:1},
                    '12':{name:'物流异常',status:0,iconType:'',beforeStatus:1},
                    '13':{name:'已关闭',status:4,iconType:4,beforeStatus:1},
                },
                newTrackList:[
                    {
                        'name':'订单已提交审核',
                        'time':'2018-2-12 12:12:12',
                        'status':1,
                    },
                    {
                        'name':'订单已提交审核',
                        'time':'2018-2-12 12:12:12',
                        'status':1,
                    },
                    {
                        'name':'订单已提交审核',
                        'time':'2018-2-12 12:12:12',
                        'status':1,
                    },
                ]
            }
        },
        filters:{

        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{

        },
        methods: {
            // 订单追踪显示、隐藏
            showList(){
                this.trackingStatus = !this.trackingStatus;
            },
            // 取消订单确认弹窗
            cancelOrder(){
                MessageBox({
                  title: '提示',
                  message:'您是否确认取消订单？',
                  confirmButtonText: '取消订单',
                  cancelButtonText:'我点错了',
                  showCancelButton:true,
                  closeOnClickModal:false,
              }).then(action => {
                    if(action == 'confirm'){
                        console.log('确认取消订单')
                    }
              })
            },
            // 关闭禁止取消订单弹窗
            closeCancelPopup(){
                this.popupVisible = false;
            },
            // 刷新当前页面
            refreshPage(){
                this.popupVisible = false;
                window.location.href = window.location.href;
            },
            // 跳转到存金页
            goStoreGold(){
                this.$router.push('/storegold')
            },
        },
        created(){

        },
        mounted(){

        },
    }

</script>

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
.order-detail{
    .main-cont{
        width: 100%;
        min-height: 100vh;
        padding-top:.88rem;
        background-color: #f8f8f8;
        .step-tips{
            color: #C09C60;
            padding:.25rem .4rem;
            font-size: .26rem;
            background-color: #F3EDE0;
        }
        .order-basic-info{
            padding:.4rem;
            background-color: #fff;
            margin-bottom: .2rem;
            .info-text{
                @include flex-box();
                @include justify-content();
                .left-img{
                    width: 1.2rem;
                    height: 1.2rem;
                    background-color: #eee;
                    margin-right: .3rem;
                    img{
                        width: 100%;
                    }
                }
                .center-txt{
                    color: #666;
                    font-size: .26rem;
                    text-align: left;
                    margin-top:-.07rem;
                    p{
                        margin-bottom: .1rem;
                        span{
                            color: #666;
                            font-family:PingFang-SC-Regular;
                        }
                    }
                }
                .right-status{
                    color: #C09C60;
                    font-size: .32rem;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                }
            }
            .line{
                margin:.25rem 0;
                @include line(#eee);
            }
            .info-btn{
                text-align: right;
                span{
                    text-align: center;
                    line-height: .58rem;
                    font-size: .28rem;
                    @include inline-block(1.8rem,.6rem);
                    @include border-radius(30px);
                }
                .border-btn{
                    color: #C09C60;
                    margin-right:.2rem;
                    border:1px solid rgba(221, 200, 153, 1);
                }
                .bg-btn{
                    a{
                        color: #fff;
                    }
                    background:linear-gradient(-45deg,rgba(221,200,153,1),rgba(192,156,96,1));
                }
            }
        }
        .step-icon-wrap{
            padding:.4rem;
            background-color: #fff;
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
                            @include bg-image('/static/images/order-end.png');
                        }
                    }
                    .step-icon{
                        display: inline-block;
                        width: .6rem;
                        height: .6rem;
                        margin: 0 auto .2rem;
                        @include border-radius(50%);
                        @include bg-image('/static/images/check-ing.png');
                    }
                    .step-txt{
                        color: #666;
                        font-size: .22rem;
                        font-family:PingFangSC-Light;
                    }
                    .left-line{
                        width: .74rem;
                        height: .4rem;
                        position: absolute;
                        left:-.85rem;
                        top:.3rem;
                        @include bg-image('/static/images/step-nomal.png');
                    }
                    .active-line{
                        @include bg-image('/static/images/step-special.png');
                    }
                    .squre{
                        display: inline-block;
                        width: .24rem;
                        height: .24rem;
                        background-color: #F5F5F5;
                        position: absolute;
                        bottom:-.3rem;
                        left:48%;
                        @include rotate(45deg);
                    }
                }
                /**** 成功样式 *****/
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
                    &:nth-of-type(5){
                        .step-icon{
                            @include bg-image('/static/images/order-ended.png');
                        }
                    }
                    .left-line{
                        @include bg-image('/static/images/step-special.png');
                    }
                }
                /***** 失败样式 ******/
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
                            @include bg-image('/static/images/order-return.png');
                        }
                    }
                    .left-line{
                        @include bg-image('/static/images/step-special.png');
                    }
                }
                /*** 特殊样式 ****/
                .stepSpecial{
                    &:nth-of-type(4){  // 退货中icon
                        .step-icon{
                            @include bg-image('/static/images/order-return.png');
                        }
                    }
                    &:nth-of-type(5){ // 订单关闭icon
                        .step-icon{
                            @include bg-image('/static/images/order-close.png');
                        }
                    }
                }
                /*** 关闭成功样式 ***/
                .stepClosed{
                    .step-icon{
                        background: url('/static/images/order-closed.png') no-repeat !important;
                        background-size: 100% !important;
                    }
                }
            }
        }
        .order-closed{
            background-color: #fff;
            margin:.2rem 0;
            padding:.4rem 0;
            align-items: flex-end;
            justify-content: center;
            @include flex-box();
            .left-img{
                width: 1rem;
                height: 1rem;
                margin-right:.25rem;
                @include bg-image('/static/images/shopmsnopass.png');
            }
            .right-text{
                h3{
                    color:#333;
                    font-size: .28rem;
                    font-family:PingFang-SC-Regular;
                }
                p{
                    color: #666;
                    font-size: .24rem;
                    font-family:PingFang-SC-Regular;
                }
            }
        }
        .order-other-info{
            margin:.2rem 0;
            background-color: #fff;
            padding:.39rem .39rem .2rem;
            p{
                margin-bottom: .2rem;
                @include flex-box();
                @include justify-content();
                span{
                    color: #666;
                    font-size: .26rem;
                    font-family:PingFangSC-Light;
                    font-weight:300;
                    b{
                        color: #666;
                        font-size: .26rem;
                        font-family:PingFangSC-Light;
                        font-weight:300;
                    }
                    &:nth-of-type(2){
                        text-align: right;
                    }
                    .address{
                        width: 100%;
                        font-size: .22rem;
                        display: inline-block;
                        @include overflow();

                    }
                }
                .user-address{
                    width: 75%;
                }
                .bank{
                    color: #666;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
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

                    &:nth-of-type(1){
                        .left-line{
                            .dot{
                                left:.1rem !important;
                                top:.25rem !important;
                                width: .24rem !important;
                                height: .24rem !important;
                                background:url('/static/images/dot-yes.png') no-repeat !important;
                                background-size:100% !important;
                            }
                        }
                        .right-text{
                            p{
                                color:#333;
                            }
                        }
                    }

                    .left-line{
                        width: 10%;
                        padding:.2rem 0;
                        position: relative;
                        .dot{
                            display: inline-block;
                            width: .1rem;
                            height: .1rem;
                            position: absolute;
                            left:.16rem;
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
                    min-height:165%;
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
}
.not-cancel{
    width: 4.9rem;
    h4{
        color: #000;
        font-size: .32rem;
        text-align: center;
        margin:.3rem 0 .2rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    p{
        color: #333;
        font-size: .26rem;
        padding:0 .3rem;
    }
    .btn{
        height: .88rem;
        margin-top:.2rem;
        border-top:1px solid #eee;
        @include flex-box();
        span{
            width: 50%;
            line-height: .88rem;
            text-align: center;
            color: #C09C60;
            &:nth-of-type(1){
                border-right:1px solid #eee;
            }
            b{
                background-color: #eee;
                margin-right: .1rem;
                @include inline-block(.28rem,.28rem);
            }
        }
    }
}
</style>
