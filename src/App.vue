<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  name: 'app'
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font: 14px/1.5 Arial, \5b8b\4f53;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.flex1{
    -webkit-box-flex: 1;
    width: 0;
    flex: 1;
    text-align: center;
}
.flexBox{
    display: flex;
}
html{
    color: #2d2d2d;
    background: #f2f4f7;
    -webkit-text-size-adjust: 100%!important;
    -ms-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
.icon-train{
    background-size: 320px;
    background-image: url(//wx.40017.cn/touch/weixin/train/img/icon1-fs8-1216.png);
}
</style>
