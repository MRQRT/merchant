<template>
    <div class="qcmscommitresult">
        <!-- 头部标题部分 -->
        <head-top headTitle='核对资质信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.push('/index')">
        </head-top>
        <!-- model -->
        <div class="model">
            <section class="squ">
                <img src="static/images/qcpass.png" alt="">
                <h4>恭喜，您的入驻申请提交成功！</h4>
                <p style="margin-top:.35rem;letter-spacing:1px;">审核信息将在3个工作日内发送到您的手机上，</p>
                <p style="letter-spacing:1px;">请注意查收短信。</p>
            </section>
        </div>
        <!-- button -->
        <div class="button">
            <section @click="$router.push('/editshopinfo')" v-if="open_shop_button">完善店铺信息</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {shop_open_apply_status} from '@/service/getData.js'
    export default {
        data(){
            return{
                open_shop_button:false,
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
            async shop_status(){
                const res = await shop_open_apply_status();
                if(res.code=='000000'){
                    if(res.data){
                        if(res.data.status=='1'){ // 1、待审核
                           this.open_shop_button=false;
                        }else if(res.data.status=='2'){//2、审核通过
                           this.open_shop_button=false
                        }else if(res.data.status=='9'){//3、未通过
                           this.open_shop_button=true
                        }
                    }else if(res.message="操作成功"){
                        this.open_shop_button=1;//未开通
                    }
                }
            }
        },
        created(){

        },
        mounted(){
            this.shop_status();
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.qcmscommitresult{
    padding-top: 1rem;
    min-height: 100vh;
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
    width: 100%;
    height: 4.5rem;
    background-color: #fff;
    padding-top: .85rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: .5rem;
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
