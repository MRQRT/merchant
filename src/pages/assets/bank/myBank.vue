<template>
    <div class="myBank">
        <!-- 头部标题部分 -->
        <head-top headTitle='我的银行卡' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 未绑卡状态 -->
            <div class="no-binding" v-if="!bindingStatus">
                <div class="top-img">
                    <img src="static/images/no-binding.png" alt="">
                </div>
                <p>您没有绑定银行卡，立即绑卡！</p>
                <div class="binding-btn" @click="$router.push('/bindingbank')">立即绑卡</div>
            </div>
            <!-- 已绑卡状态 -->
            <div class="has-binding" v-else>
                <div class="card">
                    <div class="top-part">
                        <div class="left-icon">
                            <img :src="bankInfo.icon" alt="">
                        </div>
                        <div class="right-text">
                            <p>{{bankInfo.name}}</p>
                            <p class="card-type">{{'储蓄卡'}}（单笔限额{{bankInfo.maxAmount/10000}}W，单日限额{{bankInfo.dayMaxAmount/10000}}W）</p>
                        </div>
                    </div>
                    <div class="bottom-part">
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        <span>{{bankInfo.code}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {query_card_info,} from '@/service/getData.js'

    export default {
        data(){
            return{
                bindingStatus:false,
                bankInfo:{
                    code:'0820',
                    icon:'',
                    name:'招商银行',
                    type:'储蓄卡',
                    maxAmount:5,
                    dayMaxAmount:10
                }
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
            async request(){
            	const res = await query_card_info();
            	if(res.code=='000000'){
                    if(res.data){
                        this.bindingStatus = true;
                        this.bankInfo = res.data;
                    }else{
                        this.bindingStatus = false;
                    }
				}
            },
        },
        created(){

        },
        mounted(){
            this.request();
        },
    }

</script>

<style scoped lang="scss">
@import '../../../sass/mixin';
.myBank{
    width: 100%;
    height: 100vh;
    padding-top:.88rem;
    .main-cont{
        .no-binding{
            text-align: center;
            font-family:PingFangSC-Regular;
            .top-img{
                width: 3.06rem;
                height: 2.4rem;
                margin:1.6rem auto 0;
                img{
                    width: 100%;
                }
            }
            p{
                color: #666;
                font-size: .28rem;
                padding-left:.3rem;
                margin:.4rem 0 .8rem;
            }
            .binding-btn{
                width: 3.26rem;
                height: .88rem;
                text-align: center;
                line-height: .87rem;
                color: #fff;
                font-size: .34rem;
                margin:0 auto;
                background-color: #DDC899;
                @include border-radius(4px);
            }
        }
        .has-binding{
            width: 100%;
            padding:.4rem;

            .card{
                color: #fff;
                width:100%;
                height: 2.6rem;
                padding:.4rem .3rem .5rem .4rem;
                @include bg-image('/static/images/bank-card.png');

                .top-part{
                    margin-bottom: .25rem;
                    justify-content: flex-start;
                    @include flex-box();
                    .left-icon{
                        width: .7rem;
                        height: .7rem;
                        // background-color: #fff;
                        position: relative;
                        @include border-radius(50%);
                        img{
                            width:100%;
                            // display: inline-block;
                            // @include border-radius(50%);
                            // @include center(.7rem,.7rem);
                        }
                    }
                    .right-text{
                        text-align: left;
                        margin-left:.2rem;
                        p{
                            font-size: .34rem;
                            font-weight: bold;
                            font-family:PingFangSC-Medium;
                        }
                        .card-type{
                            font-weight: normal;
                            font-size: .24rem;
                            font-family:PingFangSC-Regular;
                        }
                    }
                }
                .bottom-part{
                    text-align: center;
                    span{
                        display: inline-block;
                        margin-right:.3rem;
                        &:last-child{
                            font-size: .38rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
