<template>
    <div class="assets">
        <!-- 头部标题部分 -->
        <head-top headTitle='资产' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 顶部保证金 -->
            <div class="top-cash">
                <p class="title">保证金(元)</p>
                <p class="price">{{1500.00 | formatPriceTwo}}</p>
                <p class="tip">当前进行中订单保证总金额</p>
            </div>
            <!-- 银行卡 -->
            <div class="bank-wrap">
                <h3>银行卡</h3>
                <div class="bank">
                    <div class="left-part">
                        <div class="icon"></div>
                        <div class="text">
                            <p class="bank-name">中国工商银行</p>
                            <p class="bank-num">尾号3232</p>
                        </div>
                    </div>
                    <div class="right-part">

                    </div>
                </div>
            </div>
        </div>
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
.assets{
    width:100%;
    min-height: 100vh;
    padding-top:.88rem;
    background-color: #f8f8f8;
    .main-cont{
        .top-cash{
            width:100%;
            height: 3.4rem;
            color: #fff;
            text-align: center;
            padding-top:.7rem;
            background:linear-gradient(-74deg,rgba(192,156,96,0.9),rgba(218,194,142,0.9));
            .title{
                font-size: .28rem
            }
            .price{
                font-size: .7rem;
                font-family:DINAlternate-Bold;
                margin:.15rem 0 .1rem;
            }
            .tip{
                font-size: .24rem;
            }
        }
        .bank-wrap{
            h3{
                height: .96rem;
                line-height: .98rem;
                color: #333;
                font-size: .34rem;
                padding:0 .4rem;
                font-family:PingFangSC-Medium;
            }
            .bank{
                width:100%;
                height: 1.4rem;
                padding:0 .4rem;
                background-color: #fff;
                align-items: center;
                @include flex-box();
                @include justify-content();

                .left-part{
                    align-items: center;
                    @include flex-box();

                    .icon{
                        display: inline-block;
                        width: .55rem;
                        height: .55rem;
                        margin-right:.25rem;
                        background-color: #eee;
                        @include border-radius(50%);
                    }
                    .text{
                        .bank-name{
                            color: #333;
                            font-size: .34rem;
                            font-family:PingFangSC-Medium;
                        }
                        .bank-num{
                            font-size: .24rem;
                            font-family:PingFangSC-Regular;
                        }
                    }
                }
                .right-part{
                    width: .15rem;
                    height: .35rem;
                    @include rotate(180deg);
                    @include bg-image('/static/images/back.png');
                }
            }
        }
    }
}
</style>
