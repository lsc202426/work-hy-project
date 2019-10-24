<template>
    <div id="user" class="user">
        <div class="containerView-main">
            <div class="user-top">
                <div class="user-top-word">
                    <div class="head-over">
                        <div v-show="headPort == ''" class="head-portrait" :style="{ backgroundImage: 'url(' + headIntal + ')' }"></div>
                        <div
                            v-show="headPort != ''"
                            class="head-portrait"
                            :style="{
                                backgroundImage: 'url(' + configs.api.public_domain + headPort + ')',
                            }"
                        ></div>
                    </div>
                    <div class="user-self-msg">
                        <div class="self-left">
                            <p class="self-nickname" v-if="userArr.nickname">
                                {{ userArr.nickname }}
                            </p>
                            <p class="self-name">{{ userArr.username }}</p>
                        </div>
                        <!-- <router-link to="/editmsg"> -->
                        <span class="self-edit" @click="editMsg()">编辑</span>
                        <!-- </router-link> -->
                    </div>
                </div>
            </div>
            <div class="user-list">
                <div class="user-list-block">
                    <div class="order-top" @click="viewOrder(0, 0)">
                        <div class="order-top-left">我的订单</div>

                        <div class="order-top-right">
                            <span>查看全部</span>
                            <img src="../../assets/images/user/advance.png" alt="" />
                        </div>
                    </div>
                    <div class="order-block">
                        <div class="order-list" @click="viewOrder(1, 1)">
                            <i v-if="orderArr.status_1">{{ orderArr.status_1 }}</i>
                            <img src="../../assets/images/user/obligation.png" alt="" />
                            <p class="order-word">待付款</p>
                        </div>
                        <div class="order-list" @click="viewOrder(3, 3)">
                            <i v-if="orderArr.status_3">{{ orderArr.status_3 }}</i>
                            <img src="../../assets/images/user/pending.png" alt="" />
                            <p class="order-word">待处理</p>
                        </div>
                        <div class="order-list" @click="viewOrder(2, 2)">
                            <i v-if="orderArr.status_2">{{ orderArr.status_2 }}</i>
                            <img src="../../assets/images/user/audit.png" alt="" />
                            <p class="order-word">审核中</p>
                        </div>
                        <div class="order-list" @click="viewOrder(5, 4)">
                            <i v-if="orderArr.status_4">{{ orderArr.status_4 }}</i>
                            <img src="../../assets/images/user/stocks.png" alt="" />
                            <p class="order-word">已完成</p>
                        </div>
                    </div>
                </div>
                <!-- <div class="user-list-block tail">
                    <div class="order-top">
                        <div class="order-top-left">产品跟踪</div>
                    </div>
                    <div class="order-block">
                        <router-link :to="{ path: 'fBrand', query: { msg_type: 'brands' } }">
                            <div class="order-list">
                                <p class="tail-num">{{ followArr.brands }}</p>
                                <p>品牌预警</p>
                            </div>
                        </router-link>
                        <router-link :to="{ path: 'fSite', query: { msg_type: 'website' } }">
                            <div class="order-list">
                                <p class="tail-num">{{ followArr.website }}</p>
                                <p>站点预警</p>
                            </div>
                        </router-link>
                        <div class="order-list" @click="viewOrder(5)">
                            <p class="tail-num">{{ followArr.order }}</p>
                            <p>订单跟踪</p>
                        </div>
                        <router-link to="/renew">
                            <div class="order-list">
                                <p class="tail-num">{{ followArr.renew }}</p>
                                <p>续费提醒</p>
                            </div>
                        </router-link>
                    </div>
                </div> -->
                <router-link to="/invite">
                    <div class="user-list-banner"></div>
                </router-link>
                <div class="user-list-block set">
                    <router-link to="/capiral">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icons-capital.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    我的钱包
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/integral">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icons-integral.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    我的积分
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/shoppingCart">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" style="height: 0.52rem;" src="../../assets/images/user/icons-apply.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    申请列表
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/contractAndInvoice">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img
                                    class="capital-left"
                                    style="height: 0.52rem;"
                                    src="../../assets/images/user/icons-contAndIn.png"
                                    alt=""
                                />
                            </div>
                            <div class="capital-right">
                                <span>
                                    合同与发票
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <!-- <router-link to="/myproduct">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icons-product.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    我的产品
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link> -->
                    <!-- <router-link to="/material">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icon_mine.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    注册资料
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/subjectList">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icon_mine_applican.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    申请人列表
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link> -->
                    <router-link to="/support">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icon_mine_help.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    帮助与客服
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/aboutUs">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icon_aboutUs.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    关于我们
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/setting">
                        <div class="list-msg">
                            <div class="list-msg-block">
                                <img class="capital-left" src="../../assets/images/user/icon_mine_setting.png" alt="" />
                            </div>
                            <div class="capital-right">
                                <span>
                                    设置
                                </span>
                                <img src="../../assets/images/user/advance.png" alt="" />
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <nav-botton></nav-botton>
    </div>
</template>

<script>
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
import { clearSession } from '@/utils/index';
export default {
    name: 'user',
    data() {
        return {
            headIntal: require('@/assets/images/user/head-portairt.png'),
            headPort: '',
            userArr: [],
            followArr: [],
            orderArr: [],
        };
    },
    created() {
        //清除内存
        clearSession();
        this.getMsg();
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_IS_SELECT]]),
        ...mapMutations({
            [MutationTypes.SET_IS_SELECT]: MutationTypes.SET_IS_SELECT,
        }),
        // 点击编辑
        editMsg() {
            var _this = this;
            _this.$router.push({
                path: '/editmsg',
                query: {
                    nickname: _this.userArr.nickname,
                    username: _this.userArr.username,
                    headPort: _this.userArr.portrait,
                },
            });
        },
        getMsg() {
            let _this = this;
            this.$axios
                .post('index.php?c=App&a=getPersonalCenter')
                .then(function(response) {
                    _this.userArr = response.data.content.user;
                    _this.followArr = response.data.content.follow;
                    _this.orderArr = response.data.content.order;
                    _this.headPort = _this.userArr.portrait;
                })
                .catch(function(error) {});
        },
        //查看分类订单
        viewOrder: function(select, key) {
            let _value = {};
            // if (key != 5) {
            //     this.$router.push({
            //         path: '/orderlist',
            //     });
            //     _value = {
            //         isSelect: key,
            //         status: key,
            //     };
            // } else if (key == 5) {
            //     this.$router.push({
            //         path: '/orderlist',
            //         query: {
            //             ids: key,
            //         },
            //     });
            //     _value = {
            //         isSelect: 0,
            //         status: 0,
            //     };
            // }
            this.$router.push({
                path: '/orderlist',
            });
            _value = {
                isSelect: select,
                status: key,
            };
            this[MutationTypes.SET_IS_SELECT](_value);
        },
    },
};
</script>

<style lang="scss"></style>
