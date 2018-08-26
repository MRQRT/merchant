<template>
    <div class="uploadCertificate">
        <!-- 头部标题部分 -->
        <head-top headTitle='上传营业资质证书' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- tip -->
        <section class="tip">请按照图示上传证件图片</section>
        <!-- license -->
        <section class="qc">
            <img :src="license" alt="">
            <label for="license" class="upload" @change="selectImage('license')"></label>
            <input type="file" accept="image/*" id="license" style="display:none;" @change="selectImage('license',$event)">
            <p>点击上传营业执照</p>
        </section>
        <!-- idcard1 -->
        <section class="qc">
            <img :src="idcard1" alt="">
            <label for="idcard1" class="upload" @change="selectImage('idcard1')"></label>
            <input type="file" accept="image/*" id="idcard1" style="display:none;" @change="selectImage('idcard1',$event)">
            <p>点击上传法人身份证正面</p>
        </section>
        <!-- idcard2 -->
        <section class="qc">
            <img :src="idcard2" alt="">
            <label for="idcard2" class="upload" @change="selectImage('idcard2')"></label>
            <input type="file" accept="image/*" id="idcard2" style="display:none;" @change="selectImage('idcard2',$event)">
            <p>点击上传法人身份证反面</p>
        </section>
        <!-- button -->
        <div class="button">
            <section @click="next">下一步</section>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import license from 'static/images/license.png'
import idcard1 from 'static/images/idcard1.png'
import idcard2 from 'static/images/idcard2.png'
import {Indicator,Toast} from 'mint-ui'
import {compress,imgip,setStore,getStore} from '@/config/mUtils.js'
import {business_license,person_card_back,person_card_front} from '@/service/getData.js'
    export default {
        data(){
            return{
                license: license,
                back_license_url: '',//上传完返回的地址(营业执照号)
                idcard1: idcard1,
                back_idcard1_url: '',//上传完返回的地址(正面)
                idcard2: idcard2,
                back_idcard2_url: '',//上传完返回的地址(反面)
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
            //图片选取
            selectImage(val,e){
                if (!e.target.files || !e.target.files[0]){
				return;
                }
                var that=this;
                // 用FileReader读取图片并显示
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                // 文件读取完成
                reader.onload =function(evt){
                    if(val=='license'){
                        that.license = evt.target.result;//读取后的文件进行页面显示
                        var lic = document.getElementById("license").files;
                        //文件大于3M进行压缩
                        if(lic[0].size/1024/1024>3){
                            //进行压缩,压缩完后进行回调上传
                            compress(reader,e.target.files[0].size,that)
                        }else{
                            let formData = new FormData();
                            formData.append('file',lic[0]);//lic[0]如果获取不到文件，就用e.target.files[0]
                            that.uploadimg(formData,'lic');
                        }
                    }else if(val=='idcard1'){
                        that.idcard1 = evt.target.result;
                        var id1 = document.getElementById("idcard1").files;
                        if(id1[0].size/1024/1024>3){
                            //进行压缩
                            compress(reader,e.target.files[0].size,that)
                        }else{
                            let formData = new FormData();
                            formData.append('file',id1[0]);//lic[0]如果获取不到文件，就用e.target.files[0]
                            that.uploadimg(formData,'id1');
                        }
                    }else if(val=='idcard2'){
                        that.idcard2 = evt.target.result;
                        var id2 = document.getElementById("idcard2").files;
                        if(id2[0].size/1024/1024>3){
                            //进行压缩
                            compress(reader,e.target.files[0].size,that)
                        }else{
                            let formData = new FormData();
                            formData.append('file',id2[0]);//lic[0]如果获取不到文件，就用e.target.files[0]
                            that.uploadimg(formData,'id2');
                        }
                    }
                }
            },
            //图片上传
            async uploadimg(val,type){
                Indicator.open();
                if(type=='lic'){
                    const res = await business_license(val);//上传营业执照
                    if(res.code=='000000'){
                        Indicator.close();
                        this.back_license_url=imgip()+res.data;
                    }else{
                        Indicator.close();
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }else if(type=='id1'){
                    const res = await person_card_front(val);//上传身份证正面
                    if(res.code=='000000'){
                        Indicator.close();
                        this.back_idcard1_url=imgip()+res.data;
                    }else{
                        Indicator.close();
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }else if(type=='id2'){
                    const res = await person_card_back(val);//上传身份证反面
                    if(res.code=='000000'){
                        Indicator.close();
                        this.back_idcard2_url=imgip()+res.data;
                    }else{
                        Indicator.close();
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }
            },
            //下一步
            next(){
                if(this.back_license_url==''){
                    Toast('请上传营业执照')
                    return
                }else if(this.back_idcard1_url==''){
                    Toast('请上传身份证正面')
                    return
                    }else if(this.back_idcard2_url==''){
                    Toast('请上传身份证反面')
                    return
                }else{
                    var qc_imgobj = {
                        'license':this.back_license_url,
                        'idcard1':this.back_idcard1_url,
                        'idcard2':this.back_idcard2_url,
                    }
                    setStore('qc_imgobj',qc_imgobj,'session');
                    this.$router.push('/confirminfo');
                }
            }
        },
        created(){

        },
        mounted(){
            //如果内存中有地址，进行返显
            if(getStore('qc_imgobj','session')){
                var a = getStore('qc_imgobj','session');
                this.license=a.license;
                this.back_license_url=a.license;//上传完返回的地址(营业执照号)
                this.idcard1=a.idcard1;
                this.back_idcard1_url=a.idcard1;//上传完返回的地址(正面)
                this.idcard2=a.idcard2;
                this.back_idcard2_url=a.idcard2;//上传完返回的地址(反面)
            }
        },
    }

</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.uploadCertificate{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    padding-top: .88rem;
    padding-bottom: 1.4rem;
}
.tip{
    font-size: .28rem;
    color: #666666;
    height: 1.15rem;
    line-height: 1.15rem;
    text-align: center;
}
.qc{
    width: 100%;
    height: 4.9rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    position: relative;
    color: #333;
    font-size: .3rem;
}
.qc img{
    width: 5.8rem;
    height: 3.71rem;
    border: 1px solid #C09C60;
    padding: .1rem;
}
.upload{
    top: 25%;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    @include bg-image("/static/images/upicon.png");
}
.qc p{
    line-height: 1rem;
}
.button{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: .5rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    padding-bottom: .4rem;
}
.button section{
    width: 6.7rem;
    height: .88rem;
    line-height: .88rem;
    background-color: #DDC899;
    color: #fff;
    font-size: .32rem;
    border-radius: 4px;
    text-align: center;
}
</style>
