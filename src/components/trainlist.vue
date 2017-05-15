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
      queryData: {}
    }
  },
  mounted () {
	this.queryData = $route.params;
	console.log(this.queryData);
  }
}
</script>
