<template>
	<div class="fill_information" :class="{'fill_bot' : pageNum == 0 || pageNum == 2}">
		<!-- <nav-header title=" "></nav-header> -->
        <mt-header class="header" fixed>
            <!-- <router-link to="/" slot="left"> -->
            <mt-button slot="left" icon="back" @click="goback(pageNum)"></mt-button>
            <!-- </router-link> -->
            <mt-button slot="right"></mt-button>
        </mt-header>

		<div class="con_box containerView-main">
            <div class="til-word">
                <div class="title" v-show="pageNum == 0 || pageNum == 1" :class="{active : pageNum == 0}">选择年限</div>
                <div class="title" v-show="pageNum == 0 || pageNum == 1" :class="{active : pageNum == 1}">申请主体</div>
                <div class="support-msg" v-show="pageNum == 2" >申请词信息</div>
            </div>

			<div class="list_box" v-if="pageNum == 0">
				<div class="list_item">
					<span>申请词</span>
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
					<span>类别</span>
                    <select v-model="year" @change="choiceYear()">
					  <option :value ="index+1" v-for="(item,index) of 10" :key="index">{{item}}</option>
					</select>
					<span class="icon_r"></span>
				</div>

			</div>
			<div class="list_box" v-if="pageNum == 1">
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
            <div class="apply-word" v-if="pageNum == 2">
                <div class="apply-msg">
                    <div class="msg-top">
                        <div class="msg-list">
                            <i>申请词</i>
                            <span>中国互易.商标</span>
                        </div>
                        <div class="msg-list">
                            <i>年限</i>
                            <span>{{year}}年</span>
                        </div>
                    </div>
                    <div class="msg-bot msg-list">
                        <i>类别</i>
                        <div class="category">
                            <div class="category-list">
                                <p>第11类 家电照明设备</p>
                                <div class="category-small">
                                    <span>舞台灯具</span>
                                    <span>日光灯具</span>
                                    <span>照相用回光灯</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="apply-subject">
                    <div class="subject-word">申请主体</div>
                    <!-- <div v-if="corpname" class="msg-list"> -->
                    <div  class="msg-list">
                        <i>主体名称</i>
                        <span>
                            你好{{corpname}}
                        </span>
                    </div>
                    <!-- <div v-if="data.linkman" class="msg-list"> -->
                    <div class="msg-list">
                        <i>联系人</i>
                        <span>
                            没有{{data.linkman}}
                        </span>
                    </div>
                    <div v-if="data.phone" class="msg-list">
                        <i>联系电话</i>
                        <span>
                            {{data.phone}}
                        </span>
                    </div>
                    <div v-if="data.mobile" class="msg-list">
                        <i>联系电话</i>
                        <span>
                            {{data.mobile}}
                        </span>
                    </div>
                    <div v-if="data.email" class="msg-list">
                        <i>联系邮箱</i>
                        <span>
                            {{data.email}}
                        </span>
                    </div>
                    <div v-if="data.address" class="msg-list">
                        <i>联系地址</i>
                        <span>
                            {{data.address}}
                        </span>
                    </div>

                </div>
            </div>
		</div>
        <div class="money-detail" v-show="pageNum == 0 || pageNum == 2">
            <div class="money-box">
                <div class="detail-list">
                    <span class="detail-left">注册费</span>
                    <span class="detail-right">2800*{{year}}=10000元</span>
                </div>
                <div class="detail-list">
                    <span class="detail-left">审核费</span>
                    <span class="detail-right">{{audit}}元</span>
                </div>
                <div class="detail-list">
                    <span class="detail-left">新增类别费</span>
                    <span class="detail-right">200元</span>
                </div>
            </div>
        </div>
		<div class="fill_bottom">
			<div class="bottom_l">
				<p>总计 :</p>
				<p class="all_price">￥{{totalMoney}}元</p>
			</div>
			<div class="bottom_r">
				<div class="addCard" @click="next(pageNum)" v-show="pageNum == 0 || pageNum == 1">下一步</div>
				<div class="addCard" @click="addShop()" v-show="pageNum == 2">加入清单</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default{
		name:'fill_information',
		data() {
			return {
				text:this.$route.query.keyword,//搜索过来的申请词
				ids:this.$route.query.id, //产品id
				year:1,//年限
				qualifications:[],//资质类型
				qualifications_txt:'',//选中资质类型
				price: 0,//费用
				token:'',
				data:{},//默认第一条主体数据
				some:[],//所有主体数据
				corpname:'',//主题名字
				length:'',
                all_price:0,//总计费用
                pageNum: 0,
                audit: 600,
                product_name: '' //产品名称
			}
		},
		created(){
			this.init();//请求主题数据
			this.intell();//请求资质数据
        },
        computed: {
            totalMoney(){
                var money = this.year*this.price;
                return money;
            }
        },
		methods: {
            // 检测点击浏览器返回键
            myFunction(){
                var str = location.hash.split("#step")[1];
                str ? '' : str = 0;
                // console.log(this.tab.tabIndexState,this.tab.tabIndex)
                // if(this.tab.tabIndexState==4){
                //     this.tab.tabIndexState = 0;
                //     this.tab.tabIndex = 0;
                //     return;
                // }
                if(this.isHashChange && str != this.tab.tabIndexState){
                    if(str < this.tab.tabIndexState){
                        if(this.tab.tabIndexState == 4){
                            this.tab.tabIndexState=0;
                            this.tab.tabIndex=0;
                            location.hash = '#step' + this.tab.tabIndexState;
                        }else{
                            this.lastBtn('isGoBack');
                        }
                    }else{
                        this.nextBtn('isGoBack');
                        this.nextBtnOptional('isGoBack');
                    }
                }else{
                    this.isHashChange = true;
                }
            },
            // 点击返回
            goback(num){
                var _this = this;

                if(num == 0){
                    console.log(22)
                    this.$router.back(-1)
                }else if(num == 1){
                    console.log(55)

                    _this.pageNum = 0;
                }else if(num == 2){
                    console.log(77)

                    _this.pageNum = 1;
                    // _this.getRegist();
                }
            },
            // 下一步
            next(num){
                var _this = this;
                console.log(num)
                if(num == 0){
                    _this.pageNum = 1;
                    _this.getRegist();
                }else if(num == 1){
                    _this.pageNum = 2;
                }
                var str = location.hash.split("#step")[1];
                var url = location.hash;

                    if(str){
                        // location.hash = 
                    }
                location.hash = location.hash +'#step' + num;

            },
			init(){
				if(sessionStorage.token){
					this.token=sessionStorage.token;
                }
                var _this = this;
                var index = this.$route.query.id;

                switch (index) {
                    case 1:
                        _this.product_name = "A类 （商标名）.商标";
                        _this.price = "3800.00";
                        break;
                    case 2:
                        _this.product_name = "B类 （商标名+商品/服务名）.商标";
                        _this.price = "2800.00";
                        break;
                    case 8:
                        _this.product_name = "C类（指定地+商标名）.商标";
                        _this.price = "2800.00";
                        break;
                    case 10:
                        _this.product_name = "D类 （指定地+商标名+商品/服务项目名）.商标";
                        _this.price = "2800.00";
                        break;
                }
				
            },
            // 获取主体
            getRegist(){
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
                // 还要算上类别费
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

<style scoped lang="scss">
.til-word{
    display: flex;
    align-items: center;
    padding-top: 0.32rem;
    .title{
        font-size: 0.26rem;
        color: #6F7181;
        padding-right: 0.52rem;
    }
    .active{
        color: #2C3852;
        font-size: 0.44rem;
    }
}
.support-msg{
    font-size: 0.36rem;
    color: #2C3852;
}
.apply-word{
    .apply-msg{
        padding: 0.2rem 0;
        border-bottom: 1px solid #eee;
        .msg-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .msg-list{
                width: 50%;
                border-right: 1px solid #eee;
                margin-bottom: 0;
                &:last-child{
                    border: none;
                    margin-left: 4%;
                }
            }

        }
        .msg-bot{
            margin-bottom: 0;
            .category{
                .category-list{
                    padding-bottom: 0.26rem;
                    p{
                        padding-bottom: 0.2rem;
                        color: #333;
                        font-size: 0.3rem;
                    }
                    .category-small{
                        span{
                            color: #686D7F;
                            font-size: 0.24rem;
                            background: #F7F7F7;
                            border-radius: 0.5rem;
                            padding: 0.08rem 0.3rem;
                            margin-right: 0.5rem;
                            margin-bottom: 0.2rem;
                        }
                    }
                }
            }
        }
    }
    .apply-subject{
        padding: 0.2rem 0;
        border-bottom: 1px solid #eee;
        .subject-word{
            font-size: 0.36rem;
            color: #2C3852;
        }
    }
    .msg-list{
        margin: 0.2rem 0;
        i{
            display: block;
            font-style: inherit;
            font-size: 0.24rem;
            color: #999;
            margin-bottom: 0.1rem;
        }
        span{
            font-size: 0.3rem;
            color: #2C3852;
        }
    }
}
.money-detail{
    position: fixed;
    bottom: 1.5rem;
    width: 100%;
    padding: 0.32rem;
    background: #fff;
    .money-box{
        background: #F7F7F7;
        border-radius: 0.18rem;
        padding: 0.28rem 0.3rem;

        .detail-list{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #686D7F;
            .detail-left{
                position: relative;
                padding-left: 0.12rem;
                &::after{
                    content: '';
                    display: inline-block;
                    background: #686D7F;
                    width: 0.08rem;
                    height: 0.08rem;
                    border-radius: 5rem;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .detail-right{
    
            }
        }
    }
}
</style>

