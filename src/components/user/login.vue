<template>
  <div class="login">
    <h2 class="login-name">登录</h2>
    <div class="login-main">
      <div class="login-username item-list">
        <label>账号</label>
        <input type="text" placeholder="请填写您的账号" v-model="username" />
      </div>
      <div class="login-password item-list">
        <label>密码</label>
        <input
          type="password"
          placeholder="请填写您的密码"
          v-model="password"
        />
      </div>
      <div class="login-btn">
        <button @click="logiBtn">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_IS_SHOW]]),
    ...mapGetters({
      getIsShow: [GetterTypes.GET_IS_SHOW]
    })
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_IS_SHOW]]),
    ...mapMutations({
      [MutationTypes.SET_IS_SHOW]: MutationTypes.SET_IS_SHOW
    }),
    // 登录
    logiBtn: function() {
      const that = this;
      if (!that.username) {
        Toast({
          message: "账号不能为空",
          duration: 1500
        });
        return false;
      } else if (!that.password) {
        Toast({
          message: "密码不能为空",
          duration: 1500
        });
        return false;
      }
      // uid
      let uid = Math.random()
        .toString(36)
        .substr(2);
      // 时间戳
      let timestamp = Date.parse(new Date());

      let temtpd = uid + that.$md5(that.password) + timestamp;
      console.log(temtpd);
      axios
        .post("/index.php?c=App&a=checkLogin", {
          username: that.username,
          password: that.$md5(temtpd),
          uniqueID: uid,
          timestamp: timestamp,
          dpi_version: "H5"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.errcode === 0) {
            Toast({
              message: "登录成功",
              duration: 1500
            });
            // 暂存token
            sessionStorage.setItem("token", response.data.content.access_token);
            setTimeout(() => {
              console.log("回到那里");
              if (that.$route.query.redirect) {
                that.$router.replace({
                  path: that.$route.query.redirect
                });
              } else {
                that.$router.replace({
                  path: "/"
                });
              }
            }, 1500);
          }else{
            Toast({
              message: response.data.errmsg,
              duration: 1500
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
