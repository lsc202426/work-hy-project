<template>
  <div class="informat">
    <!-- head -->
    <nav-header title="资讯"></nav-header>
    <div class="informat-box containerView-main">
      <div
        class="informat-list"
        v-for="item in contArr"
        @click="urlGo(item.url, item.id)"
        :key="item.id"
      >
        <div
          class="bg-left"
          :style="{
            backgroundImage:
              'url(' + 'http://oapi.huyi.cn:6180/' + item.img + ')'
          }"
        ></div>

        <div class="right">
          <p class="title">{{ item.title }}</p>
          <p class="msg">{{ item.summary }}</p>
          <div class="bottom">
            <span class="date">{{ item.created_time.split(" ")[0] }}</span>
            <div class="bot-right">
              <img src="../../assets/images/informat/read.png" alt="" />
              <span>{{ item.views }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-botton></nav-botton>
  </div>
</template>

<script>
export default {
  name: "informat",
  data() {
    return {
      bg: require("@/assets/images/user/capiral.png"),
      contArr: []
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    // 点击跳转
    urlGo(url, ids) {
      
      this.$axios
        .post("index.php?c=App&a=setViews", {
          id: ids
        })
        .then(function(response) {
          
          location.href = url;
        })
        .catch(function(error) {
          
        });
    },
    getMsg() {
      
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getNews")
        .then(function(response) {
          
          _this.contArr = response.data.content.list;
        })
        .catch(function(error) {
          
        });
    }
  }
};
</script>
