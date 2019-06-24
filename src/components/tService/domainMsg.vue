<template>
	<div class="fill_information">
		<nav-header title=" "></nav-header>
		<div class="con_box containerView-main">
			<div class="list_box">
				<div class="title">选择年限</div>
				<div class="list_item">
					<span>注册词</span>
					<input type="text" readonly="readonly" v-model="text">
				</div>
				<div class="list_item">
					<span>年限</span>
					<select v-model="year" @change="choiceYear()">
					  <option :value ="index+1" v-for="(item,index) of 10" :key="index">{{item}}</option>
					</select>
					<span class="icon_r"></span>
				</div>
				
				<div class="list_item">
					<span>注册费用</span>
          <span>￥{{price}}</span>
					
					<!-- <input type="text" v-model="price"> -->
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
			<div class="bottom_r" @click="addCard()">
				<div class="addCard">加入清单</div>
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
				text:this.$route.query.name,//搜索过来的名字
				year:1,//年限
				qualifications:[],//资质类型
				qualifications_txt:'',//选中资质类型
				price:this.$route.query.price,//费用
				token:'',
				data:{},//默认第一条主体数据
				some:[],//所有主体数据
				corpname:'',//主题名字
				length:'',
				all_price:this.$route.query.price,//总计费用
				msg:{},//加入清单提交内容
				product_name:this.$route.query.product_name,//产品名称
				productid:this.$route.query.productid//产品id

			}
		},
		created(){
			this.init();//请求主题数据
			this.intell();//请求资质数据
		},
		methods: {
			// 加入清单
			addCard(){
				let _this=this;
				if(this.token){
					setTimeout(function(){
						Indicator.open({
							text: '正在提交',
							spinnerType: 'fading-circle'
						});
					},10);
					_this.msg.productid=_this.productid;//产品id
					_this.msg.product_name=_this.product_name;//产品名称
					_this.msg.keyword=_this.text;//申请词
					_this.msg.year=1;//年限
					_this.msg.feetype='Z';//服务类型
					// _this.msg.params_type=_this.qualifications_txt;//资质类型
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
				
			},
			init(){
				if(sessionStorage.token){
					this.token=sessionStorage.token;
				}
				let _this=this;
				_this.$axios
				  .post("index.php?c=App&a=getRegisterSubject", {
					  access_token:_this.token
				  })
				  .then(function(response) {
					  // console.log(response);
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
				      message: "网络异常，请稍后再试",
				      duration: 3000
				    });
				  });
			},
			//修改年限
			choiceYear(){
				this.all_price=this.year*this.price;
				// console.log(this.year);
			},
			//修改资质类型
			choiceQuali(){
				//console.log(this.qualifications_txt);
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
			intell(){
				let _this=this;
				_this.$axios
				  .get("index.php?c=App&a=getDzpType")
				  .then(function(response) {
					// console.log(response);
				    if (response.data.errcode == 0) {
						_this.qualifications=response.data.content;
						_this.qualifications_txt=_this.qualifications[0].name;//默认选中第一个
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
			}
		},
	}
</script>

