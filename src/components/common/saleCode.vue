<template>
    <div class="sale-code" v-if="getSaleMember.isShow">
        <div class="sale-code-main">
            <div class="swiper-container">
                <div class="swiper-wrapper" @click.stop>
                    <div class="swiper-slide" v-for="(item, index) of getSaleMember.list" :key="index">
                        <div class="investpro">
                            <p class="investpro-title">
                                <!-- {{ item.saying }} -->
                                品牌顾问
                            </p>
                            <div class="investpro-main">
                                <div class="head">
                                    <img :src="configs.api.public_domain + item.portrait" alt="" />
                                </div>
                                <p class="name">{{ item.name }}</p>
                                <p class="code">{{ item.code }}</p>
                            </div>
                            <div class="investpro-language">
                                <span v-for="(lan, k) in item.goodat" :key="k">{{ lan }}</span>
                            </div>
                            <div class="investpro-evaluate" v-if="item.evaluate && item.evaluate.length > 0">
                                <h2 class="investpro-evaluate-title">客户评价</h2>
                                <div
                                    class="investpro-evaluate-list"
                                    :class="{ first: (len = 1) }"
                                    v-for="(list, len) in item.evaluate"
                                    :key="len"
                                >
                                    <div class="investpro-evaluate-list-top">
                                        <span class="name">{{ list.username || '13512345678' | hideMiddle }}</span>
                                        <div class="star">
                                            <span
                                                class="star-value"
                                                v-for="(star, num) of 5"
                                                :key="num"
                                                :class="{ actived: num < parseInt(list.star) }"
                                            ></span>
                                        </div>
                                    </div>
                                    <p class="investpro-evaluate-list-text">
                                        {{ list.content || '服务态度很好，节约了我的时间，五星好评' }}
                                    </p>
                                </div>
                            </div>
                            <div class="investpro-selectBtn-main">
                                <button class="selectBtn" @click="selectMember(item)">选择</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页器 -->
            <div class="swiper-pagination"></div>
            <!-- <div class="change-btn">
                <button @click.stop="changeMember">换一批</button>
            </div> -->
        </div>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import * as utils from '@/utils/index';
import hub from '@/hub';
import $ from 'jquery';
// 关闭品牌顾问弹框
$('body').on('click', '.sale-code', function() {
    utils.closeSaleBox();
});

export default {
    props: ['corpid'],
    data() {
        return {};
    },
    updated() {
        this.initSwiper();
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SALE_MEMBER]]),
        ...mapGetters({
            getSaleMember: [GetterTypes.GET_SALE_MEMBER],
        }),
    },
    watch: {
        getSaleMember() {
            let show = this.getSaleMember.isShow;
            if (show) {
                this.stopScroll(true);
            } else {
                this.canScroll(true);
            }
        },
    },
    methods: {
        ...mapMutations([MutationTypes.SET_SALE_MEMBER]),
        ...mapMutations({
            [MutationTypes.SET_SALE_MEMBER]: MutationTypes.SET_SALE_MEMBER,
        }),
        // 初始化swiper
        initSwiper: function() {
            new this.$Swiper('.swiper-container', {
                slidesPerView: 'auto', //设置slider容器能够同时显示的slides数量
                centeredSlides: true, //设定为true时，活动块会居中，而不是默认状态下的居左。
                loop: false, //循环
                noSwiping: false, //设置为true时禁止切换
                paginationClickable: false,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                initialSlide: this.getSaleMember.key ? this.getSaleMember.key : 0,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        },
        // 换一批
        changeMember: function() {
            utils.getSalesCode(this.corpid);
        },
        // 选中品牌顾问
        selectMember: function(item) {
            // 设置选择品牌顾问
            hub.$emit('send-salecode', {
                salecode: item.code,
            });
            utils.closeSaleBox();
        },
    },
};
</script>
<style lang="scss">
.sale-code-main {
    .swiper-pagination {
        left: 50%;
        transform: translateX(-50%);
        bottom: -0.8rem;
        .swiper-pagination-bullet {
            margin: 0 0.05rem;
            background-color: rgba($color: #d8d8d8, $alpha: 0.29);
            &.swiper-pagination-bullet-active {
                background-color: #d8d8d8;
            }
        }
    }
}
</style>
