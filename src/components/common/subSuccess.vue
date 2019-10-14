<template>
    <div class="subSuccess head_box">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="containerView-main">
            <div class="subSuccess_con">
                <img src="../../assets/images/common/success_blue.png" alt="">
                <div class="subSuccess_txt">
                    <p>{{getSuccessCon.title}}</p>
                    <p v-if="getSuccessCon.text">{{getSuccessCon.text}}</p>
                </div>
                <div class="subSuccess_btn_box">
                    <div class="left_btn" @click="goLeftUrl()">
                        {{getSuccessCon.leftBtn.text}}
                    </div>
                    <div class="right_btn" @click="goRightUrl()">
                        {{getSuccessCon.rightBtn.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    name:"subSuccess",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SUCCESS_CON]]),
        ...mapGetters({
            getSuccessCon: [GetterTypes.GET_SUCCESS_CON],
        }),
    },
    created() {
        // console.log(this.getSuccessCon);
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
        sessionStorage.removeItem("successCon");
    },
    methods: {
        // ...mapMutations([MutationTypes.SET_SUCCESS_CON]),
        // ...mapMutations({
        //     [MutationTypes.SET_SUCCESS_CON]: MutationTypes.SET_SUCCESS_CON,
        // }),
        goback(){
            this.$router.push({
                path: this.getSuccessCon.goUrl,
            });
        },
        goLeftUrl(){
            this.$router.push({
                path: this.successCon.leftBtn.url,
            });
        },
        goRightUrl(){
            this.$router.push({
                path: this.successCon.rightBtn.url,
            });
        }
    },

}
</script>
