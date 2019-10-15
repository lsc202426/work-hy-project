<template>
    <div class="contractList bg_gray">
        <nav-header :title="title"></nav-header>
        <div class="containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="10">
            <div class="list_content" v-if="datas && datas.length > 0">
                <div class="list_content_box">
                    <div class="list_content_item f_bgf" v-for="(item,index) in datas" :key="index">
                        <div v-if="!$route.query.past" class="item_left">
                            <i :class="['checkbox_i',{active:item.isChecked}]" @click="setChecked(item)"></i>
                        </div>
                        <div class="item_right">
                            <div class="item_right_order" @click.stop="seeOrder(item.order_no)">
                                <div class="item_num">{{item.order_no}}</div>
                                <div class="item_see">查看订单</div>
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
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
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
                    type:1,
                    history:that.$route.query.past?1:0,
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
                        that.addIsChecked();
                        
                    }
                });
        },
        //初始数据添加参数
        addIsChecked(){
            this.datas.forEach((item,index)=>{
                item['isChecked']=false;
            })
            console.log(this.datas);
        },
        seeOrder(id){
            if(this.$route.query.past){
                this.$router.push({
                    path:'/contDetail',
                })
            }
        },
        goContract(){
            this.$router.push({
                path:'/contract',
                query:{
                    id:'HP190826095316000088735414'
                }
            })
        },
        setChecked(item){
            console.log(item);
            item.isChecked=!item.isChecked;
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