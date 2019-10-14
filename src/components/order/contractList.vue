<template>
    <div class="contractList bg_gray">
        <nav-header :title="title"></nav-header>
        <div class="containerView-main">
            <div class="list_content">
                <div class="list_content_box">
                    <div class="list_content_item f_bgf">
                        <div v-if="!$route.query.past" class="item_left">
                            <i :class="['checkbox_i',{active:isChecked}]" @click="setChecked()"></i>
                        </div>
                        <div class="item_right">
                            <div class="item_right_order" @click.stop="seeOrder()">
                                <div class="item_num">HP23948942342394234234</div>
                                <div class="item_see">查看订单</div>
                            </div>
                            <div class="item_right_con">
                                <div class="item_right_con_main">
                                    <span class="con_main_name">广东互易网络知识产权有限公司</span>
                                    <span class="con_main_money">￥12125.00</span>
                                </div>
                                <div class="item_right_con_time">2019/03/08 12：01</div>
                            </div>
                            <!-- <div class="item_right_oper">
                                <span>去开票</span>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div v-if="!$route.query.past" class="apply_contract" @click="goContract()">
                    申领
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"contractList",
    data() {
        return {
            title:this.$route.query.past?"历史合同":"申领合同",
            isChecked:false,
        }
    },
    created() {
        
    },
    methods: {
        seeOrder(){
            if(this.$route.query.past){
                this.$router.push({
                    path:'/contDetail',
                })
            }
        },
        goContract(){
            this.$router.push({
                path:'/contract',
                query:{
                    id:'HP190826095316000088735414'
                }
            })
        },
        setChecked(){
            this.isChecked=!this.isChecked;
        }
    },
}
</script>