<template>
    <!-- 补充资料 -->
    <div class="add-infor-detail containerView-main">
        <nav-header title="补充资料"></nav-header>
        <div class="add-infor-detail-main">
            <h1 class="add-infor-detail-main-title" v-show="mark === 'tmd'">点商标</h1>
            <h1 class="add-infor-detail-main-title" v-show="mark === 'dzp'">点招聘</h1>
            <p class="add-infor-detail-main-tips">{{ material.tips }}</p>
            <!-- 点商标，点招聘 -->
            <div class="box" v-if="mark === 'tmd' || mark === 'dzp'">
                <h2 class="add-infor-detail-main-small-title" v-show="mark === 'tmd'">商标权利证明</h2>
                <h2 class="add-infor-detail-main-small-title" v-show="mark === 'dzp'">请选择资质类型</h2>
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
                                        backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.url + ')',
                                    }"
                                ></div>
                            </div>
                            <!-- 删除的小图标 -->
                            <img
                                src="../../assets/images/user/icon_remove.png"
                                class="del-icon setDelBtn-el-hook"
                                v-show="imgArr[0]"
                                @click="del_img($event, index, 'imgArr', item)"
                            />
                        </div>
                        <!-- 默认图片 -->
                        <div class="voucher-case" @click="uploadImg">
                            <div class="img_minus setDelBtn-img-hook">
                                <label for>
                                    <div class="img-voucher">
                                        <img src="../../assets/images/user/upload-img.png" alt />
                                        <span>上传图片</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 商标 -->
            <div class="box" v-if="mark === 'bs'">
                <h2 class="add-infor-detail-main-small-title">商标代理委托书</h2>
                <p class="add-infor-detail-main-tips">请打印委托书，并盖章签字后，拍照上传</p>
                <div class="feekbook-upload">
                    <div class="voucher-center">
                        <div class="voucher-case" v-for="(item, index) in imgArr" :key="index">
                            <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
                                <div
                                    class="img-voucher"
                                    v-bind:style="{
                                        backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.url + ')',
                                    }"
                                ></div>
                            </div>
                            <!-- 删除的小图标 -->
                            <img
                                src="../../assets/images/user/icon_remove.png"
                                class="del-icon setDelBtn-el-hook"
                                v-show="imgArr[0]"
                                @click="del_img($event, index, 'imgArr', item)"
                            />
                        </div>
                        <!-- 默认图片 -->
                        <div class="voucher-case" @click="uploadImg">
                            <div class="img_minus setDelBtn-img-hook">
                                <label for>
                                    <div class="img-voucher">
                                        <img src="../../assets/images/user/upload-img.png" alt />
                                        <span>上传图片</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="add-infor-detail-main-small-title">商标代理委托书</h2>
                <p class="add-infor-detail-main-tips">请打印委托书，并盖章签字后，拍照上传</p>
                <div class="feekbook-upload">
                    <div class="voucher-center">
                        <div class="voucher-case" v-for="(item, index) in imgArr" :key="index">
                            <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
                                <div
                                    class="img-voucher"
                                    v-bind:style="{
                                        backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.url + ')',
                                    }"
                                ></div>
                            </div>
                            <!-- 删除的小图标 -->
                            <img
                                src="../../assets/images/user/icon_remove.png"
                                class="del-icon setDelBtn-el-hook"
                                v-show="imgArr[0]"
                                @click="del_img($event, index, 'imgArr', item)"
                            />
                        </div>
                    </div>
                </div>
                <h2 class="add-infor-detail-main-small-title">商标代理委托书</h2>
                <p class="add-infor-detail-main-tips">请上传盖章签字后的确认表</p>
                <div class="feekbook-upload">
                    <div class="voucher-center">
                        <div class="voucher-case" v-for="(item, index) in imgArr" :key="index">
                            <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
                                <div
                                    class="img-voucher"
                                    v-bind:style="{
                                        backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.url + ')',
                                    }"
                                ></div>
                            </div>
                            <!-- 删除的小图标 -->
                            <img
                                src="../../assets/images/user/icon_remove.png"
                                class="del-icon setDelBtn-el-hook"
                                v-show="imgArr[0]"
                                @click="del_img($event, index, 'imgArr', item)"
                            />
                        </div>
                        <!-- 默认图片 -->
                        <div class="voucher-case" @click="uploadImg">
                            <div class="img_minus setDelBtn-img-hook">
                                <label for>
                                    <div class="img-voucher">
                                        <img src="../../assets/images/user/upload-img.png" alt />
                                        <span>上传图片</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="submit" @click="submitInfor">提交</button>
            <div class="upload-box" v-show="isUpload">
                <div class="upload-box-main">
                    <div class="upload-box-main-title clearfix"><button @click="closeBtn">关闭</button></div>
                    <ul>
                        <li><span>从注册资料中选择</span><i></i></li>
                        <li>
                            <span>从相册选择</span>
                            <i></i>
                            <input type="file" id="img_input" name="img_input" @change="toBase64($event)" class="upload-img" />
                        </li>
                        <li>
                            <span>从拍照选择</span><i></i>
                            <input
                                type="file"
                                id="img_input"
                                capture="camera"
                                multiple="multiple"
                                accept="image/*"
                                name="img_input"
                                @change="toBase64($event)"
                                class="upload-img"
                            />
                        </li>
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
        // 获取补充资料详情
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
        del_img(e, i, val, item) {
            var that = this;
            that[val].splice(i, 1);
            if (parseInt(item.id) !== 0) {
                that.$axios
                    .post('/index.php?c=App&a=delMaterial', {
                        id: item.id,
                    })
                    .then(function(response) {
                        if (response.data.errcode === 0) {
                            Toast({
                                message: response.data.errmsg,
                                duration: 1500,
                            });
                        }
                    });
            }
        },
        //显示上传框
        uploadImg: function() {
            this.isUpload = true;
        },
        // 隐藏上传框
        closeBtn: function() {
            this.isUpload = false;
        },
        // 上传图片
        toBase64(e) {
            var that = this;
            that.isUpload = false;
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
                            id: 0,
                            name: files.name,
                            url: response.data.content.url,
                        };
                        that.imgArr.push(_item);
                    });
            };
            // 置空
            e.target.value = '';
        },
        // 提交
        submitInfor: function() {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=setMaterial', {
                    itemid: that.$route.query.itemid,
                    type: that.selectType,
                    attachments: JSON.stringify(that.imgArr),
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                        setTimeout(function() {
                            that.$router.push({
                                path: '/addinfor',
                                query: {
                                    id: that.$route.query.orderId,
                                },
                            });
                        }, 1500);
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
    },
};
</script>
