<template>
    <div id="material" class="material">
        <mt-header title="注册资料管理" class="header" fixed>
            <mt-button slot="left" icon="back" @click="$router.back(-1)"></mt-button>
            <mt-button icon="more" slot="right" @click="selectInfo()" v-if="isselect">{{ isCanSelect ? '取消' : '选择' }}</mt-button>
        </mt-header>
        <div class="containerView-main pb_not" v-if="getMsgArr.length != 0">
            <div class="tips">
                <div class="tips-box">
                    <img src="../../assets/images/user/point.png" alt="" />
                    <span>长按图片保存到相册</span>
                </div>
            </div>
            <div class="capiral-bottom">
                <div class="capiral-box">
                    <ul>
                        <li v-for="item in getMsgArr" @click="selectItem(item)" :key="item.id">
                            <i class="select-icons" v-if="isCanSelect" :class="{ active: item.isActive }"></i>
                            <img class="mater-img" :src="configs.api.public_domain + item.fileurl" alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="save-img" v-if="isCanSelect" @click="saveImg()">
            <span>确定</span>
        </div>
        <!-- 暂无数据 -->
        <blankPage v-if="getMsgArr.length == 0" style="padding-top: 0rem;"></blankPage>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import hub from '@/hub';
export default {
    name: 'material',

    data() {
        return {
            // 页码
            page: 1,
            // 获取图片信息
            getMsgArr: [],
            // 是否可選擇
            isselect: this.$route.query.isselect,
            // 最多选择张数
            len: this.$route.query.num,
            // 选择图片，保存的用途
            type: this.$route.query.type,
            // 选择取消
            isCanSelect: false,
            // 选择数据
            selectArr: [],
        };
    },
    created() {
        this.getMsg();
    },
    methods: {
        // 保存图片
        saveImg() {
            const that = this;
            let temptArr = [];
            if (this.selectArr.length > 0) {
                that.selectArr.map(function(item) {
                    let _item = {
                        fileurl: item.fileurl,
                    };
                    if (that.type === 'add-tmd') {
                        _item = {
                            id: 0,
                            name: item.filename,
                            url: item.fileurl,
                        };
                    }
                    temptArr.push(_item);
                });
            }
            // // 设置上传资料
            hub.$emit('upfiles-img', {
                item: temptArr,
                isType: 'us',
            });
            this.$router.go(-1);
        },
        // 切换选择
        selectInfo: function() {
            this.isCanSelect = !this.isCanSelect;
        },
        // 选择图片
        selectItem: function(item) {
            const that = this;
            // 如果条件不成立，则不能选择
            if (!that.isselect || !that.isCanSelect) {
                return false;
            }
            // 置反
            item.isActive = !item.isActive;
            // 如果数组长度小于所需长度
            if (item.isActive) {
                if (that.selectArr.length < parseInt(that.len) || that.len === 'null') {
                    that.selectArr.push(item);
                } else {
                    Toast({
                        message: '上传图片不可超过' + this.len + '张',
                        duration: 1500,
                    });
                    item.isActive = false;
                    return false;
                }
            } else {
                that.selectArr.map(function(list, index) {
                    if (list.id === item.id) {
                        that.selectArr.splice(index, 1);
                    }
                });
            }
        },
        // 获取图片
        getMsg() {
            const that = this;
            this.$axios
                .post('index.php?c=App&a=getAttachments', {
                    p: that.page,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        _data.content.list.map(function(item) {
                            item.isActive = false;
                            that.getMsgArr.push(item);
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss"></style>
