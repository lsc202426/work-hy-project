<template>
	<div class="download">
		<div class="download_con">
			<div class="download_top">
				<div class="top_bg">
					<img src="../../assets/images/download/download_top_bg.png" alt="">
				</div>
				<div class="top_logo"></div>
				<div class="top_text">互易品牌管理APP</div>
			</div>
			<div class="download_content">
				<div class="download_code"></div>
				<div class="download_btn" @click="download($event)">点击安装</div>
				<p>或扫码下载APP</p>
			</div>
			<div class="download_bottom">广东互易网络知识产权有限公司 粤B2-20030109号</div>
		</div>
		<!-- 遮罩提示层 -->
		<div class="wx_wrapper" @click="hideTips()" v-show="showTips">
			<div class="wx_wrapper_bg"></div>
			<div class="wx_wrapper_con"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'download',
		data() {
			return {
				showTips:false
			}
		},
		created(){
			
		},
		methods: {
			download(even){
				let n=navigator.userAgent;
				let ua=n.toLowerCase();//获取判断用的对象
				//判断是否微信浏览器中打开
				if(ua.match(/MicroMessenger/i) == "micromessenger"){
					this.showTips=true;
				}
				
				if (n.indexOf('Android') > -1 || n.indexOf('Linux') > -1) {
			　　　　console.log("安卓手机");
			　　} else if (n.indexOf('iPhone') > -1|| u.indexOf('iPad') > -1) {
			　　　　console.log("苹果手机");
			　　} else{
					even.target.style.background='#d1d1d1';
				}
				// 	else if (n.indexOf('Windows Phone') > -1) {
				// 　　　　console.log("winphone手机");
				// 　　}  else if (n.indexOf('Google Phone') > -1) {
				// 　　　　console.log("谷歌手机");
				// 　　} 
			},
			hideTips(){
				this.showTips=false;
			}
		},
	}
</script>
