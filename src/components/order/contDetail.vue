<template>
	<div id="iInvoice" class="iInvoice">
        <nav-header title="合同已申请详情"></nav-header>
		<!-- 内容 -->
		<div class="containerView-main">
            <div class="iInvoice-cont detail">
                <div class="invoice-tips contDetail">
                    <span>{{getContact.order_no}}</span>
                    <div class="con-right">
                        <span v-if="getContact.status == '0'">审核中</span>
                        <span v-if="getContact.status == '1'">已申领</span>
                        <span v-if="getContact.status == '-1'">失败</span>
                        <img src="../../assets/images/order/icon_right.png" alt="">
                    </div>
                </div>
            </div>
            <div class="iInvoice-cont detail">
                <div class="i-detail">
                    <div class="i-title">
                        <p>接收信息</p>
                    </div>
                    <div class="i-cont email-cont">
                        <div class="title-D">
                            <div class="title-left">
                                邮箱
                            </div>
                            <div class="title-right">
                                {{getContact.receiver_email}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="service-btn">
                <img src="../../assets/images/order/phone-img.png" alt="">
                <span>联系客服</span>
            </div>
		</div>
		
	</div>
</template>

<script>
	import {
		Toast,
		MessageBox,
		Indicator
    } from "mint-ui";
    
	export default {
		name: "iInvoice",
		data() {
			return {
                orderNum: this.$route.query.id,
                getContact: []
			};
		},
		
		created() {
			
			this.init(); //初始化数据
		},
		methods: {
			init(){
                var _this = this;
                this.$axios
                    .post("index.php?c=App&a=getContractInfo", {
                        order_no: _this.orderNum
                    })
                    .then(function(response) {
                        console.log(response)
                        if(response.data.errcode == 0){
                            _this.getContact = response.data.content;
                        }else{
                            Toast({
                                message: response.data.errmsg,
                                duration: 3000,
                            });
                        }
                    })
                    .catch(function(error) {});
            },
            
		}
	};
</script>
<style lang="scss">

</style>

