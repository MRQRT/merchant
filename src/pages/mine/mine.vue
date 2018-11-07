<template>
    <div class="mine">
        <!-- 主体部分 -->
        <div class="main-cont">
            <!-- 登录状态显示 -->
            <div class="top-info-wrap" v-if="loginStatus">
                <div class="top-info">
                    <div class="image-name">
                        <div class="">
                            <span class="user-image">
                                <img src="static/images/shop-logo.png" alt="" v-if="!shopStatus">
                                <img :src="shopInfo.logoPath" alt="" v-else>
                            </span>
                        </div>
                        <!-- 登录且审核通过提示 -->
                        <span class="shop-name" v-if="shopStatus">{{shopInfo.name}}</span>
                        <!-- 未开店/店铺正在审核中显示 -->
                        <span class="shop-name" v-else>我的店铺</span>
                    </div>
                    <!-- 累计成交金额 -->
                    <div class="total-dealNum">
                        <span class="num">{{dealObject.totalCashAmount | formatPriceTwo}}</span>
                        <span>累计成交金额(元)</span>
                    </div>
                    <div class="other-dealNum">
                        <div class="left-num">
                            <span>{{dealObject.totalWeight}}</span>
                            <span>累计成交克重(克)</span>
                        </div>
                        <div class="right-num">
                            <span>{{dealObject.totalCount}}</span>
                            <span>累计成交笔数(笔)</span>
                        </div>
                    </div>
                </div>
                <!-- 保证金 -->
                <div class="ensureCash">
                    <span>保证金(元)：{{ensureCash | formatPriceTwo}}</span>
                    <span class="txt" v-show="ensureCash>0">当前进行中订单保证金总额</span>
                </div>
            </div>
            <!-- 未登录状态显示 -->
            <div class="no-login" v-else>
                <div class="top-image">
                    <img src="static/images/order-list-nologin.png" alt="">
                </div>
                <h3>Hi～欢迎来到存金通商户版</h3>
                <p>精准化获客&nbsp;&nbsp;&nbsp;1500亿黄金市场</p>
                <div class="login-btn" @click="$router.push({path:'/login',query:{redirect:'/mine'}})">我要登录</div>
            </div>
            <!-- 导航列表 -->
            <div class="nav-list">
                <!-- 未登录||未开通店铺 -->
                <div class="nav-item" v-if="!loginStatus || !shopStatus" @click='shopLocated'>
                    <span class="left-txt">我要入驻</span>
                    <span class="right-icon"></span>
                </div>
                <!-- 已登录&已开通店铺 -->
                <div class="nav-item" v-if="loginStatus && shopStatus" @click="$router.push('/myshop')">
                    <span class="left-txt">我的店铺</span>
                    <span class="right-icon"></span>
                </div>
                <div class="nav-item" v-for="(item,index) in navArr" :key="index" @click="goNav(item.url,item.requireAuth,item.requireShop)">
                    <span class="left-txt">{{item.name}}</span>
                    <span class="right-icon"></span>
                </div>
                <div class="nav-item" @click="quitLogin()" v-show="loginStatus">
                    <span class="left-txt">安全退出</span>
                    <span class="right-icon"></span>
                </div>
            </div>
            <!-- 客服电话 -->
            <div class="tel">
                <a href="tel:4008-196-199">客服电话：4008-196-199</a>
            </div>
            <!-- 底部导航 -->
            <foot></foot>
        </div>
    </div>
</template>

