<template>
  <div class="order">
    <!-- head -->
    <nav-header title="全部订单"></nav-header>
    <!-- 导航分类 -->
    <nar-list></nar-list>
    <!-- 订单列表 -->
    <div class="order-main">
      <div
        class="order-main-list"
        v-for="item in orderList"
        :key="item.id"
        @click="viewDeatil(item)"
      >
        <div class="order-main-list-title">
          <span class="list-jid">{{ item.order_no }}</span>
          <span class="list-status">{{ item.status_name }}</span>
        </div>
        <div class="list-content">
          <p class="list-content-tips">{{ item.notice_msg }}</p>
          <div
            class="list-content-list"
            v-for="(list, n) in item.items"
            :key="n"
          >
            <div class="list-content-left">
              <span
                class="list-content-left-type"
                :class="{ blue: list.type === 1 }"
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
          <button class="list-bottom-btn" v-if="item.status === '1'">
            立即支付
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import narList from "@/components/commom/narList.vue";
import axios from "axios";
export default {
  name: "order",
  data() {
    return {
      // 订单列表
      orderList: []
    };
  },
  components: {
    narList
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_IS_SHOW]]),
    ...mapGetters({
      getIsShow: [GetterTypes.GET_IS_SHOW]
    })
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_IS_SHOW]]),
    ...mapMutations({
      [MutationTypes.SET_IS_SHOW]: MutationTypes.SET_IS_SHOW
    }),
    // 获取订单列表
    getOrderList: function() {
      const that = this;
      axios
        .post("/index.php?c=App&a=getOrders", {
          userid: 1,
          p: 0,
          access_token: ""
        })
        .then(function(response) {
          that.orderList = response.data.content.list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查看订单详情
    viewDeatil: function(_item) {
      this.$router.push({
        path: "/orderdetails",
        query: { id: _item.order_no }
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>
