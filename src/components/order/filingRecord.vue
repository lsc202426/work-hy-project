<template>
    <div class="filingRecord">
        <nav-header title="历史备案记录进度"></nav-header>
        <div class="containerView-main">
            <div class="filingRecord_box">
                <!-- 头部导航 -->
                <div class="filingRecord_title">
                    <span @click="changeI(index)" :class="{active:index==tsp}" v-for="(title,index) in titles" :key="index">
                        {{title.name}}
                    </span>
                </div>
                <!-- 主办单位信息 -->
                <div class="filingRecord_con" v-show="tsp==0">
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>主体备案号</span>
                            <span>粤ICP备14097259号</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>主办单位性质</span>
                            <span>企业</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>主办单位证件号码</span>
                            <span>{{icpContent.cardno}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>主办单位证件</span>
                        </div>
                        <div class="papers">
                            <img src="../../assets/images/myproduct/img1.jpg" alt="">
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>主办负责人证件</span>
                        </div>
                        <div class="papers">
                            <img src="../../assets/images/myproduct/img1.jpg" alt="">
                        </div>
                    </div>
                </div>
                <!-- 网站信息 -->
                <div class="filingRecord_con" v-show="tsp==1">
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>网站名称</span>
                            <span>{{icpContent.domain}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>域名列表</span>
                        </div>
                        <div class="domain_list f_bd">
                            <div class="domain_list_item f_bdb">
                                <span>网站域名</span>
                                <span>商域.商标</span>
                            </div>
                            <div class="domain_list_item">
                                <span>域名证书</span>
                                <span class="domain_certificate">
                                    <img src="../../assets/images/myproduct/img1.jpg" alt="">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>网站首页地址</span>
                            <span>www.商域.商标</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>网站服务内容</span>
                            <span>单位门户网站</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>应用服务类型</span>
                            <span>网站应用服务</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>网站语言</span>
                            <span>中文简体</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>IP地址</span>
                            <span>106.75.6.206</span>
                        </div>
                    </div>
                </div>
                <!-- 网站负责人信息 -->
                <div class="filingRecord_con" v-show="tsp==2">
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>负责人姓名</span>
                            <span>{{icpContent.linkman}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>负责人证件类型</span>
                            <span>居民身份证</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>负责人证件</span>
                        </div>
                        <div class="papers idPapers">
                            <img src="../../assets/images/myproduct/img1.jpg" alt="">
                            <img src="../../assets/images/myproduct/img1.jpg" alt="">
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>负责人证件号码</span>
                            <span>{{icpContent.linkman_cardno}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>手机号码</span>
                            <span>{{icpContent.mobile}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>应急联系电话</span>
                            <span>{{icpContent.back_phone}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>电子邮箱</span>
                            <span>{{icpContent.email}}</span>
                        </div>
                    </div>
                    <div class="filingRecord_con_item f_bdb">
                        <div class="fr_con_item_box">
                            <span>QQ</span>
                            <span>1000459034</span>
                        </div>
                    </div>
                </div>
                <customer-service></customer-service>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:"filingRecord",
    data() {
        return {
            domain:this.$route.query.domain,
            titles:[
                {name:"主办单位信息"},
                {name:"网站信息"},
                {name:"网站负责人信息"},
            ],
            tsp:"0",
            icpContent:{},
        }
    },
    created() {
        this.init();//初始化获取备案信息
    },
    methods: {
        changeI(i){
            this.tsp=i;
        },
        //获取备案信息
        init(){
            this.$axios.post('index.php?c=App&a=getIcp',{
                domain: this.domain,
            })
            .then((res)=>{
                if(res.data.errcode==0){
                    this.icpContent=res.data.content;
                }else{
                    Toast({
                        message: res.data.errmsg,
                        duration: 2000,
                    });
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    #app .containerView-main{
        padding-bottom:0;
    }
</style>