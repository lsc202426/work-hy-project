<template>
    <div class="productCode">
        <nav-header title="二维码"></nav-header>
        <div class="productCode_content">
            <div class="code_box">
                <div class="code_i">
                    <!-- <img :src="codeCon.imgUrl" alt=""> -->
                    <img v-for="(item, index) in imgUrl" :src="configs.api.public_domain + item" :key="index" alt="" />
                </div>
                <!-- <p class="pro_text">http://{{shareUrl}}</p>
                <p class="code_exp">{{codeCon.codeExp}}</p> -->
            </div>
            <div class="imgOpera_box">
                <div @click="showToast()">
                    <img src="@/assets/images/order/icon_download.png" alt="" />
                    <p>下载到手机</p>
                </div>
                <div @click="copyUrl()">
                    <img src="@/assets/images/order/icon_share.png" alt="" />
                    <p>分享二维码</p>
                </div>
            </div>
        </div>
        <div v-if="isShow" class="bottom_share" @touchmove.prevent>
            <div class="share_bg" @click.stop></div>
            <div class="share_content">
                <p class="share_explain">{{ codeCon.shareExp }}</p>
                <div class="copy_btn_box">
                    <button
                        type="button"
                        class="btn"
                        v-clipboard:copy="'http://' + shareUrl"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    >
                        http://{{ shareUrl }}
                    </button>
                </div>
                <button type="button" class="share_cancel" @click.stop="cancel()">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import wxapi from '@/assets/js/wxapi.js';
export default {
    name: 'productCode',
    data() {
        return {
            shareUrl: this.$route.query.domain, //分享链接
            imgUrl: [], //二维码图片
            codeCon: {
                shareUrl: 'http://oapi.huyi.cn:6180/m_attach/2019-08-01/i_20190801170527420_1564650327.jpg',
                imgUrl: require('@/assets/images/index/icon_code1.png'), //获取图片
                codeUrl: 'http://可喜可贺.商标', //二维码地址
                codeExp: '长按识别二维码', //说明
                shareExp: '点击复制下方链接，去黏贴给好友吧:', //分享说明
            },
            isShow: false,
        };
    },
    created() {
        this.init();
    },
    deactivated() {
        //sessionStorage.removeItem('codeInfo');
    },
    methods: {
        init() {
            let _this = this;
            //let shareUrl = window.location.href;
            _this.$axios
                .post('index.php?c=App&a=getQrcode', {
                    // dpi_version: 'H5',
                    domain: _this.shareUrl,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        _this.imgUrl = res.data.content.url;
                        wxapi.wxRegister(res.data.content.wx_share.config, res.data.content.wx_share.value);
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
            //console.log('复制失败！');
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
