<template>
    <div id="editmsg" class="editmsg">
        <nav-header title="编辑资料"></nav-header>

        <div class="edit-msg">
            <div class="edit-list edit-head-port">
                <span>头像</span>
                <div class="user-avatar">
                    <div class="user-avatar">
                        <div class="user-minus">
                            <!-- <img class="head-port" src="../../assets/images/user/head-portairt.png" alt="" v-show="!images"> -->
                            <div class="head-port" :style="{ backgroundImage: 'url(' + imageIntal + ')' }" v-show="images == ''"></div>
                            <div
                                class="head-port"
                                :style="{
                                    backgroundImage: 'url(' + configs.api.public_domain + images + ')',
                                }"
                                v-show="images != ''"
                            ></div>
                            <!-- <img class="head-port" :src="images" alt="" v-show="images"> -->
                        </div>
                    </div>
                    <input type="file" class="change_img" @change="changeImage($event)" />
                    <!-- <input type="file" class="change_img" @change="changeImg()"> -->
                </div>
            </div>
            <div class="edit-list" @click="editName()">
                <span>昵称</span>
                <p>{{ msgArr.nickname }}</p>
            </div>
            <div class="edit-list username">
                <span>用户名</span>
                <p>{{ msgArr.username }}</p>
            </div>
        </div>
        <div class="shade" v-if="shadeShow">
            <div class="shade-box">
                <p class="shade-til">请输入昵称</p>
                <div class="shade-input">
                    <input type="text" placeholder="请输入昵称" v-model="nickn" />
                </div>
                <div class="shade-btn">
                    <span class="shade-cancle" @click="cancle()">取消</span>
                    <span class="shade-true" @click="affirm()">确认</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'editmsg',
    data() {
        return {
            imageIntal: require('@/assets/images/user/head-portairt.png'),
            images: '',
            msgArr: [],
            shadeShow: false,
            nickn: '',
        };
    },
    created() {
        // this.getMsg();
        this.getRouter();
    },
    methods: {
        goback() {
            this.$router.push('/user');
        },
        // 编辑昵称
        editName() {
            var _this = this;
            _this.shadeShow = true;
            if (_this.msgArr.nickname) {
                _this.nickn = _this.msgArr.nickname;
            }
        },
        // 取消
        cancle() {
            this.shadeShow = false;
        },
        // 确认
        affirm() {
            var _this = this;
            this.shadeShow = false;
            _this.$axios
                .post('index.php?c=App&a=setBaseInfo', {
                    field: 'nickname',
                    value: _this.nickn,
                    sign: _this.$md5('nickname' + _this.nickn),
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        Toast({
                            message: '编辑成功',
                            duration: 3000,
                        });
                        setTimeout(function() {
                            _this.$router.push({
                                path: '/user',
                            });
                        }, 3000);
                        _this.msgArr.nickname = _this.nickn;
                    }
                })
                .catch(function(error) {});
        },
        // 更换头像
        changeImage(e) {
            var _this = this;
            var files = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                var imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                _this.upload(files.name, imgcode);
            };
        },
        upload(n, imgcode) {
            var _this = this;
            _this.$axios
                .post('index.php?c=App&a=setPortrait', {
                    filename: n,
                    portrait: imgcode,
                })
                .then(function(response) {
                    _this.images = response.data.content.url;
                    Toast({
                        message: '更换成功',
                        duration: 3000,
                    });
                })
                .catch(function(error) {});
        },
        getRouter() {
            this.msgArr = this.$route.query;
            this.images = this.msgArr.headPort;
        },
        // getMsg() {
        //   // let _this = this;
        //   this.$axios
        //     .post("", {})
        //     .then(function(response) {
        //     })
        //     .catch(function(error) {
        //     });
        // }
    },
};
</script>

<style lang="scss"></style>
