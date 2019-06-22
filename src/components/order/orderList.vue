<template>
  <div class="order">
    <!-- head -->
    <nav-header title="全部订单"></nav-header>
    <!-- 导航分类 -->
    <nar-list></nar-list>
    <!-- 订单列表 -->
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
  </div>
</template>

<script>
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import narList from "@/components/commom/narList.vue";
import blankPage from "@/components/order/blankPage.vue";
export default {
  name: "order",
  data() {
    return {
      // 订单列表
      orderList: []
    };
  },
  components: {
    narList,
    blankPage
  },
  watch: {
    getIsSelect: function() {
      this.getOrderList(this.getIsSelect.status);
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
    // 立即支付
    paly: function(ids, total) {
      this.$router.push({
        path: "/playorder",
        query: { id: ids, price: total }
      });
    },
    // 获取订单列表
    getOrderList: function(key) {
      const that = this;
      this.$axios
        .post("/index.php?c=App&a=getOrders", {
          userid: 1,
          p: 0,
          access_token: "",
          status: key
        })
        .then(function(response) {
          // console.log(response.data.content.list)
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
    },
    // 设置类型列表
    setTypeList: function() {
      if(this.$route.query.ids == 5){
        var typeList = [
          { name: "全部", key: 0 },
          { name: "待付款", key: 1 },
          { name: "审核中", key: 2 },
          { name: "待处理", key: 3 }
        ];
        this.$nextTick(function () {
          $('.narlist').addClass('followC')
          console.log($('.narlist'))
        })

      }else{

        var typeList = [
          { name: "全部", key: 0 },
          { name: "待付款", key: 1 },
          { name: "审核中", key: 2 },
          { name: "待处理", key: 3 },
          { name: "已完成", key: 4 }
        ];
      }
      this[MutationTypes.SET_NAR_LIST](typeList);
    }
  },
  created() {
    const that = this;
    that.setTypeList();
    that.getOrderList(that.getIsSelect.status);
  }
};
</script>
