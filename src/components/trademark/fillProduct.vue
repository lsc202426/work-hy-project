<template>
  <div
    class="fill_information"
    :class="{ fill_bot: pageNum == 0 || pageNum == 2 }"
  >
    <!-- <nav-header title=" "></nav-header> -->
    <mt-header class="header" fixed>
      <!-- <router-link to="/" slot="left"> -->
      <mt-button slot="left" icon="back" @click="goback(pageNum)"></mt-button>
      <!-- </router-link> -->
      <mt-button slot="right"></mt-button>
    </mt-header>

    <div class="con_box containerView-main">
      <div class="til-word">
        <div
          class="title"
          v-show="pageNum == 0 || pageNum == 1"
          :class="{ active: pageNum == 0 }"
        >
          选择年限
        </div>
        <div
          class="title"
          v-show="pageNum == 0 || pageNum == 1"
          :class="{ active: pageNum == 1 }"
        >
          申请主体
        </div>
        <div class="support-msg" v-show="pageNum == 2">申请词信息</div>
      </div>

      <div class="list_box" v-if="pageNum == 0">
        <div class="list_item">
          <span>申请词</span>
          <input type="text" readonly="readonly" v-model="text" />
        </div>
        <div class="list_item">
          <span>年限</span>
          <select v-model="year" @change="choiceYear()">
            <option
              :value="index + 1"
              v-for="(item, index) of 10"
              :key="index"
              >{{ item }}</option
            >
          </select>
          <span class="icon_r"></span>
        </div>

        <div class="list_item" @click="applyClass()">
          <span>类别</span>
          <div class="list_item-tips">
            <p class="tp">请选择类别</p>
            <p>(超出10个类需付费)</p>
          </div>
          <span class="icon_r"></span>
        </div>
        <!-- 商标选中类别 -->
        <div class="apply-class-item">
          <div
            class="apply-class-item-list"
            v-for="(val, index) in getSelectClass.classType"
            :key="index"
          >
            <h2 class="apply-class-item-list-title">
              {{ index }}
            </h2>
            <div class="apply-class-item-list-main">
              <span
                v-for="item in getSelectClass.classType[index]"
                :key="item.productid"
                >{{ item.productname }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="list_box" v-if="pageNum == 1">
        <div class="list_item">
          <span>主体名称</span>
          <select v-model="corpname" @change="choiceCorpname()">
            <option
              :value="item.corpname"
              v-for="item of some"
              :key="item.corpid"
              >{{ item.corpname }}</option
            >
          </select>
          <span class="icon_r"></span>
        </div>
        <div class="list_item">
          <span>联系人</span>
          <input type="text" readonly="readonly" v-model="data.linkman" />
        </div>
        <div class="list_item">
          <span>联系电话</span>
          <input
            type="text"
            readonly="readonly"
            v-if="data.phone"
            v-model="data.phone"
          />
          <input type="text" readonly="readonly" v-else v-model="data.mobile" />
        </div>
        <div class="list_item">
          <span>联系邮箱</span>
          <input type="text" readonly="readonly" v-model="data.email" />
        </div>
        <div class="list_item">
          <span>详细地址</span>
          <input type="text" readonly="readonly" v-model="data.address" />
        </div>
      </div>
      <div class="apply-word" v-if="pageNum == 2">
        <div class="apply-msg">
          <div class="msg-top">
            <div class="msg-list">
              <i>申请词</i>
              <span>{{ text }}</span>
            </div>
            <div class="msg-list">
              <i>年限</i>
              <span>{{ year }}年</span>
            </div>
          </div>
          <div class="msg-bot msg-list">
            <i>类别</i>
            <div class="category">
              <div
                class="category-list"
                v-for="(val, index) in getSelectClass.classType"
                :key="index"
              >
                <p>{{ index }}</p>
                <div class="category-small">
                  <span
                    v-for="item in getSelectClass.classType[index]"
                    :key="item.productid"
                    >{{ item.productname }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="apply-subject">
          <div class="subject-word">申请主体</div>
          <!-- <div v-if="corpname" class="msg-list"> -->
          <div class="msg-list">
            <i>主体名称</i>
            <span> {{ corpname }} </span>
          </div>
          <!-- <div v-if="data.linkman" class="msg-list"> -->
          <div class="msg-list">
            <i>联系人</i>
            <span> {{ data.linkman }} </span>
          </div>
          <div v-if="data.phone" class="msg-list">
            <i>联系电话</i>
            <span>
              {{ data.phone }}
            </span>
          </div>
          <div v-if="data.mobile" class="msg-list">
            <i>联系电话</i>
            <span>
              {{ data.mobile }}
            </span>
          </div>
          <div v-if="data.email" class="msg-list">
            <i>联系邮箱</i>
            <span>
              {{ data.email }}
            </span>
          </div>
          <div v-if="data.address" class="msg-list">
            <i>联系地址</i>
            <span>
              {{ data.address }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="money-detail" v-show="pageNum == 0 || pageNum == 2">
      <div class="money-box">
        <div class="detail-list">
          <span class="detail-left">注册费</span>
          <span class="detail-right" v-if="price > 0">
            {{ price }}*{{ year }}={{ price * year }} 元</span
          >
        </div>
        <div class="detail-list">
          <span class="detail-left">审核费</span>
          <span class="detail-right">{{ audit }}元</span>
        </div>
        <div class="detail-list">
          <span class="detail-left">新增类别费</span>
          <span class="detail-right"
            >{{ getSelectClass.allPrice * year }} 元</span
          >
        </div>
      </div>
    </div>
    <div class="fill_bottom">
      <div class="bottom_l">
        <p>总计 :</p>
        <p class="all_price">
          ￥{{ totalMoney + audit + getSelectClass.allPrice * year }}元
        </p>
      </div>
      <div class="bottom_r">
        <div
          class="addCard"
          @click="next(pageNum)"
          v-show="pageNum == 0 || pageNum == 1"
        >
          下一步
        </div>
        <div class="addCard" @click="addShopCart" v-show="pageNum == 2">
          加入清单
        </div>
      </div>
    </div>
    <!-- 商标分类 -->
    <applyClass v-show="getSelectClass.isShow"></applyClass>
  </div>
</template>

<script>
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "mint-ui";
import applyClass from "@/components/trademark/applyClass.vue";
export default {
  name: "fill_information",
  data() {
    return {
      text: this.$route.query.keyword, //搜索过来的申请词
      ids: this.$route.query.id, //产品id
      year: 1, //年限
      qualifications: [], //资质类型
      qualifications_txt: "", //选中资质类型
      price: this.$route.query.price, //费用
      token: "",
      data: {}, //默认第一条主体数据
      some: [], //所有主体数据
      corpname: "", //主题名字
      length: "",
      all_price: 0, //总计费用
      pageNum: 0,
      audit: 600,
      product_name: "" //产品名称
    };
  },
  components: {
    applyClass
  },
  created() {
    this.init(); //请求主题数据
    this.intell(); //请求资质数据
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_SELECT_CLASS]]),
    ...mapGetters({
      getSelectClass: [GetterTypes.GET_SELECT_CLASS]
    }),
    totalMoney() {
      var money = this.year * this.price;
      return money;
    }
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_SELECT_CLASS]]),
    ...mapMutations({
      [MutationTypes.SET_SELECT_CLASS]: MutationTypes.SET_SELECT_CLASS
    }),
    // 检测点击浏览器返回键
    // myFunction() {
    //   var str = location.hash.split("#step")[1];
    //   str ? "" : (str = 0);
    //   // console.log(this.tab.tabIndexState,this.tab.tabIndex)
    //   // if(this.tab.tabIndexState==4){
    //   //     this.tab.tabIndexState = 0;
    //   //     this.tab.tabIndex = 0;
    //   //     return;
    //   // }
    //   if (this.isHashChange && str != this.tab.tabIndexState) {
    //     if (str < this.tab.tabIndexState) {
    //       if (this.tab.tabIndexState == 4) {
    //         this.tab.tabIndexState = 0;
    //         this.tab.tabIndex = 0;
    //         location.hash = "#step" + this.tab.tabIndexState;
    //       } else {
    //         this.lastBtn("isGoBack");
    //       }
    //     } else {
    //       this.nextBtn("isGoBack");
    //       this.nextBtnOptional("isGoBack");
    //     }
    //   } else {
    //     this.isHashChange = true;
    //   }
    // },
    // 点击返回
    goback(num) {
      var _this = this;

      if (num == 0) {
        console.log(22);
        this.$router.back(-1);
      } else if (num == 1) {
        console.log(55);

        _this.pageNum = 0;
      } else if (num == 2) {
        console.log(77);

        _this.pageNum = 1;
        // _this.getRegist();
      }
    },
    // 下一步
    next(num) {
      var _this = this;
      if (num == 0) {
        // 判断是否有选择分类
        if (
          !_this.getSelectClass.classType ||
          Object.keys(_this.getSelectClass.classType).length <= 0
        ) {
          Toast({
            message: "请选择分类",
            duration: 1500
          });
          return false;
        }
        _this.pageNum = 1;
        _this.getRegist();
      } else if (num == 1) {
        _this.pageNum = 2;
      }
      // var str = location.hash.split("#step")[1];
      // var url = location.hash;

      // if (str) {
      //   // location.hash =
      // }
      // location.hash = location.hash + "#step" + num;
    },
    init() {
      if (sessionStorage.token) {
        this.token = sessionStorage.token;
      }
      const _this = this;
      const index = parseInt(this.$route.query.id);
      switch (index) {
        case 1:
          _this.product_name = "A类 （商标名）.商标";
          break;
        case 2:
          _this.product_name = "B类 （商标名+商品/服务名）.商标";
          break;
        case 8:
          _this.product_name = "C类（指定地+商标名）.商标";
          break;
        case 10:
          _this.product_name = "D类 （指定地+商标名+商品/服务项目名）.商标";
          break;
      }
    },
    // 获取主体
    getRegist() {
      let _this = this;
      _this.$axios
        .post("index.php?c=App&a=getRegisterSubject")
        .then(function(response) {
          // console.log(response);
          if (response.data.errcode == 0) {
            _this.some = response.data.content;
            _this.length = _this.some.length; //总共有多少条主题信息
            _this.data = _this.some[0]; //默认赋值第一条
            _this.corpname = _this.some[0].corpname; //默认赋值第一个主体信息
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 选择类别
    applyClass: function() {
      // this.$router.push({
      //   path: "/applyClass",
      //   query: { year: this.year }
      // });
      // this.isShowClass = true;
      let _item = {
        isShow: true,
        content: this.getSelectClass.content,
        classType: this.getSelectClass.classType,
        allPrice: this.getSelectClass.allPrice
      };
      this[MutationTypes.SET_SELECT_CLASS](_item);
    },
    //修改年限
    choiceYear() {
      // 还要算上类别费
      this.all_price = this.year * this.price;
      // console.log(this.year);
    },
    //修改资质类型
    choiceQuali() {
      //console.log(this.qualifications_txt);
    },
    //修改主体信息
    choiceCorpname() {
      let _this = this;
      for (let i = 0; i < _this.length; i++) {
        //判断选中第几条主体信息，更改data内容
        if (_this.corpname == _this.some[i].corpname) {
          _this.data = _this.some[i];
        }
      }
    },
    intell() {
      let _this = this;
      _this.$axios
        .get("index.php?c=App&a=getDzpType")
        .then(function(response) {
          // console.log(response);
          if (response.data.errcode == 0) {
            _this.qualifications = response.data.content;
            _this.qualifications_txt = _this.qualifications[0].name; //默认选中第一个
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 加入清单
    addShopCart: function() {
      const that = this;
      // 设置临时加入数据
      let temptData = {
        productid: that.ids,
        product_name: that.product_name,
        keyword: that.text,
        feetype: "Z",
        year: that.year,
        price: that.price,
        verify_fee: that.audit,
        other_class_fee: that.getSelectClass.allPrice * that.year,
        total:
          that.totalMoney +
          that.audit +
          that.getSelectClass.allPrice * that.year,
        class_detail: that.getSelectClass.content,
        subject: {
          id: that.some[0].corpid,
          name: that.some[0].corpname,
          linkman: that.some[0].linkman,
          phone: that.some[0].phone,
          email: that.some[0].email,
          address: that.some[0].address
        }
      };
      that.$axios
        .post("/index.php?c=App&a=setWishlist", {
          data: JSON.stringify(temptData)
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            Toast({
              message: _data.errmsg,
              duration: 1500
            });
            setTimeout(function() {
              that.$router.replace({
                path: "/shoppingCart"
              });
              let _item = {
                isShow: false,
                content: [],
                classType: {},
                allPrice: 0
              };
              this[MutationTypes.SET_SELECT_CLASS](_item);
            }, 1500);
          } else if (_data.errcode === "-1") {
            Toast({
              message: _data.errmsg,
              duration: 1500
            });
            return false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.til-word {
  display: flex;
  align-items: center;
  padding-top: 0.32rem;
  .title {
    font-size: 0.26rem;
    color: #6f7181;
    padding-right: 0.52rem;
  }
  .active {
    color: #2c3852;
    font-size: 0.44rem;
  }
}
.support-msg {
  font-size: 0.36rem;
  color: #2c3852;
}
.apply-word {
  .apply-msg {
    padding: 0.2rem 0;
    border-bottom: 1px solid #eee;
    .msg-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .msg-list {
        width: 50%;
        border-right: 1px solid #eee;
        margin-bottom: 0;
        &:last-child {
          border: none;
          margin-left: 4%;
        }
      }
    }
    .msg-bot {
      margin-bottom: 0;
      .category {
        .category-list {
          padding-bottom: 0.26rem;
          p {
            padding-bottom: 0.2rem;
            color: #333;
            font-size: 0.3rem;
          }
          .category-small {
            span {
              display: inline-block;
              margin: 0.12rem 0.2rem 0.12rem 0;
              padding: 0.08rem 0.3rem;
              background-color: #f7f7f7;
              font-size: 0.24rem;
              color: #686d7f;
              border-radius: 0.24rem;
            }
          }
        }
      }
    }
  }
  .apply-subject {
    padding: 0.2rem 0;
    border-bottom: 1px solid #eee;
    .subject-word {
      font-size: 0.36rem;
      color: #2c3852;
    }
  }
  .msg-list {
    margin: 0.2rem 0;
    i {
      display: block;
      font-style: inherit;
      font-size: 0.24rem;
      color: #999;
      margin-bottom: 0.1rem;
    }
    span {
      font-size: 0.3rem;
      color: #2c3852;
    }
  }
}
.money-detail {
  position: fixed;
  bottom: 1.5rem;
  width: 100%;
  padding: 0.32rem;
  background: #fff;
  .money-box {
    background: #f7f7f7;
    border-radius: 0.18rem;
    padding: 0.28rem 0.3rem;

    .detail-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #686d7f;
      .detail-left {
        position: relative;
        padding-left: 0.2rem;
        &::after {
          content: "";
          display: inline-block;
          background: #686d7f;
          width: 0.08rem;
          height: 0.08rem;
          border-radius: 5rem;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .detail-right {
      }
    }
  }
}
</style>
