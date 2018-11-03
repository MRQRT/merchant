<template>

</template>


<script>
import {  merchant_open_apply_status, shop} from '@/service/getData.js'

export default {
    data(){
        return{}
    },
    methods: {
        // 获取最新商户审核信息
        async merchant_open_apply_status(){
            var res = await merchant_open_apply_status();
            if(res.code=='000000'){
                if(res.data){
                    this.$router.push('/applicationresults') //审核结果页
                }else{
                    this.$router.push('/openshopguide') // 商户入驻引导页
                }
            }
        },
    },
    mounted() {
      //do something after mounting vue instance
      this.merchant_open_apply_status();
    }
}
</script>
<style lang="scss" scoped>
</style>
