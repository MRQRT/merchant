<template>
	<div class="loginIn">
		<head-top class="head-top" id="head_top" headTitle='找回密码'>
			<img slot='head_goback' class="head_goback" src='static/images/back.png' @click="$router.back(-1)">
        </head-top>
        <section class="logoPart">
            <img src="static/images/logo.png">
        </section>
        <!--设置密码区-->
        <section class="backPwd">
            <div class="tele">
                <input type="number" id="iptTel" placeholder="请输入手机号" v-model="tel" pattern="[0-9]*" @focus="telWrong=false;" maxlength="11">
                <span class="clear" v-show="tel"><img src="static/images/clearinput.png" alt="" @click="clears"></span>
            </div>
            <div class="idenCode">
                <input type="number" id="iptCode" ref="iptCode" placeholder="请输入验证码" v-model="code" style="width:100%;">
                <span class="getIdenCode" @click="identifyTele" ref="send_smscode" style="font-size:.26rem;">获取验证码</span>
            </div>
            <div class="newPwd">
                <input :type="texorpas" id="iptPwd" placeholder="请设置密码(6-20位数字、字母或组合)"  v-model="password"  ref="iptPwd" maxlength="20">
                <span class="visible" @click="toggle"><img :src="eye" style="width:.44rem;height:.55rem;"></span>
            </div>
        </section>
        <a class="confirmBtn" :class="{'noActived':dark,'hasActived':highLight}" @click="confirm">确定</a>
    </div>
</template>

<script>
    import op_eye from 'static/images/open_eye.png';
    import clo_eye from 'static/images/close_eye.png';
  import headTop from '../../components/header/head.vue';
  import { Toast } from 'mint-ui';
  import { mapMutations,mapState } from 'vuex'
  import {findpassword,sendsms} from '@/service/getData.js'
	export default {
		data(){
			return {
                     eye: clo_eye,//眼睛 
                     tel: '',//手机号 
                    code: '',//验证码
                password: '',//密码
                    dark: true,
               highLight: false,
                telWrong: false,//手机号不正确标志
               codeWrong: false,//验证码不正确标志
               telAccess: 1,
                     pic: '',//图片验证码区域
                    iNow: true,//解决重复点击问题
                  second: 60,//获取验证码的毫秒数	
               rightShow: 0,//手机号验证正确图标显示开关
                texorpas: 'password',
		    }
		},
		mounted() {
			
		},
        watch:{
            tel(value){
                let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0134678]|18[0-9]|14[57])[0-9]{8}$/;
                if(value.length>11){
                    this.tel = value.slice(0,11)
                }
                if(value.match(reg)){
                    this.rightShow = 1
                }else{
                    this.rightShow = 0
                }
                if(this.rightShow&&this.pwd.length>=6&&this.code.length==6){
                    this.dark=false
                    this.highLight=true
                }else{
                    this.dark=true
                    this.highLight=false
                }
            },
            code(value){
                if(this.code.length>6){
                    this.code=this.code.slice(0,6)
                }
                if(value.length==6&&this.rightShow&&this.pwd.length>=6){
                    this.dark=false
                    this.highLight=true
                }else{
                    this.dark=true
                    this.highLight=false
                }
            },
            pwd(value){
                if(value.length>=6&&this.rightShow&&this.code.length==6){
                    this.dark=false
                    this.highLight=true
                }else{
                    this.dark=true
                    this.highLight=false
                }
            }
        },
		computed:{
			
		},
		methods:{
            ...mapMutations([

            ]),
            toggle(){
                this.eye==clo_eye?this.eye=op_eye:this.eye=clo_eye
                this.eye==clo_eye?this.texorpas='password':this.texorpas='text'
            },
            myToast(message){
                Toast({
                    message: message,
                    position: 'bottom',
                    duration: 3000
                });
            },
             //点击获取验证码符合条件开始倒计时
            async identifyTele(){ 
                var send_smscode = this.$refs.send_smscode
                if(send_smscode.innerHTML != '获取验证码') return;
                if(!this.rightShow){
                    this.telWrong=true;
                    return;
                }
                let that = this
                let i = this.second;
                if(this.iNow==true){
                    that.iNow = false;
                    let timer = setInterval(function(){
                        send_smscode.style.color="#666"
                        i--;
                        send_smscode.innerHTML = i+'s';
                        if(i==-1){
                            clearInterval(timer);
                            that.iNow=true;
                            send_smscode.style.color="#eda835"
                            send_smscode.innerHTML = '获取验证码'
                            that.second = 60;
                        }
                    },1000)
                    const res=await sendSms(this.tel);
                }
            },
            async confirm(){
                if(this.dark==true){
                    return;
                }
                var regCode=/\d{6}/;
                var regPwd=/^[0-9a-zA-Z]{6,20}$/;
                if(!regCode.test(this.code)){
                    this.codeWrong=true;
                    return;  //验证码基础校验
                }   
                if(!regPwd.test(this.pwd)){
                    this.myToast('密码格式错误');  //密码基础校验
                    return;
                }
                var res=await checkSms(this.tel,this.code)//手机验证码校验，根据返回状态码去判断验证码是否错误，错误则toast提示
                if(res.code!=100){
                    this.myToast('验证码错误');
                }else{
                    var res=await updatePwd(this.tel,this.pwd,this.code);
                    if(res.code==100){
                        this.errTimes=0;
                        // this.myToast('密码重设成功')
                        // 密码找回成功则跳登入
                        this.login(this.tel,this.pwd)
                    }else{
                        this.myToast(res.message);
                    }
                }
            },
            async login(tel,pwd){
                var result=await login(tel,pwd);
                if(result.code==100){
                    this.RECORD_TOKEN(result.content)
                    //调用与app交互的传userid方法
                    sendUserId(result.content.userId);
                    window.toApp();//回app
                    this.$router.push({path:'/buyGold'})
                }else{
                    this.myToast(result.message);
                }
            },
            //清除输入框
            clears(){
                this.tel='';
            },
		},
		components:{
			headTop
		}
	}
