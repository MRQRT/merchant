<template>
    <div class="report-detail">
        <!-- 头部标题部分 -->
        <head-top headTitle='检测明细' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <div class="main-cont" ref="wrapper" :style="{height: wrapperHeight + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                bottomPullText="上滑加载更多" bottomDropText="松开加载" ref="loadmore" class="loadmore">
                <!-- 具体检测明细列表 -->
                <ul class="report-more-detail">
                    <li class="more-detail-item" v-for="(item,index) in reportDetailInfo">
                        <p class="title" @click="showEachReport(index)">
                            <span class="txt">产品{{index+1}} - <b>卖金总额：{{item.amount|formatPriceTwo}}元</b></span>
                            <span class="show-more" :class="{'rotate':index==eachReportNum}"></span>
                        </p>
                        <div class="list" :class="{'showEachReport':index==eachReportNum}">
                            <p>
                                <span>检测编号</span>
                                <span>{{item.code}}</span>
                            </p>
                            <p>
                                <span>产品名称</span>
                                <span>{{item.goodsTypeCode=="jewelry"?'首饰':'金条'}}</span>
                            </p>
                            <p>
                                <span>质&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                                <span>{{item.grossWeight|formatPriceTwo}}克</span>
                            </p>
                            <p>
                                <span>黄金含量</span>
                                <span>{{item.colour}}‰</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import { query_report_detail } from '@/service/getData.js'

    export default {
        data(){
            return{
                code:'',
                eachReportNum:-1,        // 每一个产品的检测报告明细显示、隐藏
                reportDetialStatus:false,// 检测报告明显显示、隐藏
                allLoaded:false,         // 是否全部加载完毕
                wrapperHeight:0,         // 加载内容动态高度
                searchCondition: {       // 分页属性
                    pageNo: 1,
                    pageSize: 15
                },
                pages:'',                // 总页数
                reportDetailInfo:[],     // 检测报告明细数组    
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
            // 具体每一项产品的检测报告
            showEachReport(index){
                if(this.eachReportNum == index){
                    this.eachReportNum = -1;
                }else{
                    this.eachReportNum = index
                }
            },
            async query_detail(){
                var res = await query_report_detail(this.code,this.searchCondition.pageNo,this.searchCondition.pageSize);
                if(res.code=='000000'){
                    this.reportDetailInfo = res.data.content;
                    if(this.searchCondition.pageNo>=res.data.totalPages){
                       this.allLoaded=true;  //数据加载完，bottomMethod则不再执行
                    }
                }else{
                    Toast(res.message)
                }
            },
            //加载更多
            async loadMore(){
                this.searchCondition.pageNo=this.searchCondition.pageNo+1;
                var res = await query_report_detail(this.code,this.searchCondition.pageNo,this.searchCondition.pageSize);
                if(res.code=='000000'){
                  this.reportDetailInfo=this.reportDetailInfo.concat(res.data.content);
                  if(this.searchCondition.pageNo>=res.data.totalPages){
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
            document.querySelector('.report-more-detail').appendChild(p)
          }
        },
        created(){
            this.code = this.$route.query.code;
        },
        mounted(){
            // 计算滚动内容的高度
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            this.query_detail();
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
.report-detail{
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
    padding-top:1.1rem;
    .show-more{
        display: inline-block;
        width: .24rem;
        height: .24rem;
        background: url(/static/images/order-pull.png) no-repeat;
        background-size: 100%;
        @include transition(.3s);
        }
    .rotate{
        @include transition(.3s);
        @include rotate(180deg);
    }
    .report-more-detail{
        background-color: #fff;
        .more-detail-item{
            padding:0 .4rem;
            border-bottom: 1px solid #eee;
            &:last-child{
                border-bottom: none;
            }
            .title{
                height: 1rem;
                line-height: 1rem;
                color: #666;
                font-size: .28rem;
                align-items: center;
                @include flex-box();
                @include justify-content();
                .txt{
                    b{
                        color: #C09C60;
                    }
                }
            }
            .list{
                max-height: 0;
                overflow: hidden;
                @include transition(.3s);
                p{
                    color: #666;
                    font-size: .24rem;
                    margin-bottom: .1rem;
                    @include flex-box();
                    @include justify-content();
                    &:last-child{
                        margin-bottom: .4rem;
                    }
                }
            }
            .showEachReport{
                max-height: 4rem;
                @include transition(.3s);
            }
        }
    }
}
</style>
