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
        <div class="allmap" id="container"></div>
        <!-- 地址列表 -->
        <div class="address_list">
            <section class="around" v-for="(item,index) in surroundingPois" :key="index" @click="select_address(item)">
                <p class="title">{{item.title}}</p>
                <div class="item_address">{{item.address}}</div>
            <div class="line" style="margin-top:.16rem;"></div>
            </section>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/header/head.vue'
import icons from "static/images/remark.png"
import {city_area_list} from '@/service/getData.js'
import {MessageBox,Indicator,Toast} from 'mint-ui'
import {compress,getStore,setStore,removeStore} from '@/config/mUtils.js'
    export default {
        data(){
            return{
                location: '北京市',
                input_address: '',
                city_list: '',
                surroundingPois:[],//检索到的地址
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
            async city(){
                const res = await city_area_list('');
                if(res.code=='000000'){
                    this.city_list=res.data;
                }
            },
            //地址选择
            select_address(val){
                setStore('select_address',val,'session');
                this.$router.push('/editshopinfo')
            },
            //定位
            map(){
            let v_this = this;
                var map = new BMap.Map("container");
                // 创建地图实例  
                var point = new BMap.Point(116.317, 39.989);
                // 创建点坐标  
                map.centerAndZoom(point, 17);
                //获取定位
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        //以指定的经度与纬度创建一个坐标点
                        var pt = new BMap.Point(r.point.lng,r.point.lat);
                        //创建一个地理位置解析器
                        var geoc = new BMap.Geocoder();
                        geoc.getLocation(pt, function(rs){//解析格式：城市，区县，街道
                        // alert(rs.address)
                        var addComp = rs.addressComponents;
                        var localPosition = addComp.city + addComp.district + addComp.street;
                            // alert(localPosition)
                        var local = new BMap.LocalSearch(map, {      
                            // renderOptions:{map: map},
                            onSearchComplete : function(r) {
                                console.log(r)
                                console.log(r.Br)
                                v_this.surroundingPois=r.Br;
                            }
                        });    
                        local.search(rs.address);
                        });

                        // alert('您的位置：'+r.point.lng+','+r.point.lat);
                        v_this.v_mark(map,r.point.lng,r.point.lat);
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }        
                });
            },
            v_mark(val,val1,val2){
                var point = new BMap.Point(val1, val2);
                val.centerAndZoom(point, 17);
                this.v_zidingyi_marker(val,point);//自定义标注
            },
            //自定义标注
            v_zidingyi_marker(val,val1){
                // 创建图标对象   
                var myIcon = new BMap.Icon(icons, new BMap.Size(23, 25), { 
                    anchor: new BMap.Size(10, 25),    
                    // imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移 
                });      
                // 创建标注对象并添加到地图   
                var marker = new BMap.Marker(val1, {icon: myIcon}); 
                val.addOverlay(marker);    
            },
        },
        created(){

        },
        mounted(){
            this.map();
            this.city();
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
    background-size: 15%;
    background-position: center;
    transform: rotate(-90deg);
}
.se_box span:before{
    position: absolute;
    right: -5.3rem;
    content:'';
    width: .7rem;
    height: .7rem;
    @include bg-image("/static/images/search.png");
    background-size: 60%;
    background-position: center;
}
.se_box input{
    float: left;
    background:rgba(245,245,245,1);
    margin-top: .2rem;
    margin-left: .75rem;
    font-size: .28rem;
}
.allmap{
    width: 100%;
    height: 6.2rem;
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
.address_list{
    width:100%;
    height:5.3rem;
    overflow: scroll;
}
.around{
    height: 1.1rem;
    font-size: .3rem;
    color: .333rem;
    padding-left: .8rem;
    padding-top: .1rem;
    background:url("/static/images/adli.png");
    background-size:.3rem;
    background-position: .25rem center;
    background-repeat: no-repeat;
}
.title{
    line-height: .5rem;
    font-size: .3rem;
    font-weight: bold;
}
.item_address{
    font-size: .25rem;
}
.address_list .around:nth-child(1)>.title{
    color: #C09C60;
}
.address_list .around:nth-child(1){
    background:url("/static/images/move.png");
    background-size:.3rem;
    background-position: .25rem center;
    background-repeat: no-repeat;
}
</style>
