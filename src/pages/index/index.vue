<template>
    <div class="index">
        <!-- 导航按钮 -->
        <div class="navigator" @click="navPopup">
            <img src="static/images/nav-icon.png" alt="">
        </div>
		<!--存金banner-->
		<div class="storBanner">
			<!-- <img src="static/images/index-bg.jpeg"> -->
			<div class="price_container">
				<div>
					<p class="price_in">
						<span>实时金价&回收金价(元/克)</span>
					</p>
					<p class="price_amount">{{245.34 | formatPriceTwo}}</p>
					<button class="goStore" @click="$router.push('/storegold')">一键存金</button>
				</div>
			</div>
		</div>
		<!-- 成交数量 -->
		<section class="dealNum" v-if="loginStatus && shopCheckStatus">
            <p class="title">店铺近一月成交量</p>
            <div class="deal-num">
                <div class="total-price">
                    <p>累计成交金额(元)</p>
                    <p class="price">{{123456.78 | formatPriceTwo}}</p>
                </div>
                <div class="bottom-num">
                    <div class="left-weight">
                        <p>累计成交克重(克)</p>
                        <p class="weight">1354.654</p>
                    </div>
                    <div class="right-count">
                        <p>累计成交笔数(笔)</p>
                        <p class="price">78</p>
                    </div>
                </div>
            </div>
		</section>
		<!--存金流程-->
		<div class="store_flow">
			<section class="subtitle">黄金回收流程</section>
			<p class="resume">我们承诺，随时接受退换</p>
			<!-- <h4>存金流程</h4> -->
			<section class="flow_container">
				<div class="each_flow_container">
					<img src="static/images/flow1.png">
					<p>在线预约</p>
				</div>
				<p class="store_join_line"></p>
				<div class="each_flow_container">
					<img src="static/images/flow2.png">
					<p>顺丰上门</p>
				</div>
				<p class="store_join_line"></p>
				<div class="each_flow_container">
					<img src="static/images/flow3.png">
					<p>检测变现</p>
				</div>
			</section>
		</div>
		<!--选择原因-->
		<section class="reason">
			<section class="subtitle">为什么选择存金通</section>
			<p class="resume">黄金管家旗下品牌，央企背景，回收黄金我们是专业的</p>
			<div class="reason_top">
				<div>
					<img src="static/images/pr.png" alt="">
					<p>实时金价卖出</p>
					<p>透明安全有保障</p>
				</div>
				<div>
					<img src="static/images/jl.png" alt="">
					<p>直达精炼厂</p>
					<p>没有中间商赚取差价</p>
				</div>
			</div>
			<div class="reason_bottom">
				<div>
					<img src="static/images/bao2.png" alt="">
					<p>免费上门取货</p>
					<p>5000万高额保费</p>
				</div>
				<div>
					<img src="static/images/bao4.png" alt="">
					<p>先称重估价</p>
					<p>客户满意再成交</p>
				</div>
			</div>
		</section>
		<!-- 股东背景 -->
		<section class="subtitle">股东背景</section>
		<div class="gudong">
			<div style="overflow: scroll;width: 10rem;">
				<div class="pe">
				<img src="static/images/zhongx.png" alt="">
				</div>
				<div class="pe">
					<img src="static/images/lan.png" alt="">
				</div>
				<div class="pe">
					<img src="static/images/yi.png" alt="">
				</div>
				<div class="pe">
					<img src="static/images/zhong2.png" alt="">
				</div>
				<div class="pe">
					<img src="static/images/bai.png" alt="">
				</div>
			</div>
		</div>
		<!-- 公司介绍 -->
		<section class="jieshao">
			<section class="subtitle">公司介绍</section>
			<div style="background-color: #fff;text-align:center;">
				<div style="text-align: left;">"存金通"隶属于北京黄金管家科技发展有限公司，总部位于北京，是拥有央企背景的黄金回购平台。上海黄金交易所综合类会员“众恒隆”作为股东为“存金通”保驾护航。经由“存金通”回收来的所有黄金将直达精炼厂，为上海黄金交易所指定的黄金回收机构。</div>
				<p>微信公众号：hjgjdyh</p>
				<p>黄金管家QQ群：673646474</p>
				<p>黄金管家官方微信：13651098613</p>
				<p>客服电话：4008-196-199</p>
				<p>公司地址：北京市海淀区中关村SOHO B座 1209室</p>
			</div>
		</section>
        <!-- 主体内容 -->
        <div class="main-cont">
            <div class="" @click="$router.push('/openshopguide')">开店引导页</div>
            <div class="" @click="$router.push('/applicationresults')">资质审核结果</div>
            <div class="" @click="$router.push('/qcmscommitresult')">资信结</div>
            <div class="" @click="$router.push('/confirminfo')">资质信息核对</div>
            <div class="" @click="$router.push('/uploadcertificate')">上传资质信息</div>
            <div class="" @click="$router.push('/editshopinfo')">编辑商铺</div>
            <div class="" @click="$router.push('/myshop')">我的店铺</div>
            <div class="" @click="$router.push('/addressList')">我的地址</div>
            <div class="" @click="$router.push('/addAddress')">添加地址</div>
        </div>
        <!-- 左侧导航 -->
        <mt-popup v-model="popupVisible" position="left">
            <div class="nav-wrap">
                <!-- 店铺图标名称 -->
                <div class="top-info" @click="goShop()">
                    <div class="shop-logo">
                        <img src="static/images/shop-logo.png" alt="">
                    </div>
                    <!-- 未登录显示 -->
                    <p v-if="!loginStatus">请登录</p>
                    <!-- 登录且审核通过提示 -->
                    <p v-if="loginStatus && shopCheckStatus">我的店铺啦啦啦啦啦啦啦啦啦啦</p>
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
                </ul>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { Popup } from 'mint-ui';

    export default {
        data(){
            return{
                popupVisible:false,   // 左侧导航显示
                loginStatus:true,     // 是否登录
                shopCheckStatus:true, // 店铺审核是否通过
            }
        },
        components:{
            headTop,
            Popup
        },
        computed: {

        },
        watch:{
            popupVisible:function(val){
                val ? this.fixed(true) : this.fixed(false)
            }
        },
        methods: {
            navPopup(){
                this.popupVisible = true;
            },
            // 点击我的店铺logo跳转操作
            goShop(){
                if(this.shopCheckStatus){
                    this.$router.push('/myshop') // 跳转我的店铺页
                }else{
                    this.$router.push('/openshopguide') // 开店引导页
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
        overflow: hidden;
        .top-info{
            margin-bottom: 1.3rem;
            .shop-logo{
                width: 1.6rem;
                height: 1.6rem;
                background-color: #eee;
                img{
                    width: 100%;
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

            }
        }
    }
    .storBanner{
    	width:100%;
        height: 6.2rem;
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
    	bottom:-2.1rem;
    	position: absolute;
    	display: flex;
    	justify-content: center;
    }
    .price_container>div{
    	height: 3.8rem;
    	display: inline-block;
    	width: 6.7rem;
    	padding-top:.5rem;
    	background-color: #fff;
    	text-align: center;
        @include box-shadow(0px 10px 12px -1px #ebebeb);
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
        margin-top: 2.7rem;
        .title{
            color: #666;
            font-size: .26rem;
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
                    color: #333;
                    font-size: .6rem;
                    margin-top:.15rem;
                    font-family:DINAlternate-Bold;
                }
            }
            .bottom-num{
                color: #999;
                text-align: left;
                @include flex-box();
                @include justify-content();
                .left-weight,.right-count{
                    @include flex-grow(1);
                }
                .weight,.price{
                    color: #333;
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
        color: #C09C60;
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
    	width: 6.9rem;
    	height: 4rem;
    	margin-top: .6rem;
    	display: inline-block;
        .flow_container{
        	-webkit-justify-content: center;
        	-o-justify-content: center;
        	-moz-justify-content: center;
        	justify-content: center;
        	margin-top:.7rem;
            @include flex-box();
            img{
            	width:.6rem;
            }
            .each_flow_container{
            	text-align: center;
            	position: relative;
                p{
                    font-size:.28rem;
                	color:#666666;
                	padding-top:.14rem;
                }
            }
            .store_join_line{
            	width: 1.2rem;
            	height: .02rem;
            	background-color: #E1E1E1;
            	margin-left: .1rem;
            	margin-right: .1rem;
            	margin-top: .3rem;
            }
        }
    }
    /*reason*/
    .reason{
    	width: 6.9rem;
    	// height: 8.18rem;
        padding:.2rem 0 .4rem;
    	background-color: #fff;
    	display: inline-block;
        .reason_top,.reason_bottom{
        	display: flex;
        	justify-content: center;
        	flex-direction: row;
        	margin-top: .45rem;
            div{
                width: 3.35rem;
            }
            p:nth-of-type(1){
                color:#333;
            	font-size: .28rem;
            	line-height: .4rem;
            }
            p:nth-of-type(2){
                font-size: .25rem;
            	color: #999999;
            	line-height: .4rem;
            }
            img{
                width: 1.2rem;
            	height: 1.2rem;
                margin-bottom: .2rem;
            }

        }
    }
    .subtitle{
    	height: .8rem;
    	font-size: .34rem;
    	color: #333333;
    	line-height: .8rem;
    	text-align: center;
    	font-weight: bold;
    	margin-top: .5rem;
    }
    .subtitle:before{
    	display: inline-block;
    	content:'';
    	width: 1rem;
    	height: .25rem;
        @include bg-image('/static/images/r.png');
    	background-size: 90%;
    	background-position: center;
    	margin-right: .2rem;
    }
    .subtitle:after{
    	display: inline-block;
    	content:'';
    	width: 1rem;
    	height: .25rem;
        @include bg-image('/static/images/l.png');
    	background-size: 90%;
    	background-position: center;
    	margin-left: .2rem;
    }
    /**/
    .gudong{
    	width: 100%;
    	height: 4.33rem;
    	margin-top: .2rem;
        @include bg-image('/static/images/hgdBg.jpg')
    	background-color: #fff;
    	display: inline-block;
    	padding: 1.26rem .15rem 0rem .41rem;
    	overflow: hidden;
    	overflow-x: scroll;
    	white-space: nowrap;
        .pe{
        	width: 1.8rem;
        	height: 1.8rem;
        	background-color: rgba(239,239,239,	.8);
        	float: left;
        	margin-right: .2rem;
            img{
            	width: 1.5rem;
                height: .63rem;
                float: left;
                margin-top: .55rem;
            	margin-left: .18rem;
            }
        }
    }
    .jieshao{
    	width: 6.9rem;
    	padding: 0 .3rem 0 .3rem;
    	margin-bottom: .3rem;
    	display: inline-block;
    	background-color: #fff;
    	margin-top: .3rem;
        &>div{
        	background-color: rgba(248, 248, 248, 1);
        	font-size: .24rem;
        	color: #999;
        	padding: .38rem 0;
        	line-height: .45rem;
            &>div{
            	font-size: .28rem;
            	color: #333;
                line-height: .5rem;
                margin-bottom: .5rem;
                font-family:PingFangSC-Regular;
            }
            p{
            	text-align: left;
            }
        }
    }
}
</style>
