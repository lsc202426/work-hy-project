<template>
    <div class="message">
        <!-- <nav-header title="消息"></nav-header> -->
        <mt-header title="消息" class="header" fixed>
            <mt-button slot="left"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <!-- 导航分类 -->
        <!-- <nar-list></nar-list> -->
        <div
            class="list-content containerView-main"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-distance="120"
            v-if="datas && datas.length > 0"
        >
            <div class="list_box">
                <div class="list_item" v-for="list in datas" :key="list.id">
                    <div class="list_top">
                        <span class="list_top_l">
                            <span v-if="list.msg_type == 'system'" class="left_img">系</span>
                            <span v-if="list.msg_type == 'problem'" class="left_img">问</span>
                            <span v-if="list.msg_type == 'order'" class="left_img">订</span>
                            <span v-if="list.msg_type == 'product'" class="left_img">产</span>
                            <span class="left_text">{{ list.msg_name }}</span>
                        </span>
                        <span class="list_top_r">{{ list.created_time }}</span>
                    </div>
                    <div class="list_txt">{{ list.title }}</div>
                    <div class="list_detail">
                        <div
                            class="detail_i"
                            v-for="(next, index) in list.next_do"
                            @click="goDetail(list.id, list.msg_name, next.name, list.corpid)"
                            :key="index"
                        >
                            <span class="detail_i_t" :class="{ detail_i_t_blue: next.name != '查看详情' }">{{ next.name }}</span>
                            <span class="detail_i_r" :class="{ detail_i_r_blue: next.name != '查看详情' }"></span>
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
        <!-- 暂无数据 -->
        <blankPage v-else></blankPage>
        <nav-botton></nav-botton>
    </div>
</template>

<script>
// import { Toast, Loadmore } from "mint-ui";
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            datas: [],
            // 当前分页
            page: 1,
            // 是否加载更多加载中
            moreLoading: false,
            // 是否已加载全部
            allLoaded: false,
        };
    },
    created() {
        this.getList(this.getIsSelect.status, this.page);
        this.getMsgType();

        // 清除存储数据
        sessionStorage.removeItem('solve');
    },
    mounted() {
        // 父控件要加上高度，否则会出现上拉不动的情况
        //this.wrapperHeight =document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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
    computed: {
        ...mapGetters([[GetterTypes.GET_NAR_LIST], [GetterTypes.GET_IS_SELECT]]),
        ...mapGetters({
            getNarList: [GetterTypes.GET_NAR_LIST],
            getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
        }),
        getList(status, page) {
            let that = this;
            this.$axios
                .post('index.php?c=App&a=getMessages', {
                    msg_type: status !== 'all' ? status : '',
                    sub_type: '',
                    p: that.page,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        // 关闭加载更多
                        that.moreLoading = false;
                        //分页数据
                        if (page <= 1) {
                            that.datas = _data.content.data;
                        } else {
                            for (let i = 0; i < _data.content.data.length; i++) {
                                that.datas.push(_data.content.data[i]);
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
        //触发上拉
        // loadBottom() {
        //   this.loadMore();
        // },
        //上拉加载更多
        // loadMore() {
        //   let _this = this;
        //   _this.$axios
        //     .post("index.php?c=App&a=getMessages", {
        //       msg_type: status !== "all" ? status : "",
        //       sub_type: "",
        //       p: ++_this.page
        //     })
        //     .then(function(response) {
        //       if (response.data.errcode == 0) {
        //         _this.datas = _this.datas.concat(response.data.content.data);
        //         if (response.data.content.pgsize != response.data.content.counter) {
        //           _this.loading = true;
        //           _this.allLoaded = true; //禁止调用上啦函数
        //         } else {
        //           _this.loading = false;
        //         }
        //         _this.$refs.loadmore.onBottomLoaded(); //通知上啦操作已经完结
        //       }
        //     });
        // },
        goDetail(id, name, nextName, corpid) {
            // console.log(id)
            localStorage.msgId = id;
            localStorage.msgName = name;
            if (nextName == '查看详情') {
                this.$router.push({
                    path: '/detail',
                    name: 'detail',
                });
            } else if (nextName == '解决问题单') {
                this.$router.push({
                    path: '/solve',
                    name: 'solve',
                });
            } else if (nextName == '立刻续费') {
                this.$router.push({
                    path: '/renew',
                    name: 'renew',
                });
            } else if (nextName == '去实名') {
                this.$router.push({
                    path: '/realName',
                    query: {
                        id: corpid,
                        path: this.$route.path,
                    },
                });
            }
        },
        // 获取消息分类
        getMsgType() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getMsgType').then(function(response) {
                let _data = response.data;
                if (_data.errcode === 0) {
                    let _item = {
                        name: '全部',
                        key: 'all',
                    };
                    _data.content.unshift(_item);
                    that[MutationTypes.SET_NAR_LIST](_data.content);
                }
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

<style scoped lang="scss">
.message {
    height: 100%;
    // overflow: scroll;
    // padding-top: 1.86rem;
    // padding-bottom: 1rem;
}
#app .mint-header {
    border-bottom: none;
}

.no_more {
    text-align: center;
}

.list_box {
    padding: 0 0.14rem;
    font-size: 0.26rem;
    // margin-top: 0.24rem;
}

.list_item {
    border-radius: 0.04rem;
    // box-shadow: 0px 1px 9px 0px rgba(212, 214, 215, 1);
    padding: 0.24rem 0.24rem 0 0.24rem;
    margin: 0.3rem 0.18rem;
    border: 1px solid #dddee1;
}

.list_top {
    overflow: hidden;
    line-height: 0.4rem;
    padding-bottom: 0.2rem;
}

.list_top_l {
    float: left;
}

.left_img {
    display: inline-block;
    vertical-align: middle;
    background: #32b4ff;
    color: #fff;
    border-radius: 5rem;
    width: 0.62rem;
    height: 0.62rem;
    text-align: center;
    line-height: 0.62rem;
}

.left_img img {
    width: 0.62rem;
    height: 0.62rem;
    vertical-align: sub;
}

.left_text {
    font-size: 0.34rem;
    color: #2c3852;
    padding-left: 0.2rem;
    font-weight: bold;
    vertical-align: middle;
}

.list_top_r {
    float: right;
    font-size: 0.24rem;
    color: #999999;
}

.list_txt {
    color: #2c3852;
    font-weight: 400;
    font-size: 0.28rem;
    line-height: 0.4rem;
    margin-bottom: 0.22rem;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.list_detail {
}

.detail_i {
    border-top: 1px solid #f1f1f1;
    overflow: hidden;
    padding: 0.22rem 0;
    line-height: 0.36rem;
}

.detail_i_t {
    font-size: 0.26rem;
    color: #666666;
    font-weight: 400;
    float: left;
}
.detail_i_t_blue {
    color: #32b4ff;
}
.detail_i_r {
    float: right;
    background: url(../../assets/images/message/icon_right.png) center center no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    width: 0.1rem;
    height: 0.18rem;
    margin-top: 0.09rem;
}
.detail_i_r_blue {
    background: url(../../assets/images/message/icon_right2.png) center center no-repeat;
    background-size: 100% 100%;
}
</style>
