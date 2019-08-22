<template>
    <div class="order-deatil" id="orderDetail">
        <!-- head -->
        <!-- <nav-header title="订单详情" gobackurl="/orderlist"></nav-header> -->

        <div class="detail-top">
            <div class="detail-top-bg"></div>
            <mt-header title="订单详情">
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="detail-top-text">
                <p class="detail-top-text-b">{{ detailsInfo.status_name }}</p>
                <p>{{ detailsInfo.notice_msg }}</p>
            </div>
        </div>
        <div class="containerView-main">
            <!-- 主体信息 -->
            <div class="detail-customer-info">
                <div class="detail-customer-info-title"><span></span>申请人信息</div>
                <div class="detail-subject" :class="{ active: showD }">
                    <div class="info-list info-pdb" @click="showDetial()">
                        <label class="info-list-subject">
                            {{ detailsInfo.corp_name ? detailsInfo.corp_name : '暂无' }}
                        </label>
                    </div>
                    <div @click="checkD(detailsInfo.corpid)" v-if="showD">
                        <div class="detail-customer-info-phone info-list">
                            <label>联系人：</label>
                            <label>{{ detailsInfo.corp_linkman ? detailsInfo.corp_linkman : '暂无' }}</label>
                        </div>
                        <div class="detail-customer-info-phone info-list">
                            <label>联系电话：</label>
                            <label>
                                {{ detailsInfo.corp_phone ? detailsInfo.corp_phone : '暂无' }}
                            </label>
                        </div>
                        <div class="detail-customer-info-phone info-list">
                            <label>联系邮箱：</label>
                            <label>
                                {{ detailsInfo.corp_email ? detailsInfo.corp_email : '暂无' }}
                            </label>
                            <!-- <label class="info-list-status">未验证</label> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- 订单内容 -->
            <div class="detail-main">
                <div class="detail-til">
                    <div class="detail-main-title">
                        <span class="order-id">订单编号:{{ detailsInfo.order_no }}</span>
                        <span class="status">{{ detailsInfo.status_name }}</span>
                    </div>
                </div>
                <div class="detail-main-list" v-for="item of detailsInfo.items" :key="item.id">
                    <div class="detail-main-list-name">
                        <span class="typename">{{ item.name }}</span>
                    </div>
                    <div v-for="itemList in item.item" :key="itemList.id" class="itemList">
                        <p class="detail-main-list-regfre money">
                            <span class="shopname">{{ itemList.keyword }}</span>
                            <span class="shopname shop-status"
                                ><span class="classes" v-if="itemList.classes != 0">第{{ itemList.classes }}类</span
                                >{{ itemList.status_name }}</span
                            >
                        </p>

                        <p class="detail-main-list-regfre money">
                            <label
                                >注册费 ({{ itemList.price }}元
                                <span v-if="itemList.product_name != '商标'">x {{ itemList.year }}年</span> )</label
                            >
                            <span>￥{{ parseFloat(itemList.price * itemList.year).toFixed(2) }}元</span>
                        </p>

                        <p class="detail-main-list-Review money" v-if="itemList.fee_other && parseInt(itemList.fee_other) > 0">
                            <label>添加类别</label>
                            <span>￥{{ parseFloat(itemList.fee_other).toFixed(2) }}元</span>
                        </p>
                        <p class="detail-main-list-Review money" v-if="itemList.fee_verify && parseInt(itemList.fee_verify) > 0">
                            <label>审核费</label>
                            <span>￥{{ parseFloat(itemList.fee_verify).toFixed(2) }}元</span>
                        </p>
                        <div class="f_tar f_top">
                            <div v-show="itemList.status === '-1'">
                                <button
                                    class="list-bottom-btn list-bottom-gray"
                                    v-if="(itemList.is_refund == '0' || itemList.is_refund == '-1') && itemList.is_change == '0'"
                                    @click="refund(detailsInfo.order_no)"
                                >
                                    退款
                                </button>
                                <button
                                    class="list-bottom-btn list-bottom-gray"
                                    v-if="itemList.is_refund && (itemList.is_refund == '1' || itemList.is_refund == '2')"
                                    @click="refundDetail(detailsInfo.order_no)"
                                >
                                    退款详情
                                </button>
                                <button
                                    class="list-bottom-btn list-bottom-gray"
                                    v-if="
                                        itemList.is_change &&
                                            itemList.is_change == '0' &&
                                            (itemList.is_refund == '0' || itemList.is_refund == '-1')
                                    "
                                    @click="changeName(itemList.id, itemList.product_mark)"
                                >
                                    换品牌名称
                                </button>
                            </div>
                            <div v-show="itemList.status === '2'">
                                <button
                                    class="list-bottom-btn list-bottom-gray"
                                    v-if="parseInt(itemList.is_dns) == 1"
                                    @click="viewDns(itemList.keyword)"
                                >
                                    解析
                                </button>
                                <button
                                    class="list-bottom-btn list-bottom-gray"
                                    v-if="parseInt(itemList.is_renew) == 1"
                                    @click="renewalfee()"
                                >
                                    续费
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="update" v-if="item.need_material == 1">
            <p>补充资料</p>
          </div> -->
                </div>
                <div class="detail-main-list all-price">
                    <p class="detail-main-list-Review money">
                        <label>实付款</label>
                        <span class="total-money">￥{{ detailsInfo.total }}元</span>
                    </p>
                </div>
            </div>
            <!-- 订单联系信息 -->
            <div class="detail-customer-info">
                <div class="detail-customer-info-title"><span></span>订单信息</div>
                <div class="detail-customer-info-name info-list">
                    <label>创建时间：</label>
                    <label>
                        {{ detailsInfo.created_time ? detailsInfo.created_time : '暂无' }}
                    </label>
                </div>
                <div class="detail-customer-info-phone info-list" v-if="detailsInfo.status != '1'">
                    <label>付款时间：</label>
                    <label>
                        {{ detailsInfo.payment_time ? detailsInfo.payment_time : '暂无' }}
                    </label>
                </div>
            </div>
        </div>
        <div class="list-bottom">
            <div class="f_tar list-bottom-box">
                <span v-if="detailsInfo.showMore" class="btn_more" @click.stop="isShowList()"></span>
                <button
                    class="list-bottom-btn list-bottom-gray"
                    v-if="detailsInfo.is_contract == '0' && detailsInfo.status != '-1'"
                    @click="applyCont(detailsInfo.order_no)"
                >
                    申领合同
                </button>
                <button
                    class="list-bottom-btn list-bottom-gray"
                    v-if="detailsInfo.is_invoice == '0' && detailsInfo.status != '-1'"
                    @click="applyInvoice(detailsInfo.order_no, detailsInfo.total)"
                >
                    申领发票
                </button>

                <button
                    class="list-bottom-btn list-bottom-gray"
                    v-if="detailsInfo.is_contract == '1' && detailsInfo.status != '-1'"
                    @click="checkCont(detailsInfo.order_no)"
                >
                    查看合同
                </button>
                <button
                    class="list-bottom-btn list-bottom-gray"
                    v-if="detailsInfo.is_invoice == '1' && detailsInfo.status != '-1'"
                    @click="checkInvoice(detailsInfo.order_no)"
                >
                    查看发票
                </button>
                <!-- <button
                    class="list-bottom-btn list-bottom-gray"
                    v-if="detailsInfo.is_refund == 1 && detailsInfo.status != '-1'"
                    @click="refund(detailsInfo.order_no)"
                >
                    申请退款
                </button>
                <button
                    class="list-bottom-btn list-bottom-gray"
                    v-if="detailsInfo.is_refund == 2"
                    @click="refundDetail(detailsInfo.order_no)"
                >
                    退款详情
                </button> -->
                <button class="list-bottom-btn list-bottom-gray" v-if="detailsInfo.status === '1'" @click="cancel(detailsInfo.order_no)">
                    取消订单
                </button>
                <button
                    class="list-bottom-btn"
                    v-if="detailsInfo.status === '1' && detailsInfo.need_material === 0"
                    @click="paly(detailsInfo.order_no, detailsInfo.total, detailsInfo.created_time)"
                >
                    去付款
                </button>
                <button
                    @click="addInfor(detailsInfo)"
                    class="list-bottom-btn"
                    v-if="parseInt(detailsInfo.status) !== 1 && parseInt(detailsInfo.need_material) === 1"
                >
                    补充资料
                </button>
            </div>
            <div class="box_item">
                <div class="box_list"></div>
                <i></i>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { Toast, Indicator } from 'mint-ui';
