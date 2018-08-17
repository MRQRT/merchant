<template>
    <div class="bindingBank">
        <!-- 头部标题部分 -->
        <head-top headTitle='添加银行卡' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- 主体部分 -->
        <div class="main-cont">
            <div class="form-wrap">
                <section>
    				<input type="text" name="name" placeholder="请输入真实姓名" v-model="name" readonly="readonly">
    			</section>
                <!-- 身份证 -->
                <section>
    				<input type="number" name="userID" placeholder="请输入身份证号" v-model="userID" readonly="readonly">
    			</section>
                <!-- 银行卡 -->
                <section>
    				<input type="text" name="bankNum" placeholder="请输入有效银行卡号" pattern="[0-9]*" v-model="bankNum" maxlength="19"
                    v-on:blur="check(bankNum)">
                    <img :src="delImg" v-show="clear1" @click="del('b')">
    			</section>
                <!-- 错误提示、银行卡类型提示 -->
                <section class="tip">
                    <div class="error-tip" v-show="errorTipStatus">
                        <span class="icon"></span>
                        <span>{{errorTip}}</span>
                    </div>
                    <div class="cardType" v-show="bankTypeStatus">
                        <span>{{cardType}}/</span>
                        <span>{{bankName}}</span>
                    </div>
                </section>
                <!-- 手机号 -->
                <section>
    				<input type="text" name="telNum" placeholder="请输入银行预留手机号" v-model="telNum" pattern="[0-9]*" maxlength="11">
    			</section>
                <section class="verification-code">
    				<input type="text" class="code-input" name="verifiCode" placeholder="请输入短信验证码" v-model="verifiCode" pattern="[0-9]*">
                    <span class="getVerif" @click="getVerif" ref="send_smscode">获取验证码</span>
                    <img :src="delImg" v-show="clear3" @click="del('v')">
    			</section>
            </div>
            <div class="store-btn" :class="{'sureYes':clickstatus}">确认</div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import	delImg from 'static/images/clearinput.png'
import { Toast } from 'mint-ui'

    export default {
        data(){
            return{
                name:'小可爱',                // 姓名
                userID:'12345687899900900', // 身份证号
                delImg: delImg,         // 删除按钮
                clear1:0,               // 银行卡清除按钮
                clear3:0,               // 验证码清除按钮
                bankNum:'',             // 银行卡号
                telNum:'',              // 预留手机号
                verifiCode:'',          // 短信验证码
                errorTipStatus:false,   // 错误提示是否显示
                bankTypeStatus:false,   // 银行卡类型提示
                errorTip:'',            // 银行卡错误提示文字
                cardType:'借记卡',       // 银行卡类型
                bankName:'工商银行',     // 银行类型
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
				let reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9])[0-9]{8}$/;
				// this.telNum!=''?this.clear2=1:this.clear2=0
				if(this.telNum.match(reg)){
					this.rightShow = 1
				}else if(this.telNum ==''){
					this.rightShow = 0
				}else{
					this.rightShow = 0
				}
			},
            //银行卡号
			bankNum: function(val){
				if(this.bankNum!=''){
					this.clear1=1
				}else{
					this.clear1=0
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
            //校验银行卡号
			check(value){
                this.bankTypeStatus=true;
				const num = /^[a-z0-9\s]{16,19}$/
				if(num.test(value)){
					this.tipShow = false;
					const formatBankN = this.bankNum.replace(/\s/g, "")
					// this.checkBankCard(formatBankN)
				}else if(value.length!=''){
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
                const res = await bankCardBin(value);
                if(res.code==200){
                    this.bankName=res.content.bankName
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
                			const res=await sendSms(this.telNum)
                			that.timer = setInterval(function(){
                    			send_smscode.style.color="#666"
                    			i--
                    			send_smscode.innerHTML = i+'s'
                    			if(i==-1){
                        			clearInterval(that.timer)
                        			that.iNow=true
                        			send_smscode.style.color="#eda835"
                        			send_smscode.innerHTML = '获取验证码'
                        			this.second = 60
                    			}
                			},1000)
						}
					}else if(this.bankNum == '' && this.rightShow==1){
						Toast("请先输入银行卡号")
					}else if(this.bankNum == '' && this.rightShow==0 && this.telNum!=''){
						Toast("请先输入银行卡号")
					}else if(this.bankNum=='' && this.telNum==''){
						Toast("请先输入银行卡号")
					}else if(this.bankNum!='' && this.telNum==''){
						Toast("请输入手机号")
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
					const res = await boundBankCard(formatBankN, this.telNum, this.validNum)
					if(res.code==100){
						Toast('绑定成功')
						if(this.$route.query.paths){
							this.$router.replace(this.$route.query.paths)
						}else{
							this.$router.replace('/buyGold')
						}
					}else{
						MessageBox({
							title: '提示',
							message: res.message+',请重新输入',
							confirmButtonText: '我知道了'
						})
						this.validNum=''
						let send_smscode = this.$refs.send_smscode
						clearInterval(this.timer)
						send_smscode.style.color="#eda835"
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
				}else if(val=='v'){
					this.verifiCode = ''
				}
			},
        },
        created(){

        },
        mounted(){

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
                padding:.25rem .4rem;
                background-color: #f8f8f8;
                span{
                    color: #333;
                    font-size:.24rem;
                }
            }
            .tip{
                width: 100%;
                background-color: #f8f8f8;
                .error-tip{
                    padding:.25rem 0;
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
            section{
                padding:0 .4rem;
                position: relative;
                input{
                    width:100%;
                    padding:.35rem 0;
                    color:#BCBCBC;
                    font-size: .28rem;
                    font-family:PingFangSC-Regular;
                    border-bottom: 1px solid #eee;
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
                	height: .3rem;
                	margin-top: .35rem;
                	font-size: .28rem;
                	float: right;
                	color: #eda835;

                }
                &:nth-of-type(1) input{
                    color:#333;
                }
                &:nth-of-type(2) input{
                    color:#333;
                }
                &:nth-of-type(6) input{
                    border-bottom: none;
                }
            }
            .verification-code{
                position: relative;
                img{
                    right:2rem;
                    top:32%;
                }
                .code-input{
                    width:70%;
                }
                .getVerif{
                    position: absolute;
                    right:.4rem;
                    top:0;
                }
            }
        }

        .store-btn{
            width:92%;
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
