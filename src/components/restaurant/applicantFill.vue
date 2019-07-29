<template>
    <div class="applicantFill fill_information head_box">
        <nav-header title=" " gobackurl="restaurantFill"></nav-header>
        <div class="con_box containerView-main">
            <div class="list_box">
                <div class="title">
                    <span class="act_icon" @click="goBack()">申请信息</span>
                    <span class="act_icon active">申请人信息</span>
                </div>
                <div v-if="hasSubject">
                    <div class="list_item" @click.stop="gosubjectList()">
                        <span>申请人名称</span>
                        <p class="list-item-right">{{ subject.corpname }}</p>
                        <!-- <input type="text" readonly="readonly" v-model="subject.corpname" /> -->
                        <span class="icon_r"></span>
                    </div>
                    <div class="list_item">
                        <span>联系人</span>
                        <p class="list-item-right">{{ subject.linkman }}</p>
                        <!-- <input type="text" readonly="readonly" v-model="subject.linkman" /> -->
                    </div>
                    <div class="list_item">
                        <span>联系电话</span>
                        <p class="list-item-right">{{ subject.phone }}</p>
                        <!-- <input type="text" readonly="readonly" v-model="subject.phone" /> -->
                    </div>
                    <div class="list_item">
                        <span>联系邮箱</span>
                        <p class="list-item-right">{{ subject.email }}</p>
                        <!-- <input type="text" readonly="readonly" v-model="subject.email" /> -->
                    </div>
                    <div class="list_item">
                        <span>联系地址</span>
                        <p class="list-item-right">{{ address }}</p>
                        <!-- <input type="text" readonly="readonly" v-model="address" /> -->
                    </div>
                    <div class="list_item">
                        <span>详细地址</span>
                        <p class="list-item-right">{{ addressT }}</p>
                        <!-- <input type="text" readonly="readonly" v-model="addressT" /> -->
                    </div>
                </div>
                <div class="fill_n" v-else>
                    <!-- <p>暂无申请人信息</p>
					<div class="add_fill" @click="addSubject()">新增</div> -->
                </div>
            </div>
        </div>
        <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ all_price }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="goNext()">预览</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
export default {
    name: 'applicantFill',
    data() {
        return {
            all_price: sessionStorage.all_price ? sessionStorage.all_price : parseFloat(sessionStorage.price), //总计金额
            text: '空白', //
            subject: {}, //主体信息
            address: '', //联系地址
            addressT: '', //详细地址
            hasSubject: false, //是否有申请人信息
        };
    },
    created() {
        this.init(); //初始化
    },
    methods: {
        //初始化获取主体信息
        init() {
            if (sessionStorage.subject) {
                this.hasSubject = true;
                this.subject = JSON.parse(sessionStorage.subject);
                this.address = this.subject.province + this.subject.city + this.subject.area; //联系地址
                this.addressT = this.subject.address; //详细地址
            } else {
                this.$axios.post('index.php?c=App&a=getApplicant').then(res => {
                    if (res.data.errcode == 0) {
                        this.hasSubject = true;
                        this.subject = res.data.content; //第一条主体信息
                        this.address = this.subject.province + this.subject.city + this.subject.area; //联系地址
                        this.addressT = this.subject.address; //详细地址
                    } else if (parseInt(res.data.errcode) === 20001) {
                        this.hasSubject = false;
                        MessageBox.confirm('', {
                            message: res.data.errmsg + '，是否前往新增',
                            title: '提示',
                            showCancelButton: true, //是否显示取消按钮
                            closeOnClickModal: false, //点击遮罩层是否可以关闭
                        })
                            .then(action => {
                                if (action == 'confirm') {
                                    this.addSubject();
                                }
                            })
                            .catch(err => {
                                if (err == 'cancel') {
                                    this.hasSubject = false;
                                    //取消的回调
                                }
                            });
                    } else {
                        Toast({
                            message: this.errmsg,
                            duration: 3000,
                        });
                    }
                });
            }
        },
        //新增主体
        addSubject() {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/addSubject',
            });
        },
        //预览
        goNext() {
            if (this.hasSubject) {
                sessionStorage.subject = JSON.stringify(this.subject);
                this.$router.push({
                    path: '/confirmOrder',
                });
            } else {
                MessageBox.confirm('', {
                    message: '暂无申请人信息，是否前往新增',
                    title: '提示',
                    showCancelButton: true, //是否显示取消按钮
                    closeOnClickModal: false, //点击遮罩层是否可以关闭
                })
                    .then(action => {
                        if (action == 'confirm') {
                            this.addSubject();
                        }
                    })
                    .catch(err => {
                        if (err == 'cancel') {
                            this.hasSubject = false;
                            //取消的回调
                        }
                    });
            }
        },
        //修改主体
        gosubjectList() {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/subjectList',
            });
        },
        //返回申请信息
        goBack() {
            this.$router.push({
                path: '/restaurantFill',
            });
        },
    },
};
</script>
