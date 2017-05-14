<template>
  <div class="filter-footer flexBox">
      <div class="flex1">
        <span class="wxTrainBg grayarrow"></span>
        <p>出发时间从早到晚</p>
      </div>
      <div class="flex1">
        <span class="wxTrainBg grayTime"></span>
        <p>耗时</p>
      </div>
      <div class="flex1">
        <span class="wxTrainBg grayselect"></span>
        <p>筛选</p>
      </div>
  </div>
</template>

<script>

export default {
  name: 'fitter',
  props: ['traindataList'],
  data () {
    return {
      fitterData: this.traindataList,
         
    }
  },
  mounted () {
    console.log(this.fitterData)
  },
  methods: {
    getleast: function(){
      var tickets = this.traindata.ticketstatus,
          least = 9999,
          keys = [];
      for(let key in tickets){  
          let nticket = tickets[key];
          if(nticket&&nticket.price){
            least = nticket.price<least ? nticket.price : least;
          }
      }
      return least;
    },
    toggleseat: function(){
      if(this.isgorob || this.isnotegrab)
        return
      this.openseat = !this.openseat;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grayarrow {
    background-position: -8.5px -223px;
  }
  .grayTime {
    background-position: -8.5px -246px;
  }
  .grayselect {
    background-position: -8.5px -268px;
  }
  .wxTrainBg {
      position: relative;
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 2px;
      margin-bottom: -5px;
      background-image: url(//wx.40017.cn/touch/weixin/train/img/wxTrainBg.png);
      background-repeat: no-repeat;
      background-size: 190px 293px;
      -o-background-size: 190px 293px;
      -webkit-background-size: 190px 293px;
  }
  .filter-footer{
    width: 100%;
    line-height: 27px;
    font-size: 10px;
    color: #888;
    background-color: #2e343b;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    text-align: center;
  }
</style>
