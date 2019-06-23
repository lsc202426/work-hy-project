<template>
	<div class="oneStation">
		<mt-header title="一站通" class="header" fixed>
		  <router-link to="" slot="left">
		    <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
		  </router-link>
		</mt-header>
		<!-- 产品内容 -->
		<div class="content_list" v-for="(list,index) in lists" :key="index" @click="goDetail(list.fee_verify,list.id,list.price,list.title,list.mark)">
			<div class="list_item">
				<img :src="list.src" alt="">
				<div class="text_box">
					<p class="title">{{list.title}}</p>
					<p class="text">{{list.summary}}</p>
					<p class="detail">详细了解</p>
				</div>
			</div>
		</div>
		<!-- 更多服务 -->
		<div class="more">
			<div class="title">更多服务</div>
			<p>电话：020-62944051</p>
			<p>网站：http://一站通.商标</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default{
		name:'oneStation',
		data() {
			return {
				lists:[],//产品列表
				// src:require("@/assets/images/oneStation/list_bg1.png"),
			}
		},
		created(){
			this.init();
		},
		methods: {
			init() {
				let _this=this;
				_this.$axios
				  .post("index.php?c=App&a=getProducts",{
					  mark:"ecweb",
					  p:1
				  })
				  .then(function(response) {
					  console.log(response);
				    if (response.data.errcode == 0) {
						_this.lists=response.data.content.list[0].list;
						//给每一项添加图片路径
						for(let i=0;i<_this.lists.length;i++){
							_this.lists[i].src=require('@/assets/images/oneStation/list_bg'+(i+1)+'.png');
						}
				    }else{
						Toast({
							message: response.data.errmsg,
							duration: 3000
						});
					}
				  })
				  .catch(function(error) {
				    Toast({
				      message: "网络异常，请稍后再试",
				      duration: 3000
				    });
				  });
			},
			goDetail(fee_verify,id,price,title,mark){//审核费、产品id、单价、标题、产品类型
				if(mark){
					switch (title){
						case '品牌官网':
							this.$router.push({
								//跳转品牌官网
								path: "/website",
								query: {
									mark: mark,
									fee_verify:fee_verify,
									id:id,
									price:price,
									title:title
								}
							});
							break;
						case '品牌网店':
							this.$router.push({
								//跳转品牌官网
								path: "/shop",
								query: {
									mark: mark,
									fee_verify:fee_verify,
									id:id,
									price:price,
									title:title
								}
							});
							break;
						case '小程序网店':
							this.$router.push({
								//跳转品牌官网
								path: "/smallProcedures",
								query: {
									mark: mark,
									fee_verify:fee_verify,
									id:id,
									price:price,
									title:title
								}
							});
							break;
						default:
							break;
					}
				}
			}
		},
	}
</script>
