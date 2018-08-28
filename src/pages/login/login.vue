<template>
	<div class="loginIn">
		<div class="head-top" id="head_top">
            <img src='static/images/close.png' @click="backWard">
		</div>
    <!--logo模块-->
    <section class="logoPart">
        <img src="static/images/logo.png">
    </section>
    <!--登录模块-->
	<section class="loginPart">
        <!--登录方式切换-->
        <div class="tabPart">
            <div class="pwdLogin" ref="pwdLogin" @click="chooseMethod" :class="{'actived':withStyle2}" style="margin-right:.8rem;">账号密码登录
                <span class="activedBar" v-show="pwd"></span>
            </div>
            <div class="fastLogin" ref="fastLogin" @click="chooseMethod" :class="{'actived':withStyle1}">手机号快捷登录
                <span class="activedBar" v-show="fast"></span>
            </div>
        </div>
        <!--登录方式内容切换-->
         <div class="loginContent">
           <!--账号密码登录-->
           <div class="pwdContent" ref="pwdContent" v-show="pwd">
               <div class="account">
                   <input type="text" id="inputAcc" placeholder="请输入手机号/商户号" v-model="account" style="width:90%;">
                   <span class="wrongAcc" ref="wrongAccount" v-show="accWrong">号码格式错误</span>
                   <img src="static/images/clearinput.png" class="clear accIpt" v-show="account" @click="clearAccIpt">
               </div>
               <div class="password">
                   <input :type="texorpas" id="inputPwd" placeholder="请输入密码"  v-model="password" ref="inputPwd" maxlength="20" style="width:90%;">
                   <span class="visible"><img :src="eye" style="width:.44rem;height:.55rem;margin-top:.1rem;"  @click="toggle"></span>
               </div>
               <p class="forgetPwd">
                    <span @click="$router.push('/findPassword')" style="float:right">忘记密码?</span>
               </p>
           </div>
           <!--手机号快捷登录-->
           <div class="fastContent" ref="fastContent" v-show="fast">
               <div class="telephone">
                   <input type="number" id="inputTel" placeholder="请输入手机号" v-model="num" style="width:90%;" pattern="[0-9]*" maxlength="11">
                   <img src="static/images/clearinput.png" class="clear accIpt" v-show="num" @click="clearAccIpt">
               </div>
               <div class="identify">
                   <input type="text" id="identifyCode" placeholder="请输入验证码" v-model="code" style="width:100%;" maxlength="6" @input="checkInput(code,'code')">
                   <span class="getIdenCode" @click="getCode" ref="send_smscode">获取验证码</span>
               </div>
           </div>
         </div>
    </section>
    <!--登录按钮-->
    <div class="login">
        <section ref="login" @click="goToNext" class="login_click" type="default" :class="{'hasActived':highLight,'noActived':dark}">立即登录</section>
    </div>
    <!-- 注册按钮 -->
    <div class="register">
        <span @click="$router.push('/register')">注册新用户</span>
    </div>
    <!--微信登录-->
    <div class="weixin_login" v-show="isWeixin">
        <img src="static/images/wx.png" class="weixin_img" @click="weixinLogin">
        <span>微信登录</span>
    </div>
	</div>
