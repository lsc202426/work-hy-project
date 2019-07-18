<template>
    <div class="register login-pd">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
        </mt-header>
        <h2>密码登录</h2>
        <!-- 主体 -->
        <div class="register-main">
            <!-- 验证邮箱 -->
            <div class="register-main-email">
                <div class="list-item">
                    <input
                        type="text"
                        placeholder="请输入账号"
                        v-model="username"
                    />
                </div>
                <div class="list-item">
                    <input
                        type="password"
                        placeholder="请输入密码"
                        v-model="password"
                    />
                </div>
                <div class="list-tip">
                    <router-link to="/logincode">
                        <button>手机号登录</button>
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
            username: "",
            password: ""
        };
    },
    computed: {
        isActive: function() {
            let isShow = false;
            if (
                this.username &&
                this.username !== "" &&
                this.password &&
                this.password !== "" &&
                this.password
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
        //登录
        login: function() {
            const that = this;
            if (!that.username) {
                Toast({
                    message: "请输入您的账号",
                    duration: 1500
                });
                return false;
            } else if (!that.password) {
                Toast({
                    message: "请输入您的密码",
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
            that.$axios
                .post("/index.php?c=App&a=checkLogin", {
                    login_type: 3,
                    username: that.username,
                    password: that.$md5(temtpd),
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
