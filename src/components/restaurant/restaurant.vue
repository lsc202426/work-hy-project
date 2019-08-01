<template>
    <div class="restaurant">
        <div class="head_box">
            <nav-header title="点餐厅" gobackurl="/" :goself="isShow"></nav-header>
            <div class="top">
                <div class="search">
                    <input type="text" v-model="search_txt" placeholder="请输入品牌名" />
                    <span class="icon_search" @click.stop="search()">搜索</span>
                </div>
                <div class="src_item">
                    <a href="javascript:void(0)" @click="goAnchor('注册规则', '1')">注册规则</a>
                    <a href="javascript:void(0)" @click="goAnchor('注册指南', '2')">注册指南</a>
                    <a href="javascript:void(0)" @click="goAnchor('关于点餐厅', '3')">关于点餐厅</a>
                    <a href="javascript:void(0)" @click="goAnchor('关于点餐厅', 4)">案例</a>
                </div>
            </div>
        </div>
        <div class="restaurant_box containerView-main">
            <div class="content">
                <div class="con_item" v-for="item in list" :key="item.id" v-if="isShow">
                    <div class="item_top">
                        <div class="title">品牌名.餐厅<!-- {{item.title}} --></div>
                        <div class="con_txt">
                            <p>{{ item.summary }}</p>
                        </div>
                    </div>
                    <div class="item_bottom">
                        <span>注册费用</span>
                        <span v-if="item.price">¥{{ item.price.split('.')[0] }}元/1年</span>
                    </div>
                </div>
                <div class="con_item" v-if="!isShow" @click.stop="goFill(product.domain, product.price, product.reg)">
                    <div class="item_top">
                        <div class="title">
                            {{ product.domain }}.餐厅
                            <span class="pro_refister" v-if="product.reg == 1">可注册</span>
                            <span class="pro_refister not" v-else>已注册</span>
                        </div>
                        <div class="con_txt">
                            <p>依据其商标权利证明来注册</p>
                            <p>简短，易记，易搜索</p>
                        </div>
                    </div>
                    <div class="item_bottom">
                        <span>注册费用</span>
                        <span v-if="product.price">¥{{ product.price.split('.')[0] }}元/1年</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import * as utils from '@/utils/index';
