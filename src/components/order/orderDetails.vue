<template>
	<div class="order-deatil">
		<!-- head -->
		<nav-header title="订单详情" gobackurl="/orderlist"></nav-header>
		<div class="detail-top"></div>
		<div class="containerView-main">
			<!-- 主体信息 -->
			<div class="detail-customer-info">
				<div class="detail-customer-info-title"><span></span>主体信息</div>
				<div class="detail-customer-info-name info-list">
					<label>主体名称</label>
					<label>{{
			      detailsInfo.corp_name ? detailsInfo.corp_name : "暂无"
			    }}</label>
				</div>
				<div class="detail-customer-info-phone info-list">
					<label>联系人</label>
					<label>{{
			      detailsInfo.corp_linkman ? detailsInfo.corp_linkman : "暂无"
			    }}</label>
				</div>
				<div class="detail-customer-info-phone info-list">
					<label>联系电话</label>
					<label>{{
				    detailsInfo.corp_phone ? detailsInfo.corp_phone : "暂无"
				  }}</label>
				</div>
			</div>
			<!-- 订单内容 -->
			<div class="detail-main">
				<div class="detail-main-title">
					<span class="order-id">{{ detailsInfo.order_no }}</span>
					<span class="status">{{ detailsInfo.status_name }}</span>
				</div>
				<div class="detail-main-list" v-for="item of detailsInfo.items" :key="item.id">
					<div class="detail-main-list-name">
						<span class="typename" :class="{ orange: item.product_name == '点招聘' ,blue: item.product_name == '商标服务' ,purple: item.product_name == '域名服务' ,green: item.product_name == '一站通'  }">{{ item.product_name }}</span>
						<span class="shopname">{{ item.keyword }}</span>
					</div>
					<p class="detail-main-list-regfre money">
						<label>注册费 ({{ item.price }}元 x {{ item.year }}年)</label>
						<span>￥{{ item.total }}元</span>
					</p>
					<!-- <p class="detail-main-category money">
            <label></label>
            <span></span>
          </p> -->
					<p class="detail-main-list-Review money" v-if="item.product_name == '点商标'">
						<label>审核费</label>
						<span>￥{{ item.fee_verify }}元</span>
					</p>
				</div>
			</div>
			<!-- 订单联系信息 -->
			<div class="detail-customer-info">
				<div class="detail-customer-info-title"><span></span>订单联系信息</div>
				<div class="detail-customer-info-name info-list">
					<label>姓名</label>
					<label>{{
            detailsInfo.personnel_name ? detailsInfo.personnel_name : "暂无"
          }}</label>
				</div>
				<div class="detail-customer-info-phone info-list">
					<label>电话</label>
					<label>{{
            detailsInfo.personnel_phone ? detailsInfo.personnel_phone : "暂无"
          }}</label>
				</div>
			</div>
		</div>
		<div class="detail-bottom">
			<div class="detail-bottom-allmoney">
				<p class="detail-bottom-allmoney-title">订单合计</p>
				<p class="detail-bottom-allmoney-money">￥{{ detailsInfo.total }}元</p>
			</div>
			<button class="detail-bottom-btn" @click="paly">立即支付</button>
		</div>
	</div>
</template>
<script>
	import {
		Toast,
		Indicator
	} from "mint-ui";
	export default {
		data() {
			return {
				// 订单详情
				detailsInfo: {}
			};
		},
		methods: {
			// 获取订单列表
			getOrderDetails: function(jid) {
				const that = this;
				that.$axios
					.post("/index.php?c=App&a=getOrderInfo", {
						p: 0,
						order_no: jid
					})
					.then(function(response) {
						console.log(response);
						if(response.data.errcode==0){
							that.detailsInfo = response.data.content;
						}else{
							Toast({
								message: response.data.errmsg,
								duration: 2000
							});
						}
					})
					.catch(function(error) {
						console.log(error);
						Toast({
							message: error.data.errmsg,
							duration: 2000
						});
					});
			},
			// 立即支付
			paly: function() {
				let _this=this;
				Indicator.open({
					text: '正在生成支付订单...',
					spinnerType: 'fading-circle'
				});
				setTimeout(function(){
					Indicator.close();
					_this.$router.push({
						path: "/playorder",
						query: {
							id: _this.$route.query.id,
							price: _this.detailsInfo.total
						}
					});
				},2000)
				
			}
		},
		created() {
			// 订单id
			let jid = this.$route.query.id;
			this.getOrderDetails(jid);
		}
	};
</script>
<style lang="scss" scoped>
	.order-deatil .detail-main-list-name .typename {
		width: auto;
		padding: 0.03rem 0.06rem;
	}

	.order-deatil .detail-main-list-name {
		align-items: center;
	}
</style>
