<template>
    <div class="fill_information" :class="{ fill_bot3: pageNum === 2 }">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="con_box containerView-main" v-if="showSome">
            <div class="til-word" v-show="pageNum == 0 || pageNum == 1">
                <div class="title" :class="{ active: pageNum == 0 }" @click="changePage(0)">申请信息</div>
                <div class="title" :class="{ active: pageNum == 1 }" @click="changePage(1)">申请人信息</div>
            </div>
            <div class="list_box news-class" v-if="pageNum == 0">
                <div class="list_item">
                    <span>注册词</span>
                    <p class="apply-keyword">{{ text }}</p>
                </div>
                <div class="list_item news-list-item">
                    <div class="news-list">
                        <span>年限</span>
                        <select v-model="year" class="select-right">
                            <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }} 年</option>
                        </select>
                    </div>
                    <div class="news-list lt-bottom">
                        <div>￥{{ price }}/年</div>
                        <div>费用：￥{{ price * year }}</div>
                    </div>
                </div>
            </div>
            <div class="list_box list_box_news" v-if="pageNum == 1">
                <div class="list_item" @click.stop="editSubject()">
                    <span>申请人名称</span>
                    <p class="list-item-right">
                        {{ applicant.corpname || applicant.name }}
                    </p>
                    <span class="icon_r"></span>
                </div>
                <div class="list_item">
                    <span>联系人</span>
                    <p class="list-item-right">{{ applicant.linkman }}</p>
                </div>
                <div class="list_item">
                    <span>联系电话</span>
                    <p class="list-item-right">{{ applicant.phone }}</p>
                </div>
                <div class="list_item">
                    <span>联系邮箱</span>
                    <p class="list-item-right">{{ applicant.email }}</p>
                </div>
                <div class="list_item">
                    <span>联系地址</span>
                    <p class="list-item-right">{{ applicant.province }}{{ applicant.city }}{{ applicant.area }}</p>
                </div>
                <div class="list_item">
                    <span>详细地址</span>
                    <p class="list-item-right">{{ applicant.address }}</p>
                </div>
            </div>
            <div class="apply-word" v-if="pageNum == 2">
                <h2 class="apply-msg-title">申请信息</h2>
                <div class="apply-msg">
                    <div class="msg-top">
                        <div class="msg-list">
                            <i>注册词</i>
                            <span>{{ text }}</span>
                        </div>
                        <div class="msg-list">
                            <i>年限</i>
                            <span>{{ year }}年</span>
                        </div>
                    </div>
                </div>
                <h2 class="apply-msg-title">申请人信息</h2>
                <div class="apply-subject">
                    <div class="msg-list">
                        <i>申请人名称</i>
                        <span>{{ applicant.corpname || applicant.name }}</span>
                    </div>
                    <div class="msg-list">
                        <i>申请人所在区</i>
                        <span>{{ applicant.province }}{{ applicant.city }}{{ applicant.area }}</span>
                    </div>
                    <div class="msg-list">
                        <i>企业地址</i>
                        <span>{{ applicant.address }}</span>
                    </div>
                    <div class="msg-list">
                        <i>企业经办人</i>
                        <span>{{ applicant.linkman }}</span>
                    </div>
                    <div class="msg-list-sp">
                        <div class="msg-list">
                            <i>联系电话</i>
                            <span>{{ applicant.phone }}</span>
                        </div>
                        <div v-if="applicant.email" class="msg-list msg-list-rg">
                            <i>电子邮箱</i>
                            <span>{{ applicant.email }}</span>
                        </div>
                    </div>
                </div>
                <div class="money-detail price-list">
                    <div class="money-box">
                        <div class="detail-list">
                            <span class="detail-left">注册费</span>
                            <span class="detail-right" v-if="price > 0">{{ price.split('.')[0] * year }} 元</span>
                        </div>
                    </div>
                </div>
                <div class="register-news-rule">
                    <i :class="{ active: isAgree }" @click="switchAgree"></i>
                    <span class="register-news-rule-agree">
                        我已阅读
                        <span class="register-news-rule-privacy" @click="goAnchor('《申请人须知》', '4')">《申请人须知》</span>条款
                    </span>
                </div>
                <div class="brand-bottom-btn">
                    <div class="brand-consultant">
                        <div class="brand-consultant-top">
                            <label>品牌顾问工号</label>
                            <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
                        </div>
                        <div class="brand-consultant-text">
                            <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                            <p>或推荐以下品牌顾问给你选择：</p>
                            <div class="sale_code_member">
                                <span v-for="(item, index) of getSaleMember.list" :key="index" @click="selectMembr(index)">
                                    {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="list_item register" v-show="pageNum == 0">
            <div class="reg-box">
                <span class="reg-word">注册费</span>
                <span class="reg-price" v-if="price > 0">{{ price.split('.')[0] * year }}元</span>
            </div>
        </div> -->
        <!-- 品牌顾问工号 -->
        <!-- <div class="brand-consultant" v-show="pageNum == 2">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
            </div>
            <div class="brand-consultant-text">
                <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                <p>或推荐以下品牌顾问给你选择：</p>
                <div class="sale_code_member">
                    <span v-for="(item, index) of getSaleMember.list" :key="index" @click="selectMembr(index)">
                        {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                    </span>
                </div>
            </div>
        </div> -->
        <!-- <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ all_price }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0">下一步</div>
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 1">预览</div>
                <div class="addCard-btn" v-show="pageNum == 2">
                    <button class="btn-add" @click="playBtn(0)">加入申请列表</button>
                    <button class="btn-apply" @click="playBtn(1)">去付款</button>
                </div>
            </div>
        </div> -->
        <div class="fill_bottom news-fill_bottom">
            <div class="money-detail money-detail-news" v-show="pageNum !== 2">
                <div class="money-box">
                    <div class="detail-list allprice">
                        <span>总计：</span>
                        <span class="detail-right">￥{{ price * year }}</span>
                    </div>
                </div>
            </div>
            <div class="fill_bottom_btn">
                <button class="next" @click="next(pageNum)" v-show="pageNum === 0">下一步</button>
                <button class="next" @click="next(pageNum)" v-show="pageNum === 1">预览</button>
                <div class="addCard-btn" v-show="pageNum == 2">
                    <button class="btn-add" @click="playBtn(0)">加入申请列表</button>
                    <button class="btn-apply" @click="playBtn(1)">去付款</button>
                </div>
            </div>
        </div>
        <!-- 推荐品牌顾问 -->
        <sale-code :corpid="applicant.corpid || applicant.id"></sale-code>
    </div>
</template>

<script>
import * as GetterTypes from '@/constants/GetterTypes';
import { mapGetters } from 'vuex';
import { Toast, Indicator } from 'mint-ui';
import * as utils from '@/utils/index';
import hub from '@/hub';
export default {
    name: 'fill_information',
    data() {
        return {
            //注册词
            text: JSON.parse(sessionStorage.getItem('domainSearch')) ? JSON.parse(sessionStorage.getItem('domainSearch')).name : '',
            // 注册年限
            year: '1',
            // 注册费，单价
            price: JSON.parse(sessionStorage.getItem('domainSearch')) ? JSON.parse(sessionStorage.getItem('domainSearch')).price : '120',
            //标识
            mark: JSON.parse(sessionStorage.getItem('domainSearch')) ? JSON.parse(sessionStorage.getItem('domainSearch')).mark : 'domain',
            // 产品id
            productid: JSON.parse(sessionStorage.getItem('domainSearch'))
                ? JSON.parse(sessionStorage.getItem('domainSearch')).productid
                : '',
            // 产品名
            product_name: JSON.parse(sessionStorage.getItem('domainSearch'))
                ? JSON.parse(sessionStorage.getItem('domainSearch')).product_name
                : '',
            // 申请人信息
            applicant: {},
            //点击下一步时页面的显示隐藏
            showSome: true,
            // 页码
            pageNum: 0,
            // 顾问工号
            sales_code: '',
            // 是否阅读申请人须知
            isAgree: false,
            // 是否为续费
            renewalInfor: JSON.parse(sessionStorage.getItem('renewalInfor')) ? JSON.parse(sessionStorage.getItem('renewalInfor')) : '',
        };
    },
    watch: {
        // 监听页码，获取品牌顾问
        pageNum: async function() {
            const that = this;
            if (that.pageNum == 2) {
                if (that.applicant.corpid || that.applicant.id) {
                    // if (that.getSaleMember.list.length <= 0) {
                    //     utils.getSalesCode(that.applicant.corpid || that.applicant.id, 'domain');
                    // }
                    utils.getSalesCode(that.applicant.corpid || that.applicant.id, 'domain');
                }
            }
        },
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SALE_MEMBER]]),
        ...mapGetters({
            getSaleMember: [GetterTypes.GET_SALE_MEMBER],
        }),
        // 计算总价格
        all_price() {
            return this.year * this.price ? this.year * this.price : 0;
        },
    },
    // 实时存储数据
    updated() {
        this.temptStorage();
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    beforeDestroy() {
        window.removeEventListener('popstate', this.goback, false);
    },
    created() {
        const that = this;
        // 如果存在信息存储
        if (sessionStorage.getItem('rgInfor')) {
            let temptDomain = JSON.parse(sessionStorage.getItem('rgInfor'));
            that.text = temptDomain.text;
            that.year = temptDomain.year;
            that.price = temptDomain.price;
            that.applicant = temptDomain.applicant;
            that.pageNum = temptDomain.pageNum;
            that.isRead = temptDomain.isRead;
            that.sales_code = temptDomain.sales_code;
            that.isAgree = temptDomain.isAgree;
            that.productid = temptDomain.productid;
            that.product_name = temptDomain.product_name;
            // 如果没有申请人
            if (!temptDomain.applicant || Object.keys(temptDomain.applicant).length <= 0) {
                if (that.pageNum === 1) {
                    //离开了，有formUrlOne，新增
                    if (sessionStorage.formUrlOne) {
                        that.pageNum = 0;
                    } else {
                        that.getApplicant();
                    }
                }
            }
        }
        //判断是否是从申请列表过来
        else if (sessionStorage.proEditId && sessionStorage.mark == 'domain') {
            this.getWishlistItem();
        } else if (this.renewalInfor) {
            // 续费
            this.getOrderItemInfo(this.renewalInfor.itemid, 1);
        }
        // 触发获取品牌顾问
        hub.$on('send-salecode', ({ salecode }) => {
            this.sales_code = salecode;
        });
    },
    methods: {
        // 选择推荐品牌顾问
        selectMembr: function(index) {
            utils.showSaleBox(index);
        },
        // 存储域名注册信息
        temptStorage: function() {
            const that = this;
            let domainInfor = {
                price: that.price,
                year: that.year,
                applicant: that.applicant,
                pageNum: that.pageNum,
                isRead: that.isRead,
                sales_code: that.sales_code,
                isAgree: that.isAgree,
                mark: that.mark,
                text: that.text,
                productid: that.productid,
                product_name: that.product_name,
            };
            sessionStorage.rgInfor = JSON.stringify(domainInfor);
        },
        //获取申请信息
        getWishlistItem: function() {
            let id = sessionStorage.proEditId;
            //获取申请信息
            this.$axios
                .post('/index.php?c=App&a=getWishlistItem', {
                    id: id,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        // 暂存
                        this.setInfor(res.data.content);
                        sessionStorage.removeItem('proEditId');
                        sessionStorage.EditId = id;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                        //获取信息失败，返回搜索页
                        setTimeout(() => {
                            this.$router.push({
                                path: '/domain',
                                query: {
                                    mark: this.mark,
                                },
                            });
                        }, 2000);
                    }
                });
        },
        // 获取续费订单细则详情
        getOrderItemInfo: function(id, type) {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getOrderItemInfo', {
                    itemid: id,
                    format: type,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.setInfor(_data.content);
                    } else {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        // 编辑，续费 存储信息
        setInfor: function(item) {
            this.text = item.keyword;
            this.year = item.year; //年限
            this.price = item.price; //费用
            this.product_name = item.product_name; //产品名称
            this.productid = item.productid; //产品id
            this.pageNum = 0;
            this.sales_code = item.sales_code; // 顾问工号
            this.mark = item.product_mark;
            this.applicant = item.subject;
        },
        //切换分页
        changePage(type) {
            var that = this;
            if (type == 0) {
                that.pageNum = type;
            } else if (type == 1) {
                // 如果不存在申请人
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getApplicant();
                }
                this.pageNum = type;
            }
        },
        // 下一步
        next(num) {
            const that = this;
            if (num == 0) {
                // 如果不存在申请人
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getApplicant();
                }
                that.pageNum = 1;
                sessionStorage.formUrlOne = this.$route.path;
            } else if (num == 1) {
                that.pageNum = 2;
            }
        },
        //前往申请人须知页面
        goAnchor(type, num) {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: this.mark,
                    txt_type: num,
                },
            });
        },
        //是否阅读申请人须知
        switchAgree() {
            this.isAgree = !this.isAgree;
        },
        //新增主体
        addSubject() {
            sessionStorage.formUrlOne = this.$route.path;
            sessionStorage.formUrl = '/domainMsg';
            this.$router.push({
                path: '/addSubject',
            });
        },
        //修改主体
        editSubject() {
            sessionStorage.formUrlOne = this.$route.path;
            sessionStorage.formUrl = '/domainMsg';
            this.$router.push({
                path: '/subjectList',
            });
        },
        // 点击返回
        goback() {
            var _this = this;
            let num = _this.pageNum;
            if (num == 0) {
                if (sessionStorage.EditId) {
                    this.$router.push({
                        path: 'shoppingCart',
                    });
                    return;
                } else if (_this.renewalInfor) {
                    // 如果是编辑
                    _this.$router.push({
                        path: _this.renewalInfor.fromPath,
                        query: {
                            id: _this.renewalInfor.order_no,
                        },
                    });
                } else {
                    _this.$router.push('/domain?mark=domain');
                }
                _this.removeSession();
            } else if (num == 1) {
                _this.pageNum = 0;
            } else if (num == 2) {
                // 如果弹框未关闭，点击浏览器返回，关闭
                utils.closeSaleBox();
                _this.pageNum = 1;
            }
            history.pushState(null, null, document.URL);
        },
        // 清除存储
        removeSession() {
            sessionStorage.removeItem('formUrlOne');
            if (this.renewalInfor) {
                sessionStorage.removeItem('renewalInfor');
            }
            sessionStorage.removeItem('isRenew');
            sessionStorage.removeItem('rgInfor');
        },
        // 去结算/加入申请列表
        playBtn(type) {
            let _this = this;
            if (!this.isAgree) {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (_this.sales_code === '' || !_this.sales_code) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(_this.sales_code)) {
                return false;
            } else {
                _this.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: _this.sales_code,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            let textMsg = '正在提交...';
                            if (type === 1) {
                                textMsg = '正在生成支付订单';
                            }
                            Indicator.open({
                                text: textMsg,
                                spinnerType: 'fading-circle',
                            });
                            let _msg = {
                                productid: _this.productid,
                                product_name: _this.product_name,
                                keyword: _this.text,
                                year: _this.year,
                                feetype: sessionStorage.isRenew ? 'X' : 'Z', //服务类型
                                price: _this.price,
                                total: _this.all_pric,
                                subject: {
                                    id: _this.applicant.corpid || _this.applicant.id,
                                    name: _this.applicant.corpname || _this.applicant.name,
                                    linkman: _this.applicant.linkman,
                                    phone: _this.applicant.phone,
                                    email: _this.applicant.email,
                                    address: _this.applicant.address,
                                    province: _this.applicant.province,
                                    city: _this.applicant.city,
                                    area: _this.applicant.area,
                                },
                            };
                            let id = sessionStorage.EditId ? sessionStorage.EditId : 0;
                            setTimeout(function() {
                                //提交数据
                                _this.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: JSON.stringify(_msg),
                                        sales_code: _this.sales_code,
                                        id: id,
                                    })
                                    .then(function(response) {
                                        if (response.data.errcode == 0) {
                                            if (type === 0) {
                                                Toast({
                                                    message: response.data.errmsg,
                                                    duration: 1000,
                                                });
                                                sessionStorage.product = JSON.stringify(response.data.content.product);
                                                sessionStorage.mark = _this.mark;
                                                setTimeout(function() {
                                                    //请求成功跳转清单列表页
                                                    _this.$router.push({
                                                        path: '/addSuccess',
                                                    });
                                                }, 1000);
                                            } else if (type === 1) {
                                                sessionStorage.product = JSON.stringify(response.data.content.product);
                                                // 去结算
                                                sessionStorage.ids = response.data.content.id;
                                                let ids = response.data.content.id;
                                                _this.$axios
                                                    .post('index.php?c=App&a=setOrder', {
                                                        ids: ids,
                                                    })
                                                    .then(function(response) {
                                                        Indicator.close();
                                                        if (response.data.errcode == 0) {
                                                            let orderId = response.data.content.order_no; //返回的订单id
                                                            let counter = response.data.content.counter; //返回的订单个数
                                                            let created_time = response.data.content.created_time; //下单时间
                                                            let balance = response.data.content.balance; //平台资金账户余额
                                                            if (orderId) {
                                                                let changeId = sessionStorage.changeId;
                                                                if (changeId) {
                                                                    window.location.href =
                                                                        _this.configs.api.public_english_url +
                                                                        '/playorder?id=' +
                                                                        orderId +
                                                                        '&price=' +
                                                                        _this.all_price +
                                                                        '&token=' +
                                                                        sessionStorage.token +
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
                                                                        _this.configs.api.public_english_url +
                                                                        '/playorder?id=' +
                                                                        orderId +
                                                                        '&price=' +
                                                                        _this.all_price +
                                                                        '&token=' +
                                                                        sessionStorage.token +
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
                                            }
                                            sessionStorage.removeItem('domainSearch');
                                            _this.removeSession();
                                        } else {
                                            Toast({
                                                message: response.data.errmsg,
                                                duration: 1500,
                                            });
                                        }
                                    });
                            }, 2000);
                        } else {
                            Toast({
                                message: response.data.errmsg,
                                duration: 1500,
                            });
                        }
                    });
            }
        },
        getApplicant() {
            const that = this;
            that.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.applicant = _data.content;
                    that.showSome = true;
                } else {
                    that.addSubject();
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.register-news-rule {
    justify-content: center;
}
.register {
    padding: 0.28rem 0.3rem;
    position: fixed;
    bottom: 2rem;
    left: 0;
    width: 100%;
    height: 2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    .reg-box {
        border-radius: 0.18rem;
        background: #f7f7f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        .reg-word {
            padding-left: 0.2rem;
            position: relative;
            &:after {
                content: '';
                display: inline-block;
                background: #686d7f;
                width: 0.08rem;
                height: 0.08rem;
                border-radius: 5rem;
                position: absolute;
                left: 0;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
            }
        }
        .reg-price {
        }
    }
}
.money-detail {
    width: 100%;
    .money-box {
        background: #f7f7f7;
        border-radius: 0.18rem;
        padding: 0.28rem 0.3rem;
        .detail-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #686d7f;
            .detail-left {
                position: relative;
                padding-left: 0.2rem;
                &:after {
                    content: '';
                    display: inline-block;
                    background: #686d7f;
                    width: 0.08rem;
                    height: 0.08rem;
                    border-radius: 5rem;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
            }
        }
    }
}
.containerView-main {
    padding-bottom: 2.6rem !important;
}
.apply-word .msg-list-sp .msg-list {
    margin-right: 0.2rem;
}
.apply-msg {
    padding: 0.2rem 0 0.4rem;
}
.apply-subject {
    padding: 0.2rem 0 0.5rem;
}
.apply-msg-title {
    font-weight: bold;
}
.til-word {
    display: flex;
    align-items: center;
    padding-top: 0.32rem;
    .title {
        font-size: 0.26rem;
        color: #6f7181;
        padding-right: 0.52rem;
        white-space: nowrap;
    }
    .active {
        color: #2c3852;
        font-size: 0.44rem;
    }
    .title-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-right: 0;
        a {
            font-size: 0.26rem;
            color: #6f7181;
            line-height: 0.5rem;
            border: 1px solid #0086ff;
            border-radius: 0.5rem;
            display: inherit;
            span {
                color: #0086ff;
                font-size: 0.28rem;
                font-weight: 400;
                padding: 0 0.2rem;
            }
        }
    }
}
</style>
