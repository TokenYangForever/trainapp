<template>
  <div id="trainlist">
    <div class="header flexBox">
      <div class="flex1 beforeday" @click="dateChange('beforeday')"><em class="pre-arrow icon-train"></em>前一天</div>
      <div class="flex1 choosedate">{{queryDate}}</div>
      <div class="flex1 afterday" @click="dateChange('next')">后一天<em class="arrownext icon-train"></em></div>
    </div>
    <div class="trainlist">
      <div class="loadingwrap">
        <vue-loading type="spiningDubbles" color="rgb(90, 193, 221)" :size="{ width: '100px', height: '100px'}" v-show="showloading"  ></vue-loading>
      </div> 
      <traindatainfo v-for="item in datatrainlist" :traindata="item" :key="item.id"></traindatainfo>
    </div>
  </div>
</template>

<script>
import train from '@/components/trainlist/train'
import vueLoading from 'vue-loading-template'

export default {
  name: 'trainlist',
  data () {
      return {
        queryData: this.$route.params,
        queryDate: this.$route.params.date,
        datatrainlist: [],
        noresult: false,
        showloading: true
      }
  },
  mounted () {
    this.getAjax();
  },
  watch: {
    queryDate: function(){
      return this.getAjax()
    }
  },
  updated () {
    
  },
  methods:{
    dateChange:function(type){
      if(type=="next")
        this.queryDate = new Date(new Date(this.queryDate).getTime()+24*3600*1000).format('yyyy-MM-dd');
      else
        this.queryDate = new Date(new Date(this.queryDate).getTime()-24*3600*1000).format('yyyy-MM-dd');
    },
    getAjax: function(){
      let _this = this,
          ajaxdata = {
          "from":_this.queryData.from,
          "to":_this.queryData.to,
          "oby":"0",
          "date":this.queryDate,
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
        beforeSend: function(){
          _this.showloading = true;
        },
        success: function (data) {
          if(data&&data.status == 200){
            data = data.data;
            if(data.trainlist&&data.trainlist.length>0){
              _this.datatrainlist = data.trainlist;
            }else{
              _this.noresult = true;
            }
          }
        },
        complete: function(){
          _this.showloading = false;
        }
      });
    }
  },
  components: {
    'traindatainfo':train,
    'vueLoading':vueLoading
  }
  
}
</script>
<style scoped>
  .loadingwrap{
    position: fixed;
    left: 50%;
    z-index: 10;
    margin-left: -50px;
  }
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