<template>
    <div class="my-product">
        <nav-header title="我的产品" gobackurl="/user"></nav-header>
        <!-- 导航分类 -->
        <nar-list></nar-list>
        <div class="my-product-main containerView-main">
            <div class="my-product-list">
                <div class="my-product-list-item" v-for="(item, index) of productList" :key="index" @click="viewDetail">
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
import narList from '@/components/commom/narList.vue';
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
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
                {
                    icons: require('@/assets/images/myproduct/icon_sb1.png'),
                    name: '互易.商标',
                    endTime: '2019/08/09 14:07',
                },
            ],
        };
    },
    components: {
        narList,
    },
    computed: {},
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
        }),
        // 设置分类类别
        setMenuType: function() {
            let typeList = [
                { name: '全部', key: 0, mark: 'tmd' },
                { name: '点商标', key: 1, mark: 'tmd' },
                { name: '点招聘', key: 2, mark: 'tmd' },
                { name: '点餐厅', key: 3, mark: 'tmd' },
                { name: '商标', key: 4, mark: 'tmd' },
                { name: '域名', key: 5, mark: 'tmd' },
                { name: '网站', key: 6, mark: 'tmd' },
            ];
            this[MutationTypes.SET_NAR_LIST](typeList);
        },
        // 查看详情
        viewDetail: function() {
            this.$router.push({
                path: '/productone',
                query: {
                    mark: 'tmd',
                },
            });
        },
    },
    created() {
        this.setMenuType();
    },
};
</script>
