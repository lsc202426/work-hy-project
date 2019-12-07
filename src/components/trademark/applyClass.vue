<template>
    <div class="apply-class">
        <nav-header title="申请类别"></nav-header>
        <div class="apply-class-main">
            <div class="left bscroll" ref="bscrollLf">
                <ul class="bscroll-container left-main">
                    <li v-for="item of theFirstClass" :key="item.key" class="list-item" @click="switchFirstClass(item)">
                        <span class="icons" :class="{ active: item.isSelect }"></span>
                        <label class="text">{{ item.name }}</label>
                        <i
                            class="tips"
                            :class="{ active: allTypeClass[item.name].length > 0 }"
                            v-if="allTypeClass[item.name] && allTypeClass[item.name].length > 0"
                            >{{ allTypeClass[item.name].length }}</i
                        >
                    </li>
                </ul>
            </div>
            <div class="right bscroll" ref="bscrollRg">
                <div class="bscroll-container right-main">
                    <div class="search-result" v-if="isSearch">
                        <div class="search-result-item" v-for="(list, index) in searchResult" :key="index" @click="selectProduct(list)">
                            <span class="icons" :class="{ active: list.isSelect }"></span>
                            <label class="text">{{ list.productname }}</label>
                        </div>
                    </div>
                    <ul v-else>
                        <li v-for="(list, index) in theSecondClass[defaultClass]" :key="index">
                            <div class="right-main-title" @click.stop="switchSecondClass(list)">
                                <span
                                    class="icons"
                                    :class="{
                                        active: selectList[list.categorycode] && selectList[list.categorycode].length > 0,
                                    }"
                                ></span>
                                <label class="text">{{ list.codename }}</label>
                            </div>
                            <ul class="right-main-child" v-show="list.children && theThirdClass === list.categorycode && isShowChild">
                                <li v-for="value in list.children" :key="value.productid" @click="selectProduct(value)">
                                    <span class="icons" :class="{ active: value.isSelect }"></span>
                                    <label class="text">{{ value.productname }}</label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="right-search" v-if="theFirstClass && theFirstClass.length > 0">
                    <div class="right-search-box">
                        <input class="right-search-box-input" v-model="keyword" placeholder="搜索商品" type="text" />
                        <span class="right-search-box-icon"></span>
                    </div>
                </div>
                <p class="loading" v-show="isLoading">
                    正在加载数据...
                </p>
            </div>
        </div>
        <div class="apply-class-bottom">
            <label>合计:￥{{ temptAllPrice }}元</label>
            <button @click="sureSelect">确定</button>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import * as utils from '@/utils/index';
