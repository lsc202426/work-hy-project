<template>
    <div class="cases" :class="{ ispd: mark === 'tmd' }">
        <nav-header title="案例"></nav-header>
        <div class="containerView-main">
            <!-- 导航分类 -->
            <div class="cases-menu" v-if="mark === 'tmd' && menuList && menuList.length > 0">
                <ul>
                    <li
                        v-for="(item, index) in menuList"
                        :key="index"
                        :class="{ active: isActive === index }"
                        @click="SwitchItem(item, index)"
                    >
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="cases-main-tmd" v-if="mark === 'tmd' && caseList">
                <div class="item" v-for="(key, n) in caseList" :key="n" :class="{ nl: n === 0 }" :id="key.case_mark">
                    <div class="item-title">
                        <span class="line"></span>
                        <span class="name">{{ key.case_name }}</span>
                        <span class="line"></span>
                    </div>
                    <div class="item-main">
                        <a
                            :href="list.url.indexOf('http') === -1 ? 'http://' + list.url : list.url"
                            v-for="(list, k) in key.slist"
                            :key="k"
                            class="list"
                        >
                            <span class="logo">
                                <img :src="'http://oapi.huyi.cn:6180/' + list.logo" alt="" />
                            </span>
                            <label class="name">{{ list.name }}</label>
                        </a>
                    </div>
                </div>
            </div>
            <div class="cases-main" v-else>
                <a
                    :href="item.url.indexOf('http') === -1 ? 'http://' + item.url : item.url"
                    class="cases-main-item"
                    v-for="(item, index) in caseList"
                    :key="index"
                >
                    <span class="logo" :style="{ backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.logo + ')' }"></span>
                    <span class="name">{{ item.name }}</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data() {
        return {
            caseList: [],
            menuList: [],
            isActive: 0,
            mark: this.$route.query.mark,
        };
    },
    created() {
        this.getDzpCases();
        if (this.mark === 'tmd') {
            this.getCaseType();
        }
    },
    methods: {
        // 获取案例类型
        getCaseType: function() {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getCaseType', {
                    mark: that.mark,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.menuList = _data.content;
                    }
                });
        },
        // 获取案例
        getDzpCases: function() {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getCases', {
                    mark: that.mark,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.caseList = _data.content;
                        if (that.mark === 'tmd') {
                            that.caseList.reverse();
                        }
                    }
                });
        },
        // 切换
        SwitchItem: function(item, index) {
            const that = this;
            that.isActive = index;
            //锚点跳转，滑动
            let top = $('#' + item.mark).offset().top;
            $('.containerView-main').animate({ scrollTop: top }, 0);
        },
    },
};
</script>
