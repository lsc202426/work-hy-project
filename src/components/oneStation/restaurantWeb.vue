<template>
    <div class="restaurantFill fill_information head_box">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="con_box containerView-main">
            <div class="list_box">
                <div class="title">
                    <span class="act_icon active">申请信息</span>
                    <span class="act_icon" @click="goNext()">申请人信息</span>
                </div>
                <div class="list_item">
                    <span>服务名称</span>
                    <input type="text" readonly="readonly" v-model="text" />
                </div>
                <div class="list_item">
                    <span>年限</span>
                    <span>1</span>
                    <!-- <select v-model="year" @change="choiceYear()">
                        <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }}</option>
                    </select> -->
                    <!-- <span class="icon_r"></span> -->
                </div>
            </div>
        </div>
        <div class="all_prive">
            <div class="all_prive_box">
                <span class="cost_txt">注册费</span>
                <!-- <span>{{price}}*{{year}}={{all_price}}</span> -->
                <span>{{ all_price }}元</span>
            </div>
        </div>
        <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ all_price }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="goNext()">下一步</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'restaurantWeb',
    data() {
        return {
            year: sessionStorage.year ? sessionStorage.year : 1,
            text: sessionStorage.domain,
            all_price: sessionStorage.all_price ? sessionStorage.all_price : parseFloat(sessionStorage.price), //总费用
            price: parseFloat(sessionStorage.price), //单价
            fee_verify: sessionStorage.fee_verify ? parseFloat(sessionStorage.fee_verify) : 0, //手续费
            wishListItem: {}, //信息项详情
            renewalInfor: sessionStorage.getItem('renewalInfor') ? JSON.parse(sessionStorage.getItem('renewalInfor')) : '',
        };
    },
    created() {
        //判断是否是从申请列表过来
        if (sessionStorage.proEditId && sessionStorage.mark == 'ecweb') {
            let id = sessionStorage.proEditId;
            //获取申请信息
            this.$axios
                .post('/index.php?c=App&a=getWishlistItem', {
                    id: id,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.setInfor(res.data.content, id);
                        sessionStorage.removeItem('proEditId');
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                        //获取信息失败，返回搜索页
                        setTimeout(() => {
                            this.$router.push({
                                path: '/restaurant',
                            });
                        }, 2000);
                    }
                });
        } else if (this.renewalInfor) {
            this.getOrderItemInfo(this.renewalInfor.itemid, 1);
        } else {
            sessionStorage.year = this.year;
            sessionStorage.all_price = this.all_price;
            if (!sessionStorage.mark) {
                sessionStorage.mark = this.$route.query.mark;
            }
        }
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        //编辑、续费存储信息
        setInfor(item, id) {
            this.wishListItem = item;
            //存储需要用到的信息
            sessionStorage.fee_verify = this.wishListItem.verify_fee ? this.wishListItem.verify_fee : 0;
            sessionStorage.productid = this.wishListItem.productid;
            sessionStorage.product_type = this.wishListItem.product_name;
            sessionStorage.domain = this.wishListItem.product_name;
            sessionStorage.price = this.wishListItem.price;
            sessionStorage.year = this.wishListItem.year;
            sessionStorage.all_price = this.wishListItem.total;
            sessionStorage.subject = JSON.stringify(this.wishListItem.subject);
            if (this.wishListItem.sales_code) {
                sessionStorage.sales_code = this.wishListItem.sales_code;
            }
            if (id) {
                sessionStorage.EditId = id;
            }
            this.year = this.wishListItem.year;
            this.text = this.wishListItem.product_name;
            this.all_price = this.wishListItem.total; //总费用
            this.price = parseFloat(this.wishListItem.price); //单价
            this.fee_verify = parseFloat(sessionStorage.fee_verify); //手续费
        },
        //获取编辑信息
        getOrderItemInfo(id, type) {
            this.$axios
                .post('index.php?c=App&a=getOrderItemInfo', {
                    itemid: id,
                    format: type,
                })
                .then(res => {
                    if (res.data.errcode === 0) {
                        this.setInfor(res.data.content);
                        sessionStorage.mark = this.$route.query.mark;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        //选择年限
        // choiceYear() {
        //     this.all_price = this.year * this.price + this.fee_verify;
        //     sessionStorage.year = this.year;
        //     sessionStorage.all_price = this.all_price;
        // },
        //下一步
        goNext() {
            sessionStorage.formUrlOne = this.$route.path;
            this.$router.push({
                path: '/applicantWeb',
            });
        },
        //返回
        goback() {
            if (sessionStorage.EditId) {
                this.$router.push({
                    path: '/shoppingCart',
                });
            } else if (this.renewalInfor) {
                // 如果是续费
                this.$router.push({
                    path: this.renewalInfor.fromPath,
                    query: {
                        id: this.renewalInfor.order_no,
                    },
                });
            } else {
                this.$router.push({
                    path: '/oneStation',
                });
            }
            history.pushState(null, null, document.URL);
        },
    },
};
</script>
