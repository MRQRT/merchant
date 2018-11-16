<template>
    <div class="report">
        <!-- 头部标题部分 -->
        <head-top class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push({path:'/storeorderdetail',query:{id:orderId,status:status}})">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <h3>检测报告</h3>
            <div class="report-text">
                <p>
                    <span>订单号</span>
                    <span>{{reportInfo.code}}</span>
                </p>
                <p>
                    <span>实测总毛重</span>
                    <span>{{reportInfo.realGrossWeight}}克</span>
                </p>
                <p>
                    <span>实测总净重</span>
                    <span>{{reportInfo.realNetWeight}}克</span>
                </p>
                <p>
                    <span>检测人</span>
                    <span>{{reportInfo.operator}}</span>
                </p>
                <p>
                    <span>检测时间</span>
                    <span>{{reportInfo.auditTimeStr}}</span>
                </p>
                <p>
                    <span>检测说明</span>
                    <span>{{reportInfo.auditRemark}}</span>
                </p>
                <p>
                    <span>检测结果</span>
                    <span>{{reportInfo.operationResult==0?'通过':'未通过'}}</span>
                </p>
            </div>
            <div class="report-img">
                <!-- <img src="static/images/storeGold-banner.png" alt="检测报告" preview="1"> -->
                <img :src="reportInfo.attachmentPath" alt="检测报告" preview="1">
            </div>
            <!-- 异常情况 -->
            <div class="report-tel-btn" v-if="status==5 || status==9 || status==13"><a href="tel:4008196199">联系客服</a></div>
            <!-- 待确认、已完成情况 -->
            <div class="report-btn" v-else>
                <span v-if="status==7" style="color:#E1D1BA;border:1px solid #EEE3CC">已确认</span>
                <span v-else @click="report_confirm()" :class="{'click-active':reportClick}">确认订单</span>
                <span><a href="tel:4008196199">联系客服</a></span>
            </div>
        </div>
        <!-- 弹窗部分 -->
        <!-- 确认中弹窗 -->
        <mt-popup v-model="popupVisible1" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="order-popup-wrap">
                <div class="top-img">
                    <img src="static/images/report-inner.png" alt="">
                    <img src="static/images/report-outer.png" alt="">
                </div>
                <h4>订单确认中，请稍后...</h4>
                <p>确认成功后将自动跳转至订单详情页</p>
            </div>
        </mt-popup>
        <!-- 确认失败弹窗 -->
        <mt-popup v-model="popupVisible2" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="report-error-wrap">
                <div class="top-img">
                    <img src="static/images/report-error.png" alt="" >
                </div>
                <h4>订单确认失败</h4>
                <div class="report-btn">
                    <span @click="closePopup">取消</span>
                    <span @click="tryAgain">重试</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { MessageBox,Toast,Popup,Lazyload } from 'mint-ui';
