<template>
	<div class="addAddress">
		<head-top :headTitle='title'>
			<img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
		</head-top>
		<section class="name_tel_addr" style="margin-top: .88rem;">
			<input type="text" name="contact" placeholder="请输入联系人姓名" v-model="contact" maxlength="15" id="name">
			<img :src="delImg" @click="del('n')" v-show="is_1">
		</section>
		<section class="name_tel_addr">
			<input type="number" name="telephone" placeholder="请输入手机号" pattern="[0-9]*" v-model="telephone" maxlength="11" id="tel">
			<img :src="delImg" @click="del('t')" v-show="is_2">
		</section>
		<section class="name_tel_addr" @click="check_city">
			<input type="text" name="area" placeholder="所在地区" v-model="address" readonly="value">
			<img :src="next" style="width:.4rem;margin-top: .25rem;">
		</section>
		<section class="name_tel_addr last" style="height: 1.6rem">
			<textarea name="addr" placeholder="请输入详细地址" v-model="addressDetail" maxlength="32" id="area">
			</textarea>
		</section>
		<div class="stor"><span class="storAdd" :class="stor?'isStor':'noStor'" @click="baocun()">保存</span></div>
		<!-- 地区弹出区域 -->
		<mt-popup v-model="popupVisible"  position="bottom" modal="false">
			<div class="area">
					<p class="head_title"><img src="static/images/close.png" @click="closepop">所在地区</p>
				<div class="checked">
					<span @click="has_checked_click('province')">{{province}}</span>
					<span @click="has_checked_click('city')">{{city}}</span>
					<span @click="has_checked_click('area')">{{area}}</span>
					<span class="checkedtext" v-show="!area">请选择</span>
				</div>
				<div class="line" stlye="margin-top:.1rem;"></div>
				<div class="province" v-show="province_show">
					<ul class="list" style="over-flow:auto;">
						<li class="list_li" :class="{'has_checked':item.id==provinceId}" v-for="(item,index) in provinces" @click="checkprov(item)" :key="index">
							{{item.cityName}}
							<img src="static/images/address_checked.png" class="haschecked_tip" v-show="item.id==provinceId">
						</li>
					</ul>
				</div>
				<div class="citylist" v-show="city_show">
					<ul class="list">
						<li class="list_li" :class="{'has_checked':item.id==cityId}" v-for="(item,index) in citys" @click="checkcity(item)" :key="index">
							{{item.cityName}}
							<img src="static/images/address_checked.png" class="haschecked_tip" v-show="item.id==cityId">
						</li>
					</ul>
				</div>
				<div class="area" v-show="area_show">
					<ul class="list">
						<li class="list_li" :class="{'has_checked':item.id==areaId}" v-for="(item,index) in areas" @click="checkarea(item)" :key="index">
							{{item.cityName}}
							<img src="static/images/address_checked.png" class="haschecked_tip" v-show="item.id==areaId">
						</li>
					</ul>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script type="text/javascript">
import headTop from "@/components/header/head"
import	delImg from 'static/images/delImg.png'
import	next from 'static/images/next.png'
import {Popup} from 'mint-ui'

