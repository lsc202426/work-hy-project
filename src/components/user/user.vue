<template>
	<div id="user" class="user">
        <div class="user-top">
            <div class="user-top-word">
                <div class="head-over">
                    <div class="head-portrait" :style="{backgroundImage: 'url(' + headPort + ')' }">
                        
                    </div>
                </div>
                <div class="user-self-msg">
                    <div class="self-left">
                        <p class="self-nickname">叶秀兰</p>
                        <p class="self-name">19256658962</p>
                    </div>
                    <span class="self-edit">编辑</span>
                </div>
            </div>
        </div>
        <div class="user-list">
            <div class="user-list-block">
                <div class="order-top">
                    <div class="order-top-left">我的订单</div>
                    <div class="order-top-right">
                        <span>全部订单</span>
                        <img src="../../assets/images/user/advance.png" alt="">
                    </div>
                </div>
                <div class="order-block">
                    <div class="order-list">
                        <img src="../../assets/images/user/obligation.png" alt="">
                        <p class="order-word">待付款</p>
                    </div>
                    <div class="order-list">
                        <img src="../../assets/images/user/audit.png" alt="">
                        <p class="order-word">审核中</p>
                    </div>
                    <div class="order-list">
                        <img src="../../assets/images/user/pending.png" alt="">
                        <p class="order-word">待处理</p>
                    </div>
                    <div class="order-list">
                        <img src="../../assets/images/user/stocks.png" alt="">
                        <p class="order-word">已完成</p>
                    </div>
                </div>
            </div>
            <div class="user-list-block tail">
                <div class="order-top">
                    <div class="order-top-left">产品跟踪</div>
                </div>
                <div class="order-block">
                    <div class="order-list">
                        <p class="tail-num">78</p>
                        <p>品牌预警</p>
                    </div>
                    <div class="order-list">
                        <p class="tail-num">18</p>
                        <p>站点预警</p>
                    </div>
                    <div class="order-list">
                        <p class="tail-num">5</p>
                        <p>订单跟踪</p>
                    </div>
                    <div class="order-list">
                        <p class="tail-num">7</p>
                        <p>续费提醒</p>
                    </div>
                </div>
            </div>
            <div class="user-list-block set">
                <div class="list-msg">
                    <img class="capital-left" src="../../assets/images/user/capital.png" alt="">
                    <div class="capital-right">
                        <span>
                            我的资金
                        </span>
                        <img src="../../assets/images/user/advance.png" alt="">
                    </div>
                </div>
                <div class="list-msg">
                    <img class="capital-left" src="../../assets/images/user/datum.png" alt="">
                    <div class="capital-right">
                        <span>
                            注册资料
                        </span>
                        <img src="../../assets/images/user/advance.png" alt="">
                    </div>
                </div>
                <div class="list-msg">
                    <img class="capital-left" src="../../assets/images/user/support.png" alt="">
                    <div class="capital-right">
                        <span>
                            帮助支持
                        </span>
                        <img src="../../assets/images/user/advance.png" alt="">
                    </div>
                </div>
                <div class="list-msg">
                    <img class="capital-left" src="../../assets/images/user/setting.png" alt="">
                    <div class="capital-right">
                        <span>
                            设置
                        </span>
                        <img src="../../assets/images/user/advance.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: "user",

        data(){
            return {
                headPort : require("@/assets/images/user/support.png")
            }
        }
    }
</script>

<style lang="scss">
</style>
