<template>
    <div class="confirminfo">
        <!-- 头部标题部分 -->
        <head-top headTitle='核对资质信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- header -->
        <header class="header">
            <img src="static/images/tip.png" alt="">
            <p>资质信息提交后将无法修改</p>
        </header>
        <!-- ms -->
        <section class="msbody">
            <div class="inputms">
                <span class="left_name">公司名称</span>
                <input type="text" v-model="ms.companyName">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">营业执照号</span>
                <input type="text" v-model="ms.businessLicenseCode">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">营业期限</span>
                <input type="text" v-model="ms.date">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">法人姓名</span>
                <input type="text" v-model="ms.personName">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">法人身份证号</span>
                <input type="text" v-model="ms.personCode">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">证件有效期</span>
                <input type="text" v-model="ms.personCardEndDate">
            </div>
        </section>
        <!-- button -->
        <div class="button">
            <section>确认无误</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{
                ms:{
                    companyName: '北京盈吉通电子商务有限公司',
                    businessLicenseCode: "91110 0105 MA12 3817 J9",
                    date: "2025-15-13 至 2015-12-13",
                    personName: "张爱过",
                    personCode: "140300 1223 4511 2116",
                    personCardEndDate: "2025-12-13",
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

        },
        created(){

        },
        mounted(){

        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.confirminfo{
    padding-top: .88rem;
    min-height: 100vh;
    background-color: #f8f8f8;
}
.header{
    width: 100%;
    height: .98rem;
    background-color: #ece8df;
    padding-top: .34rem;
    padding-left: .4rem;
}
.header img{
    width: .24rem;
    height: .24rem;
    float: left;
    margin-top: .05rem;
    margin-right: .08rem;
}
.header p{
    font-size: .22rem;
    color: #C09C60;
    float: left;
}
.msbody{
    width: 100%;
    padding: 0 .4rem 0 .4rem;
    background: #fff;
}
.inputms{
    width: 100%;
    height: 1.1rem;
    color: #333;
    font-size: .28rem;
    // border: 1px solid red;
}
.left_name{
    float: left;
    width: 1.85rem;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: left;
}
.inputms input{
    float: left;
    margin-top: .35rem;
    width: 60%;
    font-size: .28rem;
    color: #666666;
}
.button{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: .5rem;
    position: fixed;
    bottom: .4rem;
}
.button section{
    width: 6.7rem;
    height: .88rem;
    line-height: .88rem;
    background-color: #DDC899;
    color: #fff;
    font-size: .32rem;
    border-radius: 4px;
    text-align: center;
}
</style>
