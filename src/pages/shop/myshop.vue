<template>
    <div class="shop-detail">
        <!-- 头部标题部分 -->
        <head-top headTitle='店铺信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='/static/images/back.png' class="head_goback" @click="$router.push('/mine')">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 顶部banner -->
            <div class="banner">
                <swiper :options="swiperOption">
                    <swiper-slide class="banner-item" v-for="(item,index) in detailInfo.facadePaths" :key="index">
                        <img :src="item" alt="" class="swiper_image">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination" style="width:.8rem;"></div>
                </swiper>
                 <section class="headimg">
                    <img :src="detailInfo.logoPath" alt="">
                </section>
            </div>
            <!-- 店铺名称 -->
            <div class="shop-basic-info">
                <div class="name">{{detailInfo.name}}</div>
                <div class="star" :class="starJson[judgeStar(detailInfo.score)].className">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="labels">
                    <span v-for="(item,index) in detailInfo.businessScopeNames" :key="index">{{item}}</span>
                </div>
            </div>
            <!-- 店铺介绍 -->
            <div class="shop-instruction">
                <h3>店铺介绍</h3>
                <p>{{detailInfo.introduce}}</p>
            </div>
            <!-- 店铺地址 -->
            <div class="shop_address_content">
                <h3>店铺地址</h3>
                <p class="shop_address" v-show="detailInfo.provinceName">
                    <span>{{detailInfo.provinceName}} | </span>
                    <span>{{detailInfo.cityName}} | </span>
                    <span>{{detailInfo.areaName}}</span>
                </p>
                <p class="shop_location">{{detailInfo.address}}</p>
                <p class="shop_nearby">{{detailInfo.nearby}}</p>
                <div class="position-img" id="container">
                    <img src="" alt="">
                </div>
            </div>
            <!-- 电话 -->
            <div class="phone">
                <p>{{detailInfo.mobile}}</p>
            </div>
            <!-- 商户号 -->
            <div class="merchantnum" style="margin-top:.1rem;">
                <span>商户号：{{detailInfo.merchantCode}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import 'swiper/dist/css/swiper.css'
// import '@/style/swiper.min.css'
import {shopDetail} from '@/service/getData.js';
import { mapState,mapMutations } from 'vuex';
import back from 'static/images/hgdBg.jpg';
    export default {
        data(){
            return{
                id:'',
                className:'',
                name:'',
                lat:'',
                lng:'',
                swiperOption:{
                    notNextTick: true,
                    slidesPerView: 1,
                    loop:true,
                    effect:'slide',
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true,
                        type:'fraction',
                    },
                    autoplay:{
                        stopOnlastSlide: false,
                    },
                },
                detailInfo:{
                    facadePaths:[],
                    logoPath:'',
                    introduce:'',
                    star:'',
                    address:'',
                    mobile:'',
                    lat:'',
                    lng:'',
                    businessScopeNames:[],
                    name:'',
                },
                starJson:{
                    '2.5':{className:'twoHalf'},
                    '3':{className:'threeStar'},
                    '3.5':{className:'threeHalf'},
                    '4':{className:'fourStar'},
                    '4.5':{className:'fourHalf'},
                    '5':{className:'fullStar'},
			    },
            }
        },
        components:{
            headTop,
        },
        computed: {
            ...mapState([
                'merchantId'
            ])
        },
        watch:{

        },
        methods: {
            // 显示店铺地图
            getMap(){
                var map = new BMap.Map("container");        // 创建地图实例
                var point = new BMap.Point(this.lng,this.lat); // 创建点坐标
                map.centerAndZoom(point, 15);               // 初始化
                var marker = new BMap.Marker(point);        // 创建标注
                map.addOverlay(marker);                     // 将标注添加到地图中
            },
            // 请求详情数据
            async shopDetail(){
                var res = await shopDetail('');
                // console.log(res)
                if(res.code=='000000'){
                    this.detailInfo = res.data;
                    this.lat = res.data.lat; // 纬度
                    this.lng = res.data.lng; // 经度
                    this.getMap();           // 展示地图
                }
            },
            // 判断星级
            judgeStar(val){
                if(val>=91 && val<=100){
                    return 5
                }else if(val>=81 && val<=90){
                    return 4.5
                }else if(val>=71 && val<=80){
                    return 4
                }else if(val>=61 && val<=70){
                    return 3.5
                }else if(val>=51 && val<=60){
                    return 3
                }else{
                    return 2.5
                }
            },
        },
        created(){
        },
        mounted(){
            this.shopDetail();
        },
    }
</script>
<style media="screen">
    .swiper-pagination{
        width:.8rem;
        height: .42rem;
        color:#fff;
        text-align: center;
        line-height: .42rem;
        font-size: .24rem;
        background:rgba(0,0,0,1);
        opacity:0.3;
        border-radius:21px;
        position: absolute;
        left:86% !important;
        bottom:.3rem;
    }
    .swiper-container{
        height:100% !important;
    }
