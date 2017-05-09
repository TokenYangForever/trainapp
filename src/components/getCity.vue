<template>
<transition name="slide-fade">
  <div id="citylist">
    <div class="search">
      <input class='searchCity' v-model="searchmsg" placeholder="中文/拼音/首字母" @input="searchCity()">
      <span class="search-icon"></span>
      <span class="clear" @click="clearmsg()"><i>×</i></span>
      <span class="cancel" @click="backToHome()">取消</span>
    </div>
    <!-- <div class="loadingwrap">
      <vue-loading type="spiningDubbles" color="rgb(90, 193, 221)" :size="{ width: '100px', height: '100px'}" v-show="showloading"></vue-loading  > 
    </div> -->
    <transition-group  
    name="staggered-fade"
    tag="div"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
      <div class="noresult" v-if="noresult" :key="noresult">对不起，找不到{{this.searchmsg}}</div>
      <div class='city-item' v-else v-for="(item, index) in cityList" @click="backToHome(item.Name)" :key="item.QPY">{{item.Name}}</div>
    </transition-group>
  </div>
</transition>
</template>
<script>
import router from '@/router'
import vueLoading from 'vue-loading-template'
const $ = window.$;
const Velocity = $.Velocity;
export default {
  name: 'citycom',
  props: ['serchtype'],
  data () {
      return {
        cityList: [],
        searchmsg: '',
        noresult: false,
        showloading: false
      }
  },
  mounted () {
  },
  updated (){
    //this.showloading = false;
  },
  methods: {
    searchCity: function(){
      let _this = this;
      _this.showloading = true;
      if(this.searchmsg){
        $.ajax({
          url: "http://wx.17u.cn/traintest/GetCityListByLetter",
          type: 'GET',
          data:{
            allCity:0,
            letter:_this.searchmsg
          },
          dataType: 'JSONP',
          success: function (data) {
            _this.showloading = false;
            if(data.State == 100){
              _this.cityList = data.TrainStation.StationList;
              _this.noresult = false;
              //_this.searchmsg = ""; 
            }else{
              //请求无结果
              _this.cityList = [];
              _this.noresult = true;
            }
          }
        });
      }else{
        //请求无结果
        _this.cityList = [];
        _this.noresult = false;
      }
    },
    clearmsg: function(){
      this.searchmsg = "";
      this.cityList = [];
      this.noresult = false;
    },
    backToHome: function(cName){
      if(cName){
        this.$emit('closeCity',this.serchtype,cName)
      }else
        this.$emit('closeCity')
    },
    //动画方法start
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '44px' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
    //Velocity end
  },
  components: {
    'vueLoading':vueLoading
  },
}
</script>

<style scoped>
  
  #citylist{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    z-index: 10;
  }
  .city-item {
      background: #eee;
      border-bottom: 1px solid #dcdcdc;
      height: 44px;
      padding: 0 20px;
      line-height: 44px;
      position: relative;
  }
  .search {
    padding: 8px 65px 8px 8px;
    background-color: #ccc;
    position: relative;
  }
  .search input {
    display: block;
    width: 100%;
    height: 40px;
    padding-left: 36px;
    border-radius: 5px;
    border: 0;
    box-sizing: border-box;
    font-size: 14px;
  }
  .search .search-icon {
    position: absolute;
    left: 18px;
    top: 20px;
    width: 12px;
    height: 12px;
    border: 1px solid #999;
    border-radius: 50%;
  }
  .search .search-icon:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 8px;
    left: 13px;
    top: 10px;
    background: #999;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .search .clear {
    position: absolute;
    right: 65px;
    top: 8px;
    height: 20px;
    padding: 10px;
  }
  .search .clear i {
      display: block;
      width: 21px;
      height: 21px;
      background: #ccc;
      border-radius: 50%;
      line-height: 20px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      font-style: normal;
  }
  .search .cancel {
      position: absolute;
      width: 65px;
      height: 40px;
      top: 8px;
      right: 0;
      text-align: center;
      font-size: 18px;
      line-height: 40px;
  }
</style>