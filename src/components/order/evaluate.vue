<template>
    <div class="evaluate">
        <mt-header class="header" title="发表评价" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right" @click="release()">发布</mt-button>
        </mt-header>
        <div class="containerView-main">
            <div class="evaluate_con" v-for="(list,index) in getData" :key="index">
                <div class="evaluate_name">{{list.keyword}}</div>
                <div class="evaluate_box">
                    <span>整体评价</span>
                    <div class="bruce flex-ct-x">
                        <div class="star-rating">
                            <span :class="{active:index<list.star}" type="radio" v-for="(item,index) in 5" :key="index" @click="evaluateI(index,list)" name="rate"></span>
                        </div>
                    </div>
                    <span class="bruce_txt">{{list.bruceTxt}}</span>
                </div>
                <div class="evaluate_txt">
                    <textarea v-model="list.content" name="" placeholder="分享你的心得" id=""></textarea>
                </div>
                <div class="evaluate_file">
                    <div class="evaluate_img">
                        <div v-if="list.imgSrc" class="evaluate_img_bg">
                            <div @click="delFile(list)" class="del_bg"></div>
                            <img :src="configs.api.public_domain+list.imgSrc" alt="">
                        </div>
                        <input type="file" @change="toBase64($event,list)" accept="image/*" name="" id="">
                    </div>
                    <div class="evaluate_video">
                        <div v-if="list.videoSrc" class="evaluate_video_bg">
                            <div @click="delFile(list,'video')" class="del_bg"></div>
                            <video :src="configs.api.public_domain+list.videoSrc" controls="controls"></video>
                        </div>
                        <input type="file" @change="toBase64($event,list,'video')" accept="video/*" name="" id="">
                    </div>
                </div>
                <div class="anonymous">
                    <div class="anonymous_box" @click="setAnonymous(list)">
                        <i :class="{active:list.anonymous==1}"></i>
                        <span>匿名</span>
                    </div>
                    <div v-if="list.anonymous==1" class="gary">
                        你写的评价会以匿名的形式展现
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
export default {
    name:"evaluate",
    data() {
        return {
            order_no:this.$route.query.order_no||"HP190826095316000088735414",//合同号
            getData:[],//获取的产品项内容
        }
    },
    created() {
        this.init();
    },
    watch: {
        getData(val){
            
        }
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_IS_SELECT]]),
        ...mapMutations({
            [MutationTypes.SET_IS_SELECT]: MutationTypes.SET_IS_SELECT,
        }),
        init(){
            let _this=this;
            if(!_this.order_no){
                Toast({
                    message: "请选择订单进行评价",
                    duration: 3000,
                });
                setTimeout(() => {
                    _this.$router.push({
                        path:"/orderList"
                    })
                }, 3000);
                return;
            }
            _this.$axios.post('index.php?c=App&a=getEvaluateIndex',{
                order_no: _this.order_no,
            })
            .then((res)=>{
                let _data=res.data;
                if(_data.errcode==0){
                    _this.getData=_data.content;
                    for(let i=0;i<_this.getData.length;i++){
                        _this.getData[i].star=5;
                        _this.getData[i].content="";
                        _this.getData[i].imgSrc="";
                        _this.getData[i].videoSrc="";
                        _this.getData[i].anonymous=1;
                        _this.getData[i].bruceTxt="非常好";
                        // _this.$nextTick(()=>{
                        //     _this.evaluateI(0,_this.getData[i]);
                        // })
                    }
                }else{
                    Toast({
                        message: _data.errmsg,
                        duration: 2000,
                    });
                }
                
            })
        },
        //发布评价
        release(){
            let subData=[];
            let toastTxt="";
            for(let i=0;i<this.getData.length;i++){
                if(!this.getData[i].content){
                    toastTxt="请输入评价内容";
                }
                if(!this.getData[i].imgSrc&&!this.getData[i].videoSrc){
                    toastTxt="请上传图片或视频";
                }
                let obj={};
                obj.id=this.getData[i].id;
                obj.star=this.getData[i].star;
                obj.content=this.getData[i].content;
                if(this.getData[i].imgSrc&&this.getData[i].videoSrc){
                    obj.attachments=this.getData[i].imgSrc+','+this.getData[i].videoSrc;
                }else if(this.getData[i].imgSrc){
                    obj.attachments=this.getData[i].imgSrc;
                }else if(this.getData[i].videoSrc){
                    obj.attachments=this.getData[i].videoSrc;
                }
                obj.anonymous=this.getData[i].anonymous;
                subData.push(obj);
            }
            if(toastTxt){
                Toast({
                    message: toastTxt,
                    duration: 2000,
                });
                return false;
            }else{
                console.log(subData);
                this.$axios.post('index.php?c=App&a=setEvaluate',{
                    order_no: this.order_no,
                    data:JSON.stringify(subData),
                })
                .then((res)=>{
                    if(res.data.errcode==0){
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                        setTimeout(() => {
                            let _value={};
                            this.$router.push({
                                path: '/orderlist',
                            });
                            _value = {
                                isSelect: 4,
                                status: 5,
                            };
                            this[MutationTypes.SET_IS_SELECT](_value);
                        }, 2000);
                    }else{
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                    }
                })
            }
            
        },
        //是否匿名
        setAnonymous(list){
            if(list.anonymous==1){
                list.anonymous=0;
            }else{
                list.anonymous=1;
            }
            this.$forceUpdate();
        },
        //返回
        goback(){
            this.$router.go(-1);
        },
        //上传文件处理
        toBase64(e,list,i){
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
                                list.videoSrc=res.data.content.url;
                            }else{
                                list.imgSrc=res.data.content.url;
                            }
                            _this.$forceUpdate();
                        }
                    });
            }
        },
        //删除文件
        delFile(list,i){
            if(i&&i==="video"){
                list.videoSrc="";
            }else{
                list.imgSrc="";
            }
            this.$forceUpdate();
        },
        //选择评价星数
        evaluateI(i,list){
            let _this=this;
            //_this.star=i;
            switch (i) {
                case 4:
                    list.bruceTxt="非常好";
                    list.star=5;
                    break;
                case 3:
                    list.bruceTxt="好";
                    list.star=4;
                    break;
                case 2:
                    list.bruceTxt="一般";
                    list.star=3;
                    break;
                case 1:
                    list.bruceTxt="差";
                    list.star=2;
                    break;
                case 0:
                    list.bruceTxt="非常差";
                    list.star=1;
                    break;
                default:
                    break;
            }
            this.$forceUpdate();
        }
    },

}
</script>