<template>
    <div id="customer" class="customer">
        <nav-header title="智能客服"></nav-header>
        <div class="customer-box containerView-main" id="scroll_con">
            <div class="customer_con">
                <div class="customer_con_box" id="scroll_t">
                    <div class="customer_con_left">
                        <div class="icon_left_bg"></div>
                        <div class="left_text left_pdn">
                            <p class="title">您好！我是智能在线客服</p>
                            <p class="exp">请选择需要咨询的问题哦</p>
                            <div @click="showList(list.id, index)" class="question" v-for="(list, index) in lists" :key="list.id">
                                {{ list.question }}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="scroll_h">
                    <div v-show="isShow.indexOf(list.id) >= 0" class="customer_con_box con_box_scroll" v-for="list in lists" :key="list.id">
                        <div class="customer_con_right">
                            <div class="right_text">
                                {{ list.question }}
                            </div>
                            <img :src="configs.api.public_domain + portrait" alt="" class="icon_right_bg" />
                            <!-- <div class="icon_right_bg"></div> -->
                        </div>
                        <div class="customer_con_left">
                            <div class="icon_left_bg"></div>
                            <div class="left_text">
                                {{ list.answer }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="customer_bottom">
            <span>没解决？联系客服热线吧</span>
            <a :href="'tel:' + service_tel" class="call_phone"></a>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'customer',
    data() {
        return {
            mark: this.$route.query.mark, //产品标识
            lists: [], //问题列表
            isShow: [], //需要显示的问题与答案
            service_tel: '', //客服电话
            portrait: '', //用户头像
        };
    },
    created() {
        this.getMsg();
    },
    methods: {
        getMsg() {
            let _this = this;
            this.$axios
                .post('/index.php?c=App&a=getFaq', {
                    mark: this.mark,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.lists = res.data.content.list;
                        this.service_tel = res.data.content.service_tel;
                        this.portrait = res.data.content.portrait;
                    }
                });
        },
        showList(id, i) {
            if (this.isShow.indexOf(id) < 0) {
                this.isShow.push(id);
            }
            this.$nextTick(() => {
                let h = document.getElementsByClassName('con_box_scroll')[i].offsetTop;
                document.getElementById('scroll_con').scrollTop = h - 70;
            });
        },
    },
};
</script>
