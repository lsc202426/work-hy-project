<template>
    <div class="login">
        <div class="login-banner"></div>
        <div class="login-main">
            <div class="login-menu">
                <span @click="switchBtn(0)" :class="{ active: isShow === 0 }">
                    登录
                </span>
                <span @click="switchBtn(1)" :class="{ active: isShow === 1 }">
                    注册
                </span>
            </div>
            <div class="login-content">
                <!-- 登录 -->
                <div class="login-content-login" v-show="isShow === 0">
                    <input
                        type="text"
                        v-model="email"
                        class="email"
                        placeholder="请输入邮箱"
                    />
                    <input
                        type="password"
                        v-model="password"
                        class="password"
                        placeholder="请输入登录密码"
                    />
                    <div class="forget clearfix">
                        <button>忘记密码?</button>
                    </div>
                    <button class="submit" @click="logiBtn">立即登录</button>
                </div>
                <!-- 注册 -->
                <div class="login-content-register" v-show="isShow === 1">
                    <div class="list">
                        <label>登录邮箱</label>
                        <input
                            type="text"
                            placeholder="请输入邮箱"
                            v-model="register.email"
                            @blur.prevent="verifyEmail"
                        />
                    </div>
                    <div class="list">
                        <label>密码</label>
                        <input
                            type="text"
                            placeholder="请输入字母数字组成的密码"
                            v-model="register.password"
                            @blur.prevent="verifyPassword"
                        />
                    </div>
                    <div class="list">
                        <label>确认密码</label>
                        <input
                            type="text"
                            placeholder="请再次输入密码"
                            v-model="register.confirmPassword"
                        />
                    </div>
                    <div class="list">
                        <label>企业名称</label>
                        <input
                            type="text"
                            placeholder="请输入企业名称"
                            v-model="register.companyName"
                        />
                    </div>
                    <div class="list">
                        <label>联系人</label>
                        <input
                            type="text"
                            placeholder="请输入联系人"
                            v-model="register.contact"
                        />
                    </div>
                    <div class="list">
                        <label>手机</label>
                        <input
                            type="number"
                            placeholder="请输入手机号码"
                            v-model.number="register.mobilePhone"
                            @blur.prevent="verifyPhone"
                        />
                    </div>
                    <div class="list-item">
                        <button @click="getCode"></button>
                        <input
                            type="text"
                            placeholder="请输入验证密码"
                            v-model="register.code"
                        />
                    </div>
                    <div class="list">
                        <label>地址</label>
                        <input
                            type="text"
                            placeholder="请选择 省份-城市-县区"
                            v-model="register.address"
                        />
                    </div>
                    <div class="list">
                        <label>详细地址</label>
                        <input
                            type="text"
                            placeholder="请输入详细地址"
                            v-model="register.detailAddress"
                        />
                    </div>
                    <div class="list">
                        <label>邀请码</label>
                        <input
                            type="text"
                            placeholder="请输入邀请码"
                            v-model="register.inviteCode"
                        />
                    </div>
                    <div class="rule" @click="sureBtn">
                        <i class="select" :class="{ on: isSure }"></i>
                        <p>同意<span>《同意条款与平台注册规则》</span></p>
                    </div>
                    <button class="register" @click="registerBtn">
                        立即注册
                    </button>
                </div>
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
            email: "",
            password: "",
            isShow: 0,
            register: {
                email: "",
                password: "",
                confirmPassword: "",
                companyName: "",
                contact: "",
                mobilePhone: "",
                code: "",
                address: "",
                detailAddress: "",
                inviteCode: ""
            },
            isSure: false
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
        // 切换菜单
        switchBtn: function(val) {
            this.isShow = val;
        },
        // 登录
        logiBtn: function() {
            const that = this;
            if (!that.email) {
                Toast({
                    message: "请输入您的邮箱",
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
            axios
                .post("/index.php?c=App&a=checkLogin", {
                    username: that.email,
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
                        sessionStorage.setItem(
                            "token",
                            response.data.content.access_token
                        );
                        //登录成功存储登录信息
                        let loginInfo = {
                            un: that.email,
                            pd: that.$md5(that.password)
                        };
                        sessionStorage.setItem(
                            "infor",
                            JSON.stringify(loginInfo)
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
        },
        //注册
        registerBtn: function() {
            const that = this;
            let tipText = "";
            if (!that.register.email) {
                tipText = "请输入邮箱";
            } else if (!that.register.password) {
                tipText = "请输入密码";
            } else if (!that.register.confirmPassword) {
                tipText = "请再次输入密码";
            } else if (!that.register.companyName) {
                tipText = "请输入企业名称";
            } else if (!that.register.contact) {
                tipText = "请输入联系人";
            } else if (!that.register.mobilePhone) {
                tipText = "请输入手机号码";
            } else if (!that.register.code) {
                tipText = "请输入验证码";
            } else if (!that.register.address) {
                tipText = "请选择地址";
            } else if (!that.register.detailAddress) {
                tipText = "请输入详细地址";
            } else if (!that.register.inviteCode) {
                tipText = "请输入邀请码";
            } else if (!that.isSure) {
                tipText = "请阅读注册规则";
            }

            if (tipText) {
                Toast({
                    message: tipText,
                    duration: 1500
                });
                return false;
            }
        },
        // 验证邮箱
        verifyEmail: function() {
            let reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!reg.test(this.register.email)) {
                Toast({
                    message: "请输入正确邮箱！",
                    duration: 1500
                });
                this.register.email = "";
            }
        },
        // 验证密码
        verifyPassword: function() {
            let reg = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]/;
            if (!reg.test(this.register.password)) {
                Toast({
                    message: "请输入正确的密码格式",
                    duration: 1500
                });
                this.register.password = "";
            }
        },
        // 验证手机号
        verifyPhone: function() {
            let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!reg.test(this.register.mobilePhone)) {
                Toast({
                    message: "请输入正确的手机号",
                    duration: 1500
                });
                this.register.mobilePhone = "";
            }
        },
        // 获取验证码
        getCode: function() {
            // 暂留获取验证码
        },
        // 是否同意规则
        sureBtn: function() {
            this.isSure = !this.isSure;
        }
    }
};
</script>
