<template>
  <div id="trainlist">
    <div>{{ $route.params.from }}</div>
    <div>{{ $route.params.to }}</div>
  </div>
</template>

<script>
export default {
  name: 'trainlist',
  data () {
      return {
        queryData: this.$route.params
      }
  },
  mounted () {
    this.axios({
      url:'http://wx.17u.cn/wxuniontraintest/trainapi/searchno.html',
      params: {
        para: {
          "from":this.queryData.from,
          "to":this.queryData.to,
          "oby":"0",
          "date":"2017-04-28",
          "platId":501,
          "requestType":4,
          "headct":1,
          "headus":1,
          "headver":"2.14.0.2",
          "isstu":false,
          "headtime":1493112975746,
          "OpenId":"oOCyauGWhshD9C0v9D1VXp9vy6aE",
          "MemberId":"aCmbppvo8AloGHUDB68fxg=="
        }
      },
      dataType: "jsonp",
      timeout:20000
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>
