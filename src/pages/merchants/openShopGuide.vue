<template>
    <div class="openshopguide">
        <!-- 头部标题部分 -->
        <head-top headTitle='商户入驻' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- banner -->
        <div class="banner"></div>
        <!-- body -->
        <div class="body">
            <section class="adv">
                <img src="static/images/guideadv1.png" alt="">
                <div class="textintr">
                    <h6>卖金流程化</h6>
                    <p>没有中间商赚差价，少费心</p>
                </div>
            </section>
            <section class="adv">
                <img src="static/images/guideadv2.png" alt="">
                <div class="textintr">
                    <h6>利润最大化</h6>
                    <p>多元化的变现方式，多赚钱</p>
                </div>
            </section>
            <section class="adv">
                <img src="static/images/guideadv3.png" alt="">
                <div class="textintr">
                    <h6>获客精准化</h6>
                    <p>矩阵式的获客渠道，更精准</p>
                </div>
            </section>
        </div>
        <!-- footer -->
        <footer>
            <section @click="$router.push('/uploadcertificate')">立即入驻</section>
        </footer>
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
.openshopguide{
    padding-top: .88rem;
    min-height: 100vh;
    width: 100%;
    background-color: #fff; 
}
.banner{
    width: 100%;
    height: 3.4rem;
    @include bg-image("/static/images/guidebanner.png")
}
.body{
    width: 100%;
    margin-top: .4rem;
}
.adv{
    width: 100%;
    height: 1.7rem;
    padding-top: .4rem;
    display: flex;
    justify-content: center;
}
.adv img{
    width: .9rem;
    height: .9rem;
    float: left;
}
.textintr{
    float: left;
    padding-left: .4rem;
}
.textintr h6{
    font-size: .34rem;
    color: #C09C60;
    text-align: left;
}
.textintr p{
    font-size: .26rem;
    color: #666666;
    text-align: left;
    margin-top: .05rem;
}
footer{
    width: 100%;
    padding-bottom: .4rem;
    display: flex;
    justify-content: center;
    margin-top:2rem;
}
footer section{
    width: 6.7rem;
    height: .88rem;
    font-size: .34rem;
    color: #fff;
    background: #DDC899;
    text-align: center;
    line-height: .88rem;
    border-radius:4px;
}
</style>
