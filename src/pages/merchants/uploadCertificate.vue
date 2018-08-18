<template>
    <div class="uploadCertificate">
        <!-- 头部标题部分 -->
        <head-top headTitle='上传营业资质证书' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- tip -->
        <section class="tip">请按照图示上传证件图片</section>
        <!-- license -->
        <section class="qc">
            <img :src="license" alt="">
            <label for="license" class="upload"></label>
            <input type="file" accept="image/*" id="license" style="display:none;">
            <p>点击上传营业执照</p>
        </section>
        <!-- idcard1 -->
        <section class="qc">
            <img :src="idcard1" alt="">
            <label for="idcard1" class="upload"></label>
            <input type="file" accept="image/*" id="idcard1" style="display:none;">
            <p>点击上传法人身份证正面</p>
        </section>
        <!-- idcard2 -->
        <section class="qc">
            <img :src="idcard2" alt="">
            <label for="idcard2" class="upload"></label>
            <input type="file" accept="image/*" id="idcard2" style="display:none;">
            <p>点击上传法人身份证反面</p>
        </section>
        <!-- button -->
        <div class="button">
            <section>下一步</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import license from 'static/images/license.png'
import idcard1 from 'static/images/idcard1.png'
import idcard2 from 'static/images/idcard2.png'

    export default {
        data(){
            return{
                license: license,
                idcard1: idcard1,
                idcard2: idcard2, 
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
.uploadCertificate{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    padding-top: .88rem;
    padding-bottom: 1.4rem;
}
.tip{
    font-size: .28rem;
    color: #666666;
    height: 1.15rem;
    line-height: 1.15rem;
    text-align: center;
}
.qc{
    width: 100%;
    height: 4.9rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    position: relative;
    color: #333;
    font-size: .3rem;
}
.qc img{
    width: 5.8rem;
    height: 3.71rem;
    border: 1px solid #C09C60;
    padding: .1rem;
}
.upload{
    top: 25%;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    @include bg-image("/static/images/upicon.png");
}
.qc p{
    line-height: 1rem;
}
.button{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: .5rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding-bottom: .4rem;
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
