<template>
    <div id="tradeService" class="tradeService">
        <div class="tradeService-top" id="scroll_top">
            <!-- <div class="recruit_bg"></div> -->

            <!-- <nav-header title="域名服务"></nav-header> -->
            <mt-header title="域名" class="header" fixed>
                <mt-button slot="left" icon="back" @click="goback"></mt-button>
                <mt-button slot="right"></mt-button>
            </mt-header>
            <div class="t-service">
                <!-- <div class="t-service-left"> -->
                <form action="#" @submit.prevent class="form-input">
                    <input
                        type="search"
                        placeholder="请输入域名"
                        v-model="tradeName"
                        autocomplete="off"
                        @keypress="searchGoods($event)"
                        ref="searchInput"
                        id="search"
                    />
                </form>
                <!-- <div class="service-btn domain">
            <img src="../../assets/images/tradeService/select.png" alt />
            <select v-model="typeN" @change="choiceType(typeN)">
              <option
                :value="item.suffix"
                v-for="(item, index) of suffix"
                :key="index"
                >{{ item.suffix }}</option
              >
            </select>
        </div>-->
                <div class="t-service-right" @click="search()">
                    <img src="../../assets/images/trademark/search-news.png" alt />
                    <span>搜索</span>
                </div>
                <!-- </div> -->
            </div>
            <!-- <div class="product-list-toptips">
        <a href="javascript:void(0);" @click="goAnchor('#rule')" class="rule"
          >注册规则</a
        >
        <a
          href="javascript:void(0);"
          @click="goAnchor('#process')"
          class="guide"
          >注册流程</a
        >
        <a
          href="javascript:void(0);"
          @click="goAnchor('#advantage')"
          class="mark"
          >关于域名</a
        >
      </div>-->
        </div>

        <div class="service-bot containerView-main" id="con" v-if="!possible">
            <!-- 未查询 -->
            <div class="instial">
                <div class="advantage" v-for="item in productArr" :key="item.id">
                    <p>{{ item.title }}</p>
                    <span>{{ item.summary }}</span>
                </div>
            </div>
            <!-- 查询 -->
            <div class="result"></div>
        </div>
        <!-- 搜索展示内容 -->
        <div class="content containerView-main" v-if="possible">
            <!-- <div class="content" > -->
            <div
                class="content_list"
                @click="fill_information(item.domain, item.reg_title, item.price)"
                v-for="(item, index) in getProd"
                :key="index"
            >
                <!-- <div class="content_list"> -->
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
                <!-- <div class="list_right">
          <span>加入清单</span>
        </div>-->
            </div>
            <!-- <div class="content_list" v-else>
        <div class="list_left">
          <div class="list_name">
            <span class="name_blue">{{ search_t }}</span>
            <span class="can_or_not not">{{ recruit }}</span>
          </div>
          <div class="pirce">￥{{ price }}元/年</div>
        </div>
      </div>-->
        </div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { setTimeout } from 'timers';
