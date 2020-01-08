<template>
    <div class="oneStation">
        <!-- <mt-header title="网站" class="header" fixed>
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header> -->
        <nav-header title="网站" gobackurl="/" fixed></nav-header>
        <!-- 产品内容 -->
        <div class="containerView-main pb_not">
            <div
                class="content_list"
                v-for="(list, index) in lists"
                :key="index"
                @click="goDetail(list.fee_verify, list.id, list.price, list.title, list.mark)"
            >
                <div class="list_item">
                    <img :src="list.src" alt="" />
                    <div class="text_box">
                        <p class="title">{{ list.title }}</p>
                        <p class="no-after">
                            费用：<span>￥{{ list.price }}</span>
                        </p>
                        <p class="text">{{ list.summary }}</p>
                        <p class="detail"><span class="apply-btn" @click.stop="apply(list)">立即申请</span><span>进一步了解</span></p>
                    </div>
                </div>
            </div>
            <!-- 更多服务 -->
            <div class="more">
                <div class="title">{{ more_service }}</div>
                <p>{{ phone }}</p>
                <p>{{ web }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'oneStation',
    data() {
        return {
            more_service: '更多服务',
            phone: '电话：020-62944051',
            web: '网站：http://一站通.商标',
            lists: [], //产品列表
            // src:require("@/assets/images/oneStation/list_bg1.png"),
        };
    },
    created() {
        //清空数据
        sessionStorage.removeItem('formUrl');
        sessionStorage.removeItem('domain');
        sessionStorage.removeItem('fee_verify');
        sessionStorage.removeItem('subject');
        sessionStorage.removeItem('price');
        sessionStorage.removeItem('productid');
        sessionStorage.removeItem('product_type');
        sessionStorage.removeItem('all_price');
        sessionStorage.removeItem('year');
        this.init();
    },
    methods: {
        // 点击立即申请
        apply(item) {
            sessionStorage.fee_verify = item.fee_verify;
            sessionStorage.price = item.price;
            sessionStorage.domain = item.title;
            sessionStorage.productid = item.id;
            sessionStorage.removeItem('isAgree');
            sessionStorage.removeItem('salesCode');
            this.$router.push({
                //跳转品牌官网
                path: '/restaurantWeb',
                query: {
                    mark: item.mark,
                    fee_verify: item.fee_verify,
                    id: item.id,
                    price: item.price,
                    title: item.title,
                },
            });
        },
        init() {
            let _this = this;
            _this.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: 'ecweb',
                    p: 1,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.lists = response.data.content.list[0].list;
                        //给每一项添加图片路径
                        for (let i = 0; i < _this.lists.length; i++) {
                            _this.lists[i].src = require('@/assets/images/oneStation/list_bg' + (i + 1) + '.png');
                        }
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        goDetail(fee_verify, id, price, title, mark) {
            sessionStorage.fee_verify = fee_verify;
            sessionStorage.price = price;
            sessionStorage.domain = title;
            sessionStorage.productid = id;
            //审核费、产品id、单价、标题、产品类型
            if (mark) {
                switch (title) {
                    case '品牌官网':
                        this.$router.push({
                            //跳转品牌官网
                            path: '/website',
                            query: {
                                mark: mark,
                                fee_verify: fee_verify,
                                id: id,
                                price: price,
                                title: title,
                            },
                        });
                        break;
                    case '品牌网店':
                        this.$router.push({
                            //跳转品牌官网
                            path: '/shop',
                            query: {
                                mark: mark,
                                fee_verify: fee_verify,
                                id: id,
                                price: price,
                                title: title,
                            },
                        });
                        break;
                    case '小程序网店':
                        this.$router.push({
                            //跳转品牌官网
                            path: '/smallProcedures',
                            query: {
                                mark: mark,
                                fee_verify: fee_verify,
                                id: id,
                                price: price,
                                title: title,
                            },
                        });
                        break;
                    default:
                        break;
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.no-after {
    padding-bottom: 0.1rem;
    span {
        color: #248fff;
        font-size: 0.28rem;
    }
}
</style>
