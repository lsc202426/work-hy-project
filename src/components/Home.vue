<template>
	<div class="home">
		<div class="content_box containerView-main">
			<!-- 轮播 -->
			<div class="banner">
				<mt-swipe :auto="3000">
					<mt-swipe-item v-for="(banner, index) in banners" :key="index">
						<img @click="goProduct(banner.action_value)" v-lazy="'http://oapi.huyi.cn:6180/' + banner.banner" style="width:100%;height:100%;"
						 alt="" />
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<!-- 产品 -->
			<div class="product">
				<div class="product_box" v-for="(product, index) in products" :key="index" @click="goProduct(product.mark)">
					<div class="product_i">
						<img v-lazy="'http://oapi.huyi.cn:6180/' + product.head_img" alt="" />
						<div class="con_title">{{ product.name }}</div>
					</div>
				</div>
			</div>
			<div class="product_line"></div>
			<!-- 联系我们 -->
			<div class="contact">
				<div class="contact_title">联系我们</div>
				<div class="contact_con">
					<div class="contact_con_box">
						<a href="tel:400-8886-888">
							<span class="box_left"></span>
							<span class="box_right">
								<p>售前咨询</p>
								<p class="gray">4008886888</p>
							</span>
						</a>
					</div>
					<div class="contact_con_box">
						<a href="javascript:void(0);" @click="goServiceList()">
							<span class="box_left"></span>
							<span class="box_right">
								<p>服务机构</p>
								<p class="gray">点击查询</p>
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
		<nav-botton></nav-botton>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui";
	import {
		Lazyload
	} from "mint-ui";
	import wxapi from '@/assets/js/wxapi.js';
	export default {
		name: "index",
		data() {
			return {
				banners: [],
				products: [],
				services: [],
				wx_share: {}, //微信分享
				share_tips:false,//微信分享弹窗
			};
		},
		created() {
			this.init();
		},
		mounted() {
			//wxapi.wxRegister(this.wxRegCallback);
			
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
							_this.banners = response.data.content.first_banner;
							_this.products = response.data.content.product;
							_this.services = response.data.content.department;
							_this.wx_share = response.data.content.wx_share;
							wxapi.wxRegister(_this.wx_share.config);
							_this.wxRegCallback();
						}
					})
					.catch(function(error) {
					});
			},
			wxRegCallback() {
				// 用于微信JS-SDK回调
				this.wxShareTimeline()
				this.wxShareAppMessage()
			},
			wxShareTimeline() {
				let _this = this;
				// 微信自定义分享到朋友圈
				let option = {
					title: _this.wx_share.value.title, // 分享标题, 请自行替换
					link: _this.wx_share.value.link, // 分享链接，根据自身项目决定是否需要split
					imgUrl:  _this.wx_share.value.imgUrl, // 分享图标, 请自行替换，需要绝对路径
					desc: _this.wx_share.value.desc, // 分享描述, 请自行替换
					success: () => {
						
					},
					error: () => {
						
					}
				}
				// 将配置注入通用方法
				wxapi.ShareTimeline(option)
			},
			wxShareAppMessage() {
				let _this = this;
				// 微信自定义分享给朋友
				let option = {
					title: _this.wx_share.value.title, // 分享标题, 请自行替换
					link: _this.wx_share.value.link, // 分享链接，根据自身项目决定是否需要split
					imgUrl:  _this.wx_share.value.imgUrl, // 分享图标, 请自行替换，需要绝对路径
					desc: _this.wx_share.value.desc, // 分享描述, 请自行替换
					success: () => {
						
					},
					error: () => {
						
					}
				}
				// 将配置注入通用方法
				wxapi.ShareAppMessage(option)
			},
			//跳转到服务机构
			goServiceList(){
				this.$router.push({
					path:'/service'
				})
			},
			goProduct(mark) {
				if (mark) {
					switch (mark) {
						case "tmd":
							this.$router.push({
								//跳转点商标
								path: "/productlist",
								query: {
									mark: mark
								}
							});
							break;
						case "dzp":
							this.$router.push({
								//跳转点招聘
								path: "/recruit",
								query: {
									mark: mark
								}
							});
							break;
						case "bs":
							this.$router.push({
								//跳转商标服务
								path: "/tradeService",
								query: {
									mark: mark
								}
							});
							break;
						case "domain":
							this.$router.push({
								//跳转域名服务
								path: "/domain",
								query: {
									mark: mark
								}
							});
							break;
						case "ecweb":
							this.$router.push({
								//跳转一站通
								path: "/oneStation",
								query: {
									mark: mark
								}
							});
							break;
						default:
							this.$router.push({
								//跳转点商标
								path: "/",
								query: {
									mark: mark
								}
							});
							break;
					}
				} else {
					return;
				}
			}
		}
	};
</script>
