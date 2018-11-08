<template>
    <div class="openshopguide">
        <!-- 头部标题部分 -->
        <head-top headTitle='商户入驻' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="goBack">
        </head-top>
        <!-- banner -->
        <div class="banner"></div>
        <!-- body -->
        <div class="body">
            <section class="adv">
                <img src="static/images/guideadv1.png" alt="">
                <div class="textintr">
                    <h6>卖金流程化</h6>
                    <p>没有中间商赚差价，少费心</p>
                </div>
            </section>
            <section class="adv">
                <img src="static/images/guideadv2.png" alt="">
                <div class="textintr">
                    <h6>利润最大化</h6>
                    <p>多元化的变现方式，多赚钱</p>
                </div>
            </section>
            <section class="adv">
                <img src="static/images/guideadv3.png" alt="">
                <div class="textintr">
                    <h6>获客精准化</h6>
                    <p>矩阵式的获客渠道，更精准</p>
                </div>
            </section>
        </div>
        <!-- footer -->
        <footer>
            <section @click="locatdShop()">立即入驻</section>
        </footer>
    </div>
</template>
<script>
import headTop from '@/components/header/head.vue'
import { mapState,mapMutations } from 'vuex'
import { MessageBox,Toast} from 'mint-ui';
import { merchant_open_apply_status, shop_status } from '@/service/getData.js'



    export default {
        data(){
            return{
                loginStatus:false,
            }
        },
        components:{
            headTop,
        },
        computed: {
            ...mapState([
                'accessToken','shopStatus','applyShopId'
            ]),
        },
        watch:{

        },
        methods: {
            ...mapMutations([
                'RECORD_SHOPSTATUS','RECORD_APPLYSHOPID'
            ]),
            // 点击返回
            goBack(){
                if(this.$route.query.from){
                    window.location.href = this.$route.query.from
                    // var id = this.$route.query.shopId;
                    // var className = this.$route.query.className;
                    // var name = this.$route.query.name;
                    // window.location.href = this.$route.query.from+'/#/shopDetail?id='+id+'&className='+className+'&name='+name;
                }else{
                    this.$router.push('/index');
                }
            },
            // 认领店铺
            locatdShop(){
                if(!this.loginStatus){ //未登录
                    this.$router.push({
                        path:'/login',
                        query:{
                            redirect:'/pagetransfer'
                        }
                    })
                }else{ // 已登录
                    // if(this.applyShopId!=''&&this.applyShopId!=null){ //如果是认领店铺则跳转填写店铺信息页面
                    //     this.$router.push('/editshopinfo')
                    // }else{
                    //     this.$router.push('/uploadcertificate')
                    // }
                    this.merchant_open_apply_status();
                }
            },
            // 获取最新商户审核信息
            async merchant_open_apply_status(){
                var res = await merchant_open_apply_status();
                if(res.code=='000000'){
                    if(res.data){
                        this.$router.push('/applicationresults') //审核结果页
                    }else{
                        this.$router.push('/uploadcertificate') // 上传资质页
                    }
                }else{
                    Toast('商户审核：'+res.message)
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
        },
        created(){
            this.loginStatus = this.accessToken ? true : false;

        },
        mounted(){
            if(this.loginStatus){
                this.shop_status();
            }
            //如果是从商户版 我要认领 跳转过来
            this.$route.query.shopId ? this.RECORD_APPLYSHOPID(this.$route.query.shopId) : '';
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.openshopguide{
    padding-top: .88rem;
    min-height: 100vh;
    width: 100%;
    background-color: #fff;
}
.banner{
    width: 100%;
    height: 3.4rem;
    @include bg-image("/static/images/guidebanner.png")
}
.body{
    width: 100%;
    margin-top: .4rem;
}
.adv{
    width: 100%;
    height: 1.7rem;
    padding-top: .4rem;
    display: flex;
    justify-content: center;
}
.adv img{
    width: .9rem;
    height: .9rem;
    float: left;
}
.textintr{
    float: left;
    padding-left: .4rem;
}
.textintr h6{
    font-size: .34rem;
    color: #C09C60;
    text-align: left;
}
.textintr p{
    font-size: .26rem;
    color: #666666;
    text-align: left;
    margin-top: .05rem;
}
footer{
    width: 100%;
    padding-bottom: .4rem;
    display: flex;
    justify-content: center;
    margin-top:2rem;
}
footer section{
    width: 6.7rem;
    height: .88rem;
    font-size: .34rem;
    color: #fff;
    background: #DDC899;
    text-align: center;
    line-height: .88rem;
    border-radius:4px;
}
</style>
