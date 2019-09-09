<template>
    <div class="product-list">
        <div class="product-list-header">
            <mt-header title="点商标" class="header" fixed>
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="product-list-search">
                <form action="#" class="form-input" @submit.prevent>
                    <input
                        type="search"
                        v-model="searchKey.keyword"
                        autocomplete="off"
                        @keypress="searchGoods($event)"
                        ref="searchInput"
                        id="search"
                        v-on:keyup.enter="searchBtn"
                        placeholder="请输入品牌名称"
                    />
                </form>
                <div class="product-right" @click="searchBtn">
                    <img src="../../assets/images/trademark/search-news.png" alt />
                    <span>搜索</span>
                </div>
            </div>
            <div class="product-list-toptips">
                <a href="javascript:void(0);" @click="goAnchor('注册规则', '1')">注册规则</a>
                <span></span>
                <a href="javascript:void(0);" @click="goAnchor('注册指南', '2')">注册指南</a>
                <span></span>
                <a href="javascript:void(0);" @click="goAnchor('关于点商标', '3')">关于点商标</a>
                <span></span>
                <a href="javascript:void(0);" @click="targetUrl()">案例</a>
            </div>
        </div>
        <div class="product-list-main containerView-main">
            <!-- 未搜索 -->
            <!-- <div class="product-list-main-nosearch" v-if="productlist && productlist.length > 0 && typeList && typeList.length <= 0">
                <div class="product-list-main-item" v-for="(item, index) in productlist" :key="index">
                    <h2 class="title">{{ item.title }}</h2>
                    <p v-for="(value, name) in item.TemptText" :key="name" class="dot">
                        {{ value }}
                    </p>
                    <div class="product-list-main-price">
                        <p class="type-price">
                            <span>注册费用</span>
                            <span>￥{{ parseInt(item.price) }}元/年</span>
                        </p>
                        <p class="type-price">
                            <span>添加类别</span>
                            <span>￥1200元/1大类</span>
                        </p>
                        <p class="type-price">
                            <span>审核费</span>
                            <span>￥{{ parseInt(item.fee_verify) }}元/1次</span>
                        </p>
                    </div>
                </div>
            </div> -->
            <div class="product-list-main-nosearch" v-if="typeList && typeList.length <= 0">
                <div class="news-text">
                    <h2 class="news-text-title">点商标</h2>
                    <p class="news-text-text">一个人人认知并信赖的网上商标品牌标志</p>
                    <div class="news-text-img">
                        <img src="@/assets/images/trademark/banner_one.png" alt="" />
                        <img src="@/assets/images/trademark/banner_two.png" alt="" />
                        <img src="@/assets/images/trademark/banner_three.png" alt="" />
                    </div>
                    <h2 class="news-text-title mgtop">案例</h2>
                    <p class="news-text-text">一个人人认知并信赖的网上商标品牌标志</p>
                </div>
                <div class="news-case">
                    <a :href="item.url" class="news-case-item" v-for="(item, index) of recommendCase" :key="index">
                        <span class="news-case-item-logo">
                            <img :src="configs.api.public_domain + item.logo" />
                        </span>
                        <label class="news-case-item-name">{{ item.name }}</label>
                    </a>
                </div>
            </div>
            <!-- 搜索结果 -->
            <div class="product-list-main-result" v-if="typeList && typeList.length > 0">
                <div class="result-item" v-for="(item, index) in typeList" :key="index" @click="canApply(item, index)">
                    <div class="result-item-title">
                        <!-- A类 -->
                        <div class="item-type" v-if="index === 0">
                            <span class="domin">
                                {{ item.domain }}
                            </span>
                            <span class="domin-type">.商标</span>
                        </div>
                        <!-- B类 -->
                        <div class="item-type" v-else-if="index === 1">
                            <span class="domin">{{ item.domain.split('+')[0] }}</span>
                            <span class="connect">+</span>
                            <form action="#" class="form-input" @submit.prevent>
                                <input
                                    type="search"
                                    v-model="searchKey.dBPlace"
                                    :placeholder="item.domain.split('|')[1]"
                                    @input="changeKey(1)"
                                    @click.stop
                                    autocomplete="off"
                                    @keypress="searchGoods($event)"
                                    v-on:keyup.enter="searchType(index)"
                                    @blur="scrollReset()"
                                />
                            </form>
                            <span class="domin-type">.商标</span>
                        </div>
                        <!-- C类 -->
                        <div class="item-type" v-else-if="index === 2">
                            <form action="#" class="form-input" @submit.prevent>
                                <input
                                    type="search"
                                    v-model="searchKey.dCservice"
                                    autocomplete="off"
                                    @keypress="searchGoods($event)"
                                    @input="changeKey(2)"
                                    placeholder="指定地"
                                    @click.stop
                                    v-on:keyup.enter="searchType(index)"
                                    @blur="scrollReset()"
                                />
                            </form>
                            <span class="connect">+</span>
                            <span class="domin">{{ item.domain.split('+')[1] }}</span>
                            <span class="domin-type">.商标</span>
                        </div>
                        <!-- D类 -->
                        <div class="item-type" v-else-if="index === 3">
                            <form action="#" class="form-input" @submit.prevent>
                                <input
                                    type="text"
                                    v-model="searchKey.domainD.place"
                                    autocomplete="off"
                                    @keypress="searchGoods($event)"
                                    @input="changeKey(3)"
                                    @click.stop
                                    :placeholder="item.domain.split('+')[0].split('|')[1]"
                                    v-on:keyup.enter="searchType(index)"
                                    @blur="scrollReset()"
                                />
                            </form>
                            <span class="connect">+</span>
                            <span class="domin">{{ item.domain.split('+')[1] }}</span>
                            <span class="connect">+</span>
                            <form action="#" class="form-input" @submit.prevent>
                                <input
                                    type="text"
                                    v-model="searchKey.domainD.service"
                                    autocomplete="off"
                                    @keypress="searchGoods($event)"
                                    @input="changeKey(3)"
                                    @click.stop
                                    :placeholder="item.domain.split('|')[2]"
                                    v-on:keyup.enter="searchType(index)"
                                    @blur="scrollReset()"
                                />
                            </form>

                            <span class="domin-type">.商标</span>
                        </div>
                        <i
                            class="icons-status"
                            :class="{
                                success: item.isStatus === 'can',
                                failed: item.isStatus === 'not',
                            }"
                        ></i>
                    </div>
                    <p class="dot" v-for="item in typeList[index].tipsThree" :key="item">
                        {{ item }}
                    </p>
                    <!-- <p v-for="(value, name) in productlist[index].TemptText" :key="name" class="dot">
                        {{ value }}
                    </p> -->
                    <!-- <div class="result-item-price">
                        <p class="type-price">
                            <span>注册费用</span>
                            <span>￥{{ parseInt(item.price) }}元/年</span>
                        </p>
                        <p class="type-price">
                            <span>添加类别</span>
                            <span>￥1200元/1大类</span>
                        </p>
                        <p class="type-price">
                            <span>审核费</span>
                            <span>￥{{ parseInt(productlist[index].fee_verify) }}元/1次</span>
                        </p>
                    </div> -->
                    <div class="result-item-search" v-if="index > 0">
                        <button @click="searchType(index)">搜索</button>
                    </div>
                </div>
            </div>
            <div class="product-list-main-bottom">
                <i class="dotted-line"></i>
                <span>已到底部</span>
                <i class="dotted-line"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    data() {
        return {
            // 产品介绍列表
            // productlist: [],
            // 搜索结果列表
            typeList: [],
            // 搜索各关键字
            searchKey: {
                keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
                dBPlace: '',
                dCservice: '',
                domainD: {
                    place: '',
                    service: '',
                },
            },
            // 状态
            status: 0,
            // 类型
            mark: this.$route.query.mark,
            // 推荐案例
            recommendCase: [],
        };
    },
    created() {
        if (sessionStorage.tmdSearch) {
            let tmdInfo = JSON.parse(sessionStorage.tmdSearch);
            this.recommendCase = tmdInfo.recommendCase;
            this.typeList = tmdInfo.typeList;
            this.searchKey = tmdInfo.searchKey;
            this.status = tmdInfo.status;
            // 读取完数据，清空
            sessionStorage.removeItem('tmdSearch');
        } else {
            // this.getProdcutList();
            this.getCases();
        }
    },
    mounted() {
        const that = this;
        if (window.history && window.history.pushState) {
            // 下一循环执行，保证页面加载完毕
            that.$nextTick(() => {
                // 设置定时器，处理ios返回，立即执行一次popstate
                setTimeout(() => {
                    // 向历史记录中插入了当前页
                    history.pushState(null, null, document.URL);
                    window.addEventListener('popstate', that.goback, false);
                }, 600);
            });
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        // 返回
        goback() {
            const that = this;
            if (that.status == 1) {
                that.typeList = [];
                that.searchKey.keyword = '';
                that.status = 0;
            } else {
                that.$router.push({
                    path: '/',
                });
            }
            history.pushState(null, null, document.URL);
        },
        // 滚动条重置
        scrollReset() {
            window.scroll(0, 0); //让页面归位
        },
        // 获取点商标推荐案例
        getCases: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getCases', {
                    mark: that.mark,
                    is_recommend: 1,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        _data.content.map(function(item) {
                            item.slist.map(function(_item) {
                                that.recommendCase.push(_item);
                            });
                        });
                    }
                });
        },
        searchGoods() {},
        // 点击跳转填写申请信息
        canApply(item, index) {
            const that = this;
            // 拼接关键字
            let temptDomain = '';
            switch (index) {
                case 0:
                    temptDomain = that.searchKey.keyword + '.商标';
                    break;
                case 1:
                    temptDomain = that.searchKey.keyword + that.searchKey.dBPlace + '.商标';
                    break;
                case 2:
                    temptDomain = that.searchKey.dCservice + that.searchKey.keyword + '.商标';
                    break;
                case 3:
                    temptDomain = that.searchKey.domainD.place + that.searchKey.keyword + that.searchKey.domainD.service + '.商标';
                    break;
            }
            if (item.isStatus === 'can') {
                MessageBox({
                    title: '',
                    message: '注册点商标所需要的规则流程以及所 需要的材料要求，您都了解吗？',
                    showCancelButton: true,
                    confirmButtonText: '已了解',
                    cancelButtonText: '不了解',
                    confirmButtonClass: 'comfirm',
                    cancelButtonClass: 'cancel',
                }).then(active => {
                    if (active === 'confirm') {
                        that.$router.push({
                            path: '/fillProduct',
                        });
                    } else {
                        that.goAnchor('注册指南', '2');
                    }
                });
                // 保存点商标搜索结果
                let temptTmd = {
                    recommendCase: that.recommendCase,
                    typeList: that.typeList,
                    searchKey: that.searchKey,
                    tmdDomain: temptDomain,
                    status: that.status,
                    price: item.price,
                    productId: item.id,
                };
                sessionStorage.tmdSearch = JSON.stringify(temptTmd);
                // 添加自定义class
                document.getElementsByClassName('mint-msgbox')[0].classList.add('mymsgbox');
            }
        },
        // 监听搜索关键词的变化
        changeKey: function(index) {
            const that = this;
            // 如果值改变，状态跟着改变
            that.$set(that.typeList, index, {
                ...that.typeList[index],
                isStatus: 'search',
                reg: 0,
            });
        },
        //获取搜索
        // getProdcutList: function() {
        //     const that = this;
        //     that.$axios
        //         .post('/index.php?c=App&a=getProducts', {
        //             p: 0,
        //             mark: that.mark,
        //         })
        //         .then(function(response) {
        //             let _data = response.data;
        //             if (_data.errcode === 0) {
        //                 that.productlist = _data.content.list[0].list;
        //             }
        //             //遍历切割换行组成数组
        //             that.productlist.map(function(_item) {
        //                 _item.TemptText = _item.summary.split(/\n/g);
        //             });
        //         });
        // },
        // 搜索商标
        searchBtn: function() {
            const that = this;
            // 搜索前清空其他关键字
            that.searchKey.dBPlace = '';
            that.searchKey.dCservice = '';
            that.searchKey.domainD.place = '';
            that.searchKey.domainD.service = '';
            // that.typeList = [];
            if (that.searchKey.keyword === '' || !that.searchKey.keyword) {
                Toast({
                    message: '请输入品牌名称',
                    position: 'middle',
                    duration: 1500,
                });
                return false;
            }
            if (!utils.checkFormat(that.searchKey.keyword)) {
                return;
            }
            // 设置失焦，收回软键盘
            utils.inputBlur(that.$refs.searchInput);
            that.$axios
                .post('/index.php?c=App&a=searchDomain', {
                    domain: that.searchKey.keyword,
                    mark: that.mark,
                    st: 0,
                    p: 0,
                    suffix: '',
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.typeList = response.data.content;
                        that.status = 1;
                        //换行转换
                        that.typeList.map(function(_item) {
                            _item.tipsThree = _item.summary.split('\\n');
                        });
                        that.typeList.map(function(_item) {
                            // 正则判断是否有input关键字
                            let reg = RegExp(/#INPUT#/);
                            // 判断是否已被注册
                            if (_item.reg === 0) {
                                _item.isStatus = 'not';
                            } else if (_item.reg === 1) {
                                if (_item.domain.match(reg)) {
                                    _item.isStatus = 'search';
                                } else {
                                    _item.isStatus = 'can';
                                }
                            }
                        });
                    }
                });
        },
        // 精确搜索
        searchType: function(index) {
            const that = this;
            let tipsText = '';
            // 判断是否使用了空格或者 是否输入关键字
            if (index == 1) {
                if (that.searchKey.dBPlace === '' || !that.searchKey.dBPlace) {
                    tipsText = that.typeList[index].domain.split('|')[1];
                }
                if (!utils.checkFormat(that.searchKey.dBPlace)) {
                    return;
                }
            } else if (index == 2) {
                if (that.searchKey.dCservice === '' || !that.searchKey.dCservice) {
                    tipsText = that.typeList[index].domain.split('|')[1].split('+')[0];
                }
                if (!utils.checkFormat(that.searchKey.dCservice)) {
                    return;
                }
            } else if (index == 3) {
                if (!utils.checkFormat(that.searchKey.domainD.place)) {
                    return;
                } else if (!utils.checkFormat(that.searchKey.domainD.service)) {
                    return;
                } else if (that.searchKey.domainD.place === '' || !that.searchKey.domainD.place) {
                    tipsText = that.typeList[index].domain.split('+')[0].split('|')[1];
                } else if (that.searchKey.domainD.service === '' || !that.searchKey.domainD.service) {
                    tipsText = that.typeList[index].domain.split('|')[2];
                }
            }
            if (tipsText) {
                Toast({
                    message: '请输入' + tipsText,
                    position: 'middle',
                    duration: 1500,
                });
                return false;
            }
            // 拼接关键字
            let temptDomain = '';
            switch (index) {
                case 1:
                    temptDomain = that.searchKey.keyword + that.searchKey.dBPlace + '.商标';
                    break;
                case 2:
                    temptDomain = that.searchKey.dCservice + that.searchKey.keyword + '.商标';
                    break;
                case 3:
                    temptDomain = that.searchKey.domainD.place + that.searchKey.keyword + that.searchKey.domainD.service + '.商标';
                    break;
            }
            that.$axios
                .post('/index.php?c=App&a=searchDomain', {
                    domain: temptDomain,
                    mark: that.mark,
                    st: 1,
                    p: 0,
                    suffix: '',
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        if (_data.content.reg === 1) {
                            that.$set(that.typeList, index, {
                                ...that.typeList[index],
                                isStatus: 'can',
                                reg: 1,
                            });
                        } else {
                            that.$set(that.typeList, index, {
                                ...that.typeList[index],
                                isStatus: 'not',
                                reg: 0,
                            });
                        }
                    }
                });
        },
        // 跳转关于点商标
        goAnchor(type, num) {
            // 跳转清空
            this.typeList = [];
            this.searchKey.keyword = '';
            this.status = 0;
            this.$router.push({
                path: '/productlist',
                query: {
                    mark: 'tmd',
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
    },
};
</script>
<style lang="scss" scoped>
.containerView-main {
    padding-top: 0rem !important;
    padding-bottom: 0 !important;
    margin-top: 3.72rem;
}
</style>