</style>

<style scoped>
.shop-detail{
    width: 100%;
    padding-top:.88rem;
    padding-bottom: .4rem;
    min-height: 100vh;
}
.main-cont{

}
.main-cont .banner{
    height:5rem;
    background-color: #eee;
    position: relative;
}
.swiper_image{
    width: 100%;
    height: 5rem;
    object-fit: cover;
}
.shop-basic-info{
    width: 100%;
    padding:0 .4rem;
    margin:.9rem 0 .6rem;
}
.name{
    color: #333333;
    font-size: .4rem;
    height:.5rem;
    font-weight:bold;
}
.shop-basic-info .star{
    flex-grow: 2;
    padding:.1rem;
}
.star span{
    display: inline-block;
    width: .24rem;
    height: .24rem;
    background: url('/static/images/empty-star.png') no-repeat;
    background-size: 100%;
}
.star span:nth-of-type(1){
    background: url('/static/images/one-star.png') no-repeat;
    background-size: 100%;
}
.star span:nth-of-type(2){
    background: url('/static/images/one-star.png') no-repeat;
    background-size: 100%;
}
.star span:nth-of-type(3){
    background: url('/static/images/one-star.png') no-repeat;
    background-size: 100%;
}
.star span:nth-of-type(4){
    background: url('/static/images/four-star.png') no-repeat;
    background-size: 100%;
}
.star span:nth-of-type(5){
    background: url('/static/images/five-star.png') no-repeat;
    background-size: 100%;
}
/* 2.5星 */
.twoHalf span:nth-of-type(3){
    background: url('/static/images/one-pice-star.png') no-repeat;
    background-size: 100%;
}
/* 2.5/3星 */
.twoHalf span:nth-of-type(4), .threeStar span:nth-of-type(4){
    background: url('/static/images/empty-star.png') no-repeat;
    background-size: 100%;
}
/* 3.5/4星 */
.twoHalf span:nth-of-type(5), .threeStar span:nth-of-type(5),.threeHalf span:nth-of-type(5),.fourStar span:nth-of-type(5){
    background: url('/static/images/empty-star.png') no-repeat;
    background-size: 100%;
}
/* 3.5星 */
.threeHalf span:nth-of-type(4){
    background: url('/static/images/four-pice-star.png') no-repeat;
    background-size: 100%;
}
/* 4.5星 */
.fourHalf span:nth-of-type(5){
    background: url('/static/images/five-pice-star.png') no-repeat;
    background-size: 100%;
}
.shop-basic-info  .labels span{
    display: inline-block;
    padding:0 .04rem;
    height: .35rem;
    text-align: center;
    line-height: .35rem;
    color: #EDA835;
    font-size: .18rem;
    margin-right:.1rem;
    border:1px solid #F2B643;
    border-radius: 3px;
}
.shop-instruction, .shop_address_content{
    width:100%;
    padding:0 .4rem;
    position: relative;
}
.shop-instruction h3, .shop_address_content h3{
    color: #000;
    font-size: .3rem;
    margin-bottom: .25rem;
}
.shop-instruction p, .shop_address_content p{
    color: #666;
    font-size: .26rem;
    line-height: .4rem;
}
.shop_address_content{
    margin-top:.6rem;
}
.shop_address_content .position-img{
    height: 3.5rem;
    margin-top:.1rem;
    border:1px solid #eee;
}
.shop_address_content .position-img img{
    width: auto;
    height: 100%;
}
.shop_address{
    background-image:url('/static/images/address_icon.png');
    background-position: 0 .05rem;
    background-repeat: no-repeat;
    background-size: .28rem;
    padding-left: .5rem;
}
.shop_location{
    background-image:url('/static/images/location_icon.png');
    background-position: 0 .05rem;
    background-repeat: no-repeat;
    background-size: .28rem;
    padding-left: .5rem;
}
.shop_nearby{
    background-image:url('/static/images/nearby_icon.png');
    background-position: 0 .05rem;
    background-repeat: no-repeat;
    background-size: .28rem;
    padding-left: .5rem;
}
.phone{
    padding-top: .5rem;
}
.phone p{
    font-size: .4rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    line-height: .8rem;
    background:url("/static/images/phone.png");
    background-repeat:no-repeat;
    background-size: .5rem;
    background-position: 26% center;
    padding-left: .4rem;
}
.merchantnum{
    font-size: .24rem;
    color: #999999;
    text-align: center;
    padding-bottom: .4rem;
}
.headimg{
    width: 1.58rem;
    height: 1.58rem;
    border: 2px solid #fff;
    position: absolute;
    bottom: -.56rem;
    left: .4rem;
    z-index: 2;
}
.headimg img{
    height:1.5rem;
    width:1.5rem;
    object-fit:cover;
}
.banner-item{
    width:100%;
    height:5rem;
}
.swiper_image{
    width:100%;
    height:5rem;
}
</style>
