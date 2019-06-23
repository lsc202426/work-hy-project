<template>
  <mt-header :title="title" class="header" fixed>
    <router-link to="" slot="left">
      <mt-button icon="back" @click="goBack"></mt-button>
    </router-link>
    <mt-button slot="right"></mt-button>
  </mt-header>
</template>

<style>
#app .mint-header {
  background-color: #fff;
  height: 0.9rem;
  border-bottom: 1px solid #f1f1f1;
}
#app .mint-header-title {
  color: #2c3852;
  font-family: PingFangHK-Regular;
  font-size: 0.32rem;
}
#app .mint-header-button.is-left {
  color: #2c3852;
}
#app .mint-header .mint-button {
  padding-left: 4px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  //声明接受父组件参数
  // props: ["title"],
  props:{
      title: '', // 标题内容
      gobackurl: '' // 返回的连接
  },
  methods: {
        goBack: function goBack() {
          var _this = this;
            if (_this.gobackurl) {
                _this.$router.push({
                  path: _this.gobackurl
                })
                // window.location.href = this.gobackurl;
            } else {
              
                this.$router.back(-1)
            }
        }
    }
};
</script>
