<template>
    <div id="iInvoice" class="iInvoice">
        <nav-header title="合同详情"></nav-header>
        <!-- 内容 -->
        <div class="containerView-main">
            <div class="iInvoice-cont detail f_mg0">
                <div class="i-detail">
                    <a class="invoice-tips contDetail f_mg0 f_bdb" download="" id="downloads" @click="checkInv(getContact.status)">
                        <span>电子合同</span>
                        <div class="con-right">
                            <span v-if="getContact.status == '0'">审核中</span>
                            <span v-if="getContact.status == '1'">已申领</span>
                            <span v-if="getContact.status == '-1'">失败</span>
                            <img v-if="getContact.status == '1'" src="../../assets/images/order/icon_right.png" alt="" />
                        </div>
                    </a>
                    <div class="tips_box f_bdb">
                        <div class="i-cont email-cont">
                            <div class="title-D">
                                <div class="title-left">
                                    订单编号
                                </div>
                                <div class="title-right">
                                    {{ getContact.order_no }}
                                </div>
                            </div>
                        </div>
                        <div class="i-cont email-cont">
                            <div class="title-D">
                                <div class="title-left">
                                    申请时间
                                </div>
                                <div class="title-right">
                                    {{ getContact.created_time }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="iInvoice-cont detail">
                <div class="i-detail">
                    <div class="i-title">
                        <p>接收信息</p>
                    </div>
                    <div class="i-cont email-cont">
                        <div class="title-D">
                            <div class="title-left">
                                邮箱
                            </div>
                            <div class="title-right">
                                {{ getContact.receiver_email }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="service-btn">
                <a :href="'tel:' + configs.api.link_phone">
                    <img src="../../assets/images/order/phone-img.png" alt="" />
                    <span>联系客服</span>
                </a>
            </div> -->
            <div class="position_bottom_f">
                <customer-service></customer-service>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'iInvoice',
    data() {
        return {
            orderNum: this.$route.query.id,
            getContact: [],
        };
    },

    created() {
        this.init(); //初始化数据
    },
    methods: {
        init() {
            const _this = this;
            this.$axios
                .post('index.php?c=App&a=getContractInfo', {
                    order_no: _this.orderNum,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.getContact = response.data.content;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        // 查看发票
        checkInv(status) {
            const _this = this;
            if (status == '0' || status == '-1') {
                return;
            } else {
                const url = _this.configs.api.public_domain + _this.getContact.contract_attachment;
                // let downL = document.getElementById('downloads');
                // downL.href = url;
                this.$router.push({
                    path: '/viewpicture',
                });

                let _item = {
                    url: url,
                    title: '合同',
                };
                // 存储数据
                sessionStorage.viewpic = JSON.stringify(_item);
            }
        },
    },
};
</script>
<style lang="scss"></style>
