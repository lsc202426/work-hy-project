<template>
  <div id="user" class="user">
    <div class="containerView-main">
      <div class="user-top">
        <div class="user-top-word">
          <div class="head-over">
            <div
              v-show="headPort == ''"
              class="head-portrait"
              :style="{ backgroundImage: 'url(' + headIntal + ')' }"
            ></div>
            <div
              v-show="headPort != ''"
              class="head-portrait"
              :style="{
                backgroundImage:
                  'url(' + 'http://oapi.huyi.cn:6180/' + headPort + ')'
              }"
            ></div>
          </div>
          <div class="user-self-msg">
            <div class="self-left">
              <p class="self-nickname" v-if="userArr.nickname">
                {{ userArr.nickname }}
              </p>
              <p class="self-name">{{ userArr.username }}</p>
            </div>
            <!-- <router-link to="/editmsg"> -->
            <span class="self-edit" @click="editMsg()">编辑</span>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
      <div class="user-list">
        <div class="user-list-block">
          <div class="order-top" @click="viewOrder(0)">
            <div class="order-top-left">我的订单</div>

            <div class="order-top-right">
              <span>全部订单</span>
              <img src="../../assets/images/user/advance.png" alt="" />
            </div>
          </div>
          <div class="order-block">
            <div class="order-list" @click="viewOrder(1)">
              <i v-if="orderArr.status_1">{{ orderArr.status_1 }}</i>
              <img src="../../assets/images/user/obligation.png" alt="" />
              <p class="order-word">待付款</p>
            </div>
            <div class="order-list" @click="viewOrder(2)">
              <i v-if="orderArr.status_2">{{ orderArr.status_2 }}</i>
              <img src="../../assets/images/user/audit.png" alt="" />
              <p class="order-word">审核中</p>
            </div>
            <div class="order-list" @click="viewOrder(3)">
              <i v-if="orderArr.status_3">{{ orderArr.status_3 }}</i>
              <img src="../../assets/images/user/pending.png" alt="" />
              <p class="order-word">待处理</p>
            </div>
            <div class="order-list" @click="viewOrder(4)">
              <i v-if="orderArr.status_4">{{ orderArr.status_4 }}</i>
              <img src="../../assets/images/user/stocks.png" alt="" />
              <p class="order-word">已完成</p>
            </div>
          </div>
        </div>
        <div class="user-list-block tail">
          <div class="order-top">
            <div class="order-top-left">产品跟踪</div>
          </div>
          <div class="order-block">
            <router-link to="/fBrand">
              <div class="order-list">
                <p class="tail-num">{{ followArr.brands }}</p>
                <p>品牌预警</p>
              </div>
            </router-link>
            <router-link to="/fSite">
              <div class="order-list">
                <p class="tail-num">{{ followArr.website }}</p>
                <p>站点预警</p>
              </div>
            </router-link>
            <div class="order-list" @click="viewOrder(5)">
              <p class="tail-num">{{ followArr.order }}</p>
              <p>订单跟踪</p>
            </div>
            <router-link to="/renew">
              <div class="order-list">
                <p class="tail-num">{{ followArr.renew }}</p>
                <p>续费提醒</p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="user-list-block set">
          <router-link to="/capiral">
            <div class="list-msg">
              <div class="list-msg-block">
                <img
                  class="capital-left"
                  src="../../assets/images/user/capital.png"
                  alt=""
                />
              </div>
              <div class="capital-right">
                <span>
                  我的资金
                </span>
                <img src="../../assets/images/user/advance.png" alt="" />
              </div>
            </div>
          </router-link>
          <router-link to="/shoppingCart">
            <div class="list-msg">
              <div class="list-msg-block">
                <img
                  class="capital-left"
                  style="height: 0.52rem;"
                  src="../../assets/images/user/shopCart.png"
                  alt=""
                />
              </div>
              <div class="capital-right">
                <span>
                  已选清单
                </span>
                <img src="../../assets/images/user/advance.png" alt="" />
              </div>
            </div>
          </router-link>
          <router-link to="/material">
            <div class="list-msg">
              <div class="list-msg-block">
                <img
                  class="capital-left"
                  src="../../assets/images/user/datum.png"
                  alt=""
                />
              </div>
              <div class="capital-right">
                <span>
                  注册资料
                </span>
                <img src="../../assets/images/user/advance.png" alt="" />
              </div>
            </div>
          </router-link>
          <router-link to="/support">
            <div class="list-msg">
              <div class="list-msg-block">
                <img
                  class="capital-left"
                  src="../../assets/images/user/support.png"
                  alt=""
                />
              </div>
              <div class="capital-right">
                <span>
                  帮助支持
                </span>
                <img src="../../assets/images/user/advance.png" alt="" />
              </div>
            </div>
          </router-link>
          <router-link to="/setting">
            <div class="list-msg">
              <div class="list-msg-block">
                <img
                  class="capital-left"
                  src="../../assets/images/user/setting.png"
                  alt=""
                />
              </div>
              <div class="capital-right">
                <span>
                  设置
                </span>
                <img src="../../assets/images/user/advance.png" alt="" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <nav-botton></nav-botton>
  </div>
</template>

<script>
import * as MutationTypes from "@/constants/MutationTypes";
import { mapMutations } from "vuex";
export default {
  name: "user",
  data() {
    return {
      headIntal: require("@/assets/images/user/head-portairt.png"),
      headPort: "",
      userArr: [],
      followArr: [],
      orderArr: []
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_IS_SELECT]]),
    ...mapMutations({
      [MutationTypes.SET_IS_SELECT]: MutationTypes.SET_IS_SELECT
    }),
    // 点击编辑
    editMsg() {
      var _this = this;
      _this.$router.push({
        path: "/editmsg",
        query: {
          nickname: _this.userArr.nickname,
          username: _this.userArr.username,
          headPort: _this.userArr.portrait
        }
      });
    },
    getMsg() {
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getPersonalCenter")
        .then(function(response) {
          _this.userArr = response.data.content.user;
          _this.followArr = response.data.content.follow;
          _this.orderArr = response.data.content.order;
          _this.headPort = _this.userArr.portrait;
        })
        .catch(function(error) {
        });
    },
    //查看分类订单
    viewOrder: function(key) {
      let _value = {};
      if (key != 5) {
        this.$router.push({
          path: "/orderlist"
        });
        _value = {
          isSelect: key,
          status: key
        };
      } else if (key == 5) {
        this.$router.push({
          path: "/orderlist",
          query: {
            ids: key
          }
        });
        _value = {
          isSelect: 0,
          status: 0
        };
      }

      this[MutationTypes.SET_IS_SELECT](_value);
    }
  }
};
</script>

<style lang="scss"></style>
