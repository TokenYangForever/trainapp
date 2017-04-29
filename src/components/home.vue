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
      searhType:''
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
    }
  },
  components: {
    'citysearch':city
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
