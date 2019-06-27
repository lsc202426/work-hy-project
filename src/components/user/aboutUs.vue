<template>
  <div id="about" class="about">
    <nav-header title="关于我们"></nav-header>
    <div class="about-box containerView-main">
      <div class="about-top">
        <img class="about-img" src="../../assets/images/user/aboutUs_logo.png" alt>
        <p>互易品牌管理</p>
      </div>
      <div class="about-bot">
        <a href="http://huyi.cn/mob/index.php/Index/company">
          <div class="about-list">我们的使命</div>
        </a>
        <a href="http://huyi.cn/mob/index.php/Index/business">
          <div class="about-list">我们的产品</div>
        </a>
        <a href="http://huyi.cn/mob/index.php/Index/news">
          <div class="about-list">新闻动态</div>
        </a>
        <a href="http://huyi.cn/mob/index.php/Index/support">
          <div class="about-list">联系方式</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "about",

  data() {
    return {};
  },
  created() {
    // this.getMsg();
  },
  methods: {
    // submitMsg() {
    //   var _this = this;

    //   this.$axios
    //     .post("", {})
    //     .then(function(response) {
    //     })
    //     .catch(function(error) {
    //     });
    // }
  }
};
</script>

<style lang="scss">
</style>
