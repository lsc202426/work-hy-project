<template>
    <div id="iInvoice" class="iInvoice">
        <nav-header title="发票详情" fixed></nav-header>
        <!-- 内容 -->
        <div class="containerView-main">
            <div class="iInvoice-cont detail f_mg0">
                <!-- <div class="invoice-tips">
                    <span>{{ order_no }}</span>
                </div> -->
                <div class="i-detail">
                    <a class="i-title" href="javascript:void(0);" id="downloadLink" @click="checkInv(getDetail.status)">
                        <p>电子发票</p>
                        <div class="i-title-right">
                            <span v-if="getDetail.status == '0'">审核中</span>
                            <span v-if="getDetail.status == '1'">已申领</span>
                            <span v-if="getDetail.status == '-1'">失败</span>
                            <img v-if="getDetail.status == '1'" src="../../assets/images/order/icon_right.png" alt="" />
                        </div>
                    </a>
                    <div class="i-cont i-cont-n">
                        <!-- <div class="title-D">
                            <div class="title-left">
                                抬头类型
                            </div>
                            <div class="title-right" v-if="getDetail.invoice_payable_type == '1'">
                                个人
                            </div>
                            <div class="title-right" v-if="getDetail.invoice_payable_type == '2'">
                                企业
                            </div>
                        </div> -->
                        <div class="title-D">
                            <div class="title-left">
                                发票抬头
                            </div>
                            <div class="title-right">
                                {{ getDetail.invoice_payable }}
                            </div>
                        </div>
                        <div class="title-D" v-if="getDetail.invoice_payable_type == '2'">
                            <div class="title-left">
                                税号
                            </div>
                            <div class="title-right">
                                {{ getDetail.taxpayer_no }}
                            </div>
                        </div>
                        <div class="i-cont-pd" v-if="showCont && getDetail.invoice_payable_type == '2'">
                            <div class="title-D">
                                <div class="title-left">
                                    电话
                                </div>
                                <div class="title-right">
                                    {{ getDetail.tax_phone }}
                                </div>
                            </div>
                            <div class="title-D">
                                <div class="title-left">
                                    备注
                                </div>
                                <div class="title-right">
                                    {{ getDetail.remarks }}
                                </div>
                            </div>
                            <div class="title-D">
                                <div class="title-left">
                                    地址
                                </div>
                                <div class="title-right">
                                    {{ getDetail.tax_address }}
                                </div>
                            </div>
                            <div class="title-D">
                                <div class="title-left">
                                    开户行及账号
                                </div>
                                <div class="title-right">
                                    {{ getDetail.tax_bankinfo }}
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="title-D">
                                <div class="title-left">
                                    发票内容
                                </div>
                                <div class="title-right">
                                    {{ getDetail.invoice_content }}
                                </div>
                            </div>
                            <div class="title-D">
                                <div class="title-left">
                                    发票金额
                                </div>
                                <div class="title-right f_c_blue">￥{{ getDetail.invoice_money }}</div>
                            </div>
                            <div class="title-D">
                                <div class="title-left">
                                    申请时间
                                </div>
                                <div class="title-right">
                                    {{ getDetail.created_time }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="open-close" @click="open()" v-if="getDetail.invoice_payable_type == '2'">
                        <span>{{ openOrc }}</span>
                        <img class="open-img" :class="{ 'close-img': showCont }" src="../../assets/images/order/icon_right.png" alt="" />
                    </div> -->
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
                                {{ getDetail.receiver_email }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            order_no: this.$route.query.id,
            showCont: true,
            openOrc: '展开',
            getDetail: [],
        };
    },

    created() {
        this.init(); //初始化数据
    },
    methods: {
        init() {
            var _this = this;

            // 获取其他数据
            this.$axios
                .post('index.php?c=App&a=getInvoiceInfo', {
                    order_no: _this.order_no,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.getDetail = response.data.content;
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
            var _this = this;
            if (status == '0' || status == '-1') {
                return;
            } else {
                const url = _this.getDetail.invoice_attachment;
                // 如果是pdf，直接下载，苹果浏览器预览
                if (url.toLowerCase().indexOf('.pdf') > 0) {
                    let aTag = document.getElementById('downloadLink');
                    aTag.href = url;
                    aTag.target = '_blank';
                    aTag.download = 'contract';
                    return false;
                }
                _this.$router.push({
                    path: '/viewpicture',
                });
                let _item = {
                    url: url,
                    title: '发票',
                };
                // 存储数据
                sessionStorage.viewpic = JSON.stringify(_item);
            }
        },
        open() {
            if (this.showCont == false) {
                this.showCont = true;
                this.openOrc = '收起';
            } else if (this.showCont == true) {
                this.showCont = false;
                this.openOrc = '展开';
            }
        },
    },
};
</script>
<style lang="scss"></style>
