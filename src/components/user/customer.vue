<template>
	<div id="customer" class="customer">
		<nav-header title="智能客服"></nav-header>
		<div class="customer-box containerView-main">
			<div class="customer_con">
				<div class="customer_con_box">
					<div class="customer_con_left">
						<div class="icon_left_bg"></div>
						<div class="left_text left_pdn">
							<p class="title">您好！我是智能在线客服</p>
							<p class="exp">请选择需要咨询的问题哦</p>
							<div class="question" v-for="list in lists" :key="list.id">{{list.question}}</div>
						</div>
					</div>
				</div>
				<div class="customer_con_box" v-for="list in lists" :key="list.id">
					<div class="customer_con_right">
						<div class="right_text">
							{{list.question}}
						</div>
						<div class="icon_right_bg"></div>
					</div>
					<div class="customer_con_left">
						<div class="icon_left_bg"></div>
						<div class="left_text">
							{{list.answer}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="customer_bottom">
			没解决？联系客服热线吧
			<span></span>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui";
	export default {
		name: "customer",
		data() {
			return {
				mark: this.$route.query.mark, //产品标识
				lists:[],//问题列表
			};
		},
		created() {
			this.getMsg();
		},
		methods: {
			getMsg() {
				let _this = this;
				this.$axios
					.post("/index.php?c=App&a=getFaq", {
						mark: this.mark
					})
					.then((res) => {
						if (res.data.errcode == 0) {
							this.lists=res.data.content.list;
						}
					})
			}
		}
	};
</script>
