<template>
    <div class="confirmOrder fill_information head_box">
        <!-- <nav-header title=" " gobackurl="applicantWeb"></nav-header> -->
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="confirm_box containerView-main">
            <div class="confirm_item">
                <div class="title">申请信息</div>
                <div class="box">
                    <div class="box_list f_bdr">
                        <p>服务名称</p>
                        <div>{{ domain }}</div>
                    </div>
                    <div class="box_list f_pdl">
                        <p>年限</p>
                        <div>{{ year }}</div>
                    </div>
                </div>
            </div>
            <div class="confirm_item">
                <div class="title">申请人信息</div>
                <div class="box">
                    <div class="box_list">
                        <p>类型</p>
                        <div>{{ subject.corptype_name }}</div>
                    </div>
                </div>
                <div class="box">
                    <div class="box_list">
                        <p>申请人名称</p>
                        <div>{{ subject.corpname ? subject.corpname : subject.name }}</div>
                    </div>
                </div>
                <div class="box">
                    <div class="box_list">
                        <p>申请人所在地</p>
                        <div>{{ subject.province }}{{ subject.city }}{{ subject.area }}</div>
                    </div>
                </div>
                <div class="box">
                    <div class="box_list">
                        <p>企业地址</p>
                        <div>{{ subject.address }}</div>
                    </div>
                </div>
                <div class="box">
                    <div class="box_list">
                        <p>企业经办人</p>
                        <div>{{ subject.linkman }}</div>
                    </div>
                </div>
                <div class="box">
                    <div class="box_list f_bdr">
                        <p>联系电话</p>
                        <div>{{ subject.phone }}</div>
                    </div>
                    <div class="box_list f_pdl">
                        <p>电子邮箱</p>
                        <div>{{ subject.email }}</div>
                    </div>
                </div>
            </div>
            <div class="all_prive_order">
                <div class="all_prive_box">
                    <span class="cost_txt">{{ domain }}费</span>
                    <span>{{ price }}*{{ year }}={{ all_price }}元</span>
                </div>
            </div>
            <div class="apply-rule">
                <i :class="{ read: isAgree == 'true' }" @click="switchAgree"></i>
                <p>我已阅读<a href="javascript:void(0);" @click="viewPrivacy('申请人须知', '4')">《申请人须知》</a>条款</p>
            </div>
            <div class="brand-bottom-btn">
                <div class="brand-consultant">
                    <div class="brand-consultant-top">
                        <label>品牌顾问工号</label>
                        <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
                    </div>
                    <div class="brand-consultant-text">
                        <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                        <p>或推荐以下品牌顾问给你选择：</p>
                        <div class="sale_code_member">
                            <span v-for="(item, index) of getSaleMember.list" :key="index" @click="selectMembr(index)">
                                {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="adviser">
            <div class="adviser_box">
                <span>品牌顾问工号</span>
                <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
            </div>
            <div class="adviser_exp">
                品牌顾问工号就是服务您的专属顾问的工号，如果没有，请 联系客服专线：400-628-1118
            </div>
            <div class="brand-consultant-text">
                <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                <p>或推荐以下品牌顾问给你选择：</p>
                <div class="sale_code_member">
                    <span v-for="(item, index) of getSaleMember.list" :key="index" @click="selectMembr(index)">
                        {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                    </span>
                </div>
            </div>
        </div> -->
        <!-- 品牌顾问工号 -->
        <!-- <div class="brand-consultant">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
            </div>
            <div class="brand-consultant-text">
                <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                <p>或推荐以下品牌顾问给你选择：</p>
                <div class="sale_code_member">
                    <span v-for="(item, index) of getSaleMember.list" :key="index" @click="selectMembr(index)">
                        {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                    </span>
                </div>
            </div>
        </div> -->
        <!-- <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ all_price }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard addCard_n" @click="goPayment()">去付款</div>
            </div>
            <div class="bottom_r">
                <div class="addCard_n addShop" @click="addShop()">加入申请列表</div>
            </div>
        </div> -->
        <div class="fill_bottom news-fill_bottom">
            <div class="fill_bottom_btn">
                <div class="addCard-btn">
                    <button class="btn-add" @click="addShop()">加入申请列表</button>
                    <button class="btn-apply" @click="goPayment()">去付款</button>
                </div>
            </div>
        </div>
        <!-- 推荐品牌顾问 -->
        <sale-code :corpid="subject.corpid || subject.id"></sale-code>
    </div>
</template>

<script>
import * as GetterTypes from '@/constants/GetterTypes';
import { mapGetters } from 'vuex';
import { Toast, Indicator } from 'mint-ui';
import * as utils from '@/utils/index';
import hub from '@/hub';
export default {
    name: 'confirmWeb',
    data() {
        return {
            domain: sessionStorage.domain, //申请词
            year: sessionStorage.year, //年限
            subject: JSON.parse(sessionStorage.subject), //主体信息
            price: sessionStorage.price.split('.')[0], //单价
            all_price: sessionStorage.all_price, //总价
            isAgree: sessionStorage.isAgree ? sessionStorage.isAgree : 'false', //
            msg: {}, //加入申请列表对象
            sales_code: sessionStorage.sales_code ? sessionStorage.sales_code : '', //销售顾问工号
            personnel_number: '', //接口返回的工号
            product: [], //加入申请列表返回
            token: sessionStorage.token,
            id: '', //
        };
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SALE_MEMBER]]),
        ...mapGetters({
            getSaleMember: [GetterTypes.GET_SALE_MEMBER],
        }),
    },
    created() {
        if (!sessionStorage.domain || !sessionStorage.all_price) {
            this.$router.push({
                path: '/oneStation',
                query: {
                    mark: 'ecweb',
                },
            });
        }
        // 获取品牌顾问工号
        const that = this;
        that.$nextTick(async function() {
            if (that.subject.corpid || that.subject.id) {
                // if (that.getSaleMember.list.length <= 0) {
                //     utils.getSalesCode(that.subject.corpid || that.subject.id);
                // }
                utils.getSalesCode(that.subject.corpid || that.subject.id, 'ecweb');
            }
        });
        // 触发获取品牌顾问
        hub.$on('send-salecode', ({ salecode }) => {
            this.sales_code = salecode;
        });
    },
    mounted() {
        let _this = this;
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', _this.goback, false);
        }
    },
    destroyed() {
        let _this = this;
        window.removeEventListener('popstate', _this.goback, false);
        // 如果弹框未关闭，点击浏览器返回，关闭
        utils.closeSaleBox();
    },
    methods: {
        // 选择推荐品牌顾问
        selectMembr: function(index) {
            utils.showSaleBox(index);
        },
        goback() {
            sessionStorage.sales_code = this.sales_code;
            // console.log(sessionStorage.salesCode)
            this.$router.push({
                path: '/applicantWeb',
            });
        },
        //是否阅读申请人须知
        switchAgree() {
            if (this.isAgree == 'true') {
                this.isAgree = 'false';
                sessionStorage.isAgree = this.isAgree;
            } else {
                this.isAgree = 'true';
                sessionStorage.isAgree = this.isAgree;
            }
        },
        //前往申请人须知页面
        viewPrivacy(type, num) {
            sessionStorage.salesCode = this.sales_code;

            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: 'ecweb',
                    txt_type: num,
                },
            });
        },
        //检查销售顾问
        salesCode() {
            this.$axios
                .post('index.php?c=App&a=checkSalesCode', {
                    sales_code: this.sales_code,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.personnel_number = res.data.content.personnel_number;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 1500,
                        });
                        return;
                    }
                });
        },
        //加入申请列表
        addShop() {
            if (this.isAgree == 'false') {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (this.sales_code == '' || !this.sales_code) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(this.sales_code)) {
                return false;
            } else {
                // Indicator.open({
                //     text: '正在检测品牌顾问',
                //     spinnerType: 'fading-circle',
                // });
                // setTimeout(() => {
                this.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: this.sales_code,
                    })
                    .then(res => {
                        if (res.data.errcode == 0) {
                            this.personnel_number = res.data.content.personnel_number; //工号
                            this.msg.productid = sessionStorage.productid; //产品id
                            this.msg.product_name = sessionStorage.domain; //产品名称
                            this.msg.year = sessionStorage.year; //year:年限
                            this.msg.feetype = sessionStorage.isRenew ? 'X' : 'Z'; //服务类型，目前全部为 Z :注册
                            this.msg.price = sessionStorage.price; //单价
                            this.msg.total = sessionStorage.all_price; //总价
                            this.msg.subject = {}; //主体信息
                            this.msg.subject.id = this.subject.id ? this.subject.id : this.subject.corpid; //主体id
                            this.msg.subject.corptype_name = this.subject.corptype_name; //类型
                            this.msg.subject.name = this.subject.corpname ? this.subject.corpname : this.subject.name; //名字
                            this.msg.subject.linkman = this.subject.linkman; //联系人
                            this.msg.subject.phone = this.subject.phone; //联系电话
                            this.msg.subject.email = this.subject.email; //邮箱
                            this.msg.subject.address = this.subject.address; //地址
                            this.msg.subject.province = this.subject.province; //省
                            this.msg.subject.city = this.subject.city; //市
                            this.msg.subject.area = this.subject.area; //区
                            let message = JSON.stringify(this.msg);
                            let id = sessionStorage.EditId ? sessionStorage.EditId : 0;
                            Indicator.open({
                                text: '正在提交...',
                                spinnerType: 'fading-circle',
                            });
                            setTimeout(() => {
                                this.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: message,
                                        sales_code: this.personnel_number,
                                        id: id,
                                    })
                                    .then(res => {
                                        Indicator.close();
                                        if (res.data.errcode == 0) {
                                            this.product = res.data.content.product;
                                            this.id = res.data.content.id;
                                            sessionStorage.product = JSON.stringify(this.product);
                                            //清除数据
                                            this.removeSession();
                                            Toast({
                                                message: res.data.errmsg,
                                                duration: 1000,
                                            });
                                            //请求成功跳转清单列表页
                                            setTimeout(() => {
                                                this.$router.push({
                                                    path: '/addSuccess',
                                                });
                                            }, 1000);
                                        } else {
                                            Toast({
                                                message: res.data.errmsg,
                                                duration: 1500,
                                            });
                                        }
                                    });
                            }, 2000);
                        } else {
                            Indicator.close();
                            Toast({
                                message: res.data.errmsg,
                                duration: 1500,
                            });
                            return;
                        }
                    });
                // }, 1500);
            }
        },
        removeSession() {
            sessionStorage.removeItem('formUrl');
            sessionStorage.removeItem('domain');
            sessionStorage.removeItem('fee_verify');
            sessionStorage.removeItem('subject');
            sessionStorage.removeItem('price');
            //sessionStorage.removeItem('productid');
            sessionStorage.removeItem('product_type');
            sessionStorage.removeItem('all_price');
            sessionStorage.removeItem('isAgree');
            sessionStorage.removeItem('sales_code');
            sessionStorage.removeItem('renewalInfor');
            sessionStorage.removeItem('year');
            sessionStorage.removeItem('isRenew');
        },
        //去结算
        goPayment() {
            if (this.isAgree == 'false') {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (this.sales_code == '' || !this.sales_code) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(this.sales_code)) {
                return false;
            } else {
                // Indicator.open({
                //     text: '正在检测品牌顾问',
                //     spinnerType: 'fading-circle',
                // });
                // setTimeout(() => {
                this.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: this.sales_code,
                    })
                    .then(res => {
                        if (res.data.errcode == 0) {
                            this.personnel_number = res.data.content.personnel_number;
                            this.msg.productid = sessionStorage.productid; //产品id
                            this.msg.product_name = sessionStorage.domain; //产品名称
                            this.msg.year = sessionStorage.year; //year:年限
                            this.msg.feetype = sessionStorage.isRenew ? 'X' : 'Z'; //服务类型，目前全部为 Z :注册
                            this.msg.price = sessionStorage.price; //单价
                            this.msg.total = sessionStorage.all_price; //总价
                            this.msg.subject = {}; //主体信息
                            this.msg.subject.id = this.subject.id ? this.subject.id : this.subject.corpid; //主体id
                            this.msg.subject.corptype_name = this.subject.corptype_name; //类型
                            this.msg.subject.name = this.subject.corpname ? this.subject.corpname : this.subject.name; //名字
                            this.msg.subject.linkman = this.subject.linkman; //联系人
                            this.msg.subject.phone = this.subject.phone; //联系电话
                            this.msg.subject.email = this.subject.email; //邮箱
                            this.msg.subject.address = this.subject.address; //地址
                            this.msg.subject.province = this.subject.province; //省
                            this.msg.subject.city = this.subject.city; //市
                            this.msg.subject.area = this.subject.area; //区
                            let message = JSON.stringify(this.msg);
                            let id = sessionStorage.EditId ? sessionStorage.EditId : 0;
                            Indicator.open({
                                text: '正在生成支付订单',
                                spinnerType: 'fading-circle',
                            });
                            setTimeout(() => {
                                this.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: message,
                                        sales_code: this.personnel_number,
                                        id: id,
                                    })
                                    .then(res => {
                                        // Indicator.close();
                                        if (res.data.errcode == 0) {
                                            this.product = res.data.content.product;
                                            this.id = res.data.content.id;
                                            sessionStorage.product = JSON.stringify(this.product);
                                            let _this = this;

                                            //清除数据
                                            // _this.removeSession();
                                            // 去结算
                                            sessionStorage.ids = res.data.content.id;
                                            // _this.$router.replace({
                                            //     path: '/account',
                                            // });

                                            //_this.showToast=true;//显示遮罩层
                                            _this.$axios
                                                .post('index.php?c=App&a=setOrder', {
                                                    ids: _this.id,
                                                })
                                                .then(function(response) {
                                                    Indicator.close();
                                                    if (response.data.errcode == 0) {
                                                        let orderId = response.data.content.order_no; //返回的订单id
                                                        // let counter = response.data.content.counter; //返回的订单个数
                                                        let created_time = response.data.content.created_time; //下单时间
                                                        let balance = response.data.content.balance; //平台资金账户余额
                                                        if (orderId) {
                                                            // window.location.href =
                                                            //     'http://h.huyi.cn/playorder?id=' +
                                                            //     orderId +
                                                            //     '&price=' +
                                                            //     _this.all_price +
                                                            //     '&token=' +
                                                            //     _this.token;
                                                            let changeId = sessionStorage.changeId;
                                                            if (changeId) {
                                                                window.location.href =
                                                                    _this.configs.api.public_english_url +
                                                                    '/playorder?id=' +
                                                                    orderId +
                                                                    '&price=' +
                                                                    _this.msg.total +
                                                                    '&token=' +
                                                                    _this.token +
                                                                    '&created_time=' +
                                                                    created_time +
                                                                    '&balance=' +
                                                                    balance +
                                                                    '&change_id=' +
                                                                    changeId;
                                                                // 跳转清空
                                                                sessionStorage.removeItem('changeId');
                                                            } else {
                                                                window.location.href =
                                                                    _this.configs.api.public_english_url +
                                                                    '/playorder?id=' +
                                                                    orderId +
                                                                    '&price=' +
                                                                    _this.msg.total +
                                                                    '&token=' +
                                                                    _this.token +
                                                                    '&created_time=' +
                                                                    created_time +
                                                                    '&balance=' +
                                                                    balance;
                                                            }
                                                        }
                                                        //清除数据
                                                        _this.removeSession();
                                                    } else {
                                                        Toast({
                                                            message: response.data.errmsg,
                                                            duration: 2000,
                                                        });
                                                    }
                                                });
                                        } else {
                                            Indicator.close();
                                            Toast({
                                                message: res.data.errmsg,
                                                duration: 1500,
                                            });
                                        }
                                    });
                            }, 2000);
                        } else {
                            Indicator.close();
                            Toast({
                                message: res.data.errmsg,
                                duration: 1500,
                            });
                            return;
                        }
                    });
                // }, 1000);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.confirmOrder {
    padding-bottom: 1.34rem;
}

