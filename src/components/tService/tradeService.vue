<template>
    <div id="tradeService" class="tradeService">
        <div class="tradeService-top" id="scroll_top">
            <!-- <nav-header title="商标服务"></nav-header> -->
            <mt-header title="商标服务" class="header" fixed>
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="t-service">
                <div class="t-service-left">
                    <form action="#" @submit.prevent>
                        <input
                            type="search"
                            placeholder="请输入商标名"
                            v-model="tradeName"
                            autocomplete="off"
                            @keypress="searchGoods($event)"
                            ref="searchInput"
                            id="search"
                        />
                    </form>
                    <div class="service-btn" @click="search()">
                        <img src="../../assets/images/tradeService/icon-search.png" alt />
                        <span>搜索</span>
                    </div>
                </div>

                <!-- <div class="t-service-right" @click="trade()">申请注册</div> -->
            </div>
            <div class="product-list-toptips">
                <a href="javascript:void(0);" @click="goAnchor('注册规则', '1')" class="rule">注册规则</a>
                <span></span>
                <a href="javascript:void(0);" @click="goAnchor('注册指南', '2')" class="guide">注册指南</a>
                <span></span>
                <a href="javascript:void(0);" @click="goAnchor('关于商标', '3')" class="mark">关于商标</a>
            </div>
        </div>

        <div class="service-bot containerView-main" id="con">
            <!-- 查询 -->
            <div class="result" v-show="!resultShow && tradeArr.length != 0">
                <div class="result-tips">
                    <!-- <img src="../../assets/images/tradeService/tips.png" alt> -->
                    <span>商标检索结果仅供参考，不作为商标能否注册的法律依据，具体以商标局官网查询为准。</span>
                </div>
                <div class="result-box">
                    <div class="result-list" v-for="(item, index) in tradeArr" :key="index">
                        <div class="bot-msg">
                            <span class="left">
                                商标名称
                                <!-- <i>:</i> -->
                            </span>
                            <span class="right">{{ item.tmName }}</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                申请人
                                <!-- <i>:</i> -->
                            </span>
                            <span class="right">{{ item.nameZh }}</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                申请时间
                                <!-- <i>:</i> -->
                            </span>
                            <span class="right">{{ item.applyDate }}</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                商品类别
                                <!-- <i>:</i> -->
                            </span>
                            <span class="right">第{{ item.intType }}类</span>
                        </div>
                        <div class="bot-msg">
                            <span class="left">
                                注册号
                                <!-- <i>:</i> -->
                            </span>
                            <span class="right">{{ item.regCode }}</span>
                        </div>
                        <!-- <div class="bot-msg">
              <span class="left">当前状态<i>:</i></span>
              <span class="right"></span>
            </div>-->
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
            tradeName: '',
            productid: '',
            product_name: '',
            resultShow: true,
            tradeArr: [],
            tradePerson: [],
            status: 0,
        };
    },
    created() {
        this.init();
    },
    mounted() {
        // window.addEventListener("scroll", this.showIcon);
    },
    methods: {
        goback() {
            var _this = this;
            if (_this.status == 1) {
                _this.resultShow = true;
                _this.tradeName = '';
                _this.status = 0;
            } else {
                _this.$router.push({
                    path: '/',
                });
            }
        },
        searchGoods(event) {},
        goAnchor(type, num) {
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: this.$route.query.mark,
                    txt_type: num,
                },
            });
            //   var anchor = this.$el.querySelector(type);
            //   let recruit_top = this.$el.querySelector('#scroll_top');
            //   document.getElementById('con').scrollTop = anchor.offsetTop - recruit_top.offsetHeight - 20;
        },
        // 获取产品id,名称
        init() {
            let _this = this;
            _this.mark = _this.$route.query.mark;
            _this.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: _this.mark,
                    p: 1,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.productid = response.data.content.list[0].list[0].id;
                        _this.product_name = response.data.content.list[0].list[0].title;
                        _this.price = response.data.content.list[0].list[0].price;
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
            var _this = this;
            sessionStorage.removeItem('appIds');
            sessionStorage.removeItem('appName');
            sessionStorage.removeItem('appText');
            sessionStorage.removeItem('appPrice');
            sessionStorage.removeItem('appAppPrice');
            sessionStorage.removeItem('appImgcode');
            sessionStorage.removeItem('subject');
            sessionStorage.removeItem('isAgree');
            sessionStorage.removeItem('salesCode');

            this.$router.push({
                path: '/application',
                query: {
                    productid: _this.productid,
                    product_name: _this.product_name,
                    price: _this.price,
                    mark: _this.$route.query.mark,
                },
            });
        },
        // 点击查询商标
        search() {
            let _this = this;
            if (_this.tradeName == '') {
                Toast({
                    message: '请输入品牌名称',
                    duration: 3000,
                });
                return;
            }
            if (!utils.checkFormat(_this.tradeName)) {
                return;
            }
            _this.$axios
                .post('index.php?c=App&a=searchDomain', {
                    mark: 'bs',
                    domain: _this.tradeName,
                    st: 0,
                })
                .then(function(response) {
                    console.log(response);
                    if (response.data.errcode == 0) {
                        _this.search_t = _this.search_txt;
                        _this.status = 1;
                        var contentL = response.data.content.list.map(item => {
                            return {
                                tmName: item.tmName, //商标名称
                                nameZh: item.personInfo.length > 0 ? item.personInfo[0].nameZh : '',
                                applyDate: item.applyDate,
                                intType: item.intType,
                                regCode: item.regCode,
                                nStatus: item.nStatus,
                            };
                        });

                        _this.tradeArr = contentL;

                        // _this.tradeArr = response.data.content.list;

                        _this.tradePerson = response.data.content.list.personInfo;
                        _this.resultShow = false;
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
    border-left: 1px solid #efefef;
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
