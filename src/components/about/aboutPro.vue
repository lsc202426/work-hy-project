<template>
    <div class="about">
        <nav-header :title="title" fixed></nav-header>
        <div class="content_box containerView-main" :class="{ 'containerView-main-pb': type != 3 }">
            <iframe
                id="iframe"
                :src="url"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                allowtransparency="true"
                scrolling
            ></iframe>
        </div>
        <div class="go-to" @click="goProduct(mark)" v-if="type == 3">
            <span>申请“{{ product }}”</span>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'about',
    data() {
        return {
            title: this.$route.query.til,
            mark: this.$route.query.mark,
            type: this.$route.query.txt_type,
            url: '',
            product: '',
            path: '',
        };
    },
    created() {
        this.init();
        this.getProduct();
    },
    mounted() {},
    methods: {
        goProduct() {
            this.$router.push({
                path: this.path,
            });
        },
        init() {
            var _this = this;
            _this.$axios
                .post('index.php?c=App&a=getProductText', {
                    mark: _this.mark,
                    txt_type: _this.type,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.url = response.data.content.url;
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        getProduct() {
            switch (this.mark) {
                case 'bs':
                    this.product = '商标';
                    this.path = '/tradeService?mark=bs';
                    break;
                case 'tmd':
                    this.product = '点商标';
                    this.path = '/productlist?mark=tmd';

                    break;
                case 'dzp':
                    this.product = '点招聘';
                    this.path = '/recruit?mark=dzp';

                    break;
                case 'domain':
                    this.product = '域名';
                    this.path = '/domain?mark=domain';

                    break;
                case 'ecweb':
                    this.product = '建站';
                    this.path = '/oneStation?mark=ecweb';

                    break;
                case 'dct':
                    this.product = '点餐厅';
                    this.path = '/restaurant?mark=dct';

                    break;
                default:
                    this.product = '点商标';
                    this.path = '/productlist?mark=tmd';

                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.about {
    padding: 0;
}
.containerView-main {
    height: 100%;
    padding-bottom: 1.3rem !important;
    font-size: 0;
    iframe {
        height: 100%;
        width: 100%;
    }
    iframe::-webkit-scrollbar {
        display: none;
    }
    .box {
        height: 100%;
    }

    ::-webkit-scrollbar {
        display: none;
    }
}
.containerView-main-pb {
    padding-bottom: 0 !important;
}
.go-to {
    width: 100%;
    padding: 0.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    span {
        font-size: 0.34rem;
        display: inline-block;
        width: 100%;
        color: #fff;
        padding: 0.24rem 0;
        text-align: center;
        border-radius: 0.5rem;
        background: linear-gradient(114deg, rgba(7, 160, 254, 1) 0%, rgba(0, 134, 255, 1) 100%);
    }
}
</style>
