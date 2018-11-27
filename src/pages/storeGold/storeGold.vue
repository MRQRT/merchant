<template>
    <div class="storeGold">
        <!-- 头部标题部分 -->
        <head-top headTitle='填写存金订单' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push('/index')">
            <span slot="custom" class="custom" @click="showPopup(0)">存金说明</span>
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont" v-show="!popupVisible">
            <!-- 顶部banner -->
            <div class="top-banner">
                <img src="static/images/storeGold-banner.png" alt="">
                <!-- 实时金价 -->
                <div class="current-price">
                    <div class="text">实时金价(元/克)<span class="question" @click="showPopup(1)"></span></div>
                    <div class="price">{{currentPrice}}</div>
                </div>
            </div>
            <!-- 填写信息部分 -->
            <div class="order-wrap">
                <div class="inner-box">
                    <!-- 顶部元宝 -->
                    <div class="gold-img">
                        <img src="static/images/storeGold-gold.png" alt="">
                    </div>
                    <!-- 预估金额 -->
                    <div class="estimate-price">
                        <span class="txt">预估金额：</span><span class="price">{{estimatePrice | formatPriceTwo}}</span><b> 元</b>
                        <span class="grey-question" @click="showPopup(2)"></span>
                    </div>
                    <!-- 表单部分 -->
                    <div class="form-wrap">
                        <!-- 类型选择 -->
                        <div class="gold-box gold-type">
                            <div class="left">黄金类型</div>
                            <div class="type-right">
                                <span :class="{'type-active':typeNum==0}" @click="chooseType(0)">金条</span>
                                <span :class="{'type-active':typeNum==1}" @click="chooseType(1)">饰品</span>
                            </div>
                        </div>
                        <!-- 黄金总重 -->
                        <div class="gold-box gold-weight">
                            <div class="left">黄金总重</div>
                            <input type="number" name="" v-model="weight" @keyup="checkInput(weight+'')"  @blur="blurInput" placeholder="请输入黄金克重">
                            <span>克</span>
                        </div>
                        <!-- 黄金数量 -->
                        <div class="gold-box gold-num">
                            <div class="left">黄金数量</div>
                            <div class="right">
                                <span @touchstart="decreaseCount">
                                    <img src="static/images/minus-count.png" class="minusNum">
                                </span>
                                <input type="tel" v-model="extractNum" pattern="[0-9]*" @input="inputNum(extractNum)">
                                <span @touchstart="increaseCount">
                                    <img src="static/images/plus-count.png" class="plusNum">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 银行卡 -->
            <div class="gold-bank">
                <div class="binding-bank">
                    <p class="title">银行卡<span>按最终成交价汇款到银行卡</span></p>
                    <!-- 未绑卡状态 -->
                    <div class="bank-card no-bank" v-if="!bankStatus || !loginStatus || !shopStatus" @click="bindingBank()">
                        <p class="txt">暂无绑定银行卡</p>
                        <p class="btn"><span></span>添加银行卡</p>
                    </div>
                    <!-- 已绑卡状态 -->
                    <div class="bank-card has-bank" v-else>
                        <div class="top-part">
                            <div class="left-icon">
                                <img :src="bankInfo.icon" alt="">
                            </div>
                            <div class="right-text">
                                <p>{{bankInfo.name}}</p>
                                <!-- <p class="card-type">{{bankInfo.type}}</p> -->
                                <p class="card-type">储蓄卡</p>
                            </div>
                        </div>
                        <div class="bottom-part">
                            <span>****</span>
                            <span>****</span>
                            <span>****</span>
                            <span>{{bankInfo.code}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 取件地址 -->
            <div class="gold-address">
                <div class="select-address">
                    <p class="title">取件地址</p>
                    <!-- 无地址状态 -->
                    <div class="address-card no-address" v-if="!addressStatus || !loginStatus || !shopStatus" @click="addAddress()">
                        <p class="txt">暂无取件地址</p>
                        <p class="btn"><span></span>创建地址</p>
                    </div>
                    <!-- 有地址状态 -->
                    <div class="address-card has-address" v-else @click="$router.push({path:'/addresslist',query:{from:'storegold',addressId:addressId}})">
                        <div class="left-part">
                            <p class="name-tel">
                                <span class="name">{{receiverInfo.contact}}</span>
                                <span class="tel">{{receiverInfo.telephone | hideMible}}</span>
                            </p>
                            <p class="add" v-if="addressId!=''&&receiverInfo.provinceCityAreaDetail">{{receiverInfo.provinceCityAreaDetail | clearStr}}<span>{{receiverInfo.address}}</span></p>
                            <p class="add" v-else>{{receiverInfo.address | clearStr}}</p>
                        </div>
                        <div class="right-arrow"></div>
                    </div>
                </div>
            </div>
            <!-- 协议部分 -->
            <div class="argument">
                <input type="checkBox" class="check">
				<strong :class="{'change1':bg,'change2':!bg}" @click="changeBg" ref="arg"></strong>
				<router-link to="/storearg" tag="div" class="argument-wrap">
					<span class="txt">我已阅读并同意<b style="color:#C09C60">《存金通商户版用户协议》</b></span>
				</router-link>
            </div>
            <!-- 按钮部分 -->
            <div class="opration-wrap">
                <!-- 未登录按钮 -->
                <div class="login" v-if="!loginStatus" @click="$router.push({path:'/login',query:{redirect:'/storegold'}})">立即登录</div>
                <!-- 已登录按钮 -->
                <div class="other-btn" v-else>
                    <div class="directly-submit" :class="{'submitNo':!submitStatus}" @click="submit(1)">直接提交</div>
                    <div class="lock-price" :class="{'lockNo':!submitStatus}"  @click="submit(2)">
                        <span><b>保证金:</b>{{guaranteeCash | formatPriceTwo}}<b>元</b></span>
                        <span>锁价提交</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 各类弹窗 -->
        <div class="stor_box" v-show="popupVisible">
            <!-- 存金说明 -->
            <div class="inner-box" v-show="popupNum==0">
                <p class="priceTitle">存金说明</p>
                <div class="content" style="margin-top:.4rem;">
                    <div class="mess">
                        <p>1. 重量大于10g，运费、保价费、检测费全免。</p>
                    </div>
                </div>
                <div class="content" style="margin-top:.5rem;">
                    <div class="mess">
                        <p>2. 存入的黄金克重可以直接变现至绑定银行卡，（价格随金价波动变化）。</p>
                    </div>
                </div>
                <div class="content" style="margin-top:.5rem;">
                    <div class="mess">
                        <p>3. 存金通按照上海黄金交易所的实时金价回收，并收取少量手续费：各类投资金手续费0.8元/克，黄金饰品1.2元/克。</p>
                    </div>
                </div>
                 <div class="content" style="margin-top:.5rem">
                    <div class="mess">
                        <p>4. 如提交的存金信息与实际检测结果不符，与用户协商未达成一致时导致交易失败，退回的运费及保价费（按实际发生）由用户承担。</p>
                    </div>
                </div>
                 <div class="content" style="margin-top:.5rem">
                    <div class="mess">
                        <p>5. 由于黄金价格实时波动，预估金额仅供参考。</p>
                    </div>
                </div>
            </div>
            <!-- 金价说明 -->
            <div class="inner-box" v-show="popupNum==1">
                <p class="priceTitle">金价说明</p>
                <div class="content" style="margin-top:.4rem;">
                    <div class="mess">
                        <h3>金价来源</h3>
                        <p>上海黄金交易所交易时间段内，黄金管家金价实时参照上海黄金交易所最新成交价;</p>
                        <p>上海黄金交易所休盘期间，黄金管家金价实时参照国际最新成交价；</p>
                        <p>每周末全球黄金交易所闭盘时，黄金管家金价参照本周国际金价收盘价，金价不发生波动。</p>
                    </div>
                </div>
                <div class="content" style="margin-top:.5rem;">
                    <div class="mess">
                        <h3>交易所交易时间</h3>
                        <p>1.上海交易所交易时间：每周一至周五20:00-次日2:30，9:00-11:30；13:30-15:30;</p>
                        <p>2.全球黄金交易所闭盘时间：每周六早6:00至周一早8:00（夏令时），每周六早7:00至周一早7:00（冬令时)；</p>
                        <p>3.法定节假日及交易所公告的休市日，交易所的交易时间可能会有所调整。</p>
                    </div>
                </div>
            </div>
            <!-- 预估金额 -->
            <div class="inner-box" v-show="popupNum==2">
                <p class="priceTitle">预估金额</p>
                <div class="content" style="margin-top:.4rem;">
                    <div class="mess">
                        <p>预估金额为平台根据您的黄金类型、重量，根据实时金价给您计算预估价以做参考。平台将对您的黄金进行检测，最终成交价格以实际检测报告为准。</p>
                    </div>
                </div>
            </div>
            <div class="closePopup">
                <img src="static/images/close.png"  @click="closePop()">
            </div>
        </div>
        <!-- 输入验证码弹窗 -->
        <mt-popup v-model="popupVisible1" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="verifi-wrap">
                <span class="close-btn" @click="closeVerifi()">×</span>
                <!-- 顶部信息 -->
                <div class="top-part">
                    <h3>请输入短信验证码</h3>
                    <p>锁价保证金</p>
                    <p class="price">¥{{ensureCash|formatPriceTwo}}</p>
                </div>
                <!-- 输入框 -->
                <div class="bottom-part">
                    <div class="lock-single-price">
                        <span>锁定金价</span>
                        <span>{{lockPrice|formatPriceTwo}}元/克</span>
                    </div>
                    <div class="input-wrap">
                        <span>{{verifiCode[0]}}</span>
                        <span>{{verifiCode[1]}}</span>
                        <span>{{verifiCode[2]}}</span>
                        <span>{{verifiCode[3]}}</span>
                        <span>{{verifiCode[4]}}</span>
                        <span>{{verifiCode[5]}}</span>
                        <input type="tel" ref="verifiInput" maxlength="6" v-model="verifiCode" autofocus="autofocus" v-on:input="checkVerifi()">
                    </div>
                </div>
            </div>
        </mt-popup>
        <!-- 正在支付中弹窗 -->
        <mt-popup v-model="popupVisible2" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="pay-wrap">
                <div class="top-img">
                    <img src="static/images/pay-inner.png" alt="">
                    <img src="static/images/pay-outer.png" alt="">
                </div>
                <p>处理中，请稍候...</p>
            </div>
        </mt-popup>
        <!-- 重试验证码弹窗 -->
        <mt-popup v-model="popupVisible3" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="verifi-popup-wrap">
                <div class="top-text">
                    验证码错误，请重试
                </div>
                <div class="btn-wrap">
                    <span @click="cancleVerifi()">取消</span>
                    <span v-if="!countdownStatus">重试<b>({{countDownSec}}s)</b></span>
                    <span v-else @click="againVerifi()" class="active">重试</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { clearNoNum } from '../../config/mUtils.js';