export default {
    name: 'restaurant',
    data() {
        return {
            mark: '',
            list: [],
            search_txt: '',
            isShow: true,
            product: {},
        };
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_DCT_APPLY_INFO]]),
        ...mapGetters({
            getDctApplyInfo: [GetterTypes.GET_DCT_APPLY_INFO],
        }),
    },
    created() {
        // sessionStorage.removeItem("fee_verify");
        // sessionStorage.removeItem("domain");
        // sessionStorage.removeItem("price");
        sessionStorage.removeItem('year');
        sessionStorage.removeItem('all_price');
		sessionStorage.removeItem('sales_code');
        this.init(); //初始化
    },
    mounted() {
        //判断浏览器是否支持popstate
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
        }
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_DCT_APPLY_INFO]]),
        ...mapMutations({
            [MutationTypes.SET_DCT_APPLY_INFO]: MutationTypes.SET_DCT_APPLY_INFO,
        }),
        goAnchor(type, num) {
            if (num === 4) {
                this.$router.push({
                    path: '/dzpcase',
                    query: {
                        mark: this.mark ? this.mark : 'dct',
                    },
                });
                return false;
            }
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: this.$route.query.mark ? this.$route.query.mark : 'dct',
                    txt_type: num,
                },
            });
        },
        //获取产品信息
        init() {
            if (sessionStorage.domain) {
                this.search_txt = sessionStorage.domain;
                if (sessionStorage.product_s) {
                    this.isShow = false;
                    this.product = JSON.parse(sessionStorage.product_s);
                } else {
                    this.search();
                }
                //this.search();
            } else {
                this.mark = this.$route.query.mark ? this.$route.query.mark : 'dct';
                this.$axios
                    .post('index.php?c=App&a=getProducts', {
                        mark: this.mark,
                    })
                    .then(response => {
                        if (response.data.errcode == 0) {
                            this.list = response.data.content.list[0].list;
							sessionStorage.fee_verify = this.list[0].fee_verify;
							sessionStorage.productid = this.list[0].id;
							sessionStorage.product_type = this.list[0].product_type;
							let item = {
							    fee_verify: this.list[0].fee_verify,
							    productid: this.list[0].id,
							    product_type: this.list[0].product_type,
							};
							this[MutationTypes.SET_DCT_APPLY_INFO](item);
                        } else {
                            Toast({
                                message: response.data.errmsg,
                                duration: 1500,
                            });
                        }
                    });
            }
        },
        //搜索
        search() {
            if (this.search_txt == '' || !this.search_txt) {
                Toast({
                    message: '请输入品牌名',
                    duration: 3000,
                });
                return;
            }
            if (!utils.checkFormat(this.search_txt)) {
                return;
            }
            this.$axios
                .post('index.php?c=App&a=searchDomain', {
                    mark: 'dct',
                    domain: this.search_txt,
                    st: 0,
                })
                .then(response => {
                    if (response.data.errcode == 0) {
                        this.isShow = false; //显示查询结果
                        this.product = response.data.content;
                        sessionStorage.product_s = JSON.stringify(this.product);
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        //前往填写注册信息
        goFill(domain, price, reg) {
            if (reg == 0) {
                Toast({
                    message: '改申请词已被注册',
                    duration: 2000,
                });
                return;
            }
            sessionStorage.removeItem('isAgree');
            sessionStorage.removeItem('salesCode');
            sessionStorage.domain = domain;
            sessionStorage.price = price;
            let _item = {
                domain: domain,
                price: price,
            };
            this[MutationTypes.SET_DCT_APPLY_INFO](_item);
            this.$router.push({
                path: '/restaurantFill',
            });
        },
        goBack() {
            if (!this.isShow) {
                this.isShow = true; //隐藏查询列表
                this.search_txt = ''; //清空查询内容
                sessionStorage.removeItem('formUrl');
                sessionStorage.removeItem('domain');
                sessionStorage.removeItem('fee_verify');
                sessionStorage.removeItem('subject');
                sessionStorage.removeItem('price');
                sessionStorage.removeItem('productid');
                sessionStorage.removeItem('product_type');
                sessionStorage.removeItem('all_price');
                sessionStorage.removeItem('product');
                sessionStorage.removeItem('year');
                sessionStorage.removeItem('product_s');
                this.$router.push({
                    path: '/restaurant',
                });
            }
        },
    },
    destroyed() {
        //页面销毁时，取消监听
        window.removeEventListener('popstate', this.goBack, false);
    },
};
</script>

<style lang="scss" scoped>
.restaurant {
    height: 100%;
    display: flex;
}
.head_box {
    flex: none;
    position: fixed;
    top: 0;
    left: 0;
}
.top {
    position: fixed;
    top: 0.9rem;
    left: 0;
    padding: 0 0.32rem;
    width: 100%;
    background: #fff;
    z-index: 2;
    .src_item {
        display: flex;
        margin-top: 0.45rem;
        margin-bottom: 0.3rem;
        a {
            color: #2c3852;
            font-size: 0.26rem;
            line-height: 0.26rem;
            flex: auto;
            border-right: 1px solid rgba(60, 60, 60, 0.2);
            text-align: center;
            // font-family: PingFangHK-Light;
            &:last-child {
                border: none;
            }
        }
    }

    .search {
        box-shadow: 0px 0px 0.2rem 0px rgba(175, 175, 175, 0.5);
        border-radius: 0.58rem;
        height: 0.9rem;
        line-height: 0.9rem;
        margin-top: 0.32rem;
        padding: 0 0.44rem 0 0.44rem;
        display: flex;
        justify-content: space-between;

        .icon_search {
            font-size: 0.26rem;
            color: #999999;
            background: url(../../assets/images/common/icon-search.png) left center no-repeat;
            background-size: 0.4rem 0.4rem;
            padding-left: 0.5rem;
        }

        input {
            border: none;
            padding-left: 0.06rem;
            font-size: 0.3rem;
            flex: auto;
            color: #2c3852;

            &::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #bfbfbf;
            }

            &:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #bfbfbf;
            }

            &::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #bfbfbf;
            }

            &:-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: #bfbfbf;
            }
        }
    }
}
.restaurant_box {
    padding-top: 0 !important;
    margin-top: 3.14rem;
    font-family: PingFangHK-Medium;
    width: 100%;
    .content {
        // margin-top: 2.24rem;
        border-top: 0.2rem #f2f2f2 solid;
        padding: 0 0.32rem;

        .con_item {
            margin-top: 0.36rem;
            border: 1px solid rgba(221, 222, 225, 1);
            padding: 0 0.44rem;

            .item_top {
                border-bottom: 1px solid #ededed;
                padding-bottom: 0.3rem;

                .title {
                    color: #2e3a54;
                    font-size: 0.34rem;
                    font-family: PingFangHK-Medium;
                    font-weight: 600;
                    line-height: 0.48rem;
                    margin-top: 0.36rem;
                    position: relative;
                    .pro_refister {
                        background: #11c4af;
                        color: #ffffff;
                        font-size: 0.2rem;
                        line-height: 0.28rem;
                        padding: 0.06rem;
                        border-radius: 0.04rem;
                        display: inline-block;
                        position: absolute;
                        top: 0.02rem;
                        right: 0;
                    }
                    .not {
                        background: #ff5f5f;
                    }
                }

                .con_txt {
                    padding-top: 0.1rem;

                    p {
                        margin-top: 0.1rem;
                        font-size: 0.24rem;
                        line-height: 0.34rem;
                        color: #6f7181;

                        &::before {
                            content: '';
                            display: inline-block;
                            width: 0.08rem;
                            height: 0.08rem;
                            border-radius: 0.04rem;
                            background: #686d7f;
                            margin-right: 0.12rem;
                            vertical-align: middle;
                        }
                    }
                }
            }

            .item_bottom {
                display: flex;
                justify-content: space-between;
                padding: 0.4rem 0;

                span {
                    color: #2c3852;
                    font-size: 0.28rem;
                    line-height: 0.4rem;
                }
            }
        }
    }
}
</style>
