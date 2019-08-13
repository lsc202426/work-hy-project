<template>
    <div class="account">
        <nav-header title="结算" gobackurl="/orderList"></nav-header>
        <div class="main containerView-main">
            <!-- 申请列表 -->
            <div class="account_sub f_pdFix f_mb10 f_bgf" v-for="(item,index) in msg.list" :key="index">
                <div class="account_title f_bdb">{{item.name}}</div>
                <div class="account_item f_bdb">
                    <p v-for="(list,index) in item.detail" :key="index">
                        <span>{{list.keyword}}</span>
                        <span>{{list.year}}年</span>
                        <span>￥{{list.total}}</span>
                    </p>
                </div>
                <div class="account_total">
                    总计：￥{{item.total}}
                </div>
            </div>
            <!-- 电子合同 -->
            <div class="account_contract f_pdFix f_mb10 f_bgf">
                <div class="contract_top f_bdb">
                    <div class="contract_top_left" @click="isShowHt()">
                        <span :class="{active:showHt}"></span>电子合同
                    </div>
                    <div class="contract_top_right">
                        共{{num}}张
                    </div>
                </div>
                <div class="contract_con" v-if="showHt">
                    <div class="contract_con_i">
                        <span class="con_i_left">接收邮箱</span>
                        <input type="email" class="con_i_right f_bdb" v-model="emailHt" placeholder="请输入接收邮箱">
                    </div>
                </div>
            </div>
            <!-- 开具发票 -->
            <div class="account_contract f_pdFix f_mb10 f_bgf">
                <div class="contract_top f_bdb">
                    <div class="contract_top_left" @click="isShowFp()">
                        <span :class="{active:showFp}"></span>开具发票
                    </div>
                    <div class="contract_top_right">
                        共{{num}}张
                    </div>
                </div>
                <div v-if="showFp">
                    <div class="contract_con f_bdb_d" v-for="(item,index) in msg.list" :key="index">
                        <div class="contract_con_i">
                            <span class="con_i_left">抬头类型</span>
                            <span class="con_i_right">{{item.invoice.invoice_payable_type==1?'个人':'企业'}}</span>
                        </div>
                        <div class="contract_con_i">
                            <span class="con_i_left">发票抬头</span>
                            <span class="con_i_right">{{item.invoice.invoice_payable}}</span>
                        </div>
                        <div class="contract_con_i" v-if="item.invoice.invoice_payable_type!=1">
                            <span class="con_i_left">纳税人识别号</span>
                            <input type="text" class="con_i_right f_bdb" v-model="item.number" placeholder="请输入纳税人识别号">
                        </div>
                        <div class="contract_con_i">
                            <span class="con_i_left">发票内容</span>
                            <span class="con_i_right">信息技术服务注册服务费</span>
                        </div>
                        <div class="contract_con_i">
                            <span class="con_i_left">金额</span>
                            <span class="con_i_right">￥{{item.total}}</span>
                        </div>
                        <div class="contract_con_i" v-if="item.invoice.invoice_payable_type!=1">
                            <span class="con_i_left">更多内容</span>
                            <span class="con_i_right" @click="moreContent(index)">{{item.exportText}}</span>
                            <span class="icon_r"></span>
                        </div>
                        <more-content @getMoreContent="getMoreContent" v-if="isShow" :index="index"></more-content>
                    </div>
                </div>
                <div class="contract_con" v-if="showFp">
                    <div class="contract_con_i">
                        <span class="con_i_left">接收邮箱</span>
                        <input type="email" class="con_i_right" v-model="emailFp" placeholder="请输入接收邮箱">
                    </div>
                </div>
            </div>
        </div>
        <div class="account_bottom f_bgf">
            <div class="account_bottom_left">
                <p>总计：</p>
                <p class="price">¥ {{msg.total}}元</p>
            </div>
            <div class="account_bottom_right" @click="goPayment()">
                去支付
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import moreContent from '@/components/account/moreContent.vue';
export default {
    name:'account',
    data() {
        return {
            ids:sessionStorage.ids,//支付id
            msg:{},//页面展示内容
            num:0,//合同发票数量
            showHt:false,//是否显示电子合同
            emailHt:'',//申请电子合同邮箱
            showFp:false,//是否显示发票
            emailFp:'',//申请发票邮箱
            isShow:false,//发票更多内容
        }
    },
    components: {
        moreContent
    },
    created() {
        this.init();//初始化获取数据
    },
    methods: {
        //获取信息内容
        init(){
            //index.php?c=App&a=getSettlement
            this.$axios.post('index.php?c=App&a=getSettlement',{
                ids:this.ids
            })
            .then((res)=>{
                if(res.data.errcode==0){
                    this.msg=res.data.content;
                    this.num=this.msg.list.length;//开票总数
                    this.emailHt=this.msg.list[0].email;//合同电子邮箱默认值
                    this.emailFp=this.msg.list[0].email;//发票邮箱默认值
                    for(let i=0;i<this.msg.list.length;i++){
                        this.$set(this.msg.list[i],'exportText','填写备注、地址等（非必填）');
                        this.$set(this.msg.list[i],'number','');//纳税人识别号
                    }
                }else{
                    Toast({
                        message: res.data.errmsg,
                        duration: 2000,
                    });
                }
            })
        },
        //电子合同控制手柄
        isShowHt(){
            this.showHt=!this.showHt;
        },
        //发票控制手柄
        isShowFp(){
            this.showFp=!this.showFp;
        },
        //发票更多内容
        moreContent(i){
            this.isShow=true;
        },
        //获取发票更多内容
        getMoreContent(data){
            this.isShow=false;
            this.$set(this.msg.list[data.index],'more',data);
        },
        //去支付
        goPayment(){
            let _this=this;
            // Indicator.open({
            //     text: '正在生成支付订单',
            //     spinnerType: 'fading-circle',
            // });
            //电子合同
            let ele_contract={
                is_contract:this.showHt?1:0,
                email:this.emailHt
            }
            //开具发票
            let detail=[];
            console.log(this.msg.list);
            for(let i=0;i<this.msg.list.length;i++){
                console.log('haha');
                let obj={};
                obj.id=this.msg.list[i].id;//申请人id
                obj.invoice_payable_type=this.msg.list[i].invoice.invoice_payable_type;//抬头类型
                obj.invoice_payable=this.msg.list[i].invoice.invoice_payable;//抬头
                obj.taxpayer_no=this.msg.list[i].number;//识别号
                if(this.msg.list[i].more){
                    obj.tax_address=this.msg.list[i].more.tax_address;//地址
                    obj.tax_phone=this.msg.list[i].more.tax_phone;//电话
                    obj.tax_bankinfo=this.msg.list[i].more.tax_bankinfo;//开户行及账号
                    obj.remarks=this.msg.list[i].more.remarks;//备注说明
                }else{
                    obj.tax_address='';//地址
                    obj.tax_phone='';//电话
                    obj.tax_bankinfo='';//开户行及账号
                    obj.remarks='';//备注说明
                }
                obj.invoice_content='信息技术服务注册服务费';//开票内容，目前固定为“*信息技术服务*注册服务费”
                obj.invoice_money=this.msg.list[i].total;//开票金额
                detail.push(obj);
                console.log(detail);
            }
            let ele_invoice={
                is_invoice:this.showFp?1:0,
                email:this.emailFp,
                detail:detail
            }
            console.log(this.ids);
            console.log(ele_contract);
            console.log(ele_invoice);
            return;
            setTimeout(() => {
                _this.$axios
                .post('index.php?c=App&a=setOrder', {
                    ids: this.ids,
                    ele_contract:ele_contract,
                    ele_invoice:ele_invoice
                })
                .then(function(response) {
                    Indicator.close();
                    if (response.data.errcode == 0) {
                        let orderId = response.data.content.order_no; //返回的订单id
                        let counter = response.data.content.counter; //返回的订单个数
                        if (orderId) {
                            window.location.href =
                                'http://h.huyi.cn/playorder?id=' +
                                orderId +
                                '&price=' +
                                _this.all_price +
                                '&token=' +
                                _this.token;
                        }
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 2000,
                        });
                    }
                });
            }, 2000);
        }
    },
}
</script>