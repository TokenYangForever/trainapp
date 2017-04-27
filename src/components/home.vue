<template>
  <div class="home">
    <div class="queryDate">{{date}}</div>
    <div class="flexBox">
      <div class="fromCity flex1" @click="getCity('from')">
        <p>出发站</p>
        <p>{{fromCity}}</p>
      </div>
       <div class="search flex1" @click="searchClick()">查询</div>
      <div class="toCity flex1" @click="getCity('to')">
        <p>到达站</p>
        <p>{{toCity}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'home',
  data () {
    return {
      fromCity: '平凉',
      date: '5月12日',
      toCity: '平凉南',
      rlink: ''
    }
  },
  mounted () {
    let searhType = this.$route.params.type,
        searchCity = this.$route.params.cName;
    if(searhType){
      searhType == 'from' ? this.fromCity =  searchCity : this.toCity = searchCity;
    }
  },
  methods: {
    getCity:function(type){
      router.push({ name: 'getcity',params:{type:type}})
    },
    searchClick:function(){
      router.push({ name: 'trainlist',params: { from:this.fromCity,to:this.toCity,date:this.date}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
    background: #09bb07;
    color: #FFF;
    line-height: 44px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    font-size: 18px;
}
.queryDate{
    margin-bottom: 20px;
}
.home{
  margin-top: 60px;
}
</style>