import { province_area_list,add_shop_address,query_shop_address_detail,update_shop_address } from '@/service/getData.js'
// import { getStore } from '@/config/mUtils.js'
import { mapState,mapMutations } from 'vuex'
export default{
	data(){
		return {
			delImg: delImg,//删除图片
			title: '添加地址',
			next: next,//
			contact: '',//真实姓名
			telephone: '',//电话号
			is_1: 0,//删除变量1
			is_2: 0,//删除变量2
			rightShow: 0,
			addressDetail: '',
			stor: 0,//底部保存地址开关
			address: '',//省市区
			addressId: null,//修改地址的Id
			province: '',//省
			provinceId: '',//省Id
			city: '',//市
			cityId: '',//城市Id
			area: '',//区/县
			areaId: '',//地区Id
		  	popupVisible: false,//地区弹出层控制
		 	province_show: false,
			city_show: false,
			area_show: false,
			provinces:[],//省数组
				citys:[],//市数组
				areas:[],//县数组
			}
		},
		created(){
			this.province_list(100000);
			if(this.$route.query.modify){
				this.title='修改地址'
				this.addressId=this.$route.query.modify;
				this.modify(this.$route.query.modify);
			}
		},
		mounted(){
		},
		watch:{
			contact: function(val){
				val!=''?this.is_1=1:this.is_1=0
				val!=''&&this.rightShow==1&&this.addr!=''?this.stor=1:this.stor=0
			},
			telephone: function(val){
				val!=''?this.is_2=1:this.is_2=0;
				let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
				if(val.match(reg)){
					this.rightShow = 1;
				}else if(this.telephone ==''){
					this.rightShow = 0
				}else{
					this.rightShow = 0
				};
				this.contact!=''&&this.rightShow==1&&this.addr!=''?this.stor=1:this.stor=0
			},
			addr: function(val){
				val!=''&&this.rightShow==1&&this.contact!=''?this.stor=1:this.stor=0
			}
		},
		computed:{
		},
		methods:{
			// ...mapMutations([
			//     'RECORD_ADDRESS'
			// ]),
			//查询省市
			async province_list(val,val2){//参数一：查询id 参数二：查询条件 参数三：反查寻查询ID
				if(val===100000){
					const res = await province_area_list(val);//查询省
					if(res.code=='000000'){
						this.provinces=res.data
					}
				}else if(val2=='市'){
					const res = await province_area_list(val);//查询市
					if(res.code=='000000'){
						this.citys=res.data
					}
				}else if(val2=='县'){
					const res = await province_area_list(val);//查询市
					if(res.code=='000000'){
						this.areas=res.data
					}
				}
			},
			//选择省份
			checkprov(val){//参数：省份对象
				this.province=val.cityName
				this.provinceId=val.id
				this.city=''
				this.area=''
				this.province_show=false
				this.city_show=true
				this.province_list(val.id,'市');
			},
			// 选择城市
			checkcity(val){//参数：城市对象
				this.city=val.cityName
				this.cityId=val.id
				this.area=''
				this.city_show=false
				this.area_show=true
				this.province_list(val.id,'县');
			},
			//选择县区
			checkarea(val){
				this.area=val.cityName
				this.areaId=val.id
				this.popupVisible=false
				this.address=this.province+this.city+this.area
			},
			// 已选择地址点击事件
			has_checked_click(val){
				if(val=='province'){
					this.province_show=true
					this.city_show=false
					this.area_show=false
					this.city=''
					this.area=''
				}else if(val=='city'){
					this.city_show=true
					this.province_show=false
					this.area_show=false
					this.area=''
				}else if(val=='area'){
					this.province_show=false
					this.city_show=false
					this.area_show=true
				}
			},
			closepop: function(){
				this.popupVisible=false;
			},
			check_city: function(){
				this.popupVisible=true;
				this.province_show=true;
			},
			del: function(val){
				return val=='n'?this.contact='':this.telephone=''
			},
			//保存地址
			async baocun(){
				//添加地址
				if(this.title=='添加地址' && this.stor){
					const res_1 = await add_shop_address(this.contact,this.telephone,this.addressDetail,this.provinceId,this.cityId,this.areaId);
					if(res_1.code=='000000'){
						if(this.$route.query.from=='storegold'){
							this.$router.push({
								path:'/addresslist',
								query:{
									from:'storegold'
								}
							})
						}else if(this.$route.query.from=='account'){
							this.$router.push({
								path:'/addresslist',
								query:{
									from:'account'
								}
							})
						}
					}
				//修改地址
				}else if(this.title=='修改地址'&&this.stor&&this.$route.query.modify){
					const res_2 = await update_shop_address(this.addressId,this.contact,this.telephone,this.addressDetail,this.provinceId,this.cityId,this.areaId);
					if(res_2.code=='000000'){
						if(this.$route.query.from=='storegold'){
							this.$router.push({
								path:'/addresslist',
								query:{
									from:'storegold'
								}
							})
						}else if(this.$route.query.from=='account'){
							this.$router.push({
								path:'/addresslist',
								query:{
									from:'account'
								}
							})
						}
					}
				}
			},
			//需要修改的地址渲染页面
			async modify(val){
				const res = await query_shop_address_detail(val);
				if(res.code=='000000'){
					this.contact = res.data.contact;
					this.telephone = res.data.telephone;
					this.addressDetail = res.data.address;
					this.provinceId = res.data.provinceId;
					this.cityId = res.data.cityId;
					this.areaId = res.data.areaId;
					this.address = res.data.provinceCityAreaDetail;
				}
			},
		},
		components:{
			headTop: headTop
		}
	}
