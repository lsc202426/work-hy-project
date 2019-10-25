<template>
    <div class="upload-files" @click="closeBox" @touchmove.prevent>
        <div class="upload-files-main" @click.stop>
            <h2 class="upload-files-main-title">上传图片</h2>
            <div class="upload-files-main-list">
                <div class="item">
                    <span class="item-lf">拍照</span>
                    <input class="upfile-img" type="file" accept="image/*" mutiple="mutiple" capture="camera" @change="upfiles($event)" />
                </div>
                <div class="item">
                    <span class="item-lf">相册</span>
                    <input class="upfile-img" type="file" accept="image/*" @change="upfiles($event)" />
                </div>
                <div class="item" @click="selectData">
                    <span class="item-lf">注册资料选择</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import hub from '@/hub';
import EXIF from 'exif-js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {};
    },
    props: ['mark', 'type'],
    methods: {
        // 上传图片
        upfiles(e) {
            const that = this;
            let files = e.target.files[0];
            // 获取图片旋转角度
            EXIF.getData(files, function() {
                that.rotate = EXIF.getTag(this, 'Orientation');
            });
            let reader = new FileReader();
            reader.readAsDataURL(files);
            // 判断是否为商标，是的话添加商标图片判断
            if (that.mark && that.mark === 'bs') {
                if (files.name.split('.')[1] != 'jpg' && files.name.split('.')[1] != 'jpeg') {
                    Toast({
                        message: '请上传jpg格式图片',
                        duration: 3000,
                    });
                    return;
                } else if (parseInt(files.size) > 500000) {
                    Toast({
                        message: '请上传小于500k的图片',
                        duration: 3000,
                    });
                    return;
                }
            }
            reader.onload = function() {
                let attachment = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                let temptItem;
                if (that.mark && that.mark === 'bs') {
                    temptItem = {
                        filename: files.name,
                        file_base64: attachment,
                        limit: 'jpg,jpeg',
                        size: '500000*385*230',
                    };
                } else {
                    temptItem = {
                        filename: files.name,
                        file_base64: attachment,
                    };
                }
                that.$axios.post('index.php?c=App&a=uploadAttachment', temptItem).then(function(response) {
                    if (response.data.errcode == 0) {
                        let _item = {
                            fileurl: response.data.content.url,
                        };
                        if (that.type === 'add-tmd') {
                            _item = {
                                id: 0,
                                name: files.name,
                                url: response.data.content.url,
                            };
                        }
                        // 设置上传资料
                        hub.$emit('upfiles-img', {
                            item: _item,
                        });
                        // 关闭上传资料弹框
                        hub.$emit('upfiles-close', {
                            ishow: false,
                        });
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
            };
        },
        // 选择注册人资料
        selectData: function() {
            this.$router.push({
                path: '/material',
            });
        },
        // 关闭弹框
        closeBox: function() {
            // 关闭上传资料弹框
            hub.$emit('upfiles-close', {
                ishow: false,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.upload-files {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 4;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    justify-content: center;
    &-main {
        width: calc(100% - 0.64rem);
        height: fit-content;
        padding-bottom: 0.64rem;
        border-radius: 0.18rem;
        background-color: #ffffff;
        &-title {
            margin: 0.32rem 0;
            font-size: 0.32rem;
            color: #2c3852;
            text-align: center;
        }
        &-list {
            padding: 0 0.64rem;
            .item {
                position: relative;
                height: 1rem;
                line-height: 1rem;
                border-bottom: 0.02rem solid #f1f1f1;
                .upfile-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
    }
}
</style>
