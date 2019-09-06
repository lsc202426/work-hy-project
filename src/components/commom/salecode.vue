<template>
    <div class="sale-code" v-if="getSaleMember.isShow" @touchmove.prevent>
        <div class="sale-code-main">
            <div class="swiper-container">
                <div class="swiper-wrapper" @click.stop>
                    <div class="swiper-slide" v-for="(item, index) of getSaleMember.list" :key="index">
                        <div class="investpro">
                            <div class="investpro-title">
                                <span class="dot"></span>
                                <span class="title">你的专属品牌顾问</span>
                                <span class="dot"></span>
                            </div>
                            <div class="investpro-main">
                                <div class="head">
                                    <img :src="configs.api.public_domain + item.portrait" alt="" />
                                </div>
                                <p class="name">{{ item.name }}</p>
                                <p class="code">{{ item.code }}</p>
                            </div>
                            <div class="investpro-saying">{{ item.saying }}</div>
                            <button class="investpro-selectBtn" @click="selectMember(item)">选择TA</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="change-btn">
            <button @click.stop="changeMember">换一批</button>
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
// 关闭品牌顾问坦诚
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
                initialSlide: this.getSaleMember.key,
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
            let _item = {
                key: 0,
                isShow: false,
                list: this.getSaleMember.list,
            };
            this[MutationTypes.SET_SALE_MEMBER](_item);
        },
    },
};
</script>