</script>

<style scoped>
    .backPwd{
        height:8.1rem;
        padding-left:.4rem;
        padding-right:.4rem;
    }
    .tele,.idenCode,.newPwd{
        height:1.1rem;
        border-bottom: 1px solid #EFEFEF;
        line-height:1.1rem;
    }
    .tele,.newPwd,.idenCode{
        position: relative;
    }
    .tele{
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        display: -o-flex;
    }
    .tele #iptTel{
        flex:2.5;
        -webkit-flex:2.5;
        -moz-flex:2.5;
        -o-flex:2.5;
    }
    .getIdenCode{
        flex:1;
        color:#C09C60;
        text-align: center;
    }
    .tele #iptTel,.idenCode #iptCode,.newPwd #iptPwd{
        border:none;
        font-size:.3rem;
        color:#999999;
        outline-style: none;
        width:5.5rem;
        padding-left:.22rem;
    }
    .confirmBtn{
        width:6.93rem;
        height:0.9rem;
        line-height:0.9rem;
        font-size:.36rem;
        text-align: center;
        margin:0 auto;
        border-radius: 5px;
        display: block;
    }
    .visible{
        position: absolute;
        right:0.2rem;
        padding-top:.15rem;
    }
    .hasActived{
        background-color: #C09C60;
        color: #fff;
    }
    .hasActived:link{
        background-color: #C09C60;
    }
    .hasActived:hover{
        background-color: #C09C60;
    }
    .hasActived:active{
        background-color: #C09C60;
    }
    .hasActived:visited{
        background-color: #C09C60;
    }
    .noActived{
        background-color: #DDC899;
        color:#FEFCF9;
    }
    .logoPart{
    height: 2.3rem;
    padding-top: .82rem;
    margin-top: .88rem;
    text-align: center;
    }
    .logoPart img{
        width: 2rem;
    }
</style>