import { MessageBox,Toast,Popup } from 'mint-ui';
import { mapState,mapMutations } from 'vuex'
import { bizCloseCheck, shop_status, query_card_info, query_shop_address_list, add_recycle_order_check, add_recycle_order, pay_beforehand_order, pay_formal_order, query_status,query_shop_address_detail,margin_rate,merchant_open_apply_status } from '@/service/getData.js'


    export default {
        data(){
            return{
                loginStatus:true,    // 是否登录
                dealStatus:true,     // 是否在交易时段
                bankStatus:false,    // 是否绑定银行卡
                addressStatus:false, // 是否选择地址
                typeNum:null,        // 存金类型选择样式
                weight:'',           // 存金克重
                extractNum:1,        // 存金数量
                bg:true,             // 协议是否已读
                popupNum:'',         // 控制哪个弹窗显示
                popupVisible:false,  // 全屏弹窗
                btnCtroller:true,    // 按钮是否可以点击
                popupVisible1:false, // 验证码弹窗
                popupVisible2:false, // 支付中弹窗
                popupVisible3:false, // 重试验证码弹窗
                orderId:'',          // 订单创建成功后的ID
                ensureCash:'',       // 支付时的保证金
                lockPrice:'',        // 支付时的锁定金价
                verifiCode:[],       // 验证码
                bankCardId:2,        // 银行卡ID
                addressId:'',        // 查询地址ID
                detailAddress:'',    // 传给后台的详细地址
                screenHeight: document.documentElement.clientHeight,//记录高度值(这里是给到了一个默认值)
                bankInfo:'',         // 银行卡信息
                receiverInfo:'',     // 收货人信息
                addressId:'',        // 地址id
                countDownSec:50,     // 重试验证码倒计时
                countdownStatus:false,// 重试按钮是否可以点击
                marginRate:10,         // 锁加保证金比例
            }
        },
        components:{
            headTop,
        },
        computed: {
            ...mapState([
                'currentPrice','accessToken','shopId','shopStatus','storeOrderInfo'
            ]),
            // 预估金额
            estimatePrice(){
                return (this.weight * this.currentPrice).toFixed(2);
            },
            // 保证金
            guaranteeCash(){
                var val = this.estimatePrice * (this.marginRate/100);
                var newVal = parseFloat(val).toFixed(3);
                return newVal.substring(0,newVal.toString().length - 1);
            },
            // 提交按钮是否可以点击
            submitStatus(){
                if(this.typeNum==null || this.weight==0 || !this.bg || !this.bankStatus || !this.addressStatus){
                    return false;
                }else{
                    return true;
                }
            }
        },
        watch:{
            /*实时金价*/
			currentPrice(val){
				return val
			},
            popupVisible1(val){
                val ? this.fixed(true): this.fixed(false)
            },
        },
        methods: {
            ...mapMutations([
                'RECORD_SHOPSTATUS','RECORD_ACCESSTOKEN','RECORD_STOREORDERINFO'
            ]),
            //存金说明弹框
			showPopup(num){
				this.popupVisible = true;
                this.popupNum = num;
			},
            //关闭弹窗
            closePop(){
                this.popupVisible = false;
            },
            //输入内容保留1位小数
			checkInput(val){
				this.weight = clearNoNum(val,2);
                if(this.weight>100000){
                    Toast('单笔订单不得超过100000克')
                    this.weight = 100000;
                }
            },
            blurInput(){
                var value = this.weight;
                var flagRex =/^0/;
                if(value>=1){
                    if(flagRex.test(value)){
                       Toast('请输入正确克重')
                       this.weight = '';
                   }
                }

            },
            //提金数量减1
            decreaseCount(){
                if(this.extractNum==1){
                    return;
                }
                this.extractNum--;
            },
            //设置提金加1
            increaseCount(){
                this.extractNum++;
                if(this.extractNum>100){
                    Toast('单笔订单不得超过100件');
                    this.extractNum = 100;
                    return;
                }
            },
            //监听数量输入
            inputNum(val){
                if(! /^\d+$/.test(val)){
                    Toast('只能输入整数')
                }
                if(this.extractNum>100){
                    Toast('单笔订单不得超过100件');
                    this.extractNum = 100;
                }
            },
            //选择存金类型
            chooseType(num){
                this.typeNum = num;
            },
            //协议阅读与否
            changeBg(){
                this.bg=!this.bg;
            },
            //点击绑卡操作
            bindingBank(){
                if(this.loginStatus){
                    if(!this.shopStatus){
                        this.showMessage(1)  // 提示审核未通过
                    }else{
                        this.$router.push({
                            path:'/bindingbank',
                            query:{
                                from:'storegold'
                            }
                        })
                    }
                }else{
                    this.$router.push({  // 跳转登录页
                        path:'/login',
                        query:{
                            redirect:'/storegold'
                        }
                    })
                }
            },
            //点击新增地址
            addAddress(){
                if(this.loginStatus){
                    if(!this.shopStatus){
                        this.showMessage(2)
                    }else{
                        this.$router.push({
                            path:'/addaddress',
                            query:{
                                from:'/storegold'
                            }
                        })
                    }
                }else{
                    this.$router.push({  // 跳转登录页
                        path:'/login',
                        query:{
                            redirect:'/storegold'
                        }
                    })
                }
            },
            //关闭重试验证码弹窗
            cancleVerifi(){
                this.popupVisible3 = false;
                this.verifiCode = []; // 将之前验证码清除
                this.$router.push({ // 跳转待支付订单详情页
                    path:'/storeorderdetail',
                    query:{
                        id:this.orderId,
                        status:10
                    }
                })
            },
            //显示重试验证码弹窗
            againVerifi(){
                this.popupVisible3 = false; // 将重试验证码弹窗关闭
                this.popupVisible1 = true;  // 显示验证码弹窗
                this.verifiCode = [];       // 将之前验证码清除
                this.requestVerifi(1);      // 调用另一个获取短信验证码接口
            },
            // 获取最新商户审核信息
            async merchant_open_apply_status(){
                var res = await merchant_open_apply_status();
                if(res.code=='000000'){
                    if(res.data){
                        this.margin_rate();
                    }
                }else{
                    Toast(res.message)
                }
            },
            //请求锁价保证金比例
            async margin_rate(){
                var res = await margin_rate();
                if(res.code=='000000'){
                    this.marginRate = res.data;
                }else{
                    Toast(res.message)
                }
            },
            //判断店铺状态
            async shop_status(){
                var res = await shop_status();
                if(res.code=='000000'){
                    this.RECORD_SHOPSTATUS(res.data)
                }else if(res.code=='000004'){ // 用户未登录
                    this.RECORD_ACCESSTOKEN('');
                }else{
                    Toast(res.message);
                }
            },
            //判断是否在交易时段
            async bizCloseCheck(){
                var res = await bizCloseCheck(4);
                if(res.code=='000000'){
                    this.dealStatus = res.data == 0 ? true : false;
                    if(this.dealStatus){
                        if(this.btnCtroller){
                            this.btnCtroller=false
                            this.marginRate == 0 ? this.showMessage(6) : this.showMessage(5);
                        }else{
                            Toast('频繁操作～')
                        }
                    }else{
                        Toast('非交易时段不能锁价提交，可以直接提交')
                    }
                }else{
                    Toast(res.message)
                }
            },
            //获取银行卡信息
            async queryBank(){
            	var res = await query_card_info();
            	if(res.code=='000000'){
                    if(res.data){
                        this.bankStatus = true;
    					this.bankInfo = res.data;
                        this.RECORD_SHOPSTATUS(true);    // 店铺审核通过
                    }else{
                        this.bankStatus = false;         // 未绑卡
                    }
				}else{
                    Toast(res.message)
                }
            },
            //获取地址信息
            async queryAddress(){
                var res = await query_shop_address_list();
                if(res.code == '000000'){
                    var addressArray = res.data.content;
                    if(addressArray.length == 0){
                        this.addressStatus = false;
                        return;
                    }else{
                        this.addressStatus = true;
                        this.receiverInfo = addressArray[0];
                        this.detailAddress = addressArray[0].address;
                        this.addressId = addressArray[0].id;
                        // 如果有默认地址取默认
                        for(let i=0; i<addressArray.length;i++){
                            if(addressArray[i].defaults){
                                this.receiverInfo = addressArray[i];
                                this.detailAddress = addressArray[i].address;
                                this.addressId = addressArray[i].id;
                            }
                        }

                    }
                }
            },
            //关闭验证码弹窗(取消订单)
            closeVerifi(){
                this.popupVisible1 = false;
                this.$router.push({ // 跳转待支付订单详情页
                    path:'/storeorderdetail',
                    query:{
                        id:this.orderId,
                        status:10
                    }
                })
            },
            // 选择地址后回调
            async query_shop_address_detail(){
                var res = await query_shop_address_detail(this.addressId);
                if(res.code=='000000'){
                    this.addressStatus = true;
                    this.receiverInfo = res.data;
                    this.detailAddress = res.data.provinceCityAreaDetail + res.data.address;
                }
            },
            //点击按钮提交函数
            async submit(num){
                var res = await add_recycle_order_check(); // 再次判断店铺是否通过审核
                if(res.code=='000000'){
                    this.RECORD_SHOPSTATUS(true)
                    if(this.submitStatus){     // 按钮可点击状态
                        if(num==2){            // 如果是锁价提交，判断是否在交易时段内
                            this.bizCloseCheck();
                        }else{
                            if(this.btnCtroller){
                                this.btnCtroller=false
                                this.showMessage(4);
                            }else{
                                Toast('频繁操作～')
                            }
                        }
                    }else{
                        this.checkInfo();
                    }
                }else{
                    this.showMessage(3);
                    this.RECORD_SHOPSTATUS(false)
                }
                // if(!this.shopStatus){  // 店铺未通过审核
                //     this.showMessage(3);
                // }
                // if(this.submitStatus){     // 按钮可点击状态
                //     if(this.btnCtroller){
                //         this.btnCtroller=false
                //         num == 1 ? this.showMessage(4) : this.showMessage(5);
                //     }else{
                //         Toast('频繁操作～')
                //     }
                // }
            },
            //检测页面哪一项信息未填写
            checkInfo(){
                if(this.typeNum==null){
                    Toast('请选择黄金类型～')
                }else if(this.weight==''){
                    Toast('请输入黄金克重～')
                }else if(!this.bankStatus){
                    Toast('请完善银行卡信息～')
                }else if(!this.addressStatus){
                    Toast('请完善地址信息～')
                }
            },
            //各类提示弹窗
            showMessage(num){
                var text1 = `<div style="text-align:center">店铺审核通过后，再进行绑卡操作</div>`;
                var text2 = `<div style="text-align:center">店铺审核通过后，再进行新增地址操作</div>`;
                var text3 = `<div style="text-align:center">店铺审核通过后，方可存金</div>`;
                var text4 = '订单提交后，我们将通知顺丰小哥上门收件并按照您的订单金额全额保价，快递费和保价费将由您自己承担，在确认订单后收取快递费和保价费。'
                var text5 = `<div>订单提交后，我们将通知顺丰小哥上门收件并按照您的订单金额全额保价，快递费和保价费将由您自己承担，在确认订单后收取快递费和保价费。</div>
                             <div>您选择锁价后，将收取预估金价的${this.marginRate}%作为保证金，订单完成后保证金将退回到您绑定的银行卡中。</div>`
                var text6 = `<div>订单提交后，我们将通知顺丰小哥上门收件并按照您的订单金额全额保价，快递费和保价费将由您自己承担，在确认订单后收取快递费和保价费。</div>
                             <div>您当前选择锁价提交，平台已将您的锁价保证金优惠至0元。</div>`

                switch(num){
                    case 1:
                        MessageBox({
                          title: '温馨提示',
                          message:text1 ,
                          confirmButtonText: '我知道了'
                        })
                    break;
                    case 2:
                        MessageBox({
                          title: '温馨提示',
                          message:text2,
                          confirmButtonText: '我知道了'
                        })
                    break;
                    case 3:
                        MessageBox({
                          title: '温馨提示',
                          message:text3,
                           confirmButtonText: '我知道了'
                        })
                    break;
                    case 4:
                        MessageBox({
                          title: '温馨提示',
                          message:text4,
                          confirmButtonText: '确认',
                          showCancelButton:true,
                          closeOnClickModal:false,
                      }).then(action => {
                            if(action == 'confirm'){
                                this.directlyOrder(false)
                            }else{
                                this.btnCtroller = true;
                            }
                      })
                    break;
                    case 5:
                        MessageBox({
                          title: '温馨提示',
                          message:text5,
                          confirmButtonText: '确认',
                          showCancelButton:true,
                          closeOnClickModal:false,
                        }).then(action => {
                            if(action == 'confirm'){
                                this.lockPriceOrder()
                            }else{
                                this.btnCtroller = true;
                            }
                        })
                    break;
                    case 6:
                        MessageBox({
                          title: '温馨提示',
                          message:text6,
                          confirmButtonText: '确认',
                          showCancelButton:true,
                          closeOnClickModal:false,
                        }).then(action => {
                            if(action == 'confirm'){
                                this.directlyOrder(true);
                            }else{
                                this.btnCtroller = true;
                            }
                        })
                    break;

                }

            },
            //直接提交创建订单
            async directlyOrder(isLockOrder){
                var res = await add_recycle_order(this.extractNum,this.weight,this.typeNum,isLockOrder,true,this.receiverInfo.contact,this.receiverInfo.telephone,this.detailAddress)
                if(res.code=='000000'){
                    this.orderId = res.data.id;
                    this.$router.push({
                        path:'/storeresult',
                        query:{
                            id:this.orderId,
                            status:1,
                        }
                    });
                }else{
                    Toast(res.message);
                    this.btnCtroller = true;  // 按钮恢复可点状态
                }
            },
            //锁价提交创建订单
            async lockPriceOrder(){
                var that = this;
                // 创建订单
                var res = await add_recycle_order(this.extractNum,this.weight,this.typeNum,true,true,this.receiverInfo.contact,this.receiverInfo.telephone,this.detailAddress)
                if(res.code=='000000'){
                    this.orderId = res.data.id;
                    this.ensureCash = res.data.ensureCash;
                    this.lockPrice = res.data.lockPrice;
                    this.popupVisible1 = true;    // 显示验证码弹窗
                    this.requestVerifi(0);        // 调用预下单函数，发送验证码函数
                }else{
                    Toast(res.message);
                    this.btnCtroller = true;  // 按钮恢复可点状态
                }
            },
            //检测输入的支付验证码
            checkVerifi(){
                var res = /^[0-9]*$/g;
                if(this.verifiCode.length==6){
                    this.popupVisible1 = false;     // 关闭验证码弹窗
                    this.$refs.verifiInput.blur();  // 隐藏键盘
                    this.popupVisible2 = true;      // 显示正在支付动画
                    this.checkoutVerifi();          // 校验验证码是否正确
                }
            },
            //支付预下单（发送验证码函数）
            async requestVerifi(countType){
                var res = await pay_beforehand_order(this.orderId,countType);
                if(res.code=='000000'){
                    this.popupVisible1 = true;    // 显示验证码弹窗
                }else{
                    this.popupVisible1 = false;  // 关闭验证码弹窗
                    this.btnCtroller = true;     // 按钮恢复可点状态
                    Toast(res.message)
                }
            },
            // 支付正式下单 (校验验证码)
            async checkoutVerifi(){
                var that = this;
                var res = await pay_formal_order(this.orderId,this.verifiCode);
                if(res.code=='000000'){
                    var timesRun = 0;
                    window.timer = setInterval(function(){
                        timesRun += 1000;
                        that.query_status()       // 隔1秒查询一次状态

                        if(timesRun==120000){    // 2min后自动跳转待支付详情页
                            this.popupVisible2 = false; // 关闭处理中动画
                            that.$router.push({
                                path:'/storeorderdetail',
                                query:{
                                    id:that.orderId,
                                    status:10,
                                }
                            })
                        }
                    },1000)
                }else if(res.code=='200211'){ // 验证码错误显示重试对话框
                    this.popupVisible2 = false; // 关闭处理中动画
                    this.countdownStatus = false; // 将重试按钮置为不可点击
                    this.popupVisible3 = true;  // 显示重试弹窗
                    var timer1 = setInterval(function(){
                        that.countDownSec--
                        if(that.countDownSec<=0){
                            clearInterval(timer1);
                            that.countdownStatus=true;
                            that.countDownSec=50;
                        }
                    },1000)
                }else{
                    this.popupVisible2 = false;
                    this.btnCtroller = true;
                    Toast(res.message)
                }
            },
            //间隔查询订单状态
            async query_status(){
                var that = this;
                var res = await query_status(this.orderId);
                if(res.code=='000000'){
                    if(res.data.pays==1){          // 存金支付成功
                        this.popupVisible2 = false; // 关闭处理中动画
                        this.$router.push({
                            path:'/storeresult',
                            query:{
                                id:this.orderId,
                                status:1
                            }
                        })
                    }else if(res.data.pays==2){     // 存金支付失败
                        this.popupVisible2 = false; // 关闭处理中动画
                        this.$router.push({
                            path:'/storeresult',
                            query:{
                                id:this.orderId,
                                status:0,
                                paysFailReason:res.data.paysFailReason
                            }
                        })
                    }
                }
            },

        },
        created(){
            if(this.storeOrderInfo){
                this.weight = this.storeOrderInfo.weight;
                this.extractNum = this.storeOrderInfo.extractNum;
            }
        },
        mounted(){
            this.loginStatus = this.accessToken ? true : false;
            //登录情况下请求银行卡信息和地址
            if(this.loginStatus){
                this.shop_status();
                this.queryBank();
                this.merchant_open_apply_status();
                if(this.$route.query.addressId){
                    this.addressId = this.$route.query.addressId;
                    this.query_shop_address_detail()
                }else{
                    this.queryAddress();
                }
            }


            window.onresize = () => {
                var that = this;
                var h=document.documentElement.clientHeight;
                var windowsize = document.documentElement.clientWidth;

                // 判断是pc还是移动端
    			if(windowsize>768 || windowsize==768){
    				that.pcStatus=true
    			}else{
    				that.pcStatus=false
    			}
                //处理键盘弹出的沉底按钮顶上去的兼容问题
		    	if((this.screenHeight-h)>50){
                    if(!this.loginStatus){
						document.querySelector('.login').style.position = 'relative'
					}else{
						document.querySelector('.other-btn').style.position = 'relative'
					}
		    	}else{
                    if(!this.loginStatus){
						document.querySelector('.login').style.position = 'fixed'
					}else{
                        document.querySelector('.other-btn').style.position = 'fixed'
					}
		    	}
            }
        },
        beforeRouteLeave (to, from, next) { // 离开此路由时清除定时器
            if(window.timer){
                clearInterval(window.timer)
            }
            // 跳转路由时需保存所填写的订单信息
            if(to.path=='/addaddress' || to.path=='/addresslist' || to.path=='/bindingbank' || to.path=='/storearg'){
                var obj = {
                    weight:this.weight,
                    extractNum:this.extractNum
                }
                this.RECORD_STOREORDERINFO(obj)
            }else{
                this.RECORD_STOREORDERINFO('')
            }
            next()
        }
    }

