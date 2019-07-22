<template>
	<div class="website">
		<nav-header title="网站"></nav-header>
		<div class="content containerView-main">
			<img src="../../assets/images/oneStation/list_bg3.png" class="top_img" alt="">
			<div class="text">
				<div class="text_top">
					<div class="text_top_l">
						<p class="title">小程序网店</p>
						<p class="no-after">费用：<span>￥{{price}}</span></p>
						<p class="msg">适合个体淘宝店主或小型企业</p>
					</div>
					<div class="text_top_r">
						<div class="apply" @click="apply()">立即申请</div>
					</div>
				</div>
				<div class="text_con">
					<div class="title">特点：</div>
					<p class="msg">空间：10G</p>
					<p class="msg">月流量：50G </p>
					<p class="msg">风格：小程序网店</p>
				</div>
				<div class="text_con">
					<div class="title">核心功能</div>
					<p class="msg msg_s">小程序管理后台：</p>
					<p class="pl_t">独立的小程序网店管理后台，可以根据运营需求设置
						不同的功能插件，打包小程序等。</p>
					<p class="msg msg_s">商品发布：</p>
					<p class="pl_t">发布商品，设置商品分类、商品价格及库存等，导入
						导出商品管理，适用于商品展示等多维度图文展示类
						栏目使用。</p>
					<p class="msg msg_s">会员功能：</p>
					<p class="pl_t">注册成为网站会员，选购商品并在线支付。会员积分
						升级，消费可获得积分或优惠等。</p>
					<p class="msg msg_s">订单管理：</p>
					<p class="pl_t">查看会员购买的订单信息，并根据订单的处理进度设
						置订单的状态，如：收款订单，发货订单等。</p>
					<p class="msg msg_s">支付管理：</p>
					<p class="pl_t">网店可接入的第三方支付接口，目前支持支付宝及微
						信支付。</p>
					<p class="msg msg_s">优惠券管理：</p>
					<p class="pl_t">可根据节日或活动设置的代金券，用户通过消费时可
						使用优惠券代部分现金。</p>
					<p class="msg msg_s">秒杀管理：</p>
					<p class="pl_t">设置某些产品参与秒杀活动、产品秒杀的时间及产品
						的数量等。</p>
					<p class="msg msg_s">拼团管理：</p>
					<p class="pl_t">创建拼团建立拼团规格及发布拼团信息。</p>
					<p class="msg msg_s">微分销管理：</p>
					<p class="pl_t">通过微信公众平台上的三级分销商城，设置分销级别
						分成比列，前端显示产品分销按钮及分销链接。</p>
					<p class="msg msg_s">配套服务：</p>
					<p class="pl_t">提供首页布局初始化，40条信息录入，40条产品图片
						发布，8个通栏广告banner设计，每年提供6次网站数
						据库备份。提供7*24的电话及在线(QQ、微信)咨询服
						务支持。</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				price:this.$route.query.price
				
			}
		},
		created(){
			
		},
		methods: {
			apply() {
				let mark=this.$route.query.mark;
				let fee_verify=this.$route.query.fee_verify;
				let id=this.$route.query.id;
				let price=this.$route.query.price;
				let title=this.$route.query.title;
				this.$router.push({
					//跳转品牌官网
					path: "/information",
					query: {
						mark: mark,
						fee_verify:fee_verify,
						id:id,
						price:price,
						title:title
					}
				});
			}
		},
	}
</script>
