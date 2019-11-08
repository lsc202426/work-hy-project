<template>
    <div class="subSuccess head_box">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="containerView-main">
            <div class="subSuccess_con">
                <img src="../../assets/images/common/success_blue.png" alt="" />
                <div class="subSuccess_txt">
                    <p>{{ successCon.title }}</p>
                    <p v-if="successCon.text">{{ successCon.text }}</p>
                </div>
                <div class="subSuccess_btn_box">
                    <div class="left_btn" @click="goLeftUrl()">
                        {{ successCon.leftBtn.text }}
                    </div>
                    <div class="right_btn" @click="goRightUrl()">
                        {{ successCon.rightBtn.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name: 'subSuccess',
    data() {
        return {
            successCon: {},
        };
    },
    created() {
        if (sessionStorage.successCon) {
            this.successCon = JSON.parse(sessionStorage.successCon);
        } else {
            Toast({
                message: '非法操作',
                duration: 2000,
            });
            setTimeout(() => {
                this.$router.replace({
                    path: '/',
                });
            }, 2000);
        }
    },
    mounted() {
        let _this = this;
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', _this.goback, false);
        }
    },
    destroyed() {
        let _this = this;
        window.removeEventListener('popstate', _this.goback, false);
        sessionStorage.removeItem('successCon');
    },
    methods: {
        goback() {
            this.$router.replace({
                path: this.successCon.goUrl,
            });
        },
        goLeftUrl() {
            this.$router.replace({
                path: this.successCon.leftBtn.url,
            });
        },
        goRightUrl() {
            if (this.successCon.rightBtn.past) {
                this.$router.replace({
                    path: this.successCon.rightBtn.url,
                    query: {
                        past: this.successCon.rightBtn.past,
                    },
                });
            } else {
                this.$router.replace({
                    path: this.successCon.rightBtn.url,
                });
            }
        },
    },
};
</script>
