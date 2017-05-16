<template>
  <div class="filter-footer flexBox">
      <div class="maskwrap" v-show="openfitter"></div>
      <div class="flex1" @click="ChangeByDtime()" :class="{greenword:byDtime}"> 
        <span class="wxTrainBg" :class="{greenTime:byDtime,grayTime:!byDtime}"></span>
        <p v-if="byDtime==2">出发时间从晚到早</p>
        <p v-else-if="byDtime==1">出发时间从早到晚</p>
        <p v-else>出发时间</p>
      </div>
      <div class="flex1" @click="ChangeByTakingtime()" :class="{greenword:byTakingtime}">
        <span class="wxTrainBg" :class="{greenTime:byTakingtime,grayTime:!byTakingtime}"></span>
        <p v-if="byTakingtime==2">耗时从长到短</p>
        <p v-else-if="byTakingtime==1">耗时从短到长</p>
        <p v-else>耗时</p>
      </div>
      <div class="flex1" @click="openFitter()" :class="{greenword:this.hasSelect()}">
        <span class="wxTrainBg" :class="{greenselect:this.hasSelect(),grayselect:!this.hasSelect()}">
        <em class="icon-train-two pichOnDraw" v-show="this.hasSelect()"></em></span>
        <p>筛选</p>
      </div>
      <transition name="slide-fade">
        <div class="filtbox"  v-show='openfitter'>
          <div class="filtertop">
          <div style="float:left" @click="clearSelect()">重置</div>
          筛选
          <div style="float:right" @click="confirmSelect()">确定</div>
          </div>
          <div class="filtercontBox">
          <div class="filtercont">

            <div class="filterContent">
              <p>车次类型</p>
              <div class="fitterItem" 
              v-for="(item, index) in f_condition[0]" 
              :key="index"
              @click="selectFItem(0,index)" 
              :class="{select: item}">
                {{index}}
              <em class="icon-train-two ensureDraw"></em>
              </div>
            </div>

            <div class="filterContent">
              <p>出发时段</p>
              <div class="fitterItem" 
              v-for="(item, index) in f_condition[1]" 
              :key="1+index"
              @click="selectFItem(1,index)" 
              :class="{select: item}">
                {{index}}
              <em class="icon-train-two ensureDraw"></em>
              </div>
            </div>

            <div class="filterContent">
              <p>到达时段</p>
              <div class="fitterItem" 
              v-for="(item, index) in f_condition[2]" 
              :key="2+index"
              @click="selectFItem(2,index)" 
              :class="{select: item}">
                {{index}}
              <em class="icon-train-two ensureDraw"></em>
              </div>
            </div>

            <div class="filterContent">
              <p>出发车站</p>
              <div class="fitterItem"
              v-for="(item, index) in f_condition[3]" 
              :key="index"
              @click="selectFItem(3,index)" 
              :class="{select: item}">
                {{index}}
                <em class="icon-train-two ensureDraw"></em>
              </div>
            </div>

            <div class="filterContent">
              <p>到达车站</p>
              <div class="fitterItem" 
              v-for="(item, index) in f_condition[4]" 
              :key="index"
              @click="selectFItem(4,index)" 
              :class="{select: item}">
                {{index}}
                <em class="icon-train-two ensureDraw"></em>
              </div>
            </div>

          </div>
          </div>
        </div>
      </transition>
  </div>
</template>

<script>

