<template>
  <div class="register forget">
    <mt-header class="header" fixed>
      <mt-button slot="left" icon="back" @click="goback"></mt-button>
    </mt-header>
    <h2>忘记密码</h2>
    <!-- 主体 -->
    <div class="register-main">
      <!-- 验证邮箱 -->
      <div class="register-main-email" v-show="isShow === 0">
        <div class="list-item">
          <input
            type="number"
            placeholder="请输入手机号码"
            v-model.number="phone"
          />
        </div>
        <div class="list-item code">
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <button @click="getCode">{{ codeText }}</button>
        </div>
        <button
          class="register-btn"
          :class="{ active: isActive }"
          @click="nextBtn"
        >
          下一步
        </button>
      </div>
      <div class="register-main-name" v-show="isShow === 1">
        <div class="list-item">
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="list-item">
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="请再次输入密码"
          />
        </div>
        <button
          class="register-btn sure"
          :class="{ active: isSure }"
          @click="registerBtn"
        >
          重置密码
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isShow: 0,
      // 手机号
      phone: "",
      // 手机验证码
      code: "",
      codeText: "获取验证码",
      // 是否获取验证码
      isGetCode: 0,
      // 是否正倒计时
      isCodeIng: false,
      // 密码
      password: "",
      // 确认密码
      confirmPassword: "",
      temptId: "",
      slat: ""
    };
  },
  computed: {
    isActive: function() {
      let isShow = false;
      if (this.phone && this.phone !== "" && this.code && this.code !== "") {
        isShow = true;
      }
      return isShow;
    },
    isSure: function() {
      let isShow = false;
      if (
        this.password &&
        this.password !== "" &&
        this.confirmPassword &&
        this.confirmPassword !== ""
      ) {
        isShow = true;
      }
      return isShow;
    }
  },
  methods: {
    // 切换返回
    goback: function() {
      if (this.isShow === 0) {
        this.$router.replace({
          path: "/login"
        });
      } else {
        this.isShow = 0;
      }
    },
    // 切换是否同意状态
    switchAgree: function() {
      this.isAgree = !this.isAgree;
    },
    // 查看隐私条款
    viewPrivacy: function() {
      this.isAgree = true;
      this.$router.push({
        path: "/privacy"
      });
    },
    // 获取手机验证码
    getCode: function() {
      const that = this;
      // 验证手机号
      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!that.isCodeIng) {
        if (!that.phone) {
          Toast({
            message: "请输入您的手机号",
            duration: 1500
          });
          return false;
        } else if (!reg.test(this.phone)) {
          Toast({
            message: "请输入正确的手机号",
            duration: 1500
          });
          this.phone = "";
          return false;
        }
        that.$axios
          .post("/index.php?c=App&a=sendSms", {
            mobile: that.phone
          })
          .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
              that.isGetCode += 1;
              // 正在倒计时
              that.isCodeIng = true;
              let time = 60;
              let timer = setInterval(function() {
                time--;
                that.codeText = time + "s";
                if (time <= 0) {
                  that.codeText = "获取验证码";
                  that.isCodeIng = false;
                  clearInterval(timer);
                }
              }, 1000);
            }
          });
      }
    },
    // 下一步
    nextBtn: function() {
      const that = this;
      if (!that.isActive) {
        return false;
      }
      if (!that.phone) {
        Toast({
          message: "请输入手机号",
          duration: 1500
        });
        return false;
      } else if (that.isGetCode < 1) {
        Toast({
          message: "请先获取验证码",
          duration: 1500
        });
        return false;
      } else if (!that.code) {
        Toast({
          message: "请输入验证码",
          duration: 1500
        });
        return false;
      }
      // 验证手机号码
      that.$axios
        .post("/index.php?c=App&a=verifySms", {
          mobile: that.phone,
          code: that.code,
          scene: "resetP"
        })
        .then(function(res) {
          console.log(res);
          let _data = res.data;
          if (_data.errcode === 0) {
            that.temptId = _data.content.id;
            that.slat = _data.content.slat;
            that.isShow = 1;
          }
        });
    },
    // 注册
    registerBtn: function() {
      const that = this;
      if (!that.isSure) {
        return false;
      }
      // 验证手机号
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
      if (!that.password) {
        Toast({
          message: "请输入密码",
          duration: 1500
        });
        return false;
      } else if (!reg.test(that.password)) {
        Toast({
          message: "密码必须为大小写字母及数字组成且至少8位不超过16位",
          duration: 3000
        });
        that.password = "";
        return false;
      } else if (!reg.test(that.confirmPassword)) {
        Toast({
          message: "请再次输入密码",
          duration: 1500
        });
        that.confirmPassword = "";
        return false;
      } else if (that.confirmPassword !== that.password) {
        Toast({
          message: "两次输入密码不一致",
          duration: 1500
        });
        that.confirmPassword = "";
        return false;
      }
      // 验证手机号码
      that.$axios
        .post("/index.php?c=App&a=resetPwd", {
          password: that.password,
          id: that.temptId,
          slat: that.slat
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
                path: "/login"
              });
            }, 1500);
          }
        });
    }
  }
};
</script>
