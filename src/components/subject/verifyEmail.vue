<template>
    <div class="verifyEmail">
        <nav-header title=" "></nav-header>
        <div class="containerView-main">
            <div class="verify_con">
                <div class="verify_con_title">验证邮箱</div>
                <div class="verify_explain">为了更好地为您提供服务，请进行邮箱验证</div>
                <div class="vreify_box">
                    <div class="vreify_item">
                        <span>邮箱</span>
                        <input type="email" :value="email" readonly="readonly" />
                    </div>
                    <div class="vreify_item">
                        <span>验证码</span>
                        <input type="email" v-model="code" class="code_input" placeholder="请输入验证码" />
                        <input
                            type="text"
                            v-model="text"
                            @click="sendCode()"
                            :class="{ gray_code: gray }"
                            class="code"
                            readonly="readonly"
                        />
                    </div>
                    <div class="sub_btn" @click="subVerigy()">提交验证</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'verifyEmail',
    data() {
        return {
            id: this.$route.query.id,
            email: this.$route.query.email,
            text: '获取验证码',
            code: '',
            timer: null,
            gray: false,
        };
    },
    created() {},
    methods: {
        //提交验证
        subVerigy() {
            let _this = this;
            if (this.code == '' || this.code == null) {
                Toast({
                    message: '请输入验证码',
                    duration: 2000,
                });
                return;
            }
            if (!this.email || this.code == '') {
                Toast({
                    message: '邮箱不能为空',
                    duration: 2000,
                });
                return;
            }
            _this.$axios
                .post('index.php?c=App&a=verifyEmail', {
                    id: _this.id,
                    email: _this.email,
                    code: _this.code,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        Toast({
                            message: response.data.errmsg,
                            duration: 2000,
                        });
                        setTimeout(function() {
                            _this.$router.push({
                                path: _this.$router.query.path,
                            });
                        }, 2000);
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 2000,
                        });
                    }
                });
        },
        //发送验证码
        sendCode() {
            let _this = this;
            if (_this.text == '获取验证码') {
                _this.text = 60;
                _this.gray = true;
                if (_this.email) {
                    _this.$axios
                        .post('index.php?c=App&a=sendCode', {
                            id: _this.id,
                            email: _this.email,
                        })
                        .then(function(response) {
                            if (response.data.errcode == 0) {
                                if (!_this.timer) {
                                    Toast({
                                        message: response.data.errmsg,
                                        duration: 2000,
                                    });
                                    _this.timer = setInterval(() => {
                                        if (_this.text > 0 && _this.text <= _this.text) {
                                            _this.text--;
                                        } else {
                                            _this.text = '获取验证码';
                                            clearInterval(_this.timer);
                                            _this.timer = null;
                                            _this.gray = false;
                                        }
                                    }, 1000);
                                }
                            } else {
                                Toast({
                                    message: response.data.errmsg,
                                    duration: 2000,
                                });
                            }
                        });
                }
            } else {
                return;
            }
        },
    },
};
</script>
