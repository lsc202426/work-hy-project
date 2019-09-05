<template>
    <div class="certificate">
        <nav-header title="证书"></nav-header>
        <div class="containerView-main certificate_content">
            <img id="" src="../../assets/images/myproduct/img1.jpg" style="width:100%;" alt="">
        </div>
        <div class="imgOpera_box">
            <div @click="showToast()">
                <img src="../../assets/images/order/icon_download.png" alt="">
                <p>下载到手机</p>
            </div>
            <div @click="copyUrl()">
                <img src="../../assets/images/order/icon_share.png" alt="">
                <p>分享证书</p>
            </div>
        </div>
        <div v-if="isShow" class="bottom_share">
            <div class="share_bg" @click.stop></div>
            <!-- <input type="text" v-model="shareUrl" /> -->
            <div class="share_content">
                <p class="share_explain">点击复制下方链接，去黏贴给好友吧:</p>
                <button type="button" class="btn" 
                    v-clipboard:copy="shareUrl" 
                    v-clipboard:success="onCopy" 
                    v-clipboard:error="onError">
                    {{shareUrl}}
                </button>
                <button type="button" class="share_cancel" @click.stop="cancel()">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import wxapi from '@/assets/js/wxapi.js';
export default {
    name:'certificate',
    data() {
        return {
            shareUrl:window.location.href,//分享链接
            isShow:false,
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let _this = this;
            //let shareUrl = window.location.href;
            _this.$axios
                .post('index.php?c=App&a=getIndex', {
                    dpi_version: 'H5',
                    shareUrl: _this.shareUrl,
                })
                .then(function(res) {
                    if (res.data.errcode == 0) {
                        wxapi.wxRegister(res.data.content.wx_share.config, res.data.content.wx_share.value);
                    }
                })
        },
        //下载提示
        showToast(){
            Toast({
                message: '长按保存图片',
                duration: 2000
            });
        },
        onCopy(e) {
            Toast({
                message: '复制成功',
                duration: 2000
            });
        },
        onError(e) {
            //console.log('复制失败！');
        },
        //显示分享链接
        copyUrl(){
            this.isShow=true;
        },
        //隐藏分享链接
        cancel(){
            this.isShow=false;
        }
    },
}
</script>