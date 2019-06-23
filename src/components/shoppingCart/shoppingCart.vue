<template>
	<div class="shoppingCart">
		<nav-header title=" "></nav-header>
		<!-- 内容 -->
		<div class="cart_content" v-if="lists && lists.length > 0">
			<div class="cart_top">
				<p>已选购0个申请词</p>
			</div>
			<div class="cart_list">
				<div class="cart_item" v-for="(list,index) in lists" :key="index">
					<!-- 左上角图标 -->
					<div class="icon_left">
						<img v-if="list.product_name=='.cn域名'||list.product_name=='.com域名'||list.product_name=='.net域名'" src="../../assets/images/shoppingCart/icon_ym.png" alt=""><!-- 域名服务 -->
						<img v-if="list.product_name=='点商标'" src="../../assets/images/shoppingCart/icon_dsb.png" alt=""><!-- 点商标 -->
						<img v-if="list.product_name=='点招聘域名'" src="../../assets/images/shoppingCart/icon_dzp.png" alt=""><!-- 点招聘 -->
						<img v-if="list.product_name=='商标服务'" src="../../assets/images/shoppingCart/icon_sb.png" alt=""><!-- 商标服务 -->
						<img v-if="list.product_name=='品牌官网'||list.product_name=='品牌网店'||list.product_name=='小程序网店'" src="../../assets/images/shoppingCart/icon_yzt.png" alt=""><!-- 一站通 -->
					</div>
					<!-- 右上角删除 -->
					<div class="icon_delete" @click="deleteItem()">
						<img src="../../assets/images/shoppingCart/icon_delete.png" alt="">
					</div>
					<!-- 复选框 -->
					<div class="item_left">
						<label for="" class="item_checkbox">
							<input type="checkbox">
						</label>
					</div>
					<!-- 内容 -->
					<div class="item_right">
						<div class="item_title">{{list.keyword}}</div>
						<p class="item_subject">申请主体：{{list.subject.name}}</p>
						<p class="item_year">年限:{{list.year}}年</p>
						<p class="item_category">类别:<span id="category" @click="getCategory()" class="category">7,8,12<i class="icon_b"></i></span></p>
						<p class="item_price">注册费:￥600.00</p>
						<p class="item_total" @click="getTotal()">合计:￥1200.00<span><i class="icon_b"></i></span></p>
					</div>
					<transition name="fade" mode="out-in">
						<div class="total_detail" v-show="price_detail">
							<p class="detail_top"></p>
							<p class="detail_price">审核费:￥600.00</p>
							<p class="detail_price">增加类别费:￥600.00</p>
						</div>
					</transition>
				</div>
			</div>
			<!-- 底部 -->
			<div class="fill_bottom">
				<div class="bottom_l">
					<p>总计 :</p>
					<p class="all_price">￥{{all_price}}元</p>
				</div>
				<div class="bottom_r">
					<div class="addCard" @click="confirm()">确认提交</div>
				</div>
			</div>
		</div>
		<!-- 暂无数据 -->
		<blankPage v-else></blankPage>
	</div>
</template>

<script>
	import {Toast} from "mint-ui";
	import blankPage from "@/components/order/blankPage.vue";
	export default{
		name:'shoppingCart',
		data() {
			return {
				all_price: '',
				token:'',
				lists:[],//数据列表
				price_detail:false,//费用明细手柄
			}
		},
		components:{
			blankPage
		},
		created(){
			this.init();//初始化数据
		},
		methods: {
			
			init(){
				if(sessionStorage.token){
					this.token=sessionStorage.token;
				}
				let _this=this;
				_this.$axios
					.post("index.php?c=App&a=getWishlist", {
						access_token: _this.token
					})
					.then(function(response) {
						if (response.data.errcode == 0) {
							console.log(response);
							_this.lists=response.data.content;
						} else {
							Toast({
								message: response.data.errmsg,
								duration: 3000
							});
						}
					})
					.catch(function(error) {
						Toast({
							message: error.data.errmsg,
							duration: 3000
						});
					});
			},
			//确认提交
			confirm() {
				
			},
			//展开类别明细
			getCategory(){
				
			},
			//展开金额明细
			getTotal(){
				this.price_detail=!this.price_detail;
			},
			//删除
			deleteItem(){
				
			}
		},
	}
</script>
