<template>
    <div class="fill_information" :class="{ fill_bot: pageNum == 0, fill_bot1: pageNum === 2 }">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>

        <div class="con_box containerView-main" v-if="showSome">
            <div class="til-word" v-show="pageNum === 0  || pageNum === 1">
                <div class="title" @click="switchPage(0)" :class="{ active: pageNum == 0 }">
                    商标转让
                </div>
                <div class="title" @click="switchPage(1)" :class="{ active: pageNum == 1 }">
                    申请人信息
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 0">
                <div class="list_item">
                    <span>转让人</span>
                    <p>{{bs_corpname}}</p>
                </div>
                <div class="list_item">
                    <span>转让人地址</span>
                    <p>{{bs_corpaddress}}</p>
                </div>
                <div class="list_item">
                    <span>商标名称</span>
                    <p>{{bs_name}}</p>
                </div>
                <div class="list_item" @click="showS()">
                    <span>商标申请/注册号</span>
                    <p>{{reg_code}}</p>
                </div>
                <div class="list_item">
                    <span>受让人</span>
                    <input type="text" v-model="to_corpname" placeholder="请填写受让人名称"/>
                </div>
                <div class="list_item">
                    <span>受让人地址</span>
                    <input type="text" v-model="to_corpaddress" placeholder="请填写受让人地址"/>
                </div>
            </div>
            
            <div class="list_box" v-if="pageNum == 1">
                <div>
                    <div class="list_item" @click="viewApplyInfo">
                        <span>申请人名称</span>
                        <p class="list-item-right">{{ applicant.corpname || applicant.name }}</p>
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
                        <p class="list-item-right">{{ applicant.province }} {{ applicant.city }} {{ applicant.area }}</p>
                    </div>
                    <div class="list_item">
                        <span>详细地址</span>
                        <p class="list-item-right">{{ applicant.address }}</p>
                    </div>
                </div>
            </div>
            <div class="apply-word" v-if="pageNum == 2">
                <h2 class="apply-msg-title">商标转让</h2>
                <div class="apply-msg">
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>转让人</i>
                            <span>{{ bs_corpname }}</span>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>转让人地址</i>
                            <span>{{ bs_corpaddress }}</span>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>商标名称</i>
                            <span>{{ bs_name }}</span>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>商标申请/注册号</i>
                            <span>{{ reg_code }}</span>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>受让人</i>
                            <span>{{ to_corpname }}</span>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>受让人地址</i>
                            <span>{{ to_corpaddress }}</span>
                        </div>
                    </div>
                    
                </div>
                
                <h2 class="apply-msg-title">申请人信息</h2>
                <div class="apply-subject">
                    <div class="msg-list">
                        <i>申请人名称</i>
                        <span> {{ applicant.corpname || applicant.name }} </span>
                    </div>
                    <div v-if="applicant.province" class="msg-list">
                        <i>申请人所在区</i>
                        <span> {{ applicant.province }} {{ applicant.city }} {{ applicant.area }} </span>
                    </div>
                    <div v-if="applicant.address" class="msg-list">
                        <i>企业地址</i>
                        <span>
                            {{ applicant.address }}
                        </span>
                    </div>
                    <div class="msg-list">
                        <i>企业经办人</i>
                        <span> {{ applicant.linkman }} </span>
                    </div>
                    <div class="msg-list-sp">
                        <div class="msg-list">
                            <i>联系电话</i>
                            <span>
                                {{ applicant.phone }}
                            </span>
                        </div>
                        <div v-if="applicant.email" class="msg-list msg-list-rg">
                            <i>电子邮箱</i>
                            <span>
                                {{ applicant.email }}
                            </span>
                        </div>
                    </div>
                </div>
               <div class="money-detail price-list">
                    <div class="money-box">
                        <div class="detail-list">
                            <span class="detail-left">转让费</span>
                            <span class="detail-right" v-if="price > 0">{{ parseInt(price) }} 元</span>
                        </div>
                    </div>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isRead }" @click="readRule"></i>
                    <p>我已阅读<a href="javascript:void(0);" @click="viewPrivacy('申请人须知', '4')">《申请人须知》</a>条款</p>
                </div>
            </div>
        </div>
        <div class="shade" v-if="showShade">
            <div class="shade-box">
                <div class="shade-top">
                    <p>商标注册号</p>
                    <div class="shade-input">
                        <input type="text" v-model="reg_code" placeholder="请填写商标注册号">
                    </div>
                </div>
                <span @click="sureBtn()">确定</span>
            </div>
        </div>
        <!-- 品牌顾问工号 -->
        <div class="brand-consultant" v-show="pageNum === 2">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号" />
            </div>
            <p class="brand-consultant-text">
                品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}
            </p>
        </div>
        <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ total }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0">
                    下一步
                </div>
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 1">
                    预览
                </div>
                <div class="addCard-btn" v-show="pageNum == 2">
                    <button class="btn-add" @click="addShopCart('add')">加入申请列表</button>
                    <button class="btn-apply" @click="addShopCart('play')">去结算</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    name: 'fill_information',
    data() {
        return {
            // 注册词
            keyword: JSON.parse(sessionStorage.getItem('tmdSearch')) ? JSON.parse(sessionStorage.getItem('tmdSearch')).tmdDomain : '', //搜索过来的申请词
            productid: sessionStorage.productid ? sessionStorage.productid : '17', //产品id
            product_name: sessionStorage.product_name ? sessionStorage.product_name : '商标转让',//产品名称
            bs_name: '', //商标名称
            reg_code: '', //注册号
            bs_corpname: '', //申请人名称
            bs_corpaddress: '', //申请人地址
            feetype: 'ZR', //服务类型  X:续展  ZR:转让  BG：变更
            price: sessionStorage.price ? sessionStorage.price : 1800,  // 价格//费用
            total: sessionStorage.total ? sessionStorage.total : 1800, //总价

            to_corpname: '',  //受让人名称
            to_corpaddress: '',  //受让人地址

            // 申请人信息
            applicant: {},
            year: 1, // 年
            // 当前页码
            pageNum: 0,
            // 是否阅读申请人须知
            isRead: false,
            //销售顾问工号
            salesCode: '',
            // 无申请人信息整个不显示
            showSome: true,
            // 弹窗
            showShade: true,
            // 编辑id
            proEditId: sessionStorage.proEditId ? sessionStorage.proEditId : 0,
        };
    },
    created() {
        
        const that = this;
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('rgInfor')) {
            let temptTmd = JSON.parse(sessionStorage.getItem('rgInfor'));
            that.productid = temptTmd.productid;
            that.product_name = temptTmd.product_name;
            that.bs_name = temptTmd.bs_name;
            that.reg_code = temptTmd.reg_code; //注册号
            that.bs_corpname = temptTmd.bs_corpname; //申请人名义
            that.bs_corpaddress = temptTmd.bs_corpaddress; //申请人地址
            that.feetype = temptTmd.feetype;
            that.price = temptTmd.price;
            that.total = temptTmd.total;
            that.to_corpname = temptTmd.to_corpname,
            that.to_corpaddress = temptTmd.to_corpaddress,
            that.showShade = temptTmd.showShade;
            that.pageNum = temptTmd.pageNum;
            that.isRead = temptTmd.isRead;
            that.salesCode = temptTmd.salesCode;
            that.applicant = temptTmd.applicant;
            if (!temptTmd.applicant || Object.keys(temptTmd.applicant).length <= 0) {
                if (that.pageNum === 1) {
                    //离开了，有formUrlOne，新增
                    if (sessionStorage.formUrlOne) {
                        that.pageNum = 0;
                    } else {
                        that.getRegist();
                    }
                }
            }
        }
        // 如果是编辑
        else if (that.proEditId) {
            that.showShade = false;
            that.getTmdEdit(that.proEditId);
        }
        this.init();
    },
    updated() {
        // 变更实时存储（方法待定）
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
    watch: {
        pageNum: async function() {
            const that = this;
            if (that.pageNum === 2) {
                if (that.applicant.corpid || that.applicant.id) {
                    let temptSaleCode = await utils.getSalesCode(that.applicant.corpid || that.applicant.id);
                    if (temptSaleCode) {
                        that.salesCode = temptSaleCode;
                    }
                }
            }
        },
    },
    
    methods: {
        // 点击显示商标注册号弹窗
        showS(){
            this.showShade = true;
        },
        // 点击查询续展信息
        sureBtn(){
            var _this = this;

            if(_this.reg_code == ''){
                Toast({
                    message: '请填写商标注册号',
                    duration: 3000,
                });
                return;
            }
            if (!utils.checkFormat(_this.reg_code)) {
                return false;
            }else{
                _this.showShade = false;
            }
            _this.$axios
                .post('index.php?c=App&a=searchDomain', {
                    mark: 'bs',
                    regCode: _this.reg_code
                })
                .then(function(response) {
                    var _data = response.data.content.list[0];
                    if(response.data.errcode == 0){
                        _this.bs_corpname = _data.personInfo[0].nameZh?_data.personInfo[0].nameZh:_data.personInfo[0].nameEn; // 申请人名称
                        _this.bs_corpaddress = _data.personInfo[0].addressZh?_data.personInfo[0].addressZh:_data.personInfo[0].addressEn; // 申请人地址
                        _this.bs_name = _data.tmName; // 商标名称
                        _this.to_corpname = ''; // 受让人
                        _this.to_corpaddress = ''; // 受让人地址

                    }

                })
        },
        
        // 刷新，存储信息
        temptStorage: function() {
            const that = this;
            let tmdInfo = {
                productid: that.productid,
                product_name: that.product_name,
                bs_name: that.bs_name,
                reg_code: that.reg_code, //注册号
                bs_corpname: that.bs_corpname, //转让人
                bs_corpaddress: that.bs_corpaddress, //转让人地址
                feetype: that.feetype,
                price: that.price,
                total: that.total,
                to_corpname: that.to_corpname,
                to_corpaddress: that.to_corpaddress,
                showShade: that.showShade,
                pageNum: that.pageNum,
                isRead: that.isRead,
                salesCode: that.salesCode,
                applicant: that.applicant, // 申请人信息
            };

            sessionStorage.rgInfor = JSON.stringify(tmdInfo);
        },
        // 获取编辑的申请信息
        getTmdEdit: function(editId) {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getWishlistItem', { id: editId }).then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.setInfor(_data.content);
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
        // 编辑存储信息
        setInfor: function(item) {
            const that = this;
            that.productid = item.productid;
            that.product_name = item.product_name;
            that.bs_name = item.bs_name;
            that.reg_code = item.reg_code; //注册号
            that.bs_corpname = item.bs_corpname; //申请人名义
            that.bs_corpaddress = item.bs_corpaddress; //申请人地址
            that.feetype = item.feetype;
            that.price = parseInt(item.price);
            that.total = parseInt(item.total);
            that.to_corpname = item.to_corpname,
            that.to_corpaddress = item.to_corpaddress,

            that.salesCode = item.salesCode ? item.sales_code : '';
            that.applicant = item.subject;
            // 申请人须知，设置为已读
            that.isRead = true;
        },
        // 点击返回
        goback() {
            const that = this;
            let num = parseInt(that.pageNum);
            if (num == 0) {
                this.$router.push({
                    path: '/user'
                });
                that.clearTemptData();
            }  else if (num == 1) {
                that.pageNum = 0;
            } else if (num == 2) {
                that.pageNum = 1;
            }
            history.pushState(null, null, document.URL);
        },
        // 下一步
        next(num) {
            var that = this;
            if (num == 0) {
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getRegist();
                }
                if(that.to_corpname == ''){
                    Toast({
                        message: '请填写受让人名称',
                        duration: 3000,
                    });
                    return;
                }
                if(that.to_corpaddress == ''){
                    Toast({
                        message: '请填写受让人地址',
                        duration: 3000,
                    });
                    return;
                }
                that.pageNum = 1;
            } else if (num == 1) {
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getRegist();
                    return false;
                }
                that.pageNum = 2;
            }
        },
        // 切换上下页
        switchPage: function(num) {
            if (num == 1) {
                if(this.to_corpname == ''){
                    Toast({
                        message: '请填写受让人名称',
                        duration: 3000,
                    });
                    return;
                }
                if(this.to_corpaddress == ''){
                    Toast({
                        message: '请填写受让人地址',
                        duration: 3000,
                    });
                    return;
                }
            }
            
            if (Object.keys(this.applicant).length <= 0) {
                if (num === 1 || num === 2) {
                    this.showSome = false;
                    this.getRegist();
                    if (num === 2) {
                        return false;
                    }
                }
            }
            this.pageNum = num;
        },
        // 初始化
        init() {
            
        },
        
        // 获取主体
        getRegist() {
            let that = this;
            that.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.applicant = _data.content;
                    that.showSome = true;
                } else if (parseInt(_data.errcode) === 20001) {
                    that.addSubject();
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
       
        // 阅读申请条款
        readRule: function() {
            this.isRead = !this.isRead;
        },
        //前往申请人须知页面
        viewPrivacy(type, num) {
            this.isRead = true;
            sessionStorage.removeItem('formUrlOne');
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: 'tmd',
                    txt_type: num,
                },
            });
        },
        // 选择申请人
        viewApplyInfo: function() {
            sessionStorage.formUrlOne = this.$route.path;
            sessionStorage.formUrl = '/transfer';
            // 跳转路由
            this.$router.push({
                path: '/subjectList',
            });
        },
        // 新增申请人
        addSubject: function() {
            sessionStorage.formUrl = '/transfer';
            sessionStorage.formUrlOne = this.$route.path;
            // 跳转路由
            this.$router.push({
                path: '/addSubject',
            });
        },
        // 清空缓存数据
        clearTemptData: function() {
            sessionStorage.removeItem('formUrl');
            sessionStorage.removeItem('formUrlOne');
            sessionStorage.removeItem('subject');
            sessionStorage.removeItem('proEditId');
            sessionStorage.removeItem('rgInfor');
            sessionStorage.removeItem('productClass');
        },
        // 加入清单
        addShopCart: function(typeName) {
            const that = this;
            if (!that.isRead) {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return false;
            }
            if (that.salesCode === '' || !that.salesCode) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return false;
            }
            if (!utils.checkFormat(that.salesCode)) {
                return false;
            }
            // 检测工号
            that.$axios
                .post('index.php?c=App&a=checkSalesCode', {
                    sales_code: that.salesCode,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Indicator.close();
                        // 设置临时加入数据
                        let temptData = {
                            productid: that.productid,
                            product_name: that.product_name,
                            bs_name: that.bs_name,
                            reg_code: that.reg_code, //注册号
                            bs_corpname: that.bs_corpname, //转让人
                            bs_corpaddress: that.bs_corpaddress, //转让人地址
                            feetype: that.feetype,
                            price: that.price,
                            total: that.total,
                            to_corpname: that.to_corpname,
                            to_corpaddress: that.to_corpaddress,
                            subject: {
                                id: that.applicant.corpid || that.applicant.id,
                                name: that.applicant.corpname || that.applicant.name,
                                linkman: that.applicant.linkman,
                                phone: that.applicant.phone,
                                email: that.applicant.email,
                                address: that.applicant.address,
                                province: that.applicant.province,
                                city: that.applicant.city,
                                area: that.applicant.area,
                            },
                        };
                        Indicator.open({
                            text: '正在提交...',
                            spinnerType: 'fading-circle',
                        });
                        setTimeout(function() {
                            that.$axios
                                .post('/index.php?c=App&a=setWishlist', {
                                    data: JSON.stringify(temptData),
                                    sales_code: that.salesCode,
                                    id: that.proEditId,
                                })
                                .then(function(response) {
                                    let _data = response.data;
                                    if (_data.errcode === 0) {
                                        if (typeName === 'add') {
                                            Toast({
                                                message: _data.errmsg,
                                                duration: 1500,
                                            });
                                            setTimeout(function() {
                                                that.$router.replace({
                                                    path: '/addSuccess',
                                                });
                                                // 暂存推荐
                                                sessionStorage.product = JSON.stringify(response.data.content.product);
                                                sessionStorage.mark = 'tmd';
                                                sessionStorage.removeItem('tmdSearch');
                                                that.clearTemptData();
                                            }, 1500);
                                        } else if (typeName === 'play') {
                                            // 去结算
                                            sessionStorage.ids = response.data.content.id;
                                            that.$router.replace({
                                                path: '/account',
                                            });
                                            // 清空
                                            sessionStorage.removeItem('tmdSearch');
                                            that.clearTemptData();
                                        }
                                    } else if (_data.errcode === '-1') {
                                        Toast({
                                            message: _data.errmsg,
                                            duration: 1500,
                                        });
                                        return false;
                                    }
                                });
                        }, 2000);
                    } else if (_data.errcode === '-1') {
                        Toast({
                            message: _data.errmsg,
                            duration: 1500,
                        });

                        return false;
                    }
                });
        },
    },
};
</script>

