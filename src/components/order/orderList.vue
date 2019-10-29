<template>
    <div class="order">
        <!-- title -->
        <nav-header title="全部订单" @click="goback"></nav-header>
        <!-- 导航分类 -->
        <nar-list></nar-list>
        <!-- 订单列表 -->
        <div
            class="order-content containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="10"
        >
            <div class="order-main" v-if="orderList && orderList.length > 0">
                <div class="order-main-list" id="orderList" v-for="(item, index) in orderList" :key="index">
                    <div class="order-main-list-title">
                        <span class="list-jid">订单号:{{ item.order_no }}</span>
                        <span class="list-jid">{{ item.status_name }}</span>
                        <!-- <span class="list-status" :class="{ 'list-status-suc': item.status_name == '已完成' }">{{ item.status_name }}</span> -->
                    </div>
                    <p class="list-content-tips" :class="{ 'blue-word': item.status == 2 }" v-if="item.notice_msg && item.status != 4">
                        {{ item.notice_msg }}
                    </p>
                    <div class="list-content" @click="viewDeatil(item)">
                        <div class="list-content-list" v-for="(list, n) in item.items" :key="n">
                            <!-- <div class="list-content-list-tips">
                                <p class="list-content-left-type">{{ list.name }}</p>
                            </div> -->
                            <div class="list-content-left-bot">
                                <div class="list-content-left">
                                    <p class="list-content-left-title">
                                        <span class="pro-mark">{{ list.product_name }}</span>
                                        {{ list.keyword }}
                                    </p>
                                    <span class="mid-classes" v-if="list.product_mark == 'bs'">第{{ list.classes }}类</span>
                                    <!-- 注册类型：续费、新注 -->
                                    <div class="list-content-right f_c_blue" v-if="list.feetype == 'Z'">
                                        注册
                                    </div>
                                    <div v-else class="list-content-right f_c_blue">续费</div>
                                </div>
                                <div class="list-content-left-other">
                                    <div class="list-cont-l">
                                        <span class="list-content-left-title"
                                            >注册费 (￥{{ parseInt(list.price) }}
                                            <span v-if="list.product_name != '商标'">/年 x {{ list.year }}年</span> )
                                        </span>
                                        <span class="list-content-right"> ￥{{ (list.price * list.year) | numToInt }} </span>
                                        <!-- <span class="list-content-right"> ￥{{ parseInt(list.price) * list.year }} </span> -->
                                    </div>
                                    <div class="list-cont-l" v-if="parseInt(list.fee_other) != 0">
                                        <span class="list-content-left-title" v-if="list.product_name != '商标'">
                                            新增类别费
                                        </span>
                                        <span class="list-content-left-title" v-if="list.product_name == '商标'">
                                            增加商品服务项
                                        </span>
                                        <span class="list-content-right"> ￥{{ list.fee_other | numToInt }} </span>
                                    </div>
                                    <div class="list-cont-l" v-if="parseInt(list.fee_verify) != 0 && list.product_name != '商标'">
                                        <span class="list-content-left-title">
                                            审核费
                                        </span>
                                        <span class="list-content-right"> ￥{{ list.fee_verify | numToInt }} </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="list-bottom list-btn list-btn-cause"
                                @click.stop="
                                    cause(list.notice_title, list.notice_msg, list.problem_next_do, list.id, list.product_mark, item)
                                "
                                v-if="list.notice_title"
                            >
                                <span class="list-bot-left"> 原因：{{ list.notice_title }} </span>
                                <div class="list-bot-right">
                                    <span>
                                        查看明细
                                    </span>
                                    <img src="../../assets/images/user/advance.png" alt="" />
                                </div>
                            </div>
                            <div class="list-bottom list-btn" v-if="item.status == '4' && getIsSelect.status !== 5">
                                <!-- <div class="f_tar list-bottom-box list-finish" v-if="getIsSelect.status === 5">
                                    <button class="list-bottom-btn" @click.stop="toEvaluate(item.order_no)">
                                        评价
                                    </button>
                                </div> -->
                                <div class="f_tar list-bottom-box list-finish">
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="
                                            list.product_mark == 'tmd' ||
                                                list.product_mark == 'dzp' ||
                                                list.product_mark == 'dct' ||
                                                list.product_mark == 'domain' ||
                                                list.product_mark == 'ecweb'
                                        "
                                        @click.stop="renewalfee(list.product_mark, list.id, item.order_no)"
                                    >
                                        续费
                                    </button>
                                    <!-- <button
                                        class="list-bottom-btn"
                                        v-if="item.is_invoice == '0'"
                                        @click.stop="applyInvoice(item.order_no, item.total)"
                                    >
                                        发票
                                    </button>
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="item.is_invoice == '1'"
                                        @click.stop="checkInvoice(item.order_no)"
                                    >
                                        查看发票
                                    </button>
                                    <button class="list-bottom-btn" v-if="item.is_contract == '0'" @click.stop="applyCont(item.order_no)">
                                        合同
                                    </button>
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="item.is_contract == '1'"
                                        @click.stop="checkCont(item.order_no)"
                                    >
                                        查看合同
                                    </button> -->
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="list.product_mark == 'tmd' || list.product_mark == 'bs' || list.product_mark == 'dzp'"
                                        @click.stop="goCertificate(list.product_mark, list.keyword)"
                                    >
                                        证书
                                    </button>

                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="
                                            list.product_mark == 'tmd' ||
                                                list.product_mark == 'dzp' ||
                                                list.product_mark == 'dct' ||
                                                list.product_mark == 'domain' ||
                                                list.product_mark == 'ecweb'
                                        "
                                        @click.stop="filing(item.order_no, list.keyword, list.is_icp)"
                                    >
                                        备案
                                    </button>
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="
                                            list.product_mark == 'tmd' ||
                                                list.product_mark == 'dzp' ||
                                                list.product_mark == 'dct' ||
                                                list.product_mark == 'domain'
                                        "
                                        @click.stop="viewDns(list.keyword, item.order_no)"
                                    >
                                        开通
                                    </button>
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="list.product_mark == 'tmd'"
                                        @click.stop="viewNotice(list.product_mark)"
                                    >
                                        公示
                                    </button>
                                    <button
                                        class="list-bottom-btn list-bottom-btn-oper"
                                        v-if="
                                            list.product_mark == 'tmd' ||
                                                list.product_mark == 'dzp' ||
                                                list.product_mark == 'dct' ||
                                                list.product_mark == 'domain'
                                        "
                                        @click.stop="goProductCode(list.keyword)"
                                    >
                                        二维码
                                    </button>
                                    <!-- <button
                                        class="list-bottom-btn"
                                        v-if="list.product_mark == 'tmd'"
                                        @click.stop="applyCont(item.order_no)"
                                    >
                                        转让
                                    </button> -->
                                    <!-- <button class="list-bottom-btn list-bottom-gray" v-if="item.is_refund == 1" @click="refund(item.order_no)">
                                        申请退款
                                    </button>
                                    <button
                                        class="list-bottom-btn list-bottom-gray"
                                        v-if="item.is_refund == 2"
                                        @click="refundDetail(item.order_no)"
                                    >
                                        退款详情
                                    </button> -->
                                </div>
                            </div>
                        </div>
                        <div class="list-bottom list-btn" v-if="item.status == '4' && getIsSelect.status === 5">
                            <div class="f_tar list-bottom-box list-finish" v-if="getIsSelect.status === 5">
                                <button class="list-bottom-btn" @click.stop="toEvaluate(item.order_no)">
                                    评价
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="list-money">
                        <!-- {{index}}
                        {{item.items}} -->
                        <span
                            >合计:￥<span class="price">{{ item.total }}</span></span
                        >
                    </div>
                    <div class="list-bottom" v-if="item.status == 1">
                        <div class="f_tar list-bottom-box">
                            <button class="list-bottom-btn list-bottom-gray" @click="cancel(item.order_no)">
                                删除
                            </button>
                            <button
                                class="list-bottom-btn"
                                v-if="item.need_material === 0"
                                @click="paly(item.order_no, item.total, item.created_time)"
                            >
                                付款
                            </button>
                            <!-- <button
                                @click="addInfor(item)"
                                class="list-bottom-btn"
                                v-if="parseInt(item.status) !== 1 && parseInt(item.need_material) === 1"
                            >
                                补充资料
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- 暂无数据 -->
            <blankPage v-else></blankPage>
            <!-- 加载更多 -->
            <div class="load-more" v-show="moreLoading || allLoaded">
                <p v-show="moreLoading" class="load-more-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                </p>
                <p class="load-more-no" v-show="allLoaded">已加载全部</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import $ from 'jquery';
