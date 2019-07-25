<template>
  <div id="addSuccess" class="public play-success">
    <nav-header title="" gobackurl="/user"></nav-header>
    <div class="public-main containerView-main">
      <div class="public-main-item">
        <img
          v-if="play_state"
          class="public-main-img"
          src="@/assets/images/common/success.png"
        />
        <!-- <img
          v-else
          class="public-main-img"
          src="@/assets/images/common/icon_fail.png"
        /> -->
        <p class="public-main-text">加入成功</p>
        
      </div>
      <div class="btn-bot">
        <button class="public-main-btn" @click="seeOrder()">查看申请列表</button>
        <button class="public-main-btn back" @click="goback()">继续选购申请</button>
      </div>
      <div class="recom-product">
        <div class="recom-product-til">
          <img src="@/assets/images/common/product_left.png" alt="">
          <span>推荐产品</span>
          <img src="@/assets/images/common/product_right.png" alt="">
        </div>
        <div class="recommed">
          <div class="recommed-list" v-for="(item,index) in getProduct" :key="index" @click="goProduct(item.mark)">
            <img :src="'http://oapi.huyi.cn:6180/' + item.icon" alt="" class="recommed-left">
            <div class="recommed-right">
              <span class="produ-til">{{item.name}}</span>
              <p>
                <span class="round">
                  <i></i>
                </span>
                <span class="p-word">{{item.desc}}</span>
              </p>
              <img src="@/assets/images/common/recommend.png" alt="">
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // out_order_no: this.$route.query.out_order_no,
      play_state: true, //支付状态
      play_stateName: "", //支付状态名
      getProduct: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      if(JSON.parse(sessionStorage.product)){
          _this.getProduct = JSON.parse(sessionStorage.product);
          console.log(_this.getProduct)
      }
    },
    // 返回首页
    goback(){
      this.$router.push({
        path: "/"
      });
    },
    // 点击推荐产品
    goProduct(mark){
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
    },
    // 获取推荐的产品
    /* getCommed(){
      let _this = this;
      _this.$axios
        .post("index.php?c=App&a=getOrderNextDo", {
          out_order_no: _this.out_order_no
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.getProduct = response.data.content
          } else {
            
          }
        });
    }, */
    seeOrder() {
      this.$router.push({
        path: "/shoppingCart"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#addSuccess{
  height: 100%;
}
.public-main-text{
  font-size: 0.4rem;
}
#app .mint-header{
    border-bottom: none;
}
.public-main{
    width: 100%;
}
.recom-product{
  padding: 1rem 0.74rem 0.2rem;
  .recom-product-til{
    img{
      vertical-align: middle;
      height: 0.34rem;
    }
    span{
      vertical-align: middle;
      padding: 0 0.24rem;
      font-size: 0.4rem;
      color: #2C3852;
    }
  }
  .recommed{
    padding-top: 0.46rem;
    .recommed-list{
      padding: 0.4rem 0.42rem;
      border: 1px solid #DDDEE1;
      display: flex;
      align-items: center;
      border-radius: 0.04rem;
      position: relative;
      margin-bottom: 0.26rem;
      .recommed-left{
        height: 1.18rem;
      }
      .recommed-right{
        text-align: left;
        padding-left: 0.22rem;
        .produ-til{
          margin-bottom: 0.08rem;
          display: inline-block;
        }
        p{
          font-size: 0.2rem;
          color: #6F7181;
          display: flex;
          align-items: baseline;
          .round{
            display: inline-block;
            height: 8px;
            width: 8px;
            flex: none;
            margin: 0 0.1rem 0 0;
            position: relative;
            i{
              height: 4px;
              width: 4px;
              background: #686D7F;
              border-radius: 50%;
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);

            }
          }
          .p-word{
            // padding-left: 0.2rem;

          }
          
        }
        img{
          height: 0.74rem;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}
.containerView-main{
  padding: 0 0 1rem !important;
}

.public-main-btn{
  width: 2.9rem;
  margin-top: 0 !important;
}
.back {
  background: #fff;
  border: 1px solid #028DFF;
  border-radius: 0.5rem;
  color: #0086FF;
  margin-left: 0.38rem;
}
.btn-bot{
  display: flex;
  justify-content: space-between;
  align-items: center;
//   position: fixed;
//   bottom: 0;
//   left: 0;
  width: 100%;
  padding: 0.96rem 1.08rem 0.6rem;
  background: #fff;
}
.public-main-img{
  width: 1.58rem !important;
  height: 1.58rem !important;
  margin-top: 0.8rem;
}
.public-main{
  align-items: initial;
  display: inline-block;
}
</style>

