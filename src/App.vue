<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {query_gold_price} from './service/getData.js'
import { mapState,mapMutations } from 'vuex'

export default {
        name: 'app',
        data(){
            return{

            }
        },
        computed: {

        },
        watch:{
            $route(to,from){
                this.messageBoxRemove();
                if(to.path=='/index' || to.path=='/storegold'){
                    if(window.queryPrice){
                        clearInterval(window.queryPrice);
                    }
                    var that=this;
                    /*5秒刷新一次*/
                    window.queryPrice = setInterval(function(){
                        that.getCurrent();
                    },5000)
                }else{
                    if(window.queryPrice){
                        clearInterval(window.queryPrice);
                    }
                }
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_CURRENPRICE'
            ]),
            //messageBox删除
            messageBoxRemove(){
                var thisNode=document.getElementsByClassName("mint-msgbox-wrapper")[0]
                if(thisNode){
                    thisNode.parentNode.removeChild(thisNode)
                }
            },
            /*请求实时金价*/
            async getCurrent(){
                var res=await query_gold_price();
                if(res.code=='000000'){
                    var price=res.data.price
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
            this.getCurrent();
        },

    }
</script>

<style>
.mint-msgbox-wrapper>.mint-msgbox{
    width:5rem !important;
    border-radius: 0 !important;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    font-size: .26rem !important;
}
.mint-msgbox-wrapper .mint-msgbox-confirm, .mint-msgbox .mint-msgbox-btns .mint-msgbox-cancel{
    color:#C09C60 !important;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    padding:.1rem .2rem !important;
}
.mint-msgbox-cancel{
    border-right:1px solid #eee !important;
}
.mint-msgbox-btns{
    height:.88rem !important;
    line-height: .88rem !important;
}
.mint-msgbox-wrapper .mint-msgbox-content{
    border-bottom: 1px solid #eee !important;
}

</style>
