<template>
    <div class="storeResult">
        <!-- 头部标题部分 -->
        <head-top headTitle='存金结果' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push('/index')">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 订单成功 -->
            <div class="success" v-if="orderStatus==1">
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
                            <span class="name">{{orderInfo.contact}}</span>
                            <span class="tel">{{orderInfo.telephone | hideMible}}</span>
                        </p>
                        <p class="add" v-if="orderInfo.address">{{orderInfo.address|clearStr}}</p>
                    </div>
                </div>
                <!-- 订单信息 -->
                <div class="order-info">
                    <h3>存金信息</h3>
                    <div class="detail-info">
                        <div class="info-item">
                            <span>订单编号</span>
                            <span>{{orderInfo.code}}</span>
                        </div>
                        <div class="info-item">
                            <span>存金类型</span>
                            <span>{{typeJson[orderInfo.productType]}}</span>
                        </div>
                        <div class="info-item">
                            <span>存金重量</span>
                            <span>{{orderInfo.applyWeight | formatPriceTwo}}克</span>
                        </div>
                        <div class="" v-if="orderInfo.lockprice">
                            <div class="info-item">
                                <span>锁价保证金</span>
                                <span class="special-color">{{orderInfo.ensureCash | formatPriceTwo}}元</span>
                            </div>
                            <div class="info-item">
                                <span>锁定金价</span>
                                <span class="special-color">{{orderInfo.lockPrices | formatPriceTwo}}元/克</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 银行卡 -->
                <div class="bank-info"  v-if="orderInfo.lockprice">
                    <span>银行卡</span>
                    <span>{{bankInfo.name}}(尾号{{bankInfo.code}})</span>
                </div>
                <!-- 提示 -->
                <div class="tip">工作人员会尽快联系您核实订单</div>
                <!-- 按钮部分 -->
                <div class="btn-opration">
                    <div class="go-detail" @click="$router.push({path:'/storeorderdetail',query:{id:orderId,status:orderInfo.status}})">查看订单</div>
                    <div class="go-index" @click="$router.push('/index')">返回首页</div>
                </div>
            </div>
            <!-- 订单失败 -->
            <div class="error" v-else>
                <!-- 顶部图标部分 -->
                <div class="top-info">
                    <div class="top-img">
                        <img src="static/images/shopmsnopass.png" alt="">
                    </div>
                    <p>订单支付失败</p>
                </div>
                <!-- 失败原因 -->
                <div class="reason">失败原因：{{paysFailReason}}</div>
                <!-- 按钮部分 -->
                <div class="btn-opration">
                    <div class="go-detail" @click="$router.push({path:'/storeorderdetail',query:{id:orderId,status:11}})">查看订单</div>
                    <div class="go-index" @click="$router.push('/index')">返回首页</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Toast, } from 'mint-ui';
import { query_detail, query_card_info} from '@/service/getData.js'

    export default {
        data(){
            return{
                orderId:'',        // 订单ID
                orderStatus:null,  // 订单是否成功
                paysFailReason:'', // 失败原因
                typeJson:{
                    '0':'投资金',
                    '1':'首饰',
                },
                orderInfo:'',
                bankInfo:{
                    code:'0820',
                    name:'招商银行'
                },
                // orderInfo:{
                //     code:'57467288374467332677',
                //     createTime:'2018-08-20 12:20:34',
                //     status:0,
                //     productType:0,
                //     applyWeight:3.23,
                //     isLockprice:1,
                //     cash:0,
                //     lockPrice:256.34,
                //     ensure_cash:3452.234,
                //     applyQuantity:3,
                //     contact:'小可爱',
                //     telephone:13520842445,
                //     address:'内蒙古呼和浩特市赛罕区7号楼602罕区7号楼602'
                // },
            }
        },
        filters:{
            clearStr(val){
                return val.replace(/,/g, "");
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
            // 请求订单详情数据
            async query_detail(){
                var res = await query_detail(this.orderId);
                if(res.code=='000000'){
                    this.orderInfo = res.data;
                    if(res.data.lockprice){  // 如果是锁价请求银行卡信息
                        this.query_card_info();
                    }
                }else{
                    Toast(res.message)
                }
            },
            // 请求银行卡信息
            async query_card_info(){
                var res = await query_card_info();
                if(res.code=='000000'){
                    this.bankInfo = res.data;
                }
            }
        },
        created(){
            this.orderId = this.$route.query.id;
            if(this.$route.query.paysFailReason){
                this.paysFailReason = this.$route.query.paysFailReason;
            }
        },
        mounted(){
            this.orderStatus = this.$route.query.status; // 支付成功 or 失败
            console.log(this.orderStatus)
            this.query_detail();
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
