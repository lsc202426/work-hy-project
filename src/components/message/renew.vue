<template>
	<div class="renew">
		<nav-header title="续费"></nav-header>
		
		<div class="renew_box containerView-main" v-if="renew_box">
			<div class="renew_top pd_common">
				<div class="renew_title">{{renews.title}}</div>
				<div class="renew_msg" v-if="renews.renew==1">{{renews.renew_msg}}</div>
			</div>
			<div class="renew_con">
				<div class="renew_item pd_common" v-for="(item,index) in renews.list" :key="index">
					<div class="renew_item_top">
						<div class="item_top_left">
							<span class="left_title" :class="{
										orange: item.mark == 'dzp',
										blue: item.mark == 'bs',
										purple: item.mark == 'domain',
										green: item.mark == 'ecweb'
									}">{{item.name}}</span>
							<span class="left_tips">{{item.tips}}</span>
						</div>
						<div class="item_top_right" v-if="renews.renew==0">
							<label for="" class="top_right_lab" @click="checkAll(index,item.list)" :class="{ active: item.allCheck }">全选<input type="checkbox"></label>
						</div>
					</div>
					<div class="renew_item_explain">
						<span>注册词</span>
						<span>到期日期</span>
					</div>
					<div class="renew_item_list">
						<div class="item_list_box" v-for="list in item.list" :key="list.id">
							<div class="item_list_left">{{list.keyword}}</div>
							<div class="item_list_right">
								<span>{{list.reg_end_date.split(' ')[0]}}</span>
								<label for="" class="list_right_lab" :class="{ active: checkList.indexOf(list.keyword) >= 0 }" v-if="renews.renew==0">
									<input type="checkbox" :checked="checkList.indexOf(list.keyword) >= 0" @click="checkItem(list.keyword,item.list,index)">
								</label>
							</div>
						</div>
					</div>
					<div class="look_more" @click="lookMore(item.mark)" v-if="item.total>item.count">查看全部</div>
				</div>
			</div>
			<div class="renew_gen_orders pd_common" v-if="renews.renew==0">
				<div class="gen_orders_btn" @click="genOrders()">生成续费订单</div>
			</div>
		</div>
		<!-- 暂无数据 -->
		<blankPage v-else></blankPage>
		<!-- 查看全部 -->
		<transition name="fade" mode="out-in">
			<div class="more_box" v-if="more">
				<div class="more_box_bg"></div>
				<div class="more_box_con">
					<div class="renew_con">
						<div class="renew_item pd_common" v-for="(item,index) in renews.list" :key="index" v-if="item.name==moreTxt">
							<div class="renew_item_top">
								<div class="item_top_left">
									<span class="left_title" :class="{
										orange: item.mark == 'dzp',
										blue: item.mark == 'bs',
										purple: item.mark == 'domain',
										green: item.mark == 'ecweb'
									}">{{item.name}}</span>
									<span class="left_tips">{{item.tips}}</span>
								</div>
								<div class="item_top_right" v-if="renews.renew==0">
									<label for="" class="top_right_lab" @click="checkAll(index,moreList)" :class="{ active: item.allCheck }">全选<input type="checkbox"></label>
								</div>
							</div>
							<div class="renew_item_explain">
								<span>注册词</span>
								<span>到期日期</span>
							</div>
							<div class="renew_item_list">
								<div class="item_list_box" v-for="list in moreList" :key="list.id">
									<div class="item_list_left">{{list.keyword}}</div>
									<div class="item_list_right">
										<span>{{list.reg_end_date.split(' ')[0]}}</span>
										<label for="" class="list_right_lab" :class="{ active: checkList.indexOf(list.keyword) >= 0 }" v-if="renews.renew==0">
											<input type="checkbox" :checked="checkList.indexOf(list.keyword) >= 0" @click="checkItem(list.keyword,list,index)">
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="more_close" @click="moreClose()">确定</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import blankPage from "@/components/order/blankPage.vue";
	import {
		Toast
	} from "mint-ui";
	export default {
		data() {
			return {
				renew_box:false,//内容
				renews: {}, //续费数据
				checkList: [], //选中词组
				allCheck: false, //是否全选
				more:false,//查看全部
				moreList:[],//查看全部内容
				moreTxt:'',//查看的标题
			};
		},
		created() {
			this.init();
		},
		components: {
		  blankPage
		},
		methods: {
			init() {
				let _this = this;
				let id = localStorage.msgId;
				this.$axios
					.post("index.php?c=App&a=getRenew", {
						msid: id
					})
					.then(function(response) {
						if (response.data.errcode == 0) {
							_this.renew_box=true;
							_this.renews = response.data.content;
						}else{
							_this.renew_box=false;
						}
						// Toast({
						// 	message: 'haha',
						// 	duration: 3000
						// });
					})
			},
			//单个选中
			checkItem(keyword, list, index) {
				let _this = this;
				let idIndex = this.checkList.indexOf(keyword);
				//单个选中
				if (idIndex >= 0) {
					//判断id串中是否已经包含
					//如果包含，则去除
					this.checkList.splice(idIndex, 1);
				} else {
					//没有包含，添加
					this.checkList.push(keyword);
				}
				if(this.checkList.length>0){
					//判断是否全选
					let ever = list.every((item, index) => {
						return _this.checkList.indexOf(item.keyword)>=0;
					});
					if (ever) {
						_this.renews.list[index].allCheck = true;
					} else {
						_this.renews.list[index].allCheck = false;
					}
				}else{
					_this.renews.list[index].allCheck = false;
				}
			},
			//全选
			checkAll(index,list){
				let _this = this;
				//判断是否已经全选
				if(_this.renews.list[index].allCheck){
					_this.renews.list[index].allCheck = false;
					list.forEach((item,index)=>{
						let idIndex = _this.checkList.indexOf(item.keyword);
						_this.checkList.splice(idIndex, 1);
					})
				}else{
					_this.renews.list[index].allCheck = true;
					list.forEach((item,index)=>{
						let idIndex = _this.checkList.indexOf(item.keyword);
						if(idIndex<0){
							_this.checkList.push(item.keyword);
						}
					})
				}
			},
			//生成订单
			genOrders(){
				if(this.checkList.length>0){
					let _this = this;
					let id = localStorage.msgId;
					this.$axios
						.post("index.php?c=App&a=setRenewRecords", {
							msid: id,
							data:_this.checkList
						})
						.then(function(response) {
							if (response.data.errcode == 0) {
								Toast({
									message: response.data.errmsg,
									duration: 2000
								});
								setTimeout(function(){
									_this.init();
								},2000);
							}else{
								Toast({
									message: response.data.errmsg,
									duration: 2000
								});
							}
							
						})
						.catch(function(error) {
					
						});
				}else{
					Toast({
						message: '请选择续费单',
						duration: 2000
					});
				}
			},
			//查看全部
			lookMore(mark){
				let _this = this;
				let id = localStorage.msgId;
				this.more=true;
				this.$axios
					.post("index.php?c=App&a=getRenewList", {
						msid:id,
						product_mark:mark,
						pgsize:20,
						p:1
					})
					.then(function(response) {
						if (response.data.errcode == 0) {
							_this.moreList = response.data.content;
							_this.moreTxt=_this.moreList[0].product_name;
						}
						// Toast({
						// 	message: 'haha',
						// 	duration: 3000
						// });
					})
					.catch(function(error) {
				
					});
			},
			//关闭查看全部
			moreClose(){
				this.more=false;
			}
		}
	};
