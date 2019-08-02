<template>
    <div class="apply-class">
        <nav-header title="申请类别"></nav-header>
        <div class="apply-class-main">
            <div class="left bscroll" ref="bscrollLf">
                <ul class="bscroll-container left-main">
                    <li v-for="item of applyClass" :key="item.key" class="list-item" @click="switchType(item)">
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
                <ul class="bscroll-container right-main">
                    <li v-for="(list, index) in curList" :key="index">
                        <div class="right-main-title" @click.stop="switchCurList(list)">
                            <span
                                class="icons"
                                :class="{
                                    active: temptSelect[list.categorycode] && temptSelect[list.categorycode].length > 0,
                                }"
                            ></span>
                            <label class="text">{{ list.codename }}</label>
                        </div>
                        <ul class="right-main-child" v-show="temptCurList[isChildSelect] && isChildSelect === list.categorycode && isShow">
                            <li v-for="value in temptCurList[isChildSelect]" :key="value.productid" @click="selectProduct(value)">
                                <span class="icons" :class="{ active: value.isSelect }"></span>
                                <label class="text">{{ value.productname }}</label>
                            </li>
                        </ul>
                    </li>
                </ul>
                <p class="loading" v-show="isLoading">
                    正在加载数据...
                </p>
                <!-- <div class="right-saerch" v-show="applyClass && applyClass.length > 0">
          <input type="text" placeholder="搜索商品" />
          <i class="search-icons"></i>
        </div> -->
            </div>
        </div>
        <div class="apply-class-bottom">
            <label v-if="isShowTotal == '' || isShowTotal == null || isShowTotal == undefined">合计:￥{{ temptAllPrice }}元</label>
            <label v-if="isShowTotal == true">合计:￥{{ allPriceBs }}元</label>
            <button @click="sureSelect">确定</button>
        </div>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import * as utils from '@/utils/index';
