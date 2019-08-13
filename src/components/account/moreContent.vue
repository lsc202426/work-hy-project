<template>
    <div class="moreContent">
        <mt-header class="header" title="发票更多内容" fixed>
            <mt-button slot="left" icon="back" @click="submit()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <!-- <nav-header title="发票更多内容" gobackurl="/account"></nav-header> -->
        <div class="main containerView-main">
            <div class="more_con f_bgf f_pdFix">
                <div class="more_con_item f_bdb">
                    <span>地址</span>
                    <input type="text" v-model="more.tax_address" placeholder="请填写地址">
                </div>
                <div class="more_con_item f_bdb">
                    <span>电话</span>
                    <input type="tel" v-model="more.tax_phone" placeholder="请填写电话">
                </div>
                <div class="more_con_item f_bdb">
                    <span>开户行及账号</span>
                    <input type="text" v-model="more.tax_bankinfo" placeholder="请填写开户行及账号">
                </div>
                <div class="more_con_item f_bdb">
                    <span>备注说明</span>
                    <input type="text" v-model="more.remarks" placeholder="请填写备注说明">
                </div>
            </div>
            <div class="more_bottom" @click="submit()">
                确定
            </div>
        </div>
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:'moreContent',
    data(){
        return {
            more:{
                tax_address:'',//地址
                tax_phone:'',//电话
                tax_bankinfo:'',//开户行及账号
                remarks:'',//备注说明
                index:this.index,
                num:0,//填写了多少项
                number:0,//总共多少项
            }
        }
    },
    props:{
        index:Number,
        moreI:Object,
    },
    created() {
        if(Object.keys(this.moreI).length!=0){
            this.more=this.moreI;
        }
    },
    methods: {
        //确定提交
        submit(){
            this.more.number=0;
            this.more.num=0;
            if(this.more.tax_phone&&this.more.tax_phone!=""){
                let regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
                if(!regMobile.test(this.more.tax_phone)){
                    Toast({
                        message: '请输入正确的手机号',
                        duration: 1500,
                    });
                return false;
                }
            }
            Object.keys(this.more).forEach((key)=>{
                if(this.more[key]!='0'){
                    if(this.more[key]==''||this.more[key]==null){
                        this.more.num+=1;
                    }
                }
                this.more.number+=1;
            })
            this.more.number=this.more.number-3;
            this.more.num=this.more.number-this.more.num;
            this.$emit('getMoreContent',this.more);
        }
    },
}
</script>