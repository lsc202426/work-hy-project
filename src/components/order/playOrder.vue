<template>
  <div class="play-order">
    <!-- head -->
    <nav-header title="支付订单"></nav-header>
    <div class="containerView-main">
      <div class="play-order-title">
        <div class="order-id">
          <p>订单号：{{ orderId }}</p>
          <a href="javascript:void(0);" @click.stop="viewDetail">查看详情</a>
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
              <span :class="{ active: isShow }" @click="switchMenu">转账</span>
              <span :class="{ active: !isShow }" @click="switchMenu">支票</span>
            </div>
            <div class="content">
              <div class="conetnt-item content-outline" v-show="isShow">
                <p class="tips">请将注册款汇入以下账户并上传汇款凭证</p>
                <p class="infor">户名：{{ bankInfo.accountname }}</p>
                <p class="infor">账户：{{ bankInfo.bankaccount }}</p>
                <p class="infor">开户行：{{ bankInfo.bankname }}</p>
              </div>
              <div class="conetnt-item content-play" v-show="!isShow">
                支票
              </div>
            </div>
          </div>
        </div>
        <div class="play-order-btn">
          <button @click="playNow">立即支付</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
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
      orderId: this.$route.query.id,
      allPrice: this.$route.query.price,
      PlayType: 1,
      bankInfo: {}
    };
  },
  methods: {
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
            access_token: sessionStorage.getItem("token"),
            order_no: that.orderId
          })
          .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
              that.bankInfo = _data.content;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 查看详情
    viewDetail: function() {
      this.$router.push({
        path: "/orderdetails",
        query: { id: this.orderId }
      });
    },
    // 立即支付
    playNow: function() {
      console.log(this.PlayType);
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=payOrderByH5", {
          access_token: sessionStorage.getItem("token"),
          order_no: that.orderId,
          paytype: that.PlayType
        })
        .then(function(response) {
          console.log(response);
          let _data = response.data;
          if (parseInt(_data.errcode) === 10003) {
            Toast({
              message: _data.errmsg,
              duration: 1500,
              position: "bottom"
            });
          }
          if (_data.errcode === 0) {

            // 微信支付
            if (that.PlayType === 1) {
              let el = document.createElement("a");
              document.body.appendChild(el);
              el.href = response.data.content.mweb_url;
              el.target = "_new"; //指定在新窗口打开
              el.click();
              document.body.removeChild(el);
            } else if (that.PlayType === 2) {
              const div = document.createElement("divform");
              div.innerHTML = response.data.content.orderString;
              document.body.appendChild(div);
              // document.forms[0].acceptCharset = "GBK";
              //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
              document.forms[0].submit();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.hr{
  height: 0.2rem;
  background: #f1f1f1;
}
.play-order{
  background: none;
}
</style>

