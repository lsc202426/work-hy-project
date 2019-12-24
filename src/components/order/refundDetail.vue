<template>
    <div class="refund-detail">
        <nav-header title="退款详情" fixed></nav-header>
        <div class="refund-detail-main containerView-main">
            <div class="refund-detail-main-top">
                <h1>{{ refundInfor.status_name }}</h1>
                <p>{{ refundInfor.tips }}</p>
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
                            <p>{{ refundInfor.refund_type_name }}</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>退款金额：</label>
                            <p>￥{{ refundInfor.refund_money }}元</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>备注说明：</label>
                            <p>{{ refundInfor.remarks ? refundInfor.remarks : '无' }}</p>
                        </div>
                        <div class="rd-main-list-item">
                            <label>申请时间：</label>
                            <p>{{ refundInfor.created_time }}</p>
                        </div>
                    </div>
                </div>
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
export default {
    data() {
        return {
            // noticeTips: '',
            //订单号
            id: this.$route.query.id,
            orderNum: this.$route.query.order,
            // 获取的退款详情
            refundInfor: {
                order_no: '',
                refund_money: '',
                refund_type_name: '',
                status: '',
                status_name: '',
                remarks: '',
                created_time: '',
                tips: '',
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
                    id: that.id,
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
