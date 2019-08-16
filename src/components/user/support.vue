<template>
    <div id="support" class="support">
        <div class="support-box containerView-main">
            <div class="support_top">
                <div class="icon_left" @click="$router.go(-1)"></div>
            </div>
            <div class="support_con">
                <div class="support_con_list">
                    <div class="con_list_item" v-for="(list, index) in lists" :key="index">
                        <div class="list_item_box" @click="goCustomer(list.mark)">
                            <img :src="configs.api.public_domain + list.service_img" alt="" />
                            <p>{{ list.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'support',
    data() {
        return {
            lists: [], //产品列表
        };
    },
    created() {
        this.getMsg(); //初始化获取产品信息
    },
    methods: {
        //初始化获取产品信息
        getMsg() {
            this.$axios.post('/index.php?c=App&a=getService').then(res => {
                if (res.data.errcode == 0) {
                    this.lists = res.data.content;
                } else {
                    Toast({
                        message: res.data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
        //前往只能客服页面
        goCustomer(mark) {
            this.$router.push({
                path: '/customer',
                query: {
                    mark: mark,
                },
            });
        },
    },
};
</script>
