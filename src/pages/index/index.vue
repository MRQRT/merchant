<template>
    <div class="index">
        <!-- 头部标题部分 -->
        <head-top headTitle='存金通' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体内容 -->
        <div class="main-cont">
            <div class="nav" @click="navPopup">导航</div>
            <div class="" @click="$router.push('/storeGold')">存金页</div>
            <div class="" @click="$router.push('/storeResult')">存金结果页</div>
            <div class="" @click="$router.push('/storeOrderList')">存金订单</div>
            <div class="" @click="$router.push('/myBank')">我的银行卡</div>
            <!-- <div class="" @click="$router.push('/register')">注册页</div>
            <div class="" @click="$router.push('/bindingWechat')">微信绑定手机页</div>
            <div class="" @click="$router.push('/changeMobile')">修改绑定手机</div>
            <div class="" @click="$router.push('/changePassword')">修改密码</div> -->
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
        <mt-popup v-model="popupVisible" position="left">
            <div class="nav-wrap">
                <!-- 店铺图标名称 -->
                <div class="top-info">
                    <div class="shop-logo">
                        <img src="static/images/shop-logo.png" alt="">
                    </div>
                    <p>我的店铺啦啦啦啦啦啦啦啦啦啦</p>
                </div>
                <!-- 导航路由 -->
                <ul class="nav-list">
                    <li @click="$router.push('/assets')">
                        <span class="icon1"></span>
                        <span>我的资产</span>
                    </li>
                    <li @click="$router.push('/storeOrderList')">
                        <span class="icon2"></span>
                        <span>我的订单</span>
                    </li>
                    <li>
                        <span class="icon3"></span>
                        <span>帐户管理</span>
                    </li>
                    <li>
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
            }
        },
        components:{
            headTop,
            Popup
        },
        computed: {

        },
        watch:{

        },
        methods: {
            navPopup(){
                this.popupVisible = true;
            }
        },
        created(){

        },
        mounted(){

        },
    }

</script>


<style scoped lang="scss">
@import '../../sass/mixin';
.index{
    width:100%;
    padding-top:1rem;
    padding-left:.4rem;
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
    .nav-wrap{
        width:5rem;
        height: 100vh;
        padding:1.6rem .5rem 0 .6rem;
        background-color: #fff;
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
}
</style>
