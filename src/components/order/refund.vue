<template>
	<div id="refund" class="refund">
        <nav-header title="申请退款"></nav-header>
		<!-- 内容 -->
		<div class="containerView-main">
            <div class="refund-cont">
                <div class="refund-d">
                    <span class="refund-left">订单编号：</span>
                    <span>{{orderNum}}</span>
                </div>
                <div class="refund-d">
                    <span class="refund-left">合同金额：</span>
                    <span>¥{{total}}</span>
                </div>
                <div class="refund-d">
                    <span class="refund-left">可退款金额：</span>
                    <span>¥{{refund_money}}</span>
                </div>
            </div>
            <div class="bot">
                <div class="bot-g">
                    <span class="bot-left">退款金额</span>
                    <span class="bot-right">¥{{refund_money}}</span>
                </div>
                <div class="bot-g">
                    <span class="bot-left">退款方式</span>
                    <div class="bot-right">
                        <div class="bot-right-btn" @click="changeType(item.key)" v-for="item in refundArr" :key="item.key">
                            <span class="span-border" :class="{'input-img': refund_type == item.key}"></span>
                            <span>{{item.name}}</span>
                        </div>
                        <!-- <div class="bot-right-btn" @click="changeType('1')">
                            <span class="span-border" :class="{'input-img': refund_type == '1'}"></span>
                            <span>原路退回</span>
                        </div> -->
                    </div>
                </div>
                <div class="bot-g bot-g-text">
                    <span class="bot-left">备注说明</span>
                    <textarea class="bot-right" name="" id="" cols="30" rows="10" placeholder="请填写备注说明（可不填）" v-model="remarks"></textarea>
                </div>
            </div>
            <div class="invoice-btn">
                <span @click="postBtn()">提交</span>
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
		name: "refund",
		data() {
			return {
                email: '',      //邮箱
                orderNum: this.$route.query.id,
                total: '', //总额
                refund_money: '', //退款金额
                refund_type: '',  //退款方式 key值
                refundArr: [],  //退款方式 
                remarks: ''
			};
		},
		
		created() {
			
			this.init(); //初始化数据
		},
		methods: {
            // 选择退款方式
            changeType(type){
                console.log(type)
                this.refund_type = type;
            },
			init(){
                var _this = this;
                this.$axios
                    .post("index.php?c=App&a=getRefund", {
                        order_no: _this.orderNum
                    })
                    .then(function(response) {
                        if(response.data.errcode == 0){
                            var cont = response.data.content;
                            _this.orderNum = cont.order_no;
                            _this.total = cont.total;
                            _this.refund_money = cont.refund_money;
                            _this.refundArr = cont.refund_type;
                            
                        }else{
                            Toast({
                                message: response.data.errmsg,
                                duration: 3000,
                            });
                        }
                    })
                    .catch(function(error) {});
            },
            postBtn(){
                var _this = this;
                console.log(this.refund_type)
                if(this.refund_type == ''){
                    Toast({
                        message: '请选择退款方式',
                        duration: 3000,
                    });
                    return ;
                }
                this.$axios
                    .post("index.php?c=App&a=setRefund", {
                        order_no: _this.orderNum,
                        refund_money: _this.refund_money,
                        refund_type: _this.refund_type,
                        remarks: _this.remarks,
                    })
                    .then(function(response) {
                        console.log(response)
                        if(response.data.errcode == 0){
                            Toast({
                                message: response.data.errmsg,
                                duration: 3000,
                            });
                            setTimeout(() => {
                                _this.$router.push('/orderlist')
                            }, 3000);
                        }else{
                            Toast({
                                message: response.data.errmsg,
                                duration: 3000,
                            });
                        }
                    })
                    .catch(function(error) {});
            }
		}
	};
</script>
<style lang="scss" scoped>
    .refund{
        background: #f2f2f2;
        height: 100%;
        .refund-cont{
            margin-bottom: 0.2rem;
            padding: 0.32rem;
            background: #fff;
            .refund-d{
                display: flex;
                align-items: center;
                font-size: 0.26rem;
                color: #666;
                padding-bottom: 0.2rem;
                .refund-left{
                    width: 25%;
                }
            }
            :last-child{
                padding-bottom: 0;
            }
        }
        .bot{
            padding: 0 0.32rem;
            background: #fff;
            .bot-g{
                display: flex;
                align-items: center;
                font-size: 0.28rem;
                color: #2C3852;
                padding: 0.26rem 0;
                border-bottom: 1px solid #F1F1F1;
                .bot-left{
                    width: 25%;
                }
                .bot-right{
                    display: flex;
                    align-items: center;
                    .bot-right-btn{
                        margin-right: 0.4rem;
                        .span-border{
                            padding: 0;
                            margin: 0;
                            border: 1px solid #979797;
                            height: 0.32rem;
                            width: 0.32rem;
                            background-size: 100%;
                            display: inline-block;
                            vertical-align: middle;
                            border-radius: 50%;
                        }
                        .input-img{
				            background: url(../../assets/images/common/icon-selected.png) center center no-repeat;
                            height: 0.32rem;
                            width: 0.32rem;
                            background-size: 100%;
                            display: inline-block;
                            vertical-align: middle;
                            border: none;
                        }
                        span{
                            font-size: 0.3rem;
                            vertical-align: middle;
                            margin-left: 0.1rem;
                        }
                    }
                    .bot-right-btn:last-child{
                        margin-right: 0;
                    }
                }
            }
            .bot-g-text{
                align-items: inherit;
                textarea{
                    height: 1rem;
                    border: none;
                    width: 75%;
                    resize: none;
                    font-size: 0.28rem;
                    font-family:PingFangHK-Regular;
                    outline: none;

                }
                textarea::-webkit-input-placeholder {
                    font-family:PingFangHK-Regular;
                }
                
            }
        }
        .invoice-btn{
            width: 100%;
            padding: 0.56rem 0.32rem;
            span{
                color: #fff;
                background:linear-gradient(131deg,rgba(15,179,254,1) 0%,rgba(0,134,255,1) 100%);
                padding: 0.24rem 0;
                width: 100%;
                display: inline-block;
                border-radius: 0.5rem;
                text-align: center;
            }
        }
    }
</style>

