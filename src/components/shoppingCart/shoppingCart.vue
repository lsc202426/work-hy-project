<template>
	<div class="shoppingCart">
		<nav-header title=" " gobackurl="/user"></nav-header>
		<!-- 内容 -->
		<div class="cart_content containerView-main" v-if="lists && lists.length > 0">
			<div class="cart_top">
				<p>已选购{{ids.length}}个申请词</p>
			</div>
			<div class="cart_list">
				<div class="cart_item" v-for="(list,index) in lists" :key="index">
					<!-- 左上角图标 -->
					<div class="icon_left">
						<img v-if="list.product_mark=='domain'" src="../../assets/images/shoppingCart/icon_ym.png" alt=""><!-- 域名服务domain -->
						<img v-if="list.product_mark=='tmd'" src="../../assets/images/shoppingCart/icon_dsb.png" alt=""><!-- 点商标tmd -->
						<img v-if="list.product_mark=='dzp'" src="../../assets/images/shoppingCart/icon_dzp.png" alt=""><!-- 点招聘dzp -->
						<img v-if="list.product_mark=='bs'" src="../../assets/images/shoppingCart/icon_sb.png" alt=""><!-- 商标服务bs -->
						<img v-if="list.product_mark=='ecweb'" src="../../assets/images/shoppingCart/icon_yzt.png" alt=""><!--ecweb 一站通 -->
					</div>
					<!-- 右上角删除 -->
					<div class="icon_delete" @click="deleteItem(list.id,list.total)">
						<img src="../../assets/images/shoppingCart/icon_delete.png" alt="">
					</div>
					<!-- 复选框 -->
					<div class="item_left" :class="{ active: ids.indexOf(list.id)>=0 }">
						<label for="" class="item_checkbox">
							<input type="checkbox" :checked="ids.indexOf(list.id)>=0" :value="check" @click="checkItem(list.id,list.subject.name,list.total)">
						</label>
					</div>
					<!-- 内容 -->
					<div class="item_right">
						<div class="item_title" v-if="list.product_mark=='bs'">{{list.bs_name?list.bs_name:'图形'}}</div>
						<div class="item_title" v-else>{{list.keyword?list.keyword:list.product_name}}</div>
						<p class="item_subject">申请主体：{{list.subject.name}}</p>
						<p v-if="list.product_mark=='domain'||list.product_mark=='tmd'||list.product_mark=='dzp'" class="item_year">年限:{{list.year}}年</p>
						<p v-if="list.product_mark=='tmd'" class="item_category">类别:<span @click="getCategory(list.id)" class="category"><span v-for="(details,index) in list.class_detail" :key="index">{{details.categoryName}}<span v-if="details.length>1">,</span></span><i class="icon_b"></i></span></p>
						<p v-if="list.product_mark=='bs'" class="item_category">类别:<span>{{list.bs_class_name}}</span></p>
						<p v-if="list.product_mark=='bs'" class="item_category">类型:<span>{{list.bs_type}}</span></p>
						<p v-if="list.product_mark=='tmd'||list.product_mark=='dzp'||list.product_mark=='domain'" class="item_price">注册费:￥{{list.price}}</p>
						<p class="item_total" @click="getTotal(list.id)">合计:￥{{list.total}}<span v-if="list.product_mark=='tmd'"><i class="icon_b" :class="{getTotal:price_detail}"></i></span></p>
					</div>
					<transition name="fade" mode="out-in">
						<div class="total_detail" v-if="price_detail==list.id&&list.product_mark=='tmd'">
							<p class="detail_top"></p>
							<p class="detail_price">审核费:￥{{list.verify_fee}}</p>
							<p class="detail_price">增加类别费:￥{{list.other_class_fee}}</p>
						</div>
					</transition>
					<!-- 类别明细 -->
					<transition name="fade" mode="out-in">
						<div class="category_detail" v-if="category_detail==list.id&&list.product_mark=='tmd'">
							<div class="detail_bg"></div>
							<div class="detail_con">
								<div class="close_detail" @click="close_detail()">关闭</div>
								<div class="category_con">
									<div class="category_title">已选类别</div>
									<div class="category_item" v-for="(details,index) in list.class_detail" :key="index">
										<div class="category_item_top">{{details.categoryName}}</div>
										<div class="products_box" v-for="products in details.detail" :key="products.code">
											<div class="category_item_con" v-for="product in products.products" :key="product.id">{{product.name}}</div>
										</div>
									</div>
								</div>
							</div>
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
					<div class="addCard" @click="confirm()">确认</div>
				</div>
			</div>
		</div>
		<!-- 暂无数据 -->
		<blankPage v-else></blankPage>
		<!-- 遮罩层 -->
		<!-- <div class="toastBg" v-show="showToast"></div> -->
	</div>
</template>

