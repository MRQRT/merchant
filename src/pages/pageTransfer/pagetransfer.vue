<template>

</template>


<script>
import { mapState,mapMutations } from 'vuex'
import {  merchant_open_apply_status, shop_status} from '@/service/getData.js'

export default {
    data(){
        return{}
    },
    computed: {
        ...mapState([
            'shopStatus','applyShopId'
        ]),
    },
    methods: {
        ...mapMutations([
            'RECORD_SHOPSTATUS'
        ]),
        //判断路由跳转函数
        pagetransfer(){
            if(this.shopStatus){ // 如果已经有店铺
                this.$router.push('/myshop');
            }else{
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
                    if(this.applyShopId!=''&&this.applyShopId!=null){ //如果是认领店铺则跳转填写店铺信息页面
                        this.$router.push('/editshopinfo')
                    }else{
                        this.$router.push('/uploadcertificate') // 上传资质页
                    }
                }
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
    mounted() {
        this.shop_status();
        this.pagetransfer();
    }
}
</script>
<style lang="scss" scoped>
</style>
