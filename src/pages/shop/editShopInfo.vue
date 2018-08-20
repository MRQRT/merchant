<template>
    <div class="editshopinfo">
        <!-- 头部标题部分 -->
        <head-top headTitle='完善店铺信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- headportrait -->
        <section class="headportrait">
            <label for="headpo" class="headpo">
                <input type="file" accept="image/*" style="display:none;" id="headpo">
                <img :src="headimg" alt="头像">
            </label>
                <p>设置店铺头像</p>
        </section>
        <!-- shop-message -->
        <section class="shop_mess">
            <div class="one">
                <span>店铺名称</span>
                <input type="text" placeholder="请输入店铺名称，不超过16个汉字">
            </div>
            <div class="line"></div>
            <div class="one">
                <span>店铺地址</span>
                <input type="text" placeholder="请选择店铺地址">
            </div>
            <div class="line"></div>
            <div class="one">
                <span>预约电话</span>
                <input type="text" placeholder="固定电话/手机">
            </div>
            <div class="line"></div>
            <div class="one" style="display:flex">
                <span style="float:left;">店铺简介</span>
                <textarea type="text" style="float:left;flex-grow:1" placeholder="店铺简介不可为空，最大长度144个汉字"></textarea>
            </div>
            <div class="line"></div>
            <div class="one" style="padding:0;">
                <span style="line-height:1.1rem;">营业范围</span>
                <p class="operation">
                    <span class="nochecked" :class="{'checked':hui}" @click="select('hui')">回购</span>
                    <span class="nochecked" :class="{'checked':ti}" @click="select('ti')">提金</span>
                    <span class="nochecked" :class="{'checked':huan}" @click="select('huan')">换购</span>
                    <span class="nochecked" :class="{'checked':wei}" @click="select('wei')">维保</span>
                </p>
            </div>
        </section>
        <!-- shop-photo -->
        <section class="shop_photo">
            <p>店铺门面图</p>
            <div class="uploadPho_photo">
                <div class="upload_image_preview">
                    <section v-for="(image, index) in order.images" :key="index">
                        <img :src="image.src" class="thing_img">
                        <span @click='delImage(index)' class="del_image"></span>
                    </section>
                    <input type="file" accept="image/*" @change="selectImage($event)" v-if="canPhoto" ref="file" style="display: none" name="file" id="storImg" multiple>
                    <label for="storImg" class="add_img_label" @click="selectImage" v-show="canAdd">
                        <div>
                            <img src="static/images/uploadimg.png">
                        </div>
                    </label>
                </div>
            </div>
        </section>
        <!-- buttom -->
        <section class="button">
            <div>提交</div>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import headimg from 'static/images/deheadpro.png'
    export default {
        data(){
            return{
                headimg:headimg,
                hui:0,
                ti:0,
                huan:0,
                wei:0,
                order: {//订单对象
                    checkType: '',//投资金的选择类型
                    productId: '',//投资金类型的产品ID
                    applyWeight: 10.0,//克重
                    brandType: null,//品牌
                        images: [],//手机上选择图片的图片地址
                        urls: [],//存放上传后图片在服务器的地址
                    brandName: '',//自定义品牌
                },
                canPhoto:true,
                canAdd:true,
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
            select(val){
                if(val=='hui'){
                    this.hui=!this.hui;
                }else if(val=='ti'){
                    this.ti=!this.ti;
                }else if(val=='huan'){ 
                    this.huan=!this.huan;
                }else if(val=='wei'){
                    this.wei=!this.wei;
                }
            },
            /*删除图片*/
			delImage: function(index){
                this.order.images.splice(index,1)
				this.order.urls.splice(index,1)
				this.index--
                if(this.order.images.length==0){
                }
            },
            //选择图片
            selectImage(){

            }
        },
        created(){

        },
        mounted(){

        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.editshopinfo{
    width: 100%;
    min-height: 100vh;
    padding-top: .88rem;
    background-color:#f8f8f8;
    position: relative;
}
.headportrait{
    width: 100%;
    height: 3.4rem;
    @include bg-image("/static/images/headprobg.png");
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: .6rem;
    color: #fff;
    font-size: .3rem;
}
.headportrait p{
    line-height: .8rem;
}
.headpo{
    width: 1.6rem;
    height: 1.6rem;
    position: relative;
}
.headpo:before{
    content: '';
    width: .44rem;
    height: .44rem;
    @include bg-image("/static/images/cam.png");
    position: absolute;
    bottom: -.05rem;
    right: -.05rem;
}
.shop_mess{
    width: 100%;
    padding: 0 .4rem 0 .4rem;
    background-color: #fff;
}   
.one{
    width: 100%;
    height: 1.1rem;
    color: #000;
    font-size: .28rem;
    padding-top: .35rem;
}
.one>span{
    margin-right: .1rem; 
    float: left;
}
.one input{
    width: 75%;
    font-size: .28rem;
}
.one textarea{
    width: 75%;
}
.operation{
    float: left;
}
.nochecked{
    float: left;
    font-size: .26rem;
    color: #333;
    width: 1.2rem;
    height: .5rem;
    border: 1px solid #E1E1E1;
    border-radius: 4px;
    text-align: center;
    line-height: .5rem;
    margin-right: .15rem;
    margin-top: .3rem;
}
.checked{
    border: 1px solid #C09C60;
    background-color: #f3e6d2;
    color: #C09C60;
}
.shop_photo{
    width: 100%;
    margin-top: .2rem;
    background-color: #fff; 
    min-height: 5.68rem;
    padding: 0 .4rem 0 .4rem;
}
.shop_photo>p{
    font-size: .28rem;
    line-height: 1.1rem;
}
/*上传图片*/
.uploadPho_photo{
	width: 100%;
	padding-bottom: .3rem;
}
/*添加图片按钮*/
.add_img_label{
	width: 2.1rem;
	height: 2.1rem;
	font-size: .2rem;
	color: #999999;
	text-align: center;
	background-color: #f5f5f5;
	padding-top: .3rem;
	font-size: .24rem;
	color: #999999;
	float:left;
}
.add_img_label>div>span{
    display: inline-block;
    width: 100%;
}
.add_img_label>div>span:nth-child(2){
	margin-top: .1rem;
}
.add_img_label>div>img{
	width: 1.5rem;
}
.upload_image_preview{
	list-style: none;
	overflow: hidden;
	box-sizing: border-box;
}
.upload_image_preview>section{
	position: relative;
	float: left;
	margin-top: .28rem;
	margin-right: .28rem;
}
.upload_image_preview>section:nth-child(3){
	margin-right: 0;
}
.upload_image_preview>section:nth-child(6){
	margin-right: 0;
}
.upload_image_preview>section:nth-child(9){
	margin-right: 0;
}
.upload_image_preview .thing_img{
	width: 2.1rem;
	height: 2.1rem;
	border: 1px solid #eaeaea;
}	
.upload_image_preview>section>.del_image{
	width: .35rem;
	height: .35rem;
	position: absolute;
	top: -.1rem;
	right: -.03rem;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-o-border-radius: 50%;
    @include bg-image("/static/images/cam.png");
	background-position: center;
	background-size: 100%;
} 
.button{
    width: 100%;
    height: 1.28rem;
    background-color: #fff;
    font-size: .34rem; 
    position: fixed;
    bottom: 0;
    color: #fff;
    display:flex;
    justify-content: center;
    padding-top: .2rem;
}  
.button div{
    width: 6.7rem;
    height: .88rem;
    background-color: #DDC899;
    line-height: .88rem;
    text-align: center;
    border-radius: 4px;
}    
textarea::-webkit-input-placeholder{
    font-size: .28rem;
}
textarea::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-size: .28rem;
}
textarea:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-size: .28rem;
}
textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    font-size: .28rem;
}
</style>