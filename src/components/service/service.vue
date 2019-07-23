<template>
    <div class="service-box">
        <nav-header title="服务机构"></nav-header>
        <!-- 服务机构 -->
        <div class="service-box-content containerView-main">
            <div
                class="service-list"
                v-for="(item, index) of serviceList"
                :key="index"
            >
                <h2 class="service-list-name">{{ item.name }}</h2>
                <p class="service-list-phone">
                    <a :href="item.phone">{{ item.phone }}</a>
                </p>
                <p class="service-list-address">{{ item.address }}</p>
                <a
                    href="javascript:void(0);"
                    class="service-list-img"
                    :style="{
                        backgroundImage: 'url(' + item.img + ')'
                    }"
                ></a>
            </div>
            <div class="service-box-bottom">
                <i class="been-left"></i>
                <span>已到底部</span>
                <i class="been-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            serviceList: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let that = this;
            that.$axios
                .post("index.php?c=App&a=getDepartments")
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        that.serviceList = _data.content;
                    }
                });
        }
    }
};
</script>
