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
        <div class="li"><span>微信公众号</span><span>hjgjdyh</span></div>
        <div class="li"><span>黄金管家官方群2018</span><span>763646474</span></div>
        <div class="li"><span>黄金管家分析群2018</span><span>556533099</span></div>
        <div class="li" style="height:.7rem;"><span style="height:.7rem;">公司地址</span><span style="height:.7rem;">北京市海淀区海淀北二街</span></div>
        <section class="address">中关村SOHO B区1209</section>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{

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

        },
        created(){

        },
        mounted(){

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
</style>
