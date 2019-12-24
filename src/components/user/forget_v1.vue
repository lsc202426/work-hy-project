<template>
    <div class="register forget">
        <mt-header class="header">
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
        </mt-header>
        <div class="register-content">
            <h2>忘记密码</h2>
            <!-- 主体 -->
            <div class="register-main">
                <!-- 验证邮箱 -->
                <div class="register-main-email" v-show="isShow === 0">
                    <div class="list-item">
                        <input type="number" placeholder="请输入11位手机号码" v-model.number="mobile" />
                    </div>
                    <div class="list-item code">
                        <input type="text" placeholder="请输入验证码" v-model="code" />
                        <button @click="getCode">{{ codeText }}</button>
                    </div>
                    <div class="list-item">
                        <input type="password" placeholder="请输入你的新密码" v-model="password" />
                    </div>
                    <div class="list-item">
                        <input type="password" placeholder="请确认你的新密码" v-model="confirmPassword" />
                    </div>
                    <button class="register-btn" :class="{ active: isActive }" @click="submitBtn">
                        确认
                    </button>
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
            isShow: 0,
            // 手机号
            mobile: '',
            // 手机验证码
            code: '',
            codeText: '获取验证码',
            // 是否获取验证码
            isGetCode: 0,
            // 是否正倒计时
            isCodeIng: false,
            // 密码
            password: '',
            // 确认密码
            confirmPassword: '',
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
            if (
                this.mobile &&
                this.mobile !== '' &&
                this.code &&
                this.code !== '' &&
                this.password &&
                this.password !== '' &&
                this.confirmPassword &&
                this.confirmPassword !== ''
            ) {
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
            });
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
        // 确认
        submitBtn: function() {
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
                .post('/index.php?c=App&a=resetPwd', {
                    mobile: that.mobile,
                    code: that.code,
                    password: that.password,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: '密码重置成功！',
                            duration: 1500,
                        });
                        setTimeout(() => {
                            that.$router.replace({
                                path: '/login',
                            });
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
