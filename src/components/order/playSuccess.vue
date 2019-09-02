<template>
    <div class="public play-success">
        <nav-header title="支付订单" gobackurl="/orderList"></nav-header>
        <div class="public-main containerView-main">
            <div class="public-main-item">
                <div v-if="play_state || play_state == '0'">
                    <img v-if="play_state == '2'" class="public-main-img" src="@/assets/images/common/icon_fail.png" />
                    <img v-else class="public-main-img" src="@/assets/images/common/success.png" />
                </div>
                <p v-if="play_stateName" class="public-main-text">{{ play_stateName }}</p>
                <!-- <p v-else class="public-main-text">待支付</p> -->
                <div class="ps-tips">
                    <div v-for="(item, index) in getProduct.notice" :key="index">
                        <div class="tips-list" v-if="item.msg && item.name">
                            <span>{{ item.name }}</span>
                            <p>{{ item.msg }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="recom-product">
                <div class="recom-product-til" v-if="getProduct.product && getProduct.product.length > 0">
                    <img src="@/assets/images/common/product_left.png" alt="" />
                    <span>推荐产品</span>
                    <img src="@/assets/images/common/product_right.png" alt="" />
                </div>
                <div class="recommed">
                    <div v-for="(item, index) in getProduct.product" :key="index" @click="goProduct(item.mark)">
                        <div class="recommed-list" v-if="item.name">
                            <img :src="configs.api.public_domain + item.icon" alt="" class="recommed-left" />
                            <div class="recommed-right">
                                <span class="produ-til">{{ item.name }}</span>
                                <p>
                                    <span class="round">
                                        <i></i>
                                    </span>
                                    <span class="p-word">{{ item.desc }}</span>
                                </p>
                                <img src="@/assets/images/common/recommend.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-bot">
            <button class="public-main-btn" @click="seeOrder()">查看订单</button>
            <button class="public-main-btn back" @click="goback()">返回首页</button>
        </div>
    </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
    data() {
        return {
            out_order_no: this.$route.query.out_order_no,
            play_state: '', //支付状态
            play_stateName: '', //支付状态名
            getProduct: {},
        };
    },
    created() {
        localStorage.removeItem('playState');
        if (this.$route.query.token) {
            sessionStorage.token = this.$route.query.token;
            //let out_order_no = this.$route.query.out_order_no;
            this.$router.push({
                path: '/playSuccess',
                query: {
                    out_order_no: this.out_order_no,
                },
            });
        }
        setTimeout(() => {
            this.init();
        }, 50);
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.viewOrderList, false);
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.viewOrderList, false);
    },
    methods: {
        init() {
            let _this = this;
            Indicator.open({
                text: '正在查询支付结果',
                spinnerType: 'fading-circle',
            });
            setTimeout(() => {
                _this.$axios
                    .post('index.php?c=App&a=payOrderQuery', {
                        out_order_no: _this.out_order_no,
                    })
                    .then(response => {
                        // console.log(response);
                        if (response.data.errcode == 0) {
                            _this.play_state = response.data.content.paystatus;
                            _this.play_stateName = response.data.content.paystatus_name;
                        } else {
                            _this.play_stateName = '待支付';
                        }
                        setTimeout(() => {
                            _this.$axios
                                .post('index.php?c=App&a=getOrderNextDo', {
                                    out_order_no: _this.out_order_no,
                                })
                                .then(function(response) {
                                    Indicator.close();
                                    if (response.data.errcode == 0) {
                                        _this.getProduct = response.data.content;
                                    } else {
                                        Toast({
                                            message: response.data.errmsg,
                                            duration: 2000,
                                        });
                                    }
                                });
                        }, 50);
                    });
            }, 2000);
        },
        //浏览器返回跳转
        viewOrderList() {
            this.$router.push({
                path: '/orderList',
            });
            history.pushState(null, null, document.URL);
        },
        // 返回首页
        goback() {
            this.$router.push({
                path: '/',
            });
        },
        // 点击推荐产品
        goProduct(mark) {
            if (mark) {
                switch (mark) {
                    case 'tmd':
                        this.$router.push({
                            //跳转点商标
                            path: '/productlist',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                    case 'dzp':
                        this.$router.push({
                            //跳转点招聘
                            path: '/recruit',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                    case 'bs':
                        this.$router.push({
                            //跳转商标服务
                            path: '/tradeService',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                    case 'domain':
                        this.$router.push({
                            //跳转域名服务
                            path: '/domain',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                    case 'ecweb':
                        this.$router.push({
                            //跳转一站通
                            path: '/oneStation',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                    case 'dct':
                        this.$router.push({
                            //跳转一站通
                            path: '/restaurant',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                    default:
                        this.$router.push({
                            //跳转点商标
                            path: '/',
                            query: {
                                mark: mark,
                            },
                        });
                        break;
                }
            } else {
                return;
            }
        },
        // 获取推荐的产品
        getCommed() {
            let _this = this;
            _this.$axios
                .post('index.php?c=App&a=getOrderNextDo', {
                    out_order_no: _this.out_order_no,
                })
                .then(function(response) {
                    Indicator.close();
                    if (response.data.errcode == 0) {
                        _this.getProduct = response.data.content;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 2000,
                        });
                    }
                });
        },
        seeOrder() {
            this.$router.push({
                path: '/orderlist',
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.public-main {
    width: 100%;
}
.recom-product {
    padding: 1rem 0.74rem 0.2rem;

    .recom-product-til {
        img {
            vertical-align: middle;
            height: 0.34rem;
        }

        span {
            vertical-align: middle;
            padding: 0 0.24rem;
            font-size: 0.4rem;
            color: #2c3852;
        }
    }

    .recommed {
        padding-top: 0.46rem;

        .recommed-list {
            padding: 0.4rem 0.42rem;
            border: 1px solid #dddee1;
            display: flex;
            align-items: center;
            border-radius: 0.04rem;
            position: relative;
            margin-bottom: 0.26rem;

            .recommed-left {
                height: 1.18rem;
            }

            .recommed-right {
                text-align: left;
                padding-left: 0.22rem;

                .produ-til {
                    margin-bottom: 0.08rem;
                    display: inline-block;
                }

                p {
                    font-size: 0.2rem;
                    color: #6f7181;
                    display: flex;
                    align-items: baseline;

                    .round {
                        display: inline-block;
                        height: 8px;
                        width: 8px;
                        flex: none;
                        margin: 0 0.1rem 0 0;
                        position: relative;

                        i {
                            height: 4px;
                            width: 4px;
                            background: #686d7f;
                            border-radius: 50%;
                            display: inline-block;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }

                    .p-word {
                        // padding-left: 0.2rem;
                    }
                }

                img {
                    height: 0.74rem;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
        }
    }
}

.containerView-main {
    padding: 0 0 2rem !important;
}

.ps-tips {
    text-align: left;
    padding: 1.12rem 0.74rem 0;

    .tips-list {
        padding: 0.32rem 0;
        span {
            color: #2c3852;
            font-size: 0.34rem;
            font-weight: bold;
        }

        p {
            color: #666;
            font-size: 0.26rem;
            padding-top: 0.2rem;
            border-bottom: 1px solid #ededed;
            padding-bottom: 0.32rem;
        }
    }

    .tips-list:last-child {
        border-bottom: none;
    }
}

.public-main-btn {
    width: 2.9rem;
    margin-top: 0 !important;
}

.back {
    background: #fff;
    border: 1px solid #028dff;
    border-radius: 0.5rem;
    color: #0086ff;
    margin-left: 0.38rem;
}

.btn-bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.38rem 1.08rem;
    background: #fff;
}

.public-main-img {
    width: 1.58rem !important;
    height: 1.58rem !important;
    margin-top: 0.8rem;
}

.public-main {
    align-items: initial;
    display: inline-block;
}
</style>
