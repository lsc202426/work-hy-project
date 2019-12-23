<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view v-if="isRouterAlive" />
        </transition>
    </div>
</template>

<style lang="scss">
@import '@/assets/css/app.scss';
@import '../static/font/font.css';
</style>
<script>
// import inobounce from 'inobounce';
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
    // created() {
    //     let u = navigator.userAgent;
    //     if (u.indexOf('iPhone') > -1) {
    //         inobounce.enable();
    //     }
    // },
    // beforeDestroy() {
    //     inobounce.disable();
    // },
};
</script>
