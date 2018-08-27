<template>
    <div class="confirminfo">
        <!-- 头部标题部分 -->
        <head-top headTitle='核对资质信息' class="head-top nomal-font" ref="topHead">
            <img slot='head_goback' src='static/images/back.png' class="head_goback" @click="$router.go(-1)">
        </head-top>
        <!-- header -->
        <header class="header">
            <img src="static/images/tip.png" alt="">
            <p>资质信息提交后将无法修改</p>
        </header>
        <!-- ms -->
        <section class="msbody">
            <div class="inputms">
                <span class="left_name">公司名称</span>
                <input type="text" v-model="ms.companyName" placeholder="请输入公司名称">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">营业执照号</span>
                <input type="text" v-model="ms.businessLicenseCode" placeholder="请输入营业执照号">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">营业期限</span>
                <input id="start_date" type="text" v-model="ms.businessLicenseBeginDate" readonly="true" @click="startpicker" placeholder="营业开始时间">
                <span id="middle">至</span>
                <input id="end_date" type="text" v-model="ms.businessLicenseEndDate" readonly="true" @click="endpicker" placeholder="营业结束时间">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">法人姓名</span>
                <input type="text" v-model="ms.personName" placeholder="请输入法人姓名">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">法人身份证号</span>
                <input type="text" v-model="ms.personCode" placeholder="请输入法人身份证号">
            </div>
            <div class="line" style="width: 100%;"></div>
                <div class="inputms">
                <span class="left_name">证件有效期</span>
                <input type="text" v-model="ms.personCardEndDate" readonly="true" @click="terms" placeholder="请输入证件有效期">
            </div>
        </section>
        <!-- button -->
        <div class="button">
            <section @click="submit()">确认无误</section>
        </div>
        <!-- 时间选取框(开始时间) -->
        <mt-datetime-picker @click="startpicker" ref="picker" type="date" :startDate="new Date('1990-01-01')" @confirm="handleConfirm">
        </mt-datetime-picker>
        <!-- 时间选取框(结束时间) -->
        <mt-datetime-picker @click="endpicker" ref="picker2" type="date" :startDate="new Date('2018-01-01')" :endDate="new Date('2050-01-01')"  @confirm="handleConfirm2">
        </mt-datetime-picker>
        <!-- 时间选取框(身份证有效期) -->
        <mt-datetime-picker @click="terms" ref="picker3" type="date" :startDate="new Date('2019-01-01')" :endDate="new Date('2050-01-01')"  @confirm="handleConfirm3">
        </mt-datetime-picker>
    </div>
</template>

<script>
import headTop from '@/components/header/head.vue'
import {business_qualification} from '@/service/getData.js'
import {DatetimePicker,Toast} from 'mint-ui'
import {formatDate,curentTime,isEmptyObject,setStore} from '@/config/mUtils.js'
import {merchant_open_apply} from '@/service/getData.js'
export default {
    data(){
        return{
            ms:{
                companyName: '',
                businessLicenseCode: "",
                businessLicenseBeginDate: curentTime(),//营业期限开始时间
                businessLicenseEndDate: curentTime(),//营业期限结束时间
                personName: "",
                personCode: "",
                personCardEndDate: "",
            }
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
        //获取营业资质
        async business_qc(){
            const res = await business_qualification();
            //未获取营业资质
            let isobj = isEmptyObject(res.data);
            if(res.code=='100001'){
                return
            }else if(res.code=='000000'&&!isobj){
                this.ms = res.data
            }
        },
        //打开开始时间选取框
        startpicker(val){
            this.$refs.picker.open();
        },
        //打开结束时间选取框
        endpicker(){
            this.$refs.picker2.open();
        },
        terms(){
            this.$refs.picker3.open();
        },
        //确定选取的开始时间
        handleConfirm(val){
            var sta = new Date(val);
            var formasta = formatDate(sta,'yyyy-MM-dd');
            this.ms.businessLicenseBeginDate=formasta;
        },
        //确定选取的开始时间
        handleConfirm2(val){
            var sta = new Date(val);
            var formasta = formatDate(sta,'yyyy-MM-dd');
            this.ms.businessLicenseEndDate=formasta;
        },
        //身份证期限
        handleConfirm3(val){
            var sta = new Date(val);
            var formasta = formatDate(sta,'yyyy-MM-dd');
            this.ms.personCardEndDate=formasta;
        },
        async submit(){
            let arr = this.ms.personCode.split(' ');
            var ss = '';
            arr.forEach(item => {
                ss = ss + item
            });
            this.ms.personCode=ss
            const res = await merchant_open_apply(this.ms.companyName,this.ms.businessLicenseCode,this.ms.businessLicenseBeginDate,this.ms.businessLicenseEndDate,this.ms.personName,this.ms.personCode,this.ms.personCardEndDate);
            if(res.code=='000000'){
                 setStore('qc_imgobj','','session');
                this.$router.push('/applicationresults');
            }else{
                setStore('qc_imgobj','','session');
                Toast({
                    message: res.message,
                    position: 'bottom',
                    duration: 3000
                })
            }
        }
    },
    created(){

    },
    mounted(){
        //获取营业资质
       this.business_qc();
    },
}
</script>

<style scoped lang="scss">
@import '../../sass/mixin';
.confirminfo{
    padding-top: .88rem;
    min-height: 100vh;
    background-color: #f8f8f8;
}
.header{
    width: 100%;
    height: .98rem;
    background-color: #ece8df;
    padding-top: .34rem;
    padding-left: .4rem;
}
.header img{
    width: .24rem;
    height: .24rem;
    float: left;
    margin-top: .05rem;
    margin-right: .08rem;
}
.header p{
    font-size: .22rem;
    color: #C09C60;
    float: left;
}
.msbody{
    width: 100%;
    padding: 0 .4rem 0 .4rem;
    background: #fff;
}
.inputms{
    width: 100%;
    height: 1.1rem;
    color: #333;
    font-size: .28rem;
    // border: 1px solid red;
}
.left_name{
    float: left;
    width: 1.85rem;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: left;
}
.inputms input{
    float: left;
    margin-top: .35rem;
    width: 60%;
    font-size: .28rem;
    color: #666666;
}
.button{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: .5rem;
    position: fixed;
    bottom: .4rem;
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
#start_date,#end_date{
    float: left;
    width: 26%;
}
#middle{
    width: 10%;
    float: left;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
}
#end_date{
    padding-left: .09rem;
}
</style>
<style lang="css">
.mint-datetime-action{
    color: #666666;
}
</style>
