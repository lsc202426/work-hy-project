<template>
  <div class="detail">
    <nav-header title="消息详情"></nav-header>
    <div class="detail_box containerView-main">
      <div class="detail_top">
        <span class="detail_top_l">
          <span class="left_img">
            <img
              v-if="title == '产品消息'"
              src="../../assets/images/message/icon_product.png"
              alt=""
            />
            <img
              v-else-if="title == '活动资讯'"
              src="../../assets/images/message/icon_activity.png"
              alt=""
            />
            <img
              v-else-if="title == '系统消息'"
              src="../../assets/images/message/icon_news.png"
              alt=""
            />
            <img
              v-else="title == '订单消息' || '问题单消息' || 'null'"
              src="../../assets/images/message/icon_order.png"
              alt=""
            />
          </span>
          <span class="left_text">{{ title == "null" ? " " : title }}</span>
        </span>
        <span class="detail_top_r">{{ time }}</span>
      </div>
      <div class="detail_txt">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: localStorage.msgName,
      time: "",
      text: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      if (localStorage.msgId) {
        let id = localStorage.msgId;
        this.$axios
          .post("index.php?c=App&a=getMessageInfo", {
            id: id
          })
          .then(function(response) {
            console.log(response.data);
            if (response.data.errcode == 0) {
              _this.time = response.data.content.created_time;
              _this.text = response.data.content.content;
            }
            // Toast({
            // 	message: 'haha',
            // 	duration: 3000
            // });
          })
          .catch(function(error) {});
      }
    }
  }
};
</script>

<style scoped lang="scss">
.detail {
  padding: 0.9rem 0 1rem 0;
}
.detail_box {
  font-size: 0.28rem;
  margin-bottom: 0.3rem;
  padding: 0.3rem !important;
  .detail_top {
    overflow: hidden;
    line-height: 0.4rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #f1f1f1;
    .detail_top_l {
      float: left;
      .left_img {
        img {
          width: 0.36rem;
          height: 0.36rem;
          vertical-align: sub;
        }
      }
      .left_text {
        padding-left: 0.2rem;
      }
    }
    .detail_top_r {
      float: right;
      font-size: 0.24rem;
      color: #999999;
    }
  }
  .detail_txt {
    font-size: 0.28rem;
    color: #2c3852;
    padding-left: 0.2rem;
    font-weight: 500;
    margin-top: 0.3rem;
  }
}
</style>
