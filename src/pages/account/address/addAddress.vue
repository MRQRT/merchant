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
			<input type="text" name="area" placeholder="所在地区" v-model="area" readonly="value">
			<img :src="right" style="width:.4rem;margin-top: .25rem;">
		</section>
		<section class="name_tel_addr last" style="height: 1.6rem">
			<textarea name="addr" placeholder="请输入详细地址" v-model="address" maxlength="50" id="area">
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
					<span @click="has_checked_click('town')">{{town}}</span>
					<span class="checkedtext" v-show="!town">请选择</span>
				</div>
				<div class="line" stlye="margin-top:.1rem;"></div>
				<div class="province" v-show="province_show">
					<ul class="list" style="over-flow:auto;">
						<li class="list_li" :class="{'has_checked':index==currprov}" v-for="(item,index) in provinces" @click="checkprov(item,index)" :key="index">
							{{item.cityName}}
							<img src="static/images/address_checked.png" class="haschecked_tip" v-show="index==currprov">
						</li>
					</ul>
				</div>
				<div class="citylist" v-show="city_show">
					<ul class="list">
						<li class="list_li" :class="{'has_checked':index==currcity}" v-for="(item,index) in citys" @click="checkcity(item,index)" :key="index">
							{{item.cityName}}
							<img src="static/images/address_checked.png" class="haschecked_tip" v-show="index==currcity">
						</li>
					</ul>
				</div>
				<div class="town" v-show="town_show">
					<ul class="list">
						<li class="list_li" :class="{'has_checked':index==currtown}" v-for="(item,index) in towns" @click="checktown(item,index)" :key="index">
							{{item.cityName}}
							<img src="static/images/address_checked.png" class="haschecked_tip" v-show="index==currtown">
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
import	right from 'static/images/next.png'
import {Popup} from 'mint-ui'