<script>
import foot from '@/components/footer/foot.vue'
import { mapState,mapMutations } from 'vuex'
import { MessageBox,Toast} from 'mint-ui';
import { query_card_info,query_ensure_cash, merchant_open_apply_status,logout,query_index_statistics,shopDetail,shop_status,check_password} from '@/service/getData.js'

    export default {
        data(){
            return{
                loginStatus:false, // 是否登录
                bankStatus:false,  // 是否绑卡
                bankInfo:'',      // 银行卡信息
                ensureCash:0,    // 保证金
                navArr:[
                    {'name':'银行卡管理','url':'/mybank','requireAuth':true,'requireShop':true},
                    {'name':'地址管理','url':'/addresslist','requireAuth':true,'requireShop':true},
                    {'name':'密码管理','url':'/changepassword','requireAuth':true,'requireShop':false},
                    {'name':'绑定手机号','url':'/changemobile','requireAuth':true,'requireShop':false},
                    {'name':'关于我们','url':'/aboutus','requireAuth':false,'requireShop':false},
                ],
                dealObject:{          // 近一月交易量
                    totalCashAmount:0,
                    totalWeight:0,
                    totalCount:0
                },
                shopInfo:{
                    shopId:'',
                    logoPath:'',
                    name:'我的店铺'
                },
                password_Exist:'',
            }
        },
        components:{
            foot,
        },
        computed: {
            ...mapState([
                'shopStatus','shopId','accessToken','shopStatus'
            ])
        },
        watch:{

        },
        methods: {
            ...mapMutations([
                'RECORD_ACCESSTOKEN','RECORD_SHOPID','RECORD_SHOPSTATUS'
            ]),
            //导航路由跳转
            goNav(url,auth,requireShop){
                if(auth && !this.loginStatus){ //未登录情况去登录
                    this.$router.push({
                        path:'/login',
                        query:{
                            redirect:'/mine'
                        }
                    })
                }else{
                    if(requireShop && !this.shopStatus){ //需要店铺审核通过才能进行后续操作
                        if(url=='/mybank'){
                            var text = `<div style="text-align:center">店铺审核通过后，再进行绑卡操作</div>`;
                        }else{
                            var text = `<div style="text-align:center">店铺审核通过后，再进行地址操作</div>`;
                        }
                        MessageBox({
                          title: '温馨提示',
                          message:text,
                          confirmButtonText: '我知道了'
                        })
                    }else{
                        var rewurl=ur;
                        if(url=='/changepassword'){
                            (this.password_Exist)?rewurl='/changepassword':'/setpassword'
                        }
                        this.$router.push({
                            path:rewurl,
                            query:{
                                from:'mine'
                            }
                        })
                    }
                }
            },
            // 点击我要入驻
            shopLocated(){
                if(!this.loginStatus){
                    this.$router.push({
                        path:'/login',
                        query: {redirect: '/mine'}
                    })
                }else{
                    this.merchant_open_apply_status();
                }
            },
            // 判断店铺状态
            async shop_status(){
                var res = await shop_status();
                if(res.code=='000000'){
                    this.RECORD_SHOPSTATUS(res.data)
                }else if(res.code=='000004'){ // 用户未登录
                    this.RECORD_ACCESSTOKEN('');
                    this.RECORD_SHOPSTATUS(false);
                }else{
                    Toast(res.message);
                }
            },
            // 获取店铺信息
            async checkShopStatus(){
                var res = await shopDetail('');
                if(res.code=='000000'){
                    if(res.data){
                        this.shopInfo = res.data;
                        this.RECORD_SHOPID(res.data.id); // 保存店铺ID
                    }else{
                        this.RECORD_SHOPID('');        // 保存店铺ID
                        this.RECORD_SHOPSTATUS(false); // 店铺不存在或未通过审核
                    }
                }
            },
            // 请求保证金信息
            async query_ensure_cash(){
                var res = await query_ensure_cash();
                if (res.code=='000000'){
                    this.ensureCash = res.data ? res.data : 0.00;
                }
            },
            // 获取最新商户审核信息
            async merchant_open_apply_status(){
                var res = await merchant_open_apply_status();
                if(res.code=='000000'){
                    if(res.data){
                        this.$router.push({ //审核结果页
                            path:'/applicationresults',
                            query:{
                                from:'mine'
                            }
                        })
                    }else{
                        this.$router.push('/openshopguide') // 商户入驻引导页
                    }
                }
            },
            // 近一月统计数据
            async query_index_statistics(){
                var res = await query_index_statistics();
                if(res.code=='000000'){
                    this.dealObject=res.data;
                }else if(res.code=='200206'){
                    this.RECORD_SHOPSTATUS(false); // 店铺不存在或未通过审核
                }else{
                    // Toast(res.message)
                }
            },
            //点击退出
            quitLogin(){
                var html='<div style="text-align:center">您确定要退出登录吗？</div>'
                MessageBox({
                    title: '提示',
                    message: html,
                    confirmButtonText: '确定',
                    showCancelButton: true,
                    cancelButtonText:'取消',
                }).then((action)=>{
                    if(action=='confirm'){
                        this.logout();//接口触发
                    }
                })
            },
            // 退出登录
            async logout(){
                const res = await logout();
                if(res.code=='000000'){
                    this.RECORD_ACCESSTOKEN('');
                    this.$router.push('/login');
                }else if(res.code=='000004'){
                    this.RECORD_ACCESSTOKEN('');
                    this.$router.push('/login');
                }else{
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            },
            async check_password(){
                const res = await check_password();
                if(res.code=='000000'){
                    if(res.data.isExist){
                        this.password_Exist=true
                    }else{
                        this.password_Exist=false
                    }
                }
            }
        },
        created(){

        },
        mounted(){
            this.loginStatus = this.accessToken ? true : false;
            if(this.loginStatus){
                this.checkShopStatus();        // 店铺信息
                this.query_ensure_cash();      // 保证金
                this.query_index_statistics(); // 近一月成交量
                this.shop_status();            // 是否有店铺
                this.check_password();//检查是否设置密码
            }
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';

.mine{
    width: 100%;
    min-height: 100vh;
    padding-bottom: .98rem;
    background-color: #F8F8F8;
    .main-cont{
        width: 100%;
        color: #fff;
        .no-login{
            height: 5.7rem;
            text-align: center;
            padding-top:.8rem;
            background-color: #F8F8F8;
            .top-image{
                width: 1.8rem;
                height: 1.8rem;
                margin:0 auto;
                img{
                    width: 100%;
                }
            }
            h3{
                color: #333;
                font-size: .36rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                margin:.3rem 0 .1rem;
            }
            p{
                color: #666;
                font-size: .28rem;
            }
            .login-btn{
                width: 3.26rem;
                height: .88rem;
                line-height: .88rem;
                text-align: center;
                color: #fff;
                font-size: .34rem;
                margin:.4rem auto 0;
                background-color: #DDC899;
                @include border-radius(4px);
            }
        }
        .top-info{
            height: 4.5rem;
            padding:.5rem .4rem .3rem;
            background:linear-gradient(164deg,rgba(192,156,96,0.9),rgba(218,194,142,0.9));
            .image-name{
                align-items: center;
                @include flex-box();
                .user-image{
                    background-color: #eee;
                    margin-right: .2rem;
                    @include border-radius(50%);
                    @include inline-block(.8rem,.8rem);
                }
                .shop-name{
                    font-size: .34rem;
                }
            }
            .total-dealNum{
                text-align: center;
                margin:.3rem 0 .5rem;
                flex-direction: column;
                @include flex-box();
                span{
                    font-size: .24rem;
                }
                .num{
                    font-size:.7rem;
                    font-family:DINAlternate-Bold;
                    font-weight:bold;
                }
            }
            .other-dealNum{
                @include flex-box();
                @include justify-content();
                div{
                    width: 100%;
                    text-align: center;
                    flex-direction: column;
                    @include flex-box();
                    span{
                        &:nth-of-type(1){
                            font-size: .4rem;
                            font-family:DINAlternate-Bold;
                            font-weight:bold;
                        }
                        &:nth-of-type(2){
                            font-size: .24rem;
                        }
                    }

                }
            }
        }
        .ensureCash{
            color: #333;
            height: 1.1rem;
            line-height: 1.1rem;
            font-size: .28rem;
            padding:0 .4rem;
            background-color: #fff;
            @include flex-box();
            @include justify-content();
            .txt{
                color: #BCBCBC;
                font-size: .24rem;
            }
        }
        .nav-list{
            width: 100%;
            padding:0 .4rem;
            margin-top:.2rem;
            background-color: #fff;
            .nav-item{
                height: 1.1rem;
                line-height: 1rem;
                color: #333;
                font-size: .28rem;
                align-items: center;
                border-top: 1px solid #eee;
                @include flex-box();
                @include justify-content();
                .right-icon{
                    @include inline-block(.4rem,.45rem);
                    @include bg-image('/static/images/next.png');
                }
                &:nth-of-type(1){
                    border-top: none;
                }
            }
        }
        .tel{
            text-align: center;
            a{
                color: #333;
                font-size: #333;
                display: inline-block;
                height: 1.14rem;
                line-height: 1.14rem;
            }
        }
    }
}
</style>
