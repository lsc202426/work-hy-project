<template>
  <div class="index">
    <div class="content_box">
      <!-- 轮播 -->
      <div class="banner">
        <mt-swipe :auto="3000">
          <mt-swipe-item
            v-for="(banner, index) in banners"
            :key="index"
            @click="goProduct(banner.action_value)"
          >
            <img
              v-lazy="'http://oapi.huyi.cn:6180/' + banner.banner"
              style="width:100%"
              alt=""
            />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 产品 -->
      <div class="product">
        <div
          class="product_box"
          v-for="(product, index) in products"
          :key="index"
          @click="goProduct(product.mark)"
        >
          <div class="product_i">
            <img
              v-lazy="'http://oapi.huyi.cn:6180/' + product.head_img"
              alt=""
            />
            <div class="product_con">
              <div class="con_title">{{ product.name }}</div>
              <div class="con_txt">{{ product.desc }}</div>
              <div class="register">立即注册 ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 二维码 -->
      <div class="code">
        <div class="code_box">
          <div class="code_con" @click="code_in()">
            <img src="../assets/images/index/icon_code.png" alt="" />
            <span>Wechat二维码</span>
          </div>
          <transition name="fade" mode="out-in">
            <div class="code_open" v-if="code_show">
              <div class="code_bg">
                <img src="../assets/images/index/icon_code1.png" alt="" />
                <p>互易.商标</p>
              </div>
              <div class="code_bg">
                <img src="../assets/images/index/icon_code2.png" alt="" />
                <p>官方微信公众号</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 服务机构 -->
      <div class="service">
        <div class="title">服务机构</div>
        <div
          class="service_con"
          v-for="(service, index) in services"
          :key="index"
        >
          <div class="con_box">
            <p>{{ service.name }}</p>
            <p>{{ service.address }}</p>
            <p>电话：{{ service.phone }}</p>
          </div>
        </div>
        <div class="service_con">
          <div class="con_box record">
            <p class="title">互易品牌管理</p>
            <p>环球商域科技有限公司提供技术服务|粤ICP备14097259号</p>
          </div>
        </div>
      </div>
    </div>
    <nav-botton></nav-botton>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Lazyload } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      banners: [],
      products: [],
      services: [],
      code_show: false //二维码控制手柄
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      this.$axios
        .get("index.php?c=App&a=getIndex", {
          dpi_version: "H5"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.errcode == 0) {
            _this.banners = response.data.content.first_banner;
            _this.products = response.data.content.product;
            _this.services = response.data.content.department;
          }
        })
        .catch(function(error) {
          Toast({
            message: error.data.errmsg,
            duration: 3000
          });
        });
    },
    code_in() {
      this.code_show = !this.code_show;
    },
    goProduct(mark) {
      if (mark) {
        switch (mark) {
          case "tmd":
            this.$router.push({
              //跳转点商标
              path: "/productlist",
              query: {
                mark: mark
              }
            });
            break;
          case "dzp":
            this.$router.push({
              //跳转点招聘
              path: "/recruit",
              query: {
                mark: mark
              }
            });
            break;
          case "bs":
            this.$router.push({
              //跳转商标服务
              path: "/tradeService",
              query: {
                mark: mark
              }
            });
            break;
          case "domain":
            this.$router.push({
              //跳转域名服务
              path: "/domain",
              query: {
                mark: mark
              }
            });
            break;
          case "ecweb":
            this.$router.push({
              //跳转一站通
              path: "/oneStation",
              query: {
                mark: mark
              }
            });
            break;
          default:
            this.$router.push({
              //跳转点商标
              path: "/",
              query: {
                mark: mark
              }
            });
            break;
        }
      } else {
        return;
      }
    }
  }
};
</script>
