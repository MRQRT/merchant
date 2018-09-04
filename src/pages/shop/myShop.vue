<template>
    <div class="shop-detail">
        <!-- 头部标题部分 -->
        <head-top headTitle='店铺信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 顶部banner -->
            <div class="banner">
                <swiper :options="swiperOption">
                    <swiper-slide class="banner-item" v-for="(item,index) in detailInfo.imageUrls" :key="index">
                        <!-- <img src="../../images/shopBanner.jpeg" alt=""> -->
                        <img :src="item" alt="" class="swiper_image">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                 <section class="headimg">
                    <img src="static/images/deheadpro.png" alt="">
                </section>
            </div>
            <!-- 店铺名称 -->
            <div class="shop-basic-info">
                <div class="name">{{name}}</div>
                <div class="star" :class="starJson[judgeStar(detailInfo.star)].className">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="labels">
                    <span v-for="(item,index) in detailInfo.label" :key="index">{{item}}</span>
                </div>
            </div>
            <!-- 店铺介绍 -->
            <div class="shop-instruction">
                <h3>店铺介绍</h3>
                <p>{{detailInfo.mark}}</p>
            </div>
            <!-- 店铺地址 -->
            <div class="shop-address">
                <h3>店铺地址</h3>
                <p>{{detailInfo.address}}</p>
                <div class="position-img" id="container">
                    <img src="" alt="">
                </div>
            </div>
            <!-- 电话 -->
            <div class="phone">
                <p>400-166-9999</p>
            </div>
            <!-- 商户号 -->
            <div class="merchantnum" style="margin-top:.1rem;">
                <span>商户号：{{merchantId}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import '@/style/swiper.min.css'
import {shopDetail} from '@/service/getData.js';
import { mapState,mapMutations } from 'vuex'

    export default {
        data(){
            return{
                id:'',
                className:'',
                name:'周大福（中关村店）',
                lat:'',
                lng:'',
                swiperOption:{
                    notNextTick: true,
                    slidesPerView: 1,
                    loop:true,
                    effect:'slide',
                    pagination:'.swiper-pagination',
                    paginationType:'fraction',
                },
                detailInfo:{
                    imageUrls:[{},{},{},{}],
                    mark:'我卖黄金、收黄金、维修各种金银首饰等等等等等等，我卖黄金、收黄金、维修各种金银首饰等等等等等等，我卖黄金、收黄金、维修各种金银',
                    star:90,
                    address:'北京市北京市北京市北京市北京市',
                    phone:17600568656,
                    lat:'',
                    lng:'',
                    label:['回购','存金'],
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
                var res = await shopDetail(this.id);
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
            // this.id = this.$route.query.id;
            this.id='ff808081657ae48001657b276e4600fa'
            this.className = this.$route.query.className;
            // this.name = this.$route.query.name
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
.shop-instruction, .shop-address{
    width:100%;
    padding:0 .4rem;
    position: relative;
}
.shop-instruction h3, .shop-address h3{
    color: #000;
    font-size: .3rem;
    margin-bottom: .25rem;
}
.shop-instruction p, .shop-address p{
    color: #666;
    font-size: .26rem;
    line-height: .4rem;
}
.shop-address{
    margin-top:.6rem;
}
.shop-address .position-img{
    height: 3.5rem;
    margin-top:.1rem;
    border:1px solid #eee;
}
.shop-address .position-img img{
    width: auto;
    height: 100%;
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
    width: 1.54rem;
    height: 1.54rem;
    border: 2px solid #fff;
    position: absolute;
    bottom: -.56rem;
    left: .4rem;
    z-index: 2;
}
.headimg img{
    height:1.54rem;
}
</style>
