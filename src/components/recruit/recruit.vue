<template>
    <div class="recruit product-list">
        <!-- 头部 -->
        <div class="product-list-header">
            <mt-header title="点招聘" class="header" fixed>
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="product-list-search">
                <form action="#" class="form-input" @submit.prevent>
                    <input
                        type="search"
                        v-model="search_txt"
                        autocomplete="off"
                        @keypress="searchGoods($event)"
                        ref="searchInput"
                        id="search"
                        placeholder="请输入品牌名"
                    />
                </form>
                <div class="product-right" @click="search">
                    <img src="../../assets/images/trademark/search-news.png" alt />
                    <span>搜索</span>
                </div>
            </div>
            <div class="product-list-toptips">
                <a href="javascript:void(0);" @click="targetUrl(1)">注册规则</a>
                <span></span>
                <a href="javascript:void(0);" @click="targetUrl(2)">注册指南</a>
                <span></span>
                <a href="javascript:void(0);" @click="targetUrl(3)">关于点招聘</a>
                <span></span>
                <a href="javascript:void(0);" @click.prevent="targetUrl(4)">案例</a>
            </div>
        </div>
        <div class="recruit_con containerView-main" id="con">
            <!-- 搜索结果 -->
            <div class="recruit_con-noresult">
                <div class="no-result" @click="fill_information()">
                    <div class="top">
                        <h2>{{ dzpName ? dzpName : '品牌名' }}.招聘</h2>
                        <span v-show="dzpStatus >= 0" class="status" :class="{ success: dzpStatus === 1, failed: dzpStatus === 0 }"></span>
                    </div>

                    <p>{{ dzpText }}</p>
                    <div class="bottom">
                        <span class="left">注册费用</span>
                        <span class="right">￥{{ dzpPrice }}/年</span>
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
export default {
    name: 'recruit',
    data() {
        return {
            search_txt: this.$route.query.keyword,
            search_t: '',
            reg: '',
            price: '',
            recruit: '已注册',
            recruit1: '可注册',
            possible: false,
            possible_t: false,
            text: '',
            mark: this.$route.query.mark ? this.$route.query.mark : 'dzp', //产品类型
            product_name: '', //产品名称
            productid: '', //产品id
            status: 0,

            // news
            dzpName: '', //点招聘名称
            dzpStatus: -1, //状态
            dzpText: '', //说明
            dzpPrice: '', // 价格
        };
    },
    created() {
        const that = this;
        that.init();
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SHOW_DZP], [GetterTypes.GET_DZP_APPLY_INFO]]),
        ...mapGetters({
            getShowDzp: [GetterTypes.GET_SHOW_DZP],
            dzpApplyInfo: [GetterTypes.GET_DZP_APPLY_INFO],
        }),
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_SHOW_DZP]]),
        ...mapMutations({
            [MutationTypes.SET_SHOW_DZP]: MutationTypes.SET_SHOW_DZP,
        }),
        searchGoods(event) {},
        // 返回
        goback() {
            var that = this;
            if (that.status == 1) {
                // that.possible = false;
                that.search_txt = '';
                that.dzpName = '';
                that.dzpStatus = -1;
                that.status = 0;
            } else {
                that.$router.push({
                    path: '/',
                });
            }
            history.pushState(null, null, document.URL);
        },
        // 跳转规则指南
        targetUrl: function(type) {
            const that = this;
            if (type === 4) {
                that.$router.push({
                    path: '/dzpcase',
                    query: {
                        mark: that.mark,
                    },
                });
                return false;
            }
            that.$axios
                .post('index.php?c=App&a=getProductText', {
                    mark: that.mark,
                    txt_type: type,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        window.location.href = _data.content.url; //  跳转链接
                    }
                });
        },

        goAnchor(type) {
            var anchor = this.$el.querySelector(type);
            let recruit_top = this.$el.querySelector('#scroll_top');
            document.getElementById('con').scrollTop = anchor.offsetTop - recruit_top.offsetHeight - 20;
        },
        // 初始化获取点招聘产品列表
        init() {
            let that = this;
            that.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: that.mark,
                    p: 1,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        that.dzpText = _data.content.list[0].list[0].summary;
                        that.dzpPrice = _data.content.list[0].list[0].price;
                        that.product_name = _data.content.list[0].list[0].title;
                        that.productid = _data.content.list[0].list[0].id;
                        // 搜索
                        if (that.$route.query.keyword) {
                            that.$nextTick(function() {
                                that.search();
                            });
                        }
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                })
                .catch(function(error) {
                    Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                    });
                });
        },
        // 验证输入内容格式
        sendSearchCheck: function sendSearchCheck() {
            if (this.search_txt.indexOf(' ') > -1) {
                Toast({
                    message: '请不要用空格。',
                    duration: 3000,
                });
                // this.showHint = true;
                return false;
            }
            // 判断头部或尾部是否含有'-' S
            var hasStr = this.search_txt.slice(0, 1) == '-';
            var haslast = this.search_txt.slice(this.search_txt.length - 1, this.search_txt.length) == '-';
            if (hasStr || haslast) {
                Toast({
                    message: '“-”不能放在开头或结尾。',
                    duration: 3000,
                });
                return false;
            }
            // 判断头部或尾部是否含有'-' E

            // 判断头是否含有特殊字符 S
            var regEn = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if (regEn.test(this.search_txt) || regCn.test(this.search_txt)) {
                Toast({
                    message: '请不要用特殊字符（如!、$、&等）。',
                    duration: 3000,
                });
                return false;
            }
            return true;
        },
        search() {
            let that = this;
            if (that.search_txt == '') {
                Toast({
                    message: '请输入品牌名称',
                    duration: 3000,
                });
                return;
            }
            if (!that.sendSearchCheck()) {
                return;
            }
            that.$axios
                .post('index.php?c=App&a=searchDomain', {
                    mark: that.mark,
                    domain: that.search_txt,
                    st: 0,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        // that.dzpResult = response.data.content;
                        that.dzpName = response.data.content.domain; //点招聘名称
                        that.dzpStatus = response.data.content.reg; //状态
                        that.dzpPrice = response.data.content.price; // 价格
                        that.reg = response.data.content.reg;
                        that.price = response.data.content.price;
                        that.possible = true; //显示查询结果
                        that.search_t = that.search_txt;
                        that.status = 1;

                        if (that.reg == 1) {
                            that.possible_t = true;
                        } else {
                            that.possible_t = false;
                        }
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                })
                .catch(function(error) {
                    Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                    });
                });
        },
        fill_information() {
            if (this.dzpStatus !== 1) {
                return false;
            }
            this.text = this.search_t + '.招聘';
            let _item = {
                id: this.productid,
                keyword: this.text,
                price: this.price,
                product_name: this.product_name,
            };
            this[MutationTypes.SET_SHOW_DZP](_item);
            this.$router.push({
                path: '/dzpinfor',
            });
        },
    },
};
</script>
