<template>
  <div id="citylist">
    <div class="search">
      <input class='searchCity' v-model="searchmsg" placeholder="中文/拼音/首字母" @change="searchCity()">
      <span class="search-icon"></span>
      <span class="clear" @click="clearmsg()"><i>×</i></span>
      <span class="cancel" @click="backToHome()">取消</span>
    </div>
    <div class='city-item' v-for="(item, index) in cityList" @click="backToHome(item.Name)">{{item.Name}}</div>
  </div>
</template>

<script>
import router from '@/router'
var $ = window.$;
export default {
  name: 'city',
  data () {
      return {
        cityList: [],
        searchmsg: ''
      }
  },
  mounted () {
  },
  methods: {
    searchCity: function(){
      // this.axios({
      // url:'http://wx.17u.cn/traintest/GetCityListByLetter',
      // params: {
      //     allCity:0,
      //     letter:this.searchmsg
      // },
      // dataType: "JSONP",
      // headers:{'Access-Control-Allow-Origin': 'application/json','X-Requested-With':'XMLHttpRequest'},
      // timeout:20000
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      var _this = this
      $.ajax({
          url: "http://wx.17u.cn/traintest/GetCityListByLetter",
          type: 'GET',
          data:{
            allCity:0,
            letter:this.searchmsg
          },
          dataType: 'JSONP',
          success: function (data) {
            _this.cityList = data.TrainStation.StationList;
            _this.searchmsg = "";
          }
      });

    },
    clearmsg: function(){
      this.searchmsg = ""
    },
    backToHome: function(cName){
      if(cName){
        router.push({ name: 'index' , params: { type:this.$route.params.type,cName:cName}})
      }else
        router.push({ name: 'index'})
    }
  }
}
</script>

<style scoped>
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