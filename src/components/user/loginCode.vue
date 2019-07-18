<template>
    <div class="register login-code">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
        </mt-header>
        <h2>验证码登录</h2>
        <!-- 主体 -->
        <div class="register-main">
            <!-- 验证邮箱 -->
            <div class="register-main-email" v-show="isShow === 0">
                <div class="list-item">
                    <input
                        type="number"
                        placeholder="请输入11位手机号码"
                        v-model.number="phone"
                    />
                </div>
                <div class="list-item code">
                    <input
                        type="text"
                        placeholder="请输入验证码"
                        v-model="code"
                    />
                    <button @click="getCode">{{ codeText }}</button>
                </div>
                <div class="list-tip">
                    <router-link to="/loginpd">
                        <button>账号密码登录</button>
                    </router-link>
                    <router-link to="/login">
                        <button>Face ID登录</button>
                    </router-link>
                </div>
                <button
                    class="register-btn"
                    :class="{ active: isActive }"
                    @click="login"
                >
                    登录
                </button>
            </div>
            <img
                class="logo"
                src="@/assets/images/index/index_logo.png"
                alt=""
            />
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
            isCodeIng: false
        };
    },
    computed: {
        isActive: function() {
            let isShow = false;
            if (
                this.phone &&
                this.phone !== "" &&
                this.code &&
                this.code !== ""
            ) {
                isShow = true;
            }
            return isShow;
        }
    },
    methods: {
        // 切换返回
        goback: function() {
            this.$router.replace({
                path: "/login"
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
                } else if (!reg.test(that.phone)) {
                    Toast({
                        message: "请输入正确的手机号",
                        duration: 1500
                    });
                    that.phone = "";
                    that.code = "";
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
        // 登录
        login: function() {
            const that = this;
            if (!that.isActive) {
                return false;
            } else if (that.isGetCode < 1) {
                Toast({
                    message: "请先获取验证码",
                    duration: 1500
                });
                that.code = "";
                return false;
            }
            // uid
            let uid = Math.random()
                .toString(36)
                .substr(2);
            // 时间戳
            let timestamp = Date.parse(new Date());
            that.$axios
                .post("/index.php?c=App&a=checkLogin", {
                    login_type: 1,
                    mobile: that.phone,
                    code: that.code,
                    uniqueID: uid,
                    timestamp: timestamp,
                    dpi_version: "H5"
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: "登录成功",
                            duration: 1500
                        });
                        // 暂存token
                        sessionStorage.setItem(
                            "token",
                            _data.content.access_token
                        );
                        // 失效次数
                        sessionStorage.setItem("num", 0);
                        setTimeout(() => {
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
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 1500
                        });
                    }
                });
        }
    }
};
</script>