export default {
    data() {
        return {
            applyClass: [],
            curList: [],
            curChildList: [],
            isLoading: false,
            // 大类选中
            classSelect: '',
            // 大类名称
            className: '',
            // 暂存当前子类选中
            isChildSelect: '',
            // 暂存当前子类数据
            temptCurList: {},
            isShow: false,
            // 暂存选中数据
            temptSelect: {},
            // itemArr: [],
            allTypeClass: {},
            // allItemArr: [],
            allPrice: 0,
            // 商标的总额
            allPriceBs: 0,
            //暂存选中的class
            temtpClass: {},
            //重组提交数据
            applyResult: [],
            isShowTotal: this.$store.state.selectClass.isShowTotal,
            year: this.$route.query.year,
        };
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SELECT_CLASS]]),
        ...mapGetters({
            getSelectClass: [GetterTypes.GET_SELECT_CLASS],
        }),
        temptAllPrice() {
            var money = this.allPrice * this.year;
            return money;
        },
    },
    mounted() {
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
    methods: {
        ...mapMutations([[MutationTypes.SET_SELECT_CLASS]]),
        ...mapMutations({
            [MutationTypes.SET_SELECT_CLASS]: MutationTypes.SET_SELECT_CLASS,
        }),
        getApplyClass: function() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getBsClass').then(function(response) {
                that.applyClass = response.data.content.list;
                // 遍历添加
                that.applyClass.map(function(item) {
                    let memoryData = that.getSelectClass.content;
                    if (memoryData && memoryData.length > 0) {
                        memoryData.map(function(item1) {
                            if (item.name === item1.categoryName) {
                                item1.detail.map(function(item2) {
                                    that.switchType(item, item2);
                                });
                                that.classSelect = item.key;
                                that.className = item.name;
                            }
                        });
                    } else {
                        if (item.key === '01') {
                            item.isSelect = true;
                            that.classSelect = item.key;
                            that.className = item.name;
                        } else {
                            item.isSelect = false;
                        }
                    }
                });
                that.curList = response.data.content.current;
            });
        },
        // 切换分类
        switchType: function(item, item2) {
            const that = this;
            that.applyClass.map(function(_item) {
                _item.isSelect = false;
            });
            if (!item2) {
                item.isSelect = true;
            } else {
                item.isSelect = false;
            }
            // 数据结果太深，强制渲染
            that.$forceUpdate();
            // 显示加载数据
            that.isLoading = true;
            that.curList = [];
            // 记录当前选中大类
            that.classSelect = item.key;
            that.className = item.name;
            that.$axios
                .post('/index.php?c=App&a=getBsProductService', {
                    bskey: item.key,
                    keyword: item.categorycode,
                    pgroup: '',
                    productid: '',
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        if (item2) {
                            _data.content.map(function(item3) {
                                if (item3.categorycode === item2.name) {
                                    that.switchCurList(item3, item2, item);
                                }
                            });
                        } else {
                            that.curList = _data.content;
                        }

                        that.isLoading = false;
                    }
                })
                .catch(function() {
                    that.isLoading = false;
                });
        },
        // 切换小类
        switchCurList: function(item, item2, item4) {
            const that = this;
            if (that.isChildSelect === item.categorycode) {
                that.isShow = !that.isShow;
            } else {
                that.isShow = true;
            }
            if (that.temptSelect[item.categorycode]) {
                that.itemArr = that.temptSelect[item.categorycode];
            } else {
                that.itemArr = [];
            }
            if (that.temptCurList[item.categorycode]) {
                that.isChildSelect = item.categorycode;
                return false;
            }
            that.$axios
                .post('/index.php?c=App&a=getBsProductService', {
                    bskey: that.classSelect,
                    keyword: '',
                    pgroup: item.categorycode,
                    productid: '',
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        let temptdata = _data.content[0].children;
                        temptdata.map(function(_item) {
                            _item.isSelect = false;
                            if (item2) {
                                item2.products.map(function(item3) {
                                    if (_item.productid === item3.id) {
                                        _item.isSelect = true;
                                        that.isChildSelect = item2.name;
                                        that.selectProduct(_item, item2, item4);
                                        that.temptCurList[item.categorycode] = temptdata;
                                    }
                                });
                            }
                        });
                        if (!item2) {
                            that.isChildSelect = item.categorycode;
                            that.temptCurList[item.categorycode] = temptdata;
                        }
                    }
                });
        },
        // 选中商标
        selectProduct: function(_item, item2, item3) {
            const that = this;
            if (!item2) {
                _item.isSelect = !_item.isSelect;
                // 数据结果太深，强制渲染
                this.$forceUpdate();
            } else {
                that.classSelect = item3.key;
                that.className = item3.name;
            }
            // 拼凑临时key，value
            let tempkey = this.classSelect + '_' + this.isChildSelect + '_' + _item.productid;
            let temptValue = this.className + '_' + that.isChildSelect + '_' + _item.productname;
            // 新版写法
            if (_item.isSelect) {
                // 如果选中
                that.temtpClass[tempkey] = temptValue;
            } else {
                // 未选中
                delete that.temtpClass[tempkey];
            }
            // 数据重组
            // 初始化-清空
            var stuct = {};
            var exts_key = ',';
            var exts_group = ',';
            that.allTypeClass = {};
            that.temptSelect = {};
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
                        name: keys[1],
                        products: [],
                    };
                    that.temptSelect[keys[1]] = [];
                }
                let item = { id: keys[2], name: values[2] };
                that.allTypeClass[values[0]].push(item);
                that.temptSelect[keys[1]].push(item);
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
                path: this.$route.query.path,
            });
            let _item = {
                content: this.applyResult, // 提交的数据结构
                classType: utils.sortObj(this.allTypeClass, 'asce'), //内容展示的数据结构
                allPrice: this.temptAllPrice, // 点商标新增类别费总价
                allPriceBs: this.allPriceBs, // 商标新增类别费总价
            };
            this[MutationTypes.SET_SELECT_CLASS](_item);
        },
    },
    created() {
        this.getApplyClass();
    },
};
</script>
