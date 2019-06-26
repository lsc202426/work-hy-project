<template>
  <div id="tradeService" class="tradeService">
    <div class="tradeService-top" id="scroll_top">
      <div class="recruit_bg"></div>

      <!-- <nav-header title="域名服务"></nav-header> -->
      <mt-header title="域名服务" class="header" fixed>
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
          <div class="service-btn domain">
            <img src="../../assets/images/tradeService/select.png" alt />
            <select v-model="typeN" @change="choiceType(typeN)">
              <option
                :value="item.name"
                v-for="(item, index) of typeArr"
                :key="index"
                >{{ item.name }}</option
              >
            </select>
            <!-- <span>{{typeN}}</span> -->
          </div>
        </div>

        <div class="t-service-right" @click="search()">
          <img src="../../assets/images/tradeService/search.png" alt />
          <span>搜索</span>
        </div>
      </div>
      <div class="product-list-toptips">
        <a href="javascript:void(0);" @click="goAnchor('#rule')" class="rule">注册规则</a>
        <a href="javascript:void(0);" @click="goAnchor('#process')" class="guide">注册流程</a>
        <a href="javascript:void(0);" @click="goAnchor('#advantage')" class="mark">关于域名</a>
      </div>
    </div>

    <div class="service-bot containerView-main" id="con" v-if="!possible">
      <!-- 未查询 -->
      <div class="instial">
        <div class="advantage">
          <p>.com</p>
          <span>
            .com是互联网之DNS上的一个通用顶级域（gTLD）。
            它的名称源自英文单词“commercial”，表明由商业组织
            注册此域名的原始意图。.com域名是目前国际最广泛流
            行的通用域名格式，现全球的用户超过1.015亿个。
          </span>
        </div>
        <div class="advantage">
          <p>.cn</p>
          <span>
            .CN，Internet网络域名，国家顶级域名，表示中国国家
            域名。它由我国国际互联网络信息中心（Inter NIC）正
            式注册并运行。.CN域名是全球唯一由中国管理的英文
            国际顶级域名，是中国企业自己的互联网标识，它体现
            了一种文化的认同、自身的价值和定位。
          </span>
        </div>
        <div class="advantage">
          <p>.net</p>
          <span>
            .NET是 Microsoft XML Web services 平台。 XML Web services
            允许应用程序通过 Internet 进行通
            讯和共享数据，而不管所采用的是哪种操作系统、设备
            或编程语言。Microsoft .NET 平台提供创建 XML Web services
            并将这些服务集成在一起之所需。
            对个人用户的好处是无缝的、吸引人的体验。
          </span>
        </div>
				<div class="advantage" id="rule">
				  <p>注册规则</p>
				  <span>
				    域名的注册遵循先申请先注册为原则，管理认证机构对申请企业提出的域名是否违反了第三方的权利不进行任何实质性审查。
				  </span>
				</div>
				<div class="advantage" id="process">
				  <p>注册流程</p>
				  <span>
				    1、准备申请资料：com域名无需提供身份证、营业执照等资料，cn域名已开放个人申请注册，所以申请则需要提供身份证或企业营业执照。<br />
						2、查询域名：在域名注册查询网站注册用户名成功后并查询域名，选择您要注册的域名，并点击注册。<br />
						3、正式申请：查到想要注册的域名，并且确认域名为可申请的状态后，提交注册，并缴纳年费。<br />
						4、申请成功：正式申请成功后，即可开始进入DNS解析管理、设置解析记录等操作。
				  </span>
				</div>
				<div class="advantage" id="advantage">
				  <p>实名制审核</p>
				  <span>
				    为了提升域名注册信息的真实性、准确性、完整性，进一步加强域名注册信息审核工作，CNNIC于2009年12月11日晚间发布通知：<br />
						1、用户向域名注册服务机构在线提交域名注册申请的同时，应当提交书面申请材料。申请材料包括加盖公章的域名注册申请表（原件）、企业营业执照或组织机构代码证（复印件）、注册联系人身份证明（复印件）。<br />
						2、域名注册服务机构应当认真审核用户提交的书面申请材料，审核合格后，将书面申请材料通过传真或电子邮件的形式提交至我中心，并保留书面申请资料。<br />
						3、自域名提交在线申请之日起5日内，CNNIC未收到书面申请材料的或域名申请材料审核不符合条件的，该域名将予以注销。<br />
						4、以上要求自2009年12月14日上午9时起施行。<br />
						5、.CN域名将于2012年5月29日零时起，任何自然人或者能独立承担民事责任的组织均可在本细则规定的顶级域名下申请注册域名，即域名注册的主体扩大至自然人。
				  </span>
				</div>
      </div>
      <!-- 查询 -->
      <div class="result"></div>
    </div>
    <!-- 搜索展示内容 -->
    <div class="content containerView-main" v-if="possible">
      <!-- <div class="content" > -->
      <div class="content_list" v-if="possible_t" @click="fill_information()">
        <!-- <div class="content_list"> -->
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{ search_t }}</span>
            <span class="can_or_not">{{ recruit1 }}</span>
          </div>
          <div class="pirce">￥{{ price }}元/年</div>
        </div>
        <div class="list_right">
          <span>加入清单</span>
        </div>
      </div>
      <div class="content_list" v-else>
        <!-- <div class="content_list"> -->
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{ search_t }}</span>
            <span class="can_or_not not">{{ recruit }}</span>
          </div>
          <div class="pirce">￥{{ price }}元/年</div>
        </div>
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
      typeArr: [
        {
          name: ".com",
          value: 0
        },
        {
          name: ".cn",
          value: 1
        },
        {
          name: ".net",
          value: 2
        }
      ],
      typeN: ".com",
      typeName: "",
      recruit: "已注册",
      recruit1: "可注册",
      possible: false,
      possible_t: false,
      search_txt: "",
      search_t: "",
      reg: "",
      price: "",
      productid: "",
      product_name: "",
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
        _this.possible = false;
        _this.tradeName = '';
        _this.status = 0;
      }else{
        _this.$router.push({
          path: '/'
        })
      }
    },
    searchGoods(event) {},
		goAnchor(type) {
			var anchor = this.$el.querySelector(type);
			let recruit_top=this.$el.querySelector("#scroll_top");
			document.getElementById("con").scrollTop=anchor.offsetTop-recruit_top.offsetHeight-20;
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
          if (response.data.errcode == 0) {
            console.log(response.data.content.list);
            _this.productid = response.data.content.list[0].list[0].id;
            _this.product_name = response.data.content.list[0].list[0].title;
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        });
    },
    // 点击加入清单
    fill_information() {
      var _this = this;
      // console.log(_this.search_t.split('.')[1])
      if (_this.search_t.split(".")[1] == "com") {
        _this.$router.push({
          path: "/domainMsg",
          query: {
            name: _this.search_t,
            price: _this.price,
            productid: 6,
            product_name: ".com域名"
          }
        });
      } else if (_this.search_t.split(".")[1] == "cn") {
        _this.$router.push({
          path: "/domainMsg",
          query: {
            name: _this.search_t,
            price: _this.price,
            productid: 7,
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
    choiceType(val) {
      //   console.log(this.typeN);
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
          //   console.log(response);
          if (response.data.errcode == 0) {
            _this.reg = response.data.content.reg;
            _this.price = response.data.content.price;
            _this.possible = true; //显示查询结果
            // _this.search_t = _this.search_txt;
            _this.typeName = _this.typeN;
            _this.search_t = response.data.content.domain;
            _this.status = 1;

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
