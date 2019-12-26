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
                        v-model="keyword"
                        autocomplete="off"
                        ref="searchInput"
                        id="search"
                        @blur="fixScroll"
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
                        <a href="javascript:void(0);" @click="goAnchor('广泛应用', '5')">
                            <img src="@/assets/images/trademark/banner_one.png" alt="" />
                        </a>
                        <a href="javascript:void(0);" @click="goAnchor('信任标志', '6')">
                            <img src="@/assets/images/trademark/banner_two.png" alt="" />
                        </a>
                        <a href="javascript:void(0);" @click="goAnchor('公信力', '7')">
                            <img src="@/assets/images/trademark/banner_three.png" alt="" />
                        </a>
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
                <div class="more-news-case">
                    <button @click="targetUrl()">查看更多</button>
                </div>
            </div>
            <!-- 搜索结果 -->
            <div class="product-list-main-result" v-if="typeList && typeList.length > 0">
                <div class="result-item" v-for="(item, index) in typeList" :key="index" @click="canApply(item, index)">
                    <div class="result-item-title">
                        <div class="item-type" @click.stop="changeState(item, index)" v-if="item.isStatus !== 'search'">
                            <div v-for="(list, key) in item.domainList" :key="key">
                                <span class="domin" :class="{ connect: list == '+' }" v-if="list.indexOf('#INPUT#') == -1">{{ list }}</span>
                                <span class="udline" v-if="list.indexOf('#INPUT#') != -1">{{ searchKeyword[index][key].keyword }}</span>
                            </div>
                            <span class="domin-type">.商标</span>
                        </div>
                        <div class="item-type" v-else>
                            <div class="item-type-list" v-for="(list, key) in item.domainList" :key="key">
                                <span class="domin" :class="{ connect: list == '+' }" v-if="list.indexOf('#INPUT#') == -1">{{ list }}</span>
                                <form action="#" class="form-input" @submit.prevent v-if="list.indexOf('#INPUT#') != -1">
                                    <input
                                        type="search"
                                        v-model="searchKeyword[index][key].keyword"
                                        :placeholder="searchKeyword[index][key].text"
                                        @input="changeKey(index, key)"
                                        @click.stop
                                        autocomplete="off"
                                        v-on:keyup.enter="searchType(index, key)"
                                    />
                                    <div class="recommend_word" v-if="item.recommend_word">
                                        <span class="icon-downs" @click.stop="showWord(index, key)"></span>
                                        <ul class="recommend_word-list" v-show="isShowWord === index + key">
                                            <li
                                                v-for="(word, w) in item.recommend_word.split(',')"
                                                :key="w"
                                                @click.stop="selectWord(word, index, key)"
                                            >
                                                {{ word }}
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                            <span class="domin-type">.商标</span>
                        </div>
                    </div>
                    <div
                        class="dot"
                        v-show="typeList[index].tipsThree && typeList[index].tipsThree.length > 0"
                        v-for="(item, ls) in typeList[index].tipsThree"
                        :key="ls"
                    >
                        {{ item }}
                        <button
                            class="doubt-btn"
                            v-show="ls === typeList[index].tipsThree.length - 1"
                            @click.stop="showTips(index)"
                        ></button>
                        <div
                            class="doubt-box"
                            v-show="isShowTips === index && ls === typeList[index].tipsThree.length - 1"
                            @click="closeTips($event)"
                        >
                            <p v-for="tip in typeList[index].TemptText" :key="tip">{{ tip }}</p>
                        </div>
                    </div>
                    <!-- 搜索按钮，状态 -->
                    <div class="result-item-search">
                        <div class="result-item-search-left">
                            价格：<span>￥{{ item.price | numToInt }}/年</span>
                        </div>
                        <div class="result-item-search-right">
                            <span v-show="item.isStatus !== 'search' && item.isStatus === 'can'" class="icons-status success">可申请</span>
                            <span v-show="item.isStatus !== 'search' && item.isStatus === 'not'" class="icons-status failed">已注册</span>
                            <button v-show="item.isStatus === 'search'" @click="searchType(index)" v-if="index > 0">搜索</button>
                        </div>
                    </div>
                </div>
                <!-- 联系客服 -->
                <div class="link-customer">
                    <customer-service></customer-service>
                </div>
            </div>
            <div class="product-list-main-bottom" v-show="status === 0">
                <i class="dotted-line"></i>
                <span>已到底部</span>
                <i class="dotted-line"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    data() {
        return {
            // 搜索结果列表
            typeList: [],
            // 搜索关键词
            keyword: '',
            // 精确搜索关键词
            searchKeyword: {},
            // 状态
            status: 0,
            // 类型
            mark: this.$route.query.mark,
            // 推荐案例
            recommendCase: [],
            // 是否显示推荐词弹框
            isShowTips: -1,
            // 是否显示推荐词
            isShowWord: -1,
            // 组合临时域名
            temptDomain: '',
        };
    },
    created() {
        if (sessionStorage.tmdSearch) {
            let tmdInfo = JSON.parse(sessionStorage.tmdSearch);
            this.recommendCase = tmdInfo.recommendCase;
            this.typeList = tmdInfo.typeList;
            this.searchKeyword = tmdInfo.searchKeyword;
            this.status = tmdInfo.status;
            this.keyword = tmdInfo.keyword;
            // 读取完数据，清空
            sessionStorage.removeItem('tmdSearch');
        } else {
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
                }, 0);
            });
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        // 失焦，页面回滚顶部
        fixScroll: function() {
            window.scrollTo(0, 0);
        },
        // 是否显示推荐词
        showWord: function(index, key) {
            if (this.isShowWord !== -1) {
                this.isShowWord = -1;
            } else {
                this.isShowWord = index + key;
            }
        },
        // 选择
        selectWord: function(word, index, key) {
            // 重新赋值
            this.searchKeyword[index][key].keyword = word;
            // 关闭
            this.isShowWord = -1;
        },
        // 查看更多提示
        showTips: function(k) {
            if (this.isShowTips !== -1) {
                this.isShowTips = -1;
            } else {
                this.isShowTips = k;
            }
            // this.isShowTips = k;
        },
        // 关闭提示
        closeTips: function(e) {
            e.stopPropagation();
            this.isShowTips = -1;
        },
        // 返回
        goback() {
            const that = this;
            if (that.status == 1) {
                that.typeList = [];
                that.keyword = '';
                that.status = 0;
                // 滚动条置顶
                that.scrollBottom();
            } else {
                that.$router.push({
                    path: '/',
                });
            }
            history.pushState(null, null, document.URL);
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
        // 点击注册词，改变状态
        changeState: function(item, index) {
            if (index > 0) {
                item.isStatus = 'search';
            }
        },
        // 点击跳转填写申请信息
        canApply(item, index) {
            const that = this;
            if (item.isStatus === 'can') {
                // 拼接域名
                that.connectDomain(index);
                // 保存点商标搜索结果
                let temptTmd = {
                    recommendCase: that.recommendCase,
                    typeList: that.typeList,
                    searchKeyword: that.searchKeyword,
                    keyword: that.keyword,
                    tmdDomain: that.temptDomain,
                    status: that.status,
                    price: item.price,
                    productId: item.id,
                };
                sessionStorage.tmdSearch = JSON.stringify(temptTmd);
                // 跳转
                that.$router.push({
                    path: '/fillProduct',
                });
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
        // 评价搜索域名
        connectDomain: function(index) {
            const that = this;
            let _item = that.searchKeyword[index];
            // 如果是第一个，则直接拼接
            if (!_item) {
                that.temptDomain = that.keyword + '.商标';
                return false;
            }
            let itemList = that.typeList[index].domainList;
            // 临时数据，组合搜索所需
            let temptList = {};
            // 遍历，判断是否为空
            for (let key in _item) {
                let text = '#INPUT#|' + _item[key].text;
                itemList.map((item, key) => {
                    if (item.indexOf(that.keyword) !== -1) {
                        temptList[key] = that.keyword;
                    }
                    if (item.indexOf(text) !== -1) {
                        temptList[key] = _item[key].keyword;
                    }
                });
            }
            // 组合所需搜索
            let temptKeyword = '';
            for (let i in temptList) {
                temptKeyword = temptKeyword + temptList[i];
            }
            that.temptDomain = temptKeyword + '.商标';
        },
        // 搜索商标
        searchBtn: function() {
            const that = this;
            // 搜索前清空其他关键字
            if (that.keyword === '' || !that.keyword) {
                Toast({
                    message: '请输入品牌名称',
                    position: 'middle',
                    duration: 1500,
                });
                return false;
            }
            if (!utils.checkFormat(that.keyword)) {
                return;
            }
            // 设置失焦，收回软键盘
            utils.inputBlur(that.$refs.searchInput);
            that.$axios
                .post('/index.php?c=App&a=searchDomain', {
                    domain: that.keyword,
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
                        that.typeList.map((_item, key) => {
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
                            // 拆分数组
                            _item.domainList = _item.domain.replace(/\+/g, ',+,').split(',');
                            // 遍历，设置input v-model
                            _item.domainList.map((_item1, key1) => {
                                if (_item1.indexOf('#INPUT#') != -1) {
                                    // 动态设置v-model
                                    if (!that.searchKeyword[key]) {
                                        that.searchKeyword[key] = {};
                                    }
                                    that.searchKeyword[key][key1] = {};
                                    that.$set(that.searchKeyword[key], key1, {
                                        keyword: '',
                                        text: _item1.split('|')[1],
                                    });
                                }
                            });
                            if (_item.summary) {
                                _item.tipsThree = _item.summary.split('\\n');
                            }
                            if (_item.tips) {
                                _item.TemptText = _item.tips.split('\\n');
                            }
                        });
                        // 滚动条置顶
                        that.scrollBottom();
                    }
                });
        },
        // 精确搜索
        searchType: function(index) {
            const that = this;
            let _item = this.searchKeyword[index];
            // 为空提示文字
            let tipsText = '';
            // 遍历，判断是否为空
            for (let key in _item) {
                if (_item[key].keyword == '') {
                    tipsText = _item[key].text;
                    break;
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
            that.connectDomain(index);
            that.$axios
                .post('/index.php?c=App&a=searchDomain', {
                    domain: that.temptDomain,
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
            this.keyword = '';
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
    padding-top: 3.7rem !important;
    padding-bottom: 0 !important;
}
</style>
