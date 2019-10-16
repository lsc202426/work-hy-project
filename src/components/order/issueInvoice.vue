<template>
    <div id="iInvoice" class="iInvoice">
        <nav-header title="开具发票"></nav-header>
        <!-- 内容 -->
        <div class="containerView-main">
            <div class="iInvoice-cont">
                <!-- <div class="invoice-tips">
                    <span>请保证开票信息正确</span>
                </div> -->
                <div class="i-detail">
                    <div class="i-title">
                        <p>发票详情</p>
                    </div>
                    <div class="title-G">
                        <div class="title-left"><i>*</i>抬头类型</div>
                        <div class="title-right" v-if="type == 1">
                            个人
                        </div>
                        <div class="title-right" v-if="type == 2">
                            企业
                        </div>
                    </div>
                    <div class="title-G">
                        <div class="title-left"><i>*</i>发票抬头</div>
                        <div class="title-right">
                            {{ payable }}
                        </div>
                    </div>
                    <div class="title-G" v-if="type == 2">
                        <div class="title-left"><i>*</i>纳税人识别号</div>
                        <div class="title-right title-right-i">
                            <input type="text" placeholder="请输入纳税人识别号" v-model="taxpayer_no" />
                        </div>
                    </div>
                    <div class="title-G" v-if="type == 2">
                        <div class="title-left">
                            地址
                        </div>
                        <div class="title-right title-right-i">
                            <input type="text" placeholder="请输入地址（非必填）" v-model="tax_address" />
                        </div>
                    </div>
                    <div class="title-G" v-if="type == 2">
                        <div class="title-left">
                            电话
                        </div>
                        <div class="title-right title-right-i">
                            <input type="text" placeholder="请输入电话（非必填）" v-model="tax_phone" />
                        </div>
                    </div>
                    <div class="title-G" v-if="type == 2">
                        <div class="title-left">
                            开户行及账号
                        </div>
                        <div class="title-right title-right-i">
                            <input type="text" placeholder="请输入开户行及账号（非必填）" v-model="tax_bankinfo" />
                        </div>
                    </div>
                    <div class="title-G" v-if="type == 2">
                        <div class="title-left">
                            备注说明
                        </div>
                        <div class="title-right title-right-i">
                            <input type="text" placeholder="请输入备注说明（非必填）" v-model="remarks" />
                        </div>
                    </div>
                    <div class="title-G">
                        <div class="title-left">
                            开票金额
                        </div>
                        <div class="title-right word-blue">¥{{ invoice_money }}</div>
                    </div>
                    <div class="title-G">
                        <div class="title-left">
                            开票内容
                        </div>
                        <div class="title-right">
                            信息技术服务/注册服务费
                        </div>
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
import { Toast, MessageBox } from 'mint-ui';

export default {
    name: 'iInvoice',
    data() {
        return {
            order_no: this.$route.query.id,
            type: '2', // 抬头类型
            payable: '', //抬头
            taxpayer_no: '', //识别号
            tax_address: '', //地址
            tax_phone: '', //电话
            tax_bankinfo: '', //开户行及账号
            remarks: '', //备注
            invoice_money: this.$route.query.money, //金额
            invoice_content: '信息技术服务/注册服务费', //内容
            email: '', //邮箱
            getIndex: [],
        };
    },

    created() {
        this.init(); //初始化数据
    },
    methods: {
        init() {
            var _this = this;
            // 获取抬头数据
            this.$axios
                .post('index.php?c=App&a=getInvoiceIndex', {
                    order_no: _this.order_no,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.getIndex = response.data.content.invoice;

                        _this.type = _this.getIndex.invoice_payable_type;
                        _this.payable = _this.getIndex.invoice_payable;
                        _this.email = response.data.content.email;

                        _this.taxpayer_no = _this.getIndex.taxpayer_no ? _this.getIndex.taxpayer_no : _this.taxpayer_no;

                        _this.tax_address = _this.getIndex.tax_address ? _this.getIndex.tax_address : _this.tax_address;

                        _this.tax_phone = _this.getIndex.tax_phone ? _this.getIndex.tax_phone : _this.tax_phone;

                        _this.tax_bankinfo = _this.getIndex.tax_bankinfo ? _this.getIndex.tax_bankinfo : _this.tax_bankinfo;

                        _this.remarks = _this.getIndex.remarks ? _this.getIndex.remarks : _this.remarks;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        postBtn() {
            const _this = this;
            let regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

            if (this.type == 2 && this.taxpayer_no == '') {
                Toast({
                    message: '请输入纳税人识别号',
                    duration: 3000,
                });
                return;
            }
            if (this.email == '') {
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

            let invoice_type = '电子发票';
            let mbox = `<div class="public-bullet-box">
                            <h2 class="title">开具发票</h2>
                            <div class="public-bullet-box-main">
                                <div class="public-bullet-box-main-list">
                                    <label class="left-type">发票类型</label>
                                    <div class="right-text">${invoice_type}</div>
                                </div>
                                <div class="public-bullet-box-main-list">
                                    <label class="left-type">发票抬头</label>
                                    <p class="right-text">${_this.payable}</p>
                                </div>
                                <div class="public-bullet-box-main-list">
                                    <label class="left-type">税号</label>
                                    <p class="right-text">${_this.taxpayer_no}</p>
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
                        .post('index.php?c=App&a=setInvoice', {
                            order_no: _this.order_no,
                            email: _this.email,
                            invoice_payable_type: _this.type,
                            invoice_payable: _this.payable,
                            taxpayer_no: _this.taxpayer_no,
                            tax_address: _this.tax_address,
                            tax_phone: _this.tax_phone,
                            tax_bankinfo: _this.tax_bankinfo,
                            invoice_content: _this.invoice_content,
                            invoice_money: _this.invoice_money,
                            remarks: _this.remarks,
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
                        });
                }
            });
        },
    },
};
</script>
<style lang="scss"></style>
