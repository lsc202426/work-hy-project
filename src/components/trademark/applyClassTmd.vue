<template>
    <div class="apply-class-tmd">
        <nav-header title="申请类别" fixed></nav-header>
        <div class="apply-class-tmd-main">
            <div class="con">
                <div class="class-search">
                    <input class="class-search-input" v-model.trim="keyword" placeholder="搜索类别" type="search" />
                    <span class="class-search-icon" @click.stop="searchBtn"></span>
                </div>
                <div class="class-list">
                    <div class="class-item" v-for="list in searchLists.length > 0 ? searchLists : lists" :key="list.key">
                        <!--大类-->
                        <div class="big-class-box">
                            <div class="class-item-check" :class="{ active: list.checked }" @click.stop="isCheck(list)"></div>
                            <div class="class-item-text" :class="{ active: list.isActive }" @click.stop="changeBigClass(list)">
                                <span>{{ list.name }}</span>
                                <span class="icon"></span>
                            </div>
                        </div>
                        <!--小类-->
                        <div class="small-class-box" v-if="list.second && list.second.length > 0 && list.isActive">
                            <div class="small-class-item" v-for="item in list.second" :key="item.categorycode">
                                <div class="title" :class="{ active: item.isShow }" v-if="list.isActive" @click.stop="showChildren(item)">
                                    <span>{{ item.codename }}</span>
                                    <span class="icon"></span>
                                </div>
                                <div class="content" v-if="item.isShow">
                                    <div v-for="children in item.children" :key="children.productid">{{ children.productname }}、</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="apply-class-tmd-bottom">
            <label>合计：￥{{ allPrice }}元</label>
            <button @click="sureSelect">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'applyClassTmd',
    data() {
        return {
            //搜索类别
            keyword: '',
            //合计价格
            allPrice: 0,
            //大类列表
            lists: [],
            //搜索列表
            searchLists: [],
            //选中大类列表
            checkLists: [],
            // 年限
            year: this.$route.query.year ? this.$route.query.year : 1,
        };
    },
    watch: {
        checkLists: function(val) {
            if (val.length > 1) {
                this.allPrice = parseInt((val.length - 1) * 1200 * this.year);
            } else {
                this.allPrice = 0;
            }
        },
        //搜索
        keyword: function(val) {
            let ary = [];
            if (val && val.length > 0) {
                this.lists.map(item => {
                    if (item.name.indexOf(val) != -1) {
                        ary.push(item);
                    }
                });
                this.searchLists = ary;
            } else {
                this.searchLists = [];
            }
        },
    },
    created() {
        //初始化获取大类
        this.init();
    },
    methods: {
        //获取大类
        init() {
            this.$axios.post('/index.php?c=App&a=getBsClass').then(res => {
                let data = res.data;
                if (data.errcode == 0) {
                    let sionCheck = [];
                    //是否有选中内容
                    if (sessionStorage.checkLists) {
                        sionCheck = JSON.parse(sessionStorage.checkLists);
                        this.checkLists = sionCheck;
                    }
                    //大类列表赋值
                    this.lists = data.content.list;
                    //遍历赋值
                    this.lists.forEach(item => {
                        item.checked = false;
                        item.isActive = false;
                    });
                    //如果有选中内容，遍历选中
                    if (sionCheck && sionCheck.length > 0) {
                        this.lists.forEach(item => {
                            sionCheck.forEach(j => {
                                if (j.categoryKey == item.key) {
                                    item.checked = true;
                                }
                            });
                        });
                    }
                    //添加第一个大类的子类
                    this.lists[0].second = data.content.current;
                    //二级类别添加控制手柄
                    this.lists[0].second.forEach(item => {
                        item.isShow = false;
                    });
                    //判断是否需要指定打开某类
                    if (this.$route.query.key) {
                        let i = {
                            isActive: true,
                            key: this.$route.query.key,
                        };
                        this.changeBigClass(i, 'give');
                    }
                }
            });
        },
        //切换大类
        changeBigClass(item, give) {
            //关闭其他大类展开
            this.lists.forEach(i => {
                if (i.name != item.name) {
                    i.isActive = false;
                }
            });
            item.isActive = !item.isActive;
            //判断是否有子类数据
            if (!item.second) {
                //如果没有，请求数据然后添加
                this.$axios
                    .post('/index.php?c=App&a=getBsProductService', {
                        bskey: item.key,
                        keyword: '',
                        pgroup: '',
                        productid: '',
                    })
                    .then(res => {
                        let data = res.data;
                        if (data.errcode == 0) {
                            let content = data.content;
                            content.forEach(j => {
                                j.isShow = false;
                            });
                            this.lists.forEach(i => {
                                if (i.key == item.key) {
                                    i.second = content;
                                    if (give === 'give') {
                                        i.isActive = true;
                                    }
                                }
                            });
                        }
                        //如果是打开指定大类，滚动到指定位置
                        this.$nextTick(() => {
                            if (give === 'give') {
                                this.pageScroll();
                            }
                        });
                        this.$forceUpdate();
                    });
            }
            this.$forceUpdate();
        },
        //是否选中类别
        isCheck(list) {
            list.checked = !list.checked;
            //遍历大类，获取选中列表
            this.getCheckLists();
            //强制渲染
            this.$forceUpdate();
        },
        //三级类别是否显示
        showChildren(item) {
            item.isShow = !item.isShow;
            //强制渲染
            this.$forceUpdate();
        },
        //获取大类选中列表
        getCheckLists() {
            //重置选中列表
            this.checkLists = [];
            //遍历获取选中项的key
            this.lists.forEach(item => {
                if (item.checked) {
                    let obj = {
                        categoryName: item.name,
                        categoryKey: item.key,
                    };
                    this.checkLists.push(obj);
                }
            });
        },
        //确定选择
        sureSelect() {
            sessionStorage.checkLists = JSON.stringify(this.checkLists);
            this.$router.push({
                path: '/fillProduct',
            });
        },
        //页面滚动到指定位置
        pageScroll() {
            let i = parseInt(this.$route.query.key) - 1;
            let top = document.getElementsByClassName('class-item')[i].offsetTop - 50;
            document.documentElement.scrollTop = document.body.scrollTop = top;
        },
    },
};
</script>