</script>

<style media="screen">
.mint-popup{
    border-radius: .2rem !important;
}
.mint-msgbox-wrapper>.mint-msgbox{
    width:5rem !important;
    border-radius: 0 !important;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    color: #333 !important;
    font-size: .26rem !important;
}
.mint-msgbox-wrapper .mint-msgbox-confirm, .mint-msgbox .mint-msgbox-btns .mint-msgbox-cancel{
    color:#C09C60 !important;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    text-align: left !important;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    padding:.1rem .2rem !important;
}
.mint-msgbox .mint-msgbox-btns .mint-msgbox-cancel{
    border-right:1px solid #eee !important;
}
</style>

<style scoped lang="scss">
@import '../../sass/mixin';
.storeGold{
    width:100%;
    min-height: 100vh;
    .main-cont{
        position: relative;
        padding-top:.88rem;
        padding-bottom: .98rem;
        .top-banner{
            width:100%;
            height: 4.42rem;
            text-align: center;
            // padding-top:.4rem;
            position: relative;
            z-index:8;
            // @include bg-image('/static/images/storeGold-banner.png');
            img{
                width:100%;
                height: 4.42rem;
            }
            .current-price{
                width:100%;
                color: #DDC899;
                text-align: center;
                position: absolute;
                top:.4rem;
                .text{
                    font-size: .28rem;
                    margin-bottom: .2rem;
                    font-family:PingFangSC-Regular;
                    .question{
                        display: inline-block;
                        width: .31rem;
                        height: .31rem;
                        margin-left:.1rem;
                        vertical-align: -.04rem;
                        @include bg-image('/static/images/storeGold-question.png');
                    }
                }
                .price{
                    font-size: .66rem;
                    font-weight: bold;
                    font-family:DINAlternate-Bold;
                }
            }
        }
        .order-wrap{
            width:100%;
            padding:0 .4rem;
            position: relative;
            z-index: 9;

            .inner-box{
                width:100%;
                height: 7.54rem;
                margin-top:-2.4rem;
                padding-top:.5rem;
                background-color: #fff;
                @include box-shadow(8px 6px 24px rgba(0,0,0,0.06));
                .gold-img{
                    width: 2.31rem;
                    height: 1.14rem;
                    margin:0 auto;
                    img{
                        width: 100%;
                    }
                }
                .estimate-price{
                    width: 100%;
                    text-align: center;
                    color: #000;
                    font-size: .28rem;
                    margin-top:.5rem;
                    .txt{
                        font-family:PingFangSC-Regular;
                    }
                    .price{
                        font-size: .5rem;
                        font-weight: 500;
                        font-weight: 500;
                        font-family:DINAlternate-Bold;
                    }
                    b{
                        color: #333;
                    }
                    .grey-question{
                        display: inline-block;
                        width: .3rem;
                        height: .3rem;
                        vertical-align: -.04rem;
                        @include bg-image('/static/images/storeGold-grey.png');
                    }
                }
                .form-wrap{
                    width: 100%;
                    padding:.5rem .35rem 0;
                    .gold-box{
                        width: 100%;
                        height:.88rem;
                        line-height: .88rem;
                        @include flex-box();
                        @include justify-content();
                        .left{
                            color: #000;
                            font-size: .32rem;
                            font-weight: 400;
                        }
                    }
                    .gold-type{
                        .type-right{
                            width:4.4rem;
                            @include flex-box();
                            @include justify-content();
                            span{
                                display: inline-block;
                                width:2.1rem;
                                height:.88rem;
                                color: #666;
                                font-size: .28rem;
                                text-align: center;
                                border:1px solid #eee;
                                @include border-radius(3px);
                            }
                            .type-active{
                                color: #C09C60;
                                border:1px solid #C09C60;
                                background:#f8f4eb;
                            }
                        }

                    }
                    .gold-weight{
                        margin:.4rem 0;
                        position:relative;
                        input{
                            width: 4.4rem;
                            height:.88rem;
                            color: #666;
                            font-size: .28rem;
                            padding-left:.3rem;
                            padding-right:.8rem;
                            background-color: rgba(248,248,248,1);
                            @include border-radius(4px);
                        }
                        span{
                            color: #666;
                            font-size: .28rem;
                            position: absolute;
                            right:.3rem;
                        }
                        ::-webkit-input-placeholder{
                    		font-weight: normal;
                    		color:#BCBCBC;
                    		line-height: normal;
                    	}
                    	::-moz-placeholder{
                    		font-weight: normal;
                    		color:#BCBCBC;
                    	}
                    	:-moz-placeholder{
                    		font-weight: normal;
                    		color:#BCBCBC;
                    	}
                    	:-ms-input-placeholder{
                    		font-weight: normal;
                    		color:#BCBCBC;
                    	}
                    }
                    .gold-num{
                        .right{
                            width: 4.4rem;
                            height:.88rem;
                            background-color: rgba(248,248,248,1);
                            align-items: center;
                            @include flex-box();
                            span{
                                width:20%;
                                text-align: center;
                                line-height: .44rem;
                                padding-top:.1rem;
                            }
                            input{
                                width:60%;
                            	height:.5rem;
                            	line-height: .5rem;
                            	border:none;
                            	outline-style: none;
                            	text-align: center;
                                color: #666;
                            	font-size:.28rem;
                                background-color: rgba(248,248,248,1);
                            }
                            .minusNum, .plusNum{
                                width:.44rem;
                                height:.44rem;
                            }
                        }
                    }
                }
            }
        }
        .bank-card, .address-card{
            width:100%;
            height: 2.6rem;
            text-align: center;
            padding:.4rem;
            @include bg-image('/static/images/bank-card.png');
            .txt{
                color: #fff;
                font-size: .34rem;
                font-family:PingFangSC-Medium;
                margin-bottom: .4rem;
            }
            .btn{
                width: 2.74rem;
                height: .88rem;
                text-align: center;
                line-height: .88rem;
                color: #fff;
                font-size: .3rem;
                font-family:PingFangSC-Regular;
                margin:0 auto;
                border:1px solid #fff;
                @include border-radius(.44rem);
                span{
                    display: inline-block;
                    width: .3rem;
                    height: .3rem;
                    margin-right:.1rem;
                    vertical-align: -.04rem;
                    @include bg-image('/static/images/add.png');
                }
            }
        }
        .gold-bank{
            width: 100%;
            padding:0 .4rem;
            margin-top:.8rem;
            .binding-bank{
                .title{
                    color: #333;
                    font-size: .34rem;
                    font-weight: bold;
                    margin-bottom: .3rem;
                    font-family:PingFangSC-Medium;
                    @include flex-box();
                    @include justify-content();
                    span{
                        color: #BCBCBC;
                        font-size: .24rem;
                    }
                }
                .has-bank{
                    color: #fff;
                    .top-part{
                        margin-bottom: .4rem;
                        justify-content: flex-start;
                        @include flex-box();
                        .left-icon{
                            width: .7rem;
                            height: .7rem;
                            background-color: #fff;
                            position: relative;
                            @include border-radius(50%);
                            img{
                                width:100%;
                                // display: inline-block;
                                // border:1px solid #eee;
                                // @include border-radius(50%);
                                // @include center(.55rem,.55rem);
                            }
                        }
                        .right-text{
                            text-align: left;
                            margin-left:.2rem;
                            p{
                                font-size: .34rem;
                                font-weight: bold;
                                font-family:PingFangSC-Medium;
                            }
                            .card-type{
                                font-weight: normal;
                                font-size: .24rem;
                            }
                        }
                    }
                    .bottom-part{
                        font-size: .38rem;
                        padding-left:.1rem;
                        span{
                            display: inline-block;
                            margin-right:.3rem;
                            &:last-child{
                                font-size: .38rem;
                            }
                        }
                    }
                }
            }
        }
        .gold-address{
            @extend .gold-bank;
            .title{
                color: #333;
                font-size: .34rem;
                font-weight: bold;
                margin-bottom: .3rem;
                font-family:PingFangSC-Medium;
            }
            .has-address{
                color:#fff;
                text-align: left;
                padding:.4rem .2rem .4rem .4rem;
                align-items: center;
                @include justify-content();
                @include flex-box();
                .left-part{
                    width:90%;
                    .name-tel{
                        font-size: .32rem;
                        margin-bottom: .2rem;
                        .name{
                            margin-right:.2rem;
                        }
                    }
                    .add{
                        font-size: .26rem;
                        @include overflow();
                    }
                }
                .right-arrow{
                    width: .44rem;
                    height: .44rem;
                    @include bg-image('/static/images/white-arrow.png');
                }
            }
            .address-card{
                @include bg-image('/static/images/address-card.png');
            }
        }
        .argument {
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            margin:.6rem auto 0;
            padding-left: .4rem;
            position: relative;
            .check {
                display: none;
            }
            strong {
                width: .24rem;
                height: .24rem;
                position: absolute;
                left: .4rem;
                top: .35rem;
            }
            .change1 {
                background: url('/static/images/store-readed.png') no-repeat;
                background-size: 100% 100%;
            }
            .change2 {
                background: url('/static/images/store-read.png') no-repeat;
                background-size: 100% 100%;
            }
            .argument-wrap {
                width: 100%;
                height: 1rem;
                .txt {
                    font-size: .24rem;
                    color: #888;
                    margin-left: .38rem;
                    position: absolute;
                    left: .4rem;
                }
            }
        }
        .opration-wrap{
            width: 100%;

            .login{
                width: 100%;
                height: .98rem;
                color: #FEFEFE;
                font-size: .34rem;
                text-align: center;
                line-height: .98rem;
                background-color: #DDC899;
                position: fixed;
                bottom: 0;
                z-index: 10;
            }
            .other-btn{
                width:100%;
                height:.98rem;
                text-align: center;
                line-height: .98rem;
                position: fixed;
                bottom: 0;
                z-index: 10;
                @include flex-box();

                .submitNo{
                    background-color: #eee3cb !important;
                }
                .lockNo{
                    background-color: #bcbcbc !important;
                }
                .directly-submit{
                    width:30%;
                    color:#FEFEFE;
                    background-color: #DDC899;
                }
                .lock-price{
                    width:70%;
                    color: #fff;
                    background-color: #000;
                    span{
                        &:nth-of-type(1){
                            font-size: .32rem;
                            font-weight: bold;
                            margin-right:.1rem;
                            b{
                                font-size:.24rem;
                                font-weight: normal;
                            }
                        }
                        &:nth-of-type(2){
                            font-size: .34rem;
                            font-family:PingFangSC-Regular;
                        }
                    }
                }
            }
        }
    }
    .stor_box{
    	width: 100%;
        min-height:100vh;
    	background-color: #fff;
        overflow: scroll;
    	// position: fixed;
    	top: 0;
        left:0;
        right:0;
    	z-index: 9;
    	padding: 0 .56rem;
        flex-direction: column;
        @include flex-box();
        @include justify-content();

        .priceTitle{
        	font-size: .38rem;
        	color: #000;
        	height: 2.6rem;
        	line-height: 3.5rem;
        	text-align: center;
        	border-bottom: 1px solid #eeeeee;
        	vertical-align: center;
        }
        .closePopup{
        	width: 100%;
        	height: 2.5rem;
            line-height: 2.5rem;
        	text-align: center;
            position: relative;
            img{
            	width: .44rem;
            	height: .44rem;
            }
        }
        .mess{
        	font-size: .28rem;
        	color: #666666;
            line-height: .45rem;
            h3{
                color: #000;
                font-size:.28rem;
                margin-bottom: .2rem;
                font-family:PingFangSC-Regular;
            }
        }
    }
    .verifi-wrap{
        width: 6.7rem;
        padding:.4rem .3rem;
        text-align: center;
        background-color: #fff;
        position: relative;
        @include border-radius(.2rem);
        .close-btn{
            font-size: .6rem;
            position: absolute;
            left:.25rem;
            top:.05rem;
        }
        .top-part{
            border-bottom: 1px solid #eee;
            h3{
                color: #000;
                font-size: .32rem;
                margin-bottom: .25rem;
            }
            p{
                color: #999;
                font-size: .24rem;
            }
            .price{
                color: #333;
                font-size: .6rem;
                margin-bottom: .4rem;
                font-family:DINAlternate-Bold;
            }
        }
        .bottom-part{
            .lock-single-price{
                width: 100%;
                color: #666;
                font-size: .28rem;
                padding:.35rem 0 .4rem;
                @include flex-box();
                @include justify-content();
                span{
                    &:nth-of-type(2){
                        color: #C09C60;
                    }
                }
            }
            .input-wrap{
                height: .98rem;
                width: 6rem;
                margin: 0 auto;
                position: relative;
                text-align: left;
                align-items: center;
                border:1px solid #E1E1E1;
                border-left:none;
                @include flex-box();
                > span {
                    width: 1rem;
                    height: .98rem;
                    line-height: .98rem;
                    border-left: 1px solid #E1E1E1;
                    display: inline-block;
                    text-align: center;
                    vertical-align: middle;
                    // @include flex-grow(1);
                }
                > input {
                    width: 150%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top:0;
                    // letter-spacing: 1rem;
                    padding-left: 0.3rem;
                    color: transparent;
                    text-shadow: 0 0 0 #000;
                    opacity: 0;
                    margin-left: -50%;
                    text-indent: -999em;
                    z-index:999;
                }
            }
        }
    }
    .pay-wrap{
        width: 4.9rem;
        height: 2.86rem;
        padding-top:.6rem;
        background-color: #fff;
        @include border-radius(.2rem);
        @keyframes roundLoop2{
            0%{ transform: rotate(0deg); }
            100%{ transform: rotate(360deg); }
        }
        .top-img{
            width: 1.08rem;
            height: 1.08rem;
            margin:0 auto .3rem;
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
    .verifi-popup-wrap{
        width: 4.9rem;
        text-align: center;
        background-color: #fff;
        border-radius: 0;
        .top-text{
            color: #000;
            font-size: .32rem;
            padding:.4rem 0;
            font-family:PingFangSC-Medium;
        }
        .btn-wrap{
            height: .88rem;
            line-height: .88rem;
            border-top:1px solid #eee;
            @include flex-box();
            @include justify-content();
            span{
                display: inline-block;
                width: 50%;
                height: .88rem;
                color: #666;
                line-height: .88rem;
                &:nth-of-type(1){
                    color: #C09C60;
                    border-right:1px solid #eee;
                }
                b{
                    margin-left:.1rem;
                }
            }
            .active{
                color: #C09C60;
            }
        }
    }
}
</style>