import * as utils from '@/utils/index';
export default {
    name: 'tradeService',

    data() {
        return {
            tradeName: '',
            suffix: [],
            typeN: '.com',
            typeName: '',
            recruit: '',
            possible: false,
            possible_t: false,
            search_txt: '',
            search_t: '',
            reg: '',
            price: '',
            productid: '',
            product_name: '',
            status: 0,
            productArr: [],
            getProd: [],
        };
    },
    created() {
        this.getProduct();
        this.init();
    },
    mounted() {
        // window.addEventListener("scroll", this.showIcon);
    },
    methods: {
        goback() {
            var _this = this;
            //   sessionStorage.removeItem('tradeName');
            //   sessionStorage.removeItem('getProd');
            if (_this.status == 1) {
                _this.possible = false;
                _this.tradeName = '';
                _this.status = 0;
                sessionStorage.removeItem('tradeName');
                sessionStorage.removeItem('getProd');
                _this.getProduct();
            } else {
                _this.$router.push({
                    path: '/',
                });
            }
        },
        searchGoods(event) {},
        goAnchor(type) {
            var anchor = this.$el.querySelector(type);
            let recruit_top = this.$el.querySelector('#scroll_top');
            document.getElementById('con').scrollTop = anchor.offsetTop - recruit_top.offsetHeight - 20;
        },
        init() {
            let _this = this;

            if (sessionStorage.tradeName) {
                // Indicator.open({
                //   text: '加载中...',
                //   spinnerType: 'fading-circle',
                // });
                _this.tradeName = sessionStorage.tradeName;
                if (sessionStorage.getProd) {
                    _this.getProd = JSON.parse(sessionStorage.getProd);
                }
                _this.possible = true; //显示查询结果
                _this.status = 1;

                // setTimeout(function() {
                //   Indicator.close();
                // }, 600);

                // _this.search();
            }
        },
        getProduct() {
            let _this = this;
            //   if (!sessionStorage.tradeName) {
            _this.mark = _this.$route.query.mark;
            _this.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: _this.mark,
                    p: 1,
                })
                .then(function(response) {
                    //   console.log(response.data.content.list[0].list);
                    if (response.data.errcode == 0) {
                        // _this.productid = response.data.content.list[0].list[0].id;
                        // _this.product_name = response.data.content.list[0].list[0].title;
                        // _this.suffix = response.data.content.list[0].list;
                        _this.productArr = response.data.content.list[0].list;
                        // sessionStorage.productArr = JSON.stringify(_this.productArr);
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
            //   }
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
            console.log(productDomain);
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
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('year');
            sessionStorage.removeItem('price');
            sessionStorage.removeItem('all_price');
            sessionStorage.removeItem('subject');
            sessionStorage.removeItem('pageNum');
            sessionStorage.removeItem('isAgree');
            sessionStorage.removeItem('salesCode');
            sessionStorage.removeItem('mark');

            _this.$router.push({
                path: '/domainMsg',
                query: {
                    name: domain,
                    price: price,
                    productid: productId,
                    product_name: productName,
                    mark: this.$route.query.mark,
                },
            });
        },
        //修改类型
        choiceType(val) {},
        // 点击查询商标
        search() {
            let _this = this;
            sessionStorage.removeItem('year');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('price');
            sessionStorage.removeItem('all_price');
            sessionStorage.removeItem('formUrl');
            sessionStorage.removeItem('subject');

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
            _this.getProd = [];
            sessionStorage.tradeName = _this.tradeName;
            //   for (var i = 0; i < _this.productArr.length; i++) {
            _this.$axios.all([
                _this.$axios.post('index.php?c=App&a=searchDomain', {
                    mark: 'domain',
                    domain: _this.tradeName + _this.productArr[0].suffix,
                    st: 0,
                    suffix: _this.productArr[0].suffix,
                }),
                _this.$axios.post('index.php?c=App&a=searchDomain', {
                    mark: 'domain',
                    domain: _this.tradeName + _this.productArr[1].suffix,
                    st: 0,
                    suffix: _this.productArr[1].suffix,
                }),
                _this.$axios.post('index.php?c=App&a=searchDomain', {
                    mark: 'domain',
                    domain: _this.tradeName + _this.productArr[2].suffix,
                    st: 0,
                    suffix: _this.productArr[2].suffix,
                }),
                _this.$axios.post('index.php?c=App&a=searchDomain', {
                    mark: 'domain',
                    domain: _this.tradeName + _this.productArr[3].suffix,
                    st: 0,
                    suffix: _this.productArr[3].suffix,
                }),
            ]);

            if (_this.tradeName == '') {
                Toast({
                    message: '请输入域名',
                    duration: 3000,
                });
                return;
            }
            // if (!_this.sendSearchCheck()) {
            //     return;
            // }
            _this.getProd = [];
            sessionStorage.tradeName = _this.tradeName;
            //   for (var i = 0; i < _this.productArr.length; i++) {
            _this.$axios
                .all([
                    _this.$axios.post('index.php?c=App&a=searchDomain', {
                        mark: 'domain',
                        domain: _this.tradeName + _this.productArr[0].suffix,
                        st: 0,
                        suffix: _this.productArr[0].suffix,
                    }),
                    _this.$axios.post('index.php?c=App&a=searchDomain', {
                        mark: 'domain',
                        domain: _this.tradeName + _this.productArr[1].suffix,
                        st: 0,
                        suffix: _this.productArr[1].suffix,
                    }),
                    _this.$axios.post('index.php?c=App&a=searchDomain', {
                        mark: 'domain',
                        domain: _this.tradeName + _this.productArr[2].suffix,
                        st: 0,
                        suffix: _this.productArr[2].suffix,
                    }),
                    _this.$axios.post('index.php?c=App&a=searchDomain', {
                        mark: 'domain',
                        domain: _this.tradeName + _this.productArr[3].suffix,
                        st: 0,
                        suffix: _this.productArr[3].suffix,
                    }),
                ])

                .then(
                    _this.$axios.spread(function(responseOne, responseTwo, responseThree, responseFour) {
                        //   console.log(responseOne,responseTwo,responseThree,responseFour)
                        if (
                            responseOne.data.errcode == 0 &&
                            responseTwo.data.errcode == 0 &&
                            responseThree.data.errcode == 0 &&
                            responseFour.data.errcode == 0
                        ) {
                            _this.possible = true; //显示查询结果
                            _this.status = 1;
                            _this.typeName = _this.typeN;

                            _this.getProd.push(responseOne.data.content);
                            _this.getProd.push(responseTwo.data.content);
                            _this.getProd.push(responseThree.data.content);
                            _this.getProd.push(responseFour.data.content);

                            sessionStorage.getProd = JSON.stringify(_this.getProd);

                            if (_this.reg == 1) {
                                _this.possible_t = true;
                            } else {
                                _this.possible_t = false;
                            }
                        } else {
                            _this.search_t = response.data.content.domain;

                            Toast({
                                message: '网络异常，请重新搜索',
                                duration: 3000,
                            });
                        }
                    })
                )
                .catch(function(error) {});
            //   }
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
