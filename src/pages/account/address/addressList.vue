<template>
	<div class="address">
		<head-top headTitle='我的地址'>
			<img slot='head_goback' src='static/images/back.png' class="head_goback" @click="backWard">
		</head-top>
		<div class="address_list" v-show='!empty'>
			<section class="addressDe" v-for="(item,index) in addre" :key="index">
				<p @click="selectAdd(item)"><span>{{item.contact}}</span><span>{{item.telephone|filter_tel}}</span></p>
				<div @click="selectAdd(item)">{{item.address}}</div>
				<p>
					<input type="radio" v-model="picked" :id="index" :value="index" @click="putDefault(item.id,index)">
					<label :for="index" @click="putDefault(item.id,index)">{{picked==index?'默认地址':'设为默认'}}</label>
					<span class="del" @click="deladr(item.id,index)">
						<img :src="del">
						<span>删除</span>
					</span>
					<span class="compile" @click="putAddress(item)">
						<img :src="compile">
						<span>编辑</span>
					</span>
				</p>
				<textarea :value="item" style="display: none"></textarea>
				<span v-show="has_checked==item.id" class="has_checked"></span>
			</section>
		</div>
		<div class="empty" v-show='empty'>
			<img src="static/images/emptA.png">
			<p>您的家在哪里？赶紧告诉我吧！</p>
			<div @click="addNewAddr" class="s">添加地址</div>
		</div>
		<a class="add" @click="addNewAddr" v-show='hasAddress'><img :src="add3">新建地址</a>
		<!-- 遮罩层 -->
		<section class="cover" v-show="cover_show">
		</section>
		<div class="message_box" v-show="cover_show">
			<h4>提示</h4>
			<p>确定要删除该地址吗？</p>
			<div class="button">
				<span class="left" @click="butt('cancel')">取消</span>
				<span class="right" @click="butt('confirm')">确定</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import headTop from "@/components/header/head"
	import { Toast,MessageBox } from 'mint-ui'
	import { query_shop_address_list, update_default_address, del_shop_address, update_shop_address } from '@/service/getData.js'
	import { setStore,getStore,getRem } from '@/config/mUtils.js'
	import { mapState, mapMutations, mapActions } from 'vuex'

	import del from "static/images/del.png"
	import compile from "static/images/compile.png"
	import add3 from "static/images/add3.png"
	import emptA from 'static/images/emptA.png'

	export default{
		data(){
			return {
				addressId:'',
				picked: null,//和radio的值匹配，所匹配的值就是那个默认值
				   del: del,//删除icon
			   compile: compile,//编辑icon
				  add3: add3,
			     addre: null,//地址
				 empty: false, //无地址
                 hasAddress:true, //有地址
				 has_checked: '',//已经选中地址的id
				 cover_show: false,//遮罩层开关
				 id: '',//要删除的地址id
				 index: '',//要删除的地址 index
			}
		},
		created(){
			var from=this.$route.query.from;
			if(this.$route.query.addressId){
				this.has_checked = this.$route.query.addressId;
				this.RECORD_ADDRESSID(this.has_checked);
			}
		},
		mounted(){
			if(this.addressid){
				this.has_checked=this.addressid
			}
			this.getAddress();
			const continer = document.getElementsByClassName('address')[0];
			const cover = document.getElementsByClassName('cover')[0];
			continer.style.minHeight=(document.documentElement.clientHeight)+'px';
		},
		watch: {

		},
		filters:{
			filter_tel(val){
				return val.substring(0,3)+'****'+val.substring(7,11);
			}
		},
		computed:{
			...mapState([
				'addressid'
			])
		},
		methods:{
			...mapMutations([
				'RECORD_ADDRESSID'
			]),
			//点击返回按钮
			backWard(){
				if(this.$route.query.from=='mine'){
					this.$router.push('/mine')
				}else{
					this.$router.push('/storegold')
				}
			},
			watchRouter(to, from){
			},
			//获取用户地址
			async getAddress(){
				const res = await query_shop_address_list();
				if(res.code=='000000'&&res.data.content.length>0){
					this.addre = res.data.content
					//遍历地址是否默认,如果没有默认地址，设置第一个地址为默认地址
					for(var i=0; i<res.data.content.length;i++){
						if(res.data.content[i].defaults==1){
							this.picked=i
							break;
						}
					}
					const continer = document.getElementsByClassName('address')[0];
					const cover = document.getElementsByClassName('cover')[0];
					setTimeout(function(){
						cover.style.height=(continer.offsetHeight)+'px';
					},10)
				}else{
					this.addre = [];
					this.empty=true
					this.hasAddress=false
				}
			},
			//设置默认地址设置默认地址
			async putDefault(val,val2){//参数一；地址id 参数二
				if(this.picked==val2)return
				let res = await update_default_address(val);
				// this.RECORD_ADDRESS(item)
			},
			//点击删除按钮
			deladr(val1,val2){
				this.cover_show=true
				this.id=val1
				this.index=val2
			},
			butt(val1){
				if(val1=='confirm'){
					this.delAddress(this.id,this.index);
				}else{
					this.cover_show=false
				}
			},
			//删除地址
			async delAddress(val,val2){
				let res = await del_shop_address(val);
				this.getAddress();
				this.cover_show=false;
				(val2==this.picked)?this.picked='':'';
				this.id=''
				this.index=''
			},
			//编辑地址
			putAddress(val){
				if(this.$route.query.from=='storegold'){
					this.$router.push({
						path:'addAddress',
						query: {
							modify: val.id,
							from:'storegold'
						}
					})
				}else if(this.$route.query.from=='mine'){
					this.$router.push({
						path:'addAddress',
						query: {
							modify: val.id,
							from:'mine'
						}
					})
				}
			},
			//地址选择
			selectAdd(value){
				// this.RECORD_ADDRESS(value);
				var from=this.$route.query.from;
				this.has_checked=value.id
				if(from=='storegold'){
					this.$router.push({
						path:'/storegold',
						query:{
							addressId:value.id
						}
					})
				}else{
					return
				}

			},
			//点击添加新地址
			addNewAddr(){
				if(this.$route.query.from=='mine'){
					this.$router.push({
						path:'/addAddress',
						query:{
							from:'mine'
						}
					})
				}else{
					this.$router.push({
						path:'/addAddress',
						query:{
							from:'storegold'
						}
					})
				}
			},
		},
		components:{
			headTop: headTop,
		}
	}
