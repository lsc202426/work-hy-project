<template>
  <div id="tradeSearch" class="tradeSearch">
    <div class="tradeSearch-top">
      <nav-header title="商标服务"></nav-header>
      <div class="t-search">
        <div class="t-search-left">
          <input type="text">
          <div class="search-btn">
            <img src="../../assets/images/tradeSearch/search.png" alt>
            <span>查商标</span>
          </div>
        </div>

        <div class="t-search-left">申请注册</div>
      </div>
    </div>

    <div class="search-bot">
      <div class="advantage">
        <p>我们的优势</p>
        <span>
          .com是互联网之DNS上的一个通用顶级域（gTLD）。
          它的名称源自英文单词“commercial”，表明由商业组织
          注册此域名的原始意图。.com域名是目前国际最广泛流
          行的通用域名格式，现全球的用户超过1.015亿个。
        </span>
      </div>
      <div class="trade-advantage">
        <p>商标注册的优势</p>
        <span>
          .CN，Internet网络域名，国家顶级域名，表示中国国家
          域名。它由我国国际互联网络信息中心（Inter NIC）正
          式注册并运行。.CN域名是全球唯一由中国管理的英文
          国际顶级域名，是中国企业自己的互联网标识，它体现
          了一种文化的认同、自身的价值和定位。
        </span>
      </div>
      <div class="trade-img">
        <img src="../../assets/images/tradeSearch/flow.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "tradeSearch",

  data() {
    return {
    //   headPort: require("@/assets/images/user/support.png")
    };
  },
  created() {
    this.getMsg();
  },
  mounted() {
    // window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    getMsg() {
      let _this = this;
      this.$axios
        .post("", {
          userid: 1
        })
        .then(function(response) {
          _this.capiralArr = response.data.content;
          _this.capiralArr.balance = _this.capiralArr.balance.split(".")[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss"></style>
