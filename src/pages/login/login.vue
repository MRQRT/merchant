<template>
	<div class="loginIn">
		<div class="head-top" id="head_top">
            <img src='static/images/close.png' @click="backWard">
		</div>
    <!--logo模块-->
    <section class="logoPart">
        <img src="static/images/logo.png">
    </section>
    <!--登录方式模块-->
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
                   <input type="number" id="inputAcc" placeholder="请输入手机号/商户号/营业执照号" v-model="account" @focus="inputAcc" style="width:90%;" pattern="[0-9]*" maxlength="11">
                   <span class="wrongAcc" ref="wrongAccount" v-show="accWrong">手机号码格式错误</span>
                  
                   <img src="static/images/clearinput.png" class="clear accIpt" v-show="hasShow" @click="clearAccIpt">
               </div>
               <div class="password">
                   <input type="password" v-if="close" id="inputPwd" @focus="startPwd" placeholder="请输入密码"  v-model="password" ref="inputPwd" maxlength="20" style="width:90%;">
                   <input v-else type="text"   placeholder="请输入密码" id="inputPwd" v-model="password" ref="inputPwd" @focus="startPwd"  maxlength="20">
                   <span class="visible" v-show="close"><img src="static/images/close_eye.png" style="width:.44rem;height:.55rem;margin-top:.1rem;"  @click="toggleClose"></span>
                   <span class="visible" v-show="!close"><img src="static/images/open_eye.png" style="width:.44rem;height:.45rem;"  @click="toggleOpen"></span>
                   <span class="wrongPwd" ref="wrongPassword" v-show="pwdWrong">密码格式错误</span>
               </div>
               <p class="forgetPwd">
                    <span @click="$router.push('/getBackPwd')" style="float:right">忘记密码?</span>
               </p>
           </div>
           <!--手机号快捷登录-->
           <div class="fastContent" ref="fastContent" v-show="fast">
               <div class="telephone">
                   <input type="number" id="inputTel" placeholder="请输入手机号" v-model="num" @focus="startInput" style="width:90%;" pattern="[0-9]*" maxlength="11">
                   <span class="wrongNumber" ref="wrongNumber" v-show="numWrong">手机号码格式错误</span>
               </div>
               <div class="identify">
                   <input type="number" id="identifyCode" placeholder="请输入验证码" @focus="iptCode" v-model="code" style="width:100%;" pattern="[0-9]*">
                   <span class="wrongIdenCode" ref="wrongIdenCode" v-show="codeWrong">请输入6位数字</span>
                   <span class="getIdenCode" @click="getCode" ref="send_smscode">获取验证码</span>
               </div>
           </div>
         </div>
    </section>
    <!--登录按钮-->
    <div class="login"  @click="goToNext" ref="login">
        <mt-button type="default" :class="{'hasActived':highLight,'noActived':dark}">立即登录</mt-button>
    </div>
    <!-- 注册按钮 -->
    <div class="register">
        <span>注册新用户</span>
    </div>
    <!--微信登录-->
    <div class="weixin_login" v-show="isWeixin">
        <img src="static/images/wx.png" class="weixin_img" @click="weixinLogin">
        <span>微信登录</span>
    </div>
	</div>
