<template>
    <div class="storeResult">
        <!-- 头部标题部分 -->
        <head-top headTitle='存金结果' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 订单成功 -->
            <div class="success" v-if="orderstatus">
                <!-- 顶部图标部分 -->
                <div class="top-info">
                    <div class="top-img">
                        <img src="static/images/store-success.png" alt="">
                    </div>
                    <p>恭喜，您的存金订单成功提交！</p>
                </div>
                <!-- 地址部分 -->
                <div class="address-info">
                    <div class="left-icon"></div>
                    <div class="right-text">
                        <p class="name-tel">
                            <span class="name">张艺兴</span>
                            <span class="tel">{{13520842445 | hideMible}}</span>
                        </p>
                        <p class="add">北京市丰台区嘉和人家翠庭园3号楼1501和人家翠庭园楼1501</p>
                    </div>
                </div>
                <!-- 订单信息 -->
                <div class="order-info">
                    <h3>存金信息</h3>
                    <div class="detail-info">
                        <div class="info-item">
                            <span>订单编号</span>
                            <span>CJ20180305001</span>
                        </div>
                        <div class="info-item">
                            <span>存金类型</span>
                            <span>首饰</span>
                        </div>
                        <div class="info-item">
                            <span>存金重量</span>
                            <span>{{200.000}}克</span>
                        </div>
                        <div class="info-item">
                            <span>锁价保证金</span>
                            <span class="special-color">{{123.456 | formatPriceTwo}}元</span>
                        </div>
                        <div class="info-item">
                            <span>锁定金价</span>
                            <span class="special-color">{{123.456 | formatPriceTwo}}元</span>
                        </div>
                    </div>
                </div>
                <!-- 银行卡 -->
                <div class="bank-info">
                    <span>银行卡</span>
                    <span>工商银行(尾号1234)</span>
                </div>
                <!-- 提示 -->
                <div class="tip">工作人员会尽快联系您核实订单</div>
                <!-- 按钮部分 -->
                <div class="btn-opration">
                    <div class="go-detail" @click="$router.push('/storeOrderDetail')">查看订单</div>
                    <div class="go-index" @click="$router.push('/index')">返回首页</div>
                </div>
            </div>
            <!-- 订单失败 -->
            <div class="error" v-else>
                <!-- 顶部图标部分 -->
                <div class="top-info">
                    <div class="top-img">
                        <img src="static/images/store-success.png" alt="">
                    </div>
                    <p>订单支付失败</p>
                </div>
                <!-- 失败原因 -->
                <div class="reason">失败原因：根据三方回调结果展示</div>
                <!-- 按钮部分 -->
                <div class="btn-opration">
                    <div class="go-detail" @click="$router.push('/storeOrderDetail')">查看订单</div>
                    <div class="go-index" @click="$router.push('/index')">返回首页</div>
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
                orderstatus:true, // 订单是否成功
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
.storeResult{
    width: 100%;
    background-color: #f8f8f8;
    .main-cont{
        min-height: 100vh;
        font-family:PingFangSC-Regular;
        .success{
            width:100%;
            padding-top:.88rem;
            padding-bottom: .4rem;
        }
        .top-info{
            width: 100%;
            text-align: center;
            padding:.6rem .4rem;
            background-color: #fff;
            .top-img{
                width: 1rem;
                height: 1rem;
                margin:0 auto .3rem;
                img{
                    width: 100%;
                }
            }
            p{
                color: #000;
                font-size: .34rem;
                padding-left:.5rem;
                font-family: PingFangSC-Medium;
            }
        }
        .address-info{
            width: 100%;
            padding:.4rem;
            align-items: center;
            background-color: #fff;
            @include flex-box();
            .left-icon{
                width: .44rem;
                height: .44rem;
                margin-right:.3rem;
                background-color: #eee;
                @include bg-image('/static/images/add-icon.png');
            }
            .right-text{
                width:90%;
                color: #333;
                font-size: .32rem;
                .name-tel{
                    margin-bottom: .2rem;
                    .name{
                        margin-right: .2rem;
                    }
                }
                .add{
                    font-size: .26rem;
                    @include overflow();
                }
            }
        }
        .order-info{
            padding:.3rem .4rem;
            margin:.2rem 0;
            background-color: #fff;
            h3{
                color: #000;
                font-size: .34rem;
                font-family:PingFangSC-Regular;
                margin-bottom: .2rem;
            }
            .detail-info{
                .info-item{
                    width:100%;
                    height: .5rem;
                    line-height: .5rem;
                    color: #666;
                    font-size: .28rem;
                    @include flex-box();
                    @include justify-content();
                    .special-color{
                        color: #C09C60;
                    }
                }
            }
        }
        .bank-info{
            height: .9rem;
            line-height: .9rem;
            color: #333;
            font-size: .3rem;
            padding:0 .4rem;
            background-color: #fff;
            @include flex-box();
            @include justify-content();
        }
        .tip{
            color: #999;
            font-size: .24rem;
            padding:.2rem .4rem;
        }
        .btn-opration{
            width:100%;
            padding:0 .4rem;
            margin-top:.6rem;
            @include flex-box();
            @include justify-content();
            div{
                height: .88rem;
                line-height: .87rem;
                font-size: .34rem;
                text-align: center;
                @include flex-grow(1);
                @include border-radius(4px);
            }
            .go-detail{
                color: #C09C60;
                margin-right: .2rem;
                border:1px solid #C09C60;
            }
            .go-index{
                color: #fff;
                background-color: #DDC899;
            }
        }
        .error{
            height: 100vh;
            padding-top:.88rem;
            background-color: #fff;
            .top-info{
                padding:.7rem .4rem;
                p{
                    padding-left:0 !important;
                }
            }
            .reason{
                width: 100%;
                text-align: center;
                color: #666;
                font-size: .28rem;
                margin-bottom: 2rem;
            }
        }
    }
}
</style>