import { query_process_mess,confirm_order } from '@/service/getData.js'
    export default {
    	data(){
            return{
                orderId:'',
                reportInfo:'',
                status:'',
                reportClick:false,      // 确认检测报告按钮状态
                popupVisible1:false,   // 订单确认中弹窗
                popupVisible2:false,   // 确认失败弹窗
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        methods: {
            // 关闭确认失败弹窗
            closePopup(){
                this.popupVisible2 = false;  // 关闭失败弹窗
                this.reportClick = false;   // 确认按钮恢复默认样式
            },
            // 确认失败重试
            tryAgain(){
                this.popupVisible2 = false;  // 关闭失败弹窗
                this.report_confirm();        // 再次调用确认函数
            },
            // 查询检测报告
            async query_process_mess(){
                var res = await query_process_mess(this.orderId);
                if(res.code=='000000'){
                    this.reportInfo = res.data;
                }else{
                    Toast(res.message)
                }
            },
            // 点击确认订单
            report_confirm(){
                var that = this;
                this.reportClick = true;
                this.popupVisible1 = true;
                setTimeout(function(){
                    that.confirm_order();
                },2000)
            },
            // 订单确认函数
            async confirm_order(){
                var res = await confirm_order(this.orderId);
                if(res.code=='000000'){
                    this.popupVisible1 = false;
                    this.reportClick = false; // 确认订单 => 已确认
                    this.$router.push({       // 自动跳转订单详情页
                        path:'/storeorderdetail',
                        query:{
                            id:this.orderId,
                            status:7
                        }
                    })
                }else{
                    this.popupVisible2 = true;
                }
            },
        },
        created() {
            this.orderId = this.$route.query.id;
            this.status = this.$route.query.status;
        },
        mounted(){
            this.query_process_mess();
        },

    }

</script>

<style media="screen">
    .report .mint-popup{
        background: #fff !important;
        border-radius: 4px !important;
    }
</style>

<style scoped lang="scss">
@import '../../../sass/mixin';
.main-cont{
    width: 100%;
    min-height: 100vh;
    padding-top:1rem;
    padding-bottom: 1.2rem;
    h3{
        color: #333;
        text-align: center;
        font-size: .36rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        margin-bottom: .5rem;
    }
    .report-text{
        padding:0 .45rem;
        p{
            margin-bottom: .12rem;
            @include flex-box();
            @include justify-content();
            span{
                color: #666;
                font-size: .28rem;
            }
        }
    }
    .report-img{
        width: 100%;
        // height: 5rem;
        margin-top:.5rem;
        img{
            width: 100%;
        }
    }
    .report-btn{
        width: 100%;
        padding:.2rem .35rem;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        @include flex-box();
        @include justify-content();
        span{
            text-align: center;
            line-height: .88rem;
            font-size: .34rem;
            border:1px solid #DDC899;
            @include border-radius(4px);
            @include inline-block(3.26rem,.88rem);
            &:nth-of-type(1){
                color: #C09C60;
            }
            &:nth-of-type(2){
                a{
                    color: #fff;
                }
                background-color: #DDC899;
            }
        }
        .click-active{
            background-color: rgba(242,182,67,0.1);
        }
    }
    .report-tel-btn{
        a{
            display: inline-block;
            color: #fff;
            font-size: .34rem;
            border:1px solid #DDC899;
            width: 6.7rem;
            height: .88rem;
            text-align: center;
            line-height: .88rem;
            position: fixed;
            bottom:.3rem;
            left:50%;
            margin-left: -3.35rem;
            background-color: #DDC899;
            @include border-radius(4px);
        }
    }
}
.order-popup-wrap{
    width: 4.9rem;
    text-align: center;
    padding-bottom: .5rem;
    background-color: #fff;
    @include border-radius(4px);

    @keyframes roundLoop2{
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }
    .top-img{
        width: 1.08rem;
        height: 1.08rem;
        margin:.4rem auto;
        position: relative;
        img{
            &:nth-of-type(1){
                width:100%;
                position: absolute;
                top:0;
                left:0;
            }
            &:nth-of-type(2){
                animation: roundLoop2 .7s linear infinite;
            }
        }
    }
    h4{
        color: #333;
        font-size: .3rem;
    }
    p{
        color: #999;
        font-size: .24rem;
        margin-top:.15rem;
    }
}
.report-error-wrap{
    width: 4.9rem;
    text-align: center;
    .top-img{
        width: 1.08rem;
        height: 1.08rem;
        margin:.4rem auto;
    }
    h4{
        color: #333;
        font-size: .3rem;
    }
    .report-btn{
        width: 100%;
        height: .88rem;
        margin-top:.3rem;
        border-top:1px solid #eee;
        @include flex-box();
        span{
            height: .88rem;
            line-height: .88rem;
            display: inline-block;
            width: 50%;
            color: #C09C60;
            font-size: .34rem;
            &:nth-of-type(1){
                border-right: 1px solid #eee;
            }
        }
    }
}
</style>
