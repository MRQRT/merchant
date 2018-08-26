<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {query_gold_price} from './service/getData.js'

export default {
        name: 'App',

        data(){
            return{

            }
        },
        computed: {

        },
        watch:{

        },
        methods: {
            /*请求实时金价*/
            async getCurrent(){
                var res=await query_gold_price();
                if(res.code==200){
                    var price=res.data.goldPrice
                    this.RECORD_CURRENPRICE(price) // 将获取到的金价储存在session中
                }else{
					if(!this.currentPrice){ 	// 如果session中无数据，则是首次请求失败
						this.RECORD_CURRENPRICE('')
					}
				}
            },
        },
        created(){

        },
        mounted(){
            /*调用实时金价*/
            // this.getCurrent();
            var that=this;
            /*3秒刷新一次*/
            // setInterval(function(){
            //     that.getCurrent();
            // },10000)
        },
    }
</script>

<style>
.mint-msgbox-wrapper>.mint-msgbox{
    width:5rem;
    border-radius: 0;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    font-size: .26rem;
}
.mint-msgbox-wrapper .mint-msgbox-confirm, .mint-msgbox .mint-msgbox-btns .mint-msgbox-cancel{
    color:#C09C60;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    text-align: left;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    padding:.1rem .2rem;
}
.mint-msgbox-cancel{
    border-right:1px solid #eee;
}
</style>
