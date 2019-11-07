<template>
    <div class="view-picture">
        <nav-header :title="titles"></nav-header>
        <div class="view-picture-main containerView-main">
            <div class="img-list">
                <img class="img" v-for="(item, index) in urlList" :key="index" :src="item" alt="" />
            </div>
            <div class="view-picture-btn">
                <div class="picture-btn" @click="showToast()">
                    <img src="@/assets/images/order/icon_download.png" alt="" />
                    <p>下载到手机</p>
                </div>
                <div class="picture-btn" @click="copyUrl()">
                    <img src="@/assets/images/order/icon_share.png" alt="" />
                    <p>分享二维码</p>
                </div>
            </div>
            <div v-if="isShow" class="bottom_share" @touchmove.prevent>
                <div class="share_bg" @click.stop></div>
                <div class="share_content">
                    <p class="share_explain">点击复制下方链接，去黏贴给好友吧:</p>
                    <div class="copy_btn_box">
                        <button
                            v-for="(item, index) in urlList"
                            :key="index"
                            type="button"
                            class="btn"
                            v-clipboard:copy="item"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >
                            {{ item }}
                        </button>
                    </div>
                    <button type="button" class="share_cancel" @click.stop="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            titles: '合同',
            urlList: [],
            isShow: false,
        };
    },
    created() {
        if (sessionStorage.viewpic) {
            let temptInfo = JSON.parse(sessionStorage.viewpic);
            this.titles = temptInfo.title;
            this.urlList.push(temptInfo.url);
        }
    },
    methods: {
        //下载提示
        showToast() {
            Toast({
                message: '长按保存图片',
                duration: 2000,
            });
        },
        // 复制成功提示
        onCopy() {
            Toast({
                message: '复制成功',
                duration: 2000,
            });
        },
        // 复制失败提示
        onError() {
            Toast({
                message: '复制失败！',
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
    // 销毁清除
    beforeDestroy() {
        sessionStorage.removeItem('viewpic');
    },
};
</script>
<style lang="scss" scoped>
.view-picture {
    height: 100%;
}
#app .containerView-main {
    padding-bottom: 1.44rem;
}
.view-picture-main {
    .img-list {
        .img {
            display: block;
            margin: 0.2rem auto;
            max-width: 100%;
        }
    }
    .view-picture-btn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.44rem;
        background-color: #ffffff;
        z-index: 1;
        box-shadow: 0px -4px 8px 0px rgba(211, 211, 211, 0.5);
        display: flex;
        justify-content: space-between;
        .picture-btn {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            text-align: center;
            img {
                display: block;
                margin: 0 auto 0.16rem;
                width: 0.42rem;
                height: 0.42rem;
            }
        }
    }
    .bottom_share {
        font-size: 0.26rem;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        .share_bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.3;
        }
        .share_content {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #d3d3d3;
            .copy_btn_box {
                width: 100%;
                max-height: 3.58rem;
                overflow: auto;
                padding: 0 0.25rem 0.2rem 0.25rem;
            }
            .share_explain {
                padding: 0.2rem 0.25rem;
            }
            .btn {
                margin: 0.1rem 0;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                border: 1px #333 dashed;
                line-height: 0.65rem;
                width: 100%;
                text-align: left;
                padding-left: 0.1rem;
                white-space: nowrap;
            }
            .share_cancel {
                width: 100%;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                text-align: center;
                padding: 0.25rem 0;
                background-color: #fff;
            }
        }
    }
}
</style>
