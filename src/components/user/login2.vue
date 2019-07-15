<template>
    <div class="login2">
        <div class="login2-top">
            <img class="logo" src="@/assets/images/index/index_logo.png" />
        </div>
        <div class="login2-title">
            {{ greetings }}
        </div>
        <div class="login2-type">
            <button>使用短信验证码登录</button>
            <button>使用密码登录</button>
            <button>使用Face ID</button>
        </div>
        <div class="login2-forget">
            <button>忘记密码？</button>
            <button class="login2-forget-register">注册账号</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            greetings: "早上好, siming"
        };
    }
};
</script>
