<template>
  <div class="order-deatil">
    <!-- head -->
    <nav-header title="订单详情"></nav-header>
    <div class="detail-top"></div>
    <div class="detail-main">
      <div class="detail-main-title">
        <span class="order-id">{{ detailsInfo.order_no }}</span>
        <span class="status">{{ detailsInfo.status_name }}</span>
      </div>
      <div
        class="detail-main-list"
        v-for="item of detailsInfo.items"
        :key="item.id"
      >
        <div class="detail-main-list-name">
          <span class="typename">{{ item.product_name }}</span>
          <span class="shopname">{{ item.keyword }}</span>
        </div>
        <p class="detail-main-list-regfre money">
          <label>注册费 ({{ item.price }}元 x {{ item.year }}年)</label>
          <span>￥{{ item.total }}元</span>
        </p>
        <!-- <p class="detail-main-category money">
          <label></label>
          <span></span>
        </p> -->
        <p class="detail-main-list-Review money">
          <label>审核费</label>
          <span>￥{{ item.fee_verify }}元</span>
        </p>
      </div>
    </div>
    <!-- 订单联系信息 -->
    <div class="detail-customer-info">
      <div class="detail-customer-info-title"><span></span>订单联系信息</div>
      <div class="detail-customer-info-name info-list">
        <label>姓名</label>
        <label>{{
          detailsInfo.personnel_name ? detailsInfo.personnel_name : "暂无"
        }}</label>
      </div>
      <div class="detail-customer-info-phone info-list">
        <label>电话</label>
        <label>{{
          detailsInfo.personnel_phone ? detailsInfo.personnel_phone : "暂无"
        }}</label>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-bottom-allmoney">
        <p class="detail-bottom-allmoney-title">订单合计</p>
        <p class="detail-bottom-allmoney-money">￥{{ detailsInfo.total }}元</p>
      </div>
      <button class="detail-bottom-btn">立即支付</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // 订单详情
      detailsInfo: {}
    };
  },
  methods: {
    // 获取订单列表
    getOrderDetails: function(jid) {
      const that = this;
      axios
        .post("/index.php?c=App&a=getOrderInfo", {
          userid: 1,
          p: 0,
          access_token: "",
          order_no: jid
        })
        .then(function(response) {
          that.detailsInfo = response.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    // 订单id
    let jid = this.$route.query.id;
    this.getOrderDetails(jid);
  }
};
</script>
