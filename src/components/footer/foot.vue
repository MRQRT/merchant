<template>
    <div class="footer">
        <router-link to="/index" tag="li" class="storeGold">
            <span class="icon"></span>
            <span class="txt">回收</span>
        </router-link>
        <router-link to="/storeorderlist" tag="li" class="storeOrder">
            <span class="icon"></span>
            <span class="txt">订单</span>
        </router-link>
        <router-link to="/mine" tag="li" class="mine">
            <span class="icon"></span>
            <span class="txt">我的</span>
        </router-link>
    </div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        mounted(){
        },
        computed: {

        },
        methods: {

        },

    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.footer{
    width: 100%;
    height: .98rem;
    text-align: center;
    border-top:1px solid #eee;
    background-color: #fff;
    padding-top:.1rem;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    color: #333;
    font-size: .22rem;
    @include flex-box();
    @include justify-content();
    li{
        width: 33%;
        flex-direction: column;
        align-items: center;
        @include flex-box();
        .icon{
            background-color: #eee;
            margin-bottom: .03rem;
            @include inline-block(.44rem,.44rem);
        }
        .txt{
            font-size: .22rem;
        }
        &:nth-of-type(1){
            .icon{
                @include bg-image('/static/images/tabbar1-normal.png');
            }
        }
        &:nth-of-type(2){
            .icon{
                @include bg-image('/static/images/tabbar2-normal.png');
            }
        }
        &:nth-of-type(3){
            .icon{
                @include bg-image('/static/images/tabbar3-normal.png');
            }
        }
    }
    .router-link-active{
        .txt{
            color: #C09C60;
        }
        &:nth-of-type(1){
            .icon{
                @include bg-image('/static/images/tabbar1-active.png');
            }
        }
        &:nth-of-type(2){
            .icon{
                @include bg-image('/static/images/tabbar2-active.png');
            }
        }
        &:nth-of-type(3){
            .icon{
                @include bg-image('/static/images/tabbar3-active.png');
            }
        }
    }
}
</style>
