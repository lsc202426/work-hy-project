<template>
  <div class="order">
    <!-- head -->
    <!-- <nav-header title="全部订单" gobackurl="/message"></nav-header> -->
    <nav-header title="全部订单" gobackurl="/user"></nav-header>
    <!-- <nav-header title="全部订单" @click="goback"></nav-header> -->
    <!-- 导航分类 -->
    <nar-list></nar-list>
    <!-- 订单列表 -->
    <div
      class="order-content containerView-main"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-distance="10"
    >
      <div class="order-main" v-if="orderList && orderList.length > 0">
        <div class="order-main-list" v-for="item in orderList" :key="item.id">
          <div class="order-main-list-title">
            <span class="list-jid">{{ item.order_no }}</span>
            <span class="list-status">{{ item.status_name }}</span>
          </div>
          <div class="list-content" @click="viewDeatil(item)">
            <p class="list-content-tips">{{ item.notice_msg }}</p>
            <div
              class="list-content-list"
              v-for="(list, n) in item.items"
              :key="n"
            >
              <div class="list-content-left">
                <span
                  class="list-content-left-type"
                  :class="{
                    orange: list.product_mark == 'dzp',
                    blue: list.product_mark == 'bs',
                    purple: list.product_mark == 'domain',
                    green: list.product_mark == 'ecweb'
                  }"
                  >{{ list.product_name }}</span
                >
                <p class="list-content-left-title">{{ list.keyword }}</p>
              </div>
              <div class="list-content-right">
                {{ list.price }}元/年 x {{ list.year }}年
              </div>
            </div>
            <div class="list-content-allprice">
              总计:<span>￥{{ item.total }}元</span>
            </div>
          </div>
          <div class="list-bottom">
            <span class="list-bottom-time">{{ item.created_time }}</span>
            <button
              class="list-bottom-btn list-bottom-gray"
              v-if="item.status === '1' && item.notice_msg == ''"
              @click="cancel(item.order_no)"
            >
              取消订单
            </button>
            <button
              class="list-bottom-btn"
              v-if="item.status === '1'"
              @click="paly(item.order_no, item.total)"
            >
              立即支付
            </button>
          </div>
        </div>
      </div>
      <!-- 暂无数据 -->
      <blankPage v-else></blankPage>
      <!-- 加载更多 -->
      <div class="load-more" v-show="moreLoading || allLoaded">
        <p v-show="moreLoading" class="load-more-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
        </p>
        <p class="load-more-no" v-show="allLoaded">已加载全部</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import narList from "@/components/commom/narList.vue";
import blankPage from "@/components/order/blankPage.vue";
import $ from "jquery";
export default {
  name: "order",
  data() {
    return {
      // 订单列表
      orderList: [],
      // 当前分页
      page: 1,
      // 是否加载更多加载中
      moreLoading: false,
      // 是否已加载全部
      allLoaded: false
    };
  },
  components: {
    narList,
    blankPage
  },
  watch: {
    getIsSelect: function() {
      this.orderList = [];
      this.page = 1;
      this.allLoaded = false;
      this.moreLoading = false;
      this.getOrderList(this.getIsSelect.status, this.page);
    }
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_IS_SELECT]]),
    ...mapGetters({
      getIsSelect: [GetterTypes.GET_IS_SELECT]
    })
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
    ...mapMutations({
      [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST
    }),
    goback() {
      this.$router.push({
        path: "/message"
      });
    },
    // 立即支付
    paly: function(ids, total) {
      this.$router.push({
        path: "/playorder",
        query: { id: ids, price: total }
      });
    },
    //取消订单
    cancel: function(ids) {
      let _this = this;
      MessageBox.confirm("", {
        message: "确定取消订单？",
        title: "提示",
        showCancelButton: true
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            _this.$axios
              .post("index.php?c=App&a=cancelOrder", {
                order_no: ids
              })
              .then(function(response) {
                if (response.data.errcode == 0) {
                  Toast({
                    message: "取消成功",
                    duration: 1500
                  });
                  //初始化数据
                  setTimeout(function() {
                    location.reload();
                  }, 1500);
                } else {
                  Toast({
                    message: response.data.errmsg,
                    duration: 1500
                  });
                }
              });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
          }
        });
    },
    // 获取订单列表
    getOrderList: function(key, page) {
      const that = this;
      this.$axios
        .post("/index.php?c=App&a=getOrders", {
          p: page,
          status: key
        })
        .then(function(response) {
          let _data = response.data;
          // 关闭加载更多
          that.moreLoading = false;
          //分页数据
          if (page <= 1) {
            that.orderList = _data.content.list;
          } else {
            for (let i = 0; i < _data.content.list.length; i++) {
              that.orderList.push(_data.content.list[i]);
            }
          }
          if (that.orderList && that.orderList.length > 0) {
            //判断是否加载完了
            if (_data.content.counter < _data.content.pgsize) {
              that.allLoaded = true;
            }
          }
        });
    },
    // 查看订单详情
    viewDeatil: function(_item) {
      this.$router.push({
        path: "/orderdetails",
        query: { id: _item.order_no }
      });
    },
    // 设置类型列表
    setTypeList: function() {
      let typeList = [];
      if (this.$route.query.ids == 5) {
        typeList = [
          { name: "全部", key: 0 },
          { name: "待付款", key: 1 },
          { name: "审核中", key: 2 },
          { name: "待处理", key: 3 }
        ];
        this.$nextTick(function() {
          $(".narlist").addClass("followC");
        });
      } else {
        typeList = [
          { name: "全部", key: 0 },
          { name: "待付款", key: 1 },
          { name: "审核中", key: 2 },
          { name: "待处理", key: 3 },
          { name: "已完成", key: 4 }
        ];
      }
      this[MutationTypes.SET_NAR_LIST](typeList);
    },
    // 加载更多
    loadMore: function() {
      const that = this;
      if (
        that.moreLoading === false &&
        that.allLoaded === false &&
        that.orderList &&
        that.orderList.length > 0
      ) {
        that.moreLoading = true;
        setTimeout(function() {
          that.page = that.page + 1;
          that.getOrderList(that.getIsSelect.status, that.page);
        }, 2500);
      }
    }
  },
  created() {
    const that = this;
    that.setTypeList();
    that.getOrderList(that.getIsSelect.status, that.page);
  }
};
</script>
<style scoped lang="scss">
.containerView-main {
  padding-top: 1.86rem !important;
  padding-bottom: 0 !important;
}
.list-content-list {
  align-items: center;
}
.list-content-left {
  align-items: center;
}
.list-content-left-type {
  width: auto;
  padding: 0.03rem 0.14rem;
}
</style>
