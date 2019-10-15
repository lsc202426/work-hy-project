<template>
    <div class="evaluate">
        <mt-header class="header" title="发表评价" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right" @click="release()">发布</mt-button>
        </mt-header>
        <div class="containerView-main">
            <div class="evaluate_con">
                <div class="evaluate_name">罗曼哈撒.餐厅</div>
                <div class="evaluate_box">
                    <span>整体评价</span>
                    <div class="bruce flex-ct-x">
                        <div class="star-rating">
                            <input type="radio" @click="evaluateI(index)" name="rate" v-for="(item,index) in 5" :key="index">
                        </div>
                    </div>
                    <span class="bruce_txt">{{bruceTxt}}</span>
                </div>
                <div class="evaluate_txt">
                    <textarea v-model="evaluateTxt" name="" placeholder="分享你的心得" id=""></textarea>
                </div>
                <div class="evaluate_file">
                    <div class="evaluate_img">
                        <div v-if="imgSrc" class="evaluate_img_bg">
                            <div @click="delFile()" class="del_bg"></div>
                            <img :src="configs.api.public_domain+imgSrc" alt="">
                        </div>
                        <input type="file" @change="toBase64($event)" accept="image/*" name="" id="">
                    </div>
                    <div class="evaluate_video">
                        <div v-if="videoSrc" class="evaluate_video_bg">
                            <div @click="delFile('video')" class="del_bg"></div>
                            <video :src="configs.api.public_domain+videoSrc" controls="controls"></video>
                        </div>
                        <input type="file" @change="toBase64($event,'video')" accept="video/*" name="" id="">
                    </div>
                </div>
                <div class="anonymous">
                    <div class="anonymous_box" @click="setAnonymous()">
                        <i :class="{active:isAnonymous}"></i>
                        <span>匿名</span>
                    </div>
                    <div v-if="isAnonymous" class="gary">
                        你写的评价会以匿名的形式展现
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"evaluate",
    data() {
        return {
            isAnonymous:false,
            imgSrc:"",
            videoSrc:"",
            bruceTxt:"",
            evaluateTxt:"",
        }
    },
    created() {
        
    },
    methods: {
        release(){

        },
        setAnonymous(){
            this.isAnonymous=!this.isAnonymous;
        },
        goback(){
            this.$router.go(-1);
        },
        //上传文件处理
        toBase64(e,i){
            let _this = this;
            _this.isUpload = false;
            let files = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                if(i&&i==="video"){
                    let imgcode = this.result.replace(/^data:image\/(mp4|MPEG4|WebM|ogg);base64,/, '');
                }else{
                    let imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                }
                let imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                console.log(this);
                _this.$axios
                    .post('index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: imgcode,
                    })
                    .then(function(res) {
                        if(res.data.errcode==0){
                            if(i||i==="video"){
                                _this.videoSrc=res.data.content.url;
                            }else{
                                _this.imgSrc=res.data.content.url;
                            }
                        }
                    });
                
            }
        },
        //删除文件
        delFile(i){
            if(i&&i==="video"){
                this.videoSrc="";
            }else{
                this.imgSrc="";
            }
        },
        //选择评价星数
        evaluateI(i){
            let _this=this;
            switch (i) {
                case 0:
                    _this.bruceTxt="非常好";
                    break;
                case 1:
                    _this.bruceTxt="很好";
                    break;
                case 2:
                    _this.bruceTxt="好";
                    break;
                case 3:
                    _this.bruceTxt="一般";
                    break;
                case 4:
                    _this.bruceTxt="差";
                    break;
                default:
                    break;
            }
        }
    },

}
</script>