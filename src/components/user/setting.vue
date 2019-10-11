<template>
    <div id="setting" class="setting">
        <nav-header title="设置"></nav-header>
        <div class="setting-block">
            <div class="setting-box">
                <router-link to="/material">
                    <div class="setting-list">
                        <span>注册人资料</span>
                    </div>
                </router-link>
                <router-link to="/subjectList">
                    <div class="setting-list">
                        <span>申请人列表</span>
                    </div>
                </router-link>
            </div>
            <div class="setting-box">
                <router-link to="/phoneSetting">
                    <div class="setting-list">
                        <span>更改登录手机号</span>
                    </div>
                </router-link>
                <router-link to="/pswSetting">
                    <div class="setting-list">
                        <span>密码设置</span>
                    </div>
                </router-link>
                <router-link to="/feekbook">
                    <div class="setting-list">
                        <span>建议与反馈</span>
                    </div>
                </router-link>
            </div>
            <div class="setting-box">
                <router-link to="/aboutUs">
                    <div class="setting-list">
                        <span>关于我们</span>
                    </div>
                </router-link>
                <div class="setting-list" @click="signOut">
                    <span>退出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'setting',

    data() {
        return {};
    },
    created() {
        // this.getMsg();
    },
    methods: {
        // getMsg() {
        //   // let _this = this;
        //   this.$axios
        //     .post("", {})
        //     .then(function(response) {
        //     })
        //     .catch(function(error) {
        //     });
        // },
        // 退出登录
        signOut: function() {
            sessionStorage.clear();
            this.$router.replace({
                path: '/login',
            });
        },
    },
};
</script>

<style lang="scss"></style>
