<template>
    <div class="order-detail">
        <!-- 头部标题部分 -->
        <head-top headTitle='订单详情' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push('/storeorderlist')">
        </head-top>
        <!-- 主体内容 -->
        <!-- 待支付订单 -->
        <div class="main-cont" v-if="status==10" v-show="showStatus">
            <!-- 顶部倒计时 -->
            <div class="countDown">
                <p class="clock-icon"></p>
                <p class="clock-text">
                    <span>待支付</span>
                    <span>请在{{minu}}分{{secd}}秒内完成支付</span>
                </p>
            </div>
            <!-- 地址 -->
            <div class="address-info">
                <div class="left-icon"></div>
                <div class="right-text">
                    <p class="name-tel">
                        <span class="name">{{orderInfo.contact}}</span>
                        <span class="tel">{{orderInfo.telephone | hideMible}}</span>
                    </p>
                    <p class="add" v-if="orderInfo.address">{{orderInfo.address | clearStr}}</p>
                </div>
            </div>
            <div class="distans"></div>
            <!-- 存金信息 -->
            <div class="bottom-orderInfo">
                <h3>存金信息</h3>
                <div class="order-info">
                    <p>
                        <span>订单编号</span>
                        <span>{{orderInfo.code}}</span>
                    </p>
                    <p>
                        <span>总重量</span>
                        <span>{{orderInfo.applyWeight | formatPriceTwo}}克</span>
                    </p>
                    <p>
                        <span>数量</span>
                        <span>{{orderInfo.applyQuantity}}件</span>
                    </p>
                    <div class="" v-if="orderInfo.lockprice">
                        <p>
                            <span>锁价保证金</span>
                            <span>{{orderInfo.ensureCash | formatPriceTwo}}元</span>
                        </p>
                    </div>
                    <div class="" v-if="orderInfo.lockprice">
                        <p>
                            <span>锁定金价<b @click="lockPricePopup"></b></span>
                            <span class="special-color">{{orderInfo.lockPrices}}元/克</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="distans"></div>
            <!-- 银行卡 -->
            <div class="bank">
                <span>银行卡</span>
                <span>{{bankInfo.name}}(尾号{{bankInfo.code}})</span>
            </div>
            <!-- 底部按钮 -->
            <div class="pay-btn">
                <div class="left-price">
                    <span>锁价保证金：</span>
                    <span>{{orderInfo.ensureCash | formatPriceTwo}}元</span>
                </div>
                <div class="right-btn" @click="pay_beforehand_order(1)">支付</div>
            </div>
        </div>
        <!-- 其他订单状态 -->
        <div class="main-cont" v-else>
            <!-- part1:顶部进度提示文字 -->
            <div class="step-tips">
                我们正在马不停蹄的审核您的订单哦，审核结果将在2个工作日内通知到您！请耐心等待～～
            </div>
            <!-- part2:订单信息状态部分 -->
            <div class="order-basic-info">
                <!-- 文字信息部分 -->
                <div class="info-text">
                    <div class="left-img">
                        <img src="static/images/order-info-basic.png" alt="">
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
                    <!-- 已完成图标 -->
                    <div class="order-end-icon" v-if="status==7"></div>
                    <div class="right-status" v-else>{{iconJson[status].name}}</div>
                </div>
                <div class="line"></div>
                <!-- 操作按钮部分 -->
                <div class="info-btn">
                    <div class="">
                        <!-- 待审核时显示 -->
                        <span v-if="status==0" class="border-btn" @click="cancelOrder">取消订单</span>
                        <span class="border-btn" @click="goStoreGold">再来一单</span>
                        <span class="border-btn" v-if="status==6">确认订单</span>
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
                    <span class="info-bank">中国工商银行（尾号0123）</span>
                </p>
            </div>
            <!-- part4:物流包裹信息 -->
            <div class="delivery-info-wrap">
                <h4>物流信息</h4>
                <ul class="outer-delivery-list">
                    <li class="outer-delivery-item" v-for="(item,index) in stepList" :key="index">
                        <div class="item-title" @click="showDelivery(index)">
                            <span>包裹1——物流中</span>
                            <span class="show-more" :class="{'rotate':index==deliveryNum}"></span>
                        </div>
                        <!-- 隐藏掉的具体物流信息 -->
                        <div class="hideDelivery" :class="{'showDelivery':index==deliveryNum}">
                            <p style="margin-bottom:.3rem;font-size:.26rem">异常原因：吧啦吧啦吧啦～～</p>
                            <div class="item-detail">
                                <p>快递公司：顺丰快递</p>
                                <p>快递单号：123456789</p>
                            </div>
                            <div class="delivery-point">
                                <mt-spinner type="triple-bounce" v-if="!deliveryStatus" color="#C09C60"></mt-spinner>
                                <ul class="inner-delivery-list" v-else-if="deliveryStatus && !deliveryError">
                                    <div class="line"></div>
                                    <li class="inner-delivery-item" :class="{'recent':index==0}"v-for="(item,index) in deliveryList" :key="index">
                                        <span class="time">{{item.time | changeTime}}</span>
                                        <span class="dot" :class="{'recent-icon':index==0}"></span>
                                        <span class="text">{{item.status}}</span>
                                    </li>
                                </ul>
                                <!-- 查询不到物流信息时显示 -->
                                <p v-else class="deliveryError">物流信息出错啦，您可联系客服进行沟通<br/>客服电话：4008-196-199</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- part4:检测中样式 -->
            <div class="detection-ing" v-if="status==4">
                <div class="left-img"></div>
                <div class="right-text">
                    <h3>正在检测中</h3>
                    <p>请静候佳音～</p>
                </div>
            </div>
            <!-- part4:待确认样式 -->
            <div class="wait-confirm">
                <!-- 订单信息 -->
                <div class="order-info">
                    <h4>订单信息</h4>
                    <p>
                        <span>订单编号</span>
                        <span>MR12345555666</span>
                    </p>
                    <p>
                        <span>实收总额</span>
                        <span style="color:#C09C60">10000.00元</span>
                    </p>
                    <div class="detail-info" :class="{'showOrderList':orderDetailStatus}">
                        <p>
                            <span>卖金总额</span>
                            <span>10000.00元</span>
                        </p>
                        <p>
                            <span>物流费</span>
                            <span>0.00元</span>
                        </p>
                        <p>
                            <span>保险费</span>
                            <span>0.00元</span>
                        </p>
                        <p>
                            <span>检测费</span>
                            <span>0.00元</span>
                        </p>
                        <p>
                            <span>手续费</span>
                            <span>0.00元</span>
                        </p>
                        <p>
                            <span>优惠金额</span>
                            <span>0.00元</span>
                        </p>
                    </div>
                    <div class="show-more-btn" @click="showList(1)">
                        <span v-if="!this.orderDetailStatus">查看详情</span>
                        <span v-else>收起</span>
                        <span class="show-more" :class="{'rotate':orderDetailStatus}"></span>
                    </div>
                </div>
                <!-- 检测信息 -->
                <div class="report-info" v-if="status==6">
                    <h4>检测信息</h4>
                    <p>
                        <span>实测总毛重</span>
                        <span>10.00克</span>
                    </p>
                    <p>
                        <span>成色</span>
                        <span>999.9‰</span>
                    </p>
                    <p>
                        <span>实测总净重</span>
                        <span>10.00克</span>
                    </p>
                    <!-- 检测报告详情 -->
                    <div class="detail-info" :class="{'showOrderList':reportListStatus}">
                        <p>
                            <span>实收金价</span>
                            <span>10000.00元/克</span>
                        </p>
                        <p>
                            <span>检测结果</span>
                            <span style="color:#C09C60">合格</span>
                        </p>
                        <p>
                            <span>检测员</span>
                            <span>小可爱</span>
                        </p>
                        <p>
                            <span>检测时间</span>
                            <span>2018-11-26 12:12:12</span>
                        </p>
                        <!-- 检测明细 -->
                        <div class="report-detail">
                            <h4 @click="showList(3)">
                                <span class="txt">查看检测明细</span>
                                <span class="show-more" :class="{'rotate':reportDetialStatus}"></span>
                            </h4>
                            <!-- 具体检测明细列表 -->
                            <ul class="report-more-detail" :class="{'showReportDetail':reportDetialStatus}">
                                <li class="more-detail-item" v-for="(item,index) in stepList">
                                    <p class="title" @click="showEachReport(index)">
                                        <span>产品1——卖金总额：330.36元</span>
                                        <span class="show-more" :class="{'rotate':index==eachReportNum}"></span>
                                    </p>
                                    <div class="list" :class="{'showEachReport':index==eachReportNum}">
                                        <p>
                                            <span>检测编号</span>
                                            <span>MR12345678901234</span>
                                        </p>
                                        <p>
                                            <span>产品名称</span>
                                            <span>金条</span>
                                        </p>
                                        <p>
                                            <span>质量</span>
                                            <span>12克</span>
                                        </p>
                                        <p>
                                            <span>黄金含量</span>
                                            <span>999.9‰</span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <!-- 检测报告图片 -->
                            <ul class="report-img-list">
                                <li class="img-item" v-for="(item,index) in 5">
                                    <img src="static/images/report-defalut.jpeg" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="show-more-btn" @click="showList(2)">
                        <span v-if="!this.reportListStatus">查看详情</span>
                        <span v-else>收起</span>
                        <span class="show-more" :class="{'rotate':reportListStatus}"></span>
                    </div>
                </div>
            </div>
            <!-- part5:订单追踪 -->
            <div class="order-tracking">
                <div class="title" @click="showList(4)">
                    <span>订单追踪</span>
                    <span class="show-more" :class="{'rotate':trackingStatus}"></span>
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
import { MessageBox,Toast,Spinner } from 'mint-ui';
import { query_detail, query_card_info,update_status} from '@/service/getData.js'

    export default {
        data(){
            return{
                showStatus:true,         // 是否显示主体内容
                orderId:'2c9380976757fe34016758261b1d0004',              // 订单ID
                status:4,                // 订单当前状态
                popupVisible:false,      // 禁止取消订单弹窗
                deliveryStatus:true,
                deliveryError:false,     // 物流信息出错
                deliveryNum:-1,          // 展开物流详情
                orderDetailStatus:false, // 订单信息显示、隐藏
                reportListStatus:false,  // 检测报告显示、隐藏
                reportDetialStatus:false,// 检测报告明显显示、隐藏
                eachReportNum:-1,        // 每一个产品的检测报告明细显示、隐藏
                trackingStatus:false,    // 订单追踪显示、隐藏
                minu:'--',               // 倒计时分
                secd:'--',               // 倒计时秒
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
                orderInfo:'',            // 订单详情数据
                bankInfo:{             // 未支付银行卡信息
                    code:'0820',
                    name:'中国工商银行'
                },
                deliveryList:[
                    {
                        time:'2018-12-12 12:12:12',
                        status:'快递已发货'
                    },
                    {
                        time:'2018-12-12 12:12:12',
                        status:'浙江省金华市义务中转站公司  已发出，下一站北京运转中心'
                    },
                    {
                        time:'2018-12-12 12:12:12',
                        status:'快递已发货'
                    },
                ],
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
            // 物流包裹显示、隐藏
            showDelivery(index){
                if(this.deliveryNum == index){
                    this.deliveryNum = -1
                }else{
                    this.deliveryNum = index
                }
            },
            // 各项列表显示、隐藏
            showList(num){
                /*
                    1——>订单信息；2——>检测信息； 3——>检测明细； 4——>订单追踪
                */
                switch (num) {
                    case 1:
                        this.orderDetailStatus = !this.orderDetailStatus;
                        break;
                    case 2:
                        this.reportListStatus = !this.reportListStatus;
                        break;
                    case 3:
                        this.reportDetialStatus = !this.reportDetialStatus;
                        break;
                    case 4:
                        this.trackingStatus = !this.trackingStatus;
                        break;
                }
            },
            // 具体每一项产品的检测报告
            showEachReport(index){
                if(this.eachReportNum == index){
                    this.eachReportNum = -1;
                }else{
                    this.eachReportNum = index
                }
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
            // 锁价解释弹窗
            lockPricePopup(){
                var html='<div style="text-align:left">锁定金价：当前订单将以您锁定金价成交。</div>'
                MessageBox({
                  title: '提示',
                  message:html ,
                  confirmButtonText: '我知道了'
                })
            },
            // 倒计时
            countDown(time){
                console.log(time)
                var countdownMinute = 15;//15分钟倒计时
                var startTimes = new Date(time.replace(/-/g,"/"));//开始时间 new Date('2016-11-16 15:21');
                var endTimes = new Date(startTimes.setMinutes(startTimes.getMinutes()+countdownMinute));//结束时间
                var curTimes = new Date();//当前时间
                var surplusTimes = endTimes.getTime()/1000 - curTimes.getTime()/1000;//结束毫秒-开始毫秒=剩余倒计时间

                // 进入倒计时
                var that = this;
                var countdowns =  window.setInterval(function(){
                    surplusTimes--;
                    that.minu = Math.floor(surplusTimes/60);
                    that.secd = Math.round(surplusTimes%60);
                    if(surplusTimes<=0){
                        that.minu = '--';
                        that.secd = '--';
                        clearInterval(countdowns);
                        // 调用取消订单函数
                        that.update_status();
                    }
                },1000);

            },
            // 请求银行卡信息
            async query_card_info(){
                var res = await query_card_info();
                if(res.code=='000000'){
                    this.bankInfo = res.data;
                }
            },
            // 修改订单状态(未支付倒计时结束)
            async update_status(){
                var res = await update_status(this.orderId);
                if(res.code=='000000'){
                    this.query_detail(); // 取消成功后再次调用详情数据
                }else{
                    Toast(res.message)
                }
            },
            // 请求订单详情
            async query_detail(){
                var res = await query_detail(this.orderId)
                if(res.code=='000000'){
                    this.orderInfo = res.data
                }
            }
        },
        created(){

        },
        mounted(){
            this.query_detail();
            this.countDown('2018-11-28 12:08');
        },
    }

</script>


<style media="screen">
    .mint-spinner-triple-bounce{
        text-align: center;
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
/** 公共展开按钮样式**/
.show-more{
    display: inline-block;
    width: .24rem;
    height: .24rem;
    background: url(/static/images/order-pull.png) no-repeat;
    background-size: 100%;
    @include transition(.3s);
    }
.rotate{
    @include transition(.3s);
    @include rotate(180deg);
}
.order-detail{
    .main-cont{
        width: 100%;
        min-height: 100vh;
        padding-top:.88rem;
        padding-bottom: .5rem;
        background-color: #f8f8f8;

        .distans{
            width:100%;
            height:.2rem;
            background-color: #f8f8f8;
        }

        /* 等待付款状态 */
        .order-cancel{
            background: rgba(188,188,188,1) !important;
        }
        .countDown,.order-cancel{
            width:100%;
            color:#fff;
            padding:.4rem .4rem .3rem;
            align-items: flex-start;
            @include flex-box();
            @include bg-color();

            .clock-icon,.wraning-icon{
                width:.36rem;
                height:.36rem;
                margin-top:.05rem;
                @include bg-image('/static/images/waiting.png');
            }
            .wraning-icon{
                @include bg-image('/static/images/pay-error.png');
            }
            .clock-text{
                text-align: left;
                margin-left:.2rem;
                flex-direction: column;
                @include flex-box();
                @include justify-content();
                span{
                    font-size:.28rem;
                    &:nth-of-type(1){
                        font-size:.36rem;
                        margin-bottom: .1rem;
                    }
                }
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
        .bank{
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            color: #333;
            font-size: .3rem;
            padding:0 .3rem;
            background-color: #fff;
            @include flex-box();
            @include justify-content();
        }
        .pay-btn{
            width: 100%;
            height: .98rem;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            @include flex-box();
            @include justify-content();
            .left-price{
                padding:.1rem 0 .1rem .4rem;
                flex-direction: column;
                @include flex-box();
                span{
                    color: #999;
                    font-size: .24rem;
                    &:nth-of-type(2){
                        color: #C09C60;
                        font-size: .36rem;
                    }
                }
            }
            .right-btn{
                width: 2.2rem;
                height: .98rem;
                color: #fff;
                text-align: center;
                line-height: .98rem;
                font-size: .34rem;
                background-color: #000;
            }
        }

        /* 其他状态 */
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
                .order-end-icon{
                    width: 1.44rem;
                    height: 1.44rem;
                    @include bg-image('/static/images/order-wancheng-icon.png');
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
                .info-bank{
                    color: #666;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                }
            }
        }
        .delivery-info-wrap{
            padding:0 .4rem;
            background-color: #fff;
            margin-bottom: .2rem;
            h4{
                color: #333;
                font-size: .32rem;
                padding:.3rem 0;
            }
            .outer-delivery-list{
                .outer-delivery-item{
                    color: #666;
                    font-size: .28rem;
                    .item-title{
                        height: .86rem;
                        line-height: .86rem;
                        align-items: center;
                        @include flex-box();
                        @include justify-content();
                        span{
                            font-size: .28rem;
                        }
                    }
                    .item-detail{
                        font-size: .26rem;
                    }
                    .hideDelivery{
                        max-height: 0;
                        overflow: hidden;
                        @include transition(.4s);
                    }
                    .showDelivery{
                        max-height: 10rem;
                        overflow-y: scroll;
                        @include transition(.4s);
                    }
                    .delivery-point{
                        margin-top:.2rem;
                        padding-bottom: .3rem;

                        .inner-delivery-list{
                            height: 100%;
                            padding-left:.1rem;
                            position: relative;
                            .line{
                                width:1px;
                                height: 185%;
                                position: absolute;
                                left:1.05rem;
                                top:.3rem;
                                z-index: 100;
                                background-color: #ddd;
                            }
                            .inner-delivery-item{
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
                                    width: .8rem;
                                    text-align: center;
                                }
                                .dot{
                                    width: .24rem;
                                    height: .24rem;
                                    margin:-.05rem .2rem 0 .1rem;
                                    z-index: 100;
                                    @include bg-image('/static/images/delivery-nomal.png');
                                }
                                .text{
                                    width:85%;
                                }
                            }
                        }
                        .deliveryError{
                            text-align: center;
                            color: #999;
                            font-size: .28rem;
                        }
                    }
                }
            }
        }
        .detection-ing{
            padding:.6rem 0;
            @extend .order-closed
        }
        .wait-confirm{
            .order-info{
                padding:0 .4rem;
                margin-bottom: .2rem;
                background-color: #fff;
                h4{
                    color: #333;
                    font-size: .32rem;
                    padding:.35rem 0;
                }
                p{
                    color: #666;
                    font-size: .26rem;
                    margin-bottom: .2rem;
                    @include flex-box();
                    @include justify-content();
                }
                .detail-info{
                    height: 0;
                    overflow: hidden;
                    @include transition(.3s);
                }
                .showOrderList{
                    height: auto;
                    @include transition(.3s);
                }
                .show-more-btn{
                    color: #666;
                    font-size: .26rem;
                    height: .84rem;
                    line-height: .84rem;
                    text-align: center;
                    padding:0 .4rem;
                    margin-top:.2rem;
                    border-top:1px solid #eee;
                    align-items: center;
                    justify-content: center;
                    @include flex-box();
                    span{
                        &:nth-of-type(2){
                            margin-left:.12rem;
                        }
                    }
                }
            }
            .report-info{
                @extend .order-info;
                .report-detail{
                    h4{
                        color: #C09060;
                        font-size: .26rem;
                        align-items: center;
                        @include flex-box();
                        .txt{
                            border-bottom: 1px solid #C09060;
                        }
                        .show-more{
                            margin-left:.12rem;
                        }
                    }
                    .report-more-detail{
                        height: 0;
                        display: none;
                        padding:0 .2rem;
                        margin-bottom: .4rem;
                        background-color: #F8F8F8;
                        .more-detail-item{
                            &:nth-of-type(1){
                                .title{
                                    border-top:none;
                                }
                            }
                        }
                        .title{
                            height: .84rem;
                            line-height: .84rem;
                            color: #666;
                            font-size: .26rem;
                            border-top: 1px solid #eee;
                            align-items: center;
                            @include flex-box();
                            @include justify-content();

                        }
                        .list{
                            height: 0;
                            overflow: hidden;
                            @include transition(.3s);
                        }
                        .showEachReport{
                            height: 2rem;
                            @include transition(.3s);
                        }
                        p{
                            color: #999;
                            font-size: .22rem;
                            margin-bottom: .08rem;
                        }
                    }
                    .showReportDetail{
                        height: auto;
                        display: block;
                    }
                    .report-img-list{
                        flex-wrap: wrap;
                        @include flex-box();
                        .img-item{
                            width: 2.1rem;
                            height: 1.68rem;
                            margin-bottom: .2rem;
                            background-color: #eee;
                            &:nth-of-type(3n+2){
                                margin:0 .2rem;
                            }
                            img{
                                width: 100%;
                            }
                        }
                    }
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
                @include bg-image('/static/images/refresh-icon.png');
            }
        }
    }
}
</style>
