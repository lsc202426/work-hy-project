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
                            <input type="radio" name="rate">
                            <input type="radio" name="rate">
                            <input type="radio" name="rate">
                            <input type="radio" name="rate">
                            <input type="radio" name="rate">
                        </div>
                    </div>
                    <span class="bruce_txt"></span>
                </div>
                <div class="evaluate_txt">
                    <textarea name="" placeholder="分享你的心得" id=""></textarea>
                </div>
                <div class="evaluate_file">
                    <div class="evaluate_img">
                        <img src="../../assets/images/user/phone.png" alt="">
                        <p>添加图片</p>
                        <input type="file" accept="image/*" name="" id="">
                    </div>
                    <div class="evaluate_video">
                        <img src="../../assets/images/user/phone.png" alt="">
                        <p>添加视频</p>
                        <input type="file" accept="video/*" name="" id="">
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
            isAnonymous:false
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
        }
    },

}
</script>