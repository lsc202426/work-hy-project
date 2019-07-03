<template>
  <div class="message">
    <!-- <nav-header title="消息"></nav-header> -->
     <mt-header title="消息" class="header" fixed>
        <mt-button slot="left"></mt-button>
        <mt-button slot="right"></mt-button>
      </mt-header>
    <!-- 导航分类 -->
    <nar-list></nar-list>
    <div class="list_box containerView-main" v-if="datas && datas.length > 0" id="list_box" ref="wrapper">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
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
				      <span class="left_text">{{ list.msg_name?list.msg_name:'订单消息' }}</span>
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
				    >
				      <span class="detail_i_t">{{ next.name }}</span>
				      <span class="detail_i_r"></span>
				    </div>
				  </div>
				</div>
			</mt-loadmore>
      
			<div v-if="loading" class="no_more">没有更多数据了</div>
    </div>
    <!-- 暂无数据 -->
    <blankPage v-else></blankPage>
    <nav-botton></nav-botton>
  </div>
</template>

<script>
import { Toast,Loadmore } from "mint-ui";
import narList from "@/components/commom/narList.vue";
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import blankPage from "@/components/order/blankPage.vue";
export default {
  data() {
    return {
      datas: [],
			loading:false,
			page:1,
			allLoaded: false, //是否禁止触发上啦函数
			isAutoFill: false, //是否自动填充
			wrapperHeight: 0,//外层div高度
    };
  },
  created() {
    this.getList();
    this.getMsgType();
  },
	mounted() {
		// 父控件要加上高度，否则会出现上拉不动的情况
		//this.wrapperHeight =document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	},
  components: {
    narList,
    blankPage
  },
  watch: {
    getIsSelect: function() {
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
    getList(status) {
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getMessages", {
          msg_type: status !== "all" ? status : "",
          sub_type: "",
          p: _this.page
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.datas = response.data.content.data;
          }
        });
    },
		//触发上拉
		loadBottom(){
			this.loadMore();
		},
		//上拉加载更多
		loadMore(){
			let _this = this;
			_this.$axios
			  .post("index.php?c=App&a=getMessages", {
			    msg_type: status !== "all" ? status : "",
			    sub_type: "",
			    p: ++_this.page
			  })
			  .then(function(response) {
			    if (response.data.errcode == 0) {
						_this.datas = _this.datas.concat(response.data.content.data);
						if(response.data.content.pgsize!=response.data.content.counter){
							_this.loading=true;
							_this.allLoaded = true;//禁止调用上啦函数
						}else{
							_this.loading=false;
						}
						_this.$refs.loadmore.onBottomLoaded(); //通知上啦操作已经完结
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
          path: "/renew",
          name: "renew"
        });
      }
    },
    // 获取消息分类
    getMsgType() {
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
        .catch(function(error) {
         
        });
    },
		//下啦刷新
		loadTop() {
			// this.getList();
			location.reload();
			this.$refs.loadmore.onTopLoaded();
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
  padding-top: 1.6rem !important;
  padding-bottom: 1.3rem !important;
}

.no_more{
	text-align: center;
}

.list_box {
  padding: 0 0.14rem;
  font-size: 0.26rem;
  margin-top: 0.24rem;
}

.list_item {
  border-radius: 0.18rem;
  box-shadow: 0px 1px 9px 0px rgba(212, 214, 215, 1);
  padding: 0.24rem 0.24rem 0 0.24rem;
	margin: 0.3rem 0.18rem;
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
</style>
