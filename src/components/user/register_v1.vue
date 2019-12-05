<template>
    <div class="register-news">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
        </mt-header>
        <div class="register-news-top">
            <img class="logo" src="@/assets/images/index/index_logo.png" alt="" />
            <h2 class="title">互易品牌</h2>
        </div>
        <div class="register-news-main">
            <div class="register-news-main-one">
                <input type="text" class="last-name" v-model="lastname" placeholder="姓" />
                <input type="text" class="name" v-model="firstname" placeholder="名" />
            </div>
            <div class="register-news-main-item">
                <input type="number" v-model="mobile" placeholder="请输入手机号" />
            </div>
            <div class="register-news-main-item code">
                <input type="number" v-model="code" placeholder="请输入验证码" />
                <button @click="getCode">{{ codeText }}</button>
            </div>
            <div class="register-news-main-item">
                <input type="password" v-model="password" placeholder="请输入密码" />
            </div>
            <div class="register-news-main-item">
                <input type="password" v-model="confirmPassword" placeholder="请确认密码" />
            </div>
            <div class="register-news-main-item face-id" @click="loginFaceBtn">
                人脸识别Face ID
            </div>
        </div>
        <div class="register-news-rule">
            <i :class="{ active: isAgree }" @click="switchAgree"></i>
            <span class="register-news-rule-agree" @click="switchAgree">
                同意
                <span class="register-news-rule-privacy" @click="viewPrivacy">
                    《隐私条款》
                </span>
            </span>
        </div>
        <button class="register-news-btn" :class="{ active: isActive }" @click="registerBtn">
            注册
        </button>
        <!-- 人脸登录 -->
        <div class="register login-face" v-show="isViewFace">
            <mt-header class="header" fixed>
                <mt-button slot="left" icon="back" @click="hideView"></mt-button>
            </mt-header>
            <div class="login-face-main">
                <h2>人脸识别</h2>
                <div
                    class="login-face-main-box"
                    :style="{ backgroundImage: 'url(' + faceUrl + ')' }"
                    :class="{ rotae90: rotate === 8, rotae180: rotate === 3, rotae901: rotate === 6 }"
                ></div>
                <input class="login-face-main-upload" type="file" accept="image/*" capture="user" id="upfile" @change="upFaceID($event)" />
            </div>
        </div>
    </div>
