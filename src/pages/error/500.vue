<template>
    <div class="systemError">
        <div class="top-img">
            <img src="static/images/500.png" alt="">
        </div>
        <p>很抱歉...服务器出错了</p>
        <div class="btn" @click="$router.push('/index')">返回首页</div>
    </div>
</template>

<script>

</script>

<style scoped>
    .systemError{
        width: 100%;
        height: 100vh;
        padding:0 .6rem;
        padding-top:35%;
        text-align: center;
    }
    .top-img{
        width: 3.1rem;
        height: 1.3rem;
        margin:0 auto;
    }
    .top-img img{
        width:100%;
    }
    p{
        color: #999;
        font-size: .28rem;
        margin:.5rem 0 .7rem;
    }
    .btn{
        width: 3.26rem;
        height: .88rem;
        text-align:center;
        line-height: .88rem;
        font-size: .34rem;
        color: #fff;
        margin:0 auto;
        background-color: #DDC899;
        -moz-border-radius: .04rem; /* Firefox */
        -webkit-border-radius: .04rem; /* Safari 和 Chrome */
        border-radius: .04rem; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
    }
</style>
