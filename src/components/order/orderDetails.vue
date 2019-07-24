<template>
  <div class="order-deatil">
    <!-- head -->
    <nav-header title="订单详情" gobackurl="/orderlist"></nav-header>
    <div class="detail-top"></div>
    <div
      class="containerView-main"
      :class="{ 'no-bottom': parseInt(detailsInfo.status) !== 1 }"
    >
      <!-- 主体信息 -->
      <div class="detail-customer-info">
        <div class="detail-customer-info-title"><span></span>申请人信息</div>
        <div class="detail-subject">
          <div class="detail-customer-info-name info-list">
            <!-- <label>主体名称</label> -->
            <label class="info-list-subject">{{
              detailsInfo.corp_name ? detailsInfo.corp_name : "暂无"
            }}</label>
            <label class="info-list-status info-list-name">已实名</label>

          </div>
          <!-- <div class="detail-customer-info-phone info-list">
            <label>联系人</label>
            <label>{{
              detailsInfo.corp_linkman ? detailsInfo.corp_linkman : "暂无"
            }}</label>
          </div> -->
          <div class="detail-customer-info-phone info-list">
            <label>电话：</label>
            <label>{{
              detailsInfo.corp_phone ? detailsInfo.corp_phone : "暂无"
            }}</label>
          </div>
          <div class="detail-customer-info-phone info-list">
            <label>邮箱：</label>
            <label>{{
              detailsInfo.corp_email ? detailsInfo.corp_email : "暂无"
            }}</label>
            <label class="info-list-status">未验证</label>
          </div>
        </div>
      </div>
      <!-- 订单内容 -->
      <div class="detail-main">

        <div class="detail-til">
          <div class="detail-customer-info-title"><span></span>订单注册信息</div>
          <div class="detail-main-title">
            <span class="order-id">ID:{{ detailsInfo.order_no }}</span>
            <span class="status">{{ detailsInfo.status_name }}</span>
          </div>
        </div>
        <div
          class="detail-main-list"
          v-for="item of detailsInfo.items"
          :key="item.id"
        >
          <div class="detail-main-list-name">
            <span
              class="typename">{{ item.product_name }}</span
            >
            <span class="shopname">{{ item.keyword }}</span>
          </div>
          <p class="detail-main-list-regfre money">
            <label>注册费 ({{ item.price }}元 x {{ item.year }}年)</label>
            <span>￥{{ item.price * item.year }}元</span>
          </p>
         
          <p
            class="detail-main-list-Review money"
            v-if="item.fee_other && parseInt(item.fee_other) > 0"
          >
            <label>添加类别</label>
            <span>￥{{ item.fee_other }}元</span>
          </p>
           <p
            class="detail-main-list-Review money"
            v-if="item.fee_verify && parseInt(item.fee_verify) > 0"
          >
            <label>审核费</label>
            <span>￥{{ item.fee_verify }}元</span>
          </p>
           <p class="detail-main-list-Review money">
            <label>手续费</label>
            <span>￥{{ item.fee_verify }}元</span>
          </p>
          <div class="update">
            <p>补充资料</p>
          </div>
        </div>
        <div class="detail-main-list all-price">
          <p class="detail-main-list-Review money">
            <label>合计</label>
            <span>￥{{ detailsInfo.total }}元</span>
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
    </div>
    <div class="detail-bottom" v-if="parseInt(detailsInfo.status) === 1">
      <div class="detail-bottom-allmoney">
        <p class="detail-bottom-allmoney-title">订单合计</p>
        <p class="detail-bottom-allmoney-money">￥{{ detailsInfo.total }}元</p>
      </div>
      <button class="detail-bottom-btn" @click="paly">立即支付</button>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
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
      that.$axios
        .post("/index.php?c=App&a=getOrderInfo", {
          p: 0,
          order_no: jid
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            that.detailsInfo = response.data.content;
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 2000
            });
          }
        })
        .catch(function(error) {
          Toast({
            message: error.data.errmsg,
            duration: 2000
          });
        });
    },
    // 立即支付
    paly: function() {
      let _this = this;
      Indicator.open({
        text: "正在生成支付订单...",
        spinnerType: "fading-circle"
      });
      setTimeout(function() {
        Indicator.close();
				let token=sessionStorage.token;
				window.location.href="http://h.huyi.cn/playorder?id="+_this.$route.query.id+"&price="+_this.detailsInfo.total+"&token="+token;
        // _this.$router.push({
        //   path: "/playorder",
        //   query: {
        //     id: _this.$route.query.id,
        //     price: _this.detailsInfo.total
        //   }
        // });
      }, 2000);
    }
  },
  created() {
		if(this.$route.query.token){
			sessionStorage.token=this.$route.query.token;
			let order_id=this.$route.query.id;
			this.$router.push({
			  path: "/orderdetails",
			  query: {
			    id: order_id
			  }
			});
		}
    // 订单id
    let jid = this.$route.query.id;
    this.getOrderDetails(jid);
  }
};
</script>
<style lang="scss" scoped>
.order-deatil .detail-customer-info .info-list{
  display: block;
}
.detail-subject{
  background: url(../../assets/images/order/icon_right.png) right center no-repeat;
  background-size: 2%;
}
.info-list-status{
  color: #fff;
  background: #C5C5C5;
  border-radius: 0.04rem;
  padding: 0.06rem;
  font-size: 0.2rem;
  margin-left: 0.18rem;
}
.info-list-name{
  background: #FF9866;
}
.info-list-subject{
  font-weight: bold;
}
.order-deatil .detail-main-list{
  padding: 0.36rem 0 0.26rem;
}
.order-deatil .detail-main-list-name .typename {
  width: auto;
  padding: 0.03rem 0.06rem;
}

.order-deatil .detail-main-list-name {
  align-items: center;
}
.detail-til{
  padding: 0.3rem 0 0.36rem;
}
.detail-til .detail-customer-info-title{
  height: 0.38rem;
  line-height: 0.38rem;
  border-bottom: none;
}
.detail-til .detail-main-title{
  height: 0.33rem;
  line-height: 0.33rem;
  padding-top: 0.12rem;
  // padding: 0.3rem 0;
}
.order-deatil .detail-main-list-name .typename{
  color: #028BFF;
  border: 1px solid #2971D0;
  padding: 0.01rem 0.09rem;
}
.update{
  text-align: right;
  padding-top: 0.2rem;
  p{
    background:linear-gradient(131deg,rgba(15,179,254,1) 0%,rgba(0,134,255,1) 100%);
    color: #fff;
    font-size: 0.22rem; 
    border-radius: 0.24rem;
    padding: 0.08rem 0.34rem;
    display: inline-block;
  }
}
</style>
