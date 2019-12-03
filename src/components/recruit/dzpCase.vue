<template>
    <div class="cases" :class="{ ispd: mark === 'tmd' }">
        <nav-header title="案例"></nav-header>
        <div class="containerView-main">
            <!-- 导航分类 -->
            <div id="nar" class="cases-menu" v-if="mark === 'tmd' && caseList && caseList.length > 0">
                <ul id="nar-list">
                    <li
                        v-for="(item, index) in caseList"
                        :key="index"
                        :class="{ active: isActive === index }"
                        @click="SwitchItem(item, index)"
                    >
                        <span>{{ item.case_name }}</span>
                    </li>
                </ul>
            </div>
            <div class="cases-main-tmd" v-if="mark === 'tmd' && temptList[select]">
                <div class="item-main">
                    <a
                        :href="list.url.indexOf('http') === -1 ? 'http://' + list.url : list.url"
                        v-for="(list, k) in temptList[select].slist"
                        :key="k"
                        class="list"
                    >
                        <span class="logo">
                            <img :src="configs.api.public_domain + list.logo" alt="" />
                        </span>
                        <label class="name">{{ list.name }}</label>
                    </a>
                </div>
            </div>
            <div class="cases-main-tmd" v-else-if="(mark === 'dzp' || mark === 'dct') && caseList && caseList.length > 0">
                <div class="item-main">
                    <a
                        :href="item.url.indexOf('http') === -1 ? 'http://' + item.url : item.url"
                        v-for="(item, index) in caseList"
                        :key="index"
                        class="list"
                    >
                        <span class="logo">
                            <img :src="configs.api.public_domain + item.logo" alt="" />
                        </span>
                        <label class="name">{{ item.name }}</label>
                    </a>
                </div>
            </div>
            <!-- <div class="cases-main" v-else-if="mark === 'dzp' || mark === 'dct'">
                <a
                    :href="item.url.indexOf('http') === -1 ? 'http://' + item.url : item.url"
                    class="cases-main-item"
                    v-for="(item, index) in caseList"
                    :key="index"
                >
                    <span class="logo" :style="{ backgroundImage: 'url(' + configs.api.public_domain + item.logo + ')' }"></span>
                    <span class="name">{{ item.name }}</span>
                </a>
            </div> -->
            <!-- 暂无数据 -->
            <blankPage v-else></blankPage>
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
            temptList: {}, //重组对象
            select: '',
        };
    },
    created() {
        this.getDzpCases();
        // if (this.mark === 'tmd') {
        //     this.getCaseType();
        // }
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
                        that.select = that.menuList[0].mark;
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
                        that.select = that.caseList[0].case_mark;
                        that.caseList.map(function(item) {
                            that.temptList[item.case_mark] = item;
                        });
                    }
                });
        },
        // 切换
        SwitchItem: function(item, index) {
            const that = this;
            that.isActive = index;
            that.select = item.case_mark;
            // 获取父元素div的实际宽度
            let nar = $('#nar').width() / 2;
            // 获取子元素li的世界宽度（content）
            let lw =
                $('#nar-list')
                    .children('li')
                    .width() / 2;
            // 获取当前选项到左边的距离
            let lf = document.getElementById('nar-list').children[index].offsetLeft;
            // 获取父元素距离左边的宽度
            let pw = document.getElementById('nar-list').offsetLeft;
            // 求值
            let sc_left = lf + lw - nar - pw;
            $('#nar-list').scrollLeft(sc_left);
        },
    },
};
</script>
