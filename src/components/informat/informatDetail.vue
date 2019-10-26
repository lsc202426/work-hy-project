<template>
    <div class="informatDetail">
        <nav-header title="资讯详情"></nav-header>
        <div class="detail_box containerView-main">
            <div class="title">{{ data.title }}</div>
            <div class="source">
                <span>来自：{{ data.src }}</span>
                <span>{{ data.created_time }}</span>
            </div>
            <div class="detail" v-html="data.content"></div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            data: {}, //详情数据
        };
    },
    created() {
        this.init(); //初始化数据
    },
    methods: {
        //初始化获取详情数据
        init() {
            this.$axios
                .post('index.php?c=App&a=getNewsInfo', {
                    id: this.$route.query.id,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.data = res.data.content;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.detail_box {
    padding: 0 0.32rem;
    .title {
        font-size: 0.4rem;
        text-align: center;
        margin: 0.3rem 0;
    }
    .source {
        display: flex;
        justify-content: space-between;
        span {
            font-size: 0.24rem;
        }
    }
    .detail {
        margin-top: 0.2rem;
        color: #666666;
    }
}
</style>