export default {
  name: 'fitter',
  props: ['traindataList','fmlist','tolist','backlist'],
  data () {
    var f_condition = [{
        "高铁(G/C)": false,
        "普通(K/T/Z)": false,
        "动车(D)": false,
        "其他(L/Y等)": false
      },{
        "00:00-06:00": false,
        "06:00-12:00": false,
        "12:00-18:00": false,
        "18:00-00:00": false
      },{
        "00:00-06:00": false,
        "06:00-12:00": false,
        "12:00-18:00": false,
        "18:00-00:00": false
      },{

      },{

      }];
    for(var i in this.fmlist){
      f_condition[3][this.fmlist[i].name] = false
    }
    for(var i in this.tolist){
      f_condition[4][this.tolist[i].name] = false
    }
    return {
      fitterData: [],
      byDtime: 0,
      byTakingtime: 0,
      f_condition: f_condition,
      openfitter: false
    }
  },
  mounted () {  
  },
  watch: {
    byDtime: function(){
      var byDtime = this.byDtime;
          this.fitterData = this.traindataList;
      if(byDtime){
        this.fitterData.sort(function(a,b){
          var result = byDtime == 1 ? a.fmtimeps - b.fmtimeps : b.fmtimeps - a.fmtimeps;
          return result;
        });
        this.fitterChange();
      }
    },
    byTakingtime: function(){
      var byTakingtime = this.byTakingtime;
          this.fitterData = this.traindataList;
      if(byTakingtime){
        this.fitterData.sort(function(a,b){
          var result = byTakingtime == 1 ? a.usedtimeps - b.usedtimeps : b.usedtimeps - a.usedtimeps;
          return result;
        });
        this.fitterChange();
      }
    }
  },
  methods: {
    openFitter: function(){
      this.openfitter = !this.openfitter;
    },
    confirmSelect: function(){
      this.openFitter();
      var newList = this.backlist,
          fitType = [],
          fitTotime = [],
          fitFromtime = [],
          fitFromstation = [],
          fitTostation = [],
          f_condition = this.f_condition;
      for(let i=0,Ckey = Object.keys(f_condition[0]); i<Ckey.length;i++){
        if(f_condition[0][Ckey[i]]){
          if(Ckey[i] == "高铁(G/C)"){
            fitType.push("GD");
          }else if(Ckey[i] == "普通(K/T/Z)"){
            fitType.push("KS","Z","PK","KT");
          }else if(Ckey[i] == "动车(D)"){
            fitType.push("D");
          }else{
            fitType.push("PK")
          }
        }
      }
      for(let i=0,Ckey = Object.keys(f_condition[1]); i<Ckey.length;i++){
        if(f_condition[1][Ckey[i]]){
          fitFromtime.push(Ckey[i].replace(/:/g,"").split('-'));     
        }
      }
      for(let i=0,Ckey = Object.keys(f_condition[2]); i<Ckey.length;i++){
        if(f_condition[2][Ckey[i]]){
          fitTotime.push(Ckey[i].replace(/:/g,"").split('-'));     
        }
      }
      for(let i=0,Ckey = Object.keys(f_condition[3]); i<Ckey.length;i++){
        if(f_condition[3][Ckey[i]]){
          fitFromstation.push(Ckey[i]);     
        }
      }
      for(let i=0,Ckey = Object.keys(f_condition[4]); i<Ckey.length;i++){
        if(f_condition[4][Ckey[i]]){
          fitTostation.push(Ckey[i]);     
        }
      }
      newList = this.fitterByType(newList,fitType,fitFromtime,fitTotime,fitFromstation,fitTostation)
      this.fitterData = newList;
      this.fitterChange();
    },
    fitterByType: function(trainlist,typeList,fromtimelist,totimeList,fitFromstation,fitTostation){
      var reList = [];
      for(let i in trainlist){
        if(typeList.length){
          if(!typeList.includes(trainlist[i].sort))
          continue;
        }
        if(totimeList.length){
          var toflag = false;
          for(let j=0;j<totimeList.length;j++){
            if(trainlist[i].totimeps>parseInt(totimeList[j][0])&&trainlist[i].totimeps<parseInt(totimeList[j][1])){
              toflag = true;
              break;
            }
          }
          if(!toflag)
            continue
        }
        if(fromtimelist.length){
          var toflag = false;
          for(let j=0;j<fromtimelist.length;j++){
            if(trainlist[i].fmtimeps>parseInt(fromtimelist[j][0])&&trainlist[i].fmtimeps<parseInt(fromtimelist[j][1])){
              toflag = true;
              break;
            }
          }
          if(!toflag)
            continue
        }
        if(fitFromstation.length){
          if(!fitFromstation.includes(trainlist[i].fmcity))
          continue;
        }
        if(fitTostation.length){
          if(!fitTostation.includes(trainlist[i].tocity))
          continue;
        }
        reList.push(trainlist[i]);
      }    
      return reList;
    },
    clearSelect: function(){
      for(var i = 0;i<this.f_condition.length;i++){
        for(var j in this.f_condition[i]){
          this.f_condition[i][j] = false;
        }
      }
    },
    hasSelect: function(){
      for(var i = 0;i<this.f_condition.length;i++){
        for(var j in this.f_condition[i]){
          if(this.f_condition[i][j])
            return true;
        }
      }
      return false;
    },
    selectFItem: function(index,key){
      this.f_condition[index][key] = !this.f_condition[index][key];
    },
    ChangeByDtime: function(){
      if(this.byDtime){
        this.byDtime = this.byDtime == 1 ? 2 :1;
      }else{
        this.byDtime = 1;
        this.byTakingtime = 0;
      }
    },
    ChangeByTakingtime: function(){
      if(this.byTakingtime){
        this.byTakingtime = this.byTakingtime == 1 ? 2 :1;
      }else{
        this.byTakingtime = 1;
        this.byDtime = 0;
      }
    },
    fitterChange: function(){
      this.$emit('trainlistChange',this.fitterData)
    },
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
  .pichOnDraw {
      width: 10px;
      height: 10px;
      background-position: -473px -111px;
      position: absolute;
      top: -3px;
      left: 18px;
  }
  .icon-train-two {
    background-size: 320px;
    background-image: url(//wx.40017.cn/touch/weixin/train/img/icon1-fs8-1216.png);
  }
  .fitterItem.select .ensureDraw{
    display: block;
  }
  .ensureDraw {
    display: none;
    width: 25px;
    height: 23px;
    position: absolute;
    background-position: -68px -257px;
    bottom: -2px;
    right: -9px;
    border-bottom-right-radius: 14px;
  }
  .filterContent p{
    text-align: left;
    color: #999;
    margin-left: 15px;
    line-height: 30px;
    font-size: 14px;
  }
  .fitterItem.select{
    color: #3C6;
  }
  .fitterItem.select:after {
    border: 1px solid #3C6;
  }
  .fitterItem:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 1px;
    border: 1px solid #BBB;
    border-radius: 6px;
  }
  .fitterItem{
    width: 42%;
    position: relative;
    margin-left: 15px;
    text-align: center;
    height: 33px;
    line-height: 33px;
    margin-bottom: 10px;
    display: inline-block;
    color: #666;
  }
  .filtercontBox {
    overflow-x: hidden;
    overflow-y: auto;
    height: 420px;
    -webkit-overflow-scrolling: touch;
  }
  .filtbox {
    width: 100%;
    height: auto;
    background: #fff;
    position: fixed;
    bottom: 0px;
    color: #2d2d2d;
    font-size: 15px;
    overflow: hidden;
    z-index: 100;
  }
  .filtertop {
    color: #fff;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
    text-align: center;
    background: #2e343b;
    border-bottom: 1px #cecece solid;
  }
  .greenword{
    position: relative;
    color: #3c6
  }
  .greenselect {
    background-position: -31.5px -268px;
  }
  .greenTime {
    background-position: -31.5px -246px;
  }
  .greenarrow {
    background-position: -31.5px -223px;
  }
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
