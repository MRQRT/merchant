<template>
    <div class="index">
        <!-- 头部标题部分 -->
        <head-top headTitle='存金通' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体内容 -->
        <div class="main-cont">
            <div class="" @click="$router.push('/storeGold')">存金页</div>
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
.index{
    width:100%;
    padding-top:.88rem;
}
</style>