.confirm_box {
    font-family: PingFangHK-Light;
    padding: 0 0.3rem;
    overflow-y: scroll;
    .confirm_item {
        padding: 0.24rem 0 0.3rem 0;
        border-bottom: 1px solid #f1f1f1;

        .title {
            color: #2c3852;
            font-size: 0.36rem;
            font-weight: 600;
            line-height: 0.5rem;
            padding-bottom: 0.18rem;
        }

        .box {
            margin-top: 0.22rem;
            display: flex;

            .box_list {
                flex: 1;

                p {
                    color: #666666;
                    font-size: 0.24rem;
                    line-height: 0.34rem;
                }

                div {
                    color: #2c3852;
                    font-size: 0.3rem;
                    font-weight: 400;
                    line-height: 0.42rem;
                    margin-top: 0.02rem;
                    word-break: break-all;
                }
            }

            .f_bdr {
                border-right: 1px solid #f1f1f1;
            }

            .f_pdl {
                padding-left: 0.36rem;
            }
        }
    }

    .all_prive_order {
        margin-top: 0.6rem;

        .all_prive_box {
            display: flex;
            justify-content: space-between;
            padding: 0.3rem 0.32rem;
            border-radius: 0.18rem;
            background: #f7f7f7;
            width: 100%;

            .cost_txt {
                &::before {
                    content: '';
                    display: inline-block;
                    background: #686d7f;
                    width: 0.08rem;
                    height: 0.08rem;
                    border-radius: 0.04rem;
                    margin-right: 0.14rem;
                    vertical-align: middle;
                }
            }

            span {
                color: #686d7f;
                font-size: 0.26rem;
                line-height: 0.36rem;
            }
        }
    }
}

.adviser {
    position: fixed;
    bottom: 1.42rem;
    background: #ffffff;
    box-shadow: 0px -0.08rem 0.1rem 0px rgba(242, 242, 242, 0.5);
    width: 100%;
    padding: 0 0.32rem 0.24rem 0.32rem;

    .adviser_box {
        display: flex;
        height: 0.9rem;
        align-items: center;

        span {
            color: #2c3852;
            font-size: 0.26rem;
            line-height: 0.36rem;
            font-weight: 400;
        }

        input {
            border: none;
            padding: 0.2rem;
            flex: 1;
            padding: 0.1rem 0.1rem 0.1rem 0.24rem;
        }
    }

    .adviser_exp {
        border-radius: 0.04rem;
        color: #6d7183;
        font-size: 0.24rem;
        line-height: 0.3rem;
        width: 100%;
        padding: 0.12rem 0.24rem;
        background: #f7f7f7;
    }
}
</style>
