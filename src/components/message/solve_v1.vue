<template>
    <div class="solve">
        <mt-header title="解决问题单" class="header" fixed>
            <mt-button slot="left" icon="back" @click="$router.back(-1)"></mt-button>
            <mt-button class="upload" slot="right" @click="upload()">上传</mt-button>
        </mt-header>
        <div class="solve_box containerView-main">
            <div class="solve_title">{{ solveList.title }}</div>
            <div class="solve_list" v-for="list in solveList.list" :key="list.id">
                <div class="solve_list_title">{{ list.data_name }}</div>
                <div class="solve_list_content">
                    <div class="feekbook-upload">
                        <div class="voucher-center">
                            <div class="voucher-case" v-for="(item, index) in imgArr" :key="index">
                                <div class="img_minus setDelBtn-img-hook">
                                    <!-- <div
                                        class="img-voucher"
                                        v-bind:style="{
                                            backgroundImage: 'url(' + configs.api.public_domain + item + ')',
                                        }"
                                    ></div> -->
                                    <img class="img-item" id="test" :src="configs.api.public_domain + item" alt="" />
                                </div>
                                <!-- 删除的小图标 -->
                                <img
                                    src="../../assets/images/user/icon_remove.png"
                                    class="del-icon setDelBtn-el-hook"
                                    @click="del_img($event, index, 'imgArr')"
                                />
                            </div>
                            <!-- 默认图片 -->
                            <div
                                class="voucher-case"
                                @click="showFiles()"
                                v-if="(parseInt(list.data_attr) === 1 && imgArr.length <= 0) || parseInt(list.data_attr) === 2"
                            >
                                <div class="img_minus">
                                    <label for>
                                        <div class="img-voucher">
                                            <img class="icons-add" src="../../assets/images/user/upload-img.png" alt />
                                            <span>上传图片</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上传资料 -->
        <upload-files v-show="isShowFiles"></upload-files>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import hub from '@/hub';
export default {
    data() {
        return {
            // 消息id
            msid: localStorage.msgId ? localStorage.msgId : '',
            // 上传的文件
            imgArr: {},
            // 是否显示上传文件弹框
            isShowFiles: false,
            // 问题单内容列表
            solveList: {},
            id: '',
            filename: '',
        };
    },
    created() {
        this.init();
        // 每次触发前先解绑
        hub.$off('upfiles-img');
        // 触发获取上传资料
        hub.$on('upfiles-img', ({ item }) => {
            this.imgArr.push(item.fileurl);
        });
        // 每次触发前先解绑
        hub.$off('upfiles-close');
        // 触发获取上传资料弹框显隐
        hub.$on('upfiles-close', ({ ishow }) => {
            this.isShowFiles = ishow;
        });
    },
    methods: {
        //初始化
        init() {
            let that = this;
            this.$axios
                .post('index.php?c=App&a=getProblem', {
                    msid: that.msid,
                })
                .then(function(response) {
                    let _data = response.data.content;
                    that.solveList = _data;
                    _data.list.map(function(item) {
                        that.imgArr = item.data_attachments ? item.data_attachments.split(';') : [];
                        that.id = item.id;
                        that.filename = item.data_name;
                    });
                })
                .catch(function(error) {
                    Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                    });
                });
        },
        // 打开上传资料弹框
        showFiles: function() {
            this.isShowFiles = true;
        },
        // 点击删除
        del_img(e, i, val) {
            var that = this;
            that[val].splice(i, 1);
        },
        // 上传文件
        upload: function() {
            const that = this;
            if (this.imgArr.length <= 0) {
                Toast({
                    message: '请先选择上传文件',
                    duration: 2000,
                });
                return;
            }
            let upFileList = [];
            let temptUpItem = {
                id: that.id,
                filename: that.filename,
                attachments: that.imgArr,
            };
            upFileList.push(temptUpItem);
            // 上传文件结构
            that.$axios
                .post('index.php?c=App&a=setProblemAttachment', {
                    msid: that.msid,
                    data: JSON.stringify(upFileList),
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        Toast({
                            message: response.data.errmsg,
                            duration: 1500,
                        });
                        setTimeout(function() {
                            that.$router.push({
                                path: '/message',
                                name: 'message',
                            });
                        }, 1500);
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                })
                .catch(function(error) {
                    Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                    });
                });
        },
    },
};
</script>

<style scoped lang="scss">
.containerView-main {
    padding-top: 1.2rem !important;
}
.solve {
    height: 100%;
}
.upload {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.3rem;
    color: #333;
    z-index: 3;
    height: 0.9rem;
    line-height: 0.9rem;
    padding: 0 0.3rem;
}
.solve_box {
    padding: 0.3rem 0.32rem;
    font-size: 0.24rem;
    .solve_title {
        background: url(../../assets/images/message/icon_warning.png) 0.22rem center no-repeat;
        background-size: 0.24rem 0.24rem;
        color: #ea792c;
        background-color: #ffeadc;
        border-radius: 2px;
        line-height: 0.46rem;
        padding: 0.12rem 0.2rem 0.12rem 0.66rem;
    }
    .solve_list {
        margin-top: 0.16rem;
        .solve_list_title {
            &:before {
                content: '';
                display: inline-block;
                width: 0.06rem;
                height: 0.26rem;
                background-color: #0086ff;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.14rem;
            }
            color: #2c3852;
            font-size: 0.28rem;
            font-weight: 500;
            line-height: 0.4rem;
            margin: 0.4rem 0 0 0;
        }
        .solve_list_content {
            .feekbook-upload {
                background: #fff;
                width: 100%;
                .upload-til {
                    font-size: 0.28rem;
                    color: #2c3852;
                }
                .voucher-center {
                    width: 100%;
                    background: #fff;
                    left: 0;
                    padding-bottom: 0.32rem;
                    display: inline-block;
                    .voucher-case {
                        float: left;
                        display: inline-block;
                        width: 1.98rem;
                        background-size: auto 100%;
                        height: 2.6rem;
                        margin-right: 5%;
                        opacity: 1;
                        position: relative;
                        border-radius: 0.08rem;
                        margin-top: 5%;
                        border: 1px solid #ccc;
                        .img_minus {
                            overflow: hidden;
                            &.setDelBtn-img-hook {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 100%;
                                height: 100%;
                            }
                            .img-item {
                                display: block;
                                max-width: 1.98rem;
                                max-height: 2.6rem;
                            }
                            .img-voucher {
                                background-repeat: no-repeat;
                                background-position: center center;
                                background-size: cover;
                                width: 100%;
                                height: 100%;
                                max-width: 100%;
                                width: 3rem;
                                text-align: center;
                                .icons-add {
                                    text-align: center;
                                    height: 0.48rem;
                                    margin-top: 0.76rem;
                                    margin-bottom: 0.18rem;
                                }
                                span {
                                    font-size: 0.24rem;
                                    color: #999;
                                    display: block;
                                    text-align: center;
                                }
                            }
                            .upload-img {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                opacity: 0;
                            }
                        }
                        .del-icon {
                            position: absolute;
                            z-index: 2;
                            top: -0.16rem;
                            right: -0.16rem;
                            width: 0.47rem;
                            height: 0.47rem;
                        }
                        &:nth-child(3) {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
