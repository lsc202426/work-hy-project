<template>
    <div id="integral" class="head-capiral integral capiral">
        <div class="capiral-top">
            <!-- <nav-header title="我的积分"></nav-header> -->
            <mt-header class="header" title="我的积分" fixed>
                <mt-button slot="left" icon="back" @click="goback()"></mt-button>
                <mt-button slot="right" @click="viewRules()">积分规则</mt-button>
            </mt-header>
            <div class="capiral-top-money">
                <div class="capiral-top-word">
                    <span>我的积分</span>
                </div>
                <div class="capiral-top-num">
                    <span class="capiral-top-moneyN">{{ balance }}</span>
                </div>
            </div>
        </div>
        <div
            class="capiral-main containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="10"
        >
            <div class="capiral-bottom">
                <div class="capiral-detail" v-show="capiralArr.length > 0">积分明细</div>
                <div class="detail-block">
                    <div class="detail-list" v-for="item in capiralArr" :key="item.id">
                        <div class="detail-top">
                            <span class="detail-t-pay">{{ item.title }}</span>
                            <span class="detail-t-money income">+{{ item.score }}分</span>
                        </div>
                        <div class="detail-bottom">
                            <span class="detail-b-num">{{ item.get_time }}</span>
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
    </div>
</template>

<script>
// import $ from 'jquery';

export default {
    name: 'integral',

    data() {
        return {
            headPort: require('@/assets/images/user/support.png'),
            page: 1,
            capiralArr: [],
            balance: '',
            // 是否加载更多加载中
            moreLoading: false,
            // 是否已加载全部
            allLoaded: false,
        };
    },
    created() {
        this.getMsg(this.page);
    },
    mounted() {},
    methods: {
        // 返回上一页
        goback: function() {
            this.$router.go(-1);
        },
        // 查看积分规则
        viewRules: function() {},
        // 初始化获取积分
        getMsg(page) {
            let that = this;
            this.$axios
                .post('index.php?c=App&a=getMyScore', {
                    p: page,
                })
                .then(function(response) {
                    // 关闭加载更多
                    that.moreLoading = false;
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.balance = response.data.content.balance;
                        //分页数据
                        if (page <= 0) {
                            that.capiralArr = _data.content.list;
                        } else {
                            for (let i = 0; i < _data.content.list.length; i++) {
                                that.capiralArr.push(_data.content.list[i]);
                            }
                        }
                        if (that.capiralArr && that.capiralArr.length > 0) {
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
            if (that.moreLoading === false && that.allLoaded === false && that.capiralArr && that.capiralArr.length > 0) {
                that.moreLoading = true;
                setTimeout(function() {
                    that.page = that.page + 1;
                    that.getMsg(that.page);
                }, 2500);
            }
        },
    },
};
</script>

<style lang="scss">
.integral {
    &.capiral {
        .capiral-top {
            background: none;
            height: 0;
            .is-left {
                color: #333 !important;
            }
            .capiral-top-money {
                background: url(../../assets/images/user/capiral-integ.png) top left no-repeat;
                background-size: 100%;
                padding: 0.5rem 0 0.36rem;
                margin-top: 0.9rem;
            }
            .capiral-top-money .capiral-top-word span {
                border: 1px solid rgba(255, 255, 255, 0.3);
                background: none;
            }
            .capiral-top-moneyN {
                font-size: 0.82rem !important;
                padding: 0 !important;
            }
            .detail-t-money {
                color: #0086ff;
            }
        }
        .capiral-bottom {
            top: 3.4rem;
            .capiral-detail {
                font-size: 0.36rem;
                padding-left: 0;
                font-weight: bold;
                border-bottom: none;
            }
            .capiral-detail::after {
                height: 0;
            }
        }
        .mint-header-title {
            color: #333 !important;
        }
        .mint-button {
            color: #656b79;
        }
    }
}
</style>
