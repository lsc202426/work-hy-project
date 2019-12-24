<template>
    <mt-header :title="title" class="header" :fixed="fixed">
        <mt-button slot="left" icon="back" @click="goback"></mt-button>
        <mt-button slot="right"></mt-button>
    </mt-header>
</template>

<style>
#app .mint-header {
    background-color: #fff;
    height: 0.9rem;
    border-bottom: 1px solid #f1f1f1;
}
#app .head_box .mint-header {
    border: none;
}
#app .mint-header-title {
    color: #2c3852;
    font-family: PingFangHK-Regular;
    font-size: 0.36rem;
}
#app .mint-header-button.is-left {
    color: #2c3852;
}
#app .mint-header .mint-button {
    padding-left: 4px;
}
</style>

<script>
export default {
    data() {
        return {};
    },
    //声明接受父组件参数
    // props: ["title"],
    props: {
        title: String, // 标题内容
        gobackurl: String, //指定跳转地址
        goself: String, //返回自己地址，用于产品搜索返回
        fixed: Boolean, //是否定位
    },
    methods: {
        goback() {
            if (sessionStorage.payMade) {
                sessionStorage.removeItem('payMade');
            }
            if (this.goself == 'false') {
                sessionStorage.removeItem('formUrl');
                sessionStorage.removeItem('domain');
                sessionStorage.removeItem('fee_verify');
                sessionStorage.removeItem('subject');
                sessionStorage.removeItem('price');
                sessionStorage.removeItem('productid');
                sessionStorage.removeItem('product_type');
                sessionStorage.removeItem('all_price');
                sessionStorage.removeItem('product_s');
                this.$router.go(0);
                // this.$router.push({
                // 	path:"/restaurant"
                // })
            } else {
                if (this.gobackurl) {
                    this.$router.push({
                        path: this.gobackurl,
                    });
                } else {
                    this.$router.go(-1);
                }
            }
        },
    },
};
</script>
