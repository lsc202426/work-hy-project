<template>
    <div class="notice-page">
        <nav-header title="公示" gobackurl="/orderList"></nav-header>
        <div class="notice-page-main containerView-main">
            <div class="notice-page-main-list">
                <a class="link-item" href="http://www.cicn.com.cn/2014-12/18/cms742article.shtml">中华商标杂志官网</a>
                <a class="link-item" href="http://www.ctjip.com/index.php/portal/list/index/id/42">中国市场监管新闻公示</a>
                <a class="link-item" href="https://xn--nqv7fk38arth.xn--czr694b/">点商标注册局官网公示</a>
            </div>
            <!-- 联系客服 -->
            <div class="link-box">
                <customer-service></customer-service>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.notice-page {
    height: 100%;
    &-main {
        &-list {
            .link-item {
                display: block;
                margin: 0.32rem 0.36rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                font-size: 0.32rem;
                color: #666666;
                border-radius: 0.16rem;
                border: 1px solid #f1f1f1;
            }
        }
    }
    // 联系客服
    .link-box {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
