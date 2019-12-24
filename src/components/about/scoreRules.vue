<template>
    <div class="integral-rules">
        <mt-header class="header" title="积分规则" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
        </mt-header>
        <div class="content_box containerView-main">
            <iframe
                id="iframe"
                :src="url"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                allowtransparency="true"
                scrolling
            ></iframe>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'about',
    data() {
        return {
            url: '',
        };
    },
    created() {
        this.init();
    },
    methods: {
        goback() {
            if (!this.page) {
                this.$router.push({
                    path: '/integral',
                });
            } else {
                this.page = false;
                this.isShow = false;
                document.getElementById(this.showId).style.cssText = 'display:none';
            }
        },
        init() {
            const _this = this;
            _this.$axios.post('index.php?c=App&a=getScoreRules', {}).then(function(response) {
                if (response.data.errcode == 0) {
                    _this.url = response.data.content.url;
                } else {
                    Toast({
                        message: response.data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.integral-rules {
    padding: 0;
    height: 100%;
}
.containerView-main {
    padding-bottom: 0rem !important;
    font-size: 0;
    height: 100%;
    iframe {
        height: 100%;
        width: 100%;
    }
    iframe::-webkit-scrollbar {
        display: none;
    }
    .box {
        height: 100%;
    }

    ::-webkit-scrollbar {
        display: none;
    }
}
</style>
