<template>
    <div id="app">
        <transition name="fade" mode="out-in"><router-view v-if="isRouterAlive"/></transition>
    </div>
</template>

<style lang="scss">
@import '@/assets/css/app.scss';
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
};
</script>
