<template>
    <div class="aboutus">
        <!-- 头部标题部分 -->
        <head-top headTitle='关于我们' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- logo -->
        <section class="logo">

        </section>
        <!-- title -->
        <section class="title">存金通商户版</section>
        <!-- li -->
        <div class="li"><span>官方网站</span><a href="https://www.au32.cn">www.au32.cn</a></div>
        <div class="li"><span>客服电话</span><span>400-819-6199</span></div>
        <div class="li btn1" data-clipboard-text="cjtsh"><span>微信公众号-存金通商户版</span><span>cjtsh</span></div>
        <div class="li btn2" data-clipboard-text="cjtwh"><span>微信公众号-存金通个人版</span><span>cjtwh</span></div>
        <div class="li"><span>黄金管家官方群2018</span><span>763646474</span></div>
        <div class="li"><span>黄金管家分析群2018</span><span>556533099</span></div>
        <div class="li" style="height:.7rem;"><span style="height:.7rem;">公司地址</span><span style="height:.7rem;">北京市海淀区海淀北二街</span></div>
        <section class="address">中关村SOHO B区1209</section>
        <!-- 遮罩层 -->
        <section class="cover" v-show="cover_show">
        </section>
        <div class="message_box" v-show="cover_show">
            <h4>提示</h4>
            <p>{{message}}</p>
            <div class="button">
                <span class="right" @click="butt('confirm')">我知道了</span>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue';
import { MessageBox } from 'mint-ui';
    export default {
        data(){
            return{
                cover_show: false,//遮罩层开关
                   message: '',//提示信息
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{

        },
        methods: {
            butt(){
                this.cover_show=false;
            } 
        },
        created(){

        },
        mounted(){
            var that = this;
            var clipboard1 = new ClipboardJS('.btn1');
            var clipboard2 = new ClipboardJS('.btn2');
            clipboard1.on('success', function(e) {
                that.message='微信号“cjtsh”已复制到剪切板。您可以到微信中关注我们。'
                that.cover_show=true
            });
            clipboard1.on('error', function(e) {
                console.log('复制出错')
            });
            clipboard2.on('success', function(e) {
                that.message='微信号“cjtwh”已复制到剪切板。您可以到微信中关注我们。'
                that.cover_show=true
            });
            clipboard2.on('error', function(e) {
                console.log('复制出错')
            });
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.aboutus{
    width: 100%;
    min-height: 100vh;
}
.logo{
    width: 100%;
    height: 4.13rem;
    @include bg-image('/static/images/aicon.png');
    background-size: 37%;
    background-position: 62% 95%;
}
.title{
    font-size: .4rem;
    color: #333;
    font-weight:bold;
    text-align:center;
}
.li{
    width: 100%;
    height: 1.1rem;
    padding: 0 .4rem 0 .4rem;
    line-height: 1.1rem;
    font-size: .32rem;
    color: #333;
}
.li>a{
    float: right;color:#C09C60;
}
.li span:nth-child(1){
    float: left;
    height: 1.1rem;
}
.li span:nth-child(2){
    float: right;
    height: 1.1rem;
}
.address{
    width: 100%;
    text-align:right;
    font-size: .32rem;
    color: #333;
    line-height: .6rem;
    padding-right: .4rem;
}
/*遮罩层*/
.cover{
	position: fixed;
	top:0;
	width:100%;
	min-height: 100vh;
	background-color:rgba(0, 0, 0, .5);
	z-index:1000;
}
.message_box{
	width: 4.9rem;
	height: 2.83rem;
	background-color: #fff;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -2.45rem;
	margin-top: -1.25rem;
	z-index: 1001;
}
.message_box h4{
	font-size:.32rem;
	font-weight: bold;
	color:#333;
	text-align: center;
	line-height: 1rem;
}
.message_box p{
	font-size: .26rem;
	color:#333;
	text-align: center;
    line-height: .4rem;
    padding:0 .3rem 0 .3rem;
}
.button{
	width: 100%;
	height: .88rem;
	position: absolute;
	bottom:0;
}
.button span{
    float: left;
    width: 100%;
	text-align:center;
	line-height: .88rem;
	font-weight:400;
	color:rgba(192,156,96,1);
	font-size: .32rem;
    position: relative;
    left:0;
    top:0;
}
@media(-webkit-min-device-pixel-ratio:1.5),(-moz-min-device-pixel-ratio:1.5),(-o-min-device-pixel-ratio:1.5){
	.button:before{
		content: '';
		display: inline-block;
		width: 100%;
		border-top: 1px solid #eeeeee;
		-webkit-transform: scaleY(0.7);
		-o-transform: scaleY(0.7);
		-moz-transform: scaleY(0.7);
		transform:scaleY(0.7);
		position: absolute;
		top:0;
	}
}
@media(-webkit-min-device-pixel-ratio:2),(-moz-min-device-pixel-ratio:2),(-o-min-device-pixel-ratio:1.5){
	.button:before{
		content: '';
		display: inline-block;
		width: 100%;
		border-top: 1px solid #eeeeee;
		-webkit-transform: scaleY(0.5);
		-o-transform: scaleY(0.5);
		-moz-transform: scaleY(0.5);
		transform:scaleY(0.5);
		position: absolute;
		top:0;
    }
}
</style>
