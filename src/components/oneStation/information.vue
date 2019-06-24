<template>
	<div class="fill_information">
		<nav-header title=" "></nav-header>
		<div class="con_box containerView-main">
			<div class="list_box">
				<div class="list_item list_service">
					<span>选择的服务</span>{{title}}
				</div>
			</div>
			<div class="list_box">
				<div class="title">申请主体</div>
				<div class="list_item">
					<span>主体名称</span>
					<select v-model="corpname" @change="choiceCorpname()">
					    <option :value="item.corpname" v-for="(item,index) in some" :key="item.corpid">{{item.corpname}}</option>
					</select>
					<span class="icon_r"></span>
				</div>
				<div class="list_item">
					<span>联系人</span>
					<input type="text" readonly="readonly" v-model="data.linkman">
				</div>
				<div class="list_item">
					<span>联系电话</span>
					<input type="text" readonly="readonly" v-if="data.phone" v-model="data.phone">
					<input type="text" readonly="readonly" v-else v-model="data.mobile">
				</div>
				<div class="list_item">
					<span>联系邮箱</span>
					<input type="text" readonly="readonly" v-model="data.email">
				</div>
				<div class="list_item">
					<span>详细地址</span>
					<input type="text" readonly="readonly" v-model="data.address">
				</div>
			</div>
		</div>
		<div class="fill_bottom">
			<div class="bottom_l">
				<p>总计 :</p>
				<p class="all_price">￥{{all_price}}元</p>
			</div>
			<div class="bottom_r">
				<div class="addCard" @click="addCard()">加入清单</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from "mint-ui";
	export default{
		name:'fill_information',
		data() {
			return {
				token:'',
				data:{},//默认第一条主体数据
				some:[],//所有主体数据
				corpname:'',//主题名字
				length:'',
				price:this.$route.query.price,//单价
				all_price:'',//总计费用
				title:this.$route.query.title,//选择的服务
				id:this.$route.query.id,//服务id
				fee_verify:this.$route.query.fee_verify,//审核费
				mark:this.$route.query.mark,//类型
				msg:{},//加入清单提交内容
			}
		},
		created(){
			this.init();//请求主题数据
		},
		methods: {
			init(){
				if(sessionStorage.token){
					this.token=sessionStorage.token;
				}
				let _this=this;
				_this.all_price=(this.price*1+_this.fee_verify*1).toFixed(2);//总价
				_this.$axios
				  .post("index.php?c=App&a=getRegisterSubject", {
					  access_token:_this.token
				  })
				  .then(function(response) {
					  console.log(response);
				    if (response.data.errcode == 0) {
						_this.some=response.data.content;
						_this.length=_this.some.length;//总共有多少条主题信息
						_this.data=_this.some[0];//默认赋值第一条
						_this.corpname=_this.some[0].corpname;//默认赋值第一个主体信息
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
			},
			//修改主体信息
			choiceCorpname(){
				let _this=this;
				for(let i=0;i<_this.length;i++){
					//判断选中第几条主体信息，更改data内容
					if(_this.corpname==_this.some[i].corpname){
						_this.data=_this.some[i];
					}
				}
			},
			//加入清单
			addCard(){
				let _this=this;
				console.log(_this.data);
				if(this.token){
					setTimeout(function(){
						Indicator.open({
							text: '正在提交',
							spinnerType: 'fading-circle'
						});
					},10);
					_this.msg.productid=_this.id;//产品id
					_this.msg.product_name=_this.title;//产品名称
					_this.msg.feetype='Z';//服务类型
					_this.msg.year=1;//年限
					_this.msg.price=_this.price;//单价
					_this.msg.total=_this.all_price;//总价
					_this.msg.subject={};//主体信息
					_this.msg.subject.id=_this.data.corpid;//主体id
					_this.msg.subject.name=_this.data.corpname;//名字
					_this.msg.subject.linkman=_this.data.linkman;//联系人
					_this.msg.subject.phone=_this.data.phone?_this.data.phone:_this.data.mobile;//联系电话
					_this.msg.subject.email=_this.data.email;//邮箱
					_this.msg.subject.address=_this.data.address;//地址
					//提交数据
					_this.$axios
					  .post("index.php?c=App&a=setWishlist",{
						  access_token:_this.token,
						  data:JSON.stringify(_this.msg)
					  })
					  .then(function(response) {
						setTimeout(function(){
							Indicator.close();
						},10);
					    if (response.data.errcode == 0) {
							Toast({
								message: response.data.errmsg,
								duration: 1000
							});
							setTimeout(function(){
								//请求成功跳转清单列表页
								_this.$router.push({
									path: '/shoppingCart'
								});
							},1000)
					    }else{
							Toast({
								message: response.data.errmsg,
								duration: 1500
							});
						}
					  })
					  .catch(function(error) {
						setTimeout(function(){
							Indicator.close();
						},10);
					    Toast({
					      message: error.data.errmsg,
					      duration: 3000
					    });
					  });
				}
			}
		}
	}
</script>

