<template>
    <div class="phone-setting">
        <nav-header title="更改登录手机号"></nav-header>
        <div class="phone-setting-main">
            <div class="phone-setting-main-item">
                <label>新登录手机号</label>
                <input type="number" v-model="mobile" placeholder="请输入新手机号" />
            </div>
            <div class="phone-setting-main-item">
                <label>验证码 </label>
                <input type="text" v-model="code" placeholder="请输入验证码" />
                <button @click="getCode">{{ codeText }}</button>
            </div>
        </div>
        <button class="submit" @click="submitBtn">提交</button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            mobile: '',
            code: '',
            codeText: '获取验证码',
            // 是否获取验证码
            isGetCode: 0,
            // 是否正倒计时
            isCodeIng: false,
        };
    },
    methods: {
        submitBtn: function() {
            const that = this;
            if (that.isGetCode < 1) {
                Toast({
                    message: '请先获取验证码',
                    duration: 1500,
                });
                that.code = '';
                return false;
            }
            that.$axios
                .post('/index.php?c=App&a=changeUsername', {
                    mobile: that.mobile,
                    code: that.code,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        // 获取验证码
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
    },
};
</script>
