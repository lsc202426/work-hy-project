<template>
    <div class="certificate">
        <nav-header title="证书" fixed></nav-header>
        <div class="containerView-main certificate_content" :class="{ ispd: imgUrl.length > 0 }">
            <div class="img-list" v-if="imgUrl && imgUrl.length > 0">
                <img v-for="(item, index) in imgUrl" :src="item" :key="index" alt="" />
            </div>
            <blankPage v-else></blankPage>
        </div>
        <div class="imgOpera_box" v-if="imgUrl.length > 0">
            <div @click="showToast()">
                <img src="../../assets/images/order/icon_download.png" alt="" />
                <p>下载到手机</p>
            </div>
            <div @click="copyUrl()">
                <img src="../../assets/images/order/icon_share.png" alt="" />
                <p>分享证书</p>
            </div>
        </div>
        <div v-if="isShow" class="bottom_share">
            <div class="share_bg" @click.stop></div>
            <div class="share_content">
                <p class="share_explain">点击复制下方链接，去黏贴给好友吧:</p>
                <div class="share-item" v-for="(url, k) in imgUrl" :src="url" :key="k">
                    <button type="button" class="btn" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
                        {{ url }}
                    </button>
                </div>
                <button type="button" class="share_cancel" @click.stop="cancel()">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name: 'certificate',
    data() {
        return {
            shareUrl: this.$route.query.domain, //域名
            mark: this.$route.query.mark, //产品标识
            isShow: false,
            imgUrl: [], //证书链接
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const _this = this;
            _this.$axios
                .post('index.php?c=App&a=getCert', {
                    mark: _this.mark,
                    domain: _this.shareUrl,
                    fileType: 'png',
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        _this.imgUrl = res.data.content.url;
                    }
                });
        },
        //下载提示
        showToast() {
            Toast({
                message: '长按保存图片',
                duration: 2000,
            });
        },
        onCopy() {
            Toast({
                message: '复制成功',
                duration: 2000,
            });
        },
        onError() {
            Toast({
                message: '复制失败',
                duration: 2000,
            });
        },
        //显示分享链接
        copyUrl() {
            this.isShow = true;
        },
        //隐藏分享链接
        cancel() {
            this.isShow = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.certificate .containerView-main {
    padding-bottom: 0 !important;
    &.ispd {
        padding-bottom: 1.42rem !important;
    }
}
.img-list {
    padding: 0.2rem 0;
    img {
        display: block;
        width: 100%;
    }
}
</style>
