<template>
    <div id="iInvoice" class="iInvoice">
        <nav-header title="申领合同" gobackurl="contractList" fixed></nav-header>
        <!-- 内容 -->
        <div class="containerView-main">
            <div class="iInvoice-content">
                <div class="iInvoice-cont">
                    <div class="invoice-tips invoice-tips-mbn">
                        <span>电子合同，我们将发送到您的邮箱。</span>
                    </div>
                    <div class="i-detail">
                        <div class="i-title contract-bot">
                            <p>申领合同</p>
                        </div>
                        <div class="title-G" v-for="(item, index) in orderNum" :key="index">
                            <div class="title-left">
                                {{ item }}
                            </div>
                            <div class="title-right"></div>
                        </div>
                    </div>
                    <!-- <div class="i-detail">
                    <div class="i-title">
                        <p>申领合同</p>
                    </div>
                    <div class="title-G">
                        <div class="title-left">
                            {{ orderNum }}
                        </div>
                        <div class="title-right"></div>
                    </div>
                </div> -->
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
            </div>
            <div class="invoice-btn">
                <span @click="postBtn()">提交</span>
            </div>
            <!-- 联系客服 -->
            <customer-service></customer-service>
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
            orderNum: [], //订单号
        };
    },
    created() {
        this.init(); //初始化数据
    },
    destroyed() {
        sessionStorage.removeItem('order_nos');
    },
    methods: {
        init() {
            if (sessionStorage.order_nos) {
                this.orderNum = JSON.parse(sessionStorage.order_nos);
            } else {
                Toast({
                    message: '未选择相应订单',
                    duration: 3000,
                });
                setTimeout(() => {
                    this.$router.replace({
                        path: '/contractList',
                    });
                }, 3000);
            }
        },
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
            this.stopScroll(true);
            let tips = '请确认邮箱无误，电子合同将在系统开具后发送至您的邮箱，请注意查收';
            let mbox = `<div class="public-bullet-box">
                            <h2 class="title">申领合同</h2>
                            <div class="public-bullet-box-main">
                                <div class="public-bullet-box-main-list max-height">
                                    <label class="left-type">订单编号</label>
                                    <div class="right-text">${_this.orderNum.join('\n')}</div>
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
                this.canScroll(true);
                if (active === 'confirm') {
                    let order_nos = _this.orderNum.join(',');
                    _this.$axios
                        .post('index.php?c=App&a=setContract', {
                            order_nos: order_nos,
                            email: _this.email,
                        })
                        .then(function(response) {
                            if (response.data.errcode == 0) {
                                let successCon = {
                                    goUrl: '/contractAndInvoice',
                                    title: '提交成功',
                                    text: '您的合同预计在24小时内开出，请注意查收',
                                    leftBtn: {
                                        text: '申领合同',
                                        url: '/contractList',
                                    },
                                    rightBtn: {
                                        text: '历史合同',
                                        url: '/contractList',
                                        past: 'past',
                                    },
                                };
                                sessionStorage.successCon = JSON.stringify(successCon);
                                _this.$router.replace('/subSuccess');
                            } else {
                                Toast({
                                    message: response.data.errmsg,
                                    duration: 3000,
                                });
                            }
                        });
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#app .containerView-main {
    padding-bottom: 0;
}
.iInvoice-content {
    min-height: calc(100% - 3.86rem);
}
</style>