</template>
<script>
    import {setCookie,getCookie} from '@/config/mUtils.js'
    // import {mapMutations,mapState} from 'vuex'
    // import {sendSms,quickLogin,login,picCheck,queryMyProfil} from '@/service/getData.js'
    import { Toast,Button } from 'mint-ui'
	export default {
		data(){
			return {
                fast:true,
                pwd:false,
                withStyle1:true,
                withStyle2:false,
                numWrong:false,//控制快捷登录校验手机号
                codeWrong:false,//控制快捷登录校验验证码
                num:'',//手机号登录之手机号
                code:'',//手机号登录之验证码
                rightShow_1:0,//手机号验证正确图标显示开关(快捷登录)
                rightShow_2:0,//手机号验证正确图标显示开关(账号密码登录)
                account:'',//账号登录之账号
                password:'',//账号登录之密码
                highLight:false,//按钮高亮
                dark:true,   //默认登录按钮置灰
                accWrong:false,//控制账号登录校验账号
                pwdWrong:false,//控制账号登录校验密码
                hasShow:false,//密码登录手机号清除输录框之按钮显示与否
                close:true, //默认密码不可见眼睛睁开或闭合
                errTimes:0,//登录错误次数图片验证码需要
                iNow: true,//解决重复点击问题
                second: 60,//获取验证码的毫秒数
                isWeixin: false,//是否是微信环境
			}
		},
        created() {
            
        },
		mounted() {
            // if(localStorage.getItem('isWebview')){
            //     document.querySelector('.weixin_login').style.display="block"
            // }
            this.weixinLogin();
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
                }else{
                    this.rightShow_1 = 0
                }
            },
            //控制验证码长度
            code(val){
                if(val>6){
                    this.code=this.code.slice(0,6);
                }
                //按钮高亮
                if(val!=''&&val.length==6&&this.rightShow_1==1){
                    this.highLight=true;this.dark=false;
                }else{
                    this.highLight=false;this.dark=true;
                }
            },
            password(val){ //控制登录按钮高亮显示
                if(val!='' && this.rightShow_2==1 && val.length>=6){
                    this.highLight=true;this.dark=false;
                }else{
                    this.highLight=false;this.dark=true;
                }
            },
            account(val){  //控制账号登录之账号长度
                let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
                this.account?this.hasShow=true:this.hasShow=false
                if(val.length>11){
                    this.account = val.slice(0,11)
                }
                if(val.match(reg)){
                    this.rightShow_2 = 1;
                }else if(val ==''){
                    this.rightShow_2 = 0
                }else{
                    this.rightShow_2 = 0
                }
                if(this.rightShow_2==1&&this.password!=''){
                    this.highLight=true;this.dark=false;
                }else{
                    this.highLight=false;this.dark=true;
                }
            }
        },
		methods:{
            // ...mapMutations([
            //     'RECORD_TOKEN','RECORD_USERINFO'
            // ]),
            //微信登录
            weixinLogin(){
            },
            //点击左上角关闭按钮
            backWard(){
                var from=this.$route.query && this.$route.query.from
                if(this.params){
                    window.toApp();
                    this.$router.push('/buyGold');
                }else if(from=='register' || from=='ranking' || from=='/productDetail'){
                    this.$router.back(-1);
                }else{
                    window.toApp();
                    this.$router.back(-1);
                }
            },
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
                    this.errTimes=0;
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
                    this.errTimes=0;
                    this.password='';
                    this.code='';
                }
            },
            resetPicCaptcha(){  //判断登录错误次数

            },
            async goToNext(){   //点击登录
                if(this.$refs.login.classList.contains('noActived')) {return;}//登录按钮未高亮不能进行下一步
                if(this.errTimes>=3){
                    this.resetPicCaptcha();
                    return;
                }
                if(this.fast){  //快捷登录
                    var reg=/\d{6}/;
                    var code=this.code,
                        phone=this.num;
                    if(!reg.test(code)){
                        this.codeWrong=true;
                        return;
                    }
                    if(this.params){
                        var reObj = await quickLogin(phone,code,this.params);
                    }else if(this.activityId){
                        var reObj = await quickLogin(phone,code,this.inviteCode,this.activityId);
                    }else{
                        var reObj = await quickLogin(phone,code);
                    }
                    if(reObj.code=='-1005'){//用户未设置登录密码
                        this.RECORD_TOKEN(reObj.content)
                        localStorage.setItem('needRender',true)  //依据此变量判断生金需不需要初始化数据
                        window.sendUserId(reObj.content.userId,reObj.content.token);//给APP传userId和token
                        if(this.$route.query.from){
                            var path=this.$route.query.from
                        }
                        if(path=='register'){ //该用户是经由世界杯活动注册的新用户
                            this.$router.push({
                                path:'/makePwd',
                                query:{
                                    from:'register'
                                }
                            })
                        }else if(path=='ranking'){
                            this.$router.push({
                                path:'/makePwd',
                                query:{
                                    from:'ranking'
                                }
                            })
                        }else{
                             this.$router.push({path:'/makePwd'})
                        }
                    }else if(reObj.code=='-1004'){
                        Toast({
                            message: reObj.message,
                            position: 'bottom',
                            duration: 3000
                        });
                        this.errTimes++;//验证码错误次数加1
                        if(this.errTimes>=3){
                            this.resetPicCaptcha();
                        }
                    }else if(reObj.code=='-1006'){ //手机号格式错误
                        Toast({
                            message: reObj.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }else if(reObj.code=='100'){
                        localStorage.setItem('needRender',true)  //依据此变量判断生金需不需要初始化数据
                        //登录成功后获取用户基本概况
                        this.userInforma();
                        //登录成功后去获取登录页的上一页,再跳转回去(带上对应的参数)
                        this.RECORD_TOKEN(reObj.content)
                        //调用与app交互的传userid方法
                        window.sendUserId(reObj.content.userId,reObj.content.token);//给APP传userId和token
                        var path="", id="";
                        if(this.$route.query.redirect){
                            path=this.$route.query.redirect
                        }
                        if(this.$route.query.from){
                            path=this.$route.query.from
                        }
                        if(this.$route.query.id){
                            id=this.$route.query.id
                        }
                        if(path!='' && id==''){
                            this.$router.replace({
                                path:path
                            })
                            return;
                        }
                        if(path!='' && id!=''){
                            this.$router.replace({
                                path:path,
                                query: {
                                    id: id
                                }
                            })
                            return
                        }
                        this.$router.push('/buyGold');
                    }else{
                        Toast({
                            message: reObj.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                }else{  //密码登录
                    var regPwd=/^[0-9a-zA-Z]{6,20}$/;
                    if(this.rightShow_2!=1){
                        this.accWrong=true;
                        return;
                    }
                    if(!regPwd.test(this.password)){
                        this.pwdWrong=true;
                        return;
                    }
                    const res=await login(this.account,this.password)
                    if(res.code==100){
                        localStorage.setItem('needRender',true)  //依据此变量判断生金需不需要初始化数据
                        //登录成功后获取用户基本概况
                        this.userInforma();
                        //登录成功后去获取进入登录页的上一页,再跳转回去(带上对应的参数)
                        this.RECORD_TOKEN(res.content)
                        //调用与app交互的传userid方法
                        window.sendUserId(res.content.userId,res.content.token);//给APP传userId和token
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
                            this.$router.push('/buyGold');
                        }
                    }else{
                        Toast({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000
                        });
                        this.errTimes++;//验证码错误次数加1
                        if(this.errTimes>=3){
                            this.resetPicCaptcha();
                        }
                    }
                }
            },
            startInput(){
                this.numWrong=false;  //输入手机号时手机号错误提示窗消失
            },
            iptCode($event){  //控制是否可输入验证码
                this.codeWrong=false;
            },
            //获取短信验证码
            async getCode(){
                this.code=''
                if(this.errTimes>=3){
                    this.resetPicCaptcha();
                    return;
                }
                var send_smscode = this.$refs.send_smscode;
                if(send_smscode.innerHTML != '获取验证码') return;
                //获取验证码之前先验证手机号格式是否正确
                if(!this.rightShow_1){
                    this.numWrong=true;
                    return;
                }
                var that=this;
                if(this.iNow==true){
                    this.iNow = false;
                    let timer = setInterval(function(){
                        send_smscode.style.color="#666";
                        that.second--;
                        send_smscode.innerHTML = that.second+'s';
                        if(that.second==-1){
                            clearInterval(timer);
                            that.iNow=true;
                            send_smscode.style.color="#eda835";
                            send_smscode.innerHTML = '获取验证码';
                            that.second = 60;
                        }
                    },1000)
                    const res=await sendSms(this.num);
                }
            },
            //获取用户基本概况
            async userInforma(){
                const res = await queryMyProfil()
                if(res.code==100){
                    this.RECORD_USERINFO(res.content)
                }
            },
            clear(){   //清除输入框
                this.num='';
            },
            inputAcc(){   //账号登录输入时手机号格式错误提示窗消失
                this.accWrong=false;
            },
            startPwd(){
                this.pwdWrong=false;
            },
            clearAccIpt(){  //清除输入框
                this.account='';
            },
            toggleClose(){
                this.close=false;
            },
            toggleOpen(){
                this.close=true;
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
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
    display: flex;
    -webkit-justify-content:center;
    -moz-justify-content:center;
    -o-justify-content:center;
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
.wrongNumber,.wrongIdenCode,.wrongAcc,.wrongPwd{
    height:.3rem;
    line-height: .3rem;
    color:red;
    font-size:.24rem;
    position: absolute;
    left: 0.22rem;
    bottom:0;
}
.telephone,.identify,.account,.password{
    height:1.1rem;
    border-bottom: 1px solid #EFEFEF;
    line-height:1.1rem;
    position: relative;
}
.telephone{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
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
.telephone #inputTel,.identify #identifyCode,.account #inputAcc,.password #inputPwd{
    border:none;
    font-size:.3rem;
    color:#333333;
    outline-style: none;
    padding-left:.22rem;
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
    background-color: #eda835;
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
    margin-top:1rem;
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
</style>