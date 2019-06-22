<template>
  <div class="product-list">
    <div class="product-list-header">
      <nav-header title="点商标服务"></nav-header>
      <div class="product-list-search">
        <div class="product-list-search-tips" v-show="isShowTips">
          <span>请输入品牌名称</span>
          <span>例如：互易</span>
        </div>
        <input type="text" v-model="keyword" />
        <button class="search" @click="searchBtn">搜索</button>
      </div>
      <div class="product-list-toptips">
        <a href="javascript:void(0);" class="rule">注册规则</a>
        <a href="javascript:void(0);" class="guide">注册指南</a>
        <a href="javascript:void(0);" class="mark">关于点商标</a>
      </div>
    </div>
    <div class="product-list-main">
      <!-- 未搜索 -->
      <div class="product-list-main-nosearch" v-if="!isResult">
        <div
          class="product-list-main-item"
          v-for="(item, index) in productlist"
          :key="index"
        >
          <h2 class="title">{{ item.title }}</h2>
          <h3 class="price">￥{{ item.price }}元/年</h3>
          <p v-for="(value, name) in item.TemptText" :key="name">
            {{ value }}
          </p>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div
        class="product-list-main-result"
        v-if="typeList && typeList.length > 0"
      >
        <!-- A类 -->
        <div class="result-item item-a">
          <div class="result-item-title">
            <span class="domin">{{ typeList[0].domain }}</span>
            <span class="domin-type">.商标</span>
            <i
              class="icons-status"
              :class="{
                success: typeList[0].reg === 1,
                failed: typeList[0].reg === 0
              }"
            ></i>
          </div>
          <p class="result-item-price">￥{{ typeList[0].price }}元/年</p>
          <p class="result-item-tips">该词可申请注册</p>
        </div>
        <!-- B类 -->
        <div class="result-item item-b">
          <div class="result-item-title">
            <span class="domin"></span>
            <span class="domin-type">.商标</span>
            <i class="icons-status success"></i>
          </div>
          <p class="result-item-price">￥2800元/年</p>
          <p class="result-item-tips">该词可申请注册</p>
        </div>
        <!-- C类 -->
        <div class="result-item item-c">
          <div class="result-item-title">
            <span class="domin"></span>
            <span class="domin-type">.商标</span>
            <i class="icons-status success"></i>
          </div>
          <p class="result-item-price">￥2800元/年</p>
          <p class="result-item-tips">该词可申请注册</p>
        </div>
        <!-- D类 -->
        <div class="result-item item-d">
          <div class="result-item-title">
            <span class="domin"></span>
            <span class="domin-type">.商标</span>
            <i class="icons-status success"></i>
          </div>
          <p class="result-item-price">￥2800元/年</p>
          <p class="result-item-tips">该词可申请注册</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      isShowTips: true,
      productlist: [],
      isResult: true,
      typeList: []
    };
  },
  watch: {
    // 监听变化
    keyword: function() {
      if (this.keyword !== "") {
        this.isShowTips = false;
      } else {
        this.isShowTips = true;
      }
    }
  },
  methods: {
    //获取搜索
    getProdcutList: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getProducts", {
          userid: 1,
          p: 0,
          mark: "tmd"
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            that.productlist = _data.content.list[0].list;
          }
          //遍历切割换行组成数组
          that.productlist.map(function(_item) {
            _item.TemptText = _item.summary.split(/\n/g);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 搜索商标
    searchBtn: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=searchDomain", {
          userid: 1,
          domain: that.keyword,
          mark: "tmd",
          st: 0,
          p: 0,
          suffix: ""
        })
        .then(function(response) {
          console.log(response);
          let _data = response.data;
          if (_data.errcode === 0) {
            that.typeList = response.data.content;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getProdcutList();
  }
};
</script>
