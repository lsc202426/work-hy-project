<template>
  <div class="product-list">
    <div class="product-list-header">
      <nav-header title="点商标服务"></nav-header>
      <div class="product-list-search">
        <div class="product-list-search-tips" v-show="isShowTips">
          <span>请输入品牌名称</span>
          <span>例如：互易</span>
        </div>
        <input
          type="text"
          @input="changeKeyWord"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
          onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
          v-model="searchKey.keyword"
        />
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
          <div class="result-item-tips">
            <label class="can" v-if="typeList[0].isStatus === 'can'" @click="mayApply(typeList[0].id,typeList[0].name,0)" 
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
          <div class="result-item-tips">
            <label class="can" v-if="typeList[1].isStatus === 'can'"  @click="mayApply(typeList[1].id,typeList[1].name, 1,searchKey.dBPlace)" 
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
          <div class="result-item-tips">
            <label class="can" v-if="typeList[2].isStatus === 'can'"  @click="mayApply(typeList[2].id,typeList[2].name, 2,searchKey.dCservice)" 
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
          <div class="result-item-tips">
            <label class="can" v-if="typeList[3].isStatus === 'can'" @click="mayApply(typeList[3].id,typeList[3].name, 3,searchKey.domainD)">该词可申请注册</label>
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
      }
    };
  },
  methods: {
    mayApply(ids,name,index,key){
      // 拼接关键字
      let temptDomain = "";
      let temptMoney = "";
      var _this = this;
      switch (index) {
        case 0:
          temptDomain = _this.searchKey.keyword + ".商标";
          temptMoney = 3800.00;
          break;
        case 1:
          temptDomain = _this.searchKey.keyword + key + ".商标";
          temptMoney = 2800.00;

          break;
        case 2:
          temptDomain = key + _this.searchKey.keyword + ".商标";
          temptMoney = 2800.00;

          break;
        case 3:
          temptDomain =
            key.place + _this.searchKey.keyword + key.service + ".商标";
          temptMoney = 2800.00;

          break;
      }
      // console.log(ids,name,temptDomain);
      this.$router.push({
        path: "/fillProduct",
        query:{
          id: ids,
          // name: name,
          keyword: temptDomain
        }
      })
    },
    // 监听顶部搜索关键词
    changeKeyWord: function() {
      if (this.searchKey.keyword !== "") {
        this.isShowTips = false;
      } else {
        this.isShowTips = true;
        this.typeList = [];
      }
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
      // 搜索前清空
      that.typeList = [];
      if (that.searchKey.keyword === "") {
        Toast({
          message: "品牌名不能为空",
          position: "middle",
          duration: 1500
        });
        return false;
      }
      Indicator.open({
        spinnerType: "fading-circle"
      });
      that.$axios
        .post("/index.php?c=App&a=searchDomain", {
          userid: 1,
          domain: that.searchKey.keyword,
          mark: "tmd",
          st: 0,
          p: 0,
          suffix: ""
        })
        .then(function(response) {
          // console.log(response);
          let _data = response.data;
          if (_data.errcode === 0) {
            that.typeList = response.data.content;
            //遍历
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
            // console.log(that.typeList);
          }
          Indicator.close();
        })
        .catch(function(error) {
          console.log(error);
          Indicator.close();
        });
    },
    // 精确搜索
    searchType: function(key, index) {
      const that = this;
      // console.log(key,index)
      if ((index === 3 && key.place === "") || key.service === "") {
        Toast({
          message: "关键字不能为空",
          position: "middle",
          duration: 1500
        });
        return false;
      } else {
        if (key === "") {
          Toast({
            message: "关键字不能为空",
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
          userid: 1,
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
          console.log(error);
          Indicator.close();
        });
    }
  },
  created() {
    this.getProdcutList();
  }
};
</script>
