<template>
  <div class="home">
    <div class="queryDate" @click.stop="openCalendar($event,'picker1')"><h3>出发日期</h3><p>{{date}}</p></div>
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
<transition name="slide-fade">
    <calendar 
      v-show="showcalendar"
      @choosedate="chooseDate"
      :show.sync="calendar.show"
      :type="calendar.type"
      :value.sync="date" 
      :x="calendar.x" 
      :y="calendar.y" 
      :begin.sync="calendar.begin" 
      :end.sync="calendar.end" 
      :range.sync="calendar.range"
      :weeks="calendar.weeks"
      :months="calendar.months"
      :sep="calendar.sep">
    </calendar>
</transition>
  </div>
</template>

<script>
import city from '@/components/getCity'
import commonjs from '@/public/common'
import Router from '@/router'
import calendar from '@/components/public/calendar.vue'

var StorageHelp = commonjs.commonJs.StorageHelp;
export default {
  name: 'home',
  data () {
    return {
      fromCity: '',
      date: '2017-05-12',
      toCity: '',
      showcity: false,
      searhType: '',
      clickChange: false,
      // 数据绑定
      calendar:{
                show:false,
                x:0,
                y:0,
                picker:"date",
                type:"date",
                begin:new Date().format("yyyy-MM-dd"),
                end:new Date(new Date().getTime()+60*24*3600*1000).format("yyyy-MM-dd"),
                sep:"-",
                weeks:['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                range:false
      },
      showcalendar: false
    }
  },
  mounted () {
    this.fromCity = StorageHelp.GetSessionStorage("fromCity") || '请选择城市';
    this.toCity = StorageHelp.GetSessionStorage("toCity") || '请选择城市';
  },
  methods: {
    getCity: function(type){
      this.searhType = type;
      this.showcity = true;
    },
    closeCity: function(type,cname){
      if(type&&cname){
        if(type == "from"){
          this.fromCity = cname;     
          StorageHelp.SetSessionStorage("fromCity",cname);  
        }
        else{
          this.toCity = cname;
          StorageHelp.SetSessionStorage("toCity",cname);
        }
      }
      
      this.showcity = false;
    },
    searchClick: function(){
      Router.push({ name: 'trainlist',params: { from:this.fromCity,to:this.toCity,date:this.date,begin:this.calendar.begin,end:this.calendar.end}})
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
    },
    // 打开显示选择器
    openCalendar: function(e,type) {
      // 设置类型
      // this.calendar.picker=type
      // this.calendar.type=this.calendar.items[type].type
      // this.calendar.range=this.calendar.items[type].range
      // this.calendar.begin=this.calendar.items[type].begin
      // this.calendar.end=this.calendar.items[type].end
      // this.calendar.value=this.calendar.items[type].value
      // // 可不用写
      // this.calendar.sep=this.calendar.items[type].sep
      // this.calendar.weeks=this.calendar.items[type].weeks
      // this.calendar.months=this.calendar.items[type].months

      // this.calendar.show=true
      this.calendar.x=window.innerWidth/2 - 150;
      this.calendar.y=50;
      this.showcalendar = true;
    },
    chooseDate: function(date){
      var _this = this;
      this.date = new Date(date).format("yyyy-MM-dd");
      this.showcalendar = false;
    }
  },
  components: {
    'citysearch':city,
    'calendar':calendar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    padding-top: 60px;
    background-color: #fff;
  }
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
