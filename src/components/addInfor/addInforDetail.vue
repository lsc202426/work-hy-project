<template>
    <!-- 补充资料 -->
    <div class="add-infor-detail containerView-main">
        <mt-header title="补充资料" class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="add-infor-detail-main">
            <h1 class="add-infor-detail-main-title" v-show="mark === 'tmd'">点商标</h1>
            <h1 class="add-infor-detail-main-title" v-show="mark === 'dzp'">点招聘</h1>
            <p class="add-infor-detail-main-tips">{{ material.tips }}</p>
            <h2 class="add-infor-detail-main-small-title" :class="{ active: mark === 'tmd' }">商标权利证明</h2>
            <div class="add-infor-detail-main-menu">
                <span @click="switchType(item)" v-for="item in typeList" :key="item.key" :class="{ active: item.key === selectType }">{{
                    item.name
                }}</span>
            </div>
            <p v-if="typeList[selectType - 1]" class="uploadtext">请上传{{ typeList[selectType - 1].name }}</p>
            <div class="feekbook-upload">
                <div class="voucher-center">
                    <div class="voucher-case" v-for="(item, index) in imgArr" :key="index">
                        <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
                            <div
                                class="img-voucher"
                                v-bind:style="{
                                    backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.fileurl + ')',
                                }"
                            ></div>
                        </div>
                        <!-- 删除的小图标 -->
                        <img
                            src="../../assets/images/user/icon_remove.png"
                            class="del-icon setDelBtn-el-hook"
                            v-show="imgArr[0]"
                            @click="del_img($event, index, 'imgArr')"
                        />
                    </div>
                    <!-- 默认图片 -->
                    <div class="voucher-case">
                        <div class="img_minus setDelBtn-img-hook">
                            <label for>
                                <div class="img-voucher">
                                    <img src="../../assets/images/user/upload-img.png" alt />
                                    <span>上传图片</span>
                                </div>
                                <input type="hidden" class="verify-right-hook" v-model="imgArr[0]" />
                                <input type="file" id="img_input" name="img_input" @change="toBase64($event)" class="upload-img" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button class="submit">提交</button>
            <div class="upload-box" v-show="isUpload">
                <div class="upload-box-main">
                    <div class="upload-box-main-title clearfix"><button>关闭</button></div>
                    <ul>
                        <li><span>从注册资料中选择</span><i></i></li>
                        <li><span>从相册选择</span><i></i></li>
                        <li><span>从拍照选择</span><i></i></li>
                    </ul>
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
            mark: this.$route.query.mark, //补充资料类别
            typeList: [], //资料类型
            imgArr: [],
            selectType: 1,
            isUpload: false,
            material: {},
        };
    },
    created() {
        const that = this;
        that.getTypeText();
        that.getMaterial();
    },
    methods: {
        // 返回
        goback: function() {},
        // 选择上传类型
        switchType: function(item) {
            this.selectType = item.key;
        },
        // 获取资质类型
        getTypeText: function() {
            const that = this;
            // 点商标
            if (that.mark === 'tmd') {
                that.$axios.post('/index.php?c=App&a=getTmdMaterialType', {}).then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.typeList = _data.content;
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
            } else if (that.mark === 'dzp') {
                that.$axios.post('/index.php?c=App&a=getDzpType', {}).then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.typeList = _data.content;
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
            }
        },
        getMaterial: function() {
            const that = this;
            // 获取已补充资料
            that.$axios
                .post('/index.php?c=App&a=getMaterial', {
                    itemid: this.$route.query.itemid,
                    mark: this.$route.query.mark,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        console.log(_data);
                        that.imgArr = _data.content.list;
                        that.material = _data.content;
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        // 点击删除
        del_img(e, i, val) {
            var that = this;
            that[val].splice(i, 1);
        },
        // 上传图片
        toBase64(e) {
            var that = this;
            if (that.imgArr.length == 3) {
                Toast({
                    message: '上传凭证不可超过3张',
                    duration: 3000,
                });
                return;
            }
            var files = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                var imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                that.$axios
                    .post('index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: imgcode,
                    })
                    .then(function(response) {
                        let _item = {
                            fileurl: response.data.content.url,
                        };
                        that.imgArr.push(_item);
                    });
            };
            // 置空
            e.target.value = '';
        },
    },
};
</script>
