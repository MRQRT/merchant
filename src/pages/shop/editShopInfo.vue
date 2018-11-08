<template>
    <div class="editshopinfo">
        <!-- 头部标题部分 -->
        <head-top headTitle='完善店铺信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="goback()">
        </head-top>
        <!-- headportrait -->
        <section class="headportrait">
            <label for="headpo" class="headpo">
                <input type="file" accept="image/*" style="display:none;" id="headpo" @change="selectheadimg">
                <img :src="headimg" alt="头像" style="width:1.6rem;height:1.6rem;">
            </label>
                <p>设置店铺头像</p>
        </section>
        <!-- shop-message -->
        <section class="shop_mess">
            <div class="one">
                <span>店铺名称</span>
                <input type="text" v-model="shop_message.name" placeholder="请输入店铺名称，不超过16个汉字" style="margin-top:.05rem">
            </div>
            <div class="line"></div>
            <div class="one" style="position:relative;" @click="selectassress">
                <span>店铺地址</span>
                <input type="text" v-model="shop_message.address" placeholder="请选择店铺地址" readonly="value" style="margin-top:.05rem">
                <img :src="right" class="right_jiantou">
            </div>
            <div class="line"></div>
            <div class="one">
                <span>预约电话</span>
                <input type="text" v-model="shop_message.mobile" placeholder="固定电话/手机" maxlength="11" style="margin-top:.05rem">
            </div>
            <div class="line"></div>
            <div class="one" style="display:flex">
                <span style="float:left;">店铺简介</span>
                <textarea type="text" v-model="shop_message.introduce" maxlength="144" style="float:left;flex-grow:1" placeholder="店铺简介不可为空，最大长度144个汉字"></textarea>
            </div>
            <div class="line"></div>
            <div class="one" style="padding:0;">
                <span style="line-height:1.1rem;">营业范围</span>
                <p class="operation">
                    <span v-for="(item,index) in business_scope" class="nochecked" :class="{'checked':item.checkid==item.id}" @click="select(item)" :key="index">{{item.name}}</span>
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
                    <input type="file" accept="image/*" @change="selectImage($event)" ref="file" style="display: none" name="file" id="storImg" multiple>
                    <label for="storImg" class="add_img_label" v-show="shop_message.images.length<6" v-if="canPhoto">
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
import {compress,getStore,setStore,removeStore} from '@/config/mUtils.js'
import {MessageBox,Indicator,Toast} from 'mint-ui'
import { mapState,mapMutations } from 'vuex';
import {upload_shop_pro,upload_shop_photo,business_scope,shop_open_apply,cityName,shopDetail} from '@/service/getData.js'
    export default {
        data(){
            return{
                right:right,//右箭头
                headimg:headimg,
                headimg_url:'',//上传完返回的头像地址
                hui:'',
                ti:'',
                huan:'',
                wei:'',
                canPhoto:true,
                business_scope:[],//经营范围标签
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
                index: 0, // 序列号 可记录一共上传了多少张
            }
        },
        components:{
            headTop,
        },
        computed: {
            ...mapState([
                'applyShopId'
            ])
        },
        watch:{

        },
        methods: {
            goback(){
                this.$router.push('/applicationresults')
            },
            //经营范围选择
            select(val){
                //删除数组指定元素
                Array.prototype.remove = function(val){
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                }
                this.business_scope.forEach(element=>{
                    if(val.name==element.name&&element.checkid!=val.id){
                        element.checkid=val.id
                        this.shop_message.businessScopeId.push(val.id)
                    }else if(val.name==element.name&&element.checkid==val.id){
                        element.checkid=''
                        this.shop_message.businessScopeId.remove(val.id);
                    }
                })
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
                        compress(reader,e.target.files[0].size,that,'headimg')
                    }else{
                        let form = new FormData();
                        form.append('file',hea[0]);//hea[0]如果获取不到文件，就用e.target.files[0]
                        that.uploadimg(form,'headimg');
                    }
                }
            },
            //店铺选择图片
            selectImage(e){
                // 查看文件选取数量和文件是否为空
                if(e.target.files && e.target.files.length){
                    if(e.target.files.length+this.shop_message.images.length==6){
                        this.canPhoto=false
                    }
					if((e.target.files.length+this.shop_message.images.length)>6){
						Toast('最多上传6张图片')
						return;
					}
                }
                for(var i=0;i<e.target.files.length;i++){
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
                            this.shop_message.images.push(item)
                        }
                        console.log('上传后的images数组',this.shop_message.images)
                        this.compressimg(reader,item)//图片压缩
					}
					reader.readAsDataURL(e.target.files[i])
                }
            },
            //进行图片压缩
            compressimg(reader,item){
                var that = this
				let formData = new FormData()
                var img_size=item.size
                if(img_size/1024/1024>3){
                    //进行压缩
                    compress(reader,img_size,that,'shopphoto')
                }else{
                    let formData = new FormData();
                    formData.append('file',item.file);//lic[0]如果获取不到文件，就用e.target.files[0]
                    that.uploadimg(formData,'shopphoto');
                }
            },
            //图片上传
            async uploadimg(val,val2){
                Indicator.open('上传中...');
                if(val2=='headimg'){
                    const res = await upload_shop_pro(val);//头像上传
                    if(res.code=='000000'){
                        Indicator.close();
                        Toast({
                            message:'上传成功',
                            duration: 800,
                        });
                        setStore('headimg',res.data.url,'session');
                        this.headimg_url=res.data.url;//头像地址
                        this.shop_message.logoId=res.data.id
                    }else{
                        Indicator.close();
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }else if(val2=='shopphoto'){//店铺门面上传
                    const res = await upload_shop_photo(val);
                    Indicator.close()
                    Toast({
                        message:'上传成功',
                        duration: 800,
                    });
                    if(res.code=='000000'){
                        this.shop_message.facadeId.push(res.data.id);
                    }
                    console.log(this.shop_message.facadeId)
                }
            },
            /*删除图片*/
			delImage: function(index){
                console.log(this.shop_message.facadeId)
                this.shop_message.images.splice(index,1);
                if(this.shop_message.images.length<6){
                    this.canPhoto=true
                }
				this.shop_message.facadeId.splice(index,1)
                this.index--
            },
            //地址选择
            selectassress(){
                setStore('shop_message',this.shop_message,'session');//跳转地图保存当前页数据
                this.$router.push('/location');
            },
            //查询商店标签
            async businessScope_list(){
                const res = await business_scope();
                if(res.code=='000000'){
                    this.business_scope = res.data
                    this.business_scope.forEach(element => {
                        this.$set(element,'checkid','');
                    });
                    if(getStore('shop_message','session')){//经营范围反显
                        this.shop_message.businessScopeId.forEach(e=>{
                            this.business_scope.forEach(element => {
                                if(e==element.id){
                                    this.$set(element,'checkid',e);
                                }
                            })
                        })
                    }
                }
            },
            //根据区域解出id
            async area_id(privince,city,county){
                // const res = await cityName(privince,city,county);
                const res = await cityName(county);
                if(res.code=='000000'){
                    if(res.data){
                       this.shop_message.areaId=res.data.id
                    }
                }
            },
            //区域信息解析
            area_tran(point){
                let v_this=this
                //以指定的经度与纬度创建一个坐标点
                var pt = new BMap.Point(point.lng,point.lat);
                //创建一个地理位置解析器
                var geoc = new BMap.Geocoder();
                geoc.getLocation(pt, function(rs){//解析格式：城市，区县，街道
                    // console.log(rs.addressComponents.district)//根据区域反解区域id
                    // console.log(rs.addressComponents.province)//省
                    // console.log(rs.addressComponents.city)//城市
                    v_this.area_id(rs.addressComponents.province,rs.addressComponents.city,rs.addressComponents.district)//解出id
                })
            },
            //店铺信息校验
            check_message(){
                if(this.shop_message.logoId==''){
                    Toast('请上传头像')
                    return false
                }else if(this.shop_message.name==''){
                    Toast('请输入店铺名称')
                    return false
                }else if(this.shop_message.address==''){
                    Toast('请选择店铺地址')
                    return false
                }else if(this.shop_message.mobile==''){
                    Toast('请输入预约电话')
                    return false
                }else if(this.shop_message.introduce==''){
                    Toast('请输入店铺介绍')
                    return false
                }else if(this.shop_message.facadeId==''){
                    Toast('请上传店铺门面图')
                    return false
                }else if(this.shop_message.businessScopeId==''){
                    Toast('请选择营业范围')
                    return false
                }else{
                    return true
                }
            },
            //校验手机号是否正确
            check_tels(val){
                // let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
                let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{11}$/;
                if(val.length<11&&val.length>0){
                    Toast('手机号/电话号格式不正确')
                    return false
                }
                if(val.match(reg)){
                    return true
                }else if(val ==''){
                    Toast('请输入手机号/电话号(加区号)')
                    return false
                }else{
                    Toast('手机号/电话号格式不正确')
                    return false
                }
            },
            //信息提交
            async submit(){
                var a = this.check_message();
                if(!a)return
                let b = this.check_tels(this.shop_message.mobile);//检查手机号
                if(!b)return
                removeStore('shop_message','session');
                removeStore('headimg','session');
                removeStore('select_address','session');
                const res = await shop_open_apply(this.shop_message.logoId,this.shop_message.name,this.shop_message.areaId,this.shop_message.address,this.shop_message.lat,this.shop_message.lng,this.shop_message.mobile,this.shop_message.introduce,this.shop_message.facadeId,this.shop_message.businessScopeId,this.applyShopId);
                if(res.code=='000000'){
                    MessageBox({
                        title:'店铺信息已提交',
                        message:'审核信息将在3个工作日内发到您的手机上，请留意短信',
                        confirmButtonText:'我知道了',
                    }).then(action=>{
                        this.$router.push('/index')
                    })
                }else{
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 3000
                    });
                    // res.data.forEach(item=>{
                    //     Toast({
                    //         message:item.data.name + ' 绑定错误',
                    //         position: 'bottom',
                    //         duration: 3000
                    //     })
                    // })
                }
            },
            //如果内存中有选择的地址
            selectAddress(){
                if(getStore('select_address','session')){
                    var ad_obj=getStore('select_address','session')
                    this.shop_message.areaId='';
                    this.shop_message.address=ad_obj.title+'('+ad_obj.address+')';
                    this.shop_message.lat=ad_obj.point.lat;
                    this.shop_message.lng=ad_obj.point.lng;
                    this.area_tran(ad_obj.point);//地址解析
                }
            },
            // 我要认领入口
            applyshop(){
                if(this.applyShopId!=''&&this.applyShopId!=null){ //如果本地会话存有店铺ID，则信息回填
                    this.shopDetail();
                }
            },
            // 店铺信息反写函数
            async shopDetail(){
                var that = this;
                var res = await shopDetail(this.applyShopId);
                if(res.code=='000000'){
                    // this.shop_message = res.data;
                    this.headimg_url = res.data.logoPath;
                    this.shop_message.loginId = res.data.logoId;
                    this.shop_message.name = res.data.name;
                    this.shop_message.areaId = res.data.areaId;
                    this.shop_message.address = res.data.address;
                    this.shop_message.lat = res.data.lat;
                    this.shop_message.lng = res.data.lng;
                    this.shop_message.mobile = res.data.mobile;
                    this.shop_message.introduce = res.data.introduce;
                    this.shop_message.facadeId = res.data.facadeIds;
                    this.shop_message.businessScopeId = res.data.businessScopeIds;
                    this.shop_message.images = [];

                    res.data.facadePaths.forEach(itemSrc=>{ // 门店图片
                        if(itemSrc!=null){
                            let item = {
                  				key: '',
                  				name: '',
                  				size: '',
                                file: '',
                                src:itemSrc
                			}
                            that.shop_message.images.push(item)
                        }else{
                            that.shop_message.images = [];
                        }
                    })
                    this.shop_message.businessScopeId.forEach(item=>{ //标签反选
                        that.business_scope[item-1].checkid = item
                    })
                    if(this.$route.query.from=='location'){ // 如果是从选择地址页跳转过来，则查询存储在本地的地址
                        this.selectAddress();
                    }
                }else{
                    Toast(res.message)
                }
            },
        },
        created(){

        },
        mounted(){
            //如果内存中有地址，进行返显
            if(getStore('headimg','session')){//头像地址反显
                this.headimg = getStore('headimg','session');
                this.headimg_url = getStore('headimg','session');
            }
            if(getStore('shop_message','session')){//店铺门面图反显
                this.shop_message=getStore('shop_message','session');
            }

            //查询店铺地址经营范围字典
            this.businessScope_list();
            this.applyshop();

            this.selectAddress();//判断内存中是否已存在地址

            var height=document.documentElement.clientHeight;
            window.onresize=function(){
                var h=document.documentElement.clientHeight
                if((height-h)>50){
                    document.querySelector('.button').style.position = 'relative'
                }else{
                    document.querySelector('.button').style.position = 'fixed'
                }
            }
        },
        destroyed(){
            Indicator.close();
        }
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
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
