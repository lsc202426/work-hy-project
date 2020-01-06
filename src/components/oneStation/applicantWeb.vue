<template>
    <div class="applicantFill fill_information head_box fill_bot">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="con_box containerView-main" v-if="showSome">
            <div class="list_box list_box_news">
                <div class="title">
                    <span class="act_icon" @click="goback()">申请信息</span>
                    <span class="act_icon active">申请人信息</span>
                </div>
                <div>
                    <div class="list_item">
                        <span>类型</span>
                        <p class="list-item-right">{{ subject.corptype_name }}</p>
                    </div>
                    <div class="list_item" @click.stop="gosubjectList()">
                        <span>申请人名称</span>
                        <p class="list-item-right">{{ subject.corpname ? subject.corpname : subject.name }}</p>
                        <span class="icon_r"></span>
                    </div>
                    <div class="list_item">
                        <span>联系人</span>
                        <p class="list-item-right">{{ subject.linkman }}</p>
                    </div>
                    <div class="list_item">
                        <span>联系电话</span>
                        <p class="list-item-right">{{ subject.phone }}</p>
                    </div>
                    <div class="list_item">
                        <span>联系邮箱</span>
                        <p class="list-item-right">{{ subject.email }}</p>
                    </div>
                    <div class="list_item">
                        <span>联系地址</span>
                        <p class="list-item-right">{{ subject.province }} {{ subject.city }} {{ subject.area }}</p>
                    </div>
                    <div class="list_item">
                        <span>详细地址</span>
                        <p class="list-item-right">{{ subject.address }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ all_price }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="goNext()">预览</div>
            </div>
        </div> -->
        <div class="fill_bottom news-fill_bottom">
            <div class="money-detail money-detail-news">
                <div class="money-box">
                    <div class="detail-list allprice">
                        <span>总计：</span>
                        <span class="detail-right">￥{{ all_price }}</span>
                    </div>
                </div>
            </div>
            <div class="fill_bottom_btn">
                <button class="next" @click="goNext()">预览</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'applicantFill',
    data() {
        return {
            all_price: sessionStorage.all_price ? sessionStorage.all_price : parseFloat(sessionStorage.price), //总计金额
            subject: {}, //主体信息
            showSome: false,
        };
    },
    created() {
        this.init(); //初始化
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    beforeDestroy() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        //初始化获取主体信息
        //初始化获取主体信息
        init() {
            // 判断是否有存储，有存储，优先使用存储
            if (sessionStorage.subject) {
                this.subject = JSON.parse(sessionStorage.subject);
                this.showSome = true;
            } else {
                this.$axios.post('index.php?c=App&a=getApplicant').then(res => {
                    if (res.data.errcode == 0) {
                        this.subject = res.data.content;
                        this.showSome = true;
                    } else if (parseInt(res.data.errcode) === 20001) {
                        this.addSubject();
                        this.showSome = false;
                    } else {
                        Toast({
                            message: this.errmsg,
                            duration: 3000,
                        });
                    }
                });
            }
        },
        //新增主体
        addSubject() {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/addSubject',
            });
        },
        //预览
        goNext() {
            sessionStorage.subject = JSON.stringify(this.subject);
            this.$router.push({
                path: '/confirmWeb',
            });
        },
        //修改主体
        gosubjectList() {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/subjectList',
            });
        },
        //返回申请信息
        goback() {
            this.$router.push({
                path: '/restaurantWeb',
            });
            history.pushState(null, null, document.URL);
        },
    },
};
</script>
