<template>
    <div class="service-box">
        <mt-header title="服务机构" class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <!-- 服务机构 -->
        <div class="service-box-content containerView-main pb_not">
            <div class="service-list" v-for="(item, index) of serviceList" :key="index">
                <h2 class="service-list-name">{{ item.name }}</h2>
                <p class="service-list-phone">
                    <a :href="'tel:' + item.phone">{{ item.phone }}</a>
                    <i class="icon-phone"></i>
                </p>
                <p class="service-list-address">{{ item.address }}</p>
                <a
                    href="javascript:void(0);"
                    class="service-list-img"
                    @click.stop.prevent="bdMap(item.address, 'allmap' + index)"
                    :style="{
                        backgroundImage: 'url( ' + configs.api.public_domain + item.img + ')',
                    }"
                ></a>
                <div v-show="isShow" class="allmap" :id="'allmap' + index"></div>
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
    name: 'index',
    data() {
        return {
            serviceList: [],
            isShow: false,
            page: false,
            showId: '',
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let that = this;
            that.$axios.post('index.php?c=App&a=getDepartments').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.serviceList = _data.content;
                }
            });
        },
        goback() {
            if (!this.page) {
                this.$router.push({
                    path: '/',
                });
            } else {
                this.page = false;
                this.isShow = false;
                document.getElementById(this.showId).style.cssText = 'display:none';
            }
        },
        bdMap(address, id) {
            this.showId = id;
            this.page = true;
            this.isShow = false;
            document.getElementById(id).style.cssText = 'display:block;position:fixed;top:0;left:0;width:100%;height:100%;';
            /* global BMap*/
            // 百度地图API功能
            var map = new BMap.Map(id);
            // var top_left_control = new BMap.ScaleControl({
            // 	anchor: BMAP_ANCHOR_TOP_LEFT
            // }); // 左上角，添加比例尺
            var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
            // var top_right_navigation = new BMap.NavigationControl({
            // 	anchor: BMAP_ANCHOR_TOP_RIGHT,
            // 	type: BMAP_NAVIGATION_CONTROL_SMALL
            // }); //右上角，仅包含平移和缩放按钮
            //map.addControl(top_left_control);
            map.addControl(top_left_navigation);
            //map.addControl(top_right_navigation);
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                },
            });
            local.search(address);
        },
    },
};
</script>
<style lang="scss" scoped>
.allmap {
    position: fixed !important;
}
</style>
