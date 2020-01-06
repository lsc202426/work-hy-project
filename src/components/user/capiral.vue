<template>
    <div id="capiral" class="capiral head-capiral">
        <div class="capiral-top">
            <nav-header title="我的钱包" fixed></nav-header>
            <div class="capiral-top-money">
                <div class="capiral-top-word">
                    <span>钱包余额</span>
                </div>
                <div class="capiral-top-num">
                    <span class="capiral-top-moneyN">￥{{ balance }}</span>
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
                <div class="capiral-detail">
                    余额明细
                </div>
                <div class="detail-block">
                    <div class="detail-list" v-for="item in capiralArr" :key="item.id">
                        <div class="detail-top">
                            <span class="detail-t-pay">{{ item.type }}</span>
                            <div class="detail-t-money" :class="{ income: parseInt(item.money) > 0 }">
                                <span>{{ parseFloat(item.money) > 0 ? '+' : '-' }}</span>
                                <span>￥{{ Math.abs(item.money) }}</span>
                            </div>
                        </div>
                        <div class="detail-bottom">
                            <span class="detail-b-order">订单号：{{ item.order_no }}</span>
                            <span class="detail-b-num">{{ item.created_time }}</span>
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
// $(function() {
//   window.addEventListener("scroll",function() {
//       var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//       if (scrollTop > 1) {
//         $(".capiral").removeClass("head-capiral");
//         // $('#app .mint-header').css('transition','all .5s');
//       } else {
//         $(".capiral").addClass("head-capiral");
//         // $('#app .mint-header').css('transition','all .5s');
//       }
//     }
//   );
// });
export default {
    name: 'capiral',

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
    mounted() {
        // window.addEventListener("scroll", this.showIcon);
    },
    methods: {
        // showIcon() {
        //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //   if(scrollTop >1){
        //   }
        // },
        getMsg(page) {
            let that = this;
            this.$axios
                .post('index.php?c=App&a=getMyCapital', {
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

                    // _this.capiralArr.list.forEach((item,index) => {
                    //     item.money.split('.')[0]
                    // });
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

<style lang="scss"></style>
