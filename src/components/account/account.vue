<template>
    <div class="account">
        <nav-header title="结算" gobackurl="/shoppingCart" v-show="!isShow"></nav-header>
        <div class="main containerView-main">
            <!-- 申请列表 -->
            <div class="account_sub f_pdFix f_mb10 f_bgf" v-for="(item, index) in msg.list" :key="index">
                <div class="account_title f_bdb" @click="showSubject(item.id)">{{ item.name }}</div>
                <div class="account_item f_bdb">
                    <p v-for="(list, index) in item.detail" :key="index">
                        <span>
                            <i>{{ list.keyword.split('.')[0] }}</i>
                            <i v-if="list.keyword.split('.')[1]">.</i>
                            <i v-if="list.keyword.split('.')[1]">{{ list.keyword.split('.')[1] }}</i>
                        </span>
                        <span v-if="list.year">{{ list.year }}年</span>
                        <span>￥{{ list.total }}</span>
                    </p>
                </div>
                <div class="account_total">总计：￥{{ parseFloat(item.total).toFixed(2) }}</div>
            </div>
            <!-- 电子合同 -->
            <div class="account_contract f_pdFix f_mb10 f_bgf">
                <div class="contract_top f_bdb">
                    <div class="contract_top_left" @click="isShowHt()"><span :class="{ active: showHt }"></span>电子合同</div>
                    <div class="contract_top_right" v-if="showHt">共{{ num }}张</div>
                </div>
                <div class="contract_con" v-if="showHt">
                    <div class="contract_con_i">
                        <span class="con_i_left">接收邮箱</span>
                        <input type="email" class="con_i_right f_bdb" v-model="emailHt" placeholder="请输入接收邮箱" />
                    </div>
                </div>
            </div>
            <!-- 开具发票 -->
            <div class="account_contract f_pdFix f_mb10 f_bgf">
                <div class="contract_top f_bdb">
                    <div class="contract_top_left" @click="isShowFp()"><span :class="{ active: showFp }"></span>开具发票</div>
                    <div class="contract_top_right" v-if="showFp">共{{ num }}张</div>
                </div>
                <div v-if="showFp">
                    <div class="contract_con f_bdb_d" v-for="(item, index) in msg.list" :key="index">
                        <div class="contract_con_i">
                            <span class="con_i_left">抬头类型</span>
                            <span class="con_i_right">{{ item.invoice.invoice_payable_type == 1 ? '个人' : '企业' }}</span>
                        </div>
                        <div class="contract_con_i">
                            <span class="con_i_left">发票抬头</span>
                            <span class="con_i_right">{{ item.invoice.invoice_payable }}</span>
                        </div>
                        <div class="contract_con_i" v-if="item.invoice.invoice_payable_type != 1">
                            <span class="con_i_left">纳税人识别号</span>
                            <input
                                type="text"
                                class="con_i_right f_bdb"
                                v-model="item.invoice.taxpayer_no"
                                placeholder="请输入纳税人识别号"
                            />
                        </div>
                        <div class="contract_con_i">
                            <span class="con_i_left">发票内容</span>
                            <span class="con_i_right">信息技术服务注册服务费</span>
                        </div>
                        <div class="contract_con_i">
                            <span class="con_i_left">金额</span>
                            <span class="con_i_right">￥{{ item.total }}</span>
                        </div>
                        <div class="contract_con_i" v-if="item.invoice.invoice_payable_type != 1">
                            <span class="con_i_left">更多内容</span>
                            <span v-if="item.invoice.num != 0" class="con_i_right" @click.stop="moreContent(index)"
                                >共{{ item.invoice.number }}项，已填写{{ item.invoice.num }}项</span
                            >
                            <span v-else class="con_i_right" @click.stop="moreContent(index)">{{ item.exportText }}</span>

                            <span class="icon_r"></span>
                        </div>
                        <more-content
                            @getMoreContent="getMoreContent"
                            :moreI="item.invoice"
                            v-if="isShow && index == clickItem"
                            :index="clickItem"
                        ></more-content>
                    </div>
                </div>
                <div class="contract_con" v-if="showFp">
                    <div class="contract_con_i">
                        <span class="con_i_left">接收邮箱</span>
                        <input type="email" class="con_i_right" v-model="emailFp" placeholder="请输入接收邮箱" />
                    </div>
                </div>
            </div>
        </div>
        <div class="account_bottom f_bgf" v-show="!isShow">
            <div class="account_bottom_left">
                <p>总计：</p>
                <p class="price">¥ {{ msg.total }}元</p>
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
    name: 'account',
    data() {
        return {
            ids: sessionStorage.ids, //支付id
            msg: {}, //页面展示内容
            num: 0, //合同发票数量
            showHt: false, //是否显示电子合同
            emailHt: '', //申请电子合同邮箱
            showFp: false, //是否显示发票
            emailFp: '', //申请发票邮箱
            isShow: false, //发票更多内容
            token: sessionStorage.token,
            clickItem: 0, //点击触发了哪个
        };
    },
    components: {
        moreContent,
    },
    watch: {
        fillIn(val) {
            //console.log(val);
        },
    },
    created() {
        this.init(); //初始化获取数据
    },
    mounted() {
        let _this = this;
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', _this.goback, false);
        }
    },
    destroyed() {
        let _this = this;
        window.removeEventListener('popstate', _this.goback, false);
        //如果是换词，销毁时触发删除申请列表项
        if (sessionStorage.changeId) {
            _this.$axios
                .post('index.php?c=App&a=delWishlist', {
                    ids: sessionStorage.ids,
                })
                .then(function() {});
        }
    },
    methods: {
        //获取信息内容
        init() {
            //index.php?c=App&a=getSettlement
            this.$axios
                .post('index.php?c=App&a=getSettlement', {
                    ids: this.ids,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.msg = res.data.content;
                        this.num = this.msg.list.length; //开票总数
                        this.emailHt = this.msg.list[0].email; //合同电子邮箱默认值
                        this.emailFp = this.msg.list[0].email; //发票邮箱默认值
                        for (let i = 0; i < this.msg.list.length; i++) {
                            let itemNum = 0; //填写了多少项
                            this.$set(this.msg.list[i], 'exportText', '填写备注、地址等（非必填）');
                            this.$set(this.msg.list[i].invoice, 'num', 0); //填写了多少项
                            this.$set(this.msg.list[i].invoice, 'number', 4); //总共多少项
                            this.$set(this.msg.list[i].invoice, 'remarks', ''); //备注说明
                            if (
                                this.msg.list[i].invoice.tax_address != '' &&
                                this.msg.list[i].invoice.tax_address != null &&
                                this.msg.list[i].invoice.tax_address != undefined
                            ) {
                                itemNum += 1;
                            }
                            if (
                                this.msg.list[i].invoice.tax_phone != '' &&
                                this.msg.list[i].invoice.tax_phone != null &&
                                this.msg.list[i].invoice.tax_phone != undefined
                            ) {
                                itemNum += 1;
                            }
                            if (
                                this.msg.list[i].invoice.tax_bankinfo != '' &&
                                this.msg.list[i].invoice.tax_bankinfo != null &&
                                this.msg.list[i].invoice.tax_bankinfo != undefined
                            ) {
                                itemNum += 1;
                            }
                            this.msg.list[i].invoice.num = itemNum;
                        }
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                    }
                });
        },
        //返回申请列表
        goback() {
            this.$router.push({
                path: '/shoppingCart',
            });
        },
        //显示申请信息
        showSubject(id) {
            sessionStorage.formUrlOne = '/account';
            this.$router.push({
                path: '/addSubject',
                query: {
                    id: id,
                    status: '2',
                },
            });
        },
        //电子合同控制手柄
        isShowHt() {
            this.showHt = !this.showHt;
        },
        //发票控制手柄
        isShowFp() {
            this.showFp = !this.showFp;
        },
        //发票更多内容
        moreContent(i) {
            this.clickItem = i;
            this.isShow = true;
        },
        //获取发票更多内容
        getMoreContent(data) {
            this.isShow = false;
            if (data) {
                //判断是否有返回值
                this.msg.list[data.index].invoice.tax_address = data.tax_address; //地址
                this.msg.list[data.index].invoice.tax_phone = data.tax_phone; //电话
                this.msg.list[data.index].invoice.tax_bankinfo = data.tax_bankinfo; //开户行及账号
                this.msg.list[data.index].invoice.num = data.num; //开户行及账号
                this.msg.list[data.index].invoice.remarks = data.remarks; //备注说明
            }
        },
        //去支付
        goPayment() {
            let _this = this;
            let regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            let ele_contract = {};
            //是否需要电子合同
            if (this.showHt) {
                if (!this.emailHt) {
                    Toast({
                        message: '请输入接收邮箱',
                        duration: 2000,
                    });
                    return false;
                } else if (!regEmail.test(this.emailHt)) {
                    Toast({
                        message: '请输入正确邮箱',
                        duration: 2000,
                    });
                    return false;
                }
                //电子合同
                ele_contract = {
                    is_contract: 1,
                    email: this.emailHt,
                };
            } else {
                ele_contract = {
                    is_contract: 0,
                };
            }
            let ele_invoice = {};
            //是否需要开具发票
            if (this.showFp) {
                //开具发票
                let detail = [];
                for (let i = 0; i < this.msg.list.length; i++) {
                    if (
                        this.msg.list[i].invoice.invoice_payable_type != 1 &&
                        (this.msg.list[i].invoice.taxpayer_no == '' || this.msg.list[i].invoice.taxpayer_no == null)
                    ) {
                        Toast({
                            message: '请输入纳税人识别号',
                            duration: 2000,
                        });
                        return false;
                    }
                    let obj = {};
                    obj.id = this.msg.list[i].id; //申请人id
                    obj.invoice_payable_type = this.msg.list[i].invoice.invoice_payable_type; //抬头类型
                    obj.invoice_payable = this.msg.list[i].invoice.invoice_payable; //抬头
                    obj.taxpayer_no = this.msg.list[i].invoice.taxpayer_no; //识别号
                    obj.tax_address = this.msg.list[i].invoice.tax_address; //地址
                    obj.tax_phone = this.msg.list[i].invoice.tax_phone; //电话
                    obj.tax_bankinfo = this.msg.list[i].invoice.tax_bankinfo; //开户行及账号
                    obj.remarks = this.msg.list[i].invoice.remarks; //备注说明
                    obj.invoice_content = '信息技术服务注册服务费'; //开票内容，目前固定为“*信息技术服务*注册服务费”
                    obj.invoice_money = this.msg.list[i].total; //开票金额
                    detail.push(obj);
                }
                if (!this.emailFp) {
                    Toast({
                        message: '请输入接收邮箱',
                        duration: 2000,
                    });
                    return false;
                } else if (!regEmail.test(this.emailFp)) {
                    Toast({
                        message: '请输入正确邮箱',
                        duration: 2000,
                    });
                    return false;
                }
                ele_invoice = {
                    is_invoice: 1,
                    email: this.emailFp,
                    detail: detail,
                };
            } else {
                ele_invoice = {
                    is_invoice: 0,
                };
            }
            Indicator.open({
                text: '正在生成支付订单',
                spinnerType: 'fading-circle',
            });
            setTimeout(() => {
                _this.$axios
                    .post('index.php?c=App&a=setOrder', {
                        ids: this.ids,
                        ele_contract: JSON.stringify(ele_contract),
                        ele_invoice: JSON.stringify(ele_invoice),
                    })
                    .then(function(response) {
                        Indicator.close();
                        if (response.data.errcode == 0) {
                            let orderId = response.data.content.order_no; //返回的订单id
                            let counter = response.data.content.counter; //返回的订单个数
                            let created_time = response.data.content.created_time; //下单时间
                            let balance = response.data.content.balance; //平台资金账户余额
                            if (orderId) {
                                // _this.$router.push({
                                //     path:'/playOrder',
                                //     query:{
                                //         id:orderId,
                                //         price:_this.msg.total,
                                //         token:_this.token,
                                //         created_time:created_time,
                                //         balance:balance,
                                //     }
                                // })
                                let changeId = sessionStorage.changeId;
                                if (changeId) {
                                    window.location.href =
                                        'http://h.huyi.cn/playorder?id=' +
                                        orderId +
                                        '&price=' +
                                        _this.msg.total +
                                        '&token=' +
                                        _this.token +
                                        '&created_time=' +
                                        created_time +
                                        '&balance=' +
                                        balance +
                                        '&change_id=' +
                                        changeId;
                                    // 跳转清空
                                    sessionStorage.removeItem('changeId');
                                } else {
                                    window.location.href =
                                        'http://h.huyi.cn/playorder?id=' +
                                        orderId +
                                        '&price=' +
                                        _this.msg.total +
                                        '&token=' +
                                        _this.token +
                                        '&created_time=' +
                                        created_time +
                                        '&balance=' +
                                        balance;
                                }
                            }
                        } else {
                            Toast({
                                message: response.data.errmsg,
                                duration: 2000,
                            });
                        }
                    });
            }, 2000);
        },
    },
};
</script>
