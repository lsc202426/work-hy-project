<template>
	<div id="iInvoice" class="iInvoice">
        <nav-header title="合同已申请详情"></nav-header>
		<!-- 内容 -->
		<div class="containerView-main">
            <div class="iInvoice-cont detail">
                <a class="invoice-tips contDetail"  download="" id="downloads" @click="checkInv(getContact.status)">
                    <span>{{getContact.order_no}}</span>
                    <div class="con-right">
                        <span v-if="getContact.status == '0'">审核中</span>
                        <span v-if="getContact.status == '1'">已申领</span>
                        <span v-if="getContact.status == '-1'">失败</span>
                        <img v-if="getContact.status == '1'" src="../../assets/images/order/icon_right.png" alt="">
                    </div>
                </a>
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
        <div class="shade" v-if="shadeShow" @click="closeImg()">
            <div class="shade-box">
                <div class="invoice-img" :style="{ backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + getContact.invoice_attachment + ')' }"></div>
            </div>
            <p>长按保存图片</p>
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
                getContact: [],
                shadeShow: false
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
            // 关闭图片
            closeImg(){
                this.shadeShow = false;
            },
            // 查看发票
            checkInv(status){
                var _this = this;
                if(status == '0' || status == '-1'){
                    return ;
                }else{
                    var url = "http://oapi.huyi.cn:6180/" + _this.getDetail.invoice_attachment;
                    var downL = document.getElementById("downloads");
                    downL.href = url;
                    // if(_this.getDetail.invoice_attachment.split('.')[1] != 'pdf'){
                    //     _this.shadeShow = true;
                    // }else{
                    // }
                }
            },
            
		}
	};
</script>
<style lang="scss">

</style>

