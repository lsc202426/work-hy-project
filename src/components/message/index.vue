<template>
  <div class="message">
    <!-- <nav-header title="消息"></nav-header> -->
    <mt-header title="消息" class="header" fixed>
      <mt-button slot="left"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <!-- 导航分类 -->
    <!-- 导航分类 -->
    <nar-list></nar-list>
    <div
      class="list-content containerView-main"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-distance="10"
    >
      <div class="list_box" v-if="datas && datas.length > 0">
        <div class="list_item" v-for="list in datas" :key="list.id">
          <div class="list_top">
            <span class="list_top_l">
              <span class="left_img">
                <img
                  v-if="list.msg_name == '产品消息'"
                  src="../../assets/images/message/icon_product.png"
                  alt=""
                />
                <img
                  v-else-if="list.msg_name == '活动资讯'"
                  src="../../assets/images/message/icon_activity.png"
                  alt=""
                />
                <img
                  v-else-if="list.msg_name == '系统消息'"
                  src="../../assets/images/message/icon_news.png"
                  alt=""
                />
                <img
                  v-else-if="
                    list.msg_name == '订单消息' || '问题单消息' || 'null'
                  "
                  src="../../assets/images/message/icon_order.png"
                  alt=""
                />
              </span>
              <span class="left_text">{{ list.msg_name }}</span>
            </span>
            <span class="list_top_r">{{ list.created_time }}</span>
          </div>
          <div class="list_txt">{{ list.title }}</div>
          <div class="list_detail">
            <div
              class="detail_i"
              v-for="(next, index) in list.next_do"
              @click="goDetail(list.id, list.msg_name, next.name)"
              :key="index"
              v-show="next.name == '查看详情'"
            >
              <span class="detail_i_t">{{ next.name }}</span>
              <span class="detail_i_r"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 暂无数据 -->
      <blankPage v-else></blankPage>
      <!-- 加载更多 -->
      <div class="message-tips" v-show="moreLoading || allLoaded">
        <p v-show="moreLoading" class="more-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
        </p>
        <p class="no-more" v-show="allLoaded">已加载全部</p>
      </div>
    </div>

    <nav-botton></nav-botton>
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
import narList from "@/components/commom/narList.vue";
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import blankPage from "@/components/order/blankPage.vue";
export default {
  data() {
    return {
      datas: [],
      // 当前分页
      page: 1,
      // 是否加载更多加载中
      moreLoading: false,
      // 是否已加载全部
      allLoaded: false
    };
  },
  created() {
    this.getList();
    this.getMsgType();
  },
  components: {
    narList,
    blankPage
  },
  watch: {
    getIsSelect: function() {
      this.datas = [];
      this.page = 1;
      this.allLoaded = false;
      this.getList(this.getIsSelect.status);
    }
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_NAR_LIST], [GetterTypes.GET_IS_SELECT]]),
    ...mapGetters({
      getNarList: [GetterTypes.GET_NAR_LIST],
      getIsSelect: [GetterTypes.GET_IS_SELECT]
    })
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
    ...mapMutations({
      [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST
    }),
    getList(status, page) {
      let that = this;
      this.$axios
        .post("index.php?c=App&a=getMessages", {
          msg_type: status !== "all" ? status : "",
          sub_type: "",
          p: 1
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode == 0) {
            // 关闭加载更多
            that.moreLoading = false;
            //判断是否加载完了
            if (_data.content.counter < _data.content.pgsize) {
              that.allLoaded = true;
            }
            //分页数据
            if (page <= 0) {
              that.datas = _data.content.data;
            } else {
              for (let i = 0; i < _data.content.data.length; i++) {
                that.datas.push(_data.content.data[i]);
              }
            }
          }
        });
    },
    goDetail(id, name, nextName) {
      localStorage.msgId = id;
      localStorage.msgName = name;
      if (nextName == "查看详情") {
        this.$router.push({
          path: "/detail",
          name: "detail"
        });
      } else if (nextName == "解决问题单") {
        this.$router.push({
          path: "/solve",
          name: "solve"
        });
      } else if (nextName == "立刻续费") {
        this.$router.push({
          path: "/detail",
          name: "detail"
        });
      }
    },
    // 获取消息分类
    getMsgType: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getMsgType")
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            let _item = {
              name: "全部",
              key: "all"
            };
            _data.content.unshift(_item);
            that[MutationTypes.SET_NAR_LIST](_data.content);
          }
        })
        .catch(function(error) {});
    },
    // 加载更多
    loadMore: function() {
      const that = this;
      if (
        that.moreLoading === false &&
        that.allLoaded === false &&
        that.datas &&
        that.datas.length > 0
      ) {
        that.moreLoading = true;
        setTimeout(function() {
          that.page = that.page + 1;
          that.getList(that.getIsSelect.status, that.page);
        }, 2500);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.message {
  height: 100%;
  // overflow: scroll;
  // padding-top: 1.86rem;
  // padding-bottom: 1rem;
}

.containerView-main {
  padding-top: 1.86rem !important;
}

.list_box {
  padding: 0 0.32rem;
  font-size: 0.26rem;
  margin-top: 0.24rem;
}

.list_item {
  border-radius: 0.18rem;
  box-shadow: 0px 1px 9px 0px rgba(212, 214, 215, 1);
  margin-bottom: 0.3rem;
  padding: 0.24rem 0.24rem 0 0.24rem;
}

.list_top {
  overflow: hidden;
  line-height: 0.4rem;
  padding-bottom: 0.2rem;
}

.list_top_l {
  float: left;
}

.left_img {
}

.left_img img {
  width: 0.36rem;
  height: 0.36rem;
  vertical-align: sub;
}

.left_text {
  font-size: 0.28rem;
  color: #2c3852;
  padding-left: 0.2rem;
  font-weight: 500;
}

.list_top_r {
  float: right;
  font-size: 0.24rem;
  color: #999999;
}

.list_txt {
  color: #2c3852;
  font-weight: 400;
  font-size: 0.28rem;
  line-height: 0.4rem;
  margin-bottom: 0.22rem;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.list_detail {
}

.detail_i {
  border-top: 1px solid #f1f1f1;
  overflow: hidden;
  padding: 0.22rem 0;
  line-height: 0.36rem;
}

.detail_i_t {
  font-size: 0.26rem;
  color: #666666;
  font-weight: 400;
  float: left;
}

.detail_i_r {
  float: right;
  background: url(../../assets/images/message/icon_right.png) center center
    no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  width: 0.1rem;
  height: 0.18rem;
  margin-top: 0.09rem;
}
//加载更多
.message-tips {
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;
  padding-bottom: 0.32rem;
  .no-more {
    font-size: 0.3rem;
    color: #999999;
  }
}
</style>
