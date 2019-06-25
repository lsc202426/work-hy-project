<template>
  <div id="tradeService" class="tradeService">
    <div class="tradeService-top">
      <div class="recruit_bg"></div>

      <nav-header title="域名服务"></nav-header>
      <div class="t-service">
        <div class="t-service-left">
          <input type="text" placeholder="请输入品牌名称" v-model="tradeName" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')">
          <div class="service-btn domain">
            <img src="../../assets/images/tradeService/select.png" alt>
            <select v-model="typeN" @change="choiceType(typeN)">
              <option :value="item.name" v-for="(item,index) of typeArr" :key="index">{{item.name}}</option>
            </select>
            <!-- <span>{{typeN}}</span> -->
          </div>
        </div>

        <div class="t-service-right" @click="search()">
          <img src="../../assets/images/tradeService/search.png" alt>
          <span>搜索</span>
        </div>
      </div>
    </div>

    <div class="service-bot" v-if="!possible">
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
            .NET是 Microsoft XML Web services 平台。
            XML Web services 允许应用程序通过 Internet 进行通
            讯和共享数据，而不管所采用的是哪种操作系统、设备
            或编程语言。Microsoft .NET 平台提供创建
            XML Web services 并将这些服务集成在一起之所需。
            对个人用户的好处是无缝的、吸引人的体验。
          </span>
        </div>
      </div>
      <!-- 查询 -->
      <div class="result"></div>
    </div>
    <!-- 搜索展示内容 -->
    <div class="content" v-if="possible">
    <!-- <div class="content" > -->
      <div class="content_list" v-if="possible_t" @click="fill_information()">
      <!-- <div class="content_list"> -->
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{search_t}}</span>
            <span class="can_or_not">{{recruit1}}</span>
          </div>
          <div class="pirce">￥{{price}}元/年</div>
        </div>
        <div class="list_right">
          <span>加入清单</span>
        </div>
      </div>
      <div class="content_list" v-else>
      <!-- <div class="content_list"> -->
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{search_t}}</span>
            <span class="can_or_not not">{{recruit}}</span>
          </div>
          <div class="pirce">￥{{price}}元/年</div>
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
      search_txt: '',
      search_t:'',
      reg: '',
      price: '',
      productid: '',
      product_name: '',
    };
  },
  created() {
    this.init();
  },
  mounted() {
    // window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    init() {
				let _this = this;
				_this.mark=_this.$route.query.mark;
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
					})
					.catch(function(error) {
						Toast({
							message: "网络异常，请稍后再试",
							duration: 3000
						});
					});
      },
      // 点击加入清单
      fill_information(){
          var _this = this;
          console.log(_this.search_t.split('.')[1])
          if(_this.search_t.split('.')[1] == 'com'){

            _this.$router.push({
                path:'/domainMsg',
                query: {
                  name: _this.search_t,
                  price: _this.price,
                  productid: 6,
                  product_name: '.com域名'
                }
            })
          }else if(_this.search_t.split('.')[1] == 'cn'){

            _this.$router.push({
                path:'/domainMsg',
                query: {
                  name: _this.search_t,
                  price: _this.price,
                  productid: 7,
                  product_name: '.cn域名'
                }
            })
          }else if(_this.search_t.split('.')[1] == 'net'){

            _this.$router.push({
                path:'/domainMsg',
                query: {
                  name: _this.search_t,
                  price: _this.price,
                  productid: 11,
                  product_name: '.net域名'
                }
            })
          }
      },
    //修改类型
    choiceType(val) {
    //   console.log(this.typeN);
      
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
      _this.$axios
        .post("index.php?c=App&a=searchDomain", {
          mark: "domain",
          domain: _this.tradeName+_this.typeN,
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

<style lang="scss"></style>