// import { addAddress, putAddress, putDefault } from '@/service/getData.js'
import { province_area_list,add_shop_address } from '@/service/getData.js'
// import { getStore } from '@/config/mUtils.js'
import { mapState,mapMutations } from 'vuex'
export default{
	data(){
		return {
			delImg: delImg,//删除图片
			right: right,//对号
			contact: '',//真实姓名
			telephone: '',//电话号
			is_1: 0,//删除变量1
			is_2: 0,//删除变量2
			rightShow: 0,
			address: '',
			stor: 0,//底部保存地址开关
			title: '添加地址',
			area: '',//地区 
			addressId: null,//修改地址的Id
			province: '',//省
			provinceId: '',//省Id
			city: '',//市
			cityId: '',//城市Id
			town: '',//区/县
			areaId: '',//地区Id
		  	popupVisible: false,//地区弹出层控制
			currprov: '',//当前选中省份
			currcity: '', //当前选中市
			currtown: '',//当前选中县
		 	province_show: false,
			city_show: false,
			town_show: false,
			provinces:[],//省数组
				citys:[],//市数组
				towns:[],//县数组
			}
		},
		created(){
			if(this.$route.query.modify=='address'){
				this.title='修改地址'
				this.modify()
			}
		},
		mounted(){
			this.province_list(100000);
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
            ...mapState([
            	'shopId'
            ])
		},
		methods:{
			//查询省市
			async province_list(val,val2){
				// ...mapMutations([
				//     'RECORD_ADDRESS'
				// ]),
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
						this.towns=res.data
					}
				}
			},
			//选择省份
			checkprov(val,val2){//参数一：省份对象 参数二：index
				this.currprov=val2
				this.province=val.cityName
				this.provinceId=val.id
				this.city=''
				this.town=''
				this.province_show=false
				this.city_show=true
				this.province_list(val.id,'市');
			}, 
			// 选择城市
			checkcity(val,val2){//参数一：城市对象 参数二：index
				this.currcity=val2
				this.city=val.cityName
				this.cityId=val.id
				this.town=''
				this.city_show=false
				this.town_show=true
				this.province_list(val.id,'县');
			},
			//选择县区
			checktown(val,val2){
				this.currtown=val2
				this.town=val.cityName
				this.areaId=val.id
				this.popupVisible=false
				this.area=this.province+this.city+this.town
			},
			// 已选择地址点击事件
			has_checked_click(val){
				if(val=='province'){
					this.province_show=true
					this.city_show=false
					this.town_show=false
					this.city=''
					this.town=''
				}else if(val=='city'){
					this.city_show=true
					this.province_show=false
					this.town_show=false
					this.town=''
				}else if(val=='town'){
					this.province_show=false
					this.city_show=false
					this.town_show=true
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
				console.log(1)
				if(this.title=='添加地址' && this.stor){
				console.log(2)
					const res_1 = await add_shop_address(this.shopId,this.contact,this.telephone,this.address,this.provinceId,this.cityId,this.areaId);
					if(res_1.code=='000000'){
						this.$router.push('/addresslist')
					}
				}
				
				
				
				
				
				
				
			
			
				
				
				// if(this.$route.query.from){
				// 	var from=this.$route.query.from;
				// 	var that=this;
				// 	if(from==1){ //如果当前是提金业务，需要保存提金标志from 1
				// 		if(this.title=='添加地址' && this.stor){
				// 			const res_1 = await addAddress(this.realName, this.telNum, this.addr)
				// 			if(res_1.code==100){
				// 				//设置默认地址
				// 				this.putDefault(res_1.content)
				// 			}
				// 		}
				// 		if(this.title=='修改地址' && this.stor){
				// 			const res_2 = await putAddress(this.addressId, this.realName, this.telNum, this.addr)
				// 			res_2.code==100?this.$router.push({path:"/fillInOrder",query:{from:1}}):''
				// 		}
				// 		return;
				// 	}
				// 	if(from==2){ //如果当前是存金业务，需要保存存金标志from 2
				// 		let address = {
				// 				contact: this.realName,
				// 				address: this.addr,
				// 			  telephone: this.telNum
				// 		};
				// 		this.RECORD_ADDRESS(address)
				// 		if(this.title=='添加地址' && this.stor){
				// 			const res_1 = await addAddress(this.realName, this.telNum, this.addr)
				// 			if(res_1.code==100){
				// 				//设置默认地址
				// 				this.putDefault(res_1.content)
				// 			}
				// 		}
				// 		if(this.title=='修改地址' && this.stor){
				// 			const res_2 = await putAddress(this.addressId, this.realName, this.telNum, this.addr)
				// 			res_2.code==100?this.$router.push({path:"/storAddress"}):''
				// 		}
				// 		return;
				// 	}
				// 	if(from==3){ //如果当前是存金修改订单业务，需要保存存金标志from 3
				// 		let address = {
				// 				contact: this.realName,
				// 				address: this.addr,
				// 			  telephone: this.telNum
				// 		};
				// 		this.RECORD_ADDRESS(address)
				// 		if(this.title=='添加地址' && this.stor){
				// 			const res_1 = await addAddress(this.realName, this.telNum, this.addr)
				// 			if(res_1.code==100){
				// 				//设置默认地址
				// 				this.putDefault(res_1.content)
				// 			}
				// 		}
				// 		if(this.title=='修改地址' && this.stor){
				// 			const res_2 = await putAddress(this.addressId, this.realName, this.telNum, this.addr)
				// 			res_2.code==100?this.$router.push({path:"/modifiRecycleOrder",query:{from: 3}}):''
				// 		}
				// 		return;
				// 	}
				// }
				// if(this.title=='添加地址' && this.stor){
				// 	const res_1 = await addAddress(this.realName, this.telNum, this.addr)
				// 	if(res_1.code==100){
				// 		//设置默认地址
				// 		this.putDefault(res_1.content)
				// 	}
				// }
				// if(this.title=='修改地址' && this.stor){
				// 	const res_2 = await putAddress(this.addressId, this.realName, this.telNum, this.addr)
				// 	res_2.code==100?this.$router.push("/personHomepage/address"):''
				// }
			},
			//设置默认地址
			async putDefault(val){
				let res = await putDefault(val)
				if(res.code==100){
					if(this.$route.query.from==1){
						this.$router.push({path:"/fillInOrder",query:{from:1}})
						return;
					}
					if(this.$route.query.from==2){
						this.$router.push({path:"/storAddress",query:{from:2}})
						return;
					}
					if(this.$route.query.from==3){
						this.$router.push({path:"/modifiRecycleOrder",query:{from:3}})
						return;
					}
					this.$router.push("/personHomepage/address")
				}
			},
			//需要修改的地址渲染页面
			modify(){
				let a = this.updateAddress;
				this.contact = a.contact
				this.telephone = a.telephone
				this.addr = a.address
				this.addressId = a.id
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