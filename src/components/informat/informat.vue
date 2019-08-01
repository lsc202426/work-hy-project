<template>
	<div class="informat">
		<!-- head -->
		<!-- <nav-header title="资讯"></nav-header> -->
		<mt-header title="资讯" class="header f_bdn" fixed>
			<mt-button slot="left"></mt-button>
			<mt-button slot="right"></mt-button>
		</mt-header>
		<div class="informat-box containerView-main" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading"
		 infinite-scroll-distance="10">
			<div class="informat-list" v-if="contArr&&contArr.length>0" v-for="item in contArr" @click="urlGo(item.url, item.id)"
			 :key="item.id">
				<div v-if="item.show_type=='left'" v-for="list in item.imgs" class="bg-left bg-right">
					<img :src="'http://oapi.huyi.cn:6180/' + list " alt="">
				</div>
				<div class="cont_list" :class="{leftOr:item.show_type!='bottom'}">
					<p class="title">{{ item.title }}</p>
					<div class="img_list" :class="{iamges:item.imgs.length>1}">
						<div class="img_item" v-if="item.show_type=='bottom'&&list" v-for="list in item.imgs">
							<img :src="'http://oapi.huyi.cn:6180/' + list " alt="">
						</div>
					</div>
					<!-- <div class="bottom">
						<span>出自：{{ item.src }}</span>
						<div class="bot-right">
							<span class="date">{{ item.time }}</span>
						</div>
					</div> -->
				</div>
				<div v-if="item.show_type=='right'" v-for="list in item.imgs" class="bg-left">
					<img :src="'http://oapi.huyi.cn:6180/' + list " alt="">
				</div>
			</div>
			<!-- 暂无数据 -->
			<blankPage v-else></blankPage>
			<!-- 加载更多 -->
			<div class="load-more" v-show="moreLoading || allLoaded">
				<p v-show="moreLoading" class="load-more-loading">
					<mt-spinner type="fading-circle"></mt-spinner>
				</p>
				<p class="load-more-no" v-show="allLoaded">已加载全部</p>
			</div>
		</div>
		<nav-botton></nav-botton>
	</div>
</template>

<script>
	import blankPage from "@/components/order/blankPage.vue";
	import * as GetterTypes from "@/constants/GetterTypes";
	import * as MutationTypes from "@/constants/MutationTypes";
	import { mapGetters, mapMutations } from "vuex";
	export default {
		name: "informat",
		data() {
			return {
				bg: require("@/assets/images/user/capiral.png"),
				contArr: [],
				// 当前分页
				page: 1,
				// 是否加载更多加载中
				moreLoading: false,
				// 是否已加载全部
				allLoaded: false
			};
		},
		components: {
			blankPage
		},
		created() {
			this.getMsg(this.page);
		},
		methods: {
			// 点击跳转
			urlGo(url, ids) {
				this.$axios
					.post("index.php?c=App&a=setViews", {
						id: ids
					})
					.then(function(response) {
						if (url) {
							location.href = url;
						} else {
							this.$router.push({
								path: "/informatDetail",
								query: {
									id: id
								}
							})
						}
					})
					.catch(function(error) {});
			},
			getMsg(page) {
				let _this = this;
				this.$axios
					.post("index.php?c=App&a=getNews", )
					.then(function(response) {
						// 关闭加载更多
						_this.moreLoading = false;
						if (page <= 1) {
							_this.contArr = response.data.content.list;
						} else {
							for (let i = 0; i < _this.data.content.list.length; i++) {
								_this.contArr.push(response.data.content.list[i]);
							}
						}
						if (_this.contArr && _this.contArr.length > 0) {
							//判断是否加载完了
							if (response.data.content.counter < response.data.content.pgsize) {
								_this.allLoaded = true;
							}
						}
						// _this.contArr = response.data.content.list;
					})
					.catch(function(error) {});
			},
			// 加载更多
			loadMore: function() {
				const that = this;
				if (
					that.moreLoading === false &&
					that.allLoaded === false &&
					that.contArr &&
					that.contArr.length > 0
				) {
					that.moreLoading = true;
					setTimeout(function() {
						that.page = that.page + 1;
						that.getMsg(that.page);
					}, 2500);
				}
			}
		},
		watch: {
			getIsSelect: function() {
				this.contArr = [];
				this.page = 1;
				this.allLoaded = false;
				this.moreLoading = false;
				this.getMsg(this.page);
			}
		},
		computed: {
			...mapGetters([
				[GetterTypes.GET_IS_SELECT]
			]),
			...mapGetters({
				getIsSelect: [GetterTypes.GET_IS_SELECT]
			})
		},
	};
</script>
