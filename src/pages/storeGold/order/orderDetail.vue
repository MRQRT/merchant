<template>
    <div class="order-detail">
        <!-- 头部标题部分 -->
        <head-top headTitle='订单详情' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="goback">
        </head-top>
        <!-- 主体内容 -->
        <div class="main-cont" :class="{'max-padding':status==1}" v-show="!popupVisible2">
            <!-- part1:顶部倒计时 (待支付显示)-->
            <div class="countDown" v-if="status==1">
                <p class="clock-icon"></p>
                <p class="clock-text">
                    <span>待支付</span>
                    <span>剩余{{minu}}分钟{{secd}}秒自动关闭</span>
                </p>
            </div>
            <!-- part1:顶部进度提示文字 -->
            <div class="step-tips" v-else>
                <div class="count-down" v-if="status==7">
                    <p>距离自动确认订单还有</p>
                    <p v-if="topTime.day!=0"><span>{{topTime.day}}</span>天</p>
                    <p v-if="topTime.hour!=0"><span>{{topTime.hour}}</span>小时</p>
                    <p v-if="topTime.minu!=0"><span>{{topTime.minu}}</span>分钟</p>
                    <p><span>{{topTime.secd}}</span>秒</p>
                </div>
                <div v-html="stepTipText" class="inner-box"></div>
            </div>

            <!-- part2:订单信息状态部分 -->
            <div class="order-basic-info">
                <!-- 文字信息部分 -->
                <div class="info-text">
                    <!-- 左边图片 -->
                    <div class="left-img">
                        <img src="static/images/order-info-basic.png" alt="">
                    </div>
                    <!-- 中间订单信息 -->
                    <div class="center-txt">
                        <p>
                            <span>总&nbsp;&nbsp;克&nbsp;重：</span>
                            <span>{{orderInfo.weight|formatPriceTwo}}克</span>
                        </p>
                        <p>
                            <span>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</span>
                            <span>{{orderInfo.count}}</span>
                        </p>
                        <div class="" v-if="orderInfo.typeCode=='lock'">
                            <p>
                                <span>锁定金价：</span>
                                <span>{{orderInfo.lockPrice.lockPrice | formatPriceTwo}}元/克</span>
                            </p>
                            <p>
                                <span>保&nbsp;&nbsp;证&nbsp;金：</span>
                                <span>{{orderInfo.margin.paidAmount | formatPriceTwo}}元</span>
                            </p>
                        </div>
                        <p>
                            <span>提交时间：</span>
                            <span>{{orderInfo.createdTime}}</span>
                        </p>
                    </div>
                    <!-- 按钮部分 -->
                    <!-- 已完成图标 -->
                    <div class="order-end-icon" v-if="status==9"></div>
                    <!-- 其他状态文字 -->
                    <div class="right-status special" v-else-if="status==10">退款中</div>
                    <div class="right-status special" v-else-if="status==11">已关闭</div>
                    <div class="right-status special" v-else>{{statusJson[status].name}}</div>
                </div>
                <div class="line"></div>
                <!-- 操作按钮部分 -->
                <div class="info-btn">
                    <div class="">
                        <!-- 待支付、审核中显示 -->
                        <span v-if="status==1 || status==3" class="border-btn" @click="cancelOrder">取消订单</span>
                        <!-- 待确认显示 -->
                        <span v-else-if="status==7" class="border-btn" @click="report_confirm()">确认订单</span>
                        <!-- 已关闭显示 -->
                        <span v-else-if="status==11" class="border-btn" @click="goStoreGold">再来一单</span>
                        <span class="bg-btn"><a href="tel:4008-196-199">联系客服</a></span>
                    </div>
                </div>
            </div>
            <!-- part3:订单关闭部分(只在退款中/已关闭状态，且是取消订单/超时未支付才显示) -->
            <div class="order-closed" v-if="order_close_status">
                <div class="left-img"></div>
                <div class="right-text">
                    <h3>您的订单
                        <span v-if="status==10">已取消</span>
                        <span v-else>已关闭</span>
                    </h3>
                    <p>好遗憾哦～～</p>
                </div>
            </div>
            <!-- part3:进度图标部分 -->
            <div class="step-icon-wrap" v-else>
                <ul>
                    <li class="step-item" v-for="(item,index) in stepList" :key="index" @click="showOrderPart(index,$event)" ref="stepList"
                    :class="{'stepSuccess': step_success_status(index),'stepError': step_error_status(index)}">
                        <span class="step-icon"></span>
                        <span class="step-txt">{{item.name}}</span>
                        <span class="left-line" :class="{'active-line':(status==4 || status==6 || status==8) && statusJson[status].iconType==(index-1)}"></span>
                    </li>
                </ul>
            </div>

            <!-- part4:订单其他信息 -->
            <div class="order-other-info" v-if="status<=4 || stepIconNum==0">
                <p>
                    <span>订单编号</span>
                    <span>{{orderInfo.code}}</span>
                </p>
                <p>
                    <span>取件地址</span>
                    <span class="user-address" v-if="orderInfo.address">
                        <b>{{orderInfo.address.contact}} &nbsp;&nbsp;&nbsp;&nbsp;{{orderInfo.address.mobile}}</b><br/>
                        <b class="address">{{orderInfo.address.address}}</b>
                    </span>
                </p>
                <p>
                    <span>银行卡号</span>
                    <span class="info-bank" v-if="orderInfo.bankCard">{{orderInfo.bankCard.name}}（尾号{{orderInfo.bankCard.code}}）</span>
                </p>
            </div>
            <!-- part4.1 审核结果(回点到审核icon时显示) -->
            <div class="verify-results" v-if="verify_result_status">
                <span>审核结果</span>
                <span class="results">审核通过</span>
            </div>
            <!-- part4:检测中样式 -->
            <div class="detection-ing" v-if="status==6 && stepIconNum==1">
                <div class="left-image">
                    <img src="static/images/jiance1.png" alt="" class="jiance1">
                    <img src="static/images/jiance2.png" alt="" class="jiance2">
                    <img src="static/images/jiance3.png" alt="" class="jiance3">
                </div>
                <div class="right-text">
                    <h3>正在检测中</h3>
                    <p>请静候佳音～</p>
                </div>
            </div>
            <!-- part4:物流包裹信息 -->
            <div class="delivery-info-wrap" v-if="status>=5 && stepIconNum==1">
                <h4>物流信息</h4>
                <ul class="outer-delivery-list">
                    <li class="outer-delivery-item" v-for="(item,index) in packageList" :key="index">
                        <div class="item-title" @click="showDelivery(index,item.expressCode)">
                            <span>
                                <b :class="{'success':packagejson[item.stateCode].type==2,'error':packagejson[item.stateCode].type==3}"></b>
                                包裹{{index+1}} — {{packagejson[item.stateCode].name}}
                            </span>
                            <span class="show-more" :class="{'rotate':index==deliveryNum}"></span>
                        </div>
                        <!-- 隐藏掉的具体物流信息 -->
                        <div class="hideDelivery" :class="{'showDelivery':index==deliveryNum}">
                            <p class="error" v-if="packagejson[item.stateCode].type==3">异常原因：{{item.remark}}</p>
                            <div class="item-detail">
                                <p>快递公司：顺丰快递</p>
                                <p>快递单号：{{item.expressCode}}</p>
                            </div>
                            <mt-spinner type="triple-bounce" v-if="!deliveryStatus" color="#C09C60"></mt-spinner>
                            <div class="delivery-point" v-else>
                                <ul class="inner-delivery-list">
                                    <div class="line"></div>
                                    <li class="inner-delivery-item" :class="{'recent':index==0}"v-for="(item,index) in deliveryList" :key="index">
                                        <span class="time">{{item.time | changeTime}}</span>
                                        <span class="dot" :class="{'recent-icon':index==0}"></span>
                                        <span class="text">{{item.status}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- part4:待确认样式 -->
            <div class="wait-confirm">
                <!-- 订单信息 -->
                <div class="order-info" v-if="(status==7 || status==8 || status==9) && (stepIconNum==2||stepIconNum==3)">
                    <h4>订单信息<span class="question-icon" @click="explanNoun()"></span></h4>
                    <p>
                        <span>订单编号</span>
                        <span>{{orderInfo.code}}</span>
                    </p>
                    <p>
                        <span>实收总额</span>
                        <span style="color:#C09C60">{{orderInfo.paidAmount | formatPriceTwo}}元</span>
                    </p>
                    <div class="detail-info" :class="{'showOrderList':orderDetailStatus}">
                        <p>
                            <span>卖金总额</span>
                            <span>{{orderInfo.amount | formatPriceTwo}}元</span>
                        </p>
                        <p>
                            <span>物流费</span>
                            <span>{{reportInfo.expressFee | formatPriceTwo}}元</span>
                        </p>
                        <p>
                            <span>保价费</span>
                            <span>{{reportInfo.insuranceFee | formatPriceTwo}}元</span>
                        </p>
                        <p>
                            <span>检测费</span>
                            <span>{{reportInfo.detectionFee | formatPriceTwo}}元</span>
                        </p>
                        <p>
                            <span>手续费</span>
                            <span>{{reportInfo.serviceFee}}元</span>
                        </p>
                        <p>
                            <span>优惠金额</span>
                            <span>{{reportInfo.discountAmount | formatPriceTwo}}元</span>
                        </p>
                    </div>
                    <div class="show-more-btn" @click="showList(1)">
                        <span v-if="!this.orderDetailStatus">查看详情</span>
                        <span v-else>收起</span>
                        <span class="show-more" :class="{'rotate':orderDetailStatus}"></span>
                    </div>
                </div>
                <!-- 检测信息 -->
                <div class="report-info" v-if="(status>=7) && stepIconNum==2">
                    <h4>检测信息</h4>
                    <p>
                        <span>实测总毛重</span>
                        <span>{{reportInfo.grossWeight|formatPriceTwo}}克</span>
                    </p>
                    <p>
                        <span>成色</span>
                        <span>{{reportInfo.colour}}‰</span>
                    </p>
                    <p>
                        <span>实测总净重</span>
                        <span>{{reportInfo.suttleWeight}}克</span>
                    </p>
                    <!-- 检测报告详情 -->
                    <div class="detail-info" :class="{'showOrderList':reportListStatus}">
                        <p>
                            <span>实收金价</span>
                            <span>{{orderInfo.price}}元/克</span>
                        </p>
                        <p>
                            <span>检测结果</span>
                            <span style="color:#C09C60">{{reportInfo.resultCode=="success"?'合格':'不合格'}}</span>
                        </p>
                        <p>
                            <span>检测员</span>
                            <span>{{reportInfo.operator}}</span>
                        </p>
                        <p>
                            <span>检测时间</span>
                            <span>{{reportInfo.operateTime}}</span>
                        </p>
                        <!-- 检测明细 -->
                        <div class="report-detail">
                            <h4 @click="$router.push({path:'/reportdetail',query:{'code':code}})">
                                <span class="txt">查看检测明细</span>
                                <span class="show-more"></span>
                            </h4>
                            <!-- 检测报告图片 -->
                            <ul class="report-img-list">
                                <li class="img-item" v-for="(item,index) in reportInfo.reportPaths" :key="index" :class="{'single':reportInfo.reportPaths.length==1}">
                                    <img :src="item" alt="检测报告" preview='1'>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 查看更多按钮 -->
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
                    <li class="tracking-item" v-for="(item,index) in newTrackList">
                        <div class="left-line">
                            <span class="dot" :class="{'recent-icon':index==0}"></span>
                        </div>
                        <div class="right-text" :class="{'recent':index==0}">
                            <p class="progress">{{item.remark}}</p>
                            <p class="time">{{item.createdTime}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- part6:待支付底部按钮 -->
            <div class="pay-btn" v-if="status==1">
                <div class="left-price">
                    <span>锁价保证金：</span>
                    <span>{{orderInfo.margin.paidAmount | formatPriceTwo}}元</span>
                </div>
                <div class="right-btn" @click="pay_beforehand_order(1)">支付</div>
            </div>
        </div>

        <!-- 弹窗部分 -->
        <!-- 禁止取消订单弹窗 -->
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="false">
            <div class="not-cancel">
                <h4>提示</h4>
                <p>订单状态有更新，您暂时不能取消订单，请刷新页面以查看最新订单状态。</p>
                <div class="btn">
                    <span @click="refreshPage"><b></b>刷新</span>
                </div>
            </div>
        </mt-popup>
        <!-- 确认检测报告中弹窗 -->
        <mt-popup v-model="popupVisible1" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="order-popup-wrap">
                <div class="top-img">
                    <img src="static/images/report-inner.png" alt="">
                    <img src="static/images/report-outer.png" alt="">
                </div>
                <h4>订单确认中，请稍后...</h4>
            </div>
        </mt-popup>
        <!-- 名词解释弹窗 -->
        <div class="noun-explan" v-show="popupVisible2">
                <h3>名词解释</h3>
                <div class="line"></div>
                <div class="each-noun">
                    <p>
                        <span>卖金总额=</span>
                        <span>所有产品的（毛重*成色*实收金价）之和</span>
                    </p>
                    <p>
                        <span>手续费=</span>
                        <span>毛重*默认手续费费率(默认手续费费率金条为0.8元/克，首饰为1.2元/克)</span>
                    </p>
                    <p>
                        <span>优惠金额=</span>
                        <span>金条毛重（0.8-金条实际手续费费率）+首饰毛重（1.2-首饰实际手续费费率）</span>
                    </p>
                    <p>
                        <span>实收总额=</span>
                        <span>卖金总额-物流费-保价费-检测费-手续费+优惠金额</span>
                    </p>
                </div>
                <div class="close-btn" @click="explanNoun"></div>
            </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Toast,Spinner } from 'mint-ui';
import { query_detail, query_card_info,update_status,report_confirm,query_logistics_mess,query_express_mess,query_status_flow_mess,query_process_mess,query_report_detail,confirm_order,cancel_order} from '@/service/getData.js'

    export default {
        data(){
            return{
                arr:[{},{}],
                showStatus:true,         // 是否显示主体内容
                code:'',                 // 订单编号
                orderId:'',              // 订单ID
                status:'',               // 订单当前状态
                nodeCode:'',             // 当前节点
                stepTipText:'',          // 顶部提示文案
                popupVisible:false,      // 禁止取消订单弹窗
                popupVisible1:false,     // 确认检测报告中弹窗
                popupVisible2:false,     // 名词解释弹窗
                deliveryStatus:false,     // 物流数据是否请求成功
                deliveryError:false,     // 物流信息出错
                deliveryNum:-1,          // 展开物流详情
                stepIconNum:0,           // 当前进度icon
                orderDetailStatus:false, // 订单信息显示、隐藏
                reportListStatus:false,  // 检测报告显示、隐藏
                trackingStatus:false,    // 订单追踪显示、隐藏
                minu:'--',               // 倒计时分
                secd:'--',               // 倒计时秒
                topTime:{                // 顶部待确认倒计时
                    day:'-',
                    hour:'-',
                    minu:'-',
                    secd:'-',
                },
                timer:'',                // 待确认时顶部倒计时时间
                stepList:[               // 进度icon对应文字
                    {name:'订单审核'},
                    {name:'物流运输'},
                    {name:'检测确认'},
                    {name:'订单完成'},
                ],
                packagejson:{            // 物流状态(doing,success)
                    'doing':{name:'物流中',type:1},
                    'success':{name:'已收件',type:2},
                    'failure':{name:'包裹异常',type:3},
                },
                orderInfo:'',            // 订单详情数据
                bankInfo:{               // 未支付银行卡信息
                    code:'0820',
                    name:'中国工商银行'
                },
                reportInfo:'',           // 检测报告信息
                packageList:[],          // 包裹列表
                deliveryList:[],         // 具体物流信息
                newTrackList:[],         // 订单追踪信息
                statusJson:{             // 整个订单状态
                    '1':{name:'待支付',topNum:8,status:0,beforeStatus:0,iconType:0},
                    '2':{name:'支付处理中',topNum:0,status:0,beforeStatus:0,iconType:0},
                    '3':{name:'审核中',topNum:1,status:1,beforeStatus:0,iconType:0},
                    '4':{name:'待取货',topNum:2,status:1,beforeStatus:0,iconType:0},
                    '5':{name:'物流中',topNum:3,status:1,beforeStatus:1,iconType:1},
                    '6':{name:'检测中',topNum:4,status:1,beforeStatus:1,iconType:1},
                    '7':{name:'待确认',topNum:5,status:1,beforeStatus:1,iconType:2},
                    '8':{name:'打款中',topNum:6,status:1,beforeStatus:1,iconType:2},
                    '9':{name:'已完成',topNum:7,status:1,beforeStatus:1,iconType:3},
                    '10':{
                        'verify':{name:'退款中',topNum:13,status:2,beforeStatus:0,iconType:0},
                        'pick':{name:'退款中',topNum:14,status:2,beforeStatus:1,iconType:1},
                        'front_cancel':{name:'退款中',topNum:15,status:0,beforeStatus:0,iconType:0},
                        'back_cancel':{name:'退款中',topNum:15,status:0,beforeStatus:0,iconType:0},
                    },
                    '11':{
                        'pay_margin':{name:'已关闭',topNum:8,status:2,beforeStatus:0,iconType:0},
                        'front_cancel':{name:'已关闭',topNum:9,status:2,beforeStatus:0,iconType:0},
                        'back_cancel':{name:'已关闭',topNum:9,status:2,beforeStatus:0,iconType:0},
                        'verify':{name:'已关闭',topNum:10,status:2,beforeStatus:0,iconType:0},
                        'pick':{name:'已关闭',topNum:11,status:2,beforeStatus:1,iconType:1},
                    }
                }
            }
        },
        filters:{

        },
        components:{
            headTop,
        },
        computed: {
            // 审核结果回点显示
            verify_result_status(){
                if(this.stepIconNum==0&&this.status>4){
                    if((this.status==10||this.status==11)&&this.nodeCode!='pick'){ //只有在物流异常情况下回点才显示
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            },
            // 订单取消、关闭图标显示
            order_close_status(){
                var status = this.status;
                var nodeCode = this.nodeCode;
                if((status==10||status==11) && (nodeCode=='front_cancel'||nodeCode=='back_cancel'||nodeCode=='pay_margin')){
                    return true;
                }else{
                    return false;
                }
            }
        },
        watch:{

        },
        methods: {
            // 顶部返回按钮
            goback(){
                if(this.popupVisible2){
                    this.popupVisible2 = false;
                }else{
                    this.$router.push('/storeorderlist')
                }
            },
            // 进度icon成功判断
            step_success_status(index){
                var status = this.status;
                var statusJson = this.statusJson;
                var nodeCode = this.nodeCode;
                if(status==10 || status==11){  //退货中、已关闭
                    if((statusJson[status][nodeCode].status==1 || statusJson[status][nodeCode].beforeStatus==1) && statusJson[status][nodeCode].iconType>=index){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if((statusJson[status].status==1 || statusJson[status].beforeStatus==1) && statusJson[status].iconType>=index){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            // 进度icon失败判断
            step_error_status(index){
                var status = this.status;
                var statusJson = this.statusJson;
                var nodeCode = this.nodeCode;
                if(status==10 || status==11){ //退货中、已关闭
                    if((statusJson[status][nodeCode].status==2 && statusJson[status][nodeCode].iconType==index)){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if((statusJson[status].status==2 && statusJson[status].iconType==index)){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            // 点击进度icon显示对应订单部分
            showOrderPart(index,event){
                if(event.currentTarget.classList.contains('stepSuccess')){ //可点击状态
                    this.stepIconNum = index;

                    switch (this.stepIconNum) {
                        case 1:  // 物流
                            this.query_logistics_mess();
                            break;
                        case 2:  // 检测
                            this.query_process_mess();
                            break;
                    }
                }else{
                    return false;
                }
            },
            // 订单信息名次解释
            explanNoun(){
                this.popupVisible2 = !this.popupVisible2;
            },
            // 物流包裹显示、隐藏
            showDelivery(index,expressCode){
                if(this.deliveryNum == index){
                    this.deliveryNum = -1
                }else{
                    this.deliveryNum = index;
                    this.deliveryList = [];
                    this.query_express_mess(expressCode);
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
                        this.cancel_order();
                    }
              })
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
            // 分钟倒计时
            countDown(time){
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
                        // 刷新页面
                        // that.query_detail();
                    }
                },1000);

            },
            // 天数倒计时
            countTime(){
                var that = this;
                //获取当前时间
                var date = new Date();
                var now = date.getTime();

                //设置截止时间
                var str = new Date(this.timer.replace(/-/g,"/"));
                str.setDate(str.getDate()+3);
                var endDate = new Date(str);
                var end = endDate.getTime();

                //时间差
                var leftTime = end-now;

                if (leftTime>=0) {
                    that.topTime.day = Math.floor(leftTime/1000/60/60/24);
                    that.topTime.hour = Math.floor(leftTime/1000/60/60%24);
                    that.topTime.minu = Math.floor(leftTime/1000/60%60);
                    that.topTime.secd = Math.floor(leftTime/1000%60);
                }else{
                    clearTimeout(window.timer);
                    // 刷新页面
                    // that.query_detail();
                    return
                }
                // 递归每秒调用countTime方法，显示动态时间效果
                window.timer = setTimeout(this.countTime,1000);
            },
            // 点击确认订单
            report_confirm(){
                var that = this;
                this.popupVisible1 = true;
                setTimeout(function(){
                    that.confirm_order();
                },1500)
            },
            // 顶部显示文字
            showStepTips(){
                var text0 = '<p>您的订单已创建，银行正在处理中，最终支付结果以银行实际处理结果为准哦～</p>';
                var text1 = '<p>我们正在马不停蹄地审核您的订单哦，审核结果将在2个工作日内通知到您！请耐心等待～</p>';
                var text2 = '<p>恭喜您，订单审核通过！我们已经安排快递小哥上门取件，请留意接听取件电话哦～</p>';
                var text3 = '<p>您的宝贝已经取到，快递小哥正在用心传递速度送往深圳众恒隆进行检测～</p>'
                var text4 = '<p>我们已经收到您的宝贝啦～专业检测师紧锣密鼓的开工了！1个工作日内就会有结果哦！</p>';
                var text5 = `<p>亲，只差最后一步啦，您确认下方订单信息后，宝贝将成功卖出，同时您将得到实收总额 ${this.orderInfo.paidAmount} 元（若您未及时确认，系统72小时内自动确认）。</p>`;
                var text6 = `<p>您的订单已确认，实收总额 ${this.orderInfo.paidAmount} 元将在T+1个工作日内发放到您的 ${this.orderInfo.bankCard.name}(${this.orderInfo.bankCard.code}) 银行卡中，记得查收哦～</p>`;
                var text7 = `<p>实收总额 ${this.orderInfo.paidAmount} 元已发放到您的 ${this.orderInfo.bankCard.name}(${this.orderInfo.bankCard.code}) 银行卡中，记得查收哦～（具体到账时间以银行为准）</p>`;

                // 已关闭
                var text8 = '<p>由于您长时间未支付，订单已关闭～您可以重新发起订单，风里雨里，我们在这里等你！~</p>'
                var text9 = '<p>您的订单已取消～您可以重新发起订单，风里雨里，我们在这里等你！</p>'
                var text10 = `<p>抱歉哦，您的订单未通过审核，原因：${this.orderInfo.verify?this.orderInfo.verify.remark:''}</p>`;
                var text11 = `<p>很抱歉，您的订单物流发生异常，我们正在排查原因，客服届时将会与您取得联系，给您造成的不便敬请谅解～</p>`;
                var text12 = '<p>订单已退款完成，请注意查收保证金到账情况～您可以重新发起订单，风里雨里，我们在这里等你！</p>';

                // 退款中
                var text13 = `<p>抱歉哦，您的订单未通过审核，原因：${this.orderInfo.paidAmount}。</p>
                              <p>您的锁价保证金将在1-2个工作日内退回至您绑定的银行卡中，请注意查收～</p>`;
                var text14 = `<p>很抱歉，您的订单物流发生异常，我们正在排查原因，客服届时将会与您取得联系，给您造成的不便敬请谅解～</p>
                              <p>您的锁价保证金将在1-2个工作日内退回至您绑定的银行卡中，请注意查收～</p>`;
                var text15 = `<p>您的订单已取消，您可以重新发起订单，风里雨里，我们在这里等你！</p>
                              <p>您的锁价保证金将在1-2个工作日内退回至您绑定的银行卡中，请注意查收～</p>`;

                var textJson = {
                    '0':text0,  // 支付处理中
                    '1':text1,  // 审核中
                    '2':text2,  // 待取货
                    '3':text3,  // 物流中
                    '4':text4,  // 检测中
                    '5':text5,  // 待确认
                    '6':text6,  // 打款中
                    '7':text7,  // 已完成
                    '8':text8,  // 已关闭
                    '9':text9,  // 已关闭
                    '10':text10,// 已关闭
                    '11':text11,// 已关闭
                    '12':text12,// 已关闭
                    '13':text13,// 退款中
                    '14':text14,// 退款中
                    '15':text15,// 退款中
                }
                if(this.status==11 && this.orderInfo.typeCode=='lock'){  //锁价订单已关闭
                    this.stepTipText = textJson[12];
                }else if(this.status==10 || this.status==11){
                    this.stepTipText = textJson[this.statusJson[this.status][this.nodeCode].topNum];
                }else{
                    this.stepTipText = textJson[this.statusJson[this.status].topNum];
                }
            },
            // 请求订单详情数据
            async query_detail(){
                var res = await query_detail(this.code);
                if(res.code=='000000'){
                    this.orderInfo = res.data;
                    this.status = res.data.state;
                    this.nodeCode = res.data.nodeCode;
                    this.showStepTips();

                    if(this.status==10||this.status==11 && this.nodeCode=='pick'){
                        this.query_logistics_mess();
                    }
                    switch (this.status) {
                        case 1:                           // 待支付：倒计时函数
                            this.countDown(this.orderInfo.createdTime);
                            break;
                        case 5:                      // 物流中、检测中：包裹列表
                        case 6:
                            this.query_logistics_mess();
                            break;
                        case 7:
                        case 8:
                        case 9:
                            this.query_process_mess();   //待确认：检测信息函数
                            break;
                    }
                }else{
                    Toast(res.message)
                }
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
                var res = await update_status(this.code);
                if(res.code=='000000'){
                    // this.query_detail(); // 取消成功后再次调用详情数据
                }else{
                    Toast(res.message)
                }
            },
            // 取消订单函数
            async cancel_order(){
                var that = this;
                var res = await cancel_order(this.code);
                if(res.code=='000000'){
                    Toast('订单取消成功～')
                    setTimeout(function(){
                        that.query_detail();
                    },500)
                }else{
                    // this.popupVisible = true;
                    Toast(res.message)
                }
            },
            // 订单确认函数
            async confirm_order(){
                var res = await confirm_order(this.code);
                if(res.code=='000000'){
                    this.popupVisible1 = false;
                    Toast('订单确认成功');
                    this.query_detail(); // 刷新页面
                }else{
                    this.popupVisible1 = false;
                    Toast('确认失败，请稍后重试～')
                }
            },
            // 请求物流单号
            async query_logistics_mess(){
                var res = await query_logistics_mess(this.code)
                if(res.code=='000000'){
                    this.packageList = res.data;
                }else{
                    Toast(res.message)
                }
            },
            // 查询具体物流信息
            async query_express_mess(expressCode){
                var res = await query_express_mess(expressCode);
                if(res.code=='000000'){
                    this.deliveryStatus = true;
                    this.deliveryList = res.data.result.list;
                }else{
                    this.deliveryStatus = true;
                    Toast({
                        message:res.message,
                        position:'bottom'
                    })
                }
            },
            // 查询检测报告
            async query_process_mess(){
                var res = await query_process_mess(this.code);
                if(res.code=='000000'){
                    this.reportInfo = res.data;
                    this.timer = res.data.createdTime; // 检测报告审核通过时间
                    this.countTime();                  // 顶部确认订单倒计时
                    this.$previewRefresh();            // 加载数据后刷新图片放大功能
                }else{
                    Toast(res.message)
                }
            },
            // 查询订单追踪
            async query_status_flow_mess(){
                var res = await query_status_flow_mess(this.code);
                if(res.code=='000000'){
                    this.newTrackList = res.data.reverse();
                }else{
                    Toast(res.message)
                }
            },
        },
        created(){
            this.code = this.$route.query.code;//订单编号
            this.status = this.$route.query.status;//订单编号
            this.nodeCode = this.$route.query.nodeCode;//订单节点
        },
        mounted(){
            this.query_detail();
            this.query_status_flow_mess();

            // 用来控制订单部分是否显示
            if(this.status==10 || this.status==11){
                this.stepIconNum = this.statusJson[this.status][this.nodeCode].iconType;
            }else{
                this.stepIconNum = this.statusJson[this.status].iconType;
            }
        },
    }

</script>


<style media="screen">
    .mint-spinner-triple-bounce{
        text-align: center;
        padding:.2rem 0;
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
    .max-padding{
        padding-bottom: 1.4rem !important;
    }
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
        .pay-btn{
            width: 100%;
            height: .98rem;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            @include flex-box();
            @include justify-content();
            .left-price{
                width: 75%;
                padding:.1rem 0 .1rem .4rem;
                border-top:1px solid #f8f8f8;
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
                width: 25%;
                height: .98rem;
                color: #fff;
                text-align: center;
                line-height: .98rem;
                font-size: .34rem;
                background-color: #DDC899;
            }
        }

        /* 其他状态 */
        .step-tips{
            color: #C09C60;
            padding:.25rem .4rem;
            font-size: .26rem;
            background-color: #F3EDE0;
            .count-down{
                align-items: center;
                @include flex-box();
                span{
                    color: #FF6D39;
                    font-size: .4rem;
                    margin:0 .02rem;
                }
            }
            .inner-box{
                width: 100%;
                overflow: hidden;
            }
        }
        .order-basic-info{
            padding:.4rem .4rem .27rem;
            background-color: #fff;
            margin-bottom: .2rem;
            .info-text{
                position: relative;
                @include flex-box();
                // @include justify-content();
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
                    margin-left:.2rem;
                }
                .special{
                    position: absolute;
                    right:0;
                }
                @keyframes scaleIn1{
                    0%{ transform: scale(4); opacity: 0;}
                    100%{ transform: scale(1); opacity: 1;}
                }
                .order-end-icon{
                    width: 1.44rem;
                    height: 1.44rem;
                    position: absolute;
                    right:0;
                    animation: scaleIn1 0.3s .3s ease-out both;
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
            margin-bottom: .2rem;
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
                        @include bg-image('/static/images/check-fail.png');
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
                    &:nth-of-type(1){
                        .step-icon{
                            @include bg-image('/static/images/check-ing.png');
                        }
                    }
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
                            @include bg-image('/static/images/delivery-error.png');
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
        .verify-results{
            height: 1.1rem;
            line-height: 1.1rem;
            margin:.2rem 0;
            padding:0 .4rem;
            background-color: #fff;
            @include flex-box();
            @include justify-content();
            span{
                font-size: .32rem;
                color: #333;
            }
            .results{
                color: #C09C60;
            }
        }
        .delivery-info-wrap{
            padding:0 .4rem;
            background-color: #fff;
            margin-bottom: .2rem;
            h4{
                color: #333;
                font-size: .32rem;
                padding:.25rem 0;
            }
            .outer-delivery-list{

                .outer-delivery-item{
                    color: #666;
                    font-size: .28rem;
                    border-bottom: 1px solid #eee;
                    &:last-child{
                        border-bottom: none;
                    }
                    .item-title{
                        height: .86rem;
                        line-height: .86rem;
                        align-items: center;
                        @include flex-box();
                        @include justify-content();
                        span{
                            font-size: .28rem;
                            &:nth-of-type(1){
                                align-items: center;
                                @include flex-box();
                            }
                            b{
                                margin-right:.15rem;
                                margin-bottom: .05rem;
                                @include inline-block(.4rem,.4rem);
                                @include bg-image('/static/images/delivery-doing-icon.png');
                            }
                            .success{
                                @include bg-image('/static/images/delivery-success-icon.png');
                            }
                            .error{
                                @include bg-image('/static/images/delivery-fail-icon.png');
                            }
                        }
                    }
                    .error{
                        margin-bottom:.3rem;
                        font-size:.26rem
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
                            overflow: hidden;
                            .line{
                                width:1px;
                                height: 190%;
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
            padding:.4rem 0;
            @extend .order-closed;
            .left-image{
                width: 1.5rem;
                height: 1.5rem;
                position: relative;
                img{
                    display: inline-block;
                    position: absolute;
                }
                @keyframes scaleLoop1{
                    0%{ transform: scale(1); }
                    50%{ transform: scale(1.1); }
                    100%{ transform: scale(1); }
                }
                @keyframes patt4{
                     0%{ transform: rotate(-2deg);}
                     50%{ transform: rotate(1deg);}
                     100%{ transform: rotate(-2deg);}
                }
                .jiance1{
                    z-index:3;
                    animation: scaleLoop1 1s infinite;
                }
                .jiance2{
                    width:.9rem;
                    height: .9rem;
                    overflow: hidden;
                    left:.21rem;
                    top:.13rem;
                    z-index:2;
                    animation: patt4 .3s infinite;
                }
                .jiance3{
                    z-index:1;
                }
            }
            .right-text{
                margin-bottom: .3rem;
            }
        }
        .wait-confirm{
            margin-top:.2rem;
            .order-info{
                padding:0 .4rem;
                margin-bottom: .2rem;
                background-color: #fff;
                h4{
                    color: #333;
                    font-size: .32rem;
                    padding:.35rem 0;
                    .question-icon{
                        margin-left:.1rem;
                        @include inline-block(.24rem,.24rem);
                        @include bg-image('/static/images/storeGold-question.png');
                    }
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
                        justify-content: flex-end;
                        @include flex-box();
                        .txt{
                            border-bottom: 1px solid #C09060;
                        }
                        .show-more{
                            margin-left:.12rem;
                            @include rotate(-90deg);
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
                            &:nth-of-type(3n+2){
                                margin:0 .2rem;
                            }
                            img{
                                width: 100%;
                            }
                        }
                        .single{
                            width: 100%;
                            height: auto;
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
                overflow: hidden;
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
            width: 100%;
            line-height: .88rem;
            text-align: center;
            color: #C09C60;
            b{
                background-color: #eee;
                margin-right: .1rem;
                @include inline-block(.28rem,.28rem);
                @include bg-image('/static/images/refresh-icon.png');
            }
        }
    }
}
.order-popup-wrap{
    width: 4.9rem;
    text-align: center;
    padding-bottom: .5rem;
    background-color: #fff;
    @include border-radius(4px);

    @keyframes roundLoop2{
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }
    .top-img{
        width: 1.08rem;
        height: 1.08rem;
        margin:.4rem auto;
        position: relative;
        img{
            &:nth-of-type(1){
                width:100%;
                position: absolute;
                top:0;
                left:0;
            }
            &:nth-of-type(2){
                animation: roundLoop2 .7s linear infinite;
            }
        }
    }
    h4{
        color: #333;
        font-size: .3rem;
    }
    p{
        color: #999;
        font-size: .24rem;
        margin-top:.15rem;
    }
}
.noun-explan{
    width: 100%;
    min-height: 100vh;
    padding:1.7rem .75rem 0;
    position: absolute;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    overflow: scroll;
    background-color: #fff;
    h3{
        color: #000;
        font-size: .4rem;
        text-align: center;
        margin-bottom: .5rem;
    }
    .each-noun{
        margin-top:.4rem;
        p{
            color: #666;
            font-size: .28rem;
            margin-bottom: .3rem;
            flex-direction: column;
            @include flex-box();
        }
    }
    .close-btn{
        position: absolute;
        bottom: 1.25rem;
        left:50%;
        margin-left:-.22rem;
        width: .44rem;
        height: .44rem;
        @include bg-image('/static/images/close.png');
    }
}
</style>
