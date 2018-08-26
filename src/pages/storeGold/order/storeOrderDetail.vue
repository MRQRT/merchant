<template>
    <div class="storeGoldDetail">
        <!-- 头部标题部分 -->
        <head-top headTitle='订单详情' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体内容 -->
        <!-- 待支付订单 -->
        <div class="main-cont" v-if="status==10 || status==11">
            <!-- 顶部倒计时 -->
            <div class="countDown" v-if="status==10">
                <p class="clock-icon"></p>
                <p class="clock-text">
                    <span>待支付</span>
                    <span>请在{{minu}}分{{secd}}秒内完成支付</span>
                </p>
            </div>
            <!-- 已失效提示 -->
            <div class="order-cancel" v-if="status==11">
                <p class="wraning-icon"></p>
                <p class="clock-text">
                    <span>订单已失效</span>
                    <span>由于您长时间未支付！</span>
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
                    <p class="add">{{orderInfo.address}}</p>
                </div>
            </div>
            <div class="distans"></div>
            <!-- 存金信息 -->
            <div class="bottom-orderInfo">
                <h3>存金信息</h3>
                <div class="order-info">
                    <p>
                        <span>存金类型</span>
                        <span>{{typeJson[orderInfo.productType]}}</span>
                    </p>
                    <p>
                        <span>总克重</span>
                        <span>{{orderInfo.applyWeight}}克</span>
                    </p>
                    <p>
                        <span>数量</span>
                        <span>{{orderInfo.applyQuantity}}件</span>
                    </p>
                    <p>
                        <span>存金方式</span>
                        <span>{{cashJson[orderInfo.cash]}}</span>
                    </p>
                    <div class="" v-if="orderInfo.isLockprice==0">
                        <p>
                            <span>锁价保证金</span>
                            <span>{{orderInfo.ensure_cash}}元</span>
                        </p>
                        <p>
                            <span>锁定金价<b @click="lockPricePopup"></b></span>
                            <span class="special-color">{{orderInfo.lockPrice}}元/克</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="distans"></div>
            <!-- 银行卡 -->
            <div class="bank">
                <span>银行卡</span>
                <span>工商银行(尾号1234)</span>
            </div>
            <!-- 底部按钮 -->
            <div class="pay-btn" v-if="status==10">
                <div class="left-price">
                    <span>锁价保证金</span>
                    <span>{{orderInfo.ensure_cash}}元</span>
                </div>
                <div class="right-btn">支付</div>
            </div>
        </div>
        <!-- 其他状态订单 -->
        <div class="main-cont" v-else>
            <!-- 异常取消状态 -->
            <div class="abnormal-cancel" v-if="status == 8">
                <img src="static/images/shopmsnopass.png" alt="">
                <h3>订单已取消</h3>
                <p>您可以重新填写订单，风里雨里我们在这等你</p>
            </div>
            <div class="distans" v-if="status == 8"></div>
            <!-- 顶部状态 -->
            <div class="top-info">
                <div class="orderNo">
                    <span>订单编号：{{orderInfo.code}}</span>
                    <span class="status" v-if="status!=8">{{iconJson[status].name}}</span>
                </div>
                <div class="create-time">提交时间：{{orderInfo.createTime}}</div>
            </div>
            <div class="distans"></div>
            <!-- 中间进度显示 -->
            <div class="middle-step" v-if="status != 8">
                <div class="step-img">
                    <ul>
                        <li class="step-item" v-for="(item,index) in stepList" :key="index" @click="showTips(1,index,$event,status,isLockOrder)"
                        :class="{'stepSuccess':(iconJson[status].status==1 || iconJson[status].beforeStatus==1) && iconJson[status].iconType>=index,
                        'stepError':iconJson[status].status==2 && iconJson[status].iconType==index,
                        'stepSpecial':iconJson[status].status==3 && (index==3 || index==4),
                        'stepClosed':iconJson[status].status==4 && index==4}">
                            <span class="step-icon"></span>
                            <span class="step-txt" v-if="index==3 && (status==5 || status==9 || status==13)">&nbsp;&nbsp;退货中&nbsp;</span>
                            <span class="step-txt" v-else-if="index==4 && (status==5 || status==9 || status==13)">订单关闭</span>
                            <span class="step-txt" v-else>{{item.name}}</span>
                            <span class="left-line" :class="{'active-line':status==2 && iconJson[status].iconType==(index -1)}"></span>
                            <span class="squre" v-show="squreNum==index"></span>
                        </li>
                    </ul>
                </div>
                <!-- 对应文字提示 -->
                <div class="step-tip" id="reportWrap" v-html="stepTipText"></div>
            </div>
            <div class="distans" v-if="status != 8"></div>
            <!-- 地址信息 -->
            <div class="address-info">
                <div class="left-icon"></div>
                <div class="right-text">
                    <p class="name-tel">
                        <span class="name">{{orderInfo.contact}}</span>
                        <span class="tel">{{orderInfo.telephone | hideMible}}</span>
                    </p>
                    <p class="add">{{orderInfo.address}}</p>
                </div>
            </div>
            <div class="distans"></div>
            <!-- 底部订单信息 -->
            <div class="bottom-orderInfo">
                <h3>存金信息</h3>
                <div class="order-info">
                    <p>
                        <span>存金类型</span>
                        <span>{{typeJson[orderInfo.productType]}}</span>
                    </p>
                    <p>
                        <span>总克重</span>
                        <span>{{orderInfo.applyWeight}}克</span>
                    </p>
                    <p>
                        <span>数量</span>
                        <span>{{orderInfo.applyQuantity}}件</span>
                    </p>
                    <p>
                        <span>存金方式</span>
                        <span>{{cashJson[orderInfo.cash]}}</span>
                    </p>
                    <div class="" v-if="orderInfo.isLockprice==1">
                        <p>
                            <span>锁价保证金</span>
                            <span>{{orderInfo.ensure_cash}}元</span>
                        </p>
                        <p>
                            <span>锁定金价<b @click="lockPricePopup"></b></span>
                            <span class="special-color">{{orderInfo.lockPrice}}元/克</span>
                        </p>
                    </div>
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
                <div class="title" @click="showList">
                    <span>订单追踪</span>
                    <span :class="{'rotate':trackingStatus}"></span>
                </div>
                <ul class="tracking-list" :class="{'showList':trackingStatus}">
                    <div class="line"></div>
                    <li class="tracking-item" v-for="(item,index) in newList">
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
                        <!-- 异常情况 -->
                        <div class="report-btn" v-if="status==5 || status==9 || status==13"><a href="tel:4001689999">联系客服</a></div>
                        <!-- 待确认、已完成情况 -->
                        <div class="report-btn" v-else>
                            <span v-if="status==7 || !reportClick" style="color:#999">已确认</span>
                            <span v-else @click="confirm_order()">确认订单</span>
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
import { MessageBox,Toast,Popup } from 'mint-ui';
/* 请求详情、物流单号、物流信息、订单追踪、确认订单、修改订单 、银行卡信息*/
import { query_detail, query_logistics_mess, query_express_mess, query_status_flow_mes,confirm_order,update_status,query_card_info} from '@/service/getData.js'


    export default {
        data(){
            return{
                orderId:'',            // 订单id
                expressNo:238487737766,// 快递单号
                expressCode:'',        // 物流公司编码
                isLockOrder:0,         // 是否是锁价订单
                isClick:0,             // 进度提示是否是点击显示
                squreNum:null,         // 提示三角显示隐藏
                status:'',             // 订单状态
                timeOut:false,         // 订单是否超时
                popupVisible:false,    // 信息弹窗显示隐藏
                popupNum:'',           // 哪个弹窗显示
                reportClick:true,      // 确认检测报告按钮状态
                trackingStatus:false,  // 订单追踪显示、隐藏
                stepTipText:'',        // 进度提示文字
                minu:'--',             // 倒计时分
                secd:'--',             // 倒计时秒
                typeJson:{
                    '0':'投资金',
                    '1':'首饰',
                },
                cashJson:{
                    '0':'存入克重',
                    '1':'直接变现',
                },
                stepList:[
                    {name:'订单审核'},
                    {name:'物流运输'},
                    {name:'存金检测'},
                    {name:'订单确认'},
                    {name:'订单完成'},
                ],
                iconJson:{
                    /** icon显示样式
                        status: 0:未开始；1:进行中；2:失败；3:退货中；4:订单关闭
                        beforeStatus: 之前状态是否完成
                        iconType: 属于哪个图标
                    **/
                    '0':{name:'待审核',status:1,iconType:0,beforeStatus:1},
                    '1':{name:'审核失败',status:2,iconType:0,beforeStatus:1},
                    '2':{name:'审核通过',status:1,iconType:0,beforeStatus:1},
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
                orderInfo:{
                    code:37467288374467364,
                    createTime:'2018-08-20 12:20:34',
                    status:0,
                    productType:0,
                    applyWeight:3.23,
                    isLockprice:1,
                    cash:0,
                    lockPrice:256.34,
                    ensure_cash:3452.234,
                    applyQuantity:3,
                    contact:'小可爱',
                    telephone:13520842445,
                    address:'内蒙古呼和浩特市赛罕区7号楼602罕区7号楼602'
                },
                orderTrackJson:{
                    '0':{name:'订单已提交'},
                    '1':{name:'订单审核未通过'},
                    '2':{name:'订单审核通过'},
                    '4':{name:'平台已签收'},
                    '5':{name:'存金检测完毕-检测未通过'},
                    '6':{name:'存金检测完毕-检测通过'},
                    '7':{name:'已确认检测报告'},
                    '8':{name:'订单已取消'},
                    '9':{name:'保证金已退还'},
                    '13':{name:'平台已退货'},
                    '14':{name:'订单完成'},
                    '15':{name:'已支付锁价保证金'},
                },
                list: [
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 6,
                        "orderStatus": 1,
                        "createTime": 1535095430000
                    },
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 5,
                        "orderStatus":7,
                        "createTime": 1535095430000
                    },
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 4,
                        "orderStatus": 6,
                        "createTime": 1535095378000
                    },
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 3,
                        "orderStatus": 4,
                        "createTime": 1535095371000
                    },
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 2,
                        "orderStatus": 2,
                        "createTime": 1535095365000
                    },
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 1,
                        "orderStatus": 0, // 已支付保证金
                        "createTime": 1535095362000
                    },
                    {
                        "id": null,
                        "orderId": "123",
                        "addSort": 0,
                        "orderStatus": 0,  // 订单已提交
                        "createTime": 1535095362000
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
                ],
                orderTrackText:'',
                newList:[],
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{
            // 弹窗关闭解除禁止页面滚动
            popupVisible(val){
                if(!this.popupVisible){
                    this.fixed(false)
                }
            },
            // 显示检测报告、物流信息
            stepTipText(val){
                var that = this;
                if(val){
                    this.$nextTick().then(function () { // 物流信息
                        if(that.squreNum==3 && (that.status==9 || that.status==13)){ // 退货中、已关闭既有报告，又有物流
                            that.showReport();
                            that.showDelivery();
                        }else if(that.squreNum==1){ // 物流信息
                            that.showDelivery();
                        }else if((that.squreNum==2 || that.squreNum==3) && that.status!=4){ // 检测报告
                            that.showReport();
                        }
                    }.bind(this))
                }
            },
        },
        methods: {
            // 检测报告弹窗
            showReport(){
                var that = this;
                document.getElementById('report').onclick=function(){
                    that.lookPopup(1)
                }
            },
            // 物流信息弹窗
            showDelivery(){
                var that = this;
                document.getElementById('delivery').onclick=function(){
                    that.lookPopup(0);
                    that.query_express_mess(); // 调用物流信息
                }
            },
            // 锁价解释弹窗
            lockPricePopup(){
                MessageBox({
                  title: '提示',
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
            // 倒计时
            countDown(){
                var countdownMinute = 7;//10分钟倒计时
                var startTimes = new Date('2018-8-23 18:52');//开始时间 new Date('2016-11-16 15:21');
                var endTimes = new Date(startTimes.setMinutes(startTimes.getMinutes()+countdownMinute));//结束时间
                var curTimes = new Date();//当前时间
                var surplusTimes = endTimes.getTime()/1000 - curTimes.getTime()/1000;//结束毫秒-开始毫秒=剩余倒计时间

                // 进入倒计时
                var that = this;
                var countdowns =  window.setInterval(function(){
                    surplusTimes--;
                    that.minu = Math.floor(surplusTimes/60);
                    that.secd = Math.round(surplusTimes%60);
                    console.log(that.minu+':'+that.secd);
                    if(surplusTimes<=0){
                        console.log('时间到！');
                        that.minu = '--';
                        that.secd = '--';
                        clearInterval(countdowns);
                        // 重新调用订单详情函数
                        that.update_status();
                    }
                },1000);

            },
            // 订单追踪显示、隐藏
            showList(){
                this.trackingStatus = !this.trackingStatus;
            },
            // 进度提示文字
            showTips(isClick,index,event,status,islock){
                var text0 = '<p>我们正在马不停蹄地审核您的订单哦，审核结果将在2个工作日内通知到您！请耐心等待～</p>';
                var text1 = `<p>恭喜您，订单审核通过！</p>
                             <p>我们已经安排快递小哥上门取件啦，请留意接听取件电话</p>`;
                var text2 = '<p>订单审核未通过，您可以重新填写订单，风里雨里我们在这里等您！</p>';
                var text3 = '<p>订单审核未通过，锁价定金将在3个工作日内退回至绑定银行卡，您可以重新填写订单，风里雨里我们在这里等您！</p>'
                var text4 = `<p>快递小哥正在用心传递速度，物流单号：<span id="delivery" style="color:#C09C60;border-bottom:1px solid #C09C60">${this.expressNo}</span></p>`;
                var text5 = `<p>亲爱的用户，您的宝贝我们收到啦~</p>
                             <p>物流单号：<span id="delivery" style="color:#C09C60;border-bottom:1px solid #C09C60">${this.expressNo}<span></p>`;
                var text6 = '<p>亲，专业检测师紧锣密鼓地开工啦！1个工作日内就会有结果哦！</p>'
                var text7 = '<p>您的订单检测完毕！请尽快查看并确认<span id="report" style="color:#C09C60;border-bottom:1px solid #C09C60">检测报告</span>哦！</p>'
                var text8 = `<p>亲，只差最后一步啦，快来看看您的<span id="report" style="color:#C09C60;border-bottom:1px solid #C09C60">检测报告</span>吧~三个工作日后将自动确认，如您对检测结果有任何疑问，请联系客服：4008-196-199</p>`
                var text9 = `<p>很抱歉，您的订单检测未通过，查看<span id="report" style="color:#C09C60;border-bottom:1px solid #C09C60">检测报告</span>
                             <p>我们已安排您的宝贝回家，物流单号：<span id="delivery" style="color:#C09C60;border-bottom:1px solid #C09C60">SFXXXXXXXXXX</span></p>`
                var text10 = '<p>恭喜啦，您的黄金成功卖出，T+1个工作日内到账，锁价保证金会同时返还至您的银行卡，具体以银行实际到账时间为准哦！</p>'
                var text11 = '<p>恭喜啦，您的黄金成功卖出，T+1个工作日内到账，具体以银行实际到账时间为准哦！</p>'
                var text12 = '<p>存金已退还，订单关闭</p>'

                var text13 = '<p>很抱歉，您的订单检测未通过，查看<span id="report" style="color:#C09C60;border-bottom:1px solid #C09C60">检测报告</span></p>'
                var textJson = {
                    '0':text0,  // 审核中
                    '2':text1,  // 审核通过
                    '3':text4,  // 物流中
                    '4':text6,  // 检测中
                    '5':text13,  // 检测不通过
                    '6':text8,  // 待确认
                    '9':text9,  // 退货中
                    '13':text12,// 已关闭
                }
                if(isClick){ // 如果是点击显示
                    if(event.currentTarget.classList.contains('stepSuccess')){ // 只有成功状态可点击
                        this.squreNum = index;
                        if(index == 3){ // 第4个图标判断是确认还是退货
                            if(status==5){
                                this.stepTipText=text13;
                            }else{
                                this.stepTipText = (status==6 || status==7) ? text8 : text9;
                            }
                        }else if(index == 4){ // 第5个图标判断是完成还是关闭
                            if(status==7){
                                this.stepTipText = islock ? text10 : text11; // 完成：判断是否锁价
                            }else{
                                this.stepTipText = text12;  // 关闭订单
                            }
                        }else{
                            switch(index){
                                case 0:
                                    this.stepTipText = status==0?text0:text1; // 避免在当前状态点击切换
                                    break;
                                case 1:
                                    this.stepTipText = status==3?text4:text5;
                                    break;
                                case 2:
                                    this.stepTipText = status==4?text6:text7;
                                    break;
                            }
                        }

                    }
                }else{ // 初次进入页面直接显示
                    this.squreNum = index;
                    if(status==1){ // 审核未通过，判断是否锁价
                        this.stepTipText = islock ? text3 : text2;
                    }else if(status==7){ // 已完成订单，判断是否锁价
                        this.stepTipText = islock ? text10 : text11;
                    }else{ // 其他状态
                        this.stepTipText = textJson[status]
                    }
                }
            },
            // 订单追踪数据
            trackingText(){
                var that = this;
                this.list.forEach(function(item){
                    if(item.orderStatus==0 && item.addSort!=0){ // 状态都为0时，判断已锁价
                        that.orderTrackText = that.orderTrackJson[15].name
                    }else if(item.orderStatus==1 && (item.addSort!=1 || item.addSort!=2)){ // 状态都为1时，判断显示审核未通过 or 退换保证金
                        that.orderTrackText = that.orderTrackJson[9].name
                    }
                    else{
                        that.orderTrackText = that.orderTrackJson[item.orderStatus].name
                    }
                    that.newList.push({
                        time:item.createTime,
                        name:that.orderTrackText
                    })
                })
                console.log(this.newList)

            },

            // 请求订单详情数据
            async query_detail(){
                var res = query_detail(this.orderId);
                if(res.code=='000000'){
                    this.orderInfo = res.data;
                    this.status = res.data.status;
                    // 未支付状态调用倒计时函数
                    if(this.orderInfo.status==10){
                        this.countDown();
                    }
                }else{
                    Toast(res.message)
                }
            },
            // 请求物流单号
            async query_logistics_mess(){
                var res = query_logistics_mess(this.orderId,type) // type:0-取货；1-退货
                if(res.code=='000000'){
                    this.expressNo = res.data.expressNo;
                    this.expressCode = res.data.expressCode;
                }else{
                    Toast(res.message)
                }
            },
            // 查询具体物流信息
            async query_express_mess(){
                var res = query_express_mess(this.expressNo,this.expressCode)
                if(res.code=='000000'){
                    this.deliveryList = res.data;
                }else{
                    Toast(res.message)
                }
            },
            // 订单追踪
            async query_status_flow_mes(){
                var res = query_status_flow_mes(this.orderId);
                if(res.code=='000000'){
                    this.list = res.data;
                }else{
                    Toast(rs.message)
                }
            },
            // 确认订单(用户点击确认检测报告调用)
            async confirm_order(){
                var res = confirm_order(this.orderId);
                if(rs.code=='000000'){
                    this.reportClick = false; // 确认订单 => 已确认
                    this.popupVisible = false;
                }
            },
            // 修改订单状态(未支付倒计时结束)
            async update_status(){
                var res = update_status(this.orderId);
                if(res.code=='000000'){
                    this.query_detail(); // 取消成功后再次调用详情数据
                }
            },
            // 请求银行卡信息
            async query_card_info(){
                var res = query_card_info();
                if(res.code=='000000'){

                }
            }
        },
        created(){
            this.orderId = this.$route.query.id;
            this.status = this.$route.query.status;
        },
        mounted(){
            this.trackingText();
            this.showTips(this.isClick,this.iconJson[this.status].iconType,'',this.status,this.isLockOrder);
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
        /* 等待付款状态 */
        .order-cancel{
            background: rgba(188,188,188,1) !important;
        }
        .countDown,.order-cancel{
            width:100%;
            height:1.62rem;
            color:#fff;
            padding:.3rem .4rem;
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
        .distans{
            width:100%;
            height:.2rem;
            background-color: #f8f8f8;
        }
        .abnormal-cancel{
            width: 100%;
            text-align: center;
            background-color: #fff;
            padding:.6rem 0 .4rem;
            img{
                display: inline-block;
                width: 1rem;
                height: 1rem;
                margin:0 auto;
            }
            h3{
                color: #333;
                font-size: .3rem;
                margin:.3rem 0 .2rem;
            }
            p{
                color: #666;
                font-size: .26rem;
            }
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
                        &:nth-of-type(5){
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
                        }
                        .left-line{
                            width: .74rem;
                            height: .4rem;
                            position: absolute;
                            left:-.65rem;
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
    // 物流弹窗
    .delivery-wrap,.report-wrap{
        .top-wrap{
            width: 6.7rem;
            max-height: 8.2rem;
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
                    height: 185%;
                    position: absolute;
                    left:1.1rem;
                    top:.3rem;
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
