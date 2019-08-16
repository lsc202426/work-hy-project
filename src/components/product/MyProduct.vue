<template>
    <div class="my-product">
        <nav-header title="我的产品" gobackurl="/user"></nav-header>
        <!-- 导航分类 -->
        <!-- <nar-list></nar-list> -->
        <!-- 导航分类 -->
        <div class="cases-menu" v-if="menuList && menuList.length > 0">
            <ul>
                <li v-for="(item, index) in menuList" :key="index" :class="{ active: isActive === index }" @click="SwitchItem(item, index)">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="my-product-main containerView-main">
            <div class="my-product-list">
                <div class="my-product-list-item" v-for="(item, index) of productList" :key="index" @click="viewDetail(item.mark)">
                    <img :src="item.icons" class="icons" />
                    <div class="right">
                        <div class="top">
                            <h1>{{ item.name }}</h1>
                            <span class="status">注册成功</span>
                        </div>
                        <p>到期时间{{ item.endTime }}</p>
                    </div>
                    <i class="icons-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            productList: [
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易阿萨达撒旦撒旦撒多撒大萨达撒旦撒旦撒多撒多撒.商标',
                    endTime: '2019/08/09 14:07',
                    mark: 'tmd',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.招聘',
                    endTime: '2019/08/09 14:07',
                    mark: 'dzp',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                    mark: 'bs',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.餐厅',
                    endTime: '2019/08/09 14:07',
                    mark: 'dct',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.com',
                    endTime: '2019/08/09 14:07',
                    mark: 'domain',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.小程序',
                    endTime: '2019/08/09 14:07',
                    mark: 'ecweb',
                },
            ],
            menuList: [
                { name: '全部', key: 0, mark: 'tmd' },
                { name: '点商标', key: 1, mark: 'tmd' },
                { name: '点招聘', key: 2, mark: 'dzp' },
                { name: '点餐厅', key: 3, mark: 'dct' },
                { name: '商标', key: 4, mark: 'bs' },
                { name: '域名', key: 5, mark: 'domain' },
                { name: '网站', key: 6, mark: 'ecweb' },
            ],
            isActive: 0,
        };
    },
    computed: {},
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
        }),
        // 设置分类类别
        // setMenuType: function() {
        //     let typeList = [

        //     ];
        //     this[MutationTypes.SET_NAR_LIST](typeList);
        // },
        // 切换
        SwitchItem: function(item, index) {
            const that = this;
            that.isActive = index;
        },
        // 查看详情
        viewDetail: function(type) {
            if (type === 'dzp' || type === 'tmd' || type === 'domain' || type === 'dct') {
                this.$router.push({
                    path: '/productone',
                    query: {
                        mark: type,
                    },
                });
            } else if (type === 'bs') {
                this.$router.push({
                    path: '/productBs',
                    query: {
                        mark: type,
                    },
                });
            } else if (type === 'ecweb') {
                this.$router.push({
                    path: '/productSite',
                    query: {
                        mark: type,
                    },
                });
            }
        },
        // 获取我的产品
        getMyProducts: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getMyProducts', {
                    mark: 'tmd',
                    p: '0',
                })
                .then(function(response) {
                    // let _data = response.data;
                    // if (_data.errcode === 0) {
                    //     console.log(_data);
                    // }
                    console.log(response);
                });
        },
    },
    created() {
        // this.setMenuType();
        // this.getMyProducts();
    },
};
</script>