import { clearSession } from '@/utils/index';
export default {
    inject: ['reload'],
    name: 'order',
    data() {
        return {
            // 订单列表
            orderList: [],
            // 当前分页
            page: 1,
            // 是否加载更多加载中
            moreLoading: false,
            // 是否已加载全部
            allLoaded: false,
            hasActive: -1, //按钮弹出手柄
            created_time: '', //下单时间
        };
    },
    created() {
        //清除内存
        clearSession();
        // sessionStorage.removeItem('playState');
        if (this.$route.query.token) {
            sessionStorage.token = this.$route.query.token;
            this.$router.push({
                path: '/orderList',
            });
        }
        const that = this;
        that.setTypeList();
        that.getOrderList(that.getIsSelect.status, that.page);
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
    watch: {
        getIsSelect: function() {
            this.orderList = [];
            this.page = 1;
            this.allLoaded = false;
            this.moreLoading = false;
            this.getOrderList(this.getIsSelect.status, this.page);
        },
        orderList() {
            // let that = this;
            // that.$nextTick(()=>{
            //     for(let i=0;i<that.orderList.length;i++){
            //         if(!that.orderList.showMore&&that.orderList.showMore!=false){
            //             that.$set(that.orderList,'showMore',false);
            //         }
            //         // that.$set(that.orderList,'showList',false);
            //         let len=$("#orderList .list-bottom").eq(i).find('button').length;
            //         if(len>3){
            //             that.orderList[i].showMore=true;
            //             let itemLen= $("#orderList .box_item").eq(i).find('button').length;
            //             len=len-itemLen;
            //             $("#orderList .list-bottom-box").eq(i).find('button').eq(len-3).prevAll('button').addClass('box_item_list');
            //             for(let j=3;j<len;j++){
            //                 let txt= $("#orderList .list-bottom-box").eq(i).find('button').eq(j-3);
            //                 $("#orderList .box_item").eq(i).append(txt);
            //             }
            //         }
            //         if($("#orderList .box_item").eq(i).find('button').length>0){
            //             that.orderList[i].showMore=true;
            //         }
            //     }
            // })
        },
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_IS_SELECT]]),
        ...mapGetters({
            getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
        }),
        // 点击更多原因
        cause(tilS, msgS, nextDoS, id, mark, item) {
            let confirmBtn = true;
            let cancleBtn = true;
            // if (noticeS == '') {
            //     confirmBtn = false;
            //     cancleBtn = false;
            // }
            if (nextDoS.length > 0) {
                if (nextDoS.length == 1) {
                    cancleBtn = false;
                    MessageBox.confirm('', {
                        title: tilS,
                        message: msgS,
                        confirmButtonText: nextDoS[0].name,
                        showConfirmButton: confirmBtn,
                        showCancelButton: cancleBtn,
                    }).then(action => {
                        this.doOperation(id, mark, nextDoS[0].key, item);
                    });
                }
                if (nextDoS.length == 2) {
                    MessageBox.confirm('', {
                        title: tilS,
                        message: msgS,
                        confirmButtonText: nextDoS[0].name,
                        cancelButtonText: nextDoS[1].name,
                        showConfirmButton: confirmBtn,
                        showCancelButton: cancleBtn,
                    })
                        .then(action => {
                            this.doOperation(id, mark, nextDoS[0].key, item);
                        })
                        .catch(err => {
                            if (err == 'cancel') {
                                //取消的回调
                                this.doOperation(id, mark, nextDoS[1].key, item);
                            }
                        });
                }
            } else {
                confirmBtn = false;
                cancleBtn = false;
                MessageBox.confirm('', {
                    title: tilS,
                    message: msgS,
                    showConfirmButton: confirmBtn,
                    showCancelButton: cancleBtn,
                });
            }
        },
        //订单弹窗操作
        doOperation(id, mark, key, item) {
            if (key != 'do_change') {
                sessionStorage.proEditId = id;
            }
            switch (key) {
                //补充资料
                case 'do_material':
                    this.addInfor(item);
                    break;
                //修改注册名称
                case 'do_change':
                    this.changeName(id, mark);
                    break;
                //申请复审
                case 'do_recheck':
                    break;
                // 实名
                case 'do_realname':
                    this.verifyReal(item.corpid);
                    break;
                default:
                    this.$router.push({
                        //跳转首页
                        path: '/',
                    });
                    break;
            }
        },
        //实名验证
        verifyReal(id) {
            this.$router.push({
                path: '/realName',
                query: {
                    id: id,
                    path: this.$route.path,
                },
            });
        },
        // 修改注册名称
        changeName(id, mark) {
            let path;
            if (mark === 'tmd') {
                path = '/productlist';
            } else if (mark === 'dzp') {
                path = '/recruit';
            } else if (mark === 'dct') {
                path = '/restaurant';
            }
            // 跳转
            if (path) {
                this.$router.push({
                    path: path,
                    query: {
                        mark: mark,
                    },
                });
                // 保存换词id
                sessionStorage.setItem('changeId', id);
            }
        },
        //显示更多按钮
        isShowList(i) {
            $('#orderList .box_item').removeClass('active');
            if (this.hasActive == i) {
                $('#orderList .box_item')
                    .eq(i)
                    .removeClass('active');
                this.hasActive = -1;
                return;
            } else {
                $('#orderList .box_item')
                    .eq(i)
                    .addClass('active');
            }
            this.hasActive = i;
        },
        //申请合同
        applyCont(ids) {
            this.$router.push({
                path: '/contract',
            });
            let order_nos = ids.split(); //字符串转数组，统一操作
            sessionStorage.order_nos = JSON.stringify(order_nos);
        },
        //备案
        filing(ids, keyword, is_icp) {
            if (is_icp == 0) {
                this.$router.push({
                    path: '/filing',
                    query: {
                        id: ids,
                        domain: keyword,
                    },
                });
            } else {
                this.$router.push({
                    path: '/filing',
                    query: {
                        id: ids,
                        domain: keyword,
                        is_icp: 1,
                    },
                });
            }
            // else {
            //     this.$router.push({
            //         path: '/filingRecord',
            //         query: {
            //             id: ids,
            //             domain: keyword,
            //         },
            //     });
            // }
        },
        // 去评价
        toEvaluate: function(order_no) {
            this.$router.push({
                path: '/evaluate',
                query: {
                    order_no: order_no,
                },
            });
        },
        // 查看合同详情
        checkCont(ids) {
            this.$router.push({
                path: '/contDetail',
                query: {
                    id: ids,
                },
            });
        },
        // 申请发票
        applyInvoice(ids, total) {
            this.$router.push({
                path: '/issueInvoice',
                query: {
                    id: ids,
                    money: total,
                },
            });
        },
        // 查看发票
        checkInvoice(ids) {
            this.$router.push({
                path: '/invDetail',
                query: {
                    id: ids,
                },
            });
        },
        // 申请退款
        refund(ids) {
            this.$router.push({
                path: '/refund',
                query: {
                    id: ids,
                },
            });
        },
        //退款详情
        refundDetail(ids) {
            this.$router.push({
                path: '/refunddetail',
                query: {
                    id: ids,
                },
            });
        },
        //续费
        renewalfee(mark, id, order_no) {
            let path;
            switch (mark) {
                case 'tmd':
                    path = '/fillProduct';
                    break;
                case 'dzp':
                    path = '/dzpinfor';
                    break;
                case 'dct':
                    path = '/restaurantFill';
                    break;
                case 'bs':
                    path = '/extension';
                    break;
                case 'domain':
                    path = '/domainMsg';
                    break;
                case 'ecweb':
                    path = '/restaurantWeb';
                    break;
            }
            // 跳转
            if (path) {
                this.$router.push({
                    path: path,
                    query: {
                        mark: mark,
                    },
                });
                // 暂存续费ID，可用于标识
                let _item = {
                    itemid: id,
                    order_no: order_no,
                    fromPath: '/orderList',
                };
                // 存储信息
                sessionStorage.isRenew = 'X';
                sessionStorage.renewalInfor = JSON.stringify(_item);
            }
        },
        //证书
        goCertificate(mark, domain) {
            this.$router.push({
                path: '/certificate',
                query: {
                    mark: mark,
                    domain: domain,
                },
            });
        },
        //二维码
        goProductCode(domain) {
            this.$router.push({
                path: '/productCode',
                query: {
                    domain: domain,
                },
            });
        },
        // 公示
        viewNotice: function(mark) {
            this.$router.push({
                path: '/noticepage',
                query: {
                    mark: mark,
                },
            });
        },
        // 解析
        viewDns: function(domain, order_no) {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getDNSRecordList', {
                    domain: domain,
                    p: 1,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        if (_data.content.counter === 0) {
                            that.$router.push({
                                path: '/addAnalysis',
                            });
                            let item = {
                                domain: domain,
                                id: order_no,
                                url: '/orderlist',
                                status: that.getIsSelect.status,
                            };
                            sessionStorage.analysisInfo = JSON.stringify(item);
                        } else {
                            that.$router.push({
                                path: '/analysisList',
                            });
                            let item = {
                                domain: domain,
                                id: order_no,
                                url: '/orderlist',
                                status: that.getIsSelect.status,
                            };
                            sessionStorage.analysisInfo = JSON.stringify(item);
                        }
                    }
                });
        },
        // 立即支付
        /* paly: function(order_no,num) {
            let _this = this;
            Indicator.open({
                text: '正在生成支付订单...',
                spinnerType: 'fading-circle',
            });
            setTimeout(function() {
                Indicator.close();
                let token = sessionStorage.token;
                window.location.href =
                'http://h.huyi.cn/playorder?id=' + order_no + '&price=' + num + '&token=' + token;
                // _this.$router.push({
                //   path: "/playorder",
                //   query: {
                //     id: _this.$route.query.id,
                //     price: _this.detailsInfo.total
                //   }
                // });
            }, 2000);
        }, */
        // 返回
        goback() {
            this.$router.push({
                path: '/user',
            });
            history.pushState(null, null, document.URL);
        },
        // 立即支付
        paly: function(ids, total, time) {
            // let id = ids;
            // let price = total;
            let token = sessionStorage.token;
            let created_time = time;
            let balance = 0;
            //获取资金余额
            this.$axios.post('index.php?c=App&a=getMyBalance').then(res => {
                if (res.data.errcode == 0) {
                    balance = res.data.content.balance;
                    Indicator.open({
                        text: '正在生成支付订单...',
                        spinnerType: 'fading-circle',
                    });
                    setTimeout(() => {
                        Indicator.close();
                        // this.$router.push({
                        //     path: "/playorder",
                        //     query: {
                        //         id: ids,
                        //         price: total,
                        //         token: token,
                        //         created_time: created_time,
                        //         balance:balance
                        //     }
                        // });
                        window.location.href =
                            this.configs.api.public_english_url +
                            '/playorder?id=' +
                            ids +
                            '&price=' +
                            total +
                            '&token=' +
                            token +
                            '&created_time=' +
                            created_time +
                            '&balance=' +
                            balance;
                    }, 2000);
                } else {
                    Toast({
                        message: res.data.errmsg,
                        duration: 1500,
                    });
                }
            });
        },
        //删除订单
        cancel: function(ids) {
            let _this = this;
            MessageBox.confirm('', {
                message: '确定删除订单？',
                title: '提示',
                showCancelButton: true,
            })
                .then(action => {
                    if (action == 'confirm') {
                        //确认的回调
                        _this.$axios
                            .post('index.php?c=App&a=cancelOrder', {
                                order_no: ids,
                            })
                            .then(function(response) {
                                if (response.data.errcode == 0) {
                                    Toast({
                                        message: '删除成功',
                                        duration: 1500,
                                    });
                                    //初始化数据
                                    setTimeout(function() {
                                        _this.reload();
                                    }, 1500);
                                } else {
                                    Toast({
                                        message: response.data.errmsg,
                                        duration: 1500,
                                    });
                                }
                            });
                    }
                })
                .catch(err => {
                    if (err == 'cancel') {
                        //取消的回调
                    }
                });
        },
        // 补充资料
        addInfor: function(item) {
            this.$router.push({
                path: '/addinfor',
                query: { id: item.order_no },
            });
        },
        // 获取订单列表
        getOrderList: function(key, page) {
            const that = this;
            let value = {
                p: page,
                status: key,
            };
            if (key === 5) {
                value = {
                    p: page,
                    status: 4,
                    evaluate: 1,
                };
            }
            this.$axios.post('/index.php?c=App&a=getOrders', value).then(function(response) {
                let _data = response.data;
                // 关闭加载更多
                that.moreLoading = false;
                //分页数据
                if (page <= 1) {
                    that.orderList = _data.content.list;
                } else {
                    for (let i = 0; i < _data.content.list.length; i++) {
                        that.orderList.push(_data.content.list[i]);
                    }
                }
                if (that.orderList && that.orderList.length > 0) {
                    //判断是否加载完了
                    if (_data.content.counter < _data.content.pgsize) {
                        that.allLoaded = true;
                    }
                }
                that.$nextTick(() => {
                    for (let i = 0; i < that.orderList.length; i++) {
                        if (!that.orderList.showMore && that.orderList.showMore != false) {
                            that.$set(that.orderList, 'showMore', false);
                        }
                        // that.$set(that.orderList,'showList',false);
                        let len = $('#orderList .list-bottom')
                            .eq(i)
                            .find('button').length;
                        if (len > 3) {
                            that.orderList[i].showMore = true;
                            let itemLen = $('#orderList .box_item')
                                .eq(i)
                                .find('button').length;
                            len = len - itemLen;
                            $('#orderList .list-bottom-box')
                                .eq(i)
                                .find('button')
                                .eq(len - 3)
                                .prevAll('button')
                                .addClass('box_item_list');
                            for (let j = 3; j < len; j++) {
                                let txt = $('#orderList .list-bottom-box')
                                    .eq(i)
                                    .find('button')
                                    .eq(j - 3);
                                $('#orderList .box_item .box_list')
                                    .eq(i)
                                    .append(txt);
                            }
                            $('#orderList .btn_more')
                                .eq(i)
                                .css({ display: 'block' });
                        }
                        // if($("#orderList .box_item").eq(i).find('button').length>0){
                        //     that.orderList[i].showMore=true;
                        // }
                    }
                });
            });
        },
        // 查看订单详情
        viewDeatil: function(_item) {
            this.$router.push({
                path: '/orderdetails',
                query: { id: _item.order_no },
            });
        },
        // 设置类型列表
        setTypeList: function() {
            let typeList = [];
            // if (this.$route.query.ids == 5) {
            //     typeList = [
            //         { name: '全部', key: 0 },
            //         { name: '待付款', key: 1 },
            //         { name: '待处理', key: 3 },
            //         { name: '审核中', key: 2 },
            //         { name: '待评价', key: 5 },
            //     ];
            //     this.$nextTick(function() {
            //         $('.narlist').addClass('followC');
            //     });
            // } else {
            //     typeList = [
            //         { name: '全部', key: 0 },
            //         { name: '待付款', key: 1 },
            //         { name: '待处理', key: 3 },
            //         { name: '审核中', key: 2 },
            //         { name: '待评价', key: 5 },
            //         { name: '已完成', key: 4 },
            //     ];
            // }
            typeList = [
                { name: '全部', key: 0 },
                { name: '待付款', key: 1 },
                { name: '审核中', key: 2 },
                { name: '待处理', key: 3 },
                { name: '待评价', key: 5 },
                { name: '已完成', key: 4 },
            ];
            this[MutationTypes.SET_NAR_LIST](typeList);
        },
        // 加载更多
        loadMore: function() {
            const that = this;
            if (that.moreLoading === false && that.allLoaded === false && that.orderList && that.orderList.length > 0) {
                that.moreLoading = true;
                setTimeout(function() {
                    that.page = that.page + 1;
                    that.getOrderList(that.getIsSelect.status, that.page);
                }, 2500);
            }
        },
    },
};
</script>
<style scoped lang="scss">
.list-year {
    color: #9a9a9a;
}
// .list-bottom-gray {
//     border: none;
// }
.mint-header.is-fixed {
    z-index: 10;
}
.narlist {
    z-index: 10;
}
.list-bottom-btn {
    margin-left: 0.18rem;
}
.containerView-main {
    padding-top: 1.86rem !important;
    padding-bottom: 0 !important;
}
.list-content-list {
    align-items: center;
}
// .list-content-left {
//     align-items: center;
// }
.list-content-left-type {
    width: auto;
    padding: 0.03rem 0.14rem;
}
</style>
