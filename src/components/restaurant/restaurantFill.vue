<template>
	<div class="restaurantFill fill_information head_box">
		<nav-header title=" " gobackurl="restaurant"></nav-header>
		<div class="con_box containerView-main">
			<div class="list_box">
			  <div class="title">
				  <span class="act_icon active">申请信息</span>
				  <span class="act_icon" @click="goNext()">申请人信息</span>
			  </div>
			  <div class="list_item">
			    <span>申请词</span>
			    <input type="text" readonly="readonly" v-model="text" />
			  </div>
			  <div class="list_item">
			    <span>年限</span>
			    <select v-model="year" @change="choiceYear()">
			      <option
			        :value="index + 1"
			        v-for="(item, index) of 10"
			        :key="index"
			        >{{ item }}</option
			      >
			    </select>
			    <span class="icon_r"></span>
			  </div>
			</div>
		</div>
		<div class="all_prive">
			<div class="all_prive_box">
				<span class="cost_txt">注册费</span>
				<span>{{price}}*{{year}}={{all_price}}</span>
			</div>
		</div>
		<div class="fill_bottom">
		  <div class="bottom_l">
		    <p>总计 :</p>
		    <p class="all_price">￥{{ all_price }}元</p>
		  </div>
		  <div class="bottom_r">
		    <div class="addCard" @click="goNext()">下一步</div>
		  </div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"restaurantFill",
		data() {
			return {
				year: sessionStorage.year?sessionStorage.year:1,
				text:"",
				all_price:sessionStorage.all_price?sessionStorage.all_price:parseFloat(sessionStorage.price),//总费用
				price:parseFloat(sessionStorage.price),//单价
			}
		},
		created(){
			this.text=sessionStorage.domain+".餐厅";
			sessionStorage.year=this.year;
			sessionStorage.all_price=this.all_price;
		},
		methods: {
			//选择年限
			choiceYear() {
				this.all_price = (this.year * this.price);
				sessionStorage.year=this.year;
				sessionStorage.all_price=this.all_price;
			},
			//下一步
			goNext(){
				this.$router.push({
					path:"/applicantFill"
				})
			}
		},
	}
</script>