</template>
<script>
    import {setCookie,getCookie,isNumber,isweixin} from '@/config/mUtils.js'
    import {mapMutations,mapState} from 'vuex'
    import {login,quicklogin,checkexist,sendsms,wechatlogin} from '@/service/getData.js'
    import { Toast,Button,MessageBox } from 'mint-ui'
    import md5 from 'js-md5'
    import op_eye from 'static/images/open_eye.png'
    import clo_eye from 'static/images/close_eye.png'
	export default {
		data(){
			return {
                eye:clo_eye,//
                texorpas: 'password',//密码框的类型
                fast:false,//快捷登录
                pwd:true,//密码登录
                withStyle1:false,//快捷登录加粗
                withStyle2:true,//密码登录加粗
                num:'',//手机号登录
                code:'',//手机号登录的验证码
                rightShow_1:0,//(快捷登录-手机号正确与否标志)
                rightShow_2:0,//(账号登录-账号的正确与否标志)
                account:'',//账号登录之账号
                password:'',//账号登录之密码
                highLight:false,//按钮高亮
                dark:true,   //默认登录按钮置灰
                accWrong:false,//控制账号登录校验账号
                pwdWrong:false,//控制账号登录校验密码
                iNow: true,//解决重复点击问题
                second: 60,//获取验证码的毫秒数
                isWeixin: false,//是否是微信环境
			}
		},
        created() {
            
        },
		mounted() {
            let a = isweixin();
            a?this.isWeixin=true:false
            // if(localStorage.getItem('isWebview')){
            //     document.querySelector('.weixin_login').style.display="block"
            // }
		},
		computed:{
            // ...mapState([
            //     'userInfo'
            // ]),
		},
        watch:{
            //监听输入的手机号
            num(val){
                let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
                if(val.length>11){
                    this.num = val.slice(0,11)
                }
                if(val.match(reg)){
                    this.rightShow_1 = 1
                }else if(val ==''){
                    this.rightShow_1 = 0
                    this.highLight=false;this.dark=true;
                }else{
                    this.rightShow_1 = 0
                    this.highLight=false;this.dark=true;
                }
            },
            //控制验证码长度
            code(val){
                //按钮高亮
                if(val!=''&&val.length==6&&this.rightShow_1==1){
                    this.highLight=true;this.dark=false;
                }else{
                    this.highLight=false;this.dark=true;
                }
            },
            //控制登录按钮高亮显示
            password(val){
                if(val!='' && this.rightShow_2==1 && val.length>=6){
                    this.highLight=true;this.dark=false;
                }else{
                    this.highLight=false;this.dark=true;
                }
            },
            //控制账号登录
            account(val){
                let reg = /^[a-z0-9]+$/i;//手机或者是商户号
                if(val.length>30){
                    this.account = val.slice(0,30)
                }
                if(val.match(reg)){
                    this.rightShow_2 = 1;
                    this.accWrong=false
                }else if(val ==''){
                    this.rightShow_2 = 0;
                    this.accWrong=false
                }else{
                    this.accWrong=true
                    this.rightShow_2 = 0;
                }
                if(this.rightShow_2==1&&this.password!=''){
                    this.highLight=true;this.dark=false;
                }else{
                    this.highLight=false;this.dark=true;
                }
            }
        },
		methods:{
            ...mapMutations([
                'RECORD_USERID','RECORD_MOBILE','RECORD_MERCHANTID','RECORD_ACCESSTOKEN'
            ]),
            //微信登录
            weixinLogin(){
                const url = 'http://192.168.1.114:8080/tran'
                window.location.href="http://cjtshmerchant.au32.cn/user/auth/login?redirectUrl="+url;
            },
            //点击左上角关闭按钮
            backWard(){
                var from=this.$route.query && this.$route.query.from
                if(this.params){
                    this.$router.push('/buyGold');
                }else if(from=='register' || from=='ranking' || from=='/productDetail'){
                    this.$router.back(-1);
                }else{
                    this.$router.back(-1);
                }
            },
            //登录方式切换选择
			chooseMethod($event){
                this.highLight=false;this.dark=true;
                if($event.target==this.$refs.fastLogin){
                    this.withStyle1=true;
                    this.withStyle2=false;
                    this.num='';
                    this.account='';
                    this.formetAcc='';
                    this.formetTel='';
                    this.fast=true;
                    this.pwd=false;
                    this.password='';
                    this.code='';
                }else{
                    this.withStyle1=false;
                    this.withStyle2=true;
                    this.num='';
                    this.account='';
                    this.formetAcc='';
                    this.formetTel='';
                    this.fast=false;
                    this.pwd=true;
                    this.password='';
                    this.code='';
                }
            },
            //点击登录
            async goToNext(){
                //登录按钮未高亮不能进行下一步
                if(this.$refs.login.classList.contains('noActived'))return;
                //快捷登录
                if(this.fast){
                    var res = await quicklogin(this.num,this.code);
                    if(res.code=='000000'){
                        //登录成功后获取用户基本概况
                        // this.userInforma();
                        //登录成功后去获取登录页的上一页,再跳转回去(带上对应的参数)
                        this.RECORD_USERID(res.data.userId)
                        this.RECORD_ACCESSTOKEN(res.data.accessToken)
                        this.RECORD_MOBILE(res.data.mobile)
                        this.RECORD_MERCHANTID(res.data.merchantId)
                        this.toNext();
                    }else{
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }else{//密码登录
                    var regPwd=/^[0-9a-zA-Z]{6,20}$/;
                    if(this.rightShow_2!=1){
                        this.accWrong=true;
                        return;
                    }
                    if(!regPwd.test(this.password)){
                        this.pwdWrong=true;
                        return;
                    }
                    let md5password=md5(this.password);
                    const res=await login(this.account,md5password)
                    if(res.code=="000000"){
                        //登录成功后获取用户基本概况
                        // this.userInforma();
                        this.RECORD_USERID(res.data.userId)
                        this.RECORD_ACCESSTOKEN(res.data.accessToken)
                        this.RECORD_MOBILE(res.data.mobile)
                        this.RECORD_MERCHANTID(res.data.merchantId)
                        this.toNext();
                    }else{
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }
            },
            //获取短信验证码
            async getCode(){
                if(this.iNow==false)return//还在读秒不能点击
                this.code=''
                //获取验证码之前先验证手机号格式是否正确
                if(!this.rightShow_1){
                    Toast('请输入正确的手机号')
                    return;
                }
                //验证手机号是否注册
                const res = await checkexist(this.num);//检验是否已注册
                if(res.code=="000000"&&(res.data&&!res.data.isExist)){//请求成功且注册
                    var send_smscode = this.$refs.send_smscode;
                    var that=this;
                    this.iNow = false;
                    let timer = setInterval(function(){
                        send_smscode.style.color="#666";
                        that.second--;
                        send_smscode.innerHTML = that.second+'s';
                        if(that.second==-1){
                            clearInterval(timer);
                            that.iNow=true;
                            send_smscode.style.color="#C09C60";
                            send_smscode.innerHTML = '获取验证码';
                            that.second = 60;
                        }
                    },1000)
                    let res1 = await sendsms(this.num,1);
                    if(res1.code!='000000'){
                        Toast({
                            message: res1.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }else if(res.code=="000000"&&(res.data&&res.data.isExist)){//请求成功且未注册
                    MessageBox({
                        title: '提示',
                        message: '手机号未注册' ,
                        confirmButtonText: '去注册',
                        showCancelButton: '我知道了'
                    }).then((action)=>{
                        if(action=='confirm'){
                            this.$router.push('/register')
                        }
                    })
                    return
                }else{
                    Toast({
                        message: res.message,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            },
            //获取用户基本概况
            async userInforma(){
                const res = await queryMyProfil()
                if(res.code==100){
                    this.RECORD_USERINFO(res.content)
                }
            },
            //清除账户或手机号输入框
            clearAccIpt(val){
                this.account='';
                this.num='';
            },
            //眼睛切换
            toggle(){
                this.eye==clo_eye?this.eye=op_eye:this.eye=clo_eye
                this.eye==clo_eye?this.texorpas='password':this.texorpas='text'
            },
            //检查输入是否为数字
            checkInput(val,val2){
                var str = isNumber(val);
                var ss = '';
                if(str==null){
                    if(val2=="code"){
                        this.code=''
                    }
                }else{
                    str.forEach(item => {
                        ss = ss + item
                    });
                    if(val2=="code"){
                        this.code=ss
                    }
                }
            },
            //登录完成后进行页面跳转
            toNext(){
                //登录成功后去获取进入登录页的上一页,再跳转回去(带上对应的参数)
                var path="",id="";
                if(this.$route.query.redirect){
                    path=this.$route.query.redirect
                }
                if(this.$route.query.from){
                    path=this.$route.query.from
                }
                if(this.$route.query.id){
                    id=this.$route.query.id
                }
                if(path!=''&&id==''){
                    this.$router.replace({
                        path:path
                    })
                    return;
                }else if(path!=''&&id!=''){
                    this.$router.replace({
                        path:path,
                        query: {
                            id: id
                        }
                    })
                    return
                }else{
                    this.$router.push('/index');
                }
            }
        },
		
	}
</script>
<style scoped>
input{
    caret-color: #333333;
}
.head-top img{
    width:.44rem;
    height:.44rem;
    position: absolute;
    left:.36rem;
    top:.68rem;
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
.loginPart{
    height:5.3rem;
}
.loginPart .tabPart{
    height:.55rem;
    display: flex;
    justify-content: center;
    font-size:.3rem;
    color:#333333;
}
.actived{
    color:#C09C60;
}
.tabPart .fastLogin, .tabPart .pwdLogin{
    position: relative;
}
.activedBar{
    width: 1rem;
    height: .04rem;
    position: absolute;
    background-color: #C09C60;
    bottom: -.1rem;
    left: 37%;
    margin-left: -.22rem;
}
.loginContent{
    padding-top:.54rem;
    padding-left:.4rem;
    padding-right:.4rem;
}
.telephone,.identify{
    position: relative;
}
.clear{
    position: absolute;
    width:.36rem;
    height:.36rem;
    top:0.4rem;
    right:1.8rem;
}
.right{
    position: absolute;
    width: .36rem;
    top: 0.4rem;
    right: 2.4rem;
}
.accIpt{
    right:0.2rem;
}
.telephone,.identify,.account,.password{
    height:1.1rem;
    border-bottom: 1px solid #EFEFEF;
    line-height:1.1rem;
    position: relative;
}
.password input{
    font-size:.28rem;
    padding-left: .22rem;
}
.telephone{
    display: flex;
}
.telephone #inputTel{
    flex:2.5;
    -webkit-flex:2.5;
    -moz-flex:2.5;
    -o-flex:2.5;
}
.getIdenCode{
    flex: 1;
    text-align: center;
    color: #C09C60;
    font-size: .26rem;
    position: absolute;
    right: 0;
    top: 0;
}
#inputTel,#identifyCode,#inputAcc{
    border:none;
    font-size:.3rem;
    color:#333333;
    outline-style: none;
    padding-left:.22rem;
    width: 88%;
}
#inputPwd.visibleYN{
    background-color: transparent;
    color:transparent;
}
.login{
    width:92.4%;
    margin:0 auto;
    border-radius: 5px;
}
.mint-button{
    width:100%;
    height:0.9rem;
    line-height:0.9rem;
    font-size:.34rem;
    text-align: center;
}
.mint-button--normal{
    width:100%;
}
.hasActived{
    background-color: #DDC899;
    color:#fff;
}
.hasActived:link{
    background-color: #DDC899;
}
.hasActived:hover{
    background-color: #DDC899;
 }
.hasActived:active{
    background-color: rgb(199, 178, 130);
 }
.hasActived:visited{
    background-color: #DDC899;
}
.noActived{
    background-color: #DDC899;
    opacity: .5;
    color:#FEFCF9;
}
.visible{
    position: absolute;
    right:0.2rem;
    padding-top: .15rem;
}
.forgetPwd{
    margin-top:.3rem;
    text-align: right;
    padding-right:0.2rem;
    color:#C09C60;
    font-size:.28rem;
}
.weixin_login{
    margin-top:.2rem;
    text-align:center;
    text-align: center;
}
.weixin_login span{
    display: block;
    font-size: .24rem;
    color: #999999;
}
.weixin_img{
    width:.5rem;
    margin-top:.35rem;
}
.register{
    color: #C09C60;
    font-size: .28rem;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
}
.login_click{
    width: 100%;
    height: .88rem;
    border-radius: 4px;
    line-height: .88rem;
    text-align: center;
    font-size: .34rem;
}
/*placeholder颜色*/
input::-webkit-input-placeholder{
    color:#BCBCBC;
    font-size: .32rem;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#BCBCBC;
    font-size: .32rem;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#BCBCBC;
    font-size: .32rem;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#BCBCBC;
    font-size: .32rem;
}
</style>