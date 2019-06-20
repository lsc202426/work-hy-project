<template>
  <div class="message">
    <nav-header title="消息"></nav-header>
    <div class="list_box">
      <!-- 导航分类 -->
      <nar-list></nar-list>
      <div class="list_box-main">
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
                  v-else="list.msg_name == '订单消息' || '问题单消息' || 'null'"
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
              @click="goDetail(list.id)"
              :key="index"
            >
              <span class="detail_i_t">{{ next.name }}</span>
              <span class="detail_i_r"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-botton></nav-botton>
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
import narList from "@/components/commom/narList.vue";
export default {
  data() {
    return {
      datas: []
    };
  },
  created() {
    this.getList();
  },
  components: {
    narList
  },
  methods: {
    getList() {
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getMessages", {
          userid: 1,
          msg_type: "",
          sub_type: "",
          p: 1
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.datas = response.data.content.data;
            // for(let i=0;i<response.data.content.counter;i++){
            // 	console.log(_this.datas[i].msg_name);
            // 	//每个消息对应的图标
            // 	if(_this.datas[i].msg_name=='产品消息'){
            // 		_this.$set(_this.datas[i],'leftImg',require('../../assets/images/message/icon_product.png'));
            // 	}else if(_this.datas[i].msg_name=='活动资讯'){
            // 		_this.$set(_this.datas[i],'leftImg','../../assets/images/message/icon_activity.png.png');
            // 	}else if(_this.datas[i].msg_name=='系统消息'){
            // 		_this.$set(_this.datas[i],'leftImg','../../assets/images/message/icon_news.png.png');
            // 	}else{
            // 		_this.$set(_this.datas[i],'leftImg','../../assets/images/message/icon_order.png.png');
            // 	}
            // }
          }
          // Toast({
          // 	message: 'haha',
          // 	duration: 3000
          // });
          console.log(_this.datas);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goDetail(id) {}
  }
};
</script>

<style scoped>
.message {
  height: 100%;
  overflow: hidden;
  padding-top: 0.9rem;
  padding-bottom: 1rem;
}

.list_box {
  height: 100%;
  overflow: scroll;
}
.list_box-main {
  padding: 0.24rem 0.32rem 0rem 0.32rem;
  font-size: 0.26rem;
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
  padding-bottom: 0.22rem;
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
