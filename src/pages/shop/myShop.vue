<template>
    <div class="myshop">
        <!-- 头部标题部分 -->
        <head-top headTitle='店铺信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- banner -->
        <div class="banner">
            <swiper :options="swiperOption">
                <swiper-slide class="swiper_slide" v-for="(item,index) in banner" :key="index"><img :src="item"></swiper-slide>
            </swiper>
            <section class="headimg">
                <img src="static/images/deheadpro.png" alt="">
            </section>
        </div>
        <!-- shopname -->
        <div class="shop_name">
            <p>{{shopname}}{{shopadd}}</p>
        </div>
        <!-- star -->
        <div class="star">
            <img :src="item" alt="星级评价" v-for="(item,index) in stars" :key="index">
        </div>
        <!-- 业务范围 -->
        <div class="scope">
            <span>回购</span>
            <span>提金</span>
            <span>换购</span>
            <span>维保</span>
        </div>
        <!-- 店铺简介 -->
        <div class="intro">
            <h5>店铺介绍</h5>
            <div class="shop_des">{{shopintro}}</div>
        </div>
        <!-- 地址 -->
        <div class="add">
            <h5>店铺地址</h5>
            <div class="position">{{position}}</div>
        </div>
        <!-- map -->
        <div class="map">
            <section></section>
        </div>
        <!-- 电话 -->
        <div class="phone">
            <p>400-166-9999</p>
        </div>
        <!-- 商户号 -->
        <div class="merchantnum">
            <span>商户号：{{merchantnum}}</span>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import headprobg from 'static/images/headprobg.png'
import star from "static/images/open_eye.png"

    export default {
        data(){
            return{
                swiperOption: {//swiper
                    autoplay: 3000,
                    speed: 1000,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                },
                banner:[
                    headprobg,
                    headprobg,
                    headprobg,
                    headprobg,
                    headprobg,
                ],
                shopname: '周大福',
                shopadd:'（当代广场店）',
                stars: [star,star,star,star,star],
                shopintro:'我卖黄金，收黄金，斯拉夫为俄方你色拉酱死了快点解放了拉家带口理解上的克己复礼上课了大家份路上的风景圣诞节啊放辣椒了辣椒宽带连接了，阿地方了将阿里肯德基健康水淀粉节微积分离开，额四二姐绿卡。',
                position: "北京市海淀去海淀被热解",
                merchantnum: 1234567890122,
            }
        },
        components:{
            headTop,
            swiper,
            swiperSlide
        },
        computed: {

        },
        watch:{

        },
        methods: {

        },
        created(){

        },
        mounted(){

        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.myshop{
    width: 100%;
    min-height: 100vh;
    padding-top: .88rem;
}
.banner{
    width: 100%;
    height: 5rem;
    position: relative;
}
.swiper-container{
    width: 100%;
    height: 5rem;
}
.swiper_slide{
    width: 100%;
    height: 5rem;
}
.swiper_slide img{
    height: 5rem;
    width: 100%;
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
.shop_name{
    font-size: .4rem;
    padding-left: .4rem;
    padding-top: 1rem;
    font-weight: bold;
    height: 1.6rem;
}
.star{
    width: 100%;
    height: .5rem;
    padding-top: .1rem;
    padding-left: .4rem;
}
.star img{
    width: .24rem;
    height: .24rem;
    margin-right: .2rem;
    float: left;
}
.scope{
    width: 100%;
    padding-left: .4rem;
    overflow: hidden;
}
.scope span{
    font-size: .2rem;
    color: #EDA835;
    float: left;
    margin-right: .1rem;
    border: 1px solid #EDA835;
    border-radius: 2px;
    height: .32rem;
    line-height: .32rem;
    width: .56rem;
    font-size: .2rem;
}
.intro,.add{
    width: 100%;
    padding: 0.3rem .4rem 0 .4rem;
}
.intro h5,.add h5{
    font-size: .3rem;
    color: #333;
    line-height: .6rem;
}
.shop_des,.position{
    font-size: .26rem;
    color: #666;
    line-height: .42rem;
}
.map{
    width: 100%;
    padding: 0.1rem .4rem 0 .4rem; 
}
.map section{
    width: 100%;
    height: 3.35rem;
    border: 1px solid #cac6c6;
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
    @include bg-image("/static/images/phone.png");
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
</style>
