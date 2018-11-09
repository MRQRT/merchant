<template>
    <div class="bindingBank">
        <!-- 头部标题部分 -->
        <head-top headTitle='添加银行卡' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <div class="form-wrap">
                <!-- 姓名 -->
                <section>
    				<!-- <input type="text" name="name" placeholder="请输入真实姓名" v-model="name" readonly="readonly"> -->
                    <p>{{name}}</p>
    			</section>
                <!-- 身份证 -->
                <section>
    				<!-- <input type="number" name="userID" placeholder="请输入身份证号" v-model="userID" readonly="readonly"> -->
                    <p>{{userID}}</p>
    			</section>
                <!-- 银行卡 -->
                <section>
                    <div class="inner-wrap" :class="{'no-border':(errorTipStatus || bankTypeStatus)}">
        				<input type="tel" name="bankNum" placeholder="请输入银行卡号" ref="bankNum_input" pattern="[0-9]*"
                        v-model="bankNum" maxlength="23" @input="redSec()" v-on:blur="check(bankNum)">
                        <img :src="delImg" v-show="clear1" @click="del('b')">
                    </div>
    			</section>
                <!-- 错误提示、银行卡类型提示 -->
                <div class="tip">
                    <div class="error-tip" v-show="errorTipStatus">
                        <span class="icon"></span>
                        <span>{{errorTip}}</span>
                    </div>
                    <div class="cardType" v-show="bankTypeStatus">
                        <span>{{cardType}}/</span><span>{{bankName}}</span>
                    </div>
                </div>
                <!-- 手机号 -->
                <section>
                    <div class="inner-wrap" :class="{'no-border':telErrorStatus}">
        				<input type="tel" name="telNum" placeholder="请输入银行预留手机号" v-model="telNum" pattern="[0-9]*"
                        maxlength="11" v-on:blur="checkTel(telNum)">
                        <img :src="delImg" v-show="clear2" @click="del('p')">
                    </div>
    			</section>
                <!-- 手机号错误提示 -->
                <div class="mobile-error" v-show="telErrorStatus">
                    <div class="error-tip">
                        <span class="icon"></span>
                        <span>请输入正确手机号</span>
                    </div>
                </div>
                <!-- 获取短信验证码 -->
                <section class="verification-code">
                    <div class="inner-wrap verifi-wrap">
        				<input type="tel" class="code-input" name="verifiCode" placeholder="请输入短信验证码" v-model="verifiCode" pattern="[0-9]*">
                        <span class="getVerif" @click="getVerif" ref="send_smscode">获取验证码</span>
                        <img :src="delImg" v-show="clear3" @click="del('v')">
                    </div>
    			</section>
            </div>
            <!-- 确认按钮 -->
            <div class="store-btn" :class="{'sureYes':clickstatus}" @click="stor()">确认</div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import	delImg from 'static/images/clearinput.png'
