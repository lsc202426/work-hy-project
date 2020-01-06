<template>
    <div class="contractList">
        <mt-header class="header" :title="title" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div
            class="containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="120"
            v-if="datas && datas.length > 0"
        >
            <div class="list_content">
                <div class="list_content_box">
                    <div class="list_content_item f_bgf" v-for="(item, index) in datas" :key="index">
                        <!-- <div class="item_left">
                            <i :class="['checkbox_i',{active:isChecked}]" @click="setChecked()"></i>
                        </div> -->
                        <div class="item_right">
                            <div class="item_right_order" @click.stop="seeOrder(item.order_no)">
                                <div class="item_num">{{ item.order_no }}</div>
                                <div v-if="!$route.query.past" class="item_see">查看订单</div>
                                <div v-else class="item_see">已开具</div>
                            </div>
                            <div class="item_right_con">
                                <div class="item_right_con_main">
                                    <span class="con_main_name">{{ item.corp_name }}</span>
                                    <span class="con_main_money">￥{{ item.total }}</span>
                                </div>
                                <div class="item_right_con_time">{{ item.created_time }}</div>
                            </div>
                            <div v-if="!$route.query.past" class="item_right_oper" @click.stop="operInvoice(item.order_no, item.total)">
                                <span>去开票</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 加载更多 -->
                <div class="load-more" v-show="moreLoading || allLoaded">
                    <p v-show="moreLoading" class="load-more-loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                    </p>
                    <p class="load-more-no" v-show="allLoaded">已加载全部</p>
                </div>
            </div>
        </div>
        <!-- 暂无数据 -->
        <blankPage v-else></blankPage>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: 'issueInvoiceList',
    data() {
        return {
            title: this.$route.query.past ? '历史发票' : '开具发票',
            isChecked: false,
            datas: [],
            page: 1, // 当前分页
            moreLoading: false, // 是否加载更多加载中
            allLoaded: false, // 是否已加载全部
        };
    },
    created() {
        this.getList(); //初始化获取数据
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_NAR_LIST], [GetterTypes.GET_IS_SELECT]]),
        ...mapGetters({
            getNarList: [GetterTypes.GET_NAR_LIST],
            getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
    },
    watch: {
        getIsSelect: function() {
            this.datas = [];
            this.page = 1;
            this.allLoaded = false;
            this.moreLoading = false;
            this.getList(this.getIsSelect.status, this.page);
        },
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
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
        }),
        // 返回上一页
        goback() {
            this.$router.push({
                path: '/contractAndInvoice',
            });
        },
        //初始化获取数据
        getList(status, page) {
            let that = this;
            this.$axios
                .post('index.php?c=App&a=getContractOrInvoiceList', {
                    type: 2, //type:  1、合同  2、发票
                    history: that.$route.query.past ? 1 : 0, //history:  1、历史数据  2、需操作数据
                    p: that.page,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        // 关闭加载更多
                        that.moreLoading = false;
                        //分页数据
                        if (page <= 1) {
                            that.datas = _data.content.list;
                        } else {
                            for (let i = 0; i < _data.content.list.length; i++) {
                                that.datas.push(_data.content.list[i]);
                            }
                        }
                        if (that.datas && that.datas.length > 0) {
                            //判断是否加载完了
                            if (_data.content.counter < _data.content.pgsize) {
                                that.allLoaded = true;
                            }
                        }
                    }
                });
        },
        //查看发票、订单
        seeOrder(id) {
            if (this.$route.query.past) {
                this.$router.push({
                    path: '/invDetail',
                    query: {
                        id: id,
                    },
                });
            } else {
                this.$router.push({
                    path: '/orderDetails',
                    query: {
                        id: id,
                        assignUrl: '/issueInvoiceList',
                    },
                });
            }
        },
        //去开票
        operInvoice(id, money) {
            this.$router.push({
                path: '/issueInvoice',
                query: {
                    id: id,
                    money: money,
                },
            });
        },
        // 加载更多
        loadMore: function() {
            const that = this;
            if (that.moreLoading === false && that.allLoaded === false && that.datas && that.datas.length > 0) {
                that.moreLoading = true;
                setTimeout(function() {
                    that.page = that.page + 1;
                    that.getList(that.getIsSelect.status, that.page);
                }, 2500);
            }
        },
    },
};
</script>
