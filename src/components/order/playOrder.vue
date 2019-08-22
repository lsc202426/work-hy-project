<template>
    <div class="play-order">
        <!-- head -->
        <mt-header title="收银台" class="header" fixed>
            <mt-button slot="left" icon="back" @click.stop="viewOrderList"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="containerView-main">
            <!-- <div class="play-order-title" v-if="counter == 1">
				<div class="order-id">
					<p>订单号：{{ orderId }}</p>
					<a href="javascript:void(0);" @click.stop="viewDetail">查看详情</a>
				</div>
				<span class="allprice">￥{{ allPrice }}元</span>
			</div>
			<div v-else class="play-order-title">
				<div class="order-id">
					<p>如需查看订单，请前往</p>
					<a href="javascript:void(0);" class="blue" @click.stop="viewOrderList">订单列表</a>
				</div>
				<span class="allprice">￥{{ allPrice }}元</span>
			</div> -->
            <div class="play-order-title">
                <div class="order_text">订单金额</div>
                <div class="order_price">￥{{ allPrice }}</div>
                <div class="order_detail">
                    <p>
                        <span>订单编号</span>
                        <span>{{ orderId }}</span>
                    </p>
                    <p>
                        <span>下单时间</span>
                        <span>{{ created_time }}</span>
                    </p>
                </div>
            </div>
            <div class="hr"></div>
            <div class="play-order-box">
                <div class="play-order-list f_mt0" :class="{ changeName: realRefund_price >= 0 || balance <= 0 }">
                    <div class="change-cover" v-if="realRefund_price >= 0 || balance <= 0"></div>
                    <div class="play-order-list-item" @click="isBalance()">
                        <div class="left">
                            <img :src="balanceImg" />
                            <label>平台资金账户</label>
                        </div>
                        <span class="balance_price">￥{{ balance }}</span>
                        <div class="right" :class="{ active: is_balance }"></div>
                    </div>
                </div>
                <div class="play-order-list f_mt0" v-if="changeId">
                    <div class="play-order-list-item">
                        <div class="left">
                            <img :src="changeImg" />
                            <label>换品牌名称</label>
                        </div>
                        <span class="balance_price">￥{{ refund_money }}</span>
                        <div class="right active"></div>
                    </div>
                </div>
                <div class="refund" v-if="realRefund_price > 0">
                    <p class="refund-title">
                        多出金额：
                        <span>￥{{ realRefund_price }}</span
                        >, 我们将退还您。
                    </p>
                    <div class="refund-list">
                        <span class="refund-list-left">退款方式</span>
                        <div class="refund-list-right">
                            <div class="refund-item" @click="changeType(item.key)" v-for="item in refundArr" :key="item.key">
                                <span class="span-border" :class="{ 'input-img': refund_type == item.key }"></span>
                                <span>{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="play-order-box">
                <h2 class="play-order-list-title">请选择支付方式</h2>
                <div class="play-order-list" :class="{ changeName: realRefund_price >= 0 || priceNum <= 0}">
                    <div class="change-cover" v-if="realRefund_price >= 0 || priceNum <= 0"></div>
                    <div class="play-order-list-item" v-for="(item, index) of list" :key="index" @click="switchPlay(index)">
                        <div class="left">
                            <img :src="item.img" />
                            <label>{{ item.text }}</label>
                        </div>
                        <div class="right" :class="{ active: item.isSelected }"></div>
                    </div>
                </div>
                <div class="play-order-main" v-show="list[2].isSelected">
                    <div class="play-order-main-outline">
                        <div class="content">
                            <div class="conetnt-item content-outline" v-show="isShow">
                                <p class="tips">请将注册款汇入以下账户并上传汇款凭证</p>
                                <p class="infor">户名：{{ bankInfo.accountname }}</p>
                                <p class="infor">账户：{{ bankInfo.bankaccount }}</p>
                                <p class="infor">开户行：{{ bankInfo.bankname }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hr"></div>
                <div class="play_detail">
                    付款额：<span>{{ priceNum }}元</span>
                </div>
                <div class="play-order-btn">
                    <button @click="playNow" :class="{ is_gray: is_gray }">支付</button>
                </div>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="play_mask" v-show="play_mask">
            <div class="play_mask_bg"></div>
            <div class="play_mask_con">
                <p class="title">请确认支付是否已完成</p>
                <p @click="goPlaySuccess()" class="red">已完成支付</p>
                <p @click="playAgain()">支付遇到问题，重新支付</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
    data() {
        return {
            list: [
                {
                    img: require('@/assets/images/common/icon-weixin.png'),
                    text: '微信',
                    isSelected: false,
                },
                {
                    img: require('@/assets/images/common/icon-zhifubao.png'),
                    text: '支付宝',
                    isSelected: false,
                },
                {
                    img: require('@/assets/images/common/icon-outline.png'),
                    text: '线下支付',
                    isSelected: false,
                },
            ],
            balanceImg: require('@/assets/images/common/icon_balance.png'),
            changeImg: require('@/assets/images/common/icon_change.png'),
            isShow: true,
            orderId: this.$route.query.id, //订单id
            allPrice: this.$route.query.price, //订单金额
            created_time: this.$route.query.created_time, //下单时间
            balance: this.$route.query.balance, //平台资金账户
            counter: this.$route.query.counter ? this.$route.query.counter : 1, //订单数量
            PlayType: localStorage.PlayType ? localStorage.PlayType : 0,
            refund_money: 0, //换品牌名总金额
            realRefund_price: Number, //实际需退
            changeId: this.$route.query.change_id, //换品牌名id
            refundArr: [], //退款方式
            refund_type: '', //退款方式 key值
            bankInfo: {},
            play_mask: false,
            out_order_no: '', //微信或支付宝支付返回订单号
            pay_id: '', //线下支付
            paystatus: 0,
            token: '',
            url: '',
            is_balance: false, //是否使用平台资金账户
            priceNum: this.$route.query.price, //付款额
            is_gray: true, //控制按钮颜色
        };
    },
    created() {
        let _this = this;
        _this.url = window.location.hash;
        if (_this.$route.query.token) {
            sessionStorage.token = _this.$route.query.token;
        }
        //判断是否微信知否回来
        if (_this.$route.query.out_order_no && _this.$route.query.out_order_no != null && _this.$route.query.out_order_no != undefined) {
            let out_order_no = _this.$route.query.out_order_no.split('-')[0];
            let token = _this.$route.query.out_order_no.split('-')[1];
            let allPrice = _this.$route.query.out_order_no.split('-')[2];
            let balance = _this.$route.query.out_order_no.split('-')[3];
            _this.balance = balance;
            _this.allPrice = allPrice;
            sessionStorage.token = token;
            Indicator.open({
                text: '正在查询支付结果',
                spinnerType: 'fading-circle',
            });
            setTimeout(() => {
                Indicator.close();
                _this.$axios
                    .post('index.php?c=App&a=payOrderQuery', {
                        out_order_no: out_order_no,
                    })
                    .then(function(response) {
                        localStorage.removeItem('payMade');
                        localStorage.removeItem('PlayType');
                        window.location.href = 'http://品牌.互易.商标/playSuccess?out_order_no=' + out_order_no + '&token=' + token;
                        // if (response.data.errcode == 0) {
                        // 	_this.paystatus = response.data.content.paystatus;
                        // }
                    });
            }, 3000);
        } else if (localStorage.playState) {
            if (localStorage.payMade) {
                //_this.play_mask = true;
                Indicator.open({
                    text: '正在查询支付结果',
                    spinnerType: 'fading-circle',
                });
                //查询支付状态
                setTimeout(() => {
                    Indicator.close();
                    _this.$axios
                        .post('index.php?c=App&a=payOrderQuery', {
                            out_order_no: localStorage.payMade,
                        })
                        .then(function(response) {
                            _this.goPlaySuccess();
                            // if (response.data.errcode == 0) {
                            // 	_this.paystatus = response.data.content.paystatus;
                            // }
                        });
                }, 3000);
            }
        }
        if (localStorage.PlayType) {
            _this.switchPlay(localStorage.PlayType - 1);
        }
        // 如果是换词
        if (_this.changeId) {
            _this.getChangePayInfo();
        }
    },
    // mounted() {
    // 	let _this=this;
    // 	  if (window.history && window.history.pushState) {
    // 	      // 向历史记录中插入了当前页
    // 	      history.pushState(null, null, document.URL);
    // 	      window.addEventListener('popstate', _this.viewOrderList(), false);
    // 	  }
    // },
    // destroyed() {
    // 	let _this = this;
    // 	window.removeEventListener('popstate', _this.viewOrderList(), false);
    // },
    methods: {
        // 选择退款方式
        changeType(type) {
            this.refund_type = type;
        },
        // 获取换词信息
        getChangePayInfo: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getChangePayInfo', {
                    change_id: that.changeId,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        that.refund_money = parseInt(_data.content.total);
                        that.refundArr = _data.content.refund_type;
                        that.refund_type = that.refundArr[0].key;
                        let temptPrice = parseFloat(that.priceNum - that.refund_money);
                        // 如果是换词计算金额
                        if (parseInt(that.allPrice) > that.refund_money) {
                            that.priceNum = temptPrice;
                        } else {
                            that.priceNum = 0;
                            that.realRefund_price = Math.abs(temptPrice);
                            that.is_gray = false;
                        }
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 3000,
                        });
                    }
                });
        },
        //线下支付菜单切换
        switchMenu: function() {
            this.isShow = !this.isShow;
        },
        // 切换选择支付方式
        switchPlay: function(index) {
            const that = this;
            //判断是否使用资金余额
            if (this.is_balance && this.priceNum == 0) {
                //使用资余额并且资金余额大于订单金额
                for (let i = 0; i < that.list.length; i++) {
                    that.list[i].isSelected = false;
                }
                this.is_gray = false;
                return;
            }
            this.is_gray = false;

            that.PlayType = index + 1;
            for (let i = 0; i < that.list.length; i++) {
                that.list[i].isSelected = false;
            }
            that.list[index].isSelected = true;
            // 微信
            // 支付宝
            // 线下支付
            if (index === 2) {
                // 获取线下支付银行账号
                const that = this;
                if (sessionStorage.bankInfo) {
                    that.bankInfo = JSON.parse(sessionStorage.bankInfo);
                } else {
                    that.$axios
                        .post('/index.php?c=App&a=getBanks', {
                            order_no: that.orderId,
                        })
                        .then(function(response) {
                            let _data = response.data;
                            if (_data.errcode === 0) {
                                that.bankInfo = _data.content;
                                sessionStorage.bankInfo = JSON.stringify(that.bankInfo);
                            }
                        });
                }
            }
        },
        //是否使用平台资金账户
        isBalance() {
            this.is_balance = !this.is_balance;
            if (this.is_balance) {
                //如果使用资金余额
                // 如果退款金额不够
                this.priceNum = parseFloat(this.balance - this.allPrice).toFixed(2);
                if (this.refund_money && this.refund_money > 0) {
                    this.priceNum = parseFloat(this.balance - (this.allPrice - this.refund_money)).toFixed(2);
                }
                if (this.priceNum >= 0) {
                    this.priceNum = 0;
                    for (let i = 0; i < this.list.length; i++) {
                        this.list[i].isSelected = false;
                    }
                    //可以支付
                    this.is_gray = false;
                } else {
                    this.priceNum = Math.abs(this.priceNum).toFixed(2);
                }
            } else {
                this.priceNum = parseFloat(this.allPrice).toFixed(2);
                if (this.refund_money && this.refund_money > 0) {
                    this.priceNum = parseFloat(this.allPrice - this.refund_money).toFixed(2);
                }
                //判断是否有选中支付方式
                let selected = this.list.some((item, index) => {
                    return item.isSelected == true;
                });
                if (!selected) {
                    this.is_gray = true;
                }
            }

            //this.priceNum=Math.abs(this.balance-this.allPrice);
        },
        // 查看详情
        viewDetail: function() {
            let _this = this;
            localStorage.removeItem('payMade');
            localStorage.removeItem('PlayType');
            window.location.href = 'http://品牌.互易.商标/orderdetails?id=' + _this.orderId + '&token=' + sessionStorage.token;
        },
        //跳转订单列表
        viewOrderList: function() {
            let _this = this;
            localStorage.removeItem('payMade');
            localStorage.removeItem('PlayType');
            window.location.href = 'http://品牌.互易.商标/orderList?token=' + sessionStorage.token;
        },
        // 立即支付
        playNow: function() {
            const that = this;
            let is_balance = 0;
            //判断是否有选中支付方式
            let selected = that.list.some((item, index) => {
                return item.isSelected == true;
            });
            if (that.is_gray) {
                if (that.paystatus == 1) {
                    // Toast({
                    // 	message: "该订单已完成支付,请前往订单列表查看",
                    // 	duration: 2000
                    // });
                    return false;
                }
                if (!selected && !that.is_balance) {
                    //如果没有选择支付方式
                    // Toast({
                    // 	message: "请选择支付方式",
                    // 	duration: 2000
                    // });
                    return false;
                }
                if (that.is_balance && that.priceNum > 0 && !selected) {
                    // Toast({
                    // 	message: "平台资金账户余额不足，请选择其他支付方式支付剩余金额",
                    // 	duration: 2000
                    // });
                    return false;
                }
                that.is_gray = false;
            }

            //判断是否使用账号资金
            if (that.is_balance) {
                is_balance = 1;
                if (that.priceNum == 0) {
                    //如果
                    that.PlayType = 5;
                }
            }
            if (that.is_gray == false) {
                Indicator.open({
                    text: '正在支付中...',
                    spinnerType: 'fading-circle',
                });
                setTimeout(function() {
                    that.$axios
                        .post('/index.php?c=App&a=payOrderByH5', {
                            order_no: that.orderId,
                            paytype: that.PlayType,
                            is_balance: is_balance,
                            is_change: that.changeId ? 1 : 0,
                            change_id: that.changeId,
                            is_refund: that.realRefund_price > 0 ? 1 : 0,
                            refund_type: that.refund_type,
                        })
                        .then(function(response) {
                            let _data = response.data;
                            if (parseInt(_data.errcode) === 10003) {
                                Toast({
                                    message: _data.errmsg,
                                    duration: 1500,
                                });
                            }
                            if (_data.errcode === 0) {
                                Indicator.close();
                                //显示遮罩层
                                // if (that.PlayType == "1" || that.PlayType == "2") {
                                // 	that.play_mask = true;
                                // }
                                localStorage.PlayType = that.PlayType; //支付种类
                                localStorage.playState = 1; //用于判断二次进入
                                if (_data.content.out_order_no) {
                                    that.out_order_no = _data.content.out_order_no;
                                    localStorage.payMade = that.out_order_no; //用于查询支付状态
                                } else if (_data.content.pay_id) {
                                    that.pay_id = _data.content.pay_id;
                                    localStorage.payMade = that.pay_id; //用于查询支付状态
                                }
                                // 微信支付
                                if (that.PlayType == 1) {
                                    let el = document.createElement('a');
                                    let orderUrl =
                                        '/playOrder?out_order_no=' +
                                        that.out_order_no +
                                        '-' +
                                        sessionStorage.token +
                                        '-' +
                                        that.allPrice +
                                        '-' +
                                        that.balance;
                                    document.body.appendChild(el);
                                    el.href = response.data.content.mweb_url + '&redirect_url=' + encodeURI('http://h.huyi.cn') + orderUrl;
                                    // el.href = response.data.content.mweb_url + '&redirect_url=' + encodeURI("http://h.huyi.cn") +
                                    // 	"/playOrder?out_order_no=" + that.out_order_no + "&token=" + sessionStorage.token;
                                    //el.target = "_new"; //指定在新窗口打开
                                    setTimeout(function() {
                                        el.click();
                                        document.body.removeChild(el);
                                    }, 50);
                                } else if (that.PlayType == 2) {
                                    const div = document.createElement('divform');
                                    div.innerHTML = response.data.content.orderString;
                                    document.body.appendChild(div);
                                    // document.forms[0].acceptCharset = "GBK";
                                    //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
                                    document.forms[0].submit();
                                } else if (that.PlayType === 3) {
                                    localStorage.removeItem('payMade');
                                    localStorage.removeItem('PlayType');
                                    window.location.href =
                                        'http://品牌.互易.商标/uploadD?ids=' +
                                        that.pay_id +
                                        '&token=' +
                                        sessionStorage.token +
                                        '&order=' +
                                        that.orderId;
                                    // that.$router.push({
                                    //   path: "/uploadD",
                                    //   query: {
                                    //     ids: that.pay_id,
                                    //     order: that.orderId
                                    //   }
                                    // });
                                } else if (that.PlayType === 5 || that.changeId) {
                                    Indicator.open({
                                        text: '正在查询支付结果',
                                        spinnerType: 'fading-circle',
                                    });
                                    //查询支付状态
                                    setTimeout(() => {
                                        Indicator.close();
                                        that.$axios
                                            .post('index.php?c=App&a=payOrderQuery', {
                                                out_order_no: localStorage.payMade,
                                            })
                                            .then(function(response) {
                                                that.goPlaySuccess();
                                            });
                                    }, 3000);
                                }
                            } else {
                                Toast({
                                    message: _data.errmsg,
                                    duration: 1500,
                                });
                            }
                        });
                }, 2000);
            }
        },
        //跳转支付完成页面
        goPlaySuccess() {
            let that = this;
            var order_id;
            if (that.out_order_no && that.out_order_no != '') {
                order_id = that.out_order_no;
            } else if (that.pay_id) {
                order_id = that.pay_id;
            } else {
                order_id = localStorage.payMade;
            }
            localStorage.removeItem('payMade');
            localStorage.removeItem('PlayType');
            sessionStorage.removeItem('bankInfo');
            //that.play_mask = false;
            window.location.href = 'http://品牌.互易.商标/playSuccess?out_order_no=' + order_id + '&token=' + sessionStorage.token;
            // that.$router.push({
            //   path: "/playSuccess",
            //   query: {
            //     out_order_no: order_id
            //   }
            // });
        },
        // 重新支付
        playAgain: function() {
            //this.play_mask = false;
            localStorage.removeItem('payMade');
            localStorage.removeItem('PlayType');
            this.$router.go(0);
            //this.playNow();
        },
    },
};
</script>
<style scoped lang="scss">
.hr {
    height: 0.2rem;
    background: #f1f1f1;
}

.play-order {
    background: none;
}
</style>
