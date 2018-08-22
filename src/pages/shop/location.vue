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
        <div class="allmap" id="container">
            
        </div>
    </div>
</template>
<script>
import headTop from '@/components/header/head.vue'
import icons from "static/images/delivery-recent.png"

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
                            renderOptions:{map: map}  
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
            }
        },
        created(){

        },
        mounted(){
            this.map();
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
</style>