</template>
<script>
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
import { Toast, MessageBox } from 'mint-ui';
import EXIF from 'exif-js';
export default {
    data() {
        return {
            // 姓
            lastname: this.$store.state.registerInfo.lastname ? this.$store.state.registerInfo.lastname : '',
            // 名
            firstname: this.$store.state.registerInfo.firstname ? this.$store.state.registerInfo.firstname : '',
            // 手机号
            mobile: this.$store.state.registerInfo.mobile ? this.$store.state.registerInfo.mobile : '',
            // 短信验证码
            code: this.$store.state.registerInfo.code ? this.$store.state.registerInfo.code : '',
            // 短信验证码text
            codeText: '获取验证码',
            // 密码
            password: this.$store.state.registerInfo.password ? this.$store.state.registerInfo.password : '',
            // 确认密码
            confirmPassword: this.$store.state.registerInfo.confirmPassword ? this.$store.state.registerInfo.confirmPassword : '',
            // 是否同意隐私政策
            isAgree: this.$store.state.registerInfo.isAgree ? this.$store.state.registerInfo.isAgree : false,
            // 是否正倒计时
            isCodeIng: false,
            // 是否获取验证码
            isGetCode: this.$store.state.registerInfo.isGetCode ? this.$store.state.registerInfo.isGetCode : 0,
            // 是否显示人脸识别
            isViewFace: false,
            // 人脸识别头像
            faceUrl: '',
            // 人脸识别id
            faceid: this.$store.state.registerInfo.faceid ? this.$store.state.registerInfo.faceid : 0,
            rotate: 1,
        };
    },
    computed: {
        // 是否已输入
        isActive: function() {
            let isShow = false;
            if (
                this.lastname &&
                this.lastname !== '' &&
                this.firstname &&
                this.firstname !== '' &&
                this.mobile &&
                this.mobile !== '' &&
                this.code &&
                this.code !== '' &&
                this.password &&
                this.password !== '' &&
                this.confirmPassword &&
                this.confirmPassword !== '' &&
                this.isAgree
            ) {
                isShow = true;
            }
            return isShow;
        },
    },
    directives: {
        focus: {
            inserted: function(el, { value }) {
                if (value) {
                    el.focus();
                }
            },
        },
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_REGISTER_INFO]]),
        ...mapMutations({
            [MutationTypes.SET_REGISTER_INFO]: MutationTypes.SET_REGISTER_INFO,
        }),
        // 是否同意
        switchAgree: function() {
            this.isAgree = !this.isAgree;
        },
        // 查看隐私条款
        viewPrivacy: function() {
            this.isAgree = true;
            this.$router.push({
                path: '/privacy',
            });
            let _item = {
                lastname: this.lastname,
                firstname: this.firstname,
                mobile: this.mobile,
                code: this.code,
                password: this.password,
                confirmPassword: this.confirmPassword,
                isAgree: this.isAgree,
                isGetCode: this.isGetCode,
                faceid: this.faceid,
            };
            this[MutationTypes.SET_REGISTER_INFO](_item);
        },
        // 切换返回
        goback: function() {
            this.$router.replace({
                path: '/login',
            });
        },
        //Face ID
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
                that.isViewFace = true;
                let user_images = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                that.faceUrl = this.result;
                that.$axios
                    .post('/index.php?c=App&a=setFaceID', {
                        user_images: user_images,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            that.faceid = _data.content.faceid;
                            Toast({
                                message: '识别成功',
                                duration: 3000,
                            });
                            setTimeout(function() {
                                that.isViewFace = false;
                            }, 3100);
                        } else {
                            that.faceUrl = '';
                            MessageBox({
                                title: '',
                                message: '识别失败，重新识别？',
                                showCancelButton: true,
                            })
                                .then(action => {
                                    if (action === 'confirm') {
                                        let input = document.getElementById('upfile');
                                        input.click();
                                    }
                                    if (action == 'cancel') {
                                        that.isViewFace = false;
                                    }
                                })
                                .catch(() => {
                                    that.isViewFace = false;
                                });
                        }
                    });
                // 置空
                e.target.value = '';
            };
        },
        loginFaceBtn: function() {
            let input = document.getElementById('upfile');
            input.setAttribute('capture', 'user');
            input.click();
        },
        // 隐藏人脸识别
        hideView: function() {
            this.isViewFace = false;
        },
        // 获取手机验证码
        getCode: function() {
            const that = this;
            // 验证手机号
            let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!that.isCodeIng) {
                if (!that.mobile) {
                    Toast({
                        message: '请输入您的手机号',
                        duration: 1500,
                    });
                    return false;
                } else if (!reg.test(that.mobile)) {
                    Toast({
                        message: '请输入正确的手机号',
                        duration: 1500,
                    });
                    return false;
                }
                that.$axios
                    .post('/index.php?c=App&a=sendSms', {
                        mobile: that.mobile,
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
                                that.codeText = time + 's';
                                if (time <= 0) {
                                    that.codeText = '获取验证码';
                                    that.isCodeIng = false;
                                    clearInterval(timer);
                                }
                            }, 1000);
                        }
                    });
            }
        },
        // 注册
        registerBtn: function() {
            const that = this;
            // 验证密码
            let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
            if (!that.isActive) {
                return false;
            } else if (that.isGetCode < 1) {
                // 是否获取验证码
                Toast({
                    message: '请先获取验证码',
                    duration: 1500,
                });
                return false;
            } else if (!reg.test(that.password)) {
                Toast({
                    message: '密码必须为大小写字母及数字组成且至少8位不超过16位',
                    duration: 3000,
                });
                return false;
            } else if (that.confirmPassword !== that.password) {
                Toast({
                    message: '两次输入密码不一致',
                    duration: 1500,
                });
                return false;
            }

            that.$axios
                .post('/index.php?c=App&a=setRegister', {
                    firstname: that.firstname,
                    lastname: that.lastname,
                    mobile: that.mobile,
                    code: that.code,
                    password: that.password,
                    faceid: that.faceid,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                        setTimeout(function() {
                            that.$router.replace({
                                path: '/registersuccess',
                            });
                        }, 1500);
                        let _item = {
                            lastname: '',
                            firstname: '',
                            mobile: '',
                            code: '',
                            password: '',
                            confirmPassword: '',
                            isAgree: false,
                            isGetCode: 0,
                        };
                        that[MutationTypes.SET_REGISTER_INFO](_item);
                    }
                });
        },
    },
};
</script>
