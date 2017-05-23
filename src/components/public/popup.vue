<template>
	<div class="popbg">
		<div class="popwrap">
			<div class="msg-content">
				{{content}}
			</div>
			<div class="bottom-btn">
				<button class="doublebtn">{{btn1}}</button>
				<button class="doublebtn">{{btn2}}</button>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:"popwrap",
	props: ['pcontent','pbtnname1','pbtnname2'],
	data () {
    return {
      content:this.pcontent,
      btn1:this.pbtnname1,
      btn2:this.pbtnname2
    }
  },
}
</script>
<style>
	.popbg {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
	}
	.msg-content {
	    word-break: break-all;
	    padding: 25px 8px;
	    text-align: center;
	    font-size: 14px;
	    color: #333;
	    line-height: 21px;
	    margin: 0 7px;
	}
	.popwrap {
		background: none repeat scroll 0 0 #FFF;
    	border-radius: 5px;
    	box-shadow: 0 0 5px #333;
    	box-sizing: border-box;
    	margin: 0 8%;
    	position: fixed;
    	width: 84%;
    	z-index: 99999;
    	top: 50%;
    	transform: translate3d(0, -65%, 0);
    	-webkit-transform: translate3d(0, -65%, 0);
    	display: block;
	}
	.bottom-btn{
		text-align: center;
    	border-top: 1px solid #EFEFF4;
	}
	.doublebtn{
	    width: 50%;
	    display: inline-block;
	    background: #EFEFF4;
	    color: #3C6;
	}
</style>