export default {
    data() {
        return {
            // 加载小类loading
            isLoading: false,
            //内容展示的数据结构
            allTypeClass: {},
            // 总价
            allPrice: 0,
            // 商标的总额
            allPriceBs: 0,
            //暂存选中的class
            temtpClass: {},
            //重组提交数据
            applyResult: [],
            // 来源
            frompath: this.$route.query.path,
            // 年限
            year: this.$route.query.year,
            // 搜索关键字
            keyword: '',
            // 搜索结果
            searchResult: [],
            // 是否搜索
            isSearch: false,
            // 第一分类
            theFirstClass: [],
            // 第二分类
            theSecondClass: {},
            // 默认分类
            defaultClass: '',
            // 第三子类
            theThirdClass: '',
            // 是否显示子类
            isShowChild: false,
            // 选中的数据
            selectList: {},
            // 第一大类名称
            theFirstName: '',
        };
    },
    computed: {
        // 计算总金额
        temptAllPrice() {
            let money = this.allPrice * this.year;
            if (this.frompath && this.frompath === 'application') {
                money = this.allPriceBs;
            }
            return money;
        },
    },
    mounted() {
        // 加载滑动插件
        this.$nextTick(() => {
            let bscrollDomLf = this.$refs.bscrollLf;
            this.aBScroll = new BScroll(bscrollDomLf, {
                mouseWheel: true,
                click: true,
                tap: true,
            });

            let bscrollDomRg = this.$refs.bscrollRg;
            this.aBScroll = new BScroll(bscrollDomRg, {
                mouseWheel: true,
                click: true,
                tap: true,
            });
        });
    },
    watch: {
        // 搜索
        keyword: function() {
            this.searchResult = [];
            if (this.keyword && this.keyword.length > 0) {
                let searchList = this.theSecondClass[this.defaultClass];
                // 搜索方法
                searchList.map(item => {
                    item.children.map(_item => {
                        if (!_item.isSelect) {
                            _item.isSelect = false;
                        }
                        if (_item.productname.includes(this.keyword)) {
                            this.searchResult.push(_item);
                        }
                    });
                });
                this.isSearch = true;
            } else {
                this.isSearch = false;
                this.searchResult = [];
            }
        },
    },
    methods: {
        // 第一步，获取商标第一大类
        getFirstClass: function() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getBsClass').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    // 存储第一大类
                    that.theFirstClass = _data.content.list;
                    // 存储当前默认选中类的key
                    that.defaultClass = that.theFirstClass[0].key;
                    // 暂存当前选中的第二大类
                    that.theSecondClass[that.defaultClass] = _data.content.current;
                    // 需要遍历给每个大类加上isSelect
                    that.theFirstClass.map((item, index) => {
                        item.isSelect = false;
                        if (index === 0) {
                            // 默认选中第一类
                            item.isSelect = true;
                        }
                    });
                    // 如果内存中有数据
                    if (sessionStorage.productClass) {
                        that.readData(JSON.parse(sessionStorage.productClass));
                    }
                }
            });
        },
        // 第二步，切换第一大分类
        switchFirstClass: function(item) {
            const that = this;
            // 遍历，第一大类全部设为false
            that.theFirstClass.map(_item => {
                _item.isSelect = false;
                if (item.key === _item.key) {
                    // 默认选中第一类
                    _item.isSelect = true;
                    // 数据结果太深，强制渲染
                    that.$forceUpdate();
                }
            });
            // 记录当前选中分类的可以
            that.defaultClass = item.key;
            // 清除搜索结果和关键字
            that.keyword = '';
            // 搜索结果
            that.searchResult = [];
            // 如果存在，则不请求拿取数据
            if (that.theSecondClass[that.defaultClass]) {
                return false;
            }
            // 请求加载的时候，显示加载数据
            that.isLoading = true;
            that.$axios
                .post('/index.php?c=App&a=getBsProductService', {
                    bskey: item.key,
                    keyword: item.categorycode,
                    pgroup: '',
                    productid: '',
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        that.theSecondClass[that.defaultClass] = _data.content;
                        that.isLoading = false;
                    }
                })
                .catch(function() {
                    that.isLoading = false;
                });
        },
        // 第三步，切换第二大分类
        switchSecondClass: function(item) {
            const that = this;
            // 保存上次切换
            let temptSelect = that.theThirdClass;
            that.theThirdClass = item.categorycode;
            // 如果是相同一个类
            if (temptSelect === that.theThirdClass) {
                that.isShowChild = !that.isShowChild;
            } else {
                that.isShowChild = true;
            }
        },
        // 选中商标
        selectProduct: function(_item, item1) {
            const that = this;
            // 如果不是读取存储的数据
            if (!item1) {
                _item.isSelect = !_item.isSelect;
            }
            // 数据结果太深，强制渲染
            this.$forceUpdate();
            // 数组重组
            that.buildData(_item, item1);
        },
        // 重组所需数据
        buildData: function(list, item1) {
            const that = this;
            // 设置临时key
            let tempkey;
            let temptValue;
            // 设置value
            let temptDefaultClass = this.defaultClass;
            // 如果是读取存储数据
            if (item1) {
                temptDefaultClass = item1.key;
            }
            // 遍历
            that.theFirstClass.map(item => {
                if (item.key === temptDefaultClass) {
                    that.theFirstName = item.name;
                }
            });
            // 遍历该分类下所有数据
            that.theSecondClass[temptDefaultClass].map(item => {
                item.children.map(_item => {
                    if (_item.productid === list.productid) {
                        tempkey = temptDefaultClass + '_' + item.categorycode + '_' + list.productid;
                        temptValue = this.theFirstName + '_' + item.categorycode + '_' + list.productname;
                    }
                });
            });
            if (list.isSelect) {
                // 如果选中
                that.temtpClass[tempkey] = temptValue;
            } else {
                // 取消选中
                delete that.temtpClass[tempkey];
            }
            // 初始化-清空
            let stuct = {};
            let exts_key = ',';
            let exts_group = ',';
            that.allTypeClass = {};
            that.selectList = {};
            that.applyResult = [];
            // 判断是否有数据
            for (let key in this.temtpClass) {
                let keys = key.split('_');
                let values = this.temtpClass[key].split('_');
                if (exts_key.indexOf(',' + keys[0] + ',') == -1) {
                    //大类不存在
                    let tmp = {
                        categoryName: values[0],
                        detail: {},
                    };
                    stuct[keys[0]] = tmp;
                    that.allTypeClass[values[0]] = [];
                    // 如果一条数据也没
                    exts_key += keys[0] + ',';
                }
                if (exts_group.indexOf(',' + keys[1] + ',') == -1) {
                    //群组不存在
                    exts_group += keys[1] + ',';
                    stuct[keys[0]].detail[keys[1]] = {
                        code: keys[1],
                        products: [],
                    };
                    that.selectList[keys[1]] = [];
                }
                let item = { id: keys[2], name: values[2] };
                that.allTypeClass[values[0]].push(item);
                that.selectList[keys[1]].push(item);
                stuct[keys[0]].detail[keys[1]].products.push(item);
            }
            for (let i in stuct) {
                let tmpObj = {
                    categoryName: stuct[i].categoryName,
                    detail: [],
                };
                for (let j in stuct[i].detail) {
                    tmpObj.detail.push(stuct[i].detail[j]);
                }
                that.applyResult.push(tmpObj);
            }
            // 计算价格
            // 计算大类
            let len = Object.keys(this.allTypeClass).length;
            let bigPrice = 0;
            let bigPriceBs = 0;
            if (len >= 1) {
                bigPrice = (len - 1) * 1200;
                bigPriceBs = (len - 1) * 1500;
            }
            // 计算小类
            let smallArrl = [];
            let smallPrice = 0;
            let smallPriceBs = 0;
            for (let key in this.allTypeClass) {
                smallArrl.push(this.allTypeClass[key].length);
            }
            for (let i = 0; i < smallArrl.length; i++) {
                if (smallArrl[i] > 10) {
                    smallPrice += (smallArrl[i] - 10) * 200;
                    smallPriceBs += (smallArrl[i] - 10) * 150;
                }
            }
            // 总计，无年份
            this.allPrice = bigPrice + smallPrice;
            this.allPriceBs = bigPriceBs + smallPriceBs;
        },
        // 确认
        sureSelect: function() {
            this.$router.push({
                path: this.frompath,
            });
            let _item = {
                content: this.applyResult, // 提交的数据结构
                classType: utils.sortObj(this.allTypeClass, 'asce'), //内容展示的数据结构
                allPrice: this.allPrice, // 点商标新增类别费总价
                allPriceBs: this.allPriceBs, // 商标新增类别费总价
            };
            // 改用本地存储
            // 存储前判断是否有数据
            if (this.applyResult && this.applyResult.length > 0) {
                sessionStorage.productClass = JSON.stringify(_item);
            } else {
                sessionStorage.removeItem('productClass');
            }
        },

        // 如果内存中存储有数据，遍历
        readData: function(_data) {
            const that = this;
            // 遍历存储的数据
            _data.content.map(item => {
                that.theFirstClass.map(item1 => {
                    if (item.categoryName === item1.name) {
                        that.$axios
                            .post('/index.php?c=App&a=getBsProductService', {
                                bskey: item1.key,
                                keyword: item1.categorycode,
                                pgroup: '',
                                productid: '',
                            })
                            .then(function(response) {
                                let _data = response.data;
                                if (_data.errcode == 0) {
                                    that.theSecondClass[item1.key] = _data.content;
                                    item.detail.map(item2 => {
                                        item2.products.map(item3 => {
                                            that.theSecondClass[item1.key].map(item4 => {
                                                item4.children.map(item5 => {
                                                    if (item5.productid === item3.id) {
                                                        item5.isSelect = true;
                                                        that.selectProduct(item5, item1);
                                                        // 数据结果太深，强制渲染
                                                        // item1.isSelect = false;
                                                        that.$forceUpdate();
                                                    }
                                                });
                                            });
                                        });
                                    });
                                }
                            });
                    }
                });
            });
        },
    },
    created() {
        // 获取商标第一大类
        this.getFirstClass();
    },
};
</script>
