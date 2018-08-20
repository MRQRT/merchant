<template>
    <div class="location">
        <!-- 头部标题部分 -->
        <head-top headTitle='选择店铺地址' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 搜索框 -->
        <div class="search">
            <section class="se_box">
                <span>{{location}}</span>
                <input type="text" v-model="input_address" placeholder="请输入详细地址">
            </section>
        </div>
        <!-- 地图 -->
        <div class="map">
            
        </div>
    </div>
</template>
<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{
                location: '北京市',
                input_address: '',
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
<style media="screen">

</style>
<style scoped lang="scss">
@import '../../sass/mixin';
.location{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    padding-top: .88rem;
}
.search{
    width: 100%;
    padding: 0 .4rem 0 .4rem;
    height: .7rem;
}
.se_box{
    width: 100%;
    background-color: rgba(245,245,245,1);
    font-size: .28rem;
    color: #333;
    overflow: hidden;
}
.se_box span{
    float: left;
    height: .7rem;
    line-height: .7rem;
    padding: 0 .28rem 0 .28rem;
    position: relative;
}
.se_box span:after{
    position: absolute;
    content:'';
    width: .7rem;
    height: .7rem;
    @include bg-image("/static/images/back.png");
    background-size: 20%;
    background-position: center;
    transform: rotate(-90deg);
}
.se_box span:before{
    position: absolute;
    right: -.8rem;
    content:'';
    width: .7rem;
    height: .7rem;
    @include bg-image("/static/images/back.png");
    background-size: 20%;
    background-position: center;
}
.se_box input{
    float: left;
    background:rgba(245,245,245,1);
    margin-top: .15rem;
    margin-left: .75rem;
}
.map{
    width: 100%;
    height: 6.2rem;
    border: 1px solid green;
    margin-top: .2rem;
}
input::-webkit-input-placeholder{
    font-size: .28rem;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-size: .28rem;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-size: .28rem;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    font-size: .28rem;
}
</style>