import { Toast,MessageBox } from 'mint-ui'
import { merchant, return_card_info, bind_card,captcha } from '@/service/getData.js'


    export default {
        data(){
            return{
                name:'***',                // 姓名
                userID:'**************', // 身份证号
                delImg: delImg,         // 删除按钮
                clear1:0,               // 银行卡清除按钮
                clear2:0,               // 手机号清除按钮
                clear3:0,               // 验证码清除按钮
                bankNum:'',             // 银行卡号
                telNum:'',              // 预留手机号
                verifiCode:'',          // 短信验证码
                verifiNo:null,            // 第二次发送验证码需要的编号
                errorTipStatus:false,   // 银行卡错误是否显示
                bankTypeStatus:false,   // 银行卡类型提示
                telErrorStatus:false,   // 手机号错误提示
                errorTip:'',            // 银行卡错误提示文字
                cardType:'',       // 银行卡类型
                bankName:'',     // 银行类型
                iNow: true,             // 状态变量,解决重复点击问题
                second: 60,             // 验证码倒计时
                rightShow:0,            // 信息是否完善
                clickstatus:0,          // 确认按钮是否高亮
            }
        },
        components:{
            headTop,
        },
        computed: {

        },
        watch:{
            // 手机号
            telNum: function(value){
                if(this.telNum!=''){
					this.clear2=1
				}else{
					this.clear2=0
					this.telErrorStatus=false;
				}
			},
            //银行卡号
			bankNum: function(val){
				if(this.bankNum!=''){
					this.clear1=1
				}else{
					this.clear1=0
                    this.errorTipStatus=false;
					this.bankTypeStatus=false
				}
				if(val.length<19){
					this.bankTypeStatus=false
				}
			},
            //验证码
			verifiCode: function(){
				this.verifiCode!='' ? this.clear3=1 : this.clear3=0
				//判断银行卡类型是否正确显示
				if(this.bankTypeStatus){
    				//验证码不为空，手机号正确，银行卡号不为空，
    				if(this.verifiCode!='' && this.rightShow==1 && this.bankNum!=''){
    					this.clickstatus=1;
    				}else{
    					this.clickstatus=0;
    				}
				}
			},
        },
        methods: {
            goBack(){
                this.$route.query.from == 'assets' ? this.$router.push('/assets') : this.$router.push('/storegold')
            },
            // 验证手机格式
            checkTel(){
                let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
				if(this.telNum.match(reg)){
					this.rightShow = 1;
                    this.telErrorStatus = false;
				}else if(this.telNum ==''){
					this.rightShow = 0;
                    this.telErrorStatus = false;
				}else{
					this.rightShow = 0;
                    this.telErrorStatus = true;
				}
            },
            //格式化银行卡号
            // redSec(){
            //     let num = 0;
            //     const str = this.bankNum;
            //     const elem = this.$refs.bankNum_input;
            //     if(str.length > num){
            //         const c = str.replace(/\s/g,  "");
            //         if(str != "" && c.length > 4 && c.length % 4 == 1){
            //             this.bankNum = str.substring(0, str.length - 1)+ " " + str.substring(str.length - 1, str.length);
            //         }
            //     }
            //     if(elem.setSelectionRange){//W3C
            //         setTimeout(function(){
            //             elem.setSelectionRange(elem.value.length,elem.value.length);
            //             elem.focus()
            //         },0);
            //     }else if(elem.createTextRange){//IE
            //         const textRange=elem.createTextRange()
            //         textRange.moveStart("character",elem.value.length)
            //         textRange.moveEnd("character",0)
            //         textRange.select()
            //     }
            // },
            redSec(){
                //获取当前光标的位置
                var caret = this.$refs.bankNum_input.selectionStart;
                //获取当前的value
                var value = this.bankNum;
                //从左边沿到坐标之间的空格数
                var sp = (value.slice(0, caret).match(/\s/g) || []).length
                //去掉所有空格
                var nospace = value.replace(/\s/g, '')
                //重新插入空格
                var curVal = this.bankNum = nospace.replace(/(\d{4})/g, "$1 ").trim()
                //从左边沿到原坐标之间的空格数
                var curSp = (curVal.slice(0, caret).match(/\s/g) || []).length
                //修正光标位置
                this.$refs.bankNum_input.selectionEnd = this.$refs.bankNum_input.selectionStart = caret + curSp - sp
            },
            // 获取默认商户信息
            async getMerchant(){
                var res = await merchant();
                if(res.code == '000000'){
                    this.name = res.data.personName;
                    this.userID = res.data.personCode;
                }
            },
            //失去焦点时 校验银行卡号类型
			check(value){
                // this.bankTypeStatus=true;
				const num = /^[a-z0-9\s]{16,19}$/;
                var newValue = value.replace(/\s/g, "");
				if(num.test(newValue)){
					this.tipShow = false;
					this.checkBankCard(newValue)
				}else if(newValue.length!=''){
					this.errorTipStatus=true;
					this.bankTypeStatus=false;
					this.errorTip='请输入正确的银行卡号'
				}else{
					this.errorTipStatus=false;
					this.bankTypeStatus=false;
				}
			},
            //判断银行卡类型
            async checkBankCard(val){
                const res = await return_card_info(val);
                if(res.code=='000000'){
                    if(res.data){
                        this.bankTypeStatus=true;
                        this.errorTipStatus=false;
                        this.bankName=res.data.name;
                        this.cardType=res.data.type==0?'储蓄卡':'';
                    }else{
                        this.bankTypeStatus=false
    					          this.errorTipStatus=true
    					          this.errorTip='暂不支持该卡'
                    }
                }else{
                    this.bankTypeStatus=false
					this.errorTipStatus=true
					this.errorTip=res.message
                }
            },
            //获取验证码
			async getVerif(){
				let that = this
        		let send_smscode = this.$refs.send_smscode
        		let i = this.second
        		//判断银行卡类型是否正确显示
				if(this.bankTypeStatus){
					//验证码不为空，手机号正确，银行卡号不为空
					if(this.rightShow==1){
						if(this.iNow==true && this.second==60 && this.bankTypeStatus==1){
                			that.iNow = false;
                            const bankCode = this.bankNum.replace(/\s/g, "");
                			const res=await captcha(bankCode,this.telNum,this.verifiNo)
                            if(res.code=='000000'){
                                this.verifiNo = res.data;
                                that.timer = setInterval(function(){
                        			send_smscode.style.color="#666"
                        			i--
                        			send_smscode.innerHTML = i+'s'
                        			if(i==-1){
                            			clearInterval(that.timer)
                            			that.iNow=true
                            			send_smscode.style.color="#C09C60"
                            			send_smscode.innerHTML = '获取验证码'
                            			this.second = 60
                        			}
                    			},1000)
                            }else if(res.code=='100035'){
                                that.iNow = true;
                                Toast('绑卡信息有误，请核实')
                            }else{
                                that.iNow = true;
                                Toast(res.message)
                            }
						}
					}else if(this.bankNum == '' && this.rightShow==1){
						Toast("请先输入银行卡号")
					}else if(this.bankNum == '' && this.rightShow==0 && this.telNum!=''){
						Toast("请先输入银行卡号")
					}else if(this.bankNum=='' && this.telNum==''){
						Toast("请先输入银行卡号")
					}else if(this.bankNum!='' && this.telNum==''){
						Toast("请输入正确的手机号")
					}else if(this.bankNum!='' && this.telNum!='' && this.rightShow!=1){
						Toast("请输入正确的手机号")
					}else{
						// console.log('其他情况')
					}
				}
			},
            //绑定银行卡
			async stor(){
				if(this.clickstatus){
					const formatBankN = this.bankNum.replace(/\s/g, "")
					const res = await bind_card(this.verifiNo,formatBankN, this.telNum, this.verifiCode)
					if(res.code=='000000'){
                        Toast({
                          message: '银行卡绑定成功',
                          position: 'middle',
                          duration: 1000
                        });
                        setTimeout(() => {
                            if(this.$route.query.from=='storegold'){
                                this.$router.replace('/storegold')
    						}else{
    							this.$router.replace('/mybank')
    						}
                        }, 1000);
					}else{
						MessageBox({
							title: '提示',
							message: res.message+',请核实后重新输入',
                            confirmButtonText: '确认',
                            showCancelButton:true,
						})
						this.verifiCode=''
						let send_smscode = this.$refs.send_smscode
						clearInterval(this.timer)
						send_smscode.style.color="#C09C60"
                        send_smscode.innerHTML = '获取验证码'
                        this.second = 60
						this.iNow=true
					}
				}
			},
            //删除按钮
			del: function(val){
				if(val=='b'){
					this.bankNum = ''
                    this.errorTipStatus = false;
				}else if(val=='p'){
					this.telNum = ''
                    this.telErrorStatus = false;
                    this.rightShow = 0;
				}else if(val=='v'){
					this.verifiCode = ''
				}
			},
        },
        created(){

        },
        mounted(){
            this.getMerchant(); // 获取商户默认信息
        },
    }

