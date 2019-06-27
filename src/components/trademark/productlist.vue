<template>
  <div class="product-list">
    <div class="product-list-header">
      <!-- <nav-header title="点商标服务"></nav-header> -->
      <mt-header title="点商标服务" class="header" fixed>
        <mt-button slot="left" icon="back" @click="goback"></mt-button>
        <mt-button slot="right"></mt-button>
      </mt-header>
      <div class="product-list-search">
        <!-- <div class="product-list-search-tips" v-show="isShowTips">
          <span>请输入品牌名称</span>
          <span>例如：互易</span>
        </div> -->
        <form action="#" class="form-input" @submit.prevent>
          <input
            type="search"
            v-model="searchKey.keyword"
            autocomplete="off"
            @keypress="searchGoods($event)"
            ref="searchInput"
            id="search"
            placeholder="请输入品牌名称     例如：互易"
          />
        </form>
        <div class="product-right" @click="searchBtn">
          <!-- <button class="search" >搜索</button> -->
          <img src="../../assets/images/tradeService/search.png" alt />
          <span>搜索</span>
        </div>
      </div>
      <div class="product-list-toptips">
        <a href="https://管理机构.商标/mcategory/policy" class="rule"
          >注册规则</a
        >
        <a href="https://管理机构.商标/mcategory/policy?s=3" class="guide"
          >注册指南</a
        >
        <a href="https://管理机构.商标/mcategory/tmdomain" class="mark"
          >关于点商标</a
        >
      </div>
    </div>
    <div class="product-list-main containerView-main">
      <!-- 未搜索 -->
      <div
        class="product-list-main-nosearch"
        v-if="
          productlist &&
            productlist.length > 0 &&
            typeList &&
            typeList.length <= 0
        "
      >
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
        <div class="process">
			    <img src="../../assets/images/recruit/process_trade.png" class="process_img" alt>
        </div>
      </div>
      <!-- 搜索结果 -->
      <!-- <div
        class="product-list-main-result"
        v-if="typeList && typeList.length > 0"
      ></div>
      <div class="result-item" v-for="(item, index) in typeList">
        <div class="result-item-title">
          <span class="domin">{{ item.domain }}</span>
          <span class="domin-type">.商标</span>
          <i
            class="icons-status"
            :class="{
              success: item.isStatus === 'can',
              failed: item.isStatus === 'not'
            }"
          ></i>
        </div>
        <p class="result-item-price">￥{{ item.price }}元/年</p>
        <div class="result-item-tips">
          <label class="can" v-if="typeList[1].isStatus === 'can'"
            >该词可申请注册</label
          >
          <label class="can-search" v-if="typeList[1].isStatus === 'search'"
            >搜索看看</label
          >
          <label class="can-not" v-if="typeList[1].isStatus === 'not'"
            >该词已被注册，请更换别的试试</label
          >
        </div>
      </div> -->
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
                success: typeList[0].isStatus === 'can',
                failed: typeList[0].isStatus === 'not'
              }"
            ></i>
          </div>
          <p class="result-item-price">￥{{ typeList[0].price }}元/年</p>
          <p class="tips-word" v-show="typeList[0].tips">
            {{ typeList[0].tips }}
          </p>
          <div class="result-item-tips">
            <label
              class="can"
              v-if="typeList[0].isStatus === 'can'"
              @click="mayApply(typeList[0].id, typeList[0].name, 0)"
              >该词可申请注册&nbsp;></label
            >
            <label class="can-not" v-if="typeList[0].isStatus === 'not'"
              >该词已被注册，请更换别的试试</label
            >
          </div>
        </div>
        <!-- B类 -->
        <div class="result-item item-b">
          <div class="result-item-title">
            <span class="domin">{{ typeList[1].domain.split("+")[0] }}</span>
            <span class="connect">+</span>
            <input
              type="text"
              v-model="searchKey.dBPlace"
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              placeholder="商品/服务名"
              @input="changeKey(1)"
            />
            <span class="domin-type">.商标</span>
            <i
              class="icons-status"
              :class="{
                success: typeList[1].isStatus === 'can',
                failed: typeList[1].isStatus === 'not'
              }"
            ></i>
          </div>
          <p class="result-item-price">￥2800元/年</p>
          <p class="tips-word" v-show="typeList[1].tips">
            {{ typeList[1].tips }}
          </p>

          <div class="result-item-tips">
            <label
              class="can"
              v-if="typeList[1].isStatus === 'can'"
              @click="
                mayApply(typeList[1].id, typeList[1].name, 1, searchKey.dBPlace)
              "
              >该词可申请注册</label
            >
            <label
              @click="searchType(searchKey.dBPlace, 1)"
              class="can-search"
              v-if="typeList[1].isStatus === 'search'"
              >搜索看看</label
            >
            <label class="can-not" v-if="typeList[1].isStatus === 'not'"
              >该词已被注册，请更换别的试试</label
            >
          </div>
        </div>
        <!-- C类 -->
        <div class="result-item item-c">
          <div class="result-item-title">
            <input
              type="text"
              v-model="searchKey.dCservice"
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              @input="changeKey(2)"
              placeholder="指定地"
            />
            <span class="connect">+</span>
            <span class="domin">{{ typeList[2].domain.split("+")[1] }}</span>
            <span class="domin-type">.商标</span>
            <i
              class="icons-status"
              :class="{
                success: typeList[2].isStatus === 'can',
                failed: typeList[2].isStatus === 'not'
              }"
            ></i>
          </div>
          <p class="result-item-price">￥2800元/年</p>
          <p class="tips-word" v-show="typeList[2].tips">
            {{ typeList[2].tips }}
          </p>

          <div class="result-item-tips">
            <label
              class="can"
              v-if="typeList[2].isStatus === 'can'"
              @click="
                mayApply(
                  typeList[2].id,
                  typeList[2].name,
                  2,
                  searchKey.dCservice
                )
              "
              >该词可申请注册</label
            >
            <label
              @click="searchType(searchKey.dCservice, 2)"
              class="can-search"
              v-if="typeList[2].isStatus === 'search'"
              >搜索看看</label
            >
            <label class="can-not" v-if="typeList[2].isStatus === 'not'"
              >该词已被注册，请更换别的试试</label
            >
          </div>
        </div>
        <!-- D类 -->
        <div class="result-item item-d">
          <div class="result-item-title">
            <input
              type="text"
              v-model="searchKey.domainD.place"
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              @input="changeKey(3)"
              placeholder="指定地"
            />
            <span class="connect">+</span>
            <span class="domin">{{ typeList[3].domain.split("+")[1] }}</span>
            <span class="connect">+</span>
            <input
              type="text"
              v-model="searchKey.domainD.service"
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              @input="changeKey(3)"
              placeholder="商品/服务名"
            />
            <span class="domin-type">.商标</span>
            <i
              class="icons-status"
              :class="{
                success: typeList[3].isStatus === 'can',
                failed: typeList[3].isStatus === 'not'
              }"
            ></i>
          </div>
          <p class="result-item-price">￥2800元/年</p>
          <p
            class="tips-word"
            v-show="typeList[3].tips"
            v-for="(item, index) in typeList[3].tipsThree"
            :key="index"
          >
            {{ item }}
          </p>

          <div class="result-item-tips">
            <label
              class="can"
              v-if="typeList[3].isStatus === 'can'"
              @click="
                mayApply(typeList[3].id, typeList[3].name, 3, searchKey.domainD)
              "
              >该词可申请注册</label
            >
            <label
              @click="searchType(searchKey.domainD, 3)"
              class="can-search"
              v-if="typeList[3].isStatus === 'search'"
              >搜索看看</label
            >
            <label class="can-not" v-if="typeList[3].isStatus === 'not'"
              >该词已被注册，请更换别的试试</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      // keyword: "",
      isShowTips: true,
      productlist: [],
      isResult: true,
      typeList: [],
      searchKey: {
        keyword: "",
        dBPlace: "",
        dCservice: "",
        domainD: {
          place: "",
          service: ""
        }
      },
      status: 0
    };
  },
  methods: {
    goback(){
      var _this = this;
      if(_this.status == 1){
        _this.typeList = [];
        _this.searchKey.keyword = '';
        _this.status = 0;
      }else{
        _this.$router.push({
          path: '/'
        })
      }
    },
    searchGoods() {},
    mayApply(ids, name, index, key) {
      // 拼接关键字
      let temptDomain = "";
      let temptMoney = "";
      var _this = this;
      switch (index) {
        case 0:
          temptDomain = _this.searchKey.keyword + ".商标";
          temptMoney = _this.typeList[0].price;
          break;
        case 1:
          temptDomain = _this.searchKey.keyword + key + ".商标";
          temptMoney = 2800.0;

          break;
        case 2:
          temptDomain = key + _this.searchKey.keyword + ".商标";
          temptMoney = 2800.0;

          break;
        case 3:
          temptDomain =
            key.place + _this.searchKey.keyword + key.service + ".商标";
          temptMoney = 2800.0;

          break;
      }
      this.$router.push({
        path: "/fillProduct",
        query: {
          id: ids,
          // name: name,
          keyword: temptDomain,
          price: temptMoney
        }
      });
    },
    // 监听顶部搜索关键词
    /* changeKeyWord: function() {
      if (this.searchKey.keyword !== "") {
        this.isShowTips = false;
      } else {
        this.isShowTips = true;
        this.typeList = [];
      }
    }, */
    // 验证输入内容格式
    sendSearchCheck: function sendSearchCheck() {
      if (this.searchKey.keyword.indexOf(" ") > -1) {
        Toast({
          message: "请不要用空格。",
          duration: 3000
        });
        // this.showHint = true;
        return false;
      }
      // 判断头部或尾部是否含有'-' S
      var hasStr = this.searchKey.keyword.slice(0, 1) == "-";
      var haslast =
        this.searchKey.keyword.slice(
          this.searchKey.keyword.length - 1,
          this.searchKey.keyword.length
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
      var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      if (
        regEn.test(this.searchKey.keyword) ||
        regCn.test(this.searchKey.keyword)
      ) {
        Toast({
          message: "请不要用特殊字符（如!、$、&等）。",
          duration: 3000
        });
        return false;
      }
      return true;
    },
    // 监听搜索关键词的变化
    changeKey: function(index) {
      const that = this;
      // 如果值改变，状态跟着改变
      that.$set(that.typeList, index, {
        ...that.typeList[index],
        isStatus: "search",
        reg: 0
      });
    },
    //获取搜索
    getProdcutList: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getProducts", {
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
        });
    },
    // 搜索商标
    searchBtn: function() {
      const that = this;
      // 搜索前清空
      // that.typeList = [];
      if (that.searchKey.keyword === "") {
        Toast({
          message: "请输入品牌名称",
          position: "middle",
          duration: 1500
        });
        return false;
      }
      if (!that.sendSearchCheck()) {
        return;
      }
      Indicator.open({
        spinnerType: "fading-circle"
      });
      that.$axios
        .post("/index.php?c=App&a=searchDomain", {
          domain: that.searchKey.keyword,
          mark: "tmd",
          st: 0,
          p: 0,
          suffix: ""
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            that.typeList = response.data.content;

            that.status = 1;

            //换行转换
            that.typeList.map(function(_item) {
              _item.tipsThree = _item.tips.split("\\n");
            });

            that.typeList.map(function(_item) {
              // 正则判断是否有input关键字
              let reg = RegExp(/#INPUT#/);
              // 判断是否已被注册
              if (_item.reg === 0) {
                _item.isStatus = "not";
              } else if (_item.reg === 1) {
                if (_item.domain.match(reg)) {
                  _item.isStatus = "search";
                } else {
                  _item.isStatus = "can";
                }
              }
            });
          }
          Indicator.close();
        })
        .catch(function(error) {
          Indicator.close();
        });
    },
    // 精确搜索
    searchType: function(key, index) {
      const that = this;
      if ((index === 3 && key.place === "") || key.service === "") {
        Toast({
          message: "请输入关键字",
          position: "middle",
          duration: 1500
        });
        return false;
      } else {
        if (key === "") {
          Toast({
            message: "请输入关键字",
            position: "middle",
            duration: 1500
          });
          return false;
        }
      }
      // 拼接关键字
      let temptDomain = "";
      switch (index) {
        case 1:
          temptDomain = that.searchKey.keyword + key + ".商标";
          break;
        case 2:
          temptDomain = key + that.searchKey.keyword + ".商标";
          break;
        case 3:
          temptDomain =
            key.place + that.searchKey.keyword + key.service + ".商标";
          break;
      }
      Indicator.open({
        spinnerType: "fading-circle"
      });
      that.$axios
        .post("/index.php?c=App&a=searchDomain", {
          domain: temptDomain,
          mark: "tmd",
          st: 1,
          p: 0,
          suffix: ""
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            if (_data.content.reg === 1) {
              that.$set(that.typeList, index, {
                ...that.typeList[index],
                isStatus: "can",
                reg: 1
              });
            } else {
              that.$set(that.typeList, index, {
                ...that.typeList[index],
                isStatus: "not",
                reg: 0
              });
            }
          }
          Indicator.close();
        })
        .catch(function(error) {
          Indicator.close();
        });
    }
  },
  watch: {
    // 'searchKey.keyword':{
    //   handler(n,o){
    //     if(n != ''){
    //       this.isShowTips = false;
    //     }else{
    //       this.isShowTips = true;
    //       this.typeList = [];
    //     }
    //   }
    // }
  },
  created() {
    this.getProdcutList();
  }
};
</script>
<style lang="scss" scoped>
.containerView-main{
  padding-top: 4.48rem !important;
  padding-bottom: 0 !important;
}
.process{
  padding: 0rem 0.32rem;
  .process_img{
    width: 100%;
  }

}
.tips-word {
  font-size: 0.24rem;
  margin-bottom: 0.1rem;
  color: #6f7181;
  position: relative;
  padding-left: 0.2rem;
  &:before {
    content: "";
    display: inline-block;
    width: 0.08rem;
    height: 0.08rem;
    background-color: #686d7f;
    border-radius: 0.08rem;
    // vertical-align: middle;
    margin-right: 0.1rem;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
.form-input {
  width: 72%;
}
.product-left {
}
.product-right {
  background: rgba(255, 255, 255, 0.17);
  padding: 0 0.32rem;
  font-size: 0.3rem;
  img {
    width: 0.32rem;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
    color: #fff;
    font-size: 0.3rem;
    white-space: nowrap;
  }
}
.product-list-search {
  align-items: center;
  overflow: hidden;
  line-height: 0.92rem;
  font-size: 0.3rem;
  input {
    font-size: 0.3rem;
    // position: absolute;
    // // height: 100%;
    // line-height: 0.92rem;
    // top: 0;
    width: 100%;
  }
}
.product-list-search-tips {
  left: 0.4rem;
}
.product-list-search input {
  // padding-left: 0.4rem;
  color: #fff;
  // width: 62%;
  padding: 0 0 0 0.4rem;
}
.product-list-search input::-webkit-input-placeholder {
  // color: #fff;
  color: rgba(255, 255, 255, 0.5);
}

.result-item-title input {
  color: #2e3a54;
  font-size: 0.28rem;
}
.result-item-title input::-webkit-input-placeholder {
  // color: #fff;
  color: #999;
}
.product-list-search .search {
  height: 100%;
  display: inline-block;
}
.product-list-main-result .result-item-title input {
  // border: none;
  border: 1px solid #dddee1;
  appearance: button;
  -moz-appearance: button; /* Firefox */
  -webkit-appearance: button; /* Safari 和 Chrome */
}
.product-list-toptips {
  a:hover {
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
