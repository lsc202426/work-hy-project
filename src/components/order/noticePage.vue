<template>
    <div class="notice-page">
        <nav-header title="公示" gobackurl="/orderList"></nav-header>
        <div class="notice-page-main containerView-main">
            <div class="notice-page-main-list">
                <a class="link-item" target="_blank" v-for="(item, index) in publicity_list" :href="item.url" :key="index">
                    {{ item.name }}
                </a>
                <!-- <a class="link-item" href="http://www.cicn.com.cn/2014-12/18/cms742article.shtml">中华商标杂志官网</a>
                <a class="link-item" href="http://www.ctjip.com/index.php/portal/list/index/id/42">中国市场监管新闻公示</a>
                <a class="link-item" href="https://xn--nqv7fk38arth.xn--czr694b/">点商标注册局官网公示</a> -->
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
        return {
            mark: this.$route.query.mark,
            publicity_list: [],
        };
    },
    // 初始化
    created() {
        this.getPublicity();
    },
    methods: {
        // 获取公示页
        getPublicity: function() {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getPublicity', {
                    mark: that.mark,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.publicity_list = _data.content;
                    }
                });
        },
    },
};
</script>
<style lang="scss" scoped>
#app .containerView-main {
    padding-bottom: 2.02rem;
}
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
        width: 100%;
        background-color: #ffffff;
    }
}
</style>