export default {
    data() {
        return {
            // 订单详情
            detailsInfo: {},
            showD: false,
            regroup: [],
            hasActive: false,
        };
    },
    methods: {
        //显示更多按钮
        isShowList() {
            $('#orderDetail .box_item').removeClass('active');
            if (this.hasActive == true) {
                $('#orderDetail .box_item').removeClass('active');
                this.hasActive = false;
                return;
            } else {
                $('#orderDetail .box_item').addClass('active');
            }
            this.hasActive = true;
            // this.hasActive=i;
        },
        //申请合同
        applyCont(ids) {
            this.$router.push({
                path: '/contract',
                query: {
                    id: ids,
                },
            });
        },
        // 查看合同详情
        checkCont(ids) {
            this.$router.push({
                path: '/contDetail',
                query: {
                    id: ids,
                },
            });
        },
        // 申请发票
        applyInvoice(ids, total) {
            this.$router.push({
                path: '/issueInvoice',
                query: {
                    id: ids,
                    money: total,
                },
            });
        },
        // 查看发票
        checkInvoice(ids) {
            this.$router.push({
                path: '/invDetail',
                query: {
                    id: ids,
                },
            });
        },
        // 申请退款
        refund(ids) {
            this.$router.push({
                path: '/refund',
                query: {
                    id: ids,
                },
            });
        },
        //退款详情
        refundDetail(ids) {
            this.$router.push({
                path: '/refunddetail',
                query: {
                    id: ids,
                },
            });
        },
        // 解析
        viewDns: function(domain) {
            this.$router.push({
                path: '/AnalysisList',
            });
            let item = {
                domain: domain,
                id: this.detailsInfo.order_no,
            };
            sessionStorage.analysisInfo = JSON.stringify(item);
        },
        // 续费
        renewalfee: function() {},
        // 换品牌名
        changeName: function(id, mark) {
            let path;
            if (mark === 'tmd') {
                path = '/productlist';
            } else if (mark === 'dzp') {
                path = '/recruit';
            } else if (mark === 'dct') {
                path = '/restaurant';
            }
            // 跳转
            if (path) {
                this.$router.push({
                    path: path,
                    query: {
                        mark: mark,
                    },
                });
            }
            // 保存换词id
            sessionStorage.setItem('changeId', id);
        },
        // 补充资料
        addInfor: function(item) {
            this.$router.push({
                path: '/addinfor',
                query: { id: item.order_no },
            });
        },

        //
        showDetial() {
            if (this.showD == false) {
                this.showD = true;
            } else {
                this.showD = false;
            }
        },
        checkD(id) {
            var _this = this;
            _this.$router.push({
                path: '/addSubject',
                query: {
                    id: id,
                    status: 'orderDetail',
                },
            });
        },
        //返回
        goback() {
            this.$router.push({
                path: '/orderList',
            });
        },
        // 获取订单列表
        getOrderDetails: function(jid) {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getOrderInfo', {
                    order_no: jid,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        that.detailsInfo = response.data.content;
                        that.$nextTick(() => {
                            // for(let i=0;i<that.detailsInfo.length;i++){

                            that.$set(that.detailsInfo, 'showMore', false);
                            let len = $('#orderDetail .list-bottom').find('button').length;
                            if (len > 3) {
                                that.detailsInfo.showMore = true;
                                $('#orderDetail .list-bottom-box')
                                    .find('button')
                                    .eq(len - 3)
                                    .prevAll('button')
                                    .addClass('box_item_list');
                                for (let j = 3; j < len; j++) {
                                    let txt = $('#orderDetail .list-bottom-box')
                                        .find('button')
                                        .eq(j - 3);
                                    $('#orderDetail .box_item .box_list').append(txt);
                                }
                            }
                            // }
                        });
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 2000,
                        });
                    }
                })
                .catch(function(error) {
                    Toast({
                        message: error.data.errmsg,
                        duration: 2000,
                    });
                });
        },
        // 立即支付
        paly: function(id, total, time) {
            let balance = 0;
            this.$axios.post('index.php?c=App&a=getMyBalance').then(res => {
                if (res.data.errcode == 0) {
                    balance = res.data.content.balance;
                    Indicator.open({
                        text: '正在生成支付订单...',
                        spinnerType: 'fading-circle',
                    });
                    setTimeout(() => {
                        Indicator.close();
                        let token = sessionStorage.token;
                        // this.$router.push({
                        //   path: '/playorder',
                        //   query: {
                        //     id: id,
                        //     price: total,
                        //     token: token,
                        //     created_time: time,
                        //     balance: balance,
                        //   },
                        // });
                        window.location.href =
                            'http://h.huyi.cn/playorder?id=' +
                            id +
                            '&price=' +
                            total +
                            '&token=' +
                            token +
                            '&created_time=' +
                            time +
                            '&balance=' +
                            balance;
                    }, 2000);
                } else {
                    Toast({
                        message: res.data.errmsg,
                        duration: 1500,
                    });
                }
            });
        },
    },
    created() {
        if (this.$route.query.token) {
            sessionStorage.token = this.$route.query.token;
            let order_id = this.$route.query.id;
            this.$router.push({
                path: '/orderdetails',
                query: {
                    id: order_id,
                },
            });
        }
        // 订单id
        let jid = this.$route.query.id;
        this.getOrderDetails(jid);
    },
};
</script>
<style lang="scss" scoped>
//
.box_item {
}
.order-deatil .detail-customer-info .info-list {
    display: block;
}
.detail-subject {
    background: url(../../assets/images/shoppingCart/icon_scroll_b.png) top right no-repeat;
    background-size: 0.18rem 0.1rem;
    background-position-y: 0.19rem;
    &.active {
        background: url(../../assets/images/shoppingCart/icon_scroll_t.png) top right no-repeat;
        background-size: 0.18rem 0.1rem;
        background-position-y: 0.19rem;
    }
}
.info-list-status {
    color: #fff;
    background: #c5c5c5;
    border-radius: 0.04rem;
    padding: 0.06rem;
    font-size: 0.2rem;
    margin-left: 0.18rem;
}
.info-pdb {
    padding-bottom: 0.1rem;
}
.info-list-name {
    background: #ff9866;
}
.info-list-subject {
    font-weight: bold;
    font-size: 0.3rem;
    color: #2c3852;
}
.order-deatil .detail-main-list {
    // padding: 0.36rem 0 0.26rem;
}
.order-deatil .detail-main-list-name .typename {
    width: auto;
    padding: 0.03rem 0.06rem;
}

.order-deatil .detail-main-list-name {
    align-items: center;
}
.detail-til {
    padding: 0.3rem 0 0rem;
}
.detail-til .detail-customer-info-title {
    height: 0.38rem;
    line-height: 0.38rem;
    border-bottom: none;
}
.detail-til .detail-main-title {
    //   height: 0.33rem;
    line-height: inherit;
    height: auto;
    padding-top: 0.12rem;
    // padding: 0.3rem 0;
}
.order-deatil .detail-main-list-name .typename {
    color: #028bff;
    border: 1px solid #2971d0;
    padding: 0.01rem 0.09rem;
}
.update {
    text-align: right;
    padding-top: 0.2rem;
    p {
        // background: linear-gradient(131deg, rgba(15, 179, 254, 1) 0%, rgba(0, 134, 255, 1) 100%);
        color: #8f8f8f;
        font-size: 0.24rem;
        border-radius: 0.5rem;
        padding: 0.08rem 0rem;
        display: inline-block;
        width: 1.5rem;
        text-align: center;
        margin-left: 0.3rem;
        border: 1px solid #8f8f8f;
    }
}
</style>
