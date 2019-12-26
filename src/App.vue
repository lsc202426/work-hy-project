<template>
    <div id="app">
        <!-- <transition name="fade"> -->
        <router-view v-if="isRouterAlive" />
        <!-- </transition> -->
    </div>
</template>

<style lang="scss">
@import '@/assets/css/app.scss';
@import '../static/font/font.css';
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
            window.onload = function() {
                // 阻止双击放大
                var lastTouchEnd = 0;
                document.addEventListener('touchstart', function(event) {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                    }
                });
                document.addEventListener(
                    'touchend',
                    function(event) {
                        var now = new Date().getTime();
                        if (now - lastTouchEnd <= 300) {
                            event.preventDefault();
                        }
                        lastTouchEnd = now;
                    },
                    false
                );

                // 阻止双指放大
                document.addEventListener('gesturestart', function(event) {
                    event.preventDefault();
                });
            };
        });
    },
};
</script>
