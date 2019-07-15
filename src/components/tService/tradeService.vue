<template>
  <div id="tradeService" class="tradeService">
    <div class="tradeService-top" id="scroll_top">
      <div class="recruit_bg"></div>
      <!-- <nav-header title="商标服务"></nav-header> -->
      <mt-header title="商标服务" class="header" fixed>
        <mt-button slot="left" icon="back" @click="goback"></mt-button>
        <mt-button slot="right"></mt-button>
      </mt-header>
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
        <a href="javascript:void(0);" @click="goAnchor('#rule')" class="rule">注册规则</a>
        <a href="javascript:void(0);" @click="goAnchor('#process')" class="guide">注册流程</a>
        <a href="javascript:void(0);" @click="goAnchor('#advantage')" class="mark">我们的优势</a>
      </div>
    </div>

    <div class="service-bot containerView-main" id="con">
      <!-- 未查询 -->
      <div class="instial" v-show="resultShow">
        <div class="advantage" id="advantage">
          <p>我们的优势</p>
          <span>
            全国上千名专业顾问，提供面对面上门服务，系统自动生成商标局标准申请格式，提高通过率，知识产权事务所提供人工专业复核，提供注册进度、短信通知流程、实时跟进进度，一站式服务，全程托管，解决您商标申请注册的一切后顾之忧。
          </span>
        </div>
				<div class="advantage" id="rule">
					<p>注册规则</p>
					<span>
						商标申请在先原则是指同一申请最先申请者取得注册的原则。同一申请存有两个或两个以上的申请人，谁取得商标注册，不同制度的国家，所作结论是不同的。在依使用取得商标权的国家中，同一申请的商标注册给予最先使用者，而不问申请先后。在依注册取得商标权的国家中，则最先申请者取得商标注册，而不问使用先后。中国商标注册制度属于后一种。依中国法律规定，凡两个或两个以上的申请人在同种商品或类似商品上，以相同或近似的商标申请注册的，谁先提出申请，谁便取得萌标注册。 
申请先后依商标局编定的申请号为依据，而申请号的编定又以商标局收到的，申请手续齐备并按照规定填写的申请书件的日期为准。对于申请手续不齐备或未按照规定填写申请书件的，应予退回，申请日期不予保留。商标申请在先原则并不排斥商标使用在先原则，若同一申请的两个或两个以上的申请人，于同日申请注册的，适用商标使用在先原则。
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
        <div class="trade-img" id="process">
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
      tradePerson: [],
      status: 0

    };
  },
  created() {
    this.init();
  },
  mounted() {
    // window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    goback(){
      var _this = this;
      if(_this.status == 1){
        _this.resultShow = true;
        _this.tradeName = '';
        _this.status = 0;
      }else{
        _this.$router.push({
          path: '/'
        })
      }
    },
    searchGoods(event) {
     
    },
		goAnchor(type) {
			var anchor = this.$el.querySelector(type);
			let recruit_top=this.$el.querySelector("#scroll_top");
			document.getElementById("con").scrollTop=anchor.offsetTop-recruit_top.offsetHeight-20;
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
					console.log(response);
          if (response.data.errcode == 0) {
            _this.search_t = _this.search_txt;
            _this.status = 1;
            var contentL = response.data.content.list.map(item => {
              return {
                tmName: item.tmName, //商标名称
                nameZh: item.personInfo.length>0?item.personInfo[0].nameZh:"",
                applyDate: item.applyDate,
                intType: item.intType,
                regCode: item.regCode,
                nStatus: item.nStatus
              };
            });

            _this.tradeArr = contentL;

            // _this.tradeArr = response.data.content.list;

            _this.tradePerson = response.data.content.list.personInfo;
            _this.resultShow = false;
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        })
    }
  }
};
</script>

<style lang="scss">
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none; //此处去掉默认的小×
}
</style>
