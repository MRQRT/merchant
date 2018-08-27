<template>
    <div class="applicationresults">
        <!-- 头部标题部分 -->
        <head-top headTitle='商户入驻' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- model -->
        <div class="model" v-show="qcadd">
            <p>商家入驻</p>
            <section class="squ">
                <img src="static/images/qcawait.png" alt="">
                <h4>感谢您的加盟</h4>
                <p>审核信息将在3个工作日内发送到您的</p>
                <p>手机上，请留意查收短信</p>
            </section>
        </div>
        <div class="model" v-show="noshop">
            <p>开通店铺</p>
            <section class="squ">
                <img src="static/images/noshop.png" alt="">
                <p style="margin-top:.42rem;">啊哦，您还没有店铺！</p>
                <button class="button">立即入驻</button>
            </section>
        </div>
        <div class="model" v-show="qcpass">
            <p>商家入驻</p>
            <section class="squ">
                <img src="static/images/qcpass.png" alt="">
                <h4>入驻资质审核通过</h4>
                <p>恭喜您，入驻资质已经审核通过了</p>
            </section>
        </div>
        <div class="model" v-show="shopadd">
            <p>开通店铺</p>
            <section class="squ">
                <img src="static/images/shopmsadd.png" alt="">
                <h4 style="margin-top:.42rem;">店铺资料已提交</h4>
                <p>审核信息将在3个工作日内发送到您的</p>
                <p>手机上，请留意查收短信</p>
            </section>
        </div>
        <div class="model" v-show="qcnopass">
            <p>商家入驻</p>
            <section class="squ" style="padding-top:.5rem">
                <img src="static/images/qcnopass.png" alt="">
                <h4 style="margin-top:0">入驻资质未通过审核</h4>
                <p>失败原因：根据后台审核选择理由展示</p>
                <button class="button">重新申请</button>
            </section>
        </div>
        <div class="model" v-show="shopnopass">
            <p>开通店铺</p>
            <section class="squ" style="padding-top:.5rem;">
                <img src="static/images/shopmsnopass.png" alt="">
                <h4 style="margin-top:.0rem;">店铺资料未通过审核</h4>
                <p>失败原因：根据后台审核选择理由展示</p>
                <button class="button">重新申请</button>
            </section>
        </div>
        <div class="model" v-show="shoppass">
            <p>开通店铺</p>
            <section class="squ">
                <img src="static/images/store-success.png" alt="">
                 <h4>店铺审核通过</h4>
                 <!-- <p>恭喜您，店铺审核已通过！</p> -->
                <button style="margin-top:0" class="button" @click="$router.push('/myshop')">进入店铺</button>
            </section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {merchant_open_apply_status,shop_open_apply_status} from '@/service/getData.js'
    export default {
        data(){
            return{
               qcadd: false,
               qcpass: false,
               qcnopass: false,
               noshop: false,
               shopadd: false,
               shoppass: false,
               shopnopass: false,
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
            async merhcant_status(){
                const res = await merchant_open_apply_status();
                if(res.code=='000000'){
                    if(res.data.status=='1'){ // 1、待审核
                        this.qcadd=1;
                        this.qcpass=0;
                        this.qcnopass=0;
                    }else if(res.data.status=='2'){//2、审核通过
                        this.qcadd=0;
                        this.qcpass=1;
                        this.qcnopass=0;
                    }else if(res.data.status=='9'){//3、未通过
                        this.qcadd=0;
                        this.qcpass=0;
                        this.qcnopass=1;
                    }
                }
                this.shop_status();
            },
            async shop_status(){
                const res = await shop_open_apply_status();
                // console.log(res)
                if(res.code=='000000'){
                    if(res.data.status=='1'){ // 1、待审核
                        if(this.qcadd){//
                            this.noshop=1;
                            this.shopadd=0;
                            this.shoppass=0;
                            this.shopnopass=0;
                        }else{
                            this.noshop=0;
                            this.shopadd=1;
                            this.shoppass=0;
                            this.shopnopass=0;
                        }
                    }else if(res.data.status=='2'){//2、审核通过
                        this.noshop=0;
                        this.shopadd=0;
                        this.shoppass=1;
                        this.shopnopass=0;
                    }else if(res.data.status=='9'){//3、未通过
                        this.noshop=0;
                        this.shopadd=0;
                        this.shopass=0;
                        this.shopnopass=1;
                    }
                }
            }
        },
        created(){

        },
        mounted(){
            this.merhcant_status();
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.applicationresults{
    width: 100%;
    padding-top: .88rem;
    min-height: 100vh;
    background-color: #f8f8f8;
}
.model{
    width: 100%;
    height: 5.68rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: .4rem;
}
.model>p{
    text-align: left;
    width: 100%;
    padding-left: 9%;
    line-height: .8rem;
}
.squ{
    width: 6.2rem;
    height: 4.5rem;
    background-color: #fff;
    padding-top: .85rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.squ:after{
    content: '';
    width: .6rem;
    height: .6rem;
    background-color: #f8f8f8;
    position: absolute;
    left: -.32rem;
    top: 42%;
    border-radius: 50%;
}
.squ:before{
    content: '';
    width: .6rem;
    height: .6rem;
    background-color: #f8f8f8;
    position: absolute;
    right: -.32rem;
    top: 42%;
    border-radius: 50%;
}
.squ p,.squ h4{
    text-align: center;
}
.squ h4{
    font-size: .34rem;
    font-weight: bold;
    color: #000;
    line-height: .8rem;
    margin-top: .35rem;
}
.squ p{
    color: #666;
    font-size: .28rem;
}
.squ img{
    width: 1rem;
    height: 1rem;
}
.button{
    width: 3.26rem;
    height: .88rem;
    background-color: #DDC899;
    line-height: .88rem;
    color: #fff;
    font-size: .32rem;
    border-radius: 4px;
    margin-top: .4rem;
}
</style>
