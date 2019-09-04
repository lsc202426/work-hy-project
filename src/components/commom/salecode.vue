<template>
    <div class="sale-code">
        <div class="sale-code-main">
            <div class="sale-code-main-item">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="swiper-slide-item">1</div>
                        </div>
                        <div class="swiper-slide">
                            <div class="swiper-slide-item">2</div>
                        </div>
                        <div class="swiper-slide">
                            <div class="swiper-slide-item">3</div>
                        </div>
                        <div class="swiper-slide">
                            <div class="swiper-slide-item">4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        /* eslint-disable no-new */
        new this.$Swiper('.swiper-container', {
            slidesPerView: 'auto', //设置slider容器能够同时显示的slides数量
            centeredSlides: true, //设定为true时，活动块会居中，而不是默认状态下的居左。
            paginationClickable: false,
        });
    },
};
</script>
