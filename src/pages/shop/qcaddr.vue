<template>
    <div class="qcaddr">
        <!-- 头部标题部分 -->
        <head-top headTitle='核对资质信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
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
            <section>完善店铺信息</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{

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
.qcaddr{
    padding-top: 1rem;
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
