<template>
    <div class="informat">
        <!-- head -->
        <!-- <nav-header title="资讯"></nav-header> -->
        <mt-header title="资讯" class="header f_bdn" fixed>
            <mt-button slot="left"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div
            class="informat-box containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="10"
            v-if="contArr && contArr.length > 0"
        >
            <div>
                <div v-for="item in contArr" :key="item.id" class="informat-list-main">
                    <div class="informat-list" @click="urlGo(item.url, item.id)">
                        <div v-if="item.show_type == 'left'" class="bg-left bg-right">
                            <div v-for="(list, index) in item.imgs" :key="index">
                                <img :src="configs.api.public_domain + list" alt="" />
                            </div>
                        </div>
                        <div class="cont_list" :class="{ leftOr: item.show_type != 'bottom' }">
                            <p class="title">{{ item.title }}</p>
                            <div class="img_list" :class="{ iamges: item.imgs.length > 1 }" v-if="item.show_type == 'bottom' && item.imgs">
                                <div class="img_item" v-for="(list, index) in item.imgs" :key="index">
                                    <span>
                                        <img :src="configs.api.public_domain + list" alt="" />
                                    </span>
                                </div>
                            </div>
                            <!-- <div class="bottom">
							<span>出自：{{ item.src }}</span>
							<div class="bot-right">
								<span class="date">{{ item.time }}</span>
							</div>
						</div> -->
                        </div>
                        <div v-if="item.show_type == 'right'" class="bg-left">
                            <div v-for="(list, index) in item.imgs" :key="index">
                                <img :src="configs.api.public_domain + list" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="informat-list-main-time">
                        <span class="time">{{ item.time }}</span>
                        <button class="share"></button>
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
        <!-- 暂无数据 -->
        <blankPage v-else></blankPage>
        <nav-botton></nav-botton>
    </div>
</template>

<script>
import * as GetterTypes from '@/constants/GetterTypes';
import { mapGetters } from 'vuex';
export default {
    name: 'informat',
    data() {
        return {
            bg: require('@/assets/images/user/capiral.png'),
            contArr: [],
            // 当前分页
            page: 1,
            // 是否加载更多加载中
            moreLoading: false,
            // 是否已加载全部
            allLoaded: false,
        };
    },
    created() {
        this.getMsg(this.page);
    },
    methods: {
        // 点击跳转
        urlGo(url, ids) {
            this.$axios
                .post('index.php?c=App&a=setViews', {
                    id: ids,
                })
                .then(function(response) {
                    if (url) {
                        location.href = url;
                    } else {
                        this.$router.push({
                            path: '/informatDetail',
                            query: {
                                id: id,
                            },
                        });
                    }
                })
                .catch(function(error) {});
        },
        getMsg(page) {
            let _this = this;
            this.$axios
                .post('index.php?c=App&a=getNews', {
                    p: page,
                })
                .then(function(response) {
                    // 关闭加载更多
                    _this.moreLoading = false;
                    if (page <= 1) {
                        _this.contArr = response.data.content.list;
                    } else {
                        for (let i = 0; i < _this.data.content.list.length; i++) {
                            _this.contArr.push(response.data.content.list[i]);
                        }
                    }
                    if (_this.contArr && _this.contArr.length > 0) {
                        //判断是否加载完了
                        if (response.data.content.counter < response.data.content.pgsize) {
                            _this.allLoaded = true;
                        }
                    }
                    // _this.contArr = response.data.content.list;
                })
                .catch(function(error) {});
        },
        // 加载更多
        loadMore: function() {
            const that = this;
            if (that.moreLoading === false && that.allLoaded === false && that.contArr && that.contArr.length > 0) {
                that.moreLoading = true;
                setTimeout(function() {
                    that.page = that.page + 1;
                    that.getMsg(that.page);
                }, 2500);
            }
        },
    },
    watch: {
        getIsSelect: function() {
            this.contArr = [];
            this.page = 1;
            this.allLoaded = false;
            this.moreLoading = false;
            this.getMsg(this.page);
        },
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_IS_SELECT]]),
        ...mapGetters({
            getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
    },
};
</script>
