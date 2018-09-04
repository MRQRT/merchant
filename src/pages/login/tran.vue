<template>
    <div class="tran">
        <p>{{message}}</p>
    </div>
</template>

<script>
import {urlParse} from '@/config/mUtils.js';
import {mapMutations,mapState} from 'vuex';

export default {
    data(){
        return{
            code:'',
            message:'登录成功，跳转中......',
        }
    },
    components:{
    },
    computed: {

    },
    watch:{

    },
    methods: {
        ...mapMutations([
            'RECORD_USERID','RECORD_MOBILE','RECORD_MERCHANTID','RECORD_ACCESSTOKEN'
        ]),
    },
    created(){

    },
    mounted(){
        let obj=urlParse();
        if(obj.code=='000000'){
            this.RECORD_USERID(obj.userId)
            this.RECORD_ACCESSTOKEN(obj.accessToken)
            this.RECORD_MOBILE(obj.mobile)
            this.RECORD_MERCHANTID(obj.merchantId)
            var v_this=this
            setTimeout(function(){
                v_this.$router.push('/index')
            },3000)
        }else if(obj.code=='000006'){
            this.message='用户状态异常'
        }
    },
}

</script>

<style scoped lang="scss">
.tran p{
    margin-top:.5rem;
    margin-left:.8rem;
}
</style>
