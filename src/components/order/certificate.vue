<template>
    <div class="certificate">
        <nav-header title="证书"></nav-header>
        <div class="containerView-main certificate_content">
            <!-- <img id="" src="../../assets/images/myproduct/img1.jpg" style="width:100%;" alt=""> -->
            <!-- <a v-for="(item,index) in imgUrl" :href="configs.api.public_domain+item" :key="index"></a> -->
            <!-- <img v-for="(item,index) in imgUrl" :src="configs.api.public_domain+item" :key="index" alt=""> -->
            <!-- <iframe
                v-for="(item,index) in imgUrl"
                :key="index"
                id="iframe"
                :src="item"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                allowtransparency="true"
                scrolling
                width="100%"
                height="100%"
            ></iframe> -->
            <a :href="url" id="proUrl"></a>
            <!-- 暂无数据 -->
            <blankPage v-if="imgUrl.length<=0"></blankPage>
        </div>
        <div v-if="imgUrl.length<0" class="imgOpera_box">
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
                    v-clipboard:copy="'http://'+shareUrl" 
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
            shareUrl:this.$route.query.domain,//域名
            mark:this.$route.query.mark,//产品标识
            isShow:false,
            imgUrl:[],//证书链接
            url:"",//单个证书链接
        }
    },
    created() {
        this.init();
    },
    deactivated() {
        sessionStorage.removeItem('certificateInfo');
    },
    mounted() {
        if(this.url){
            let locaUrl=document.getElementById('proUrl');
            locaUrl.click(); 
        }
    },
    methods: {
        init() {
            let _this = this;
            //let shareUrl = window.location.href;
            _this.$axios
                .post('index.php?c=App&a=getCert', {
                    // dpi_version: 'H5',
                    mark: _this.mark,
                    domain:_this.shareUrl
                })
                .then((res)=> {
                    //_this.imgUrl=['http://api.itmnic.com/sites/certificateFile?id=00CFF0E7-5DFD-2AE5-988C-2929B6C6DDA9&proType=trademark'];
                    if (res.data.errcode == 0) {
                        _this.imgUrl=res.data.content.url;
                        _this.url=_this.imgUrl[0];
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
<style lang="scss" scoped>
    .certificate .containerView-main{
        padding-bottom: 0!important;
    }
</style>