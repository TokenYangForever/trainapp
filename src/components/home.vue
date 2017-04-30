<template>
  <div class="home">
    <div class="queryDate">{{date}}</div>
    <div class="flexBox">
      <div class="fromCity flex1" @click="getCity('from')">
        <p>出发站</p>
        <p class="cityname" :class="{ flytoright: clickChange }">{{fromCity}} </p>
      </div>
      <div class="tpic_change" @click="changeCity()"></div>
      <div class="toCity flex1" @click="getCity('to')">
        <p>到达站</p>
        <p class="cityname" :class="{ flytoleft: clickChange }">{{toCity}}</p>
      </div>
    </div>
    <div class="search" @click="searchClick()">查询</div>
    <citysearch v-if='showcity' :serchtype="searhType" @closeCity="closeCity"></citysearch>
  </div>
</template>

<script>
import router from '@/router'
import city from '@/components/getCity'

export default {
  name: 'home',
  data () {
    return {
      fromCity: '出发城市',
      date: '5月12日',
      toCity: '到达城市',
      showcity: false,
      searhType: '',
      clickChange: false
    }
  },
  mounted () {
    // let searhType = this.$route.params.type,
    //     searchCity = this.$route.params.cName;
    // if(searhType){
    //   searhType == 'from' ? this.fromCity =  searchCity : this.toCity = searchCity;
    // }
  },
  methods: {
    getCity: function(type){
      this.searhType = type;
      this.showcity = true;
    },
    closeCity: function(type,cname){
      if(type&&cname)
        type == "from" ? this.fromCity = cname:this.toCity = cname;
      
      this.showcity = false;
    },
    searchClick: function(){
      router.push({ name: 'trainlist',params: { from:this.fromCity,to:this.toCity,date:this.date}})
    },
    changeCity: function(){
      let _this = this;
      this.clickChange = true;
      setTimeout(function(){
        let temp = _this.fromCity;
        _this.fromCity = _this.toCity;
        _this.toCity = temp;
        _this.clickChange = false;
      },500)
    }
  },
  components: {
    'citysearch':city
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tpic_change {
    display: block;
    width: 34px;
    height: 34px;
    background-position: 284px -5px;
    background-image: url(//wx.40017.cn/touch/weixin/train/img/common/wxtrain_icon_01.png);
    background-size: 320px;
}
.search {
    background: #09bb07;
    color: #FFF;
    line-height: 44px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    font-size: 18px;
    margin: 10px 15px;
}
.queryDate {
    margin-bottom: 20px;
}
.home {
  margin-top: 60px;
}
.cityname {
  font-size: 24px;
  color: #333;
}
.flytoleft {
    -webkit-transition: all 0.5s ease-in-out 0s;
    -moz-transition: all 0.5s ease-in-out 0s;
    -ms-transition: all 0.5s ease-in-out 0s;
    transition: all 0.5s ease-in-out 0s;
    -webkit-transform: translateX(-120%);
    -moz-transform: translateX(-120%);
    -ms-transform: translateX(-120%);
    transform: translateX(-120%)
}
.flytoright {
    -webkit-transition: all 0.5s ease-in-out 0s;
    -moz-transition: all 0.5s ease-in-out 0s;
    -ms-transition: all 0.5s ease-in-out 0s;
    transition: all 0.5s ease-in-out 0s;
    -webkit-transform: translateX(120%);
    -moz-transform: translateX(120%);
    -ms-transform: translateX(120%);
    transform: translateX(120%)
}
</style>
