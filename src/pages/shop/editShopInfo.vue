<template>
    <div class="editshopinfo">
        <!-- 头部标题部分 -->
        <head-top headTitle='完善店铺信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- headportrait -->
        <section class="headportrait">
            <label for="headpo" class="headpo">
                <input type="file" accept="image/*" style="display:none;" id="headpo" @change="selectheadimg">
                <img :src="headimg" alt="头像">
            </label>
                <p>设置店铺头像</p>
        </section>
        <!-- shop-message -->
        <section class="shop_mess">
            <div class="one">
                <span>店铺名称</span>
                <input type="text" v-model="shop_message.name" placeholder="请输入店铺名称，不超过16个汉字">
            </div>
            <div class="line"></div>
            <div class="one" style="position:relative;" @click="$router.push('/location')">
                <span>店铺地址</span>
                <input type="text" v-model="shop_message.shop_name" placeholder="请选择店铺地址" readonly="value">
                <img :src="right" class="right_jiantou">
            </div>
            <div class="line"></div>
            <div class="one">
                <span>预约电话</span>
                <input type="text" v-model="shop_message.mobile" placeholder="固定电话/手机">
            </div>
            <div class="line"></div>
            <div class="one" style="display:flex">
                <span style="float:left;">店铺简介</span>
                <textarea type="text" v-model="shop_message.introduce" style="float:left;flex-grow:1" placeholder="店铺简介不可为空，最大长度144个汉字"></textarea>
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
                    <section v-for="(image, index) in shop_message.images" :key="index" :class="{'cover':index==0}">
                        <img :src="image.src" class="thing_img">
                        <span @click='delImage(index)' class="del_image"></span>
                    </section>
                    <input type="file" accept="image/*" @change="selectImage($event)" v-if="canPhoto" ref="file" style="display: none" name="file" id="storImg" multiple>
                    <label for="storImg" class="add_img_label" v-show="files.length<6">
                        <div>
                            <img src="static/images/uploadimg.png">
                        </div>
                    </label>
                </div>
            </div>
        </section>
        <!-- buttom -->
        <section class="button">
            <div @click="submit()">提交</div>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import headimg from 'static/images/deheadpro.png'
import	right from 'static/images/next.png'
import {compress} from '@/config/mUtils.js'
import {MessageBox} from 'mint-ui'
    export default {
        data(){
            return{
                right:right,//右箭头
                headimg:headimg,
                hui:0,
                ti:0,
                huan:0,
                wei:0,
                canPhoto:true,
                shop_message:{
                          logoId:'',//店铺头像地址
                            name:'',//店铺名称
                          areaId:'',//店铺区域主键
                         address:'',//店铺地址
                             lat:'',//店铺经度
                             lng:'',//店铺纬度
                          mobile:'',//店铺预约电话
                       introduce:'',//店铺简介
                          images:[],//店铺门面图缓存
                        facadeId:[],//店铺门面图地址数组（上传数据用）
                 businessScopeId:[],//营业范围
                },
                files: [], // 文件缓存（上传图片）
                index: 0, // 序列号 可记录一共上传了多少张
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
                //删除数组指定元素
                Array.prototype.remove = function(val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                }
                if(val=='hui'){
                    this.hui=!this.hui;
                    this.hui?this.shop_message.businessScopeId.push('回购'):this.shop_message.businessScopeId.remove('回购');
                }else if(val=='ti'){
                    this.ti=!this.ti;
                    this.ti?this.shop_message.businessScopeId.push('提金'):this.shop_message.businessScopeId.remove('提金');
                }else if(val=='huan'){ 
                    this.huan=!this.huan;
                    this.huan?this.shop_message.businessScopeId.push('换购'):this.shop_message.businessScopeId.remove('换购');
                }else if(val=='wei'){
                    this.wei=!this.wei;
                    this.wei?this.shop_message.businessScopeId.push('维保'):this.shop_message.businessScopeId.remove('维保');
                }
            },
            //头像图片选择
            selectheadimg(e){
                if (!e.target.files || !e.target.files[0]){
				return;
                }
                var that=this;
                // 用FileReader读取图片并显示
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                // 文件读取完成
                reader.onload =function(evt){
                    that.headimg = evt.target.result;//读取后的文件进行页面显示
                    var hea = document.getElementById("headpo").files;
                    //文件大于3M进行压缩
                    if(hea[0].size/1024/1024>3){
                        //进行压缩,压缩完后进行回调上传
                        compress(reader,e.target.files[0].size,that)
                    }else{
                        let formData = new FormData();
                        formData.append('files',hea[0]);//lic[0]如果获取不到文件，就用e.target.files[0]
                        that.uploadimg(formData,'headimg');
                    }
                }
            },
            //选择图片
            selectImage(e){
                // 查看文件选取数量和文件是否为空
                if(e.target.files && e.target.files.length){
					if((e.target.files.length+this.shop_message.images.length)>6){
						Toast('最多上传6张图片')
						return;
					}
                }
                for (var i=0,len=e.target.files.length;i<len;i++) {
        			let item = {
          				 key: this.index++,
          				name: e.target.files[i].name,
          				size: e.target.files[i].size,
          				file: e.target.files[i],
        			}
        			let reader = new FileReader()
        			reader.onload = (e) => {
						this.$set(item, 'src', e.target.result)  
						if(this.index<6||this.index==6){ //图片已达到6张 不在执行添加上传操作
							this.files.push(item)
							this.shop_message.images.push(item)
						}
						if(this.files.length==len){
                            this.compressimg(reader)//图片压缩
						}
					}
					reader.readAsDataURL(e.target.files[i])
                }
            },
            //进行图片压缩
            compressimg(reader){
                var that = this
				let formData = new FormData()
        		this.files.forEach((item, index) => {
                    var img_size=item.size
                    if(img_size/1024/1024>3){
                        //进行压缩
                        compress(reader,img_size,that)
                    }else{
                        let formData = new FormData();
                        formData.append('files',item.file);//lic[0]如果获取不到文件，就用e.target.files[0]
                        that.uploadimg(formData,'shopphoto');
                    }
                })
            },
            //图片上传
            uploadimg(val,val2){
                console.log(val)
                //备注：上传完要记得清空缓存数组
                if(val2=='shopphoto'){
                    this.files=[]
                }
            },
            /*删除图片*/
			delImage: function(index){
                this.files.splice(index,1)
                this.shop_message.images.splice(index,1)
				this.shop_message.facadeId.splice(index,1)
				this.index--
            },
            //信息提交
            submit(){
                MessageBox({
                    title:'店铺信息已提交',
                    message:'审核信息将在3个工作日内发到您的手机上，请留意短信',
                    confirmButtonText:'我知道了',
                }).then(action=>{
                    this.$router.push('/index')
                })
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
    padding: 0 .0rem 0 0.3rem;
}
.shop_photo>p{
    font-size: .28rem;
    height: .8rem;
    line-height: 1rem;
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
    margin-top:.28rem;
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
    padding-bottom: 1rem;
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
	top: .1rem;
	right: .1rem;
	border-radius: 50%;
    @include bg-image("/static/images/delImg.png");
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
.right_jiantou{
    width:.4rem;
    margin-top: .25rem;
    position: absolute;
    right: 0rem;
    top: .1rem;
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
.cover{
    position: relative;
}
.cover:after{
    content:''; 
    width:1.18rem;
    height:.45rem;
    position: absolute;
    top:-0.08rem;
    left:0;
    @include bg-image('/static/images/cover.png')
}
</style>