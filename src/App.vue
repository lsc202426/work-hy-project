<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view v-if="isRouterAlive" />
        </transition>
    </div>
</template>

<style lang="scss">
@import '@/assets/css/app.scss';
// @import '../static/font/font.css';
</style>
<script>
export default {
    provide() {
        return {
            reload: this.reload,
        };
    },
    data() {
        return {
            isRouterAlive: true,
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            // 禁止双指缩放
            document.documentElement.addEventListener(
                'touchstart',
                function(event) {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                    }
                },
                false
            );
            // 禁止双击缩放
            var lastTouchEnd = 0;
            document.documentElement.addEventListener(
                'touchend',
                function(event) {
                    var now = Date.now();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                },
                false
            );
        });
    },
};
</script>
