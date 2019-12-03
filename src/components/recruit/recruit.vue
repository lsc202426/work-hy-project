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
                        v-on:keyup.enter="search"
                    />
                </form>
                <div class="product-right" @click="search">
                    <img src="../../assets/images/trademark/search-news.png" alt />
                    <span>搜索</span>
                </div>
            </div>
            <div class="product-list-toptips">
                <a href="javascript:void(0);" @click="goAnchor('注册规则', '1')">注册规则</a>
                <span></span>
                <a href="javascript:void(0);" @click="goAnchor('注册指南', '2')">注册指南</a>
                <span></span>
                <a href="javascript:void(0);" @click="goAnchor('关于点招聘', '3')">关于点招聘</a>
                <span></span>
                <a href="javascript:void(0);" @click.prevent="targetUrl()">案例</a>
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
                    <div class="bottom" v-show="dzpStatus === -1">
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
import * as utils from '@/utils/index';
export default {
    name: 'recruit',
    data() {
        return {
            // 搜索关键词
            search_txt: '',
            //注册费
            price: '',
            //产品类型
            mark: this.$route.query.mark ? this.$route.query.mark : 'dzp',
            //产品名称
            product_name: '',
            //产品id
            productid: '',
            status: 0,
            //点招聘名称
            dzpName: '',
            //状态
            dzpStatus: -1,
            //说明
            dzpText: '',
            // 价格
            dzpPrice: '',
        };
    },
    created() {
        const that = this;
        // 如果存在数据
        if (sessionStorage.dzpSearch) {
            let dzpInfor = JSON.parse(sessionStorage.dzpSearch);
            this.productid = dzpInfor.id;
            this.search_txt = dzpInfor.search_txt;
            this.price = dzpInfor.price;
            this.product_name = dzpInfor.product_name;
            this.dzpName = dzpInfor.search_txt;
            this.dzpStatus = dzpInfor.reg;
            this.status = dzpInfor.status;
            // 读取完清除
            sessionStorage.removeItem('dzpSearch');
        }
        that.init();
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
        searchGoods(event) {},
        // 返回
        goback() {
            var that = this;
            if (that.status == 1) {
                that.search_txt = '';
                that.dzpName = '';
                that.dzpStatus = -1;
                that.status = 0;
                that.$router.push({
                    path: '/recruit',
                    query: {
                        mark: 'dzp',
                    },
                });
            } else {
                that.$router.push({
                    path: '/',
                });
            }
            history.pushState(null, null, document.URL);
        },
        goAnchor(type, num) {
            //跳转清空
            this.search_txt = '';
            this.dzpName = '';
            this.dzpStatus = -1;
            this.status = 0;
            this.$router.push({
                path: '/recruit',
                query: {
                    mark: 'dzp',
                },
            });
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: this.$route.query.mark,
                    txt_type: num,
                },
            });
        },
        // 跳转规则指南
        targetUrl: function() {
            const that = this;
            that.$router.push({
                path: '/dzpcase',
                query: {
                    mark: that.mark,
                },
            });
        },

        // 初始化获取点招聘产品列表
        init() {
            let that = this;
            sessionStorage.removeItem('ids');
            sessionStorage.removeItem('names');
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
        search() {
            let that = this;
            if (that.search_txt === '' || !that.search_txt) {
                Toast({
                    message: '请输入品牌名称',
                    duration: 3000,
                });
                return;
            }
            if (!utils.checkFormat(that.search_txt)) {
                return;
            }
            // 设置失焦，收回软键盘
            utils.inputBlur(that.$refs.searchInput);
            that.$axios
                .post('index.php?c=App&a=searchDomain', {
                    mark: that.mark,
                    domain: that.search_txt,
                    st: 0,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        that.dzpName = response.data.content.domain; //点招聘名称
                        that.dzpStatus = response.data.content.reg; //状态
                        that.dzpPrice = response.data.content.price; // 价格
                        that.price = response.data.content.price;
                        that.status = 1;
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
                if (!this.search_txt || this.search_txt === '') {
                    return false;
                }
                Toast({
                    message: '该品牌名已被注册',
                    duration: 1500,
                });
                return false;
            }
            let _item = {
                id: this.productid,
                keyword: this.search_txt + '.招聘',
                price: this.price,
                product_name: this.product_name,
                search_txt: this.search_txt,
                reg: this.dzpStatus,
                status: this.status,
            };
            sessionStorage.dzpSearch = JSON.stringify(_item);
            // 暂存结果信息
            sessionStorage.formUrlOne = '/dzpinfor';
            this.$router.push({
                path: '/dzpinfor',
            });
        },
    },
};
</script>
