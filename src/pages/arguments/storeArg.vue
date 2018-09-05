<template>
    <div class="storeGold">
        <!-- 头部标题部分 -->
        <head-top headTitle='存金协议' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <div class="content">
			<p class="title">存金通商户版用户协议<span class="middLine"></span></p>
			<div class="start">
				<p class="subContent1">黄金管家存金服务协议-商户版是指，入驻黄金管家的商户（以下简称“您”）将其拥有的实物黄金交由北京黄金管家科技发展有限公司（以下简称“黄金管家”）回收，在回收期间，黄金管家有权按照《黄金管家存金服务协议-商户版》（以下简称“协议”）规定帮助商户进行回收实物黄金等操作。</p>
				<p class="subContent1">您同意将自己合法拥有的实物黄金委托黄金管家回收，黄金管家同意按照协议的约定接受用户的委托进行回收上述实物黄金（以下简称“回收黄金”）。</p>
				<p class="subContent1">据此，为更好地维护双方的合法权益，用户需了解、遵守及承诺如下事项：</p>
			</div>
			<div>
				<ul>

					<li class="subTitle">1、商户陈述、承诺及保证</li>
					<li class="subContent1">1.1、入驻商户基本条件：</li>

					<li class="subContent1">1.1.1、有良好的合作意愿，能保证合作的顺利进行；</li>
					<li class="subContent1">1.1.2、商户的类型(符合其中一个即可）：授权商；生产型厂商；经销商，代理商，B2C网站；专卖店；自营店等；</li>
					<li class="subContent1">1.1.3、商户应在签订本协议时向黄金管家提供(经黄金管家认可的)包括但不限于以下证明材料复印件：</li>
                    <p>(1) 营业执照(包括个体户营业执照)、税务登记证；</p>
                    <p>(2) 拥有注册商标或者品牌，或者拥有正规的品牌授权书。</p>

                    <li class="subContent1" style="margin-top:.4rem">1.2、您对本协议的所有内容已经充分理解。</li>
                    <li class="subContent1">1.3、您承诺为履行协议内容而向黄金管家提供的所有文件、资料、凭证和其他信息是准确、真实、完整和有效的，不存在任何虚假、误导或重大遗漏，如与事实不符，商户将承担由此引起的一切法律责任，对黄金管家造成的损失，黄金管家有向您主张赔偿的权利。</li>


					<li class="subTitle">2、商户责任</li>

					<li class="subContent1">2.1、您同意在办理黄金回收服务过程中，向黄金管家和／或授权的第三方机构提供商铺的营业执照（包括个体户营业执照）、税务登记证；负责人的个人身份证原件、黄金购买发票或销售凭证原件等资料，黄金管家及其授权的第三方机构将留存您的身份证复印件、黄金购买发票或销售凭证的复印件等资料作为备案。</li>
					<li class="subContent1">2.2、您需承诺对您所提供的实物黄金享有合法、完整的所有权（包括但不限于占有、使用、收益和处分的权利），并不受任何在先权利的限制。</li>

					<li class="subTitle">3、黄金回收</li>

					<li class="subContent1">3.1、实物黄金回收服务需要对您的身份证明、回收黄金的购买证明（包括但不限于销售发票、销售凭证、检测证书等）进行查验。</li>
					<li class="subContent1">3.2、您需同意自愿放弃该黄金的实物形态，理解并同意黄金管家及其授权的第三方机构对您所提供的黄金实物进行破坏性检测，您需理解并认可在检测过程中可能出现由于正常损耗导致黄金实物的重量减少而扣除相应的损耗，您需保证不会因为上述破坏性检测及/或可能出现的由于正常损耗导致黄金实物重量减少而向黄金管家提出任何权利主张。您需同意按照品类黄金折算AU9999品质黄金损耗标准对托管黄金扣除相应的损耗。</li>
					<li class="subContent1">3.3、您在回收实物黄金时由于需要检测，因此有在途及检测时间产生，在此期间您不享受利息及交易权利，以上期间简称为“冻结期”，冻结期结束时间以黄金克重充值到您账户的时间为准。在黄金回收期间，您不可撤销授权黄金管家在回收期间管理、运用回收黄金的权利，在回收期结束时，您不得向黄金管家要求提取原实物。</li>
					<li class="subContent1">3.4、回收期间，黄金管家应当按照法律、法规和有关规章的规定并本着最大善意管理、运用回收黄金，不得从事任何违法、违规活动。</li>
					<li class="subContent1">3.5、使用黄金管家回收服务时，您委托黄金管家在回收期间内对回收黄金进行存储和管理，如未勾选“直接变现”选项，则会在冻结期结束后将黄金克重存入黄金账户余额中，您认可并理解金价波动带来的影响。您可以通过黄金管家APP“我的-我的黄金”中查看黄金克重，也可以通过黄金管家直接兑换实物黄金。如果您在提交黄金回收订单时选择“直接变现”，将直接提现到银行卡（具体约定详见第3.9条）。</li>
					<li class="subContent1">3.6、您在提交黄金回收订单时看到的预估金价是根据实时金价、克重、数量、损耗、手续费等综合计算的预估参考价格，不代表最终克重、价格。黄金管家收到您的黄金后会进行专业检测，最终的实际黄金克重以实际检测结果为准。</li>
					<li class="subContent1">3.7、您的黄金回收订单在物流运输过程中出现毁损、丢失，调换等，您有权向物流公司和/或保险公司提出赔偿。黄金管家将本着最大善意为用户协调争取最大权益，黄金管家不承担由此引起的一切损失。</li>
					<li class="subContent1">3.8、黄金管家在签收到您的黄金回收订单后，会进行专业检测并进入冻结期，检测结束后会出具检测报告，您需在三个工作日内同意并确认检测报告的结果，在此期间您对检测报告的结果有任何异议可联系黄金管家客服电话处理，逾期未确认检测报告结果并未联系客服，您将默认同意并确认检测报告的结果。当检测结果与实际描述不符且与您协商未达成一致时，黄金管家将按照原地址退回您的回收黄金，期间产生的检测费、物流费、保价费等费用将由您承担，在物流运输过程中出现毁损、丢失、调换等情形的，黄金管家不承担责任。</li>
					<li class="subContent1">3.9、您在使用黄金管家的回收服务时选择“直接变现”，视为您授权并同意黄金管家将您的实际黄金克重以实时金价卖出并为您提现到银行卡，您认可并同意卖出的实际黄金克重所产生的手续费，您认可并同意按实时金价卖出带来的价格波动影响。黄金管家会在冻结期结束后将变现金额转账到您绑定的银行卡内，具体到账时间以银行为准。您的变现金额大于每日提现金额的上限50万元人民币时，则该超额订单全部金额将默认转入黄金管家账户余额中。</li>

					<li class="subTitle">4、双方权利义务</li>

					<li class="subContent1">4.1、商户的权利义务：</li>
					<li class="subContent1">4.1.1、在规定范围内，商户自行开拓市场与发展业务，不得以欺诈、胁迫等不正当手段损害客户或黄金管家的利益与声誉；</li>
					<li class="subContent1">4.1.2、商户妥善保管商铺管理员账号，如因商户自身保管、设置或使用不当造成的经济损失，由商户自行承担责任；</li>
					<li class="subContent1">4.1.3、若您发现有第三人冒用或盗用您的用户账户及密码，或其他任何未经合法授权的情形，应立即以有效方式通知黄金管家，要求黄金管家暂停相关服务，否则由此产生的一切责任由您本人承担。同时，您理解黄金管家对您要求暂停服务等处理请求采取行动需要合理期限，在此之前，黄金管家对第三人使用该服务所导致的损失不承担任何责任；</li>
					<li class="subContent1">4.1.4、商户保证其所有经营活动完全符合中国有关法律、法规、行政规章等的规定。如因商户违反上述规定给黄金管家带来任何损害，商户应承担所有法律责任并赔偿由此给黄金管家造成的损失；</li>
					<li class="subContent1">4.1.5、在协议有效期内，商户不得向与黄金管家构成商业竞争关系的个人、企业、商业机构或者组织等提供有关黄金管家的相关信息或者资料，否则对黄金管家造成损失的，由商户负责赔偿。</li>

                    <li class="subContent1">4.2、黄金管家的权利义务：</li>
					<li class="subContent1">4.2.1、黄金管家对商户提供必要的技术咨询；</li>
					<li class="subContent1">4.2.2、在本协议有效期限内，黄金管家有权根据市场情况对各种商户入驻条件进行调整。</li>


					<li class="subTitle">5、协议期限</li>

					<li class="subContent1">本协议有效期为一年，自签订之日起生效。有效期满后，双方可视合作情况续约。</li>

					<li class="subTitle">6、协议变更、解除、终止及违约责任</li>
					<li class="subContent1">6.1、双方应本着诚实信用的原则履行本协议。任何一方在履约过程中采用欺诈、胁迫或者暴力的手段，另一方均可以解除本协议并要求对方赔偿由此造成的损失；</li>
					<li class="subContent1">6.2、在协议执行期间，如果双方或一方认为需要终止，应提前一个月通知对方，双方在财务结算完毕、各自责任明确履行之后，方可终止协议。某方擅自终止本协议，给对方造成损失的，应赔偿对方损失；</li>
					<li class="subContent1">6.3、经双方协商达成一致，可以对本协议有关条款进行变更，但应当以书面形式确认；</li>
					<li class="subContent1">6.4、一方变更通讯地址或其它联系方式，应自变更之日起十日内，将变更后的地址、联系方式通知另一方，否则变更方应对此造成的一切后果承担责任；</li>
					<li class="subContent1">6.5、如因客观情况发生重大变化，致使本协议无法继续履行的，经双方协商同意，可以变更或者终止协议的履行；</li>
					<li class="subContent1">6.6、由于您违反本协议或任何法律、法规或侵害第三方的权利，而引起第三方对黄金管家提出的任何形式的索赔、权利主张或要求、诉讼，黄金管家有权向您追偿相关的直接损失或间接损失，包括但不限于黄金管家因此支付的法律服务等中介费用、名誉损失、及向第三方支付的补偿金、损害赔偿金等。</li>

					<li class="subTitle">7、保密条款</li>
					<li class="subContent1">7.1、双方所提供给对方的一切资料、技术和对项目的策划设计要严格保密，并只能在合作双方的业务范围内使用；</li>
					<li class="subContent1">7.2、双方均应对在合作过程中所知悉的对方的商业和技术秘密承担保密义务。保密条款不受本协议期限的限制。</li>

					<li class="subTitle">8、通知</li>

					<li class="subContent1">本协议项下的通知如以公示方式作出，一经在黄金管家网站、APP以及存金通网页公示即视为已经送达。除此之外，其他向您发布的具有专属性的通知将由黄金管家向您在注册时提供的电子邮箱，或在您的账户中为您设置的站内消息系统栏，或您在注册后在本网站绑定的手机发送，一经发送即视为已经送达。请您密切关注您的电子邮箱 、站内消息系统栏中的邮件、信息及手机中的短信信息。您同意黄金管家出于向您提供服务之目的，可以向您的电子邮箱、站内消息系统栏和手机发送有关通知或提醒；若您不愿意接收，请在黄金管家相应系统板块进行设置。但您同时同意并确认，若您设置了不接收有关通知或提醒，则您有可能无法收到该等通知信息，您不得以您未收到或未阅读该等通知信息主张相关通知未送达于您。</li>

                    <li class="subTitle">9、争议解决</li>

					<li class="subContent1">在本协议执行期间如果双方发生争议，双方应友好协商解决。如果协商不成，双方同意提交给北京市仲裁委员会进行仲裁，接受其仲裁规则，并服从该仲裁裁决，仲裁费由败诉方承担。争议的解决适用中华人民共和国法律、法规、条例和计算机行业惯例。</li>

					<li class="subTitle">10、其他</li>

					<li class="subContent1"> 黄金管家对本协议拥有最终的解释权。若本协议的部分条款被认定为无效或者无法实施时，本协议中的其他条款仍然有效。</li>
				</ul>
			</div>
		</div>
        <!-- 同意按钮 -->
        <!-- <div class="btn" @click="goStore()">我已阅读并同意该协议</div> -->
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'

    export default {
        data(){
            return{

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
            goStore(){
                this.$router.push({
                    path:'/storegold',
                    query:{
                        radioStatus:1
                    }
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
    .storeGold{
        padding-top:.88rem;
    }
    li{
    	list-style: none;
    }
	.content{
		/* margin-top:0.88rem; */
		background-color:#fff;
		padding:0 .35rem;
		color:#666666;
		font-size:.28rem;
		padding-bottom:.98rem;
	}
	p.title{
		height:1.28rem;
		line-height: 1.28rem;
		text-align: center;
		font-size:.4rem;
		position: relative;
		color:#000000;
        font-family:PingFangSC-Regular;
	}
	.start{
		margin-top:0.55rem;
	}
	.start p{
		text-indent: .48rem;
	}
	.subContent1{
		line-height:.5rem;
		margin-bottom:.49rem;
	}
	.bold{
		color:#333;
		font-weight: bold;
	}
	.subContent1 .miniLi{
		position: relative;
		padding-left:.6rem;
	}
	.subContent1 .miniLi:before{
		position: absolute;
		content:'';
		height:5px;
		width:5px;
		background-color: #000;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-o-border-radius: 50%;
		top:0.2rem;
		left:0.2rem;
	}
	.content .subTitle{
		height:.98rem;
		color:#000000;
		/* font-weight: bold; */
	}
	.thirdTitle{
		line-height:.48rem;
		text-indent:.55rem;
	}
	.middLine{
		position:absolute;
		width:.46rem;
		height:.05rem;
		background-color:#C09C60;
		top:1.3rem;
		left:50%;
		margin-left:-.23rem;
	}
    .btn{
        width: 100%;
        height: .98rem;
        line-height: .98rem;
        text-align: center;
        color: #fff;
        font-size: .34rem;
        background-color: #DDC899;
        position: fixed;
        bottom:0;
    }
</style>
