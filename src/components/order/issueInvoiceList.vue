<template>
    <div class="contractList bg_gray">
        <nav-header :title="title"></nav-header>
        <div class="containerView-main">
            <div class="list_content">
                <div class="list_content_box">
                    <div class="list_content_item f_bgf">
                        <!-- <div class="item_left">
                            <i :class="['checkbox_i',{active:isChecked}]" @click="setChecked()"></i>
                        </div> -->
                        <div class="item_right">
                            <div class="item_right_order" @click.stop="seeOrder()">
                                <div class="item_num">HP23948942342394234234</div>
                                <div v-if="!$route.query.past" class="item_see">查看订单</div>
                                <div v-else class="item_see">已开具</div>
                            </div>
                            <div class="item_right_con">
                                <div class="item_right_con_main">
                                    <span class="con_main_name">广东互易网络知识产权有限公司</span>
                                    <span class="con_main_money">￥12125.00</span>
                                </div>
                                <div class="item_right_con_time">2019/03/08 12：01</div>
                            </div>
                            <div v-if="!$route.query.past" class="item_right_oper" @click.stop="operInvoice()">
                                <span>去开票</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'contractList',
    data() {
        return {
            title: this.$route.query.past ? '历史发票' : '开具发票',
            isChecked: false,
            out_order_no: 'HP23948942342394234234',
        };
    },
    created() {},
    methods: {
        seeOrder() {
            if (this.$route.query.past) {
                this.$router.push({
                    path: '/invDetail',
                });
            }
        },
        operInvoice() {
            this.$router.push({
                path: '/issueInvoice',
                query: {
                    out_order_no: this.out_order_no,
                },
            });
        },
    },
};
</script>
