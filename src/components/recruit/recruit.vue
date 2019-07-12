<template>
  <div class="recruit">
    <!-- 头部 -->
    <div class="recruit_top" id="scroll_top">
      <div class="recruit_bg"></div>
      <div class="top_title">
        <span class="go_index" @click="goback"></span>点招聘
      </div>
      <div class="search">
        <div class="search_box">
          <div class="input_b">
            <form action="#" @submit.prevent>
              <input type="search" v-model="search_txt" placeholder="请输入品牌名称" autocomplete="off"  @keypress="searchGoods($event)" ref="searchInput" id="search">
            </form>
            <span v-show="!search_t">例：互易</span>
          </div>
          <div class="button_b" @click="search()">
            <div class="button_bg"></div>
            <img src="../../assets/images/recruit/icon_search.png" alt>
            <span>搜索</span>
          </div>
        </div>
      </div>
			<div class="product-list-toptips">
			  <a href="https://管理机构.招聘/mcategory/policy" class="rule"
			    >注册规则</a
			  >
			  <a href="javascript:void(0);" @click="goAnchor('#process')" class="guide"
			    >注册流程</a
			  >
			  <a href="javascript:void(0);" @click="goAnchor('#process_b')" class="mark"
			    >关于点招聘</a
			  >
			</div>
    </div>
    <div class="recruit_con containerView-main" id="con">
			<!-- 搜索展示内容 -->
			<div class="content" v-if="possible">
			  <div class="content_list" v-if="possible_t" @click="fill_information()">
			    <div class="list_left">
			      <div class="list_name">
			        <span class="name_blue">{{ search_t }}</span>.招聘
			        <span class="can_or_not">{{ recruit1 }}</span>
			      </div>
			      <div class="pirce">￥{{ price }}元/年</div>
			    </div>
			    <div class="list_right">
			      <span>加入清单</span>
			    </div>
			  </div>
			  <div class="content_list" v-else>
			    <div class="list_left">
			      <div class="list_name">
			        <span class="name_blue">{{ search_t }}</span>.招聘
			        <span class="can_or_not not">{{ recruit }}</span>
			      </div>
			      <div class="pirce">￥{{ price }}元/年</div>
			    </div>
			  </div>
			</div>
			<!-- 流程 -->
			<div class="process" id="process">
			  <img src="../../assets/images/recruit/process_bg.png" class="process_img" alt>
			</div>
			<!-- 关于点招聘 -->
			<div class="process_b" id="process_b">
			  <div class="title">关于点招聘</div>
			  <div class="process_txt">
			    &nbsp;&nbsp;“点招聘”域名管理机构是“.招聘”域名注册规则、管理规则的制定机构，负责“.招聘”顶级域名的技术维护,确保“.招聘”域名的正常、健康运行。
			    <br>&nbsp;&nbsp;我们的团队由专业的技术人员、品牌保护专家、互联网服务专家组成，遵循ICANN对通用顶级域的规则进行运作。
			    <br>&nbsp;&nbsp;“点招聘”域名管理机构拥有领先的网络技术基础设施，通过强大技术力量和服务器分布为用户提供可控的，稳定的和安全的互联网服务，确保“.招聘”域名在互联网上的正常运行。我们提供7x24小时的客户服务，务求能最高效解决用户问题。
			    <br>&nbsp;&nbsp;“点招聘”域名管理机构多年来从事知识产权类服务，包括知识产权的网上保护，维权服务的实践，拥有多年的品牌保护、品牌互联网保护及推广经验，为我们制定健全的“点招聘”域名注册管理规则提供了丰富的指引。为了能充分的保护品牌所有人的权力，我们也联合了ICANN认证的亚洲争议解决中心、具有多年互联网从业经验及知
			    识产权从业经验的专家团队共同制定“点招聘”的相关管理规则，确保“点招聘”域名管理机构以公正、公立、公平的服务态度，运营“点招聘”域名。
			    <br>&nbsp;&nbsp;“点招聘”域名管理机构目前总部设立于香港，未来计划将会在全球开设若干办事处。
			    <br>&nbsp;&nbsp;我们的使命：致力于帮助个人或企业在互联网时代能够更便捷和迅速的找到合适自己的成功团队或伙伴。
			    <br>&nbsp;&nbsp;我们的愿景：成功不止是一个人的精彩，用凝聚的力量去创造胜利才会更加辉煌！
			  </div>
			</div>
		</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "recruit",
  data() {
    return {
      search_txt: "",
      search_t: "",
      reg: "",
      price: "",
      recruit: "已注册",
      recruit1: "可注册",
      possible: false,
      possible_t: false,
      text: "",
      mark: "", //产品类型
      product_name: "", //产品名称
      productid: "", //产品id
      status: 0
    };
  },
  created() {
    this.init();
  },
  methods: {
    searchGoods (event) {
        
    },
    // 返回
    goback(){
      var _this = this;
      if(_this.status == 1){
        _this.possible = false;
        _this.search_txt = '';
        _this.status = 0;
      }else{
        _this.$router.push({
          path: '/'
        })
      }
    },
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
            _this.product_name = response.data.content.list[0].list[0].title;
            _this.productid = response.data.content.list[0].list[0].id;
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
    },
    // 验证输入内容格式
     sendSearchCheck: function sendSearchCheck() {
        if (this.search_txt.indexOf(' ') > -1) {
            Toast({
							message: "请不要用空格。",
							duration: 3000
            });
            // this.showHint = true;
            return false;
        }
        // 判断头部或尾部是否含有'-' S
        var hasStr = this.search_txt.slice(0,1) == '-';
        var haslast = this.search_txt.slice(this.search_txt.length - 1,this.search_txt.length) == '-';
        if (hasStr || haslast) {
            Toast({
							message: "“-”不能放在开头或结尾。",
							duration: 3000
            });
            return false;
        }
        // 判断头部或尾部是否含有'-' E

        // 判断头是否含有特殊字符 S
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if(regEn.test(this.search_txt) || regCn.test(this.search_txt)) {
            
            Toast({
							message: "请不要用特殊字符（如!、$、&等）。",
							duration: 3000
            });
            return false;
        }
        return true;
    },
    search() {
      let _this = this;
      if (_this.search_txt == "") {
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
          mark: "dzp",
          domain: _this.search_txt,
          st: 0
        })
        .then(function(response) {
          
          if (response.data.errcode == 0) {
            _this.reg = response.data.content.reg;
            _this.price = response.data.content.price;
            _this.possible = true; //显示查询结果
            _this.search_t = _this.search_txt;
            _this.status = 1;

            if (_this.reg == 1) {
              _this.possible_t = true;
            } else {
              _this.possible_t = false;
            }
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
    },
    fill_information() {
      this.text = this.search_t + ".招聘";
      this.$router.push({
        path: "/fill_information",
        query: {
          text: this.text, //申请词
          price: this.price, //单价
          product_name: this.product_name, //产品名称
          productid: this.productid //产品id
        }
      });
    }
  }
};
</script>
