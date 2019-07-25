<template>
  <div id="tradeService" class="tradeService">
    <div class="tradeService-top" id="scroll_top">
      <!-- <div class="recruit_bg"></div> -->

      <!-- <nav-header title="域名服务"></nav-header> -->
      <mt-header title="域名服务" class="header" fixed>
        <mt-button slot="left" icon="back" @click="goback"></mt-button>
        <mt-button slot="right"></mt-button>
      </mt-header>
      <div class="t-service">
        <!-- <div class="t-service-left"> -->
          <form action="#" @submit.prevent class="form-input">
            <input
              type="search"
              placeholder="请输入品牌名称"
              v-model="tradeName"
              autocomplete="off"
              @keypress="searchGoods($event)"
              ref="searchInput"
              id="search"
            />
          </form>
          <!-- <div class="service-btn domain">
            <img src="../../assets/images/tradeService/select.png" alt />
            <select v-model="typeN" @change="choiceType(typeN)">
              <option
                :value="item.suffix"
                v-for="(item, index) of suffix"
                :key="index"
                >{{ item.suffix }}</option
              >
            </select>
          </div> -->
          <div class="t-service-right" @click="search()">
            <img src="../../assets/images/trademark/search-news.png" alt="" />
            <span>搜索</span>
          </div>
        <!-- </div> -->

      </div>
      <!-- <div class="product-list-toptips">
        <a href="javascript:void(0);" @click="goAnchor('#rule')" class="rule"
          >注册规则</a
        >
        <a
          href="javascript:void(0);"
          @click="goAnchor('#process')"
          class="guide"
          >注册流程</a
        >
        <a
          href="javascript:void(0);"
          @click="goAnchor('#advantage')"
          class="mark"
          >关于域名</a
        >
      </div> -->
    </div>

    <div class="service-bot containerView-main" id="con" v-if="!possible">
      <!-- 未查询 -->
      <div class="instial">
        <div class="advantage" v-for="item in productArr" :key="item.id">
          <p>{{item.title}}</p>
          <span>
            {{item.summary}}
          </span>
        </div>
        
      </div>
      <!-- 查询 -->
      <div class="result"></div>
    </div>
    <!-- 搜索展示内容 -->
    <div class="content containerView-main" v-if="possible">
      <!-- <div class="content" > -->
      <div class="content_list" @click="fill_information(recruit)">
        <!-- <div class="content_list"> -->
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{ search_t }}</span>
            <span class="can_or_not" :class="{'not': recruit == '已注册' }">{{ recruit }}</span>
          </div>
          <div class="pirce">
            <span>注册费用</span>
            <span>￥{{ price }}元/1年</span>
          </div>
        </div>
        <!-- <div class="list_right">
          <span>加入清单</span>
        </div> -->
      </div>
      <!-- <div class="content_list" v-else>
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{ search_t }}</span>
            <span class="can_or_not not">{{ recruit }}</span>
          </div>
          <div class="pirce">￥{{ price }}元/年</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "tradeService",

  data() {
    return {
      tradeName: "",
			suffix:[],
      typeN: ".com",
      typeName: "",
      recruit: "",
      possible: false,
      possible_t: false,
      search_txt: "",
      search_t: "",
      reg: "",
      price: "",
      productid: "",
      product_name: "",
      status: 0,
      productArr: []
    };
  },
  created() {
    this.init();
  },
  mounted() {
    // window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    goback() {
      var _this = this;
      if (_this.status == 1) {
        _this.possible = false;
        _this.tradeName = "";
        _this.status = 0;
      } else {
        _this.$router.push({
          path: "/"
        });
      }
    },
    searchGoods(event) {},
    goAnchor(type) {
      var anchor = this.$el.querySelector(type);
      let recruit_top = this.$el.querySelector("#scroll_top");
      document.getElementById("con").scrollTop =
        anchor.offsetTop - recruit_top.offsetHeight - 20;
    },
    init() {
      let _this = this;
      _this.mark = _this.$route.query.mark;
      _this.$axios
        .post("index.php?c=App&a=getProducts", {
          mark: _this.mark,
          p: 1
        })
        .then(function(response) {
          console.log(response.data.content.list[0].list)
          if (response.data.errcode == 0) {
            _this.productid = response.data.content.list[0].list[0].id;
            _this.product_name = response.data.content.list[0].list[0].title;
            _this.suffix=response.data.content.list[0].list;
            _this.productArr = response.data.content.list[0].list
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        });
    },
    // 点击加入清单
    fill_information(status) {
      var _this = this;
      if(status == '已注册'){
        Toast({
          message: "该域名已被注册，请重新选择",
          duration: 3000
        });
        return;
      }
      if (_this.search_t.split(".")[1] == "com") {
        _this.$router.push({
          path: "/domainMsg",
          query: {
            name: _this.search_t,
            price: _this.price,
            productid: 7,
            product_name: ".com域名"
          }
        });
      } else if (_this.search_t.split(".")[1] == "cn") {
        _this.$router.push({
          path: "/domainMsg",
          query: {
            name: _this.search_t,
            price: _this.price,
            productid: 6,
            product_name: ".cn域名"
          }
        });
      } else if (_this.search_t.split(".")[1] == "net") {
        _this.$router.push({
          path: "/domainMsg",
          query: {
            name: _this.search_t,
            price: _this.price,
            productid: 11,
            product_name: ".net域名"
          }
        });
      }
    },
    //修改类型
    choiceType(val) {},
    // 验证输入内容格式
    sendSearchCheck: function sendSearchCheck() {
      if (this.tradeName.indexOf(" ") > -1) {
        Toast({
          message: "请不要用空格。",
          duration: 3000
        });
        // this.showHint = true;
        return false;
      }
      // 判断头部或尾部是否含有'-' S
      var hasStr = this.tradeName.slice(0, 1) == "-";
      var haslast =
        this.tradeName.slice(
          this.tradeName.length - 1,
          this.tradeName.length
        ) == "-";
      if (hasStr || haslast) {
        Toast({
          message: "“-”不能放在开头或结尾。",
          duration: 3000
        });
        return false;
      }
      // 判断头部或尾部是否含有'-' E

      // 判断头是否含有特殊字符 S
      var regEn = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      if (regEn.test(this.tradeName) || regCn.test(this.tradeName)) {
        Toast({
          message: "请不要用特殊字符（如!、$、&等）。",
          duration: 3000
        });
        return false;
      }
      return true;
    },
    // 点击查询商标
    search() {
      let _this = this;
      // alert(_this.tradeName);
      if (_this.tradeName == "") {
        Toast({
          message: "请输入品牌名称",
          duration: 3000
        });
        return;
      }
      if (!_this.sendSearchCheck()) {
        return;
      }
      _this.$axios
        .post("index.php?c=App&a=searchDomain", {
          mark: "domain",
          domain: _this.tradeName + _this.typeN,
          st: 0,
          suffix: _this.typeN
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.reg = response.data.content.reg;
            _this.price = response.data.content.price;
            _this.possible = true; //显示查询结果
            // _this.search_t = _this.search_txt;
            _this.typeName = _this.typeN;
            _this.search_t = response.data.content.domain;
            _this.status = 1;
            _this.recruit = response.data.content.reg_title;

            if (_this.reg == 1) {
              _this.possible_t = true;
            } else {
              _this.possible_t = false;
            }
          } else {
            _this.search_t = response.data.content.domain;

            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        })
        .catch(function(error) {
          Toast({
            message: error.data.errmsg,
            duration: 3000
          });
        });
    }
  }
};
</script>

<style lang="scss">
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none; //此处去掉默认的小×
}
</style>