</script>
<style type="text/css" scoped>
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.address{
	width: 100%;
	position: relative;
	top: 0;
	z-index: 11;
	background-color: #f5f5f5;
	min-height:100vh;
}
.address_list{
	width: 100%;
	margin-top: .88rem;
	padding-bottom: 1rem;
	background-color: #f5f5f5;
}
.addressDe{
	background-color: #fff;
	margin-top: .2rem;
	min-height: 2.1rem;
	padding: 0 .3rem 0 .3rem;
	position: relative;
}
.addressDe>p{
	height: .7rem;
	line-height: .8rem;
	font-size: .3rem;
}
.addressDe>p:first-child{
	height: .7rem;
	line-height: .8rem;
	font-size: .3rem;
}
.addressDe>div:nth-child(2){
	word-break: break-all;
	min-height: .7rem;
	line-height: .4rem;
	font-size: .3rem;
	padding-top: .15rem;
}
.addressDe>p:nth-child(3){
	height: .75rem;
	line-height: .75rem;
	font-size: .3rem;
}
.addressDe>p:first-child span{
	margin-right: .4rem;
}
@media(-webkit-min-device-pixel-ratio:1.5),(-moz-min-device-pixel-ratio:1.5),(-o-min-device-pixel-ratio:1.5){
	.address_list>.addressDe>div:nth-child(2):after{
		content: '';
		display: inline-block;
		width: 100%;
		border-bottom: 1px solid #eeeeee;
		-webkit-transform: scaleY(0.7);
		-o-transform: scaleY(0.7);
		-moz-transform: scaleY(0.7);
		transform:scaleY(0.7);
	}
	.button:before{
		content: '';
		display: inline-block;
		width: 100%;
		border-top: 1px solid #eeeeee;
		-webkit-transform: scaleY(0.7);
		-o-transform: scaleY(0.7);
		-moz-transform: scaleY(0.7);
		transform:scaleY(0.7);
		position: absolute;
		top:0;
	}
	.button span:nth-child(1):before{
		content: '';
		display: inline-block;
		height: .88rem;
		border-right: 1px solid #eeeeee;
		-webkit-transform: scaleX(0.7);
		-o-transform: scaleX(0.7);
		-moz-transform: scaleX(0.7);
		transform:scaleX(0.7);
		position: absolute;
		right:0;
	}
}
@media(-webkit-min-device-pixel-ratio:2),(-moz-min-device-pixel-ratio:2),(-o-min-device-pixel-ratio:1.5){
	.address_list>.addressDe>div:nth-child(2):after{
		content: '';
		display: inline-block;
		width: 100%;
		border-bottom: 1px solid #eeeeee;
		-webkit-transform: scaleY(0.5);
		-o-transform: scaleY(0.5);
		-moz-transform: scaleY(0.5);
		transform:scaleY(0.5);
	}
	.button:before{
		content: '';
		display: inline-block;
		width: 100%;
		border-top: 1px solid #eeeeee;
		-webkit-transform: scaleY(0.5);
		-o-transform: scaleY(0.5);
		-moz-transform: scaleY(0.5);
		transform:scaleY(0.5);
		position: absolute;
		top:0;
	}
	.button span:nth-child(1):before{
		content: '';
		display: inline-block;
		height: .88rem;
		border-right: 1px solid #eeeeee;
		-webkit-transform: scaleX(0.5);
		-o-transform: scaleX(0.5);
		-moz-transform: scaleX(0.5);
		transform:scaleX(0.5);
		position: absolute;
		right:0;
	}
}
.add{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: .95rem;
	text-align: center;
	line-height: .95rem;
	color: #fff;
	font-size: .3rem;
	background-color: #DDC899;
}
.add:active{
	background-color: #DDC899;
}
.add>img{
	width: .45rem;
	height: .43rem;
	vertical-align: middle;
	margin-bottom: .1rem;
	margin-right: .1rem;
}
.add>span{
	font-size: .5rem;
	margin-right: .1rem;
}
.addressDe>p:nth-child(3)>input{
	width: .28rem;
	height: .28rem;
	vertical-align: middle;
	opacity: 1;
	position: relative;
	margin-right: .1rem;
}
.addressDe>p:nth-child(3)>input[type=radio]:before {
	content: '';
    display: inline-block;
    width: .34rem;
    height: .35rem;
    background: url("/static/images/reading.png") no-repeat;
    background-size: 100%;
    border: none;
    position: absolute;
    top: -3px;
    left: -2px;
    background-color: #fff;
}
.addressDe>p:nth-child(3)>input[type=radio]:checked:before{
    background: url("/static/images/store-readed.png") no-repeat;
    background-size: 100%;
    border: none;
}
.addressDe>p:nth-child(3)>.compile{
	float: right;
	margin-right: .25rem;
}
.addressDe>p:nth-child(3)>.compile>img{
	width: .35rem;
	height: .31rem;
}
.addressDe>p:nth-child(3)>.compile>span{
	font-size: .26rem;
	color: #999999;
}
.addressDe>p:nth-child(3)>.del{
	float: right;
}
.addressDe>p:nth-child(3)>.del>img{
	width: .35rem;
	height: .32rem;
	vertical-align: middle;
	margin-bottom: 3px;
}
.addressDe>p:nth-child(3)>.del>span{
	font-size: .26rem;
	color: #999999;
}
.addressDe>p:nth-child(3)>label{
	font-size: .26rem;
}
.empty{
	width: 100%;
	height:100vh;
	text-align: center;
	padding-top:2.98rem;
}
.empty img{
	width:3.1rem;
	height:2.38rem;
}
.empty>p{
	padding-top:.8rem;
	font-size: .28rem;
	color: #666666;
}
.s{
	display:inline-block;
	width:2.2rem;
	height:.7rem;
	line-height:.7rem;
	text-align:center;
	font-size:.28rem;
	background-color: #f2b643;
	margin-top:.4rem;
	border-radius:4px;
	color:#fff;
}
.has_checked{
	display: inline-block;
	width: .44rem;
	height: .44rem;
	background-image: url("/static/images/hascheck.png");
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: center;
	right: .4rem;
	top: .4rem;
	position: absolute;
}
.cover{
	position: fixed;
	top:0;
	width:100%;
	min-height: 100vh;
	background-color:rgba(0, 0, 0, .5);
	z-index:1000;
}
.message_box{
	width: 4.9rem;
	height: 2.53rem;
	background-color: #fff;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -2.45rem;
	margin-top: -1.25rem;
	z-index: 1001;
}
.message_box h4{
	font-size:.32rem;
	font-weight: bold;
	color:#333;
	text-align: center;
	line-height: 1rem;
}
.message_box p{
	font-size: .26rem;
	color:#333;
	text-align: center;
	line-height: .3rem;
}
.button{
	width: 100%;
	height: .88rem;
	position: absolute;
	bottom:0;
	display: flex;
}
.button span{
	flex-grow: 1;
	text-align:center;
	line-height: .88rem;
	font-weight:400;
	color:rgba(192,156,96,1);
	font-size: .32rem;
	position: relative;
}
</style>
