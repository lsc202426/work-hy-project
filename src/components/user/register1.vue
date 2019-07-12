<template>
  <div class="register-news">
    <div class="register-news-top">
      <img class="logo" src="@/assets/images/index/index_logo.png" alt="" />
      <h2 class="title">互易品牌</h2>
    </div>
    <div class="register-news-main">
      <div class="register-news-main-one">
        <input
          type="text"
          class="last-name"
          v-model="lastName"
          placeholder="姓"
        />
        <input type="text" class="name" v-model="name" placeholder="名" />
      </div>
      <div class="register-news-main-item">
        <input type="text" v-model="mobile" placeholder="请输入手机号" />
      </div>
      <div class="register-news-main-item">
        <input type="text" v-model="email" placeholder="请输入邮箱账号" />
      </div>
      <div class="register-news-main-item">
        <input type="password" v-model="password" placeholder="请输入密码" />
      </div>
      <div class="register-news-main-item">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="请确认密码"
        />
      </div>
      <div class="register-news-main-item faceid">
        人脸识别Face ID
      </div>
    </div>
    <div class="register-news-rule">
      <i :class="{ active: isAgree }" @click="switchAgree"></i>
      <span class="register-news-rule-agree" @click="switchAgree"
        >同意<span class="register-news-rule-privacy">《隐私条款》</span></span
      >
    </div>
    <button class="register-news-btn">注册</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 姓
      lastName: "",
      // 名
      name: "",
      // 手机号
      mobile: "",
      // 邮箱
      email: "",
      // 密码
      password: "",
      // 确认密码
      confirmPassword: "",
      // 是否同意隐私政策
      isAgree: false
    };
  },
  methods: {
    switchAgree: function() {
      this.isAgree = !this.isAgree;
    }
  }
};
</script>
