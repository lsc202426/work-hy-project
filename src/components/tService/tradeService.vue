<template>
  <div id="tradeService" class="tradeService">
    <div class="tradeService-top">
      <div class="recruit_bg"></div>

      <nav-header title="商标服务"></nav-header>
      <div class="t-service">
        <div class="t-service-left">
          <form action="#" @submit.prevent>
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
          <div class="service-btn" @click="search()">
            <img src="../../assets/images/tradeService/search.png" alt />
            <span>查商标</span>
          </div>
        </div>

        <div class="t-service-right" @click="trade()">申请注册</div>
      </div>
      <div class="product-list-toptips">
        <a href="javascript:void(0);" class="rule">注册规则</a>
        <a href="javascript:void(0);" class="guide">注册指南</a>
        <a href="javascript:void(0);" class="mark">关于商标服务</a>
      </div>
    </div>

    <div class="service-bot containerView-main">
      <!-- 未查询 -->
      <div class="instial" v-show="resultShow">
        <div class="advantage">
          <p>我们的优势</p>
          <span>
            全国上千名专业顾问，提供面对面上门服务，系统自动生成商标局标准申请格式，提高通过率，知识产权事务所提供人工专业复核，提供注册进度、短信通知流程、实时跟进进度，一站式服务，全程托管，解决您商标申请注册的一切后顾之忧。
          </span>
        </div>
        <!-- <div class="advantage">
          <p>商标注册的优势</p>
          <span>
            .CN，Internet网络域名，国家顶级域名，表示中国国家
            域名。它由我国国际互联网络信息中心（Inter NIC）正
            式注册并运行。.CN域名是全球唯一由中国管理的英文
            国际顶级域名，是中国企业自己的互联网标识，它体现
            了一种文化的认同、自身的价值和定位。
          </span>
        </div> -->
        <div class="trade-img">
          <img src="../../assets/images/tradeService/flow.png" alt />
        </div>
      </div>
      <!-- 查询 -->
      <div class="result" v-show="!resultShow && tradeArr.length != 0">
        <div class="result-tips">
          <img src="../../assets/images/tradeService/tips.png" alt="" />
          <span
            >商标检索结果仅供参考，不作为商标能否注册的法律依据；具体以商标局官网查询为准。</span
          >
        </div>
        <div class="result-box">
          <div
            class="result-list"
            v-for="(item, index) in tradeArr"
            :key="index"
          >
            <div class="bot-msg">
              <span class="left">商标名称<i>:</i></span>
              <span class="right">{{ item.tmName }}</span>
            </div>
            <div class="bot-msg">
              <span class="left">申请人<i>:</i></span>
              <span class="right">{{ item.nameZh }}</span>
            </div>
            <div class="bot-msg">
              <span class="left">申请时间<i>:</i></span>
              <span class="right">{{ item.applyDate }}</span>
            </div>
            <div class="bot-msg">
              <span class="left">商品类别<i>:</i></span>
              <span class="right">第{{ item.intType }}类</span>
            </div>
            <div class="bot-msg">
              <span class="left">注册号<i>:</i></span>
              <span class="right">{{ item.regCode }}</span>
            </div>
            <!-- <div class="bot-msg">
              <span class="left">当前状态<i>:</i></span>
              <span class="right"></span>
            </div> -->
          </div>
        </div>
      </div>
      <div
        class="no-msg"
        style="font-size: 0.3rem;"
        v-show="!resultShow && tradeArr.length == 0"
      >
        未查询到相关的商标信息
      </div>
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
      productid: "",
      product_name: "",
      resultShow: true,
      tradeArr: [],
      tradePerson: []
    };
  },
  created() {
    this.init();
  },
  mounted() {
    // window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    searchGoods(event) {
      // if (event.keyCode == 13) {
      // event.preventDefault(); //禁止默认事件（默认是换行）
      // this.keyword = event.target.value;
      // if(this.tradeName != ''){
      //   alert(12)
      //   // Toast({
      //   //     message: "请输入品牌名称",
      //   //     duration: 3000
      //   //   });
      //   //   return;
      //     this.search();
      // }
      // }
    },
    // 获取产品id,名称
    init() {
      let _this = this;
      _this.mark = _this.$route.query.mark;
      _this.$axios
        .post("index.php?c=App&a=getProducts", {
          mark: _this.mark,
          p: 1
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            // console.log(response.data.content.list[0].list[0]);
            _this.productid = response.data.content.list[0].list[0].id;
            _this.product_name = response.data.content.list[0].list[0].title;
            _this.price = response.data.content.list[0].list[0].price;
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        });
    },
    // 点击申请注册
    trade() {
      var _this = this;
      this.$router.push({
        path: "/application",
        query: {
          productid: _this.productid,
          product_name: _this.product_name,
          price: _this.price
        }
      });
    },
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
          mark: "bs",
          domain: _this.tradeName,
          st: 0
        })
        .then(function(response) {
          // console.log(response.data.content.list);
          if (response.data.errcode == 0) {
            _this.search_t = _this.search_txt;

            var contentL = response.data.content.list.map(item => {
              // console.log(item)
              return {
                tmName: item.tmName, //商标名称
                nameZh: item.personInfo[0].nameZh,
                applyDate: item.applyDate,
                intType: item.intType,
                regCode: item.regCode,
                nStatus: item.nStatus
              };
            });

            _this.tradeArr = contentL;

            // _this.tradeArr = response.data.content.list;

            _this.tradePerson = response.data.content.list.personInfo;
            console.log(_this.tradeArr, 1321);
            _this.resultShow = false;
          } else {
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
