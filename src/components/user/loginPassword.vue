<template>
    <div class="register login-pd">
        <mt-header class="header">
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
        </mt-header>
        <div class="register-content">
            <h2>密码登录</h2>
            <!-- 主体 -->
            <div class="register-main">
                <!-- 验证邮箱 -->
                <div class="register-main-email">
                    <div class="list-item">
                        <input type="text" placeholder="请输入账号" v-model="username" />
                    </div>
                    <div class="list-item">
                        <input type="password" placeholder="请输入密码" v-model="password" />
                    </div>
                    <div class="list-tip">
                        <button @click="loginBtn('/logincode')">手机号登录</button>
                        <button @click="loginFaceBtn">Face ID登录</button>
                    </div>
                    <button class="register-btn" :class="{ active: isActive }" @click="login">
                        登录
                    </button>
                </div>
                <img class="logo" src="@/assets/images/index/index_logo.png" alt="" />
            </div>
            <!-- 人脸登录 -->
            <div class="register login-face" v-show="isLoginFace">
                <mt-header class="header" fixed>
                    <mt-button slot="left" icon="back" @click="hideView"></mt-button>
                </mt-header>
                <div class="login-face-main">
                    <h2>人脸识别登录中</h2>
                    <div
                        class="login-face-main-box"
                        :style="{ backgroundImage: 'url(' + faceUrl + ')' }"
                        :class="{ rotae90: rotate === 8, rotae180: rotate === 3, rotae901: rotate === 6 }"
                    >
                        <!-- <img :src="faceUrl" /> -->
                    </div>
                    <input
                        class="login-face-main-upload"
                        type="file"
                        accept="image/*"
                        capture="user"
                        id="upfile"
                        @change="upFaceID($event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import EXIF from 'exif-js';
export default {
    data() {
        return {
            username: '',
            password: '',
            isLoginFace: false,
            faceUrl: '',
            rotate: 1,
            isFlag: false, // 防多点
        };
    },
    created() {
        this.$nextTick(function() {
            let hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
            document.getElementById('app').style.height = hrt + 'px'; //把获取到的高度赋值给根div
        });
    },
    beforeDestroy() {
        // 销毁
        document.getElementById('app').style.height = '100%';
    },
    computed: {
        isActive: function() {
            let isShow = false;
            if (this.username && this.username !== '' && this.password && this.password !== '' && this.password) {
                isShow = true;
            }
            return isShow;
        },
    },
    methods: {
        // 切换返回
        goback: function() {
            this.$router.replace({
                path: '/login',
                query: {
                    redirect: this.$route.query.redirect,
                },
            });
        },
        loginBtn: function(path) {
            this.$router.replace({
                path: path,
                query: {
                    redirect: this.$route.query.redirect,
                },
            });
        },
        loginFaceBtn: function() {
            let input = document.getElementById('upfile');
            input.setAttribute('capture', 'user');
            input.click();
        },
        upFaceID: function(e) {
            const that = this;
            let files = e.target.files[0];
            if (!files) {
                return false;
            }

            // 获取图片旋转角度
            EXIF.getData(files, function() {
                that.rotate = EXIF.getTag(this, 'Orientation');
            });
            let reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                that.isLoginFace = true;
                let user_images = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                that.faceUrl = this.result;
                // uid
                let uid = Math.random()
                    .toString(36)
                    .substr(2);
                // 时间戳
                let timestamp = Date.parse(new Date());
                that.$axios
                    .post('/index.php?c=App&a=checkLogin', {
                        login_type: 2,
                        user_images: user_images,
                        uniqueID: uid,
                        timestamp: timestamp,
                        dpi_version: 'H5',
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            Toast({
                                message: '登录成功',
                                duration: 1500,
                            });
                            // 暂存token
                            sessionStorage.setItem('token', _data.content.access_token);
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
                            that.faceUrl = '';
                            MessageBox({
                                title: '',
                                message: _data.errmsg,
                            }).then(action => {
                                if (action === 'confirm') {
                                    setTimeout(function() {
                                        that.isLoginFace = false;
                                    }, 500);
                                }
                            });
                        }
                    });
                // 置空
                e.target.value = '';
            };
        },
        hideView: function() {
            this.isLoginFace = false;
        },
        //登录
        login: function() {
            const that = this;
            if (that.isFlag) {
                return false;
            }
            that.isFlag = true;
            if (!that.username) {
                Toast({
                    message: '请输入您的账号',
                    duration: 1500,
                });
                return false;
            } else if (!that.password) {
                Toast({
                    message: '请输入您的密码',
                    duration: 1500,
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
                .post('/index.php?c=App&a=checkLogin', {
                    login_type: 3,
                    username: that.username,
                    password: that.$md5(temtpd),
                    uniqueID: uid,
                    timestamp: timestamp,
                    dpi_version: 'H5',
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: '登录成功',
                            duration: 1500,
                        });
                        // 暂存token
                        sessionStorage.setItem('token', _data.content.access_token);
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
                            that.isFlag = false;
                        }, 1500);
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 1500,
                        });
                        setTimeout(() => {
                            that.isFlag = false;
                        }, 1500);
                    }
                });
        },
    },
};
</script>
