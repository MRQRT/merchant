<template>
    <div class="outer-wrap">
        <!-- 移动端显示样式 -->
        <div class="index" v-if="!pcStatus">
            <!-- 导航按钮 -->
            <div class="navigator" @click="navPopup">
                <img src="static/images/nav-icon.png" alt="">
            </div>
    		<!--存金banner-->
    		<div class="storBanner">
                <img src="/static/images/index-bg.png" alt="">
    			<div class="price_container">
    				<div>
    					<p class="price_in">
    						<span>实时金价&回收金价(元/克)</span>
    					</p>
    					<p class="price_amount">{{currentPrice | formatPriceTwo}}</p>
    					<button class="goStore" @click="$router.push('/storegold')">一键存金</button>
    				</div>
    			</div>
    		</div>
    		<!-- 成交数量 -->
    		<section class="dealNum" v-if="loginStatus && shopStatus">
                <p class="title">近一月成交量</p>
                <div class="deal-num">
                    <div class="total-price">
                        <p>累计成交金额(元)</p>
                        <p class="price">{{dealObject.totalCashAmount | formatPriceTwo}}</p>
                    </div>
                    <div class="bottom-num">
                        <div class="left-weight">
                            <p>累计成交克重(克)</p>
                            <p class="weight">{{dealObject.totalWeight}}</p>
                        </div>
                        <div class="right-count">
                            <p>累计成交笔数(笔)</p>
                            <p class="price">{{dealObject.totalCount}}</p>
                        </div>
                    </div>
                </div>
    		</section>
    		<!--存金流程-->
    		<div class="store_flow">
    			<section class="subtitle">黄金回收流程</section>
                <div class="store_flow-wrap">
                    <p class="resume">我们承诺，随时接受退换</p>
        			<section class="flow_container">
        				<div class="each_flow_container">
        					<img src="static/images/store-1.png">
        					<p>在线预约</p>
        				</div>
        				<p class="store_join_line"></p>
        				<div class="each_flow_container">
        					<img src="static/images/store-2.png">
        					<p>顺丰上门</p>
        				</div>
        				<p class="store_join_line"></p>
        				<div class="each_flow_container">
        					<img src="static/images/store-3.png">
        					<p>检测变现</p>
        				</div>
        			</section>
                </div>
    		</div>
    		<!--选择原因-->
    		<section class="reason">
    			<section class="subtitle">存金通服务保障</section>
                <div class="reason-wrap">
                    <div>
        				<p>实时金价卖出</p>
        				<p>透明安全有保障</p>
        			</div>
        			<div>
        				<p>直达精炼厂</p>
        				<p>没有中间商赚取差价</p>
        			</div>
        			<div>
        				<p>免费上门取货</p>
        				<p>5000万高额保费</p>
        			</div>
        			<div>
        				<p>先称重估价</p>
        				<p>客户满意再成交</p>
        			</div>
                </div>
                <p class="resume">黄金管家旗下品牌，央企背景，回收黄金我们是专业的</p>
    		</section>
    		<!-- 股东背景 -->
            <div class="gudong-wrap">
                <section class="subtitle">股东背景</section>
                <div class="gudong">
                    <div class="pe">
                        <img src="static/images/company-1.png" alt="">
                    </div>
                    <div class="pe">
                        <img src="static/images/company-2.png" alt="">
                    </div>
                    <div class="pe">
                        <img src="static/images/company-3.png" alt="">
                    </div>
                    <div class="pe">
                        <img src="static/images/company-4.png" alt="">
                    </div>
                    <div class="pe">
                        <img src="static/images/company-5.png" alt="">
                    </div>
                    <div class="pe">
                        <img src="static/images/company-6.png" alt="">
                    </div>
                </div>
            </div>
    		<!-- 公司介绍 -->
    		<section class="jieshao">
    			<section class="subtitle">公司介绍</section>
                <div class="jieshao-img">
                    <img src="static/images/company-bg.png" alt="">
                    <span>我们是谁</span>
                </div>
    			<div class="jieshao-text">
    				<div style="text-align: left;">"存金通"隶属于北京黄金管家科技发展有限公司，总部位于北京，是拥有央企背景的黄金回购平台。上海黄金交易所综合类会员“众恒隆”作为股东为“存金通”保驾护航。经由“存金通”回收来的所有黄金将直达精炼厂，为上海黄金交易所指定的黄金回收机构。</div>
    				<p>微信公众号：hjgjdyh</p>
    				<p>黄金管家QQ群：673646474</p>
    				<p>黄金管家官方微信：13651098613</p>
    				<p>客服电话：4008-196-199</p>
    				<p>公司地址：北京市海淀区中关村SOHO B座 1209室</p>
    			</div>
    		</section>
            <!-- 左侧导航 -->
            <mt-popup v-model="popupVisible" position="left">
                <div class="nav-wrap">
                    <!-- 未登录情况 -->
                    <div class="top-info" v-if="!loginStatus">
                        <div class="cjt-logo">
                            <img src="static/images/cjt-logo.png" alt="">
                        </div>
                        <!-- 登录注册按钮 -->
                        <div class="login-btn"  @click="$router.push({path:'/login',query:{redirect:'/index'}})">登录/注册</div>
                    </div>
                    <!-- 已登录：店铺图标名称 -->
                    <div class="top-info" @click="goShop()" v-else>
                        <div class="shop-logo">
                            <img src="static/images/shop-logo.png" alt="" v-if="!shopStatus">
                            <img :src="shopInfo.logoPath" alt="" v-else>
                        </div>
                        <!-- 登录且审核通过提示 -->
                        <p v-if="shopStatus">{{shopInfo.name}}</p>
                        <!-- 未开店/店铺正在审核中显示 -->
                        <p v-else>我的店铺</p>
                    </div>
                    <!-- 导航路由 -->
                    <ul class="nav-list">
                        <li @click="$router.push('/assets')">
                            <span class="icon1"></span>
                            <span>我的资产</span>
                        </li>
                        <li @click="$router.push('/storeorderlist')">
                            <span class="icon2"></span>
                            <span>我的订单</span>
                        </li>
                        <li @click="$router.push('/account')">
                            <span class="icon3"></span>
                            <span>帐户管理</span>
                        </li>
                        <li @click="$router.push('/aboutus')">
                            <span class="icon4"></span>
                            <span>关于我们</span>
                        </li>
                        <li @click="quitLogin()" v-if="loginStatus">
                            <span class="icon5"></span>
                            <span>退出登录</span>
                        </li>
                    </ul>
                </div>
            </mt-popup>
        </div>
        <!-- pc端显示样式 -->
        <div class="pc-index" v-else>
            <!-- 顶部banner -->
            <div class="top-banner">
                <img src="static/images/pc-banner.png" alt="">
            </div>
            <!-- 主体部分 -->
            <div class="pc-content">
                <!-- 行业前景及问题 -->
                <div class="part problem">
                    <h3>行业前景及问题</h3>
                    <div class="problem-text">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;据黄金协会数据显示，我国每年黄金回购业务规模达550吨以上，约1500亿元人民币的交易额。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在移动互联网时代，线上寻找解决方案已经成为客户的使用习惯，存金通目前与百度、搜狗、360、UC浏览器等签订战略推广合作,客户可以在各大搜索引擎直接选择存金通的附近商家或高评分商家，选择到店服务！</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真正解决了传统黄金回购门店的以下问题：</p>
                    </div>
                    <ul class="problem-img">
                        <li>
                            <div class="left-img">
                                <img src="static/images/pc-problem1.png" alt="">
                            </div>
                            <div class="right-text">
                                <p>获取客户难</p>
                                <p>店面辐射范围小</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-img">
                                <img src="static/images/pc-problem2.png" alt="">
                            </div>
                            <div class="right-text">
                                <p>获取客户难</p>
                                <p>店面辐射范围小</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-img">
                                <img src="static/images/pc-problem3.png" alt="">
                            </div>
                            <div class="right-text">
                                <p>获取客户难</p>
                                <p>店面辐射范围小</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 我们的优势 -->
                <div class="part advantage">
                    <h3>我们的优势</h3>
                    <div class="advantage-text">
                        <p>黄金管家打通黄金回购全流程，上线“存金通”品牌，同时支持线上卖金及到店服务，</p>
                        <p>客户可以按距离、评分等方式选择门店直接上门，当面交易，为顾客带来便捷的同时也为合作商户提供精准、高转化流量。</p>
                    </div>
                    <div class="advantage-img">
                        <img src="static/images/pc-advantage.png" alt="">
                    </div>
                </div>
                <!-- 黄金回购流程 -->
                <div class="part gold-flow">
                    <h3>黄金回购流程</h3>
                    <div class="gold-flow-text">
                        <p>在线预约--顺丰上门--专业检测--快捷变现</p>
                    </div>
                    <div class="gold-flow-img">
                        <img src="static/images/pc-flow.png" alt="">
                    </div>
                </div>
                <!-- 服务保障 -->
                <div class="part service">
                    <h3>服务保障</h3>
                    <ul class="service-list">
                        <li class="service-item">
                            <h4>黄金高价卖出</h4>
                            <p>直连上金所报价</p>
                            <p>全品类回购</p>
                            <p>全品类回购</p>
                        </li>
                        <li class="service-item">
                            <h4>流程高效安全</h4>
                            <p>顺丰快递、全额保价</p>
                            <p>权威机构检测</p>
                            <p>随时接受退换</p>
                        </li>
                        <li class="service-item">
                            <h4>极简体验</h4>
                            <p>一键完成回购</p>
                            <p>微信公众号/APP</p>
                            <p>/H5/小程序</p>
                        </li>
                        <li class="service-item">
                            <h4>直达精炼厂</h4>
                            <p>黄金回购直达精炼厂</p>
                            <p>无中间商赚取差价</p>
                        </li>
                    </ul>
                </div>
                <!-- 相关产品 -->
                <div class="part product">
                    <h3>相关产品</h3>
                    <div class="qrcode-wrap">
                        <div class="qrcode">
                            <img src="static/images/pc-code1.png" alt="">
                            <p>存金通商户版</p>
                        </div>
                        <div class="line"></div>
                        <div class="qrcode">
                            <img src="static/images/pc-code2.png" alt="">
                            <p>黄金管家APP</p>
                        </div>
                    </div>
                </div>
                <!-- 股东背景 -->
                <div class="part gudong">
                    <h3>股东背景</h3>
                    <ul class="gudong-list">
                        <li class="gudong-item">
                            <img src="static/images/company-1.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/company-5.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/company-4.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/company-6.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/company-2.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/company-3.png" alt="">
                        </li>
                    </ul>
                </div>
                <!-- 底部说明 -->
                <div class="bottom-info">
                    <div class="pc_footer_content">
    					<div class="pc_footer_content_left">
    						<div>“存金通”隶属于北京黄金管家科技发展有限公司，总部位于北京，是拥有央企背景的黄金回购平台。经由“存金通”回收来的所有黄金将直达精炼厂，为上海黄金交易所指定的黄金回收机构。</div>
    					</div>
    					<div class="pc_footer_content_right">
    						<p>4008-196-199</p>
    						<p style="margin-top:0;">微信公众号：hjgjdyh</p>
    						<p>官方群2018：673646474</p>
    						<p>官方分析群2018：556533099</p>
    					</div>
    				</div>
    				<p class="loca">地址：北京市海淀区中关村SOHO B座 1209室</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { Popup,Toast,MessageBox } from 'mint-ui';
