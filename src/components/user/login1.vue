<template>
    <div class="login-news">
        <h2>欢迎<br />来到互易品牌</h2>
        <div class="login-news-main">
            <input class="item mobile" v-model="mobilePhone" type="text" placeholder="请输入登录手机号" />
            <input class="item password" v-model="password" type="password" placeholder="请输入密码" />
            <button class="submit" :class="{ active: isShow }" @click="loginBtn">
                登录
            </button>
            <div class="login-news-main-prompt">
                <router-link to="/forget">
                    <span class="forget">忘记密码？</span>
                </router-link>
                <div class="no-user">
                    <span>没有账号？</span>
                    <router-link to="/register">
                        <a href="javascript:void(0);">注册账号</a>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            mobilePhone: '',
            password: '',
        };
    },
    computed: {
        // 监听是否输入账号密码
        isShow: function() {
            let isShow = false;
            if (this.mobilePhone && this.mobilePhone !== '' && this.password && this.password !== '') {
                isShow = true;
            }
            return isShow;
        },
    },
    methods: {
        loginBtn: function() {
            const that = this;
            if (!that.isShow) {
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
                .post('/index.php?c=App&a=checkLogin', {
                    username: that.mobilePhone,
                    password: that.$md5(temtpd),
                    uniqueID: uid,
                    timestamp: timestamp,
                    dpi_version: 'H5',
                })
                .then(function(response) {
                    if (response.data.errcode === 0) {
                        Toast({
                            message: '登录成功',
                            duration: 1500,
                        });
                        // 暂存token
                        sessionStorage.setItem('token', response.data.content.access_token);
                        //登录成功存储登录信息
                        let loginInfo = {
                            un: that.mobilePhone,
                            pd: that.$md5(that.password),
                        };
                        sessionStorage.setItem('infor', JSON.stringify(loginInfo));
                        // 失效次数
                        sessionStorage.setItem('num', 0);
                        setTimeout(() => {
                            if (that.$route.query.redirect) {
                                that.$router.replace({
                                    path: that.$route.query.redirect,
                                });
                            } else {
                                that.$router.replace({
                                    path: '/',
                                });
                            }
                        }, 1500);
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
    },
};
</script>
