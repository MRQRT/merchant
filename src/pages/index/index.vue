<template>
    <div class="outer-wrap">
        <!-- 移动端显示样式 -->
        <div class="index" v-if="!pcStatus">
            <!-- 悬浮入驻店铺按钮 -->
            <div class="shops-located" v-show="!loginStatus || !shopStatus" @click="goShop()">
                <img src="static/images/shops-located.png" alt="">
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
    					<button class="goStore" @click="$router.push('/storegold')">一键回收</button>
    				</div>
    			</div>
    		</div>
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
    				<p>检测中心：东莞市凤岗镇五联村碧湖大道新绮腾金银珠宝产业园A栋</p>
    				<p>公司地址：北京市海淀区中关村SOHO B座 1209室</p>
    			</div>
    		</section>
            <!-- 底部固定导航 -->
            <foot></foot>
        </div>
        <!-- pc端显示样式 -->
        <div class="pc-index" v-else>
            <!-- 顶部banner -->
            <div class="top-banner">
                <img src="static/images/pc-banner.png" alt="">
            </div>
            <!-- 主体部分 -->
            <div class="pc-content">
                <!-- 黄金回收行业前景 -->
                <div class="part prospect">
                    <h3>黄金回收行业前景</h3>
                    <ul class="prospect-img">
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-prospect1.png" alt="">
                            </div>
                            <div class="bottom-text">
                                <p>黄金消费市场连续5年世界第一</p>
                            </div>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-prospect2.png" alt="">
                            </div>
                            <div class="bottom-text">
                                <p>黄金回收业务规模达550吨以上 约合1500亿元人民币</p>
                            </div>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-prospect3.png" alt="">
                            </div>
                            <div class="bottom-text">
                                <p>市场规模增长速度30%</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 行业所需解决的问题 -->
                <div class="part problem">
                    <h3>行业所需解决的问题</h3>
                    <ul class="problem-img">
                        <li class="problem-item">
                            <div class="left-icon">
                                <img src="static/images/pc-pro1.png" alt="">
                            </div>
                            <div class="right-text">
                                <p>获取客户难</p>
                                <p>店面辐射范围小</p>
                            </div>
                        </li>
                        <li class="problem-item">
                            <div class="left-icon">
                                <img src="static/images/pc-pro2.png" alt="">
                            </div>
                            <div class="right-text">
                                <p>客户感知度弱</p>
                                <p>品牌影响力缺乏</p>
                            </div>
                        </li>
                        <li class="problem-item">
                            <div class="left-icon">
                                <img src="static/images/pc-pro3.png" alt="">
                            </div>
                            <div class="right-text">
                                <p>信任感难建立</p>
                                <p>行业内鱼龙混杂</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 解决问题的渠道 -->
                <div class="part browser">
                    <h3>解决问题的渠道</h3>
                    <div class="browser-text">
                        <p>移动互联网时代，存金通帮您精准定位客户源</p>
                    </div>
                    <ul class="browser-list">
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-broeser1.png" alt="">
                            </div>
                            <p>百度浏览器</p>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-broeser2.png" alt="">
                            </div>
                            <p>360浏览器</p>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-broeser3.png" alt="">
                            </div>
                            <p>搜狗浏览器</p>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-broeser4.png" alt="">
                            </div>
                            <p>UC浏览器</p>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-broeser5.png" alt="">
                            </div>
                            <p>微博</p>
                        </li>
                        <li>
                            <div class="top-img">
                                <img src="static/images/pc-broeser6.png" alt="">
                            </div>
                            <p>微信</p>
                        </li>
                    </ul>
                </div>
                <!-- 我们的优势 -->
                <div class="part advantage">
                    <h3>我们的优势</h3>
                    <div class="advantage-wrap">
                        <div class="left-text">
                            <p><span></span>客户卖金场景全覆盖</p>
                            <p><span></span>回收流程专业便捷</p>
                            <p><span></span>营销模式精准高效</p>
                        </div>
                        <div class="right-img">
                            <img src="static/images/pc-map.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 黄金回收流程 -->
                <div class="part flow">
                    <h3>黄金回收流程</h3>
                    <div class="flow-img">
                        <!-- <img src="static/images/pc-flow-bg.png" alt=""> -->
                    </div>
                    <div class="flow-list-wrap">
                        <ul class="flow-list">
                            <li class="flow-item">
                                <div class="top-img">
                                    <img src="static/images/pc-flowicon1.png" alt="">
                                </div>
                                <p>黄金高价卖出</p>
                                <div class="flow-line"></div>
                                <div class="more-info">
                                    <p>直连上金所报价</p>
                                    <p>全品类回购</p>
                                    <p>手续费行业最低</p>
                                </div>
                            </li>
                            <li class="flow-item">
                                <div class="top-img">
                                    <img src="static/images/pc-flowicon2.png" alt="">
                                </div>
                                <p>流程高效安全</p>
                                <div class="flow-line"></div>
                                <div class="more-info">
                                    <p>顺丰快递、全额保价</p>
                                    <p>权威机构检测</p>
                                    <p>随时接受退换</p>
                                </div>
                            </li>
                            <li class="flow-item">
                                <div class="top-img">
                                    <img src="static/images/pc-flowicon3.png" alt="">
                                </div>
                                <p>极简体验</p>
                                <div class="flow-line"></div>
                                <div class="more-info">
                                    <p>一键完成回购</p>
                                    <p>微信公众号/APP </p>
                                    <p>/H5/小程序</p>
                                </div>
                            </li>
                            <li class="flow-item">
                                <div class="top-img">
                                    <img src="static/images/pc-flowicon4.png" alt="">
                                </div>
                                <p>直达精炼厂</p>
                                <div class="flow-line"></div>
                                <div class="more-info">
                                    <p>黄金回购直达精炼厂</p>
                                    <p>无中间商赚取差价</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 相关产品 -->
                <div class="part product">
                    <h3>相关产品</h3>
                    <div class="qrcode-wrap">
                        <div class="qrcode">
                            <img src="static/images/pc-code1.png" alt="">
                            <p>存金通商户版</p>
                            <p>扫描二维码关注存金通</p>
                        </div>
                        <div class="line"></div>
                        <div class="qrcode">
                            <img src="static/images/pc-code2.png" alt="">
                            <p>黄金管家APP</p>
                            <p>扫描二维码下载</p>
                        </div>
                    </div>
                </div>
                <!-- 股东背景 -->
                <div class="part gudong">
                    <h3>股东背景</h3>
                    <ul class="gudong-list">
                        <li class="gudong-item">
                            <img src="static/images/pc-company1.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/pc-company2.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/pc-company3.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/pc-company4.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/pc-company5.png" alt="">
                        </li>
                        <li class="gudong-item">
                            <img src="static/images/pc-company6.png" alt="">
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
import foot from '@/components/footer/foot.vue'
import { Popup,Toast,MessageBox } from 'mint-ui';
import { mapState,mapMutations } from 'vuex'
import { shop_status, shop, merchant_open_apply_status} from '@/service/getData.js'


    export default {
        data(){
            return{
                loginStatus:false,    // 是否登录
                pcStatus:false,      // 是否是pc端
                clientWidth:document.documentElement.clientWidth,//页面宽度
            }
        },
        components:{
            headTop,
            Popup,
            foot
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
        },
        methods: {
            ...mapMutations([
                'RECORD_ACCESSTOKEN','RECORD_SHOPID','RECORD_SHOPSTATUS'
            ]),
            // 点击我要入驻跳转操作
            goShop(){
                if(this.loginStatus){
                    this.merchant_open_apply_status();
                }else{
                    this.$router.push('/openshopguide');
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
                }else{
                    Toast('商户审核：'+res.message)
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
                // this.checkShopStatus();        // 店铺信息
                // this.query_index_statistics(); // 首页统计数据
                // console.log('accessToken',this.accessToken)
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
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.index{
	width: 100%;
    padding-bottom: .68rem;
	position: relative;
	top: 0;
	background-color: #fff;
	text-align: center;

    @keyframes scaleLoop1{
        0%{ transform: scale(1); }
        50%{ transform: scale(0.9); }
        100%{ transform: scale(1); }
    }
    @keyframes patt4{
        0%{ transform: rotate(-2deg);}
        50%{ transform: rotate(1deg);}
        100%{ transform: rotate(-2deg);}
    }
    .shops-located{
        width: 2.2rem;
        height: 2.4rem;
        position: fixed;
        right:0;
        top:65%;
        z-index: 1000;
        animation: scaleLoop1 .7s infinite;
        img{
            width: 100%;
        }
    }
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
        	font-weight:bold;
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
                padding:.35rem 0;
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
                padding:0 .3rem;
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
        background-color: #fff;

        .part{
            // width:900px;
            width:1000px;
            margin:0 auto;
            text-align: center;
            h3{
                color: #333;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 50px;
                letter-spacing:1.2px;
                font-family:PingFangSC-Medium;
            }
            .prospect-text, .problem-text{
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
            .prospect-text{
                margin-bottom: 30px;
            }
            .problem-text,.browser-text{
                text-align: center;
                p{
                    color: #666;
                    font-size: 12px;
                }
            }
        }
        .prospect{
            // width: 62%;
            width: 100%;
            margin:0 auto;
            padding:80px 0;
            .prospect-img{
                width:100%;
                align-items: center;
                justify-content: center;
                @include flex-box();
                // @include justify-content();
                li{
                    width:281px;
                    height: 222px;
                    padding:44px 34px 0;
                    margin-right: 20px;
                    align-items: center;
                    flex-direction: column;
                    @include flex-box();
                    @include box-shadow(2px 0px 30px rgba(31,20,17,0.06));
                    .top-img{
                        width: 74px;
                        height: 74px;
                        margin:0 auto 15px;
                        img{
                            width: 100%;
                        }
                    }
                    .bottom-text{
                        color: #666;
                        font-size: 12px;
                        line-height: 20px;
                        font-family:PingFangSC-Regular;
                    }
                }
            }

        }
        .problem{
            width: 100%;
            height:328px;
            padding:80px 0 60px;
            @include bg-image('/static/images/pc-problem-bg.png');
            background-size: 100% 100%;
            h3{
                color: #fff;
            }
            .problem-img{
                // width: 62%;
                width: 100%;
                margin:20px auto 0;
                position: relative;
                justify-content: center;
                @include flex-box();
                // @include justify-content();
                .problem-item{
                    width:281px;
                    // height: 89px;
                    padding:18px 20px;
                    margin-right: 20px;
                    background:rgba(255,255,255,0.1);
                    @include flex-box();
                    .left-icon{
                        width: 44px;
                        height:44px;
                        margin-right:20px;
                        img{
                            width: 100%;
                        }
                    }
                    .right-text{
                        text-align: left;
                        p{
                            color: #fff;
                            font-size: 12px;
                            line-height: 20px;
                        }
                    }
                }

            }
        }
        // 解决问题的渠道
        .browser{
            width: 100%;
            padding:70px 0;
            h3{
                margin-top:0;
                margin-bottom: 40px;
            }
            .browser-list{
                // width:62%;
                width: 100%;
                margin:30px auto 0;
                justify-content: center;
                @include flex-box();
                // @include justify-content();
                li{
                    width: 133px;
                    height: 133px;
                    margin-right: 18px;
                    text-align: center;
                    padding:30px 0;
                    background:rgba(248,248,248,1);
                    flex-direction: column;
                    @include flex-box();
                    .top-img{
                        width: 47px;
                        height: 47px;
                        margin: 0 auto 15px;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        color: #333;
                        font-size: 12px;
                    }
                }
            }
        }
        // 服务保障
        .advantage{
            width: 100%;
            height:370px;
            padding-top:80px;
            @include bg-image('/static/images/pc-advantage-bg.png');

            h3{
                color: #fff;
                font-size: 18px;
            }
            .advantage-wrap{
                // width:62%;
                width: 100%;
                height:100%;
                margin:0 auto;
                position: relative;
                justify-content: center;
                @include flex-box();


                .left-text{
                    width: 450px;
                    color: #fff;
                    font-size: 12px;
                    padding-top:20px;
                    text-align: left;
                    p{
                        margin-bottom: 24px;
                        span{
                            display: inline-block;
                            width: 12px;
                            height: 12px;
                            margin-right:15px;
                            @include bg-image('/static/images/pc-advantage-icon.png');
                        }
                    }
                }
                .right-img{
                    width: 444px;
                    height: 266px;
                    margin-top:10px;
                    img{
                        width: 100%;
                    }
                }
            }

        }
        // 回收流程
        .flow{
            width:100%;
            text-align: center;
            margin-top:120px;
            .flow-img{
                width: 100%;
                height: 376px;
                margin-top:50px;
                @include bg-image('/static/images/pc-flow-bg.png');
                img{
                    width: 100%;
                }
            }
            .flow-list-wrap{
                width:100%;
                height:296px;
                background-color: #333;
            }
            .flow-list{
                // width:62%;
                width: 100%;
                height:296px;
                margin:0 auto;
                background-color: #333;
                justify-content: center;
                @include flex-box();
                img{
                    width: 100%;
                }
                .flow-item{
                    width: 222px;
                    height:296px;
                    padding-top:80px;
                    text-align: center;
                    @include transition(.3s);
                    &:hover{
                        padding-top:40px;
                        @include transition(.3s);
                        .more-info{
                            display: block;
                            opacity: 1;
                            @include transition(.3s);
                        }
                    }
                    &:nth-of-type(1){
                        @include bg-image('/static/images/pc-flow-bg1.jpg');
                    }
                    &:nth-of-type(2){
                        @include bg-image('/static/images/pc-flow-bg2.jpg');
                    }
                    &:nth-of-type(3){
                        @include bg-image('/static/images/pc-flow-bg3.jpg');
                    }
                    &:nth-of-type(4){
                        @include bg-image('/static/images/pc-flow-bg4.jpg');
                    }
                    .top-img{
                        width: 126px;
                        height: 96px;
                        margin:0 auto;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        color: #fff;
                        font-size: 14px;
                        margin:20px 0 15px;
                    }
                    .flow-line{
                        width: 30px;
                        height: 1px;
                        margin:0 auto;
                        @include bg-image('/static/images/pc-flow-line.png');
                    }
                    .more-info{
                        margin-top:15px;
                        display: none;
                        opacity: 0;
                        @include transition(.3s);
                        p{
                            margin:0 !important;
                            line-height: 20px;
                            font-size: 12px;
                        }

                    }
                }
            }

        }
        // 相关产品
        .product{
            width: 100%;
            padding:70px 0;
            h3{
                margin-top:0;
                margin-bottom: 20px;
            }
            .qrcode-wrap{
                align-items: flex-start;
                justify-content: center;
                position: relative;
                @include flex-box();
                .qrcode{
                    &:nth-of-type(1){
                        margin-right:120px;
                    }
                    img{
                        width: 158px;
                        height: 158px;
                    }
                    p{
                        color: #333;
                        font-size: 14px;
                        font-family:PingFangSC-Regular;
                        &:nth-of-type(1){
                            margin-top:-20px;
                        }
                        &:nth-of-type(2){
                            color: #666;
                            font-size: 10px;
                        }
                    }
                }
                .line{
                    width: 1px;
                    height:310px;
                    background-color: #DDC899;
                    position: absolute;
                    top:20px;
                }
            }

        }
        // 股东背景
        .gudong{
            width: 100%;
            padding:80px 0 70px;
            background:rgba(248,248,248,1);
            .gudong-list{
                // width: 62%;
                width: 100%;
                margin:0 auto;
                justify-content: center;
                @include flex-box();
                // @include justify-content();
                .gudong-item{
                    width: 136px;
                    height: 60px;
                    margin-right: 14px;
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
                // width: 1000px;
                width: 100%;
                margin:0 auto;
                display: inline-block;
            	height: 200px;
                justify-content: center;
                @include flex-box();
                // @include justify-content();
                .pc_footer_content_left{
                	width: 432px;
                	height: 180px;
                	float: left;
                    margin-right: 280px;
                	background-image: url('/static/images/cjt-logo.png');
                	background-repeat: no-repeat;
                	background-size: 90px 27px;
                	background-position: 0px 40px;
                	padding-top: 80px;
                	text-align: left;
                    div{
                    	line-height: 30px;
                        font-size: 12px;
                    }
                }
                .pc_footer_content_right{
                	width: 174px;
                    height: 180px;
                    float: right;
                    text-align: left;
                    line-height: 25px;
                    // padding-left: 270px;
                    p{
                        font-size: 12px;
                        &:nth-of-type(1){
                            font-size: 24px;
                        	line-height: 90px;
                        	font-weight: bold;
                        }
                    }
                }
            }
        }
        .loca{
            width:888px;
            margin:0 auto;
        	color: #999999;
            font-size: 12px;
        	line-height: 73px;
        	text-align: left;
            border-top: 1px solid #999;

        }
    }
}
</style>
