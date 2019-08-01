<template>
	<div class="shoppingCart">
		<div class="shopping_top">
			<div class="shop_box_list">
				<span class="goBack_bg" @click="goBack()"></span>
				<span>申请列表</span>
				<span @click.stop="edit()" class="editTxt">{{editTxt}}</span>
			</div>
		</div>
		<!-- 内容 -->
		<div class="cart_content containerView-main" v-if="lists && lists.length > 0">
			<!-- <div class="cart_top">
				<p>已选购{{ ids.length }}个申请词</p>
			</div> -->
			<div class="cart_list">
				<div class="cart_item_box" v-for="(item,index) in lists" :key="index">
					<div class="cart_item_title">
						<span @click.stop="checkMore(item)" class="check_bg" :class="{active:item.checkAll}"></span>
						<span v-if="item.mark=='tmd'" class="icon_tmd icon_bg"></span><!-- 点商标 -->
						<span v-if="item.mark=='domain'" class="icon_domain icon_bg"></span><!-- 域名服务 -->
						<span v-if="item.mark=='dzp'" class="icon_dzp icon_bg"></span><!-- 点招聘 -->
						<span v-if="item.mark=='bs'" class="icon_bs icon_bg"></span><!-- 商标服务 -->
						<span v-if="item.mark=='ecweb'" class="icon_ecweb icon_bg"></span><!-- 一站通 -->
						<span v-if="item.mark=='dct'" class="icon_dct icon_bg"></span><!-- 点餐厅 -->
						<span>{{item.name}}</span>
					</div>
					<div class="cart_item f_bdt" @click.stop="proEdit(list.id,item.mark)" v-for="(list, index) in item.list" :key="index">
						<!-- 右上角删除 -->
						<!-- <div class="icon_delete" @click="deleteItem(list.id, list.total)">
							<img src="../../assets/images/shoppingCart/icon_delete.png" alt="" />
						</div> -->
						<!-- 复选框 -->
						<div class="item_left" :class="{ active: ids.indexOf(list.id) >= 0 }">
							<label for="" class="item_checkbox">
								<input type="checkbox" :checked="ids.indexOf(list.id) >= 0" :value="check" @click.stop="checkItem(list.id, list.subject.name, list.total,item)" />
							</label>
						</div>
						<!-- 内容 -->
						<div class="item_right">
							<div class="item_title" v-if="list.product_mark == 'bs'">
								{{ list.bs_name ? list.bs_name : "图形" }}
							</div>
							<div class="item_title" v-else>
								{{ list.keyword ? list.keyword : list.product_name }}
								<span v-if="list.product_mark != 'bs'" class="item_year">
									年限:{{ list.year }}年
								</span>
							</div>

							<p class="item_subject">申请人：{{ list.subject.name }}</p>
							<p v-if="list.product_mark == 'tmd' ||list.product_mark == 'bs'" class="item_category">
								<span>类别:</span>
								<span @click.stop="getCategory(list.id)" class="category">
									<span v-for="(details, index) in list.class_detail" :key="index">{{ details.categoryName}}
										<span v-if="list.class_detail.length > 1" style="padding-right: 0.1rem;">|</span>
									</span><i class="icon_b"></i>
								</span>
							</p>
							<!-- <p v-if="list.product_mark == 'bs'" class="item_category">
								类别:<span>{{ list.bs_class_name }}</span>
							</p> -->
							<p v-if="list.product_mark == 'bs'" class="item_category">
								类型:<span>{{ list.bs_type_name }}</span>
							</p>
							<p class="item_price" @click.stop="getTotal(list.id)">
								合计: <span class="item_total">￥{{list.total}}</span>
								<!-- <span v-if="list.product_mark == 'tmd'">
									<i class="icon_b" :class="{ getTotal: price_detail }"></i>
								</span> -->
							</p>
						</div>
						<transition name="fade" mode="out-in">
							<div class="total_detail">
								<!-- <p class="detail_top"></p> -->
								<p class="detail_price">
									注册费:<span>￥{{ (list.price*list.year).toFixed(2) }}</span>
								</p>
								<p class="detail_price" v-if="list.verify_fee"> 审核费:￥{{ list.verify_fee }}</p>
								<p class="detail_price" v-if="list.other_class_fee&&list.other_class_fee>0">
									增加类别费:￥{{ list.other_class_fee }}
								</p>
							</div>
						</transition>
						<!-- 类别明细 -->
						<transition name="fade" mode="out-in">
							<div class="category_detail" v-if="category_detail == list.id && (list.product_mark == 'tmd'||list.product_mark == 'bs')">
								<div class="detail_bg" @click.stop=""></div>
								<div class="detail_con">
									<div class="category_title">
										<p>已选类别</p>
									</div>
									<div class="close_detail" @click.stop="close_detail()"></div>
									<div class="category_con">
										<div class="category_item" v-for="(details, index) in list.class_detail" :key="index">
											<div class="category_item_top">
												{{ details.categoryName }}
											</div>
											<div class="products_box" v-for="products in details.detail" :key="products.code">
												<div class="category_item_con" v-for="product in products.products" :key="product.id">
													{{ product.name }}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
		<!-- 暂无数据 -->
		<blankPage v-else></blankPage>
		<!-- 底部 -->
		<div class="fill_bottom" v-if="status==0&&lists && lists.length > 0">
			<div class="bottom_l">
				<p>总计 :</p>
				<p class="all_price">￥{{ all_price }}元</p>
			</div>
			<div class="bottom_r">
				<div class="addCard" @click.stop="confirm()">确认</div>
			</div>
		</div>
		<div class="fill_bottom fill_del" v-if="status!=0&&lists && lists.length > 0">
			<div class="bottom_l bottom_n" @click.stop="allCheck()">
				<span class="check_all" :class="{active:isAllCheck}"></span>
				<span>全选</span>
			</div>
			<div class="bottom_del">
				<div class="addCard" @click.stop="deleteItem()">删除</div>
			</div>
		</div>
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
		name: "shoppingCart",
		data() {
			return {
				editTxt: "编辑", //右上角文字
				status: 0, //编辑前状态：0，编辑中状态：1
				all_price: 0,
				token: "",
				lists: [], //数据列表
				price_detail: 0, //费用明细手柄
				check: false, //复选框选中状态
				ids: [], //意愿清单id串
				item_subject: "", //申请主体
				showToast: false, //遮罩层
				category_detail: 0, //类别详细
				class_detail: [] ,//商标类别
				isAllCheck:false,//是否全选
			};
		},
		components: {
			blankPage
		},
		created() {
			//清除内存
			if (sessionStorage.token) {
				let token = sessionStorage.token;
				sessionStorage.clear();
				sessionStorage.token = token;
			}
			this.init(); //初始化数据
		},
		methods: {
			init(form) {
				if (sessionStorage.token) {
					this.token = sessionStorage.token;
				}
				let _this = this;
				_this.$axios
					.post("index.php?c=App&a=getWishlist")
					.then(function(response) {
						if (response.data.errcode == 0) {
							_this.lists = response.data.content;
							_this.ids = [];
							if(form&&form==1&&_this.lists.length>0){
								_this.isAllCheck=false;
								_this.all_price=0;
							}
							// else{
							// 	for (let i = 0; i < _this.lists.length; i++) {
							// 		_this.lists[i].checkAll = true;
							// 		for (let j = 0; j < _this.lists[i].list.length; j++) {
							// 			_this.ids.push(_this.lists[i].list[j].id);
							// 			_this.all_price += parseInt(_this.lists[i].list[j].total);
							// 		}
							// 	}
							// }
						} else {
							Toast({
								message: response.data.errmsg,
								duration: 2000
							});
						}
					})
			},
			goBack(){
				this.$router.push({
					path:"/user"
				})
			},
			//编辑
			proEdit(id,mark){
				sessionStorage.proEditId=id;
				sessionStorage.mark=mark;
				//直接跳转到申请信息页面
				switch (mark) {
					case "tmd":
						this.$router.push({
							//跳转点商标
							path: "/fillProduct",
							query: {
								mark: mark
							}
						});
						break;
					case "dzp":
						this.$router.push({
							//跳转点招聘
							path: "/dzpinfor",
							query: {
								mark: mark
							}
						});
						break;
					case "bs":
						this.$router.push({
							//跳转商标服务
							path: "/application",
							query: {
								mark: mark
							}
						});
						break;
					case "domain":
						this.$router.push({
							//跳转域名服务
							path: "/domainMsg",
							query: {
								mark: mark
							}
						});
						break;
					case "ecweb":
						this.$router.push({
							//跳转一站通
							path: "/restaurantWeb",
							query: {
								mark: mark
							}
						});
						break;
					case "dct":
						this.$router.push({
							//跳转点餐厅
							path: "/restaurantFill",
							query: {
								mark: mark
							}
						});
						break;
					default:
						this.$router.push({
							//跳转首页
							path: "/"
						});
						break;
				}
			},
			//生成订单
			confirm() {
				let _this = this;
				//判断是否有选中项
				if (_this.ids.length < 1) {
					Toast({
						message: "请选择申请词",
						duration: 2000
					});
				} else {
					let idStr = _this.ids.join(",");
					if (_this.token) {
						Indicator.open({
							text: "正在生成订单...",
							spinnerType: "fading-circle"
						});
						//_this.showToast=true;//显示遮罩层
						setTimeout(function() {
							_this.$axios
								.post("index.php?c=App&a=setOrder", {
									ids: idStr
								})
								.then(function(response) {
									if (response.data.errcode == 0) {
										Indicator.close();

										let orderId = response.data.content.order_no; //返回的订单id
										let counter = response.data.content.counter; //返回的订单个数
										if (orderId) {
											window.location.href = "http://h.huyi.cn/playorder?id=" + orderId + "&price=" + _this.all_price +
												"&token=" + _this.token;
											// _this.$router.push({
											//   path: "/playOrder",
											//   query: {
											//     id: orderId,
											//     price: _this.all_price,
											//     counter: counter
											//   }
											// });
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
						}, 2000);
					}
				}
			},
			//全选大类列表
			checkMore(item){
				//判断大类是否选中
				if(item.checkAll){//如果本身是选中状态
					item.checkAll=false;
					for(let i=0;i<item.list.length;i++){
						let idIndex = this.ids.indexOf(item.list[i].id);
						//去除大类下每个选中项
						this.ids.splice(idIndex,1);
						//总金额计算
						this.all_price -= parseInt(item.list[i].total);
					}
				}else{//如果本身没有选中
					item.checkAll=true;
					for (let i=0;i<item.list.length;i++) {
						let idIndex = this.ids.indexOf(item.list[i].id);
						if (idIndex < 0) {//判断id串中是否已经包含
							//没有包含，添加
							this.ids.push(item.list[i].id);
							//总金额计算
							this.all_price += parseInt(item.list[i].total);
						}
					}
				}
				this.allElection();
			},
			//判断是否全选
			allElection(){
				let len=0;
				for(let i=0;i<this.lists.length;i++){
					for(let j=0;j<this.lists[i].list.length;j++){
						len+=1;
					}
				}
				if(this.ids.length==len){
					this.isAllCheck=true;
				}
			},
			//列表全选
			allCheck(){
				//判断是否全选
				if(this.isAllCheck){//如果已经全选中
					this.isAllCheck=false;//去除全选
					this.ids=[];//清空ids
					//去除大类选中
					for (let i = 0; i < this.lists.length; i++) {
						this.lists[i].checkAll = false;
					}
				}else{//如果没有全部选中
					this.isAllCheck=true;//全部选中
					this.ids=[];//先清空ids
					//重新遍历插入数据，计算价格
					for (let i = 0; i < this.lists.length; i++) {
						this.lists[i].checkAll = true;
						for (let j = 0; j < this.lists[i].list.length; j++) {
							this.ids.push(this.lists[i].list[j].id);
							//this.all_price += parseInt(this.lists[i].list[j].total);
						}
					}
				}
			},
			//编辑
			edit() {
				this.isAllCheck=false;
				if (this.editTxt == "编辑"&&this.status==0) {
					this.editTxt = "完成";
					this.status=1;
					this.ids=[];//清空ids
					//去除大类选中
					for (let i = 0; i < this.lists.length; i++) {
						this.lists[i].checkAll = false;
					}
				} else {//点击完成触发
					this.editTxt = "编辑"
					this.status=0;
					this.all_price=0;
					//this.isAllCheck=true;//全部选中
					this.ids=[];//先清空ids
					//重新遍历插入数据，计算价格
					for (let i = 0; i < this.lists.length; i++) {
						this.lists[i].checkAll = false;
						// for (let j = 0; j < this.lists[i].list.length; j++) {
						// 	this.ids.push(this.lists[i].list[j].id);
						// 	this.all_price += parseInt(this.lists[i].list[j].total);
						// }
					}
				}
			},
			//展开类别明细
			getCategory(id) {
				//控制类别明细的显示隐藏
				if (this.category_detail == id) {
					this.category_detail = 0;
				} else {
					this.category_detail = id;
				}
			},
			//关闭类别明细
			close_detail() {
				this.category_detail = 0;
			},
			//展开金额明细
			getTotal(id) {
				//控制金额明细的显示隐藏
				if (this.price_detail == id) {
					this.price_detail = 0;
				} else {
					this.price_detail = id;
				}
			},
			//删除
			deleteItem(id, total) {
				let _this = this;
				// let idIndex = _this.ids.indexOf(id);
				//判断是否有选中项
				if(_this.ids.length<=0){
					Toast({
						message: "请选择要删除的商品",
						duration: 2000
					});
					return;
				}
				MessageBox.confirm("", {
						message: "确认删除？",
						title: "提示",
						showCancelButton: true
					})
					.then(action => {
						if (action == "confirm") {
							let idStr = _this.ids.join(",");
							//确认的回调
							_this.$axios
								.post("index.php?c=App&a=delWishlist", {
									ids: idStr
								})
								.then(function(response) {
									if (response.data.errcode == 0) {
										Toast({
											message: "删除成功",
											duration: 2000
										});
										//初始化数据
										_this.all_price = 0;
										let form=1;
										_this.init(form);
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
					})
					.catch(err => {
						if (err == "cancel") {
							//取消的回调
						}
					});
			},
			//复选框选中
			checkItem(id, name, total, list) {
				//参数1：列表id，参数2：主体名字，参数3：小计金额
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
				if (idIndex >= 0) {
					//判断id串中是否已经包含
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
				//判断是否单大类全选
				list.checkAll = list.list.every((item, index) => {
					return this.ids.indexOf(item.id) >= 0;
				})
				this.allElection();
			}
		}
	};
</script>
