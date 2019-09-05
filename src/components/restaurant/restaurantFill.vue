<template>
    <div class="restaurantFill fill_information head_box">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <!-- <nav-header title=" " gobackurl="restaurant"></nav-header> -->
        <div class="con_box containerView-main">
            <div class="list_box">
                <div class="title">
                    <span class="act_icon active">申请信息</span>
                    <span class="act_icon" @click="goNext()">申请人信息</span>
                </div>
                <div class="list_item">
                    <span>申请品牌名称</span>
                    <input type="text" readonly="readonly" v-model="text" />
                </div>
                <div class="list_item">
                    <span>年限</span>
                    <select v-model="year" @change="choiceYear()">
                        <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }}</option>
                    </select>
                    <span class="icons-down"></span>
                </div>
            </div>
        </div>
        <div class="all_prive">
            <div class="all_prive_box">
                <span class="cost_txt">注册费</span>
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
    name: 'restaurantFill',
    data() {
        return {
            year: sessionStorage.year ? sessionStorage.year : 1,
            text: '',
            all_price: sessionStorage.all_price ? sessionStorage.all_price : parseFloat(sessionStorage.price), //总费用
            price: parseFloat(sessionStorage.price), //单价
            wishListItem: {}, //信息项详情
            // 是否为续费
            renewalInfor: JSON.parse(sessionStorage.getItem('renewalInfor')) ? JSON.parse(sessionStorage.getItem('renewalInfor')) : '',
        };
    },
    created() {
        //判断是否是从申请列表过来
        if (sessionStorage.proEditId && sessionStorage.mark == 'dct') {
            this.getWishlistItem();
        } else if (this.renewalInfor) {
            // 续费
            this.getOrderItemInfo(this.renewalInfor.itemid, 1);
        } else {
            this.text = sessionStorage.domain + '.餐厅';
            sessionStorage.year = this.year;
            sessionStorage.all_price = this.all_price;
        }
    },
    methods: {
        //获取申请信息
        getWishlistItem: function() {
            let id = sessionStorage.proEditId;
            //获取申请信息
            this.$axios
                .post('/index.php?c=App&a=getWishlistItem', {
                    id: id,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        // 暂存
                        this.setInfor(res.data.content);
                        sessionStorage.removeItem('proEditId');
                        sessionStorage.EditId = id;
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
        },
        // 获取续费订单细则详情
        getOrderItemInfo: function(id, type) {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getOrderItemInfo', {
                    itemid: id,
                    format: type,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.setInfor(_data.content);
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        // 编辑，续费 存储信息
        setInfor: function(item) {
            this.wishListItem = item;
            //存储需要用到的信息
            let product_s = {
                domain: this.wishListItem.keyword.split('.')[0],
                price: this.wishListItem.price,
                reg: 1,
            };
            sessionStorage.product_s = JSON.stringify(product_s);
            sessionStorage.fee_verify = this.wishListItem.verify_fee ? this.wishListItem.verify_fee : 0;
            sessionStorage.productid = this.wishListItem.productid;
            sessionStorage.product_type = this.wishListItem.product_name;
            sessionStorage.domain = this.wishListItem.keyword.split('.')[0];
            sessionStorage.price = this.wishListItem.price;
            sessionStorage.year = this.wishListItem.year;
            sessionStorage.all_price = this.wishListItem.total;
            sessionStorage.sales_code = this.wishListItem.sales_code ? this.wishListItem.sales_code : '';
            sessionStorage.subject = JSON.stringify(this.wishListItem.subject);
            this.text = this.wishListItem.keyword.split('.')[0] + '.餐厅';
            this.year = this.wishListItem.year;
            this.all_price = this.wishListItem.total;
            this.price = parseFloat(this.wishListItem.price);
        },
        //选择年限
        choiceYear() {
            this.all_price = this.year * this.price;
            sessionStorage.year = this.year;
            sessionStorage.all_price = this.all_price;
        },
        //下一步
        goNext() {
            sessionStorage.formUrlOne = this.$route.path;
            this.$router.push({
                path: '/applicantFill',
            });
        },
        goback() {
            const that = this;
            if (sessionStorage.EditId) {
                that.$router.push({
                    path: '/shoppingCart',
                });
            } else if (that.renewalInfor) {
                // 如果是续费
                that.$router.push({
                    path: that.renewalInfor.fromPath,
                    query: {
                        id: that.renewalInfor.order_no,
                    },
                });
            } else {
                that.$router.push({
                    path: '/restaurant',
                });
            }
            sessionStorage.removeItem('selectMember');
        },
    },
};
</script>
