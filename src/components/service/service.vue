<template>
	<div class="index service_box">
		<nav-header title="服务机构"></nav-header>
		<div class="content_box containerView-main">
			<!-- 服务机构 -->
			<div class="service">
				<div class="title">服务机构</div>
				<div class="service_con" v-for="(service, index) in services" :key="index">
					<div class="con_box">
						<p>{{ service.name }}</p>
						<p>{{ service.address }}</p>
						<p>电话：{{ service.phone }}</p>
					</div>
				</div>
				<div class="service_con">
					<div class="been-bot">
						<i class="been-left"></i>
						<span>已到底部</span>
						<i class="been-right"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui";
	export default {
		name: "index",
		data() {
			return {
				services: []
			};
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				let _this = this;
				this.$axios
					.post("index.php?c=App&a=getIndex", {
						dpi_version: "H5"
					})
					.then(function(response) {
						if (response.data.errcode == 0) {
							_this.services = response.data.content.department;
						}
					})
					.catch(function(error) {

						// Toast({
						// 	message: error.data.errmsg,
						// 	duration: 3000
						// });
					});
			}
		}
	};
</script>
