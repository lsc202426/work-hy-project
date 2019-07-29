<template>
  <div class="play-order">
    <!-- head -->
    <mt-header title="支付订单" class="header" fixed>
      <mt-button slot="left" icon="back" @click.stop="viewOrderList"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="containerView-main">
      <div class="play-order-title" v-if="counter == 1">
        <div class="order-id">
          <p>订单号：{{ orderId }}</p>
          <a href="javascript:void(0);" @click.stop="viewDetail">查看详情</a>
        </div>
        <span class="allprice">￥{{ allPrice }}元</span>
      </div>
      <div v-else class="play-order-title">
        <div class="order-id">
          <p>如需查看订单，请前往</p>
          <a href="javascript:void(0);" class="blue" @click.stop="viewOrderList"
            >订单列表</a
          >
        </div>
        <span class="allprice">￥{{ allPrice }}元</span>
      </div>
      <div class="hr"></div>
      <div class="play-order-box">
        <div class="play-order-list">
          <h2 class="play-order-list-title">请选择支付方式</h2>
          <div
            class="play-order-list-item"
            v-for="(item, index) of list"
            :key="index"
            @click="switchPlay(index)"
          >
            <div class="left">
              <img :src="item.img" />
              <label>{{ item.text }}</label>
            </div>
            <div class="right" :class="{ active: item.isSelected }"></div>
          </div>
        </div>
        <div class="play-order-main" v-show="list[2].isSelected">
          <div class="play-order-main-outline">
            <div class="menu">
              <span :class="{ active: isShow }">转账</span>
              <!-- <span :class="{ active: !isShow }" @click="switchMenu">支票</span> -->
            </div>
            <div class="content">
              <div class="conetnt-item content-outline" v-show="isShow">
                <p class="tips">请将注册款汇入以下账户并上传汇款凭证</p>
                <p class="infor">户名：{{ bankInfo.accountname }}</p>
                <p class="infor">账户：{{ bankInfo.bankaccount }}</p>
                <p class="infor">开户行：{{ bankInfo.bankname }}</p>
              </div>
              <!-- <div class="conetnt-item content-play" v-show="!isShow">
                支票
              </div> -->
            </div>
          </div>
        </div>
        <div class="play-order-btn">
          <button @click="playNow">立即支付</button>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="play_mask" v-show="play_mask">
      <div class="play_mask_bg"></div>
      <div class="play_mask_con">
        <p class="title">请确认支付是否已完成</p>
        <p @click="goPlaySuccess()" class="red">已完成支付</p>
        <p @click="playAgain()">支付遇到问题，重新支付</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      list: [
        {
          img: require("@/assets/images/common/icon-weixin.png"),
          text: "微信",
          isSelected: true
        },
        {
          img: require("@/assets/images/common/icon-zhifubao.png"),
          text: "支付宝",
          isSelected: false
        },
        {
          img: require("@/assets/images/common/icon-outline.png"),
          text: "线下支付",
          isSelected: false
        }
      ],
      isShow: true,
      orderId: this.$route.query.id, //订单id
      allPrice: this.$route.query.price, //订单金额
      counter: this.$route.query.counter?this.$route.query.counter:1, //订单数量
      PlayType: localStorage.PlayType?localStorage.PlayType:1,
      bankInfo: {},
      play_mask: false,
      out_order_no: "", //微信或支付宝支付返回订单号
      pay_id: "" ,//线下支付
			paystatus:0,
			token:'',
			url:''
    };
  },
	created(){
		let _this=this;
		_this.url=window.location.hash;
		if(_this.$route.query.token){
			sessionStorage.token=_this.$route.query.token;
			// let order_id=_this.$route.query.id;
			// _this.$router.push({
			//   path: "/playOrder",
			//   query: {
			//     id: order_id,
			// 		price:_this.$route.query.price,
			// 		counter:_this.counter
			//   }
			// });
		}
		//判断是否是从别的页面进来
		if(localStorage.playState){
			if(localStorage.payMade){
				_this.play_mask=true;
				//查询支付状态
				_this.$axios
				  .post("index.php?c=App&a=payOrderQuery", {
				    out_order_no: localStorage.payMade
				  })
				  .then(function(response) {
				    if (response.data.errcode == 0) {
							_this.paystatus=response.data.content.paystatus;
				    }
				  });
			}else{
				_this.play_mask=false;
			}
			if(localStorage.PlayType){
				_this.switchPlay(localStorage.PlayType-1);
			}
		}
		//window.location.href="http://h.huyi.cn/#/playorder?id="+_this.orderId+"&price="+_this.allPrice;
	},
	mounted() {
	    if (window.history && window.history.pushState) {
	        // 向历史记录中插入了当前页
	        history.pushState(null, null, document.URL);
	        window.addEventListener('popstate', this.viewOrderList, false);
	    }
	},
	destroyed() {
	    window.removeEventListener('popstate', this.viewOrderList, false);
	},
  methods: {
		//返回
		goback(){
			
		},
    //线下支付菜单切换
    switchMenu: function() {
      this.isShow = !this.isShow;
    },
    // 切换选择支付方式
    switchPlay: function(index) {
      const that = this;
      that.PlayType = index + 1;
      for (let i = 0; i < that.list.length; i++) {
        that.list[i].isSelected = false;
      }
      that.list[index].isSelected = true;
      // 微信
      // 支付宝
      // 线下支付
      if (index === 2) {
        // 获取线下支付银行账号
        const that = this;
        that.$axios
          .post("/index.php?c=App&a=getBanks", {
            order_no: that.orderId
          })
          .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
              that.bankInfo = _data.content;
            }
          })
          .catch(function(error) {});
      }
    },
    // 查看详情
    viewDetail: function() {
			let _this=this;
			localStorage.removeItem('payMade');
			localStorage.removeItem('PlayType');
			window.location.href="http://品牌.互易.商标/orderdetails?id="+_this.orderId+"&token="+sessionStorage.token;
      // this.$router.push({
      //   path: "/orderdetails",
      //   query: {
      //     id: this.orderId
      //   }
      // });
    },
    //跳转订单列表
    viewOrderList: function() {
			let _this=this;
			localStorage.removeItem('payMade');
			localStorage.removeItem('PlayType');
			window.location.href="http://品牌.互易.商标/orderList?token="+sessionStorage.token;
      // this.$router.push({
      //   path: "/orderList"
      // });
    },
    // 立即支付
    playNow: function() {
      const that = this;
			//判断是否已经支付过
			/*if(sessionStorage.payMade){
				//查询支付状态
				that.$axios
				  .post("index.php?c=App&a=payOrderQuery", {
				    out_order_no: sessionStorage.payMade
				  })
				  .then(function(response) {
				    if (response.data.errcode == 0) {
				      if (response.data.content.paystatus == 1) {
				        //支付成功
				        Toast({
				          message: "该订单已完成支付",
				          duration: 2000
				        });
								return;
				      }
				    }
				  });
			}*/
			if(that.paystatus==1){
				Toast({
				  message: "该订单已完成支付,请前往订单列表查看",
				  duration: 2000
				});
				return;
			}
			
			// if(sessionStorage.PlayType){
			// 	that.PlayType=sessionStorage.PlayType;
			// }
			
			Indicator.open({
			  text: "正在支付中...",
			  spinnerType: "fading-circle"
			});
      setTimeout(function() {
        that.$axios
          .post("/index.php?c=App&a=payOrderByH5", {
            order_no: that.orderId,
            paytype: that.PlayType
          })
          .then(function(response) {
            let _data = response.data;
            if (parseInt(_data.errcode) === 10003) {
              Toast({
                message: _data.errmsg,
                duration: 1500
              });
            }
            if (_data.errcode === 0) {
              Indicator.close();
              //显示遮罩层
              if (that.PlayType == "1" || that.PlayType == "2") {
                that.play_mask = true;
              }
							localStorage.PlayType=that.PlayType;//支付种类
							localStorage.playState=1;//用于判断二次进入
              if (_data.content.out_order_no) {
                that.out_order_no = _data.content.out_order_no;
								localStorage.payMade=that.out_order_no;//用于查询支付状态
              } else if (_data.content.pay_id) {
                that.pay_id = _data.content.pay_id;
								localStorage.payMade=that.pay_id;//用于查询支付状态
              }
              // 微信支付
              if (that.PlayType == 1) {
                let el = document.createElement("a");
                document.body.appendChild(el);
                el.href = response.data.content.mweb_url;
                //el.target = "_new"; //指定在新窗口打开
                setTimeout(function(){
									el.click();
									document.body.removeChild(el);
								},50);
              } else if (that.PlayType == 2) {
                const div = document.createElement("divform");
                div.innerHTML = response.data.content.orderString;
                document.body.appendChild(div);
                // document.forms[0].acceptCharset = "GBK";
                //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
                document.forms[0].submit();
              } else if (that.PlayType === 3) {
								localStorage.removeItem('payMade');
								localStorage.removeItem('PlayType');
								window.location.href="http://品牌.互易.商标/uploadD?ids="+that.pay_id+"&token="+sessionStorage.token+"&order="+that.orderId;
                // that.$router.push({
                //   path: "/uploadD",
                //   query: {
                //     ids: that.pay_id,
                //     order: that.orderId
                //   }
                // });
              }
            } else {
              Toast({
                message: _data.errmsg,
                duration: 1500
              });
            }
          })
          .catch(function(error) {
            Indicator.close();
            Toast({
              message: error.data.errmsg,
              duration: 1500
            });
          });
      }, 2000);
    },
    //跳转支付完成页面
    goPlaySuccess() {
      let that = this;
      var order_id;
      if (that.out_order_no && that.out_order_no!="") {
        order_id = that.out_order_no;
      } else if (that.pay_id) {
        order_id = that.pay_id;
      }else{
				order_id=localStorage.payMade;
			}
			localStorage.removeItem('payMade');
			localStorage.removeItem('PlayType');
      //that.play_mask = false;
			window.location.href="http://品牌.互易.商标/playSuccess?out_order_no="+order_id+"&token="+sessionStorage.token;
      // that.$router.push({
      //   path: "/playSuccess",
      //   query: {
      //     out_order_no: order_id
      //   }
      // });
    },
    // 重新支付
    playAgain: function() {
      this.play_mask = false;
			localStorage.removeItem('payMade');
			localStorage.removeItem('PlayType');
      this.playNow();
    }
  }
};
</script>
<style scoped lang="scss">
.hr {
  height: 0.2rem;
  background: #f1f1f1;
}

.play-order {
  background: none;
}
</style>
