<template>
    <div id="tradeService" class="tradeService">
        <div class="tradeService-top" id="scroll_top">
            <mt-header title="商标" class="header" fixed>
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="t-service">
                <div class="t-service-left">
                    <form action="#" @submit.prevent class="trade-input">
                        <input
                            type="search"
                            placeholder="请输入商标名"
                            v-model="tradeName"
                            autocomplete="off"
                            ref="searchInput"
                            id="search"
                            v-on:keyup.enter="search()"
                        />
                    </form>
                    <div class="service-btn" @click="search()">
                        <img src="../../assets/images/tradeService/icon-search.png" alt />
                        <span>搜索</span>
                    </div>
                </div>
            </div>
            <div class="product-list-toptips">
                <a href="javascript:void(0);" @click="goAnchor('商标法', '1')" class="rule">商标法</a>
                <!-- <span></span>
                <a href="javascript:void(0);" @click="goAnchor('注册指南', '2')" class="guide">注册指南</a>
                <span></span> -->
                <a href="javascript:void(0);" @click="goAnchor('关于商标', '3')" class="mark">关于商标</a>
            </div>
        </div>
        <div class="service-bot riven-bot" id="con">
            <!-- 查询 -->
            <div class="result" v-show="!resultShow && tradeArr.length != 0">
                <div class="result-tips">
                    <span>商标检索结果仅供参考，不作为商标能否注册的法律依据，具体以商标局官网查询为准。</span>
                </div>
                <div class="result-box">
                    <div class="result-list" v-for="(item, index) in tradeArr" :key="index">
                        <div class="bot-msg">
                            <span class="left">
                                商标名称
                            </span>
                            <span class="right">{{ item.tmName }}</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                申请人
                            </span>
                            <span class="right">{{ item.nameZh }}</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                申请时间
                            </span>
                            <span class="right">{{ item.applyDate }}</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                商品类别
                            </span>
                            <span class="right">第{{ item.intType }}类</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                注册号
                            </span>
                            <span class="right">{{ item.regCode }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-msg" style="font-size: 0.3rem;" v-show="!resultShow && tradeArr.length == 0">未查询到相关的商标信息</div>
        </div>
        <div class="trade-btn" @click="trade()">
            <span>申请注册</span>
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
            // 搜索关键字
            tradeName: '',
            // 产品id
            productid: '',
            // 产品名
            product_name: '',
            // 是否显示搜索结果
            resultShow: true,
            // 搜索结果
            tradeArr: [],
            // 页码
            status: 0,
            // 注册费
            price: '',
        };
    },
    created() {
        this.init();
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
    methods: {
        goback() {
            const that = this;
            if (that.status == 1) {
                that.resultShow = true;
                that.tradeName = '';
                that.status = 0;
            } else {
                that.$router.push({
                    path: '/',
                });
            }
            history.pushState(null, null, document.URL);
        },
        goAnchor(type, num) {
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: this.$route.query.mark,
                    txt_type: num,
                },
            });
        },
        // 获取产品id,名称
        init() {
            const that = this;
            that.mark = that.$route.query.mark;
            that.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: that.mark,
                    p: 1,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        that.productid = response.data.content.list[0].list[0].id;
                        that.product_name = response.data.content.list[0].list[0].title;
                        that.price = response.data.content.list[0].list[0].price;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        // 点击申请注册
        trade() {
            const that = this;
            sessionStorage.formUrlOne = '/application';
            this.$router.push({
                path: '/application',
                query: {
                    productid: that.productid,
                    product_name: that.product_name,
                    price: that.price,
                    mark: that.$route.query.mark,
                },
            });
        },
        // 点击查询商标
        search() {
            const that = this;
            if (that.tradeName == '' || !that.tradeName) {
                Toast({
                    message: '请输入商标名',
                    duration: 3000,
                });
                return;
            }
            if (!utils.checkFormat(that.tradeName)) {
                return;
            }
            // 设置失焦，收回软键盘
            utils.inputBlur(this.$refs.searchInput);
            that.$axios
                .post('index.php?c=App&a=searchDomain', {
                    mark: 'bs',
                    domain: that.tradeName,
                    st: 0,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        that.status = 1;
                        // 结果数据重组
                        let contentL = response.data.content.list.map(item => {
                            return {
                                tmName: item.tmName, //商标名称
                                nameZh: item.personInfo.length > 0 ? item.personInfo[0].nameZh : '',
                                applyDate: item.applyDate,
                                intType: item.intType,
                                regCode: item.regCode,
                                nStatus: item.nStatus,
                            };
                        });
                        that.tradeArr = contentL;
                        that.resultShow = false;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.trade-input {
    flex: auto;
    padding-right: 0.4rem;
}
input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none; //此处去掉默认的小×
}
.tradeService .tradeService-top {
    height: 3.72rem;
}
.trade-btn {
    padding: 17px 0;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #f1f1f1;
    background: #fff;
    span {
        color: #fff;
        font-size: 0.3rem;
        background: linear-gradient(131deg, rgba(15, 179, 254, 1) 0%, rgba(0, 134, 255, 1) 100%);
        display: inline-block;
        border-radius: 0.5rem;
        padding: 0.2rem 1rem;
    }
}
.service-btn {
    span {
        color: #999 !important;
    }
    img {
        margin-right: 0.1rem;
        width: 0.4rem;
    }
}
.result-tips {
    margin-top: 0.4rem;
    margin-bottom: 0;
}
.no-msg {
    margin-top: 0.4rem;
}
.containerView-main {
    padding-bottom: 5.5rem !important;
    margin-top: 3.72rem !important;
}
.product-list-toptips {
    top: 0rem !important;
}
.product-list-toptips {
    margin: 0 0.72rem;
    span {
        display: block;
        width: 0.02rem;
        height: 0.22rem;
        background-color: rgba(0, 0, 0, 0.175);
    }
}
</style>
