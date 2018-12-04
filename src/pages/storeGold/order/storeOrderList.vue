<template>
    <div class="storeGoldList">
        <!-- 头部标题部分 -->
        <head-top headTitle='我的订单' class="head-top nomal-font" ref="topHead">
            <!-- <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push({path:'/index',query:{navStatus:1}})"> -->
        </head-top>
        <!-- 主体部分 -->
        <!-- 未登录状态 -->
        <div class="no-login" v-if="!loginStatus">
            <div class="top-img">
                <img src="static/images/order-list-nologin.png" alt="">
            </div>
            <p>您没有登录哦，登录后即可查看订单信息～</p>
            <div class="login-btn" @click="goLogin">我要登录</div>
        </div>
        <!-- 已登录状态 -->
        <div class="" v-else>
            <!-- 有订单显示 -->
            <div class="main-cont" ref="wrapper" v-show="showStatus" v-if="orderStatus" :style="{height: wrapperHeight + 'px' }">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                    bottomPullText="上滑加载更多" bottomDropText="松开加载" ref="loadmore" class="loadmore">
                    <ul class="order-list">
                        <li class="order-item" v-for="(item,index) in orderList" :key="index" @click="goOrderDetail(item)" :class="{'shadow':item.state==7}">
                            <!-- 锁价标示 -->
                            <span class="lock-price-icon" v-if="item.typeCode=='lock'"></span>
                            <!-- 左侧图片 -->
                            <div class="left-img">
                                <img src="static/images/order-info-basic.png" alt="">
                            </div>
                            <!-- 右侧文字 -->
                            <div class="right-text">
                                <!-- 变现or存入克重 -->
                                <div class="trade-type">
                                    <div class="right">
                                        <!-- 已完成图标 -->
                                        <span class="status-icon" v-if="item.state==9"></span>
                                        <!-- 订单状态 -->
                                        <span class="status" v-else-if="item.state==10 || item.state==11">{{statusJson[item.state][item.nodeCode].name}}</span>
                                        <span class="status" v-else>{{statusJson[item.state].name}}</span>
                                    </div>
                                </div>
                                <!-- 订单信息 -->
                                <div class="bottom-info">
                                    <div class="weight-time">
                                        <div class="left-info">
                                            <div class="total-weight">总&nbsp;克&nbsp;重：{{item.weight | formatPriceTwo}}克</div>
                                            <div class="count">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：{{item.count}}</div>
                                            <div class="ensure-cash" v-if="item.typeCode=='lock'">保&nbsp;证&nbsp;金：{{item.ensureCash | formatPriceTwo}}元</div>
                                            <div class="total-amount" v-if="item.typeCode=='lock' && (item.state==7 || item.state==8 || item.state==9)">实收总额：{{item.paidAmount | formatPriceTwo}}元</div>
                                        </div>
                                        <div class="right-time">{{item.createdTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
            <!-- 没有订单显示 -->
            <div class="no-order" v-else>
                <div class="top-img">
                    <img src="static/images/no-order.png" alt="">
                </div>
                <h3>您还没有订单！</h3>
                <p>在线预约 — 顺丰上门 — 检测变现</p>
                <div class="store-btn" @click="$router.push('/storegold')">立即回收</div>
            </div>
        </div>

        <!-- 底部固定导航 -->
        <foot></foot>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import foot from '@/components/footer/foot.vue'
import { query_list } from '@/service/getData.js'
import { mapState,mapMutations } from 'vuex'
import { Indicator,Toast } from 'mint-ui';

    export default {
        data(){
            return{
                loginStatus:false,   // 是否登录
                showStatus:false,    // 是否显示内容
                orderStatus:true,    // 是否有订单
                allLoaded:false,     // 是否全部加载完毕
                wrapperHeight:0,     // 加载内容动态高度
                searchCondition: {   // 分页属性
                    pageNo: 0,
                    pageSize: 10
            	},
                pages:'',             // 总页数
                statusJson:{
                    '1':{name:'待支付'},
                    '2':{name:'支付处理中'},
                    '3':{name:'审核中'},
                    '4':{name:'待取货'},
                    '5':{name:'物流中'},
                    '6':{name:'检测中'},
                    '7':{name:'待确认'},
                    '8':{name:'打款中'},
                    '9':{name:'已完成'},
                    '10':{
                        'verify':{name:'退款中'},
                        'pick':{name:'退款中'},
                        'front_cancel':{name:'退款中'},
                        'back_cancel':{name:'退款中'},
                    },
                    '11':{
                        'pay_margin':{name:'已关闭'},
                        'front_cancel':{name:'已关闭'},
                        'back_cancel':{name:'已关闭'},
                        'verify':{name:'已关闭'},
                        'pick':{name:'已关闭'},
                        'detection':{name:'什么鬼'}

                    }
                },
                orderList:[],
            }
        },
        components:{
            headTop,
            foot,
        },
        computed: {
            ...mapState([
                'shopId','accessToken',
            ])
        },
        watch:{

        },
        methods: {
            // 去登录
            goLogin(){
                this.$router.push({
                    path:'/login',
                    query:{
                        'redirect':'/storeorderlist'
                    }
                })
            },
            //跳转订单详情
            goOrderDetail(item){
                var path = '/storeorderdetail';

                this.$router.push({
                    path:path,
                    query:{
                        code:item.code,
                        status:item.state,
                        nodeCode:item.nodeCode,
                    }
                })
            },
            //首次进入请求数据
            async requestList(){
                var res = await query_list(this.searchCondition.pageNo,this.searchCondition.pageSize);
                if(res.code=='000000'){
                    this.showStatus = true;
                    Indicator.close();
                    if(res.data.content.length==0){
                        this.orderStatus = false;
                    }else{
                        this.orderStatus = true;
                        this.orderList = res.data.content;
                        this.pages=res.data.totalPages;
                        if(this.searchCondition.pageNo>=this.pages){
                           this.allLoaded=true;  //数据加载完，bottomMethod则不再执行
                        }
                    }
                }else{
                    this.orderStatus = false;
                    Indicator.close();
                    // Toast(res.message)
                }
            },
            //加载更多
            async loadMore(){
                this.searchCondition.pageNo=this.searchCondition.pageNo+1;
                var res = await query_list(this.searchCondition.pageNo,this.searchCondition.pageSize);
                if(res.code=='000000'){
                  this.orderList=this.orderList.concat(res.data.content);
                  if(this.searchCondition.pageNo>=this.pages){
                       this.allLoaded=true;  //数据加载完，bottomMethod则不再执行
                  }
                }
            },
            //上拉加载
            loadBottom(){
                var that = this;
                setTimeout(function(){
                    that.loadMore();
                    that.$refs.loadmore.onBottomLoaded();
                },800)
            },
        },
        updated(){
          if(this.allLoaded){
             //创建标签 提示内容已到底部 加载完毕
             var dv=document.querySelector('.hasBottom');
             if(dv){
              dv.parentNode.removeChild(dv)
            }
            var p=document.createElement('p');
            p.classList.add('hasBottom')
            p.innerHTML='已经到底了~';
            p.style.fontSize='0.28rem';
            p.style.color = '#999999';
            p.style.width='100%';
            p.style.height='1rem';
            p.style.lineHeight ='1rem';
            p.style.textAlign = 'center';
            document.querySelector('.order-list').appendChild(p)
          }
        },
        created(){
            this.loginStatus = this.accessToken ? true : false;
        },
        mounted(){
            if(this.loginStatus){
                Indicator.open({
                  spinnerType: 'fading-circle'
                });
                this.requestList();
            }
            // 计算滚动内容的高度
            if(this.loginStatus && this.orderStatus){
                this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            }
        },
    }

</script>

<style media="screen">
    .mint-loadmore-bottom{
        color: #999;
        font-size: .24rem;
        background-color: #f8f8f8;
    }
</style>

<style scoped lang="scss">
@import '../../../sass/mixin';
.storeGoldList{
    width:100%;
    min-height: 100vh;
    padding-bottom: 1.2rem;
    background-color: #f8f8f8;
    .no-login{
        width: 100%;
        text-align: center;
        padding-top:2.6rem;
        .top-img{
            width: 1.8rem;
            height: 1.8rem;
            margin:0 auto;
            img{
                width: 100%;
            }
        }
        p{
            color: #666;
            font-size: .28rem;
            text-align: center;
            margin:.6rem .9rem;
        }
        .login-btn{
            width: 3.26rem;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            color: #fff;
            font-size: .34rem;
            margin:0 auto;
            background-color: #DDC899;
            @include border-radius(4px);
        }
    }
    .main-cont{
        overflow: scroll;
        padding-top:.88rem;
        .order-list{
            .shadow{
                width: 99% !important;
                margin:0 auto;
                @include box-shadow(8px 6px 24px rgba(0,0,0,0.06));
            }
            .order-item{
                width:100%;
                padding:.3rem .4rem;
                color: #666;
                font-size: .28rem;
                margin-top:.2rem;
                font-family:PingFangSC-Regular;
                background-color: #fff;
                position: relative;
                @include flex-box();
                .left-img{
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-right:.25rem;
                    background-color: #eee;
                    img{
                        width: 100%;
                    }
                }
                .right-text{
                    position: relative;
                    flex-grow: 2;
                    flex-direction: column;
                    @include flex-box();
                    @include justify-content();
                }
                .lock-price-icon{
                    @include inline-block(.64rem,.64rem);
                    @include bg-image('/static/images/order-right-lock.png');
                    position: absolute;
                    left:0;
                    top:0;
                }
                .trade-type{
                    margin-top:-.05rem;
                    position: absolute;
                    right:0;
                    @keyframes scaleIn1{
                        0%{ transform: scale(4); opacity: 0;}
                        100%{ transform: scale(1); opacity: 1;}
                    }
                    .status-icon{
                        animation: scaleIn1 0.3s .3s ease-out both;
                        @include inline-block(1.3rem,1.3rem);
                        @include bg-image('/static/images/order-wancheng-icon.png');
                    }
                }
                .bottom-info{
                    color: #666;
                    font-size: .26rem;
                    font-family:PingFangSC-Regular;
                    justify-content: flex-end;
                    flex-direction: column;
                    @include flex-box();

                    .weight-time{
                        margin-bottom: 0 !important;
                        align-items: flex-end;
                        @include flex-box();
                        .left-info{
                            div{
                                margin-bottom: .1rem;
                                font-size: .26rem;
                                color: #666;
                                font-family:PingFang-SC-Regular;
                                font-weight:400;
                                &:last-child{
                                    margin-bottom: 0;
                                }
                            }
                            .total-weight{
                                margin-top:-.04rem;
                            }
                            .total-amount{
                                color: #C09C60;
                            }
                        }
                    }

                }
                .trade-type, .weight-time{
                    align-items: center;
                    @include flex-box();
                    @include justify-content();
                    .status{
                        color: #C09C60;
                        font-size: .32rem;

                    }
                    .overStatus{
                        color: #999999;
                    }
                }
                .orderNo,.ensure-cash, .weight-time{
                    color: #666;
                    font-size:.24rem;
                }
            }
        }
    }
    .no-order{
        width:100%;
        text-align: center;
        padding-top:2.5rem;
        .top-img{
            width: 3.74rem;
            height: 2.88rem;
            margin:0 auto;
            img{
                width:100%;
            }
        }
        h3{
            color: #333;
            font-size: .28rem;
            letter-spacing: 1px;
            padding-left: .2rem;
            margin:-.2rem auto .1rem;
        }
        p{
            width:100%;
            color: #999;
            font-size: .24rem;
            text-align: center;
            padding-left:.4rem;
        }
        .store-btn{
            width: 3.26rem;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            color: #fff;
            font-size: .34rem;
            margin:.7rem auto 0;
            background-color: #DDC899;
            @include border-radius(4px);
        }
    }
}
</style>