import { mapState,mapMutations } from 'vuex'
import { shop_status, query_index_statistics, shop, logout,merchant_open_apply_status } from '@/service/getData.js'


    export default {
        data(){
            return{
                popupVisible:false,   // 左侧导航显示
                loginStatus:false,    // 是否登录
                pcStatus:false,      // 是否是pc端
                dealObject:{          // 近一月交易量
                    totalCashAmount:0,
                    totalWeight:0,
                    totalCount:0
                },
                shopInfo:{
                    shopId:'',
                    logoPath:'',
                    name:'我的店铺'
                },
                clientWidth:document.documentElement.clientWidth,//页面宽度
            }
        },
        components:{
            headTop,
            Popup
        },
        computed: {
            ...mapState([
                'currentPrice','accessToken','shopStatus','userId'
            ]),
        },
        watch:{
            /*实时金价*/
			currentPrice(val){
				return val
			},
            popupVisible:function(val){
                if(!this.pcStatus){
                    val ? this.fixed(true) : this.fixed(false)
                }
            },
        },
        methods: {
            ...mapMutations([
                'RECORD_ACCESSTOKEN','RECORD_SHOPID','RECORD_SHOPSTATUS'
            ]),
            // 显示导航
            navPopup(){
                this.popupVisible = true;
            },
            // 点击我的店铺logo跳转操作
            goShop(){
                if(this.shopStatus){
                    this.$router.push('/myshop') // 跳转我的店铺页
                }else{
                    this.merchant_open_apply_status();
                }
            },
            // 判断店铺状态
            async shop_status(){
                var res = await shop_status();
                if(res.code=='000000'){
                    this.RECORD_SHOPSTATUS(res.data)
                }else if(res.code=='000004'){ // 用户未登录
                    this.RECORD_ACCESSTOKEN('');
                    this.RECORD_SHOPSTATUS(false);
                }else{
                    Toast(res.message);
                }
            },
            // 近一月统计数据
            async query_index_statistics(){
                var res = await query_index_statistics();
                if(res.code=='000000'){
                    this.dealObject=res.data;
                }else if(res.code=='200206'){
                    this.RECORD_SHOPSTATUS(false); // 店铺不存在或未通过审核
                }else{
                    // Toast(res.message)
                }
            },
            // 获取店铺信息
            async checkShopStatus(){
                var res = await shop();
                if(res.code=='000000'){
                    if(res.data){
                        this.shopInfo = res.data;
                        this.RECORD_SHOPID(res.data.id); // 保存店铺ID
                    }else{
                        this.RECORD_SHOPID('');        // 保存店铺ID
                        this.RECORD_SHOPSTATUS(false); // 店铺不存在或未通过审核
                    }
                }
            },
            // 获取最新商户审核信息
            async merchant_open_apply_status(){
                var res = await merchant_open_apply_status();
                if(res.code=='000000'){
                    if(res.data){
                        this.$router.push('/applicationresults') //审核结果页
                    }else{
                        this.$router.push('/openshopguide') // 商户入驻引导页
                    }
                }
            },
            //退出登录
            async quitLogin(){
                var html='<div style="text-align:center">确定要退出登录？</div>'
                MessageBox({
                    title: '提示',
                    message: html,
                    confirmButtonText: '取消',
                    showCancelButton: true,
                    cancelButtonText:'退出登录',
                }).then((action)=>{
                    if(action=='cancel'){
                        this.logout();//接口触发
                    }
                })
            },
            async logout(){
                const res = await logout();
                if(res.code=='000000'){
                    this.RECORD_ACCESSTOKEN('');
                    this.$router.push('/login');
                }else if(res.code=='000004'){
                    this.RECORD_ACCESSTOKEN('');
                    this.$router.push('/login');
                }else{
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            }
        },
        created(){
            if(!this.pcStatus){
                if(this.$route.query.navStatus){ // 从五个导航跳转回来导航要默认展开
                    this.popupVisible = true;
                    this.fixed(true);
                }
            }
        },
        mounted(){
            this.loginStatus = this.accessToken ? true : false;
            if(this.loginStatus){              // 登录状态下请求
                this.shop_status();            // 判断店铺状态
                this.checkShopStatus();        // 店铺信息
                this.query_index_statistics(); // 首页统计数据
                console.log('accessToken',this.accessToken)
            }
            // 判断是pc还是移动端
            if(this.clientWidth>1000){
                this.pcStatus=true
            }else{
                this.pcStatus=false
            }
            var that = this;
            window.onresize = function(){
                var windowsize = document.documentElement.clientWidth;
    			if(windowsize>768 || windowsize==768){
    				that.pcStatus=true
    			}else{
    				that.pcStatus=false
    			}
            }
        },
        beforeRouteLeave (to, from, next) {
            this.popupVisible = false;
            this.fixed(false)
            next()
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.index{
	width: 100%;
	position: relative;
	top: 0;
	background-color: #fff;
	text-align: center;
    .navigator{
        width: .44rem;
        height: .44rem;
        position: absolute;
        left:.4rem;
        top:.55rem;;
        z-index: 100;
        img{
            width: 100%;
        }
    }
    .main-cont{
        div{
            width: 2rem;
            height:1rem;
            text-align: center;
            line-height: 1rem;
            margin:0 auto .5rem;
            border:1px solid #eee;
        }
        .nav{

        }
    }
    // 左侧导航
    .nav-wrap{
        width:5rem;
        height: 100vh;
        padding:1.4rem .5rem 0 .6rem;
        background-color: #fff;
        overflow:scroll;
        .top-info{
            margin-bottom: 1.3rem;
            .cjt-logo{
                width: 2.1rem;
                height: .58rem;

                img{
                    width: 100%;
                }
            }
            .login-btn{
                width: 3rem;
                height: .7rem;
                line-height: .7rem;
                text-align: center;
                color: #fff;
                font-size: .3rem;
                margin-top:.3rem;
                background: -webkit-linear-gradient(left, #C09C60, #DDC899);
                @include border-radius(.35rem);
            }
            .shop-logo{
                width: 1.6rem;
                height: 1.6rem;
                background-color: #eee;
                img{
                    width: 100%;
                    height:100%;
                }
            }
            p{
                color: #333;
                font-size: .34rem;
                line-height: .54rem;
                text-align: left;
                margin-top:.38rem;
                font-weight: bold;
                font-family:PingFangSC-Medium;
            }
        }
        .nav-list{
            width:100%;
            li{
                height: 1rem;
                line-height: 1rem;
                align-items: center;
                @include flex-box();
                span{
                    color:#333;
                    font-size: .3rem;
                    margin-right:.3rem;
                    font-family:PingFangSC-Regular;
                    &:nth-of-type(1){
                        display: inline-block;
                        width: .36rem;
                        height: .36rem;
                    }
                }
                .icon1{
                    @include bg-image('/static/images/assets-icon.png');
                }
                .icon2{
                    @include bg-image('/static/images/order-icon.png');
                }
                .icon3{
                    @include bg-image('/static/images/account-icon.png');
                }
                .icon4{
                    @include bg-image('/static/images/us-icon.png');
                }
                .icon5{
                    @include bg-image('/static/images/quit-login.png');
                }

            }
        }
    }
    .storBanner{
    	width:100%;
        height: 6.2rem;
        margin-bottom: 2.7rem;
    	position: relative;
        // @include bg-image('/static/images/index-bg.png');
        img{
        	// width:100%;
            width: 100%;
            height: 6.2rem;
        }
        .gradient{
        	width:100%;
        	position: absolute;
        	bottom:0;
        	left:0;
        }
    }
    .price_container{
    	width:100%;
        padding:0 .4rem;
    	bottom:-2.1rem;
    	position: absolute;
    	display: flex;
    	justify-content: center;
    }
    .price_container>div{
        width:100%;
        height: 3.8rem;
    	display: inline-block;
    	padding-top:.5rem;
    	background-color: #fff;
    	text-align: center;
        @include box-shadow(0px 10px 12px -1px rgba(0,0,0,0.06));
        .price_in{
        	text-align: center;
            span{
            	color:#999;
            	font-size:.28rem;
            }
            img{
            	width:.44rem;
            	height:.44rem;
            	vertical-align: middle;
            }
        }
        .price_amount{
        	color:#C09C60;
        	font-size:.88rem;
        	text-align: center;
        	font-weight:800;
            font-family:DINAlternate-Bold;
        	margin-top:.1rem;
        }
        .goStore{
        	width:3.8rem;
        	height:.8rem;
        	background: -webkit-linear-gradient(left, #C09C60, #DDC899);
        	color:#fff;
        	font-size:.34rem;
        	text-align: center;
        	display: block;
        	margin:0 auto;
        	line-height:.8rem;
        	margin-top:.3rem;
        	position: relative;
            @include border-radius(.4rem);
        }
    }
    /*成交量*/
    .dealNum{
        width:100%;
        text-align: left;
        padding:.2rem .4rem 0;
        margin-bottom: .6rem;
        .title{
            color: #333;
            font-size: .34rem;
            font-weight: bold;
            font-family:PingFangSC-Medium;
            margin-bottom: .3rem;
        }
        .deal-num{
            width:100%;
            padding:.4rem;
            color: #666;
            font-size: .24rem;
            background-color: #F8F8F8;
            .total-price{
                margin-bottom: .5rem;
                .price{
                    color: #C09C60;
                    font-size: .6rem;
                    margin-top:.15rem;
                    font-family:DINAlternate-Bold;
                }
            }
            .bottom-num{
                color: #666;
                text-align: left;
                @include flex-box();
                @include justify-content();
                .left-weight,.right-count{
                    @include flex-grow(1);
                }
                .weight,.price{
                    color: #C09C60;
                    font-size: .4rem;
                    margin-top:.1rem;
                    font-family:DINAlternate-Bold;
                }
                .right-count{
                    padding-left:.4rem;
                    border-left:1px solid #E1E1E1;
                }
            }
        }
    }
    /*存金流程*/
    .resume{
        font-size: .24rem;
        color: #666;
        text-align: center;
        h4{
            font-size: .34rem;
            padding-left: .32rem;
            color: #333333;
            font-weight: 600;
        }
    }
    .store_flow{
    	background-color: #fff;
    	width: 100%;
    	height: 4rem;
        padding:0 .4rem;
    	display: inline-block;
        .store_flow-wrap{
            width:100%;
            padding:.4rem .5rem;
            background:rgba(249,245,239,1);
        }
        .flow_container{
        	margin-top:.3rem;
            @include flex-box();
            @include justify-content();
            img{
            	width:.81rem;
                height:.8rem;
            }
            .each_flow_container{
            	text-align: center;
            	position: relative;
                p{
                    font-size:.28rem;
                	color:#333;
                	padding-top:.14rem;
                }
            }
            .store_join_line{
            	width: .12rem;
            	height: .16rem;
            	background-color: #E1E1E1;
            	margin-left: .1rem;
            	margin-right: .1rem;
            	margin-top: .3rem;
                @include bg-image('/static/images/store-arrow.png');

            }
        }
    }
    /*reason*/
    .reason{
    	width: 100%;
        padding:.2rem .4rem;
        margin-top:.3rem;
    	background-color: #fff;
    	display: inline-block;
        .reason-wrap{
            flex-wrap: wrap;
            @include flex-box();
            @include justify-content();
            div{
                width:48.5%;
                height: 1.5rem;
                color:#fff;
                text-align: center;
                font-size: .24rem;
                padding:.35rem 0 .4rem;
                margin-bottom: .2rem;
                &:nth-of-type(1){
                    @include bg-image('/static/images/service-1.png');
                }
                &:nth-of-type(2){
                    @include bg-image('/static/images/service-2.png');
                }
                &:nth-of-type(3){
                    @include bg-image('/static/images/service-3.png');
                }
                &:nth-of-type(4){
                    @include bg-image('/static/images/service-4.png');
                }
                p{
                    text-align: center;
                    &:nth-of-type(1){
                        font-size: .3rem;
                    }
                }
            }
        }
        .resume{
            text-align: left;
        }

    }
    .subtitle{
    	height: .8rem;
    	font-size: .34rem;
    	color: #333333;
    	line-height: .8rem;
    	text-align: left;
    	font-weight: bold;
        margin-bottom: .2rem;
        font-family:PingFangSC-Medium;
    }
    // .subtitle:before{
    // 	display: inline-block;
    // 	content:'';
    // 	width: 1rem;
    // 	height: .25rem;
    //     @include bg-image('/static/images/r.png');
    // 	background-size: 90%;
    // 	background-position: center;
    // 	margin-right: .2rem;
    // }
    // .subtitle:after{
    // 	display: inline-block;
    // 	content:'';
    // 	width: 1rem;
    // 	height: .25rem;
    //     @include bg-image('/static/images/l.png');
    // 	background-size: 90%;
    // 	background-position: center;
    // 	margin-left: .2rem;
    // }
    /**/
    .gudong-wrap{
        width:100%;
        padding:0 .4rem;
        margin-top:.4rem;
        .gudong{
        	width: 100%;
        	margin-top: .2rem;
        	background-color: #fff;
            flex-wrap: wrap;
            @include flex-box();
            @include justify-content();
            .pe{
            	width: 32%;
            	height: 1.2rem;
            	border:1px solid #eee;
                margin-bottom: .2rem;
                padding:.28rem .3rem;
                position: relative;
                img{
                    width: 1.5rem;
                    height: .64rem;
                }
            }
        }
    }

    .jieshao{
    	width: 100%;
    	padding: 0 .4rem;
    	margin-bottom: .8rem;
    	display: inline-block;
    	background-color: #fff;
    	margin-top: .4rem;
        .jieshao-img{
            width:100%;
            // height: 2rem;
            position: relative;
            padding-bottom: 0 !important;
            img{
                width: 100%;
            }
            span{
                color: #fff;
                font-size: .34rem;
                position: absolute;
                left:.3rem;
                top:.75rem;
                font-family:PingFangSC-Medium;
            }
        }
        .jieshao-text{
        	font-size: .24rem;
        	color: #999;
        	line-height: .45rem;
            padding-bottom: .4rem;
            font-family:PingFangSC-Regular;
            @include box-shadow(0px 10px 12px -1px rgba(0,0,0,0.06));
            &>div{
            	font-size: .28rem;
            	color: #333;
                line-height: .5rem;
                padding:.3rem .3rem .4rem;
                font-family:PingFangSC-Regular;
            }
            p{
            	text-align: left;
                padding-left:.3rem;
            }
        }
    }
}

.pc-index{
    width:100%;
    background-color: rgba(248,248,248,1);
    .top-banner{
        width:100%;
        img{
            width:100%;
        }
    }
    .pc-content{
        width:100%;
        text-align: center;
        margin:0 auto;
        border:1px solid #eee;
        background-color: #fff;

        .part{
            // width:900px;
            width:1000px;
            margin:0 auto;
            text-align: center;
            h3{
                color: #333;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 40px;
                margin-top:60px;
                font-family:PingFangSC-Medium;
            }
            .problem-text, .advantage-text,.gold-flow-text{
                text-align: left;
                p{
                    color: #666;
                    font-size: 12px;
                    line-height: 23px;
                    &:nth-of-type(3){
                        color: #333;
                    }
                }
            }
            .problem-text{
                margin-bottom: 30px;
            }
            .advantage-text,.gold-flow-text{
                text-align: center;
            }
            .problem-img{
                width:100%;
                align-items: center;
                @include flex-box();
                @include justify-content();
                li{
                    width:32%;
                    padding:20px 30px;
                    align-items: center;
                    @include flex-box();
                    @include box-shadow(2px 0px 30px rgba(31,20,17,0.06));
                    .left-img{
                        width: 45px;
                        height: 45px;
                        margin-right:15px;
                        img{
                            width: 100%;
                        }
                    }
                    .right-text{
                        color: #666;
                        font-size: 14px;
                        text-align: left;
                        line-height: 20px;
                        font-family:PingFangSC-Regular;
                    }
                }
            }
            .advantage-img{
                width: 100%;
                margin-top:10px;
                position: relative;
                img{
                    width: 480px;
                    height: 290px;
                    margin-left:30px;
                }
            }
            .gold-flow-img{
                width:480px;
                height: 240px;
                margin:25px auto 0;
                img{
                    width: 100%;
                }
            }

        }
        .advantage{
            margin-top:70px;
        }
        // 存金流程
        .gold-flow{
            width: 100%;
            padding:60px 0;
            margin-top:60px;
            background-color: rgba(248,248,248,1);
            h3{
                margin-top:0;
            }
        }
        // 服务保障
        .service{
            width: 1000px;
            h3{
                color: #333;
                font-size: 16px;
            }
            .service-list{
                @include flex-box();
                @include justify-content();
                .service-item{
                    width: 24%;
                    padding:25px 0 20px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    h4{
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    p{
                        line-height: 20px;
                    }
                    &:nth-of-type(1){
                        @include bg-image('/static/images/pc-service1.png');
                    }
                    &:nth-of-type(2){
                        @include bg-image('/static/images/pc-service2.png');
                    }
                    &:nth-of-type(3){
                        @include bg-image('/static/images/pc-service3.png');
                    }
                    &:nth-of-type(4){
                        @include bg-image('/static/images/pc-service4.png');
                    }
                }
            }
        }
        // 相关产品
        .product{
            width: 100%;
            padding-top:60px;
            margin-top:100px;
            background:rgba(248,248,248,1);
            h3{
                margin-top:0;
            }
            .qrcode-wrap{
                align-items: flex-start;
                justify-content: center;
                @include flex-box();
                .qrcode{
                    img{
                        width: 240px;
                        height: 240px;
                    }
                    p{
                        color: #333;
                        font-size: 16px;
                        margin-top:-20px;
                        font-family:PingFangSC-Regular;
                    }
                }
                .line{
                    width: 1px;
                    height: 300px;
                    margin:30px 50px 0;
                    background-color: #DDC899;
                }
            }

        }
        // 股东背景
        .gudong{
            padding-bottom: 100px;
            .gudong-list{
                @include flex-box();
                @include justify-content();
                .gudong-item{
                    width: 15.5%;
                    padding:10px 20px;
                    // height: 45px;
                    border:1px solid #eee;
                    img{
                        // @include center(150px 64px);
                    }
                }
            }
        }
        // 底部信息
        .bottom-info{
        	width: 100%;
        	height: 270px;
        	background-color: rgb(51, 51, 51);
        	text-align: center;
        	font-size: 8px;
        	color: #fff;
            .pc_footer_content{
            	display: inline-block;
            	width: 1000px;
            	border-bottom: 1px solid #999;
            	height: 200px;
                .pc_footer_content_left{
                	width: 50%;
                	height: 180px;
                	float: left;
                	background-image: url('/static/images/cjt-logo.png');
                	background-repeat: no-repeat;
                	background-size: 90px 27px;
                	background-position: 0px 40px;
                	padding-top: 80px;
                	text-align: left;
                    div{
                    	line-height: 30px;
                    }
                }
                .pc_footer_content_right{
                	width: 50%;
                    height: 180px;
                    float: right;
                    text-align: left;
                    line-height: 25px;
                    padding-left: 270px;
                }
            }
        }
        .pc_footer_content_right p:nth-child(1){
        	font-size: 20px;
        	line-height: 80px;
        	font-weight: bold;
        }
        .loca{
            width:1000px;
            margin:0 auto;
        	color: #999999;
        	line-height: 73px;
        	text-align: left;
        }
    }
}
</style>
