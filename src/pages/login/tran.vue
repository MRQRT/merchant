<template>
    <div class="tran">
        登录成功，跳转中......
    </div>
</template>

<script>
import {urlParse} from '@/config/mUtils.js';
import {mapMutations,mapState} from 'vuex';

export default {
    data(){
        return{
            openid:'',
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
        let obj=urlParse();
        console.log(obj);
        if(obj.code=='000000'){
            console.log(100)
        }
    },
}

</script>

<style scoped lang="scss">

</style>
