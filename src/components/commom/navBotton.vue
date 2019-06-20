<template>
	<div class="nav_botton">
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="index" @click.native="toggleTab('C')">
				<img slot="icon" src="../../assets/images/navBotton/icon_index1.png" v-show="s.isC">
				<img slot="icon" src="../../assets/images/navBotton/icon_index2.png" v-show="!s.isC">
				首页
			</mt-tab-item>
			<mt-tab-item id="find" @click.native="toggleTab('R')">
				<img slot="icon" src="../../assets/images/navBotton/icon_look1.png" v-show="s.isR">
				<img slot="icon" src="../../assets/images/navBotton/icon_look2.png" v-show="!s.isR">
				发现
			</mt-tab-item>
			<mt-tab-item id="information" @click.native="toggleTab('D')">
				<img slot="icon" src="../../assets/images/navBotton/icon_mail1.png" v-show="s.isD">
				<img slot="icon" src="../../assets/images/navBotton/icon_mail2.png" v-show="!s.isD">
				消息
			</mt-tab-item>
			<mt-tab-item id="me" @click.native="toggleTab('S')">
				<img slot="icon" src="../../assets/images/navBotton/icon_me1.png" v-show="s.isS">
				<img slot="icon" src="../../assets/images/navBotton/icon_me2.png" v-show="!s.isS">
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				s: { //分别对应四个 tab
					isC: !1,
					isR: !0,
					isD: !0,
					isS: !0
				},
				selected: 'index',
			}
		},
		created() {

		},
		methods: {
			clear: function(state) { //清空状态
				for (var k in this.s)
					this.$set(this.s, k, !0);
			},
			toggleTab: function(state) { //更换图标
				this.clear(state); // 选中前先重置其他tab
				if (this.s["is" + state]) //如果没有选中则取反显示
					this.$set(this.s, ["is" + state], !1);
					console.log(state)
				if (state == "D") {
					this.$router.push({
						path: "/message",
						name: "message",
					});
				}else if(state == "S"){
					this.$router.push({
						path: "/user",
						name: "user",
					});
				}else if(state == "R"){
					
				}else{
					
				}
			}
		}
	}
</script>

<style>
	.mint-tabbar .mint-tab-item-label {
		font-size: 0.2rem;
		line-height: 0.28rem;
	}
	.mint-tabbar .mint-tab-item-icon {
		width: 0.44rem;
		height: 0.4rem;
		margin:0 auto 5px;
	}
	.mint-tabbar .mint-tab-item-icon img{
		height:auto;
	}
	.nav_botton .mint-tabbar > .mint-tab-item.is-selected{
		background-color:#fff;
	}
	.nav_botton .mint-tabbar{
		background-color:#fff;
		border-top:1px solid #D3D5D8;
	}
	.nav_botton .mint-tab-item{
		padding:9px 0 5px 0;
	}
</style>