</script>
<style type="text/css" scoped>
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.addAddress{
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 12;
	background-color: #f5f5f5;
	min-height: 100vh;
}
.addAddress>.name_tel_addr{
	width: 100%;
	height: 1.1rem;
	background-color: #fff;
	padding: 0 .3rem 0 .3rem;
	position: relative;
}
.addAddress>.name_tel_addr>input{
	margin-top: .3rem;
	width: 80%;
	height: .5rem;
	border: none;
	outline: none;
	font-size: .3rem;
	float: left;
	margin-bottom: .2rem;
}
.addAddress>.name_tel_addr>textarea{
	margin-top: .3rem;
	width: 100%;
	height: 1rem;
	border: none;
	outline: none;
	background: transparent;
	resize: none;
	font-size: .3rem;
    color: #000;
    display: inline-block;
    font-family: 'Microsoft Yahei';
}
@media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5),(-o-min-device-pixel-ratio:1.5){
	.addAddress>.name_tel_addr:after{
		content: '';
		display: block;
		width: 100%;
		border-bottom: 1px solid #eee;
		-webkit-transform: scaleY(0.7);
		-o-transform: scaleY(0.7);
		-moz-transform: scaleY(0.7);
		transform:scaleY(0.7);
		float: left;
	}
}
@media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2),(-o-min-device-pixel-ratio:1.5){
	.addAddress>.name_tel_addr:after{
		content: '';
		display: block;
		width: 100%;
		border-bottom: 1px solid #eee;
		-webkit-transform: scaleY(0.5);
		-o-transform: scaleY(0.5);
		-moz-transform: scaleY(0.5);
		transform:scaleY(0.5);
		float: left;
	}
}
.addAddress>.name_tel_addr.last:after{
	border: none;
}
.addAddress>.name_tel_addr>img{
	width: .3rem;
	float: right;
	margin-top: .4rem;
}
.stor{
	width: 100%;
	text-align: center;
	height: 1.28rem;
	margin-top: .8rem;
}
.storAdd{
	display: inline-block;
	bottom: 0;
	width: 94%;
	height: .95rem;
	text-align: center;
	line-height: .95rem;
	color: #fff;
	font-size: .35rem;
	border-radius: 5px;
}
.storAdd:active{
 background-color: #DDC899;
}
.isStor{
	background-color: #DDC899;
}
.noStor{
	background-color: #ded1b5;
}
.mint-popup{
	width: 100%;
}
.area{
	width: 100%;
	height: 8rem;
	background-color: #fff;
}
.head_title{
	width: 100%;
	height: 1rem;
	font-size: .32rem;
	text-align: center;font-weight:bold;
	line-height: 1rem;
	position: relative;
}
.head_title img{
	width: .26rem;
	position: absolute;
	top: .3rem;
	left: .35rem;
}
.checked{
	width: 100%;
	height: .5rem;
	line-height: .3rem;
	font-size: .28rem;
	padding-left: .4rem;
}
.checked span{
	padding: 0 .18rem 0 .18rem;
	float: left;
}
.checked .checkedtext{
	display: inline-block;
	height: .5rem;
	color: #C09C60;
	font-size: .28rem;
	position: relative;
}
.checkedtext:after{
	content: '';
	width: 80%;
	border: 1px solid #C09C60;
	position: absolute;
	bottom: 0;
	left: 10%;
}
.list{
	height:6.5rem;
	overflow:auto;
}
.list_li{
	width: 100%;
	height: .75rem;
	line-height: .75rem;
	color: #333;
	font-size: .26rem;
	padding-left: .4rem;
}
.has_checked{
	color: #C09C60;
}
.haschecked_tip{
	width: .24rem;
	margin-left: .2rem;
}
</style>
