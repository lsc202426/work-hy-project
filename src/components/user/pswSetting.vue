<template>
    <div id="pswSetting" class="pswSetting">
        <nav-header title="密码设置" fixed></nav-header>
        <div class="psw">
            <div class="psw-block">
                <div class="psw-list">
                    <span>原密码</span>
                    <input type="password" placeholder="请输入原密码" v-model="oldPsw" />
                </div>
                <div class="psw-list">
                    <span>新密码</span>
                    <input type="password" placeholder="请输入8-16位数字加字母组合密码" v-model="newPsw" />
                </div>
                <div class="psw-list">
                    <span>确认密码</span>
                    <input type="password" placeholder="请再次输入新密码" v-model="moreNewPsw" />
                </div>
            </div>
            <div class="psw-submit" @click="submitMsg()">
                <span>提交</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    name: 'pswSetting',

    data() {
        return {
            oldPsw: '',
            newPsw: '',
            moreNewPsw: '',
        };
    },
    created() {
        // this.getMsg();
    },
    methods: {
        submitMsg() {
            const that = this;
            // 正则 8-16位数字+密码
            const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (that.oldPsw == '') {
                Toast({
                    message: '请输入原密码',
                    duration: 3000,
                });
                return false;
            } else if (that.newPsw == '') {
                Toast({
                    message: '请输入新密码',
                    duration: 3000,
                });
                return false;
            } else if (!passwordReg.test(that.newPsw)) {
                Toast({
                    message: '密码需为8-16位数字字母组合',
                    duration: 3000,
                });
                return false;
            } else if (that.moreNewPsw == '') {
                Toast({
                    message: '请输入确认密码',
                    duration: 3000,
                });
                return false;
            } else if (that.newPsw != that.moreNewPsw) {
                Toast({
                    message: '两次输入密码不一致',
                    duration: 3000,
                });
                return false;
            }
            that.$axios
                .post('index.php?c=App&a=setNewPwd', {
                    pwd: that.oldPsw,
                    password: that.newPsw,
                    sign: that.$md5(that.newPsw + that.$md5(that.oldPsw)),
                })
                .then(function(response) {
                    if (response.data.errcode == '-1') {
                        Toast({
                            message: '原密码不正确',
                            duration: 3000,
                        });
                    } else {
                        Toast({
                            message: '修改成功',
                            duration: 3000,
                        });
                        setTimeout(() => {
                            that.$router.push('/setting');
                        }, 3000);
                    }
                });
        },
    },
};
</script>

<style lang="scss"></style>