<script>
	import {
		Toast,
		MessageBox,
		Indicator
	} from "mint-ui";
	import blankPage from "@/components/order/blankPage.vue";
	export default {
		name: 'shoppingCart',
		data() {
			return {
				all_price: 0,
				token: '',
				lists: [], //数据列表
				price_detail: 0, //费用明细手柄
				check: false, //复选框选中状态
				ids: [], //意愿清单id串
				item_subject: '', //申请主体
				showToast:false,//遮罩层
				category_detail:0,//类别详细
				class_detail:[],//商标类别
			}
		},
		components: {
			blankPage
		},
		created() {
			this.init(); //初始化数据
		},
		methods: {
			init() {
				if (sessionStorage.token) {
					this.token = sessionStorage.token;
				}
				let _this = this;
				_this.$axios
					.post("index.php?c=App&a=getWishlist")
					.then(function(response) {
						if (response.data.errcode == 0) {
							
							_this.lists = response.data.content;
							_this.ids=[];
							for(let i=0;i<_this.lists.length;i++){
								_this.ids.push(_this.lists[i].id);
								_this.all_price+=parseInt(_this.lists[i].total);
							}
						} else {
							Toast({
								message: response.data.errmsg,
								duration: 2000
							});
						}
					})
					.catch(function(error) {
						Toast({
							message: error.data.errmsg,
							duration: 2000
						});
					});
			},
			//生成订单
			confirm() {
				let _this=this
				//判断是否有选中项
				if (_this.ids.length < 1) {
					Toast({
						message: '请选择申请词',
						duration: 2000
					});
				} else {
					let idStr = _this.ids.join(',');
					if(_this.token){
						Indicator.open({
							text: '正在生成订单...',
							spinnerType: 'fading-circle'
						});
						//_this.showToast=true;//显示遮罩层
						setTimeout(function(){
							_this.$axios
								.post("index.php?c=App&a=setOrder", {
									ids:idStr
								})
								.then(function(response) {
									if (response.data.errcode == 0) {
										Indicator.close();
										
										let orderId=response.data.content.order_no;//返回的订单id
										let counter=response.data.content.counter;//返回的订单个数
										if(orderId){
											_this.$router.push({
											  path: "/playOrder",
											  query: { id: orderId, price: _this.all_price ,counter:counter}
											});
										}
									} else {
										Indicator.close();
										Toast({
											message: response.data.errmsg,
											duration: 2000
										});
										
									}
								})
								.catch(function(error) {
									Indicator.close();
									Toast({
										message: error.data.errmsg,
										duration: 2000
									});
								});
						},2000)
					}
				}
			},
			//展开类别明细
			getCategory(id) {
				//控制类别明细的显示隐藏
				if(this.category_detail==id){
					this.category_detail=0;
				}else{
					this.category_detail=id;
				}
			},
			//关闭类别明细
			close_detail(){
				this.category_detail=0;
			},
			//展开金额明细
			getTotal(id) {
				//控制金额明细的显示隐藏
				if(this.price_detail==id){
					this.price_detail=0;
				}else{
					this.price_detail=id;
				}
			},
			//删除
			deleteItem(id,total) {
				let _this = this;
				let idIndex = _this.ids.indexOf(id);
				MessageBox.confirm('', {
					message: '确认删除？',
					title: '提示',
					showCancelButton: true
				}).then(action => {
					if (action == 'confirm') { //确认的回调
						_this.$axios
							.post("index.php?c=App&a=delWishlist", {
								id: id
							})
							.then(function(response) {
								if (response.data.errcode == 0) {
									if (idIndex >= 0) {
										//删除成功去除id串选中项
										_this.ids.splice(idIndex, 1);
									}
									Toast({
										message: '删除成功',
										duration: 2000
									});
									//初始化数据
									_this.all_price=0;
									_this.init();
								} else {
									Toast({
										message: response.data.errmsg,
										duration: 2000
									});
								}
							})
							.catch(function(error) {
								Toast({
									message: error.data.errmsg,
									duration: 2000
								});
							});
					}
				}).catch(err => {
					if (err == 'cancel') { //取消的回调
						
					}
				});
			},
			//复选框选中
			checkItem(id, name, total) { //参数1：列表id，参数2：主体名字，参数3：小计金额
				//判断选中项是否与已选中项是同个主体
				// if (this.item_subject && this.item_subject != name) {
				// 	Toast({
				// 		message: '请选择相同产品申请词',
				// 		duration: 2000
				// 	});
				// 	return;
				// } else {
				// 	this.item_subject = name;
				// }
				let idIndex = this.ids.indexOf(id);
				if (idIndex >= 0) { //判断id串中是否已经包含
					//如果包含，则去除
					this.ids.splice(idIndex, 1);
					//总金额计算
					this.all_price -= parseInt(total);
				} else {
					//没有包含，添加
					this.ids.push(id);
					//总金额计算
					this.all_price += parseInt(total);
				}
				
			}
		},
	}
</script>
