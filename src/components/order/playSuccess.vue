<template>
  <div class="public play-success">
    <nav-header title="支付订单" gobackurl="/orderlist"></nav-header>
    <div class="public-main">
      <div class="public-main-item">
        <img
          v-if="play_state"
          class="public-main-img"
          src="@/assets/images/common/success.png"
        />
        <img
          v-else
          class="public-main-img"
          src="@/assets/images/common/success.png"
        />
        <p class="public-main-text">{{ play_stateName }}</p>
        <button class="public-main-btn" @click="seeOrder()">查看订单</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      out_order_no: this.$route.query.out_order_no,
      play_state: false, //支付状态
      play_stateName: "" //支付状态名
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      _this.$axios
        .post("index.php?c=App&a=payOrderQuery", {
          out_order_no: _this.out_order_no
        })
        .then(function(response) {
          
          if (response.data.errcode == 0) {
            if (response.data.content.paystatus == 1) {
              //支付成功
              _this.play_state = true;
            } else {
              _this.play_state = false;
            }
            _this.play_stateName = response.data.content.paystatus_name;
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 2000
            });
          }
        });
    },
    seeOrder() {
      this.$router.push({
        path: "/orderlist"
      });
    }
  }
};
</script>
