<template>
	<div class="recruit">
		<!-- 头部 -->
		<div class="recruit_top">
			<div class="recruit_bg"></div>
			<div class="top_title">
				<span></span>
				点招聘
			</div>
			<div class="search">
				<div class="search_box">
					<div class="input_b">
						<input type="text" v-model.trim="search_txt" placeholder="请输入品牌名称" id="search">
						<span v-show="!search_txt">例：互易</span>
					</div>
					<div class="button_b" @click="search()">
						<div class="button_bg"></div>
						<img src="../../assets/images/recruit/icon_search.png" alt="">
						<span>搜索</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 搜索展示内容 -->
		<div class="content" v-if="possible">
			<div class="content_list" v-if="possible_t">
				<div class="list_left">
					<div class="list_name">
						<span class="name_blue">{{search_txt}}</span>.招聘
						<span class="can_or_not">{{recruit1}}</span>
					</div>
					<div class="pirce">￥{{price}}元/年</div>
				</div>
				<div class="list_right">
					<span>加入清单</span>
				</div>
			</div>
			<div class="content_list" v-else>
				<div class="list_left">
					<div class="list_name">
						<span class="name_blue">{{search_txt}}</span>.招聘
						<span class="can_or_not not">{{recruit}}</span>
					</div>
					<div class="pirce">￥{{price}}元/年</div>
				</div>
			</div>
		</div>
		<!-- 流程 -->
		<div class="process">
			<img src="../../assets/images/recruit/process_bg.png" class="process_img" alt="">
		</div>
		<!-- 关于点招聘 -->
		<div class="process_b">
			<div class="title">关于点招聘</div>
			<div class="process_txt">
				“.招聘”的目标是为中国和全球中文社群的企业和机构提
				供一个与人力资源和招聘相关的专属域名。我们将致力
				于让“.招聘”成为全球中文互联网用户搜索招聘信息和投
				递简历的首选域名，以及最值得信赖、可放心使用的域
				名。我们将制定缜密的政策规则，防范抢注、商标侵权
				等恶意行为。
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default {
		name: 'recruit',
		data() {
			return {
				search_txt: '',
				reg:'',
				price:'',
				recruit:'已注册',
				recruit1:'可注册',
				possible:false,
				possible_t:false
			}
		},
		created() {

		},
		methods: {
			search() {
				let _this = this;
				_this.$axios
					.post("index.php?c=App&a=searchDomain", {
						userid: 1,
						mark: "dzp",
						domain:_this.search_txt,
						st:1
					})
					.then(function(response) {
						console.log(response);
						if (response.data.errcode == 0) {
							_this.reg=response.data.content.reg;
							_this.price=response.data.content.price;
							_this.possible=true;//显示查询结果
							if(_this.reg==1){
								_this.possible_t=true;
							}else{
								_this.possible_t=false;
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
							message: error.data.errmsg,
							duration: 3000
						});
					});
			}
		},
	}
</script>
