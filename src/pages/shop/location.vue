<template>
    <div class="location">
        <!-- 头部标题部分 -->
        <head-top headTitle='选择店铺地址' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 搜索框 -->
        <div class="search">
            <section class="se_box">
                <span @click="click_left">{{location}}</span>
                <div class="jiantou"></div>
                <input type="text" v-model="input_address" placeholder="请输入详细地址">
                <div class="search_icon" @click="search_area()"></div>
            </section>
        </div>
        <!-- 地图 -->
        <div class="allmap" id="container"></div>
        <!-- 所选地址列表 -->
        <div class="address_list">
            <section v-if="first_address" class="around" @click="select_address(first_address)">
                <p class="title">{{first_address.title}}</p>
                <div class="item_address">{{first_address.address}}</div>
            <div class="line" style="margin-top:.16rem;"></div>
            </section>
            <section class="around" v-for="(item,index) in surroundingPois" :key="index" @click="select_address(item)">
                <p class="title">{{item.title}}</p>
                <div class="item_address">{{item.address}}</div>
            <div class="line" style="margin-top:.16rem;"></div>
            </section>
        </div>
        <!-- 区域地址列表 -->
        <section class="area" v-if="area_show">
            <mt-index-list>
                <mt-index-section v-for="(letter,index) in citySortArr" :key="index" :index="letter">
                    <mt-cell  v-for="(item,index) in city_list" :key="index" v-if="item.spell==letter" :title="item.cityName" @click.native="chooseCity(item)"></mt-cell>
                </mt-index-section>
            </mt-index-list>
        </section>
    </div>