</script>

<style scoped lang="scss">
@import '../../../sass/mixin';
.bindingBank{
    width:100%;
    min-height: 100vh;
    padding-top:.88rem;
    background-color: #f8f8f8;
    .main-cont{
        .form-wrap{
            background-color: #fff;
            .cardType{
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                // padding:.25rem 0;
                background-color: #f8f8f8;
                span{
                    color: #333;
                    font-size:.24rem;
                }
            }
            .tip,.mobile-error{
                width: 100%;
                padding:0 .4rem;
                background-color: #f8f8f8;
                .error-tip{
                    padding:.25rem 0;
                    align-items: center;
                    @include flex-box();
                    .icon{
                        display: inline-block;
                        width: .24rem;
                        height: .24rem;
                        margin-right:.1rem;
                        @include bg-image('/static/images/bingding-error.png');
                    }
                    span{
                        color: #999;
                        font-size: .24rem;
                    }
                }
            }
            .no-border{
                input{
                    border-bottom: none !important;
                }
                border-bottom: none !important;
            }
            section{
                width:100%;
                height:1.1rem;
                line-height: 1.1rem;
                padding:0 .4rem;
                position: relative;

                p,.inner-wrap{
                    height:100%;
                    border-bottom: 1px solid #eee;
                }
                input,p{
                    width:100%;
                    // padding:.25rem 0 .35rem;
                    color:#333;
                    font-size: .28rem;
                    font-family:PingFangSC-Regular;

                }
                img{
                    display: inline-block;
                    width: .36rem;
                    height: .36rem;
                    position: absolute;
                    right:.5rem;
                    top:30%;
                }
                .getVerif{
                	display: inline-block;
                	font-size: .28rem;
                	color: #C09C60;
                }
                &:nth-of-type(1) input{
                    color:#333;
                }
                &:nth-of-type(2) input{
                    color:#333;
                }
                &:nth-of-type(5) .inner-wrap{
                    border-bottom: none;
                }
            }
            .verification-code{
                position: relative;

                .verifi-wrap{
                    padding-right:.1rem;
                    flex-wrap: nowrap;
                    @include flex-box();
                    @include justify-content();
                }
                img{
                    right:2rem;
                    top:32%;
                }
                .code-input{
                    width:70%;
                }
            }
        }

        .store-btn{
            width:89%;
            height: .88rem;
            color: #fff;
            font-size: .34rem;
            text-align: center;
            line-height: .88rem;
            margin:1rem auto 0;
            background-color: #E9DEC7;
            @include border-radius(4px);
        }
        .sureYes{
            background-color: #DDC899;
        }
    }
}
</style>
