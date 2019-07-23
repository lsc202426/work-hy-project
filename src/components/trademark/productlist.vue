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
                        placeholder="请输入品牌名称"
                    />
                </form>
                <div class="product-right" @click="searchBtn">
                    <img src="../../assets/images/trademark/search-news.png" alt />
                    <span>搜索</span>
                </div>
            </div>
            <div class="product-list-toptips">
                <a href="javascript:void(0);" @click="targetUrl(1)">注册规则</a>
                <span></span>
                <a href="javascript:void(0);" @click="targetUrl(2)">注册指南</a>
                <span></span>
                <a href="javascript:void(0);" @click="targetUrl(3)">关于点商标</a>
                <span></span>
                <a href="javascript:void(0);">案例</a>
            </div>
        </div>
        <div class="product-list-main containerView-main">
            <!-- 未搜索 -->
            <div class="product-list-main-nosearch" v-if="productlist && productlist.length > 0 && typeList && typeList.length <= 0">
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
                            <span>注册费用</span>
                            <span>￥{{ parseInt(item.fee_verify) }}元/1次</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 搜索结果 -->
            <div class="product-list-main-result" v-if="typeList && typeList.length > 0">
                <div class="result-item" v-for="(item, index) in typeList" :key="index" @click="mayApply(item, index)">
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
                                    autocomplete="off"
                                    @keypress="searchGoods($event)"
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
                                    :placeholder="item.domain.split('+')[0].split('|')[1]"
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
                                    :placeholder="item.domain.split('|')[2]"
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
                    <p class="dot" v-if="index > 0" v-for="(item, index) in typeList[index].tipsThree" :key="index">
                        {{ item }}
                    </p>
                    <p v-for="(value, name) in productlist[index].TemptText" :key="name" class="dot">
                        {{ value }}
                    </p>
                    <div class="result-item-price">
                        <p class="type-price">
                            <span>注册费用</span>
                            <span>￥{{ parseInt(item.price) }}元/年</span>
                        </p>
                        <p class="type-price">
                            <span>添加类别</span>
                            <span>￥1200元/1大类</span>
                        </p>
                        <p class="type-price">
                            <span>注册费用</span>
                            <span>￥{{ parseInt(productlist[index].fee_verify) }}元/1次</span>
                        </p>
                    </div>
                    <div class="result-item-search" v-if="index > 0">
                        <button @click="searchType(index)">搜索</button>
                    </div>
                </div>
            </div>
        </div>
        <fillProduct v-if="getShowTmd.isShow"></fillProduct>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import fillProduct from '@/components/trademark/fillProduct.vue';
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            isShowTips: true,
            productlist: [],
            isResult: true,
            typeList: [],
            searchKey: {
                keyword: '',
                dBPlace: '',
                dCservice: '',
                domainD: {
                    place: '',
                    service: '',
                },
            },
            status: 0,
            mark: this.$route.query.mark,
        };
    },
    components: {
        fillProduct,
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SHOW_TMD]]),
        ...mapGetters({
            getShowTmd: [GetterTypes.GET_SHOW_TMD],
        }),
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_SHOW_TMD]]),
        ...mapMutations({
            [MutationTypes.SET_SHOW_TMD]: MutationTypes.SET_SHOW_TMD,
        }),
        goback() {
            var _this = this;
            if (_this.status == 1) {
                _this.typeList = [];
                _this.searchKey.keyword = '';
                _this.status = 0;
            } else {
                _this.$router.push({
                    path: '/',
                });
            }
        },
        searchGoods() {},
        mayApply(item, index) {
            var that = this;
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
                // that.$router.push({
                //     path: '/fillProduct',
                //     query: {
                //         id: item.id,
                //         // name: name,
                //         keyword: temptDomain,
                //         price: item.price,
                //     },
                // });
                let _item = {
                    isShow: true,
                    id: item.id,
                    keyword: temptDomain,
                    price: item.price,
                };
                that[MutationTypes.SET_SHOW_TMD](_item);
            }
        },
        // 验证输入内容格式
        sendSearchCheck: function sendSearchCheck(name) {
            if (name.indexOf(' ') > -1) {
                Toast({
                    message: '请不要用空格。',
                    duration: 3000,
                });
                // this.showHint = true;
                return false;
            }
            // 判断头部或尾部是否含有'-' S
            var hasStr = name.slice(0, 1) == '-';
            var haslast = name.slice(name.length - 1, name.length) == '-';
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
            if (regEn.test(name) || regCn.test(name)) {
                Toast({
                    message: '请不要用特殊字符（如!、$、&等）。',
                    duration: 3000,
                });
                return false;
            }
            return true;
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
        getProdcutList: function() {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getProducts', {
                    p: 0,
                    mark: that.mark,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        console.log(_data);
                        that.productlist = _data.content.list[0].list;
                    }
                    //遍历切割换行组成数组
                    that.productlist.map(function(_item) {
                        _item.TemptText = _item.summary.split(/\n/g);
                    });
                });
        },
        // 搜索商标
        searchBtn: function() {
            const that = this;
            // 搜索前清空
            // that.typeList = [];
            if (that.searchKey.keyword === '') {
                Toast({
                    message: '请输入品牌名称',
                    position: 'middle',
                    duration: 1500,
                });
                return false;
            }
            if (!that.sendSearchCheck(that.searchKey.keyword)) {
                return;
            }
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
                        console.log(_data);
                        that.typeList = response.data.content;

                        that.status = 1;

                        //换行转换
                        that.typeList.map(function(_item) {
                            _item.tipsThree = _item.tips.split('\\n');
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
            let isText = false;
            // 判断是否使用了空格或者 是否输入关键字
            if (index == 1) {
                if (that.searchKey.dBPlace === '') {
                    isText = true;
                }
                if (!that.sendSearchCheck(that.searchKey.dBPlace)) {
                    return;
                }
            } else if (index == 2) {
                if (that.searchKey.dCservice === '') {
                    isText = true;
                }
                if (!that.sendSearchCheck(that.searchKey.dCservice)) {
                    return;
                }
            } else if (index == 3) {
                if (!that.sendSearchCheck(that.searchKey.domainD.place)) {
                    return;
                }
                if (!that.sendSearchCheck(that.searchKey.domainD.service)) {
                    return;
                }
                if (that.searchKey.domainD.place === '' || that.searchKey.domainD.service === '') {
                    isText = true;
                }
            }

            if (isText) {
                Toast({
                    message: '请输入关键字',
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
        // 跳转规则指南
        targetUrl: function(type) {
            const that = this;
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
    },
    created() {
        this.getProdcutList();
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
