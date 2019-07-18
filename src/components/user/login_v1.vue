<template>
    <div class="login2">
        <div class="login2-top">
            <img class="logo" src="@/assets/images/index/index_logo.png" />
        </div>
        <div class="login2-title">
            {{ greetings }}
        </div>
        <div class="login2-type">
            <router-link to="/logincode">
                <button>使用短信验证码登录</button>
            </router-link>
            <router-link to="/loginpd">
                <button>使用密码登录</button>
            </router-link>
            <button @click="loginFaceBtn">使用Face ID</button>
        </div>
        <div class="login2-forget">
            <router-link to="/forget">
                <button>忘记密码？</button>
            </router-link>
            <router-link to="/register">
                <button class="login2-forget-register">注册账号</button>
            </router-link>
        </div>
        <!-- 人脸登录 -->
        <div class="register login-face" v-show="isLoginFace">
            <mt-header class="header" fixed>
                <mt-button
                    slot="left"
                    icon="back"
                    @click="hideView"
                ></mt-button>
            </mt-header>
            <div class="login-face-main">
                <h2>人脸识别登录中</h2>
                <div
                    class="login-face-main-box"
                    :style="{ backgroundImage: 'url(' + faceUrl + ')' }"
                >
                    <!-- <img :src="faceUrl" /> -->
                </div>
                <input
                    class="login-face-main-upload"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    id="upfile"
                    @change="upFaceID($event)"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            greetings: "早上好, siming",
            isLoginFace: false,
            faceUrl: ""
        };
    },
    methods: {
        loginFaceBtn: function() {
            const that = this;
            that.isLoginFace = true;
            that.$nextTick(function() {
                let input = document.getElementById("upfile");
                input.click();
            });
        },
        upFaceID: function(e) {
            var that = this;
            var files = "";
            files = e.target.files[0];
            if (!files) {
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                let user_images = this.result.replace(
                    /^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
                    ""
                );
                that.faceUrl = this.result;
                // uid
                let uid = Math.random()
                    .toString(36)
                    .substr(2);
                // 时间戳
                let timestamp = Date.parse(new Date());
                that.$axios
                    .post("/index.php?c=App&a=checkLogin", {
                        login_type: 2,
                        user_images: user_images,
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
                            that.faceUrl = "";
                            Toast({
                                message: response.data.errmsg,
                                duration: 1500
                            });
                        }
                    });
            };
        },
        hideView: function() {
            this.isLoginFace = false;
        }
    },
    created() {}
};
</script>
