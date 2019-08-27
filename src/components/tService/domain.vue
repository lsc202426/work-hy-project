<template>
    <div id="tradeService" class="tradeService">
        <div class="tradeService-top" id="scroll_top">
            <mt-header title="域名" class="header" fixed>
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="t-service">
                <form action="#" @submit.prevent class="form-input">
                    <input
                        type="search"
                        placeholder="请输入域名"
                        v-model="tradeName"
                        autocomplete="off"
                        ref="searchInput"
                        id="search"
                        v-on:keyup.enter="search()"
                    />
                </form>
                <div class="t-service-right" @click="search()">
                    <img src="../../assets/images/trademark/search-news.png" alt />
                    <span>搜索</span>
                </div>
            </div>
        </div>

        <div class="service-bot containerView-main">
            <!-- 未查询 -->
            <div class="instial" v-if="productArr && productArr.length > 0 && getProd && getProd.length <= 0">
                <div class="advantage" v-for="item in productArr" :key="item.id">
                    <p>{{ item.title }}</p>
                    <span>{{ item.summary }}</span>
                </div>
            </div>
            <!-- 搜索展示内容 -->
            <div class="content" v-if="getProd && getProd.length > 0">
                <div
                    class="content_list"
                    @click="fill_information(item.domain, item.reg_title, item.price)"
                    v-for="(item, index) in getProd"
                    :key="index"
                >
                    <div class="list_left">
                        <div class="list_name">
                            <span class="name_blue">{{ item.domain }}</span>
                            <span class="can_or_not" :class="{ not: item.reg_title == '已注册' }">{{ item.reg_title }}</span>
                        </div>
                        <div class="pirce">
                            <span>注册费用</span>
                            <span>￥{{ item.price }}元/1年</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    name: 'tradeService',

    data() {
        return {
            // 搜索词
            tradeName: '',
            //状态
            status: 0,
            // 为搜索，产品数据
            productArr: [],
            // 搜索结果数据
            getProd: [],
            // 设置标识，已返回
            isBack: false,
        };
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    beforeDestroy() {
        window.removeEventListener('popstate', this.goback, false);
    },
    created() {
        // 如果存在
        if (sessionStorage.domainSearch) {
            let _domain = JSON.parse(sessionStorage.domainSearch);
            this.tradeName = _domain.tradeName;
            this.getProd = _domain.getProd;
            this.productArr = _domain.productArr;
            this.status = _domain.status;

            // 存储完，清除
            sessionStorage.removeItem('domainSearch');
        } else {
            this.getProduct();
        }
    },
    methods: {
        goback() {
            var _this = this;
            if (_this.status == 1) {
                _this.tradeName = '';
                _this.status = 0;
                _this.getProd = [];
                _this.isBack = true;
            } else {
                _this.$router.push({
                    path: '/',
                });
            }
            history.pushState(null, null, document.URL);
        },
        getProduct() {
            let _this = this;
            _this.mark = _this.$route.query.mark;
            _this.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: _this.mark,
                    p: 1,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.productArr = response.data.content.list[0].list;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        // 点击加入清单
        fill_information(domain, status, price) {
            var _this = this;
            if (status == '已注册') {
                Toast({
                    message: '该域名已被注册，请重新选择',
                    duration: 3000,
                });
                return;
            }
            var productId = 6;
            var productName = '.cn域名';
            var productDomain = domain.split('.')[1];
            switch (productDomain) {
                case 'cn':
                    productId = 6;
                    productName = '.cn域名';
                    break;
                case 'com':
                    productId = 7;
                    productName = '.com域名';
                    break;
                case 'net':
                    productId = 11;
                    productName = '.net域名';
                    break;
                case '网址':
                    productId = 14;
                    productName = '.网址域名';
                    break;
            }
            // 暂存域名搜索信息
            let _item = {
                tradeName: this.tradeName,
                getProd: this.getProd,
                productArr: this.productArr,
                name: domain,
                price: price,
                productid: productId,
                product_name: productName,
                mark: this.$route.query.mark,
                status: this.status,
            };

            sessionStorage.domainSearch = JSON.stringify(_item);
            sessionStorage.formUrlOne = '/domainMsg';
            _this.$router.push({
                path: '/domainMsg',
            });
        },
        // 搜索
        search() {
            let _this = this;
            _this.isBack = false;
            if (_this.tradeName == '' || !_this.tradeName) {
                Toast({
                    message: '请输入域名',
                    duration: 3000,
                });
                return;
            }
            if (!utils.checkFormat(_this.tradeName)) {
                return;
            }
            _this.getProd = [];
            // 设置失焦，收回软键盘
            utils.inputBlur(_this.$refs.searchInput);
            for (var i = 0; i < _this.productArr.length; i++) {
                _this.$axios
                    .post('index.php?c=App&a=searchDomain', {
                        mark: 'domain',
                        domain: _this.tradeName + _this.productArr[i].suffix,
                        st: 0,
                        suffix: _this.productArr[i].suffix,
                    })
                    .then(function(response) {
                        if (response.data.errcode == 0) {
                            if (!_this.isBack) {
                                _this.status = 1;
                                _this.getProd.push(response.data.content);
                            }
                        } else {
                            Toast({
                                message: '网络异常，请重新搜索',
                                duration: 3000,
                            });
                        }
                    })
            }
        },
    },
};
</script>

<style lang="scss" scoped>
input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none; //此处去掉默认的小×
}
.tradeService .containerView-main {
    padding-bottom: 4rem !important;
}
</style>
