<template>
	<div class="index">
		<div class="content_box containerView-main">
			<!-- 分享 -->
			<!-- <div class="share_icon" @click="share_tips=true"></div>
			<div class="share_con" v-if="share_tips">
				<div class="share_bg"></div>
				<div class="share_box">
					<div class="share_title">分享到<span class="icon_close" @click="share_tips=false"></span></div>
					<div class="share_box_c">
						<div @click="wxShareAppMessage()">
							<img src="../assets/images/index/icon_friend.png" alt="">
							<span>微信</span>
						</div>
						<div @click="wxShareTimeline()">
							<img src="../assets/images/index/icon_circle.png" alt="">
							<span>朋友圈</span>
						</div>
					</div>
				</div>
			</div> -->
			<!-- 轮播 -->
			<div class="banner">
				<mt-swipe :auto="3000">
					<mt-swipe-item v-for="(banner, index) in banners" :key="index">
						<img @click="goProduct(banner.action_value)" v-lazy="'http://oapi.huyi.cn:6180/' + banner.banner" style="width:100%;height:100%;"
						 alt="" />
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<!-- 产品icon -->
			<div class="product_icon">
				<div class="product_icon_box" v-for="(product, index) in products" :key="index" @click="goProduct(product.mark)">
					<div class="product_icon_i">
						<img v-lazy="'http://oapi.huyi.cn:6180/' + product.icon" alt="" />
						<!-- <img src="../assets/images/user/aboutUs_logo.png" alt="" /> -->
						<div class="product_icon_title">{{ product.name }}</div>
					</div>
				</div>
			</div>
			<!-- 产品 -->
			<div class="product">
				<div class="product_box" v-for="(product, index) in products" :key="index" @click="getAbout(product.name,product.mark,'3')">
					<div class="product_i">
						<div class="product_con">
							<div class="con_title">{{ product.name }}</div>
							<div class="con_txt">{{ product.desc }}</div>
							<!-- <div class="register">立即注册 ></div> -->
						</div>
						<img v-lazy="'http://oapi.huyi.cn:6180/' + product.head_img" alt="" />
					</div>
				</div>
			</div>
			<!-- 二维码 -->
			<!-- <div class="code">
				<div class="code_box">
					<div class="code_con" @click="code_in()">
						<img src="../assets/images/index/icon_code.png" alt="" />
						<span>Wechat二维码</span>
					</div>
					<transition name="fade" mode="out-in">
						<div class="code_open" v-if="code_show">
							<div class="code_bg">
								<img src="../assets/images/index/icon_code1.png" alt="" />
								<p>互易.商标</p>
							</div>
							<div class="code_bg">
								<img src="../assets/images/index/icon_code2.png" alt="" />
								<p>官方微信公众号</p>
							</div>
						</div>
					</transition>
				</div>
			</div> -->
			<!-- 服务机构 -->
			<div class="service">
				<!-- <div class="title">服务机构</div>
				<div class="service_con" v-for="(service, index) in services" :key="index">
					<div class="con_box">
						<p>{{ service.name }}</p>
						<p>{{ service.address }}</p>
						<p>电话：{{ service.phone }}</p>
					</div>
				</div> -->
				<div class="con_bottom">
					<img src="../assets/images/index/index_logo.png" alt="" />
					<div class="bottom_item">
                        <a href="http://huyi.cn/mob/index.php/Index/business">
							<span>关于互易</span>
                        </a>
						<i></i>
						<router-link to="/contact">
							<span>联系互易</span>
						</router-link>
						<i></i>
						<router-link to="/service">
							<span>服务网点</span>
						</router-link>
					</div>
				</div>
				<div class="service_con">
					<div class="con_box record">
						<p>{{ copyright }}</p>
						<p>{{ copyright_tech }}</p>
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
	} from 'mint-ui';
	import {
		Lazyload
	} from 'mint-ui';
	import wxapi from '@/assets/js/wxapi.js';
	export default {
		name: 'index',
		data() {
			return {
				banners: [],
				products: [],
				services: [],
				code_show: false, //二维码控制手柄
				wx_share: {}, //微信分享
				share_tips: false, //微信分享弹窗
				copyright: '', //备案说明
				copyright_tech: '', //备案号
			};
		},
		created() {
			sessionStorage.removeItem("formUrl");
			sessionStorage.removeItem("domain");
			sessionStorage.removeItem("fee_verify");
			sessionStorage.removeItem("subject");
			sessionStorage.removeItem("price");
			sessionStorage.removeItem("productid");
			sessionStorage.removeItem("product_type");
			sessionStorage.removeItem("all_price");
			sessionStorage.removeItem("product");
            sessionStorage.removeItem("year");
            sessionStorage.removeItem('tradeName');
            sessionStorage.removeItem('getProd');
            sessionStorage.removeItem('pageNum');
            sessionStorage.removeItem('mark');
            sessionStorage.removeItem('salesCode');

			this.init();
		},
		mounted() {
			//wxapi.wxRegister(this.wxRegCallback);
		},
		methods: {
			init() {
				let _this = this;
				let shareUrl = window.location.href;
				this.$axios
					.post('index.php?c=App&a=getIndex', {
						dpi_version: 'H5',
						shareUrl: shareUrl,
					})
					.then(function(response) {
						if (response.data.errcode == 0) {
							_this.banners = response.data.content.first_banner;
							_this.products = response.data.content.product;
							//_this.services = response.data.content.department;
							_this.wx_share = response.data.content.wx_share;
							_this.copyright = response.data.content.copyright;
							_this.copyright_tech = response.data.content.copyright_tech;
							wxapi.wxRegister(_this.wx_share.config, _this.wx_share.value);
							//_this.wxRegCallback();

							// //通过微信config接口注入配置
							//       wx.config({
							//           debug: false, // 默认为false  为true的时候是调试模式，会打印出日志
							//           appId: _this.wx_share.config.appId,
							//           timestamp: _this.wx_share.config.timestamp,
							//           nonceStr: _this.wx_share.config.nonceStr,
							//           signature: _this.wx_share.config.signature,
							//           jsApiList: [
							//               'checkJsApi',
							//               'onMenuShareTimeline',
							//               'onMenuShareAppMessage',
							//               'onMenuShareQQ',
							//               'onMenuShareWeibo'
							//           ]
							//       });
							//       //配置自定义分享内容
							//       window.share_config = {
							//           'share': {
							//               'imgUrl': _this.wx_share.value.imgUrl, // 这里是需要展示的图标
							//               'desc': _this.wx_share.value.desc, // 这是分享展示的摘要
							//               'title': _this.wx_share.value.title, // 这是分享展示卡片的标题
							//               'link': _this.wx_share.value.link, // 这里是分享的网址
							//               'success': function(rr) {
							//
							//               },
							//               'cancel': function(tt) {
							//
							//               }
							//           }
							//       };
							//       wx.ready(function() {
							//           wx.onMenuShareAppMessage(share_config.share); // 微信好友
							//           wx.onMenuShareTimeline(share_config.share); // 微信朋友圈
							//           wx.onMenuShareQQ(share_config.share); // QQ
							//       });
						}
					})
					.catch(function(error) {
						// Toast({
						// 	message: error.data.errmsg,
						// 	duration: 3000
						// });
					});
			},
			wxRegCallback() {
				// 用于微信JS-SDK回调
				this.wxShareTimeline();
				this.wxShareAppMessage();
			},
			wxShareTimeline() {
				let _this = this;
				// 微信自定义分享到朋友圈
				let option = {
					title: _this.wx_share.value.title, // 分享标题, 请自行替换
					link: _this.wx_share.value.link, // 分享链接，根据自身项目决定是否需要split
					imgUrl: _this.wx_share.value.imgUrl, // 分享图标, 请自行替换，需要绝对路径
					desc: _this.wx_share.value.desc, // 分享描述, 请自行替换
					success: () => {},
					error: () => {},
				};
				// 将配置注入通用方法
				wxapi.ShareTimeline(option);
			},
			wxShareAppMessage() {
				let _this = this;
				// 微信自定义分享给朋友
				let option = {
					title: _this.wx_share.value.title, // 分享标题, 请自行替换
					link: _this.wx_share.value.link, // 分享链接，根据自身项目决定是否需要split
					imgUrl: _this.wx_share.value.imgUrl, // 分享图标, 请自行替换，需要绝对路径
					desc: _this.wx_share.value.desc, // 分享描述, 请自行替换
					success: () => {},
					error: () => {},
				};
				// 将配置注入通用方法
				wxapi.ShareAppMessage(option);
			},

			code_in() {
				this.code_show = !this.code_show;
			},
			goProduct(mark) {
                
				if (mark) {
					switch (mark) {
						case 'tmd':
							this.$router.push({
								//跳转点商标
								path: '/productlist',
								query: {
									mark: mark,
								},
							});
							break;
						case 'dzp':
							this.$router.push({
								//跳转点招聘
								path: '/recruit',
								query: {
									mark: mark,
								},
							});
							break;
						case 'bs':
							this.$router.push({
								//跳转商标服务
								path: '/tradeService',
								query: {
									mark: mark,
								},
							});
							break;
						case 'domain':
							this.$router.push({
								//跳转域名服务
								path: '/domain',
								query: {
									mark: mark,
								},
							});
							break;
						case 'ecweb':
							this.$router.push({
								//跳转一站通
								path: '/oneStation',
								query: {
									mark: mark,
								},
							});
							break;
						case 'dct':
							this.$router.push({
								//跳转一站通
								path: '/restaurant',
								query: {
									mark: mark,
								},
							});
							break;
						default:
							this.$router.push({
								//跳转点商标
								path: '/',
								query: {
									mark: mark,
								},
							});
							break;
					}
				} else {
					return;
				}
            },
            getAbout(til,mark,num){
                this.$router.push({
                    path: '/aboutPro',
                    query:{
                        til: '关于'+til,
                        mark: mark,
                        txt_type: num
                    }
                })
            }
		},
	};
</script>