</script>

<style scoped lang="scss">
	.renew {
		// padding: 0.9rem 0 1rem 0;
		font-size: 0.28rem;
		background: #F1F1F1;
		height: 100%;

		.pd_common {
			padding: 0 0.32rem;
			border-bottom: 0.2rem #F1F1F1 solid;
			background: #ffffff;
			overflow: hidden;
		}

		.renew_top {
			.renew_title {
				background: url(../../assets/images/common/icon_warning.png) 0.22rem center no-repeat;
				background-size: 0.24rem 0.24rem;
				background-color: #FFEADC;
				font-size: 0.24rem;
				line-height: 0.46rem;
				padding: 0.12rem 0.12rem 0.12rem 0.66rem;
				border-radius: 0.04rem;
				margin-top: 0.3rem;
				color: #EA792C;
				font-weight: 400;
				margin-bottom: 0.18rem;
			}

			.renew_msg {
				font-size: 0.22rem;
				color: #999999;
				line-height: 0.28rem;
				margin: 0 0 0.24rem 0;
			}
		}

		.renew_con {
			.renew_item {
				.renew_item_top {
					margin-top: 0.38rem;
					overflow: hidden;

					.item_top_left {
						float: left;

						span {}

						.left_title {
							color: #028BFF;
							border: 1px solid #2971D0;
							border-radius: 0.18rem;
							padding: 0.02rem 0.12rem;
							font-size: 0.2rem;
							line-height: 0.28rem;
							margin-right: 0.2rem;
							&.orange{
								color:#FF7F2F;
								border: 1px solid #FF7F2F;
							}
							&.blue{
								color:#3280FF;
								border: 1px solid #3280FF;
							}
							&.purple{
								color:#AB2FFF;
								border: 1px solid #AB2FFF;
							}
							&.green{
								color:#18CE9A;
								border: 1px solid #18CE9A;
							}
							// orange: item.mark == 'dzp',
							// blue: item.mark == 'bs',
							// purple: item.mark == 'domain',
							// green: item.mark == 'ecweb'
						}

						.left_tips {
							color: #666666;
							font-size: 0.24rem;
							line-height: 0.44rem;
						}
					}

					.item_top_right {
						float: right;
						color: #0087FF;
						font-size: 0.26rem;

						input {
							border: none;
							outline: none;
							opacity: 0;
							margin: 0 0 0 0.12rem;
							width: 0.36rem;
							height: 0.36rem;
						}

						.top_right_lab {
							background: url(../../assets/images/common/icon_all.png) right center no-repeat;
							background-size: 0.36rem 0.36rem;
							display: inline-block;

							&.active {
								background: url(../../assets/images/common/icon-selected.png) right center no-repeat;
								background-size: 0.36rem 0.36rem;
							}
						}

					}
				}

				.renew_item_explain {
					margin-top: 0.3rem;
					display: flex;
					background: #FDFDFD;

					span {
						color: #999999;
						font-size: 0.22rem;
						line-height: 0.32rem;
						border: 1px solid #DADADA;
						flex: 1;
						padding: 0.04rem 0.22rem;
					}

					span:last-child {
						border-left: none;
					}
				}

				.renew_item_list {
					.item_list_box {
						border-bottom: 1px solid #F1F1F1;
						display: flex;
						padding: 0.3rem 0;

						.item_list_left {
							flex: 1;
							color: #2E3A54;
							font-weight: 500;
							line-height: 0.4rem;
						}

						.item_list_right {
							flex: 1;

							span {
								color: #EF9456;
								font-size: 0.26rem;
								line-height: 0.36rem;
							}

							input {
								border: none;
								outline: none;
								opacity: 0;
								margin: 0 0 0 0.12rem;
								width: 0.36rem;
								height: 0.36rem;
							}

							.list_right_lab {
								background: url(../../assets/images/common/icon-unselected.png) right center no-repeat;
								background-size: 0.36rem 0.36rem;
								display: inline-block;
								float: right;

								&.active {
									background: url(../../assets/images/common/icon-selected.png) right center no-repeat;
									background-size: 0.36rem 0.36rem;
								}
							}

						}
					}
				}
			}

			.look_more {
				font-size: 0.24rem;
				color: #999999;
				text-align: center;
				padding: 0.3rem 0;
			}
		}

		.renew_gen_orders {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			border: none;

			.gen_orders_btn {
				background: linear-gradient(131deg, rgba(15, 179, 254, 1) 0%, rgba(0, 134, 255, 1) 100%);
				border-radius: 0.44rem;
				color: #fff;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				margin: 0.46rem 0 0.36rem 0;
			}
		}
		.more_box{
			position: fixed;
			width:100%;
			height:100%;
			top:0;
			left:0;
			z-index: 1003;
			.more_box_bg{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				background:#000;
				opacity: 0.3;
			}
			.more_box_con{
				width:100%;
				height:10rem;
				position: absolute;
				bottom: 0;
				left:0;
				background-color:#ffffff;
				.pd_common{
					border:none;
				}
				.renew_item_list{
					overflow-y: scroll;
					height: 6.8rem;
				}
				.more_close{
					background: linear-gradient(131deg, #0fb3fe 0%, #0086ff 100%);
					border-radius: 0.44rem;
					color: #ffffff;
					height: 0.88rem;
					line-height: 0.88rem;
					text-align: center;
					position:absolute;
					bottom:0.4rem;
					width:90%;
					left:5%;
				}
				.renew_con{
					margin-bottom:0.6rem;
				}
			}
		}
	}
</style>