</template>
<script>
import headTop from '@/components/header/head.vue'
import icons from "static/images/remark.png"
import {city_area_list} from '@/service/getData.js'
import {MessageBox,Indicator,Toast,IndexList,IndexSection} from 'mint-ui'
import {compress,getStore,setStore,removeStore} from '@/config/mUtils.js'
    export default {
        data(){
            return{
                location: '',
                default_address: {
                    latitude:116.504,
                    longitude:39.915,
                },//默认北京的中心
                input_address: '',
                city_list: '',
                first_address:'',//第一个地址（地图上展示的地址）
                surroundingPois:[],//检索到的地址
                area_show:false,//地址列表显示开关
                citySortArr: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],//存放第二次筛选重复，不存在的城市首字母数组
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
            //点击搜索框
            search_area(){
                let v_this=this
                this.area_show=false
                if(this.input_address){//如果输入框有值，进行搜索，同时清空选中的地址
                    this.first_address='';
                    var map = new BMap.Map("container");      
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);   
                    // 创建地址解析器实例     
                    var myGeo = new BMap.Geocoder();      
                    // 将地址解析结果显示在地图上，并调整地图视野    
                    myGeo.getPoint(v_this.location+v_this.input_address, function(point){
                        if(point){
                            map.centerAndZoom(point, 15);      
                            v_this.v_mark(map,point.lng,point.lat);
                        }      
                    }, v_this.location);
                    //
                    var local = new BMap.LocalSearch(map, {
                        // renderOptions:{map: map},
                        onSearchComplete : function(r) {
                            v_this.surroundingPois=r.Br;//将搜索结果放入地址选取列表中
                        }
                    });    
                    local.search(v_this.input_address);
                }else{//如果输入框没有地址，进行定位
                    this.first_address='';
                    this.map(this.default_address,'one');
                }
            },
            //请求地址
            async city(){
                const res = await city_area_list('');
                if(res.code=='000000'){
                    this.city_list=res.data;
                }
            },
            //点击
            click_left(){
                this.area_show?this.area_show=false:this.area_show=true
            },  
            chooseCity(val){
                console.log(val)
                this.location=val.cityName
                this.area_show=false
            },
            //地址选择
            select_address(val){
                setStore('select_address',val,'session');
                this.$router.push('/editshopinfo')
            },
            //创建地图
            creatmap(val){
                var map = new BMap.Map("container");
                var point = new BMap.Point(val.latitude, val.longitude);
                map.centerAndZoom(point, 17);
            },
            //定位
            map(val,val2){
                let v_this = this;
                var map = new BMap.Map("container");
                var point = new BMap.Point(val.latitude, val.longitude);
                map.centerAndZoom(point, 17);
                //获取定位
                if(val2=='one'){
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            //以指定的经度与纬度创建一个坐标点
                            if(r.point.lng=='116.4037397'||r.point.lat=='39.91488908'){//定位失败
                                var depault = {lng:116.404,lat:39.9146}
                                var pt1 = new BMap.Point(depault.lng,depault.lat);
                                //创建一个地理位置解析器
                                var geoc = new BMap.Geocoder();
                                geoc.getLocation(pt1, function(rs){//解析格式：城市，区县，街道
                                // console.log(rs.addressComponents.district)//根据区域反解区域id
                                v_this.location=rs.addressComponents.city//城市
                                    var local = new BMap.LocalSearch(map, {    
                                        // renderOptions:{map: map},
                                        onSearchComplete : function(r) {
                                            v_this.surroundingPois=r.Br;//将搜索结果放入地址选取列表中
                                        }
                                    });    
                                    local.search(rs.address);
                                });
                                v_this.v_mark(map,depault.lng,depault.lat);
                            }else{
                                var pt2 = new BMap.Point(r.point.lng,r.point.lat);
                                //创建一个地理位置解析器
                                var geoc = new BMap.Geocoder();
                                geoc.getLocation(pt2, function(rs){//解析格式：城市，区县，街道
                                // console.log(rs.addressComponents.district)//根据区域反解区域id
                                v_this.location=rs.addressComponents.city//城市
                                    var local = new BMap.LocalSearch(map, {    
                                        // renderOptions:{map: map},
                                        onSearchComplete : function(r) {
                                            v_this.surroundingPois=r.Br;//将搜索结果放入地址选取列表中
                                        }
                                    });    
                                    local.search(rs.address);
                                });
                                v_this.v_mark(map,r.point.lng,r.point.lat);
                            }
                        }else{
                            alert('failed'+this.getStatus());//定位失败
                        }        
                    });
                }else{
                    var pt3 = new BMap.Point(val.lng,val.lat);
                    //创建一个地理位置解析器
                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(pt3, function(rs){//解析格式：城市，区县，街道
                    // console.log(rs.addressComponents.district)//根据区域反解区域id
                    v_this.location=rs.addressComponents.city//城市
                        var local = new BMap.LocalSearch(map, {    
                            // renderOptions:{map: map},
                            onSearchComplete : function(r) {
                                v_this.surroundingPois=r.Br;//将搜索结果放入地址选取列表中
                            }
                        });    
                        local.search(rs.address);
                    });
                    v_this.v_mark(map,val.lng,val.lat);
                }
            },
            v_mark(val,val1,val2){
                var point = new BMap.Point(val1, val2);
                val.centerAndZoom(point, 17);
                this.v_zidingyi_marker(val,point)
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
                val.panTo(val1);
            },
        },
        created(){

        },
        mounted(){
            if(getStore('select_address','session')){//如果内存中有选中的地址
                let e = getStore('select_address','session');
                this.map(e.point,'two');
                this.first_address=e;
            }else{
                this.map(this.default_address,'one');//定位
            }
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
    position: relative;
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
    padding: 0 0rem 0 .26rem;
    position: relative;
    width:1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid whitesmoke;
}
.se_box input{
    float: left;
    background:rgba(245,245,245,1);
    margin-top: .2rem;
    margin-left: .1rem;
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
    min-height: 1.1rem;
    font-size: .3rem;
    color: .333rem;
    padding-left: .8rem;
    padding-top: .1rem;
    background:url("/static/images/adli.png");
    background-size:.3rem;
    background-position: .25rem center;
    background-repeat: no-repeat;
    padding-right:.35rem;
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
.area{
    width: 100%;
    height: 11.5rem;
    position: absolute;
    top: 1.7rem;
    background-color:#fff;
}
.jiantou{
    width:.6rem;
    height: .7rem;;
    float: left;
}
.jiantou:before{
    content:'';
    position: absolute;
    width: .7rem;
    height: .7rem;
    @include bg-image("/static/images/back.png");
    background-size: 18%;
    background-position: center .1rem;
    transform: rotate(-90deg);
}
.search_icon{
    width:.6rem;
    height: .7rem;;
    float: right; 
    position: relative;
}
.search_icon:before{
    position: absolute;
    top:0;
    right: 0;
    content:'';
    width: .7rem;
    height: .7rem;
    @include bg-image("/static/images/search.png");
    background-size: 60%;
    background-position: center;
}
</style>
