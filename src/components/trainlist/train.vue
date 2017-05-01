<template>
  <div class="trainDateInfo">

    <div class="TrainBox">
      <div class="depart flex1">
        <div class="bTime">{{traindata.fmtime}}</div> 
        <div class="dStation">{{traindata.fmcity}}</div>
      </div> 
      <div class="costTime flex1">
        <div class="trainNo">{{traindata.trainno}}</div>
        <div class="rightArrow"></div>
        <div class="cTime">{{traindata.usedtime}}</div>
      </div> <div class="arrive flex1">
        <div class="eTime">{{traindata.totime}}</div>
        <div class="aStation">{{traindata.tocity}}</div>
      </div> <div class="leastMoney flex1">
        <span class="adjust canRobTickets"><span class="money">{{this.getleast()}}</span>起</span>
      </div>
    </div>

    <div class="seats">
      <span class="seat" v-for="item in traindata.ticketstatus" v-if="item">{{item.cn}}({{item.seats}})</span> 
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  props: ['traindata'],
  data () {
    return {
      openseat: false,
    }
  },
  mounted () {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cTime {
    color: #999;
    margin-top: 7px;
  }
  .rightArrow {
    margin-left: -30px;
    top: 23px;
    left: 48%;
    position: absolute;
    background-size: 320px;
    background-image: url(//wx.40017.cn/touch/weixin/train/img/icon1-fs8-1216.png);
    width: 61px;
    height: 8px;
    background-position: -321px -143px;
 }
  .money{
    font-size: 20px; 
    font-style: normal; 
    font-weight: 500;
    color: rgb(255, 101, 64);
  }
  .trainDateInfo {
    margin: 5px;
    border-radius: 4px;
    box-shadow: 0 1px 1px 1px rgba(153,153,153,.2);
    -webkit-box-shadow: 0 1px 1px 1px rgba(153,153,153,.2);
  }
  .TrainBox {
    position: relative;
    font-size: 14px;
    background-color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 12px 0 10px 0;
    border-radius: 4px;
    box-shadow: 0 1px rgba(153,153,153,.2);
    -webkit-box-shadow: 0 1px rgba(153,153,153,.2);
  }
  .bTime, .eTime {
    font-size: 20px;
    color: #333;
  }
  .costTime {
    font-size: 12px;
    padding-top: 7px;
    position: relative;
  }
  .leastMoney {
    line-height: 51px;
    font-size: 12px;
    color: #999;
  }
  .seats {
    padding-left: 8px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background-color: #f9f9f9;
    color: #666;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .seat {
    margin-left: 8px;
    float: left;
  }
</style>
