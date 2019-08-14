<template>
    <div class="refund-detail">
        <nav-header title="退款详情"></nav-header>
        <div class="refund-detail-main containerView-main">
            <div class="refund-detail-main-top">
                <h1>{{ refundInfor.status_name }}</h1>
                <p>{{ noticeTips }}</p>
            </div>
            <div class="refund-detail-main-main">
                <div class="rd-head">
                    退款信息
                </div>
                <div class="rd-main">
                    <div class="rd-main-list">
                        <div class="rd-main-list-item">
                            <label>订单编号：</label>
                            <p>{{ refundInfor.order_no }}</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>退款方式：</label>
                            <p>1142121212222</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>退款金额：</label>
                            <p>￥{{ refundInfor.refund_money }}元</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>备注说明：</label>
                            <p>{{ refundInfor.remarks }}</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>申请时间：</label>
                            <p>{{ refundInfor.created_time }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="service-btn">
                <img src="../../assets/images/order/phone-img.png" alt="" />
                <span>联系客服</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            noticeTips: '处理时间需要5-10个工作日',
            //订单号
            orderNum: '',
            // 获取的退款详情
            refundInfor: {
                order_no: 'HP190814162804000017281072',
                refund_money: '545455',
                refund_type_name: '退款到平台资金账户',
                status: '1',
                status_name: '退款中',
                remarks: '退款到私人账户',
                created_time: '2019-09-12 15:34:32',
            },
        };
    },
    created() {
        // 获取退款详情
        this.getRefundInfo();
    },
    methods: {
        getRefundInfo: function() {
            const that = this;
            this.$axios
                .post('index.php?c=App&a=getRefundInfo', {
                    order_no: that.orderNum,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.refundInfor = _data.content;
                    }
                });
        },
    },
};
</script>