<style scoped lang="scss">
.shade{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    z-index: 10;
    .shade-box{
        background: #fff;
        border-radius: 0.26rem;
        width: 93%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .shade-top{
            padding: 0.54rem 0.46rem;
            p{
                font-size: 0.3rem;
                color: #2C3852;
                padding-bottom: 0.28rem;
            }
            .shade-input{
                width: 100%;
                input{
                    padding: 0.24rem 0.32rem;
                    border: 1px solid #DBDBDB;
                    border-radius: 0.16rem;
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    font-size: 0.28rem;
                }
            }
        }
        span{
            color: #007AFF;
            font-size: 0.34rem;
            text-align: center;
            padding: 0.34rem 0;
            display: inline-block;
            width: 100%;
            border-top: 1px solid #F1F1F1;
        }
    }
}
.fill_information.fill_bot{
    padding-bottom: 0 !important;
}
.fill_information .containerView-main{
    padding-bottom: 1.8rem !important;
}
.list_item{
    :first-child{
        width: 37% !important;
    }
}
.owner-trade{
    .list_item{
        display: flex;
        align-items: center;
        padding-bottom: 0.4rem;
        span{
            display: inline-block;
            width: 37%;
            font-size: 0.3rem;
        }
        .bot-right {
            display: flex;
            align-items: center;
            .bot-right-btn {
                margin-right: 0.4rem;
                display: flex;
                align-items: center;
                .span-border {
                    padding: 0;
                    margin: 0;
                    border: 1px solid #979797;
                    height: 0.32rem;
                    width: 0.32rem !important;
                    background-size: 100%;
                    display: inline-block;
                    vertical-align: middle;
                    border-radius: 50%;
                }
                .input-img {
                    background: url(../../assets/images/common/icon-selected.png) center center no-repeat;
                    height: 0.32rem;
                    width: 0.32rem;
                    background-size: 100%;
                    display: inline-block;
                    vertical-align: middle;
                    border: none;
                }
                span {
                    font-size: 0.3rem;
                    vertical-align: middle;
                    margin-left: 0.1rem;
                }
            }
            .bot-right-btn:last-child {
                margin-right: 0;
            }
        }
    }
    .part-owner{
        padding: 0 0.34rem;
        border-radius: 0.04rem;
        border: 1px solid #DDDEE1;
        p{
            font-size: 0.26rem;
            color: #666;
            padding: 0.26rem 0;
            border-bottom: 1px solid #F1F1F1;
        }
        .owner{
            padding: 0.28rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #F1F1F1;
    
            .owner-left{
                span{
                    font-size: 0.26rem;
                    color: #2E3A54;
                    display: block;
                }
            }
            img{
    
            }
            &:last-child{
                border-bottom: none;
    
            }
        }
    }
}

.support-msg {
    font-size: 0.36rem;
    color: #2c3852;
}
.money-detail {
    position: fixed;
    bottom: 1.5rem;
    width: 100%;
    padding: 0.32rem;
    background: #fff;
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
                &::after {
                    content: '';
                    display: inline-block;
                    background: #686d7f;
                    width: 0.08rem;
                    height: 0.08rem;
                    border-radius: 5rem;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>
