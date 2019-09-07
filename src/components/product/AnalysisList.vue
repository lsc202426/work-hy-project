<template>
    <div class="product-details analysis-list">
        <mt-header title="解析列表" class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div
            class="product-dt-main containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="10"
        >
            <div class="pd-record">
                <ul class="pd-main pd-record-right pd-bd" @click="dnsRecord(0, list.id)" v-for="(list, i) of recordList" :key="i">
                    <li class="pd-main-item">
                        <label>记录类型</label>
                        <p class="icons-box">
                            {{ list.record_type }} <span class="icons-status">{{ list.status_name }}</span>
                        </p>
                    </li>
                    <li class="pd-main-item">
                        <label>主机记录</label>
                        <p>{{ list.host }}</p>
                    </li>
                    <li class="pd-main-item">
                        <label>记录值</label>
                        <p>{{ list.data }}</p>
                    </li>
                </ul>
            </div>
            <!-- 加载更多 -->
            <div class="load-more" v-show="moreLoading || allLoaded">
                <p v-show="moreLoading" class="load-more-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                </p>
                <p class="load-more-no" v-show="allLoaded">已加载全部</p>
            </div>
        </div>
        <div class="analysis-list-btn">
            <button @click="dnsRecord(1)">新增解析</button>
        </div>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            // 页码
            page: 1,
            // dns列表
            recordList: [],
            // 是否加载更多加载中
            moreLoading: false,
            // 是否已加载全部
            allLoaded: false,
        };
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_IS_SELECT]]),
        ...mapGetters({
            getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
    },
    created() {
        // 获取dns记录
        this.getDNSRecordList();
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
        // 返回
        goback: function() {
            let analysisInfo=JSON.parse(sessionStorage.analysisInfo);
            if(analysisInfo.url){
                this.$router.push({
                    path:analysisInfo.url
                })
                this.getIsSelect.status=analysisInfo.status;
                sessionStorage.removeItem('analysisInfo');
                return;
            }
            this.$router.push({
                path: '/orderdetails',
                query: {
                    id: analysisInfo.id,
                },
            });
            sessionStorage.removeItem('analysisInfo');
            history.pushState(null, null, document.URL);
        },
        // 添加解析
        dnsRecord: function(type, id) {
            if (type == 1) {
                this.$router.push({
                    path: '/analysis',
                    query: {
                        dnsStatus: type,
                    },
                });
            } else if (type == 0) {
                this.$router.push({
                    path: '/analysis',
                    query: {
                        dnsStatus: type,
                        id: id,
                    },
                });
            }
        },
        // 获取dns记录
        getDNSRecordList: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getDNSRecordList', {
                    domain: JSON.parse(sessionStorage.analysisInfo).domain,
                    p: that.page,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        // 关闭加载更多
                        that.moreLoading = false;
                        //分页数据
                        if (that.page <= 1) {
                            that.recordList = _data.content.list;
                        } else {
                            for (let i = 0; i < _data.content.list.length; i++) {
                                that.recordList.push(_data.content.list[i]);
                            }
                        }
                        if (that.recordList && that.recordList.length > 0) {
                            //判断是否加载完了
                            if (_data.content.counter < _data.content.pgsize) {
                                that.allLoaded = true;
                            }
                        }
                    }
                });
        },
        // 加载更多
        loadMore: function() {
            const that = this;
            if (that.moreLoading === false && that.allLoaded === false && that.recordList && that.recordList.length > 0) {
                that.moreLoading = true;
                setTimeout(function() {
                    that.page = that.page + 1;
                    that.getDNSRecordList();
                }, 2500);
            }
        },
    },
};
</script>
