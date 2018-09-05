<template>
    <div class="assets">
        <!-- 头部标题部分 -->
        <head-top headTitle='资产' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push({path:'/index',query:{navStatus:1}})">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 顶部保证金 -->
            <div class="top-cash">
                <p class="title">保证金(元)</p>
                <p class="price">{{ensureCash | formatPriceTwo}}</p>
                <p class="tip">当前进行中订单保证总金额</p>
            </div>
            <!-- 银行卡 -->
            <div class="bank-wrap">
                <h3>银行卡</h3>
                <div class="bank">
                    <!-- 已绑卡状态 -->
                    <div class="has-bank" v-if="bankStatus" @click="$router.push('/mybank')">
                        <div class="left-part">
                            <div class="icon">
                                <img :src="bankInfo.icon" alt="">
                            </div>
                            <div class="text">
                                <p class="bank-name">{{bankInfo.name}}</p>
                                <p class="bank-num">尾号{{bankInfo.code}}</p>
                            </div>
                        </div>
                        <div class="right-part"></div>
                    </div>
                    <!-- 未绑卡状态 -->
                    <div class="no-bank" v-else @click="goBind()">
                        <div class="left-part">
                            <div class="icon">
                                <img src="static/images/add-bank.png" alt="">
                            </div>
                            <div class="text">
                                <p class="bank-name">添加银行卡</p>
                            </div>
                        </div>
                        <div class="right-part"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { mapState,mapMutations } from 'vuex'
import { MessageBox,Toast} from 'mint-ui';
import { query_card_info, query_ensure_cash} from '@/service/getData.js'

    export default {
        data(){
            return{
                bankStatus:false,  // 是否绑卡
                bankInfo:'',      // 银行卡信息
                ensureCash:'',    // 保证金
            }
        },
        components:{
            headTop,
        },
        computed: {
            ...mapState([
                'shopStatus','shopId'
            ])
        },
        watch:{

        },
        methods: {
            // 请求保证金信息
            async query_ensure_cash(){
                var res = await query_ensure_cash();
                if (res.code=='000000'){
                    this.ensureCash = res.data ? res.data : 0;
                }
            },
            // 请求银行卡信息
            async query_card_info(){
                var res = await query_card_info();
                if(res.code=='000000'){
                    if(res.data){
                        this.bankInfo = res.data;
                        this.bankStatus = true
                    }else{
                        this.bankStatus = false;
                    }
                }else{
                    Toast(res.message)
                }
            },
            // 点击绑卡操作
            goBind(){
                if(this.shopStatus){
                    this.$router.push({
                        path:'/bindingbank',
                        query:{
                            from:'assets'
                        }
                    })
                }else{
                    var text = `<div style="text-align:center">店铺审核通过后，再进行绑卡操作</div>`;
                    MessageBox({
                      title: '温馨提示',
                      message:text,
                      confirmButtonText: '我知道了'
                    })
                }
            }
        },
        created(){

        },
        mounted(){
            this.query_card_info();
            if(this.shopStatus){
                this.query_ensure_cash();
            }
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
            @include bg-image('/static/images/assets-bg.png');
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

                .has-bank,.no-bank{
                    height: 1.4rem;
                    align-items: center;
                    @include flex-box();
                    @include justify-content();
                }
                .no-bank{
                    .left-part{
                        .icon{
                            display: inline-block;
                            width: .44rem;
                            height: .44rem;
                            margin-right:.25rem;
                            background-color:none !important;
                        }
                        .bank-name{
                            color: #666 !important;
                            font-size: .3rem !important;
                        }
                    }
                }
                .left-part{
                    align-items: center;
                    @include flex-box();

                    .icon{
                        display: inline-block;
                        width: .65rem;
                        height: .65rem;
                        margin-right:.25rem;
                        @include border-radius(50%);
                        img{
                            width: 100%;
                        }
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
