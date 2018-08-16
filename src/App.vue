<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.mint-msgbox-wrapper>.mint-msgbox{
    width:5rem;
    border-radius: 0;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    font-size: .26rem;
}
.mint-msgbox-wrapper .mint-msgbox-confirm, .mint-msgbox .mint-msgbox-btns .mint-msgbox-cancel{
    color:#C09C60;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    text-align: left;
}
.mint-msgbox-wrapper .mint-msgbox-message{
    padding:.1rem .2rem;
}
.mint-msgbox-cancel{
    border-right:1px solid #eee;
}
</style>
