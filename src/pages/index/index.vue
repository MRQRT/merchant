<template>
    <div class="index">
        <!-- 导航按钮 -->
        <div class="navigator" @click="navPopup">
            <img src="static/images/nav-icon.png" alt="">
        </div>
		<!--存金banner-->
		<div class="storBanner">
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
</template>

<script>
import headTop from '@/components/header/head.vue'
import { Popup,Toast } from 'mint-ui';
import { mapState,mapMutations } from 'vuex'
import { shop_status, query_index_statistics, shop, logout } from '@/service/getData.js'


    export default {
        data(){
            return{
                popupVisible:false,   // 左侧导航显示
                loginStatus:false,     // 是否登录
                dealObject:{
                    totalCashAmount:2345.3444,
                    totalWeight:23.43,
                    totalCount:88
                },
                shopInfo:{
                    shopId:'',
                    logoPath:'',
                    name:'周大福周生生'
                },
            }
        },
        components:{
            headTop,
            Popup
        },
        computed: {
            ...mapState([
                'currentPrice','accessToken','shopStatus',
            ]),
        },
        watch:{
            /*实时金价*/
			currentPrice(val){
				return val
			},
            popupVisible:function(val){
                val ? this.fixed(true) : this.fixed(false)
            }
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
                    this.$router.push('/openshopguide') // 开店引导页
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
                var res = query_index_statistics();
                if(res.code=='000000'){
                    this.dealObject=res.data;
                }else if(res.code=='200206'){
                    this.RECORD_SHOPSTATUS(false); // 店铺不存在或未通过审核
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
            // 退出登录
            async quitLogin(){
                const res = await logout();
                if(res.code=='000000'){
                    Toast('退出登录成功');
                    this.popupVisible=false;
                    this.loginStatus=false;
                    this.RECORD_ACCESSTOKEN('');
                }else if(res.code=='000004'){
                    Toast('退出登录成功');
                    this.popupVisible=false;
                    this.loginStatus=false;
                    this.RECORD_ACCESSTOKEN('');
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
            if(this.$route.query.navStatus){ // 从五个导航跳转回来导航要默认展开
                this.popupVisible = true;
                this.fixed(true);
            }
        },
        mounted(){
            this.loginStatus = this.accessToken ? true : false;
            if(this.loginStatus){              // 登录状态下请求
                this.shop_status();            // 判断店铺状态
                this.checkShopStatus();        // 店铺信息
            }
            if(this.shopStatus){
                this.query_index_statistics(); // 首页统计数据
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
        @include bg-image('/static/images/index-bg.png');
        img{
        	width:100%;
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
        padding:0 .4rem;
        margin-bottom: .6rem;
        .title{
            color: #333;
            font-size: .34rem;
            // font-weight: bold;
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
            	width:.8rem;
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
</style>
