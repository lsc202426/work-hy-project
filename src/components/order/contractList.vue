<template>
    <div class="contractList bg_gray">
        <nav-header :title="title" gobackurl="/contractAndInvoice"></nav-header>
        <div class="containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="10">
            <div class="list_content" v-if="datas && datas.length > 0">
                <div class="list_content_box">
                    <div class="list_content_item f_bgf" v-for="(item,index) in datas" :key="index">
                        <div v-if="!$route.query.past" class="item_left">
                            <i :class="['checkbox_i',{active:order_nos.indexOf(item.order_no)>=0}]" @click="setChecked(item.order_no)"></i>
                        </div>
                        <div class="item_right">
                            <div class="item_right_order" @click.stop="seeOrder(item.order_no)">
                                <div class="item_num">{{item.order_no}}</div>
                                <div v-if="!$route.query.past" class="item_see">查看订单</div>
                                <div v-else class="item_see">查看合同</div>
                            </div>
                            <div class="item_right_con">
                                <div class="item_right_con_main">
                                    <span class="con_main_name">{{item.corp_name}}</span>
                                    <span class="con_main_money">￥{{item.total}}</span>
                                </div>
                                <div class="item_right_con_time">{{item.created_time}}</div>
                            </div>
                            <!-- <div class="item_right_oper">
                                <span>去开票</span>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div v-if="!$route.query.past" class="apply_contract" @click="goContract()">
                    申领
                </div>
                <!-- 加载更多 -->
                <div class="load-more" v-show="moreLoading || allLoaded">
                    <p v-show="moreLoading" class="load-more-loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                    </p>
                    <p class="load-more-no" v-show="allLoaded">已加载全部</p>
                </div>
            </div>
            <!-- 暂无数据 -->
            <blankPage v-else></blankPage>
        </div>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
export default {
    name:"contractList",
    data() {
        return {
            title:this.$route.query.past?"历史合同":"申领合同",
            isChecked:false,
            datas:[],
            page: 1,// 当前分页
            moreLoading: false,// 是否加载更多加载中
            allLoaded: false,// 是否已加载全部
            order_nos:[],//订单号
        }
    },
    created() {
        this.getList();//初始化获取数据
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
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
        }),
        //初始化获取数据
        getList(status, page) {
            let that = this;
            this.$axios
                .post('index.php?c=App&a=getContractOrInvoiceList', {
                    type:1,//type:  1、合同  2、发票
                    history:that.$route.query.past?1:0,//history:  1、历史数据  2、需操作数据
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
        //查看合同、订单
        seeOrder(id){
            if(this.$route.query.past){
                this.$router.push({
                    path:'/contDetail',
                    query:{
                        id:id,
                    }
                })
            }else{
                this.$router.push({
                    path:'/orderDetails',
                    query:{
                        id:id,
                        assignUrl:'/contractList'
                    }
                })
            }
        },
        //申领
        goContract(){
            if(this.order_nos.length<=0){
                Toast({
                    message: '请选择需要申领合同的订单',
                    duration: 3000,
                });
                return;
            }
            this.$router.push({
                path:'/contract',
            })
            sessionStorage.order_nos=JSON.stringify(this.order_nos);
        },
        setChecked(order_no){
            if(this.order_nos.indexOf(order_no)>=0){
                //如果包含，则去除
                this.order_nos.splice(order_no, 1);
            }else{
                //如果没有，则添加
                this.order_nos.push(order_no);
            }
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
}
</script>