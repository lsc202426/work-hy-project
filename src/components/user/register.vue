<template>
  <div class="register">
    <mt-header class="header" fixed>
      <mt-button slot="left" icon="back" @click="goback"></mt-button>
    </mt-header>
    <h2>注册账号</h2>
    <div class="register-menu" :class="{ active: isShow === 1 }"></div>
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
        <div class="register-main-email-rule" :class="{ agree: isAgree }">
          <i @click="switchAgree"></i>
          <span>同意</span>
          <a src="javascript:voide(0);" @click="viewPrivacy">《隐私条款》</a>
        </div>
        <button class="register-btn" @click="nextBtn">下一步</button>
      </div>
      <div class="register-main-name" v-show="isShow === 1">
        <div class="list-item">
          <input type="text" v-model="nickname" placeholder="请输入昵称" />
        </div>
        <div class="list-item">
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="list-item">
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="请确认密码"
          />
        </div>
        <button class="register-btn sure" @click="registerBtn">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isShow: 0,
      isAgree: this.$store.state.registerInfo.isAgree
        ? this.$store.state.registerInfo.isAgree
        : false,
      // 手机号
      phone: this.$store.state.registerInfo.phone
        ? this.$store.state.registerInfo.phone
        : "",
      // 手机验证码
      code: this.$store.state.registerInfo.code
        ? this.$store.state.registerInfo.code
        : "",
      codeText: "获取验证码",
      // 是否获取验证码
      isGetCode: this.$store.state.registerInfo.isGetCode
        ? this.$store.state.registerInfo.isGetCode
        : 0,
      // 是否正倒计时
      isCodeIng: false,
      //   补充资料id
      temptId: this.$store.state.registerInfo.id
        ? this.$store.state.registerInfo.id
        : "",
      // 昵称
      nickname: "",
      // 密码
      password: "",
      // 确认密码
      confirmPassword: ""
    };
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_REGISTER_INFO]]),
    ...mapGetters({
      getRegisterInfo: [GetterTypes.GET_REGISTER_INFO]
    })
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_REGISTER_INFO]]),
    ...mapMutations({
      [MutationTypes.SET_REGISTER_INFO]: MutationTypes.SET_REGISTER_INFO
    }),
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
      let _item = {
        phone: this.phone,
        code: this.code,
        isGetCode: this.isGetCode,
        isAgree: this.isAgree
      };
      this[MutationTypes.SET_REGISTER_INFO](_item);
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
      } else if (!that.isAgree) {
        Toast({
          message: "请阅读并同意隐私条款",
          duration: 1500
        });
        return false;
      }
      // 验证手机号码
      that.$axios
        .post("/index.php?c=App&a=verifySms", {
          mobile: that.phone,
          code: that.code,
          scene: "register"
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            that.temptId = _data.content.id;
            that.isShow = 1;
          }
        });
    },
    // 注册
    registerBtn: function() {
      const that = this;
      // 验证手机号
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
      if (!that.nickname) {
        Toast({
          message: "请输入昵称",
          duration: 1500
        });
        return false;
      } else if (!that.password) {
        Toast({
          message: "请输入密码",
          duration: 1500
        });
        return false;
      } else if (!reg.test(that.password)) {
        Toast({
          message: "请输入正确的密码格式",
          duration: 1500
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
        .post("/index.php?c=App&a=setRegisterInfo", {
          nickname: that.nickname,
          password: that.password,
          id: that.temptId
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            this.$router.replace({
              that: "/registersuccess"
            });
          }
        });
    }
  }
};
</script>
