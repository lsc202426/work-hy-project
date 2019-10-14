<template>
    <div id="iInvoice" class="iInvoice">
        <nav-header title="申领合同"></nav-header>
        <!-- 内容 -->
        <div class="containerView-main">
            <div class="iInvoice-cont">
                <div class="invoice-tips">
                    <span>电子合同，我们将发送到您的邮箱。</span>
                </div>
                <div class="i-detail">
                    <div class="i-title">
                        <p>申领合同</p>
                    </div>
                    <div class="title-G">
                        <div class="title-left">
                            {{ orderNum }}
                        </div>
                        <div class="title-right"></div>
                    </div>
                </div>
            </div>
            <div class="iInvoice-cont accept">
                <div class="i-detail">
                    <div class="i-title contract-bot">
                        <p>接收信息</p>
                    </div>
                    <div class="title-G">
                        <div class="title-left">
                            电子邮箱
                        </div>
                        <div class="title-right title-right-i">
                            <input type="text" placeholder="请输入电子邮箱" v-model="email" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="invoice-btn">
                <span @click="postBtn()">确定</span>
            </div>
            <div class="service-btn">
                <a :href="'tel:' + configs.api.link_phone">
                    <img src="../../assets/images/order/phone-img.png" alt="" />
                    <span>联系客服</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';

export default {
    name: 'iInvoice',
    data() {
        return {
            email: '', //邮箱
            orderNum: this.$route.query.id,
        };
    },

    created() {
        this.init(); //初始化数据
    },
    methods: {
        init() {},
        postBtn() {
            var _this = this;
            let regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

            if (_this.email == '') {
                Toast({
                    message: '请输入电子邮箱',
                    duration: 3000,
                });
                return;
            }
            if (!regEmail.test(_this.email)) {
                Toast({
                    message: '请输入正确邮箱！',
                    duration: 3000,
                });
                return;
            }
            let tips = '请确认邮箱无误，电子合同将在系统开具后发送至您 的邮箱，请注意查收';
            let mbox = `<div class="public-bullet-box">
                            <h2 class="title">申领合同</h2>
                            <div class="public-bullet-box-main">
                                <div class="public-bullet-box-main-list">
                                    <label class="left-type">订单编号</label>
                                    <div class="right-text">${_this.orderNum}</div>
                                </div>
                                <div class="public-bullet-box-main-list">
                                    <label class="left-type">电子邮箱</label>
                                    <p class="right-text">${_this.email}</p>
                                </div>
                                <p class="public-bullet-box-main-tips">${tips}</p>
                            </div>
                        </div>`;
            MessageBox({
                title: '',
                message: mbox,
                showCancelButton: true,
                confirmButtonText: '确认提交',
                cancelButtonText: '取消',
                confirmButtonClass: 'comfirm',
                cancelButtonClass: 'cancel',
            }).then(active => {
                if (active === 'confirm') {
                    _this.$axios
                        .post('index.php?c=App&a=setContract', {
                            order_no: _this.orderNum,
                            email: _this.email,
                        })
                        .then(function(response) {
                            if (response.data.errcode == 0) {
                                Toast({
                                    message: response.data.errmsg,
                                    duration: 3000,
                                });
                                setTimeout(() => {
                                    _this.$router.push('/orderlist');
                                }, 3000);
                            } else {
                                Toast({
                                    message: response.data.errmsg,
                                    duration: 3000,
                                });
                            }
                        })
                        .catch(function(error) {});
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
// .service-btn{
//     position: fixed;
//     bottom: 0.52rem;
//     width: 100%;
// }
</style>
