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
                        <!-- <span class="list-status" :class="{ 'list-status-suc': item.status_name == '已完成' }">{{ item.status_name }}</span> -->
                    </div>
                    <p class="list-content-tips" :class="{ 'blue-word': item.status == 2 }" v-if="item.notice_msg">
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
                                        {{ list.keyword }}
                                    </p>
                                    <div class="list-content-right">
                                        {{list.status_name}}
                                    </div>
                                </div>
                                <div class="list-content-left-other">
                                    <div class="list-cont-l">
                                        <span class="list-content-left-title">注册费 (￥{{parseInt(list.price)}} <span v-if="list.product_name != '商标'">/年 x {{list.year}}年</span> )
                                        </span>
                                        <span class="list-content-right">
                                            ￥{{ parseInt(list.price) * list.year }}
                                        </span>
                                    </div>
                                    <div class="list-cont-l" v-if="parseInt(list.fee_other) != 0">
                                        <span class="list-content-left-title" v-if="list.product_name != '商标'">
                                            添加类别
                                        </span>
                                        <span class="list-content-left-title" v-if="list.product_name == '商标'">
                                            增加商品服务项
                                        </span>
                                        <span class="list-content-right">
                                            ￥{{ parseInt(list.fee_other) }}
                                        </span>
                                    </div>
                                    <div class="list-cont-l" v-if="parseInt(list.fee_verify) != 0 && list.product_name != '商标'">
                                        <span class="list-content-left-title">
                                            审核费
                                        </span>
                                        <span class="list-content-right">
                                            ￥{{ parseInt(list.fee_verify) }}
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="list-bottom list-btn list-btn-cause" @click.stop="cause(list.notice_title,list.notice_msg,list.problem_next_do,list.notice_next_do)" v-if="list.notice_title">
                                <span class="list-bot-left">
                                    原因：{{list.notice_title}}
                                </span>
                                <div class="list-bot-right">
                                    <span>
                                        查看明细
                                    </span>
                                    <img src="../../assets/images/user/advance.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list-bottom list-btn" v-if="item.status == '4'">
                        
                        <div class="f_tar list-bottom-box list-finish">
                            
                            <button class="list-bottom-btn"
                                v-if="item.product_name == '点商标'"
                                @click="applyCont(item.order_no)">
                                续费
                            </button>
                            <button
                                class="list-bottom-btn"
                                v-if="item.is_invoice == '0'"
                                @click="applyInvoice(item.order_no, item.total)"
                            >
                                发票
                            </button>
                            <button
                                class="list-bottom-btn"
                                v-if="item.is_contract == '0'"
                                @click="applyCont(item.order_no)"
                            >
                                合同
                            </button>
                            <button
                                class="list-bottom-btn"
                                v-if="item.is_invoice == '1'"
                                @click="checkInvoice(item.order_no)"
                            >
                                查看发票
                            </button>
                            <button
                                class="list-bottom-btn"
                                v-if="item.is_contract == '1'"
                                @click="checkCont(item.order_no)"
                            >
                                查看合同
                            </button>
                            <button class="list-bottom-btn"
                                v-if="item.product_name == '点商标'"
                                @click="applyCont(item.order_no)">
                                证书
                            </button>
                            
                            <button class="list-bottom-btn"
                                v-if="item.product_name == '点商标'"
                                @click="applyCont(item.order_no)">
                                备案
                            </button>
                            <button class="list-bottom-btn"
                                v-if="item.product_name == '点商标'"
                                @click="applyCont(item.order_no)">
                                开通
                            </button>
                            <button class="list-bottom-btn"
                                v-if="item.product_name == '点商标'"
                                @click="applyCont(item.order_no)">
                                二维码
                            </button>
                            <button class="list-bottom-btn"
                                v-if="item.product_name == '点商标'"
                                @click="applyCont(item.order_no)">
                                转让
                            </button>
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
                    
                    <div class="list-money">
                        <!-- {{index}}
                        {{item.items}} -->
                        <span>合计:￥<span class="price">{{ parseInt(item.total) }}</span></span>
                    </div>
                    <div class="list-bottom" v-if="item.status_name == '待支付'">
                        
                        <div class="f_tar list-bottom-box">
                            
                            <button class="list-bottom-btn list-bottom-gray" v-if="item.status === '1'" @click="cancel(item.order_no)">
                                删除
                            </button>
                            <button
                                class="list-bottom-btn"
                                v-if="item.status === '1' && item.need_material === 0"
                                @click="paly(item.order_no, item.total, item.created_time)"
                            >
                                付款
                            </button>
                            <button
                                @click="addInfor(item)"
                                class="list-bottom-btn"
                                v-if="parseInt(item.status) !== 1 && parseInt(item.need_material) === 1"
                            >
                                补充资料
                            </button>
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
import narList from '@/components/commom/narList.vue';
import blankPage from '@/components/order/blankPage.vue';
import $ from 'jquery';
import { clearSession } from '@/utils/index';
export default {
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
    components: {
        narList,
        blankPage,
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
        cause(tilS,msgS,nextDoS,noticeS){
            var confirmBtn = true;
            var cancleBtn = true;
            if(noticeS == ''){
                confirmBtn = false;
                cancleBtn = false;
            }
            MessageBox.confirm('',{
                title: '申请名称不符合注册规则',
                message: '申请词不符合独创性注册要求，请根据注册规则提供相应的使用证据',
                showCancelButton: true,
                confirmButtonText:'修改注册名称',
                cancelButtonText:'申请复审',
                showConfirmButton: confirmBtn,
                showCancelButton: cancleBtn
            })
            .then(action => {
                console.log(action)
            })
            .catch(err => {
                if (err == 'cancel') {
                    //取消的回调
                }
            });
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
                query: {
                    id: ids,
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
        //取消订单
        cancel: function(ids) {
            let _this = this;
            MessageBox.confirm('', {
                message: '确定取消订单？',
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
                                        message: '取消成功',
                                        duration: 1500,
                                    });
                                    //初始化数据
                                    setTimeout(function() {
                                        location.reload();
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
            this.$axios
                .post('/index.php?c=App&a=getOrders', {
                    p: page,
                    status: key,
                })
                .then(function(response) {
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
            if (this.$route.query.ids == 5) {
                typeList = [{ name: '全部', key: 0 }, { name: '待付款', key: 1 }, { name: '审核中', key: 2 }, { name: '待处理', key: 3 }];
                this.$nextTick(function() {
                    $('.narlist').addClass('followC');
                });
            } else {
                typeList = [
                    { name: '全部', key: 0 },
                    { name: '待付款', key: 1 },
                    { name: '审核中', key: 2 },
                    { name: '待处理', key: 3 },
                    { name: '已完成', key: 4 },
                ];
            }
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
