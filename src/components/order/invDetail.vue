<template>
	<div id="iInvoice" class="iInvoice">
        <nav-header title="发票详情"></nav-header>
		<!-- 内容 -->
		<div class="containerView-main">
            <div class="iInvoice-cont detail">
                <div class="invoice-tips">
                    <span>{{order_no}}</span>
                </div>
                <div class="i-detail">
                    <a class="i-title" download="" id="download" @click="checkInv(getDetail.status)">
                        <p>电子发票</p>
                        <div class="i-title-right">
                            <span v-if="getDetail.status == '0'">审核中</span>
                            <span v-if="getDetail.status == '1'">已申领</span>
                            <span v-if="getDetail.status == '-1'">失败</span>
                            <img v-if="getDetail.status == '1'" src="../../assets/images/order/icon_right.png" alt="">
                        </div>
                    </a>
                    <div class="i-cont">
                        <div class="title-D">
                            <div class="title-left">
                                抬头类型
                            </div>
                            <div class="title-right" v-if="getDetail.invoice_payable_type == '1'">
                                个人、事业单位
                            </div>
                            <div class="title-right" v-if="getDetail.invoice_payable_type == '2'">
                                企业
                            </div>
                        </div>
                        <div class="title-D">
                            <div class="title-left">
                                发票抬头
                            </div>
                            <div class="title-right">
                                {{getDetail.invoice_payable}}
                            </div>
                        </div>
                        <div class="title-D" v-if="getDetail.invoice_payable_type == '2'">
                            <div class="title-left">
                                纳税人识别号
                            </div>
                            <div class="title-right">
                                {{getDetail.taxpayer_no}}
                            </div>
                        </div>
                    </div>
                    <div class="i-cont" v-if="showCont && getDetail.invoice_payable_type == '2'">
                        <div class="title-D">
                            <div class="title-left">
                                联系电话
                            </div>
                            <div class="title-right">
                                {{getDetail.tax_phone?getDetail.tax_phone:'暂无'}}
                            </div>
                        </div>
                        <div class="title-D">
                            <div class="title-left">
                                收件地址
                            </div>
                            <div class="title-right">
                                {{getDetail.tax_address?getDetail.tax_address:'暂无'}}
                            </div>
                        </div>
                        <div class="title-D">
                            <div class="title-left">
                                开户行及账号
                            </div>
                            <div class="title-right">
                                {{getDetail.tax_bankinfo?getDetail.tax_bankinfo:'暂无'}}
                            </div>
                        </div>
                        <div class="title-D">
                            <div class="title-left">
                                备注说明
                            </div>
                            <div class="title-right">
                                {{getDetail.remarks?getDetail.remarks:'暂无'}}
                            </div>
                        </div>
                    </div>
                    <div class="i-cont">
                        <div class="title-D">
                            <div class="title-left">
                                发票内容
                            </div>
                            <div class="title-right">
                                {{getDetail.invoice_content}}
                            </div>
                        </div>
                        <div class="title-D">
                            <div class="title-left">
                                发票金额
                            </div>
                            <div class="title-right">
                                ￥{{getDetail.invoice_money}}
                            </div>
                        </div>
                        <div class="title-D">
                            <div class="title-left">
                                申请时间
                            </div>
                            <div class="title-right">
                                {{getDetail.created_time}}
                            </div>
                        </div>
                    </div>
                    <div class="open-close" @click="open()" v-if="getDetail.invoice_payable_type == '2'">
                        <span>{{openOrc}}</span>
                        <img class="open-img" :class="{'close-img': showCont }" src="../../assets/images/order/icon_right.png" alt="">
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
                                {{getDetail.receiver_email}}
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
                <div class="invoice-img" :style="{ backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + getDetail.invoice_attachment + ')' }"></div>
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
                order_no: this.$route.query.id,
                showCont: false,
                openOrc: '展开',
                getDetail: [],
                shadeShow: false
			};
		},
		
		created() {
			
			this.init(); //初始化数据
		},
		methods: {
			init(){
                var _this = this;
                
                // 获取其他数据
                this.$axios
                    .post("index.php?c=App&a=getInvoiceInfo", {
                        order_no: _this.order_no
                    })
                    .then(function(response) {
                        console.log(response)
                        if(response.data.errcode == 0){
                            _this.getDetail = response.data.content;
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
                    if(_this.getDetail.invoice_attachment.split('.')[1] != 'pdf'){
                        _this.shadeShow = true;
                        // var url = "http://oapi.huyi.cn:6180/" + _this.getDetail.invoice_attachment;
                    }else{
                        var url = "http://oapi.huyi.cn:6180/" + _this.getDetail.invoice_attachment;
                        var downL = document.getElementById("download");
                        downL.href = url;
                    }
                }
            },
            open(){
                if(this.showCont == false){
                    this.showCont = true;
                    this.openOrc = '收起';
                }else if(this.showCont == true){
                    this.showCont = false;
                    this.openOrc = '展开';
                }
            }
		}
	};
</script>
<style lang="scss">

</style>

