<template>
  <div class="home">
    <div class="queryDate">{{date}}</div>
    <div class="flexBox">
      <div class="fromCity flex1">{{fromCity}}</div>
       <router-link v-bind:to="rlink"  class="search flex1">查询</router-link>
      <div class="toCity flex1">{{toCity}}</div>
    </div>
  </div>
</template>

<script>
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
    this.rlink = 'trainlist/' + this.fromCity + '/' + this.toCity + '/' + this.date
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
</style>
