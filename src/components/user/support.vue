<template>
	<div id="support" class="support">
        <nav-header title="帮助支持"></nav-header>
        <div class="support-box">

            <div class="support-top">
                <img class="support-logo" src="../../assets/images/user/support_logo.png" alt="">
                <div class="support-linkway">客服热线：{{serviceArr.tel}}&nbsp;&nbsp;&nbsp;客服微信：{{serviceArr.weixin}}</div>
                <a :href="'tel:'+serviceArr.tel">
                    <div class="support-btn support-service">
                        <img src="../../assets/images/user/service.png" alt="">
                        <span>联系客服</span>
                    </div>
                </a>
                <a data-clipboard-action="copy" :data-clipboard-text="serviceArr.weixin" @click="copyWeixin()" class="weixin-copy" ref="copy">
                    <div class="support-btn support-weixin">
                        <img src="../../assets/images/user/weixin.png" alt="">
                        <span>复制微信</span>
                    </div>
                </a>
            </div>
            <div class="support-msg">
                <div class="manage" v-if="personalArr">
                    <div class="manage-post">客户经理</div>
                    <div class="manage-msg">
                        <div class="manage-list manage-name">
                            <em>客户代表</em>
                            <p>{{personalArr.name}}</p>
                        </div>
                        <div class="manage-list job-num">
                            <em>工号</em>
                            <p>{{personalArr.number}}</p>
                        </div>
                        <div class="manage-list link-phone">
                            <div class="link-left">
                                <em>联系电话</em>
                                <p>{{personalArr.phone}}</p>
                            </div>
                            <a :href="'tel:'+personalArr.phone">
                                <img class="link-right" src="../../assets/images/user/tel_phone.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="manage" v-if="branchArr">
                    <div class="manage-post">所属机构</div>
                    <div class="manage-msg">
                        <div class="manage-list manage-name">
                            <em>机构</em>
                            <p>{{branchArr.name}}</p>
                        </div>
                        <div class="manage-list job-num">
                            <em>地址</em>
                            <p>{{branchArr.address}}</p>
                        </div>
                        <div class="manage-list link-phone">
                            <div class="link-left">
                                <em>联系电话</em>
                                <p>{{branchArr.phone}}</p>
                            </div>
                            <a :href="'tel:'+branchArr.phone">
                                <img class="link-right" src="../../assets/images/user/tel_phone.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="manage">
                    <div class="manage-post">总部机构</div>
                    <div class="manage-msg">
                        <div class="manage-list manage-name">
                            <em>机构</em>
                            <p>环球商域</p>
                        </div>
                        <div class="manage-list job-num">
                            <em>地址</em>
                            <p>广州市体育西路财富广场26楼</p>
                        </div>
                        <div class="manage-list link-phone">
                            <div class="link-left">
                                <em>联系电话</em>
                                <p>6572-07884344</p>
                            </div>
                            <a href="tel:6572-07884344">
                                <img class="link-right" src="../../assets/images/user/tel_phone.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="been-bot">
                <i class="been-left"></i>
                <span>已到底部</span>
                <i class="been-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
    export default{
        name: "capiral",

        data(){
            return {
                branchArr: [],
                hqArr: [],
                personalArr: [],
                serviceArr: [],
            }
        },
        created() {
			this.getMsg();
		},
        methods: {
            copyWeixin(){
                // console.log(this.clipboard)
                var clipboard = new this.clipboard(".weixin-copy");
                console.log(clipboard)
                clipboard.on("success",function () {
                    Toast({
                        message: '复制成功',
                        duration: 3000
                    });
                })
                Toast({
                    message: '复制失败',
                    duration: 3000
                });
            },
            getMsg() {
				let _this=this;
				this.$axios.post('index.php?c=App&a=getMyService', {
                       userid: 1,
					})
					.then(function(response) {
                        console.log(response.data.content)
                        _this.branchArr = response.data.content.branch
                        _this.hqArr = response.data.content.hq
                        _this.personalArr = response.data.content.personal
                        _this.serviceArr = response.data.content.service
					})
					.catch(function(error) {
						// console.log(error);
					});
			},
        },
    }
</script>

<style lang="scss">
</style>
