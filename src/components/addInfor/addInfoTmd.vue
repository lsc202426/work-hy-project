<template>
    <div class="addinfor-tmd">
        <nav-header title="补充资料" fixed></nav-header>
        <div class="addinfor-tmd-main containerView-main">
            <div class="content" v-if="typeList && Object.keys(typeList).length > 0">
                <div class="type-list">
                    <label class="left-text">材料类型</label>
                    <select v-model="typekey" class="apply-type" :disabled="mtStatus !== 1 && mtStatus !== 2 ? false : true">
                        <option :value="list.key" v-for="(list, key) in typeList" :key="key">{{ list.name }}</option>
                    </select>
                    <span class="icons-down"></span>
                </div>
                <p class="apply-materials-title">
                    上传图片
                </p>
                <div class="feekbook-upload">
                    <p class="apply-materials-little-title" v-for="(text, i) of typeList[typekey].tipsText" :key="i">
                        {{ text }}
                    </p>
                    <div class="voucher-center">
                        <div class="voucher-case" @click="showVantImg(index)" v-for="(item, index) in imgArr" :key="index">
                            <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
                                <div
                                    class="img-voucher"
                                    v-bind:style="{
                                        backgroundImage: 'url(' + configs.api.public_domain + item.url + ')',
                                    }"
                                ></div>
                            </div>
                            <img
                                src="../../assets/images/user/icon_remove.png"
                                class="del-icon setDelBtn-el-hook"
                                v-show="imgArr[0] && mtStatus !== 1 && mtStatus !== 2"
                                @click.stop="del_img($event, index, 'imgArr')"
                            />
                        </div>
                        <div class="voucher-case" @click="showFiles()" v-show="mtStatus !== 1 && mtStatus !== 2">
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
            <button class="submit" @click="submitInfor" v-show="mtStatus !== 1 && mtStatus !== 2">
                确定
            </button>
            <!-- 联系客服 -->
            <customer-service></customer-service>
        </div>
        <!-- 上传资料 -->
        <upload-files v-show="isShowFiles" type="add-tmd" :len="3 - imgArr.length"></upload-files>
        <!-- 图片预览 -->
        <van-image-preview v-model="vant_ImgShow" :images="vant_ImgArr" :start-position="vant_ImgIndex"></van-image-preview>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import hub from '@/hub';
export default {
    data() {
        return {
            //补充资料类别
            mark: this.$route.query.mark,
            // 选中
            typekey: 1,
            typeList: {},
            // 资料图片
            imgArr: [],
            // 是否显示上传文件弹框
            isShowFiles: false,
            // 补充资料状态
            mtStatus: Number,
            // 是否显示vant 图片预览组件
            vant_ImgShow: false,
            // vant 图片预览组件的index
            vant_ImgIndex: 0,
            // vatn 图片预览组件的数组
            vant_ImgArr: [],
        };
    },
    created() {
        // 获取点商标资质类型
        if (sessionStorage.addTmd) {
            let temptInfo = JSON.parse(sessionStorage.addTmd);
            this.typekey = temptInfo.typekey;
            this.typeList = temptInfo.typeList;
            this.imgArr = temptInfo.imgArr;
        } else {
            this.getTypeText();
        }

        this.getMaterial();
        // 触发获取上传资料
        hub.$on('upfiles-img', ({ item, isType }) => {
            const that = this;
            if (isType && isType === 'us') {
                item.map(function(_item) {
                    that.imgArr.push(_item);
                });
                // 更新存儲
                that.temptStorage();
            } else {
                that.imgArr.push(item);
            }
        });
        // 触发获取上传资料弹框显隐
        hub.$on('upfiles-close', ({ ishow }) => {
            this.isShowFiles = ishow;
        });
    },
    beforeDestroy() {
        this.temptStorage();
    },
    methods: {
        // 存儲
        temptStorage: function() {
            let item = {
                typekey: this.typekey,
                typeList: this.typeList,
                imgArr: this.imgArr,
            };
            sessionStorage.addTmd = JSON.stringify(item);
        },
        // 获取资质类型
        getTypeText: function() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getTmdMaterialType', {}).then(function(response) {
                let _data = response.data;
                if (_data.errcode === 0) {
                    _data.content.map(function(_item) {
                        _item.tipsText = _item.tips.split('\\n');
                        that.typeList[parseInt(_item.key)] = _item;
                    });
                    that.$forceUpdate();
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 1500,
                    });
                }
            });
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
                        // 如果是商标
                        _data.content.list.map(function(_item) {
                            that.typekey = _item.type;
                            that.imgArr.push(_item);
                        });
                        that.mtStatus = parseInt(_data.content.material_status);
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        // 上传资料
        showFiles: function() {
            if (this.imgArr.length == 3) {
                Toast({
                    message: '上传图片不可超过3张',
                    duration: 3000,
                });
                return;
            }
            this.isShowFiles = true;
        },
        // 点击删除
        del_img(e, i, val) {
            var that = this;
            that[val].splice(i, 1);
        },
        // 预览图片
        showVantImg: function(index) {
            this.vant_ImgShow = true;
            this.vant_ImgIndex = index;
            this.vant_ImgArr = [];
            this.imgArr.map(item => {
                this.vant_ImgArr.push(this.configs.api.public_domain + item.url);
            });
        },
        // 提交
        submitInfor: function() {
            const that = this;
            let temptArr = [...that.imgArr];
            let temptItem = {
                itemid: that.$route.query.itemid,
                type: that.typekey,
                attachments: JSON.stringify(temptArr),
            };
            if (!that.imgArr || that.imgArr.length <= 0) {
                Toast({
                    message: '请上传' + that.typeList[that.typekey].name,
                    duration: 1500,
                });
                return false;
            }

            that.$axios.post('/index.php?c=App&a=setMaterial', temptItem).then(function(response) {
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
<style lang="scss" scoped></style>
