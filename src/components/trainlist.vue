<template>
  <div id="trainlist">
    <div class="header flexBox">
      <div class="flex1 beforeday"><em class="pre-arrow icon-train"></em>前一天</div>
      <div class="flex1 choosedate">{{queryData.date}}</div>
      <div class="flex1 afterday">后一天<em class="arrownext icon-train"></em></div>
    </div>
    <div class="trainlist">
      <traindatainfo v-for="item in datatrainlist" :traindata="item"></traindatainfo>
    </div>
  </div>
</template>

<script>
import train from '@/components/trainlist/train'
export default {
  name: 'trainlist',
  data () {
      return {
        queryData: this.$route.params,
        datatrainlist: [],
        noresult: false
      }
  },
  mounted () {
    let _this = this,
        ajaxdata = {
          "from":_this.queryData.from,
          "to":_this.queryData.to,
          "oby":"0",
          "date":"2017-05-20",
          "platId":501,
          "requestType":4,
          "headct":1,
          "headus":1,
          "headver":"2.14.0.2",
          "isstu":false,
          "headtime":1493112975746,
          "OpenId":"oOCyauGWhshD9C0v9D1VXp9vy6aE",
          "MemberId":"aCmbppvo8AloGHUDB68fxg=="
        };
    window.$.ajax({
      url:'http://wx.17u.cn/wxuniontraintest/trainapi/searchno.html',
      type: 'GET',
      data:{
        para:JSON.stringify(ajaxdata) 
      },
      timeout:  20000,
      dataType: 'JSON',
      success: function (data) {
        if(data&&data.status == 200){
          data = data.data;
          if(data.trainlist&&data.trainlist.length>0){
            _this.datatrainlist = data.trainlist;
          }else{
            _this.noresult = true;
          }
        }
      }
    });
  },
  components: {
    'traindatainfo':train
  }
  
}
</script>
<style scoped>
  .beforeday{
    text-align: left;
  }
  .afterday{
    text-align: right;
  }
  .header{
    line-height: 24px;
    border-bottom: 1px solid #dcdcdc;
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: auto;
    padding: 12px;
    color: #3C6;
  }
  .arrownext {
    width: 14px;
    height: 14px;
    background-position: -335px -2px;
    display: inline-block;
    vertical-align: 0;
  }
  .pre-arrow {
    width: 14px;
    height: 14px;
    background-position: -324px -2px;
    display: inline-block;
    margin-right: 4px;
  }
  .trainlist{
    margin-top: 55px;
  }
</style>