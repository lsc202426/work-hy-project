<template>
	<div class="restaurant">
		<nav-header title="点餐厅" gobackurl="/restaurant"></nav-header>
		<div class="restaurant_box containerView-main">
			<div class="top">
				<div class="search">
					<input type="text" v-model="search_txt" placeholder="请输入品牌名">
					<span class="icon_search" @click.stop="search()">搜索</span>
				</div>
				<div class="src_item">
					<a href="">注册规则</a>
					<a href="">注册指南</a>
					<a href="">关于点餐厅</a>
					<a href="">案例</a>
				</div>
			</div>
			<div class="content">
				<div class="con_item" v-for="item in list" :key="item.id" v-if="isShow">
					<div class="item_top">
						<div class="title">品牌名.餐厅<!-- {{item.title}} --></div>
						<div class="con_txt">
							<p>{{item.summary}}</p>
						</div>
					</div>
					<div class="item_bottom">
						<span>注册费用</span>
						<span v-if="item.price">¥{{item.price.split(".")[0]}}元/1年</span>
					</div>
				</div>
				<div class="con_item" v-else @click.stop="goFill(product.domain,product.price)">
					<div class="item_top">
						<div class="title">
							{{product.domain}}.餐厅
							<span class="pro_refister" v-if="product.reg==1">可注册</span>
							<span class="pro_refister not" v-else>已注册</span>
						</div>
						<div class="con_txt">
							<p>{{item.summary}}</p>
						</div>
					</div>
					<div class="item_bottom">
						<span>注册费用</span>
						<span v-if="product.price">¥{{product.price.split(".")[0]}}元/1年</span>
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
		name:"restaurant",
		data() {
			return {
				mark: "",
				list: [],
				search_txt: "",
				isShow:true,
				product:{},
			}
		},
		created() {
			sessionStorage.removeItem("fee_verify");
			sessionStorage.removeItem("domain");
			sessionStorage.removeItem("price");
			this.init(); //初始化
		},
		methods: {
			//获取产品信息
			init() {
				this.mark = this.$route.query.mark;
				this.$axios
					.post("index.php?c=App&a=getProducts", {
						mark: this.mark
					})
					.then((response) => {
						if (response.data.errcode == 0) {
							this.list = response.data.content.list[0].list;
						} else {
							Toast({
								message: response.data.errmsg,
								duration: 1500
							});
						}
					})
			},
			// 验证输入内容格式
			sendSearchCheck: function sendSearchCheck() {
				if (this.search_txt.indexOf(' ') > -1) {
					Toast({
						message: "请不要用空格。",
						duration: 3000
					});
					// this.showHint = true;
					return false;
				}
				// 判断头部或尾部是否含有'-' S
				var hasStr = this.search_txt.slice(0, 1) == '-';
				var haslast = this.search_txt.slice(this.search_txt.length - 1, this.search_txt.length) == '-';
				if (hasStr || haslast) {
					Toast({
						message: "“-”不能放在开头或结尾。",
						duration: 3000
					});
					return false;
				}
				// 判断头部或尾部是否含有'-' E

				// 判断头是否含有特殊字符 S
				var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
					regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				if (regEn.test(this.search_txt) || regCn.test(this.search_txt)) {

					Toast({
						message: "请不要用特殊字符（如!、$、&等）。",
						duration: 3000
					});
					return false;
				}
				return true;
			},
			//搜索
			search() {
				if (this.search_txt == "") {
					Toast({
						message: "请输入品牌名",
						duration: 3000
					});
					return;
				}
				if (!this.sendSearchCheck()) {
					return;
				}
				this.$axios.post("index.php?c=App&a=searchDomain", {
					mark: "dct",
					domain: this.search_txt,
					st: 0
				})
				.then((response)=> {
					if (response.data.errcode == 0) {
						this.isShow=false;//显示查询结果
						this.product=response.data.content;
					} else {
						Toast({
							message: response.data.errmsg,
							duration: 3000
						});
					}
				})
			},
			//前往填写注册信息
			goFill(domain,price){
				sessionStorage.fee_verify=this.list.fee_verify;
				sessionStorage.domain=domain;
				sessionStorage.price=price;
				this.$router.push({
					path:"/restaurantFill"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.restaurant_box {
		font-family: PingFangHK-Medium;

		.top {
			position: fixed;
			top: 0.9rem;
			left: 0;
			padding: 0 0.32rem;
			width: 100%;

			.src_item {
				display: flex;
				margin-top: 0.45rem;
				margin-bottom: 0.3rem;

				a {
					color: #2C3852;
					font-size: 0.26rem;
					line-height: 0.26rem;
					flex: 1;
					border-right: 1px solid rgba(60, 60, 60, 0.2);
					text-align: center;
					font-family: PingFangHK-Light;

					&:last-child {
						border: none;
					}
				}
			}

			.search {
				box-shadow: 0px 0px 0.2rem 0px rgba(175, 175, 175, 0.5);
				border-radius: 0.58rem;
				height: 0.9rem;
				line-height: 0.9rem;
				margin-top: 0.32rem;
				padding: 0 0.44rem 0 0.44rem;
				display: flex;
				justify-content: space-between;

				.icon_search {
					font-size: 0.26rem;
					color: #999999;
					background: url(../../assets/images/common/icon-search.png) left center no-repeat;
					background-size: 0.4rem 0.4rem;
					padding-left: 0.5rem;
				}

				input {
					border: none;
					padding-left: 0.06rem;
					font-size: 0.3rem;
					flex: auto;
					color: #2C3852;

					&::-webkit-input-placeholder {
						/* WebKit browsers */
						color: #BFBFBF;
					}

					&:-moz-placeholder {
						/* Mozilla Firefox 4 to 18 */
						color: #BFBFBF;
					}

					&::-moz-placeholder {
						/* Mozilla Firefox 19+ */
						color: #BFBFBF;
					}

					&:-ms-input-placeholder {
						/* Internet Explorer 10+ */
						color: #BFBFBF;
					}
				}
			}
		}

		.content {
			margin-top: 2.24rem;
			border-top: 0.2rem #F2F2F2 solid;
			padding: 0 0.32rem;

			.con_item {
				margin-top: 0.36rem;
				border: 1px solid rgba(221, 222, 225, 1);
				padding: 0 0.44rem;

				.item_top {
					border-bottom: 1px solid #EDEDED;
					padding-bottom: 0.3rem;

					.title {
						color: #2E3A54;
						font-size: 0.34rem;
						font-family: PingFangHK-Medium;
						font-weight: 600;
						line-height: 0.48rem;
						margin-top: 0.36rem;
						position: relative;
						.pro_refister{
							background:#11C4AF;
							color:#ffffff;
							font-size: 0.2rem;
							line-height: 0.28rem;
							padding:0.06rem;
							border-radius: 0.04rem;
							display: inline-block;
							position:absolute;
							top:0.02rem;
							right:0;
						}
						.not{
							background: #FF5F5F;
						}
					}

					.con_txt {
						padding-top: 0.1rem;

						p {
							margin-top: 0.1rem;
							font-size: 0.24rem;
							line-height: 0.34rem;
							color: #6F7181;

							&::before {
								content: "";
								display: inline-block;
								width: 0.08rem;
								height: 0.08rem;
								border-radius: 0.04rem;
								background: #686D7F;
								margin-right: 0.12rem;
								vertical-align: middle;
							}
						}
					}

				}

				.item_bottom {
					display: flex;
					justify-content: space-between;
					padding: 0.4rem 0;

					span {
						color: #2C3852;
						font-size: 0.28rem;
						line-height: 0.4rem;
					}
				}
			}
		}
	}
</style>
