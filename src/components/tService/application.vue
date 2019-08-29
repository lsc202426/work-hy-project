<template>
    <div class="fill_information">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback(pageNum)"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="con_box containerView-main" v-if="showSome">
            <div class="til-word" v-show="pageNum == 0 || pageNum == 1">
                <div class="title" :class="{ active: pageNum == 0 }" @click="changePage(0)">申请信息</div>
                <div class="title" :class="{ active: pageNum == 1 }" @click="changePage(1)">申请人信息</div>
            </div>
            <div class="list_box" v-if="pageNum == 0">
                <div class="list_item">
                    <span>商标类型</span>
                    <select v-model="selectKey">
                        <option :value="item.key" v-for="(item, index) of bsTypeArr" :key="index">{{ item.name }}</option>
                    </select>
                    <span class="icon_r" style="transform: rotate(90deg);right: 0.05rem;"></span>
                </div>
                <div class="list_item">
                    <span>商标名称</span>
                    <input
                        type="text"
                        v-model="bsName"
                        :readonly="selectKey == '2' ? true : false"
                        placeholder="文字商标和组合商标才需要填写"
                    />
                </div>
                <div class="feekbook-upload">
                    <p class="upload-til upload-title">商标说明</p>
                    <div class="list_item_box">
                        <textarea class="list_item_text" name="" id="" v-model="desc" placeholder="该商标由“”构成"></textarea>
                    </div>
                </div>
                <div class="feekbook-upload">
                    <p class="upload-til upload-title">上传商标图片</p>

                    <div class="upload-msg">
                        <div class="voucher-center">
                            <div class="voucher-case" v-if="imgcode != ''">
                                <div class="img_minus setDelBtn-img-hook">
                                    <div
                                        class="img-voucher"
                                        v-bind:style="{
                                            backgroundImage: 'url(' + configs.api.public_domain + imgcode + ')',
                                        }"
                                    ></div>
                                </div>
                                <!-- 删除的小图标 -->
                                <img
                                    src="../../assets/images/user/icon_remove.png"
                                    class="del-icon"
                                    v-show="imgcode != ''"
                                    @click="del_img()"
                                />
                            </div>
                            <!-- 默认图片 -->
                            <div class="voucher-case" v-if="imgcode == ''">
                                <div class="img_minus setDelBtn-img-hook">
                                    <label for>
                                        <div class="img-voucher">
                                            <img src="../../assets/images/user/upload-img.png" alt />
                                            <span>上传图片</span>
                                        </div>
                                        <input type="file" id="img_input" name="img_input" @change="toBase64($event)" class="upload-img" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <p class="upload-til upload-tips">
                            *上传图片大小为小于500K，图片类型只能为*.jpg格式,宽度 < 385px,高度 <
                            230px。黑白颜色申请的，请上传黑白图；彩色申请的，请务必上传彩图。
                        </p>
                    </div>
                </div>
                <div class="list_item" @click="applyClass()">
                    <span>类别</span>
                    <div class="list_item-tips">
                        <p class="tp">请选择类别</p>
                        <p>(超出10个类需另付费)</p>
                    </div>
                    <span class="icon_r"></span>
                </div>
                <!-- 商标选中类别 -->
                <div class="apply-class-item">
                    <div class="apply-class-item-list" v-for="(val, index) in productClass.classType" :key="index">
                        <h2 class="apply-class-item-list-title">第{{ index.split('、')[0] }}类 {{ index.split('、')[1] }}</h2>
                        <div class="apply-class-item-list-main">
                            <span v-for="item in productClass.classType[index]" :key="item.id">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 申请主体 -->
            <div class="list_box" v-if="pageNum == 1">
                <div class="list_item" @click.stop="gosubjectList()">
                    <span>申请人名称</span>
                    <p class="list-item-right">
                        {{ applicant.corpname || applicant.name }}
                    </p>
                    <span class="icon_r"></span>
                </div>
                <div class="list_item">
                    <span>联系人</span>
                    <p>{{ applicant.linkman }}</p>
                </div>
                <div class="list_item">
                    <span>联系电话</span>
                    <p>{{ applicant.phone }}</p>
                </div>
                <div class="list_item">
                    <span>联系邮箱</span>
                    <p>{{ applicant.email }}</p>
                </div>
                <div class="list_item">
                    <span>联系地址</span>
                    <p>{{ applicant.province }} {{ applicant.city }} {{ applicant.area }}</p>
                </div>
                <div class="list_item">
                    <span>详细地址</span>
                    <p>{{ applicant.address }}</p>
                </div>
            </div>
            <!-- 确认信息 -->
            <div class="apply-word" v-if="pageNum == 2">
                <h2 class="apply-msg-title">申请信息</h2>
                <div class="apply-msg">
                    <div class="msg-top">
                        <div class="msg-list">
                            <i>商标名称</i>
                            <span>{{ bsName }}</span>
                        </div>
                        <div class="msg-list">
                            <i>商标类型</i>
                            <span>{{ bsTypeArr[selectKey - 1].name }}</span>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>商标图片</i>
                            <div class="voucher-case">
                                <div class="img_minus setDelBtn-img-hook">
                                    <div
                                        class="img-voucher"
                                        v-bind:style="{
                                            backgroundImage: 'url(' + configs.api.public_domain + imgcode + ')',
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="msg-img">
                        <div class="msg-list">
                            <i>商标说明</i>
                            <span>{{ desc }}</span>
                        </div>
                    </div>
                    <div class="msg-bot msg-list">
                        <i>类别</i>
                        <div class="category">
                            <div class="category-list" v-for="(val, index) in productClass.classType" :key="index">
                                <p>第{{ index.split('、')[0] }}类 {{ index.split('、')[1] }}</p>
                                <div class="category-small">
                                    <span v-for="item in productClass.classType[index]" :key="item.id">{{ item.name }}</span>
                                </div>
                            </div>
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
                        <span>{{ applicant.province }} {{ applicant.city }} {{ applicant.area }}</span>
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
                        <div v-if="applicant.phone" class="msg-list">
                            <i>联系电话</i>
                            <span>{{ applicant.phone }}</span>
                        </div>
                        <div class="msg-list msg-list-rg">
                            <i>电子邮箱</i>
                            <span>{{ applicant.email }}</span>
                        </div>
                    </div>
                </div>
                <div class="money-detail price-list">
                    <div class="money-box">
                        <div class="detail-list">
                            <span class="detail-left">注册费</span>
                            <span class="detail-right" v-if="price > 0">{{ parseInt(price) }} 元</span>
                        </div>
                        <div class="detail-list" v-show="parseInt(productClass.allPriceBs * year) > 0">
                            <span class="detail-left">新增类别费</span>
                            <span class="detail-right">{{ productClass.allPriceBs * year }} 元</span>
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
            </div>
        </div>
        <div class="money-detail" v-show="pageNum == 0">
            <div class="money-box">
                <div class="detail-list">
                    <span class="detail-left">注册费</span>
                    <span class="detail-right" v-if="price > 0"> {{ parseInt(price) }} 元</span>
                </div>
                <div class="detail-list" v-show="parseInt(productClass.allPriceBs * year) > 0">
                    <span class="detail-left">新增类别费</span>
                    <span class="detail-right">{{ productClass.allPriceBs * year }} 元</span>
                </div>
            </div>
        </div>
        <!-- 品牌顾问工号 -->
        <div class="brand-consultant" v-show="pageNum == 2">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号" />
            </div>
            <p class="brand-consultant-text">品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：400-628-1118</p>
        </div>
        <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ totalMoney }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0">下一步</div>
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 1">预览</div>
                <div class="addCard-btn" v-show="pageNum == 2">
                    <button class="btn-add" @click="addShopCart()">加入申请列表</button>
                    <button class="btn-apply" @click="goPayment()">去付款</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { Toast, Indicator } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    name: 'fill_information',
    data() {
        return {
            // 商标名称
            bsName: '',
            // 产品名
            product_name: this.$route.query.product_name ? this.$route.query.product_name : '',
            // 产品id
            productid: this.$route.query.productid ? this.$route.query.productid : '',
            // 年限
            year: 1,
            // 注册费
            price: this.$route.query.price ? this.$route.query.price : '',
            // 申请人信息
            applicant: {},
            // 商标类型
            bsTypeArr: [],
            // 商标类型选中key
            selectKey: 1,
            // 商标图
            imgcode: '',
            // 商标说明
            desc: '',
            // 页码
            pageNum: '',
            // 是否阅读申请人须知
            isAgree: false,
            // 销售顾问
            salesCode: '',
            // 获取申请人信息时，隐藏页面
            showSome: true,
            //本地存储的分类
            productClass: JSON.parse(sessionStorage.getItem('productClass')) ? JSON.parse(sessionStorage.getItem('productClass')) : {},
            // 编辑id
            proEditId: sessionStorage.proEditId ? sessionStorage.proEditId : 0,
        };
    },
    created() {
        const that = this;
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('rgInfor')) {
            let temptBs = JSON.parse(sessionStorage.getItem('rgInfor'));
            that.bsName = temptBs.bsName;
            that.productid = temptBs.productid;
            that.product_name = temptBs.product_name;
            that.price = temptBs.price;
            that.applicant = temptBs.applicant;
            that.bsTypeArr = temptBs.bsTypeArr;
            that.selectKey = temptBs.selectKey;
            that.imgcode = temptBs.imgcode;
            that.desc = temptBs.desc;
            that.pageNum = temptBs.pageNum;
            that.isAgree = temptBs.isAgree;
            that.salesCode = temptBs.salesCode;
            if (!temptBs.applicant || Object.keys(temptBs.applicant).length <= 0) {
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
        if (this.proEditId && sessionStorage.mark === 'bs') {
            // 如果是编辑
            this.getTmdEdit(this.proEditId);
        }
        // 获取商标分类
        this.getBsType();
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
    computed: {
        totalMoney() {
            let money = 0;
            let newAdd = 0;
            if (this.productClass && this.productClass.allPriceBs) {
                newAdd = this.year * this.productClass.allPriceBs;
            }
            money = this.year * this.price + newAdd;
            return money;
        },
    },
    updated() {
        this.temptStorage();
    },
    methods: {
        // 获取编辑的申请信息
        getTmdEdit: function(editId) {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getWishlistItem', { id: editId }).then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.bsName = _data.content.bs_name;
                    that.productid = _data.content.productid;
                    that.desc = _data.content.bs_desc;
                    that.salesCode = _data.content.sales_code;
                    that.imgcode = _data.content.bs_attachment;
                    that.year = parseInt(_data.content.year);
                    that.price = parseInt(_data.content.price);
                    that.product_name = _data.content.product_name;
                    that.some = _data.content.subject;
                    that.subject = _data.content.subject;
                    that.selectKey = _data.content.bs_type;

                    sessionStorage.editId = _data.content.id;
                    let classType = {};
                    _data.content.class_detail.map(function(item1) {
                        item1.detail.map(function(item2) {
                            classType[item1.categoryName] = item2.products;
                        });
                    });
                    let _item = {
                        content: _data.content.class_detail,
                        classType: classType,
                        allPrice: 0,
                        allPriceBs: parseInt(_data.content.other_class_fee),
                    };
                    that.productClass = _item;
                    sessionStorage.productClass = JSON.stringify(_item);
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
        // 刷新，存储信息
        temptStorage: function() {
            const that = this;
            let tmdInfo = {
                bsName: that.bsName,
                product_name: that.product_name,
                productid: that.productid,
                price: that.price,
                applicant: that.applicant,
                bsTypeArr: that.bsTypeArr,
                selectKey: that.selectKey,
                imgcode: that.imgcode,
                desc: that.desc,
                pageNum: that.pageNum,
                isAgree: that.isAgree,
                salesCode: that.salesCode,
            };
            sessionStorage.rgInfor = JSON.stringify(tmdInfo);
        },
        // 选择类别
        applyClass: function() {
            this.$router.push({
                path: '/applyClass',
                query: {
                    path: 'application',
                },
            });
        },
        // 清空缓存数据
        clearTemptData: function() {
            sessionStorage.removeItem('productClass');
            sessionStorage.removeItem('formUrl');
        },
        //前往申请人须知页面
        goAnchor(type, num) {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: sessionStorage.mark,
                    txt_type: num,
                },
            });
        },
        //是否阅读申请人须知
        switchAgree() {
            this.isAgree = !this.isAgree;
        },
        //修改主体
        gosubjectList() {
            sessionStorage.formUrl = this.$route.path;
            sessionStorage.removeItem('formUrlOne');
            this.$router.push({
                path: '/subjectList',
            });
        },
        //新增主体
        addSubject() {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/addSubject',
            });
        },
        //点击切换
        changePage(type) {
            var _this = this;
            if (type == 0) {
                this.pageNum = type;
                sessionStorage.pageNum = this.pageNum;
            } else if (type == 1) {
                if (_this.bsName == '' && _this.selectKey != 2) {
                    Toast({
                        message: '请输入商标名称',
                        duration: 3000,
                    });
                    return;
                } else if (_this.imgcode == '') {
                    Toast({
                        message: '请上传商标图',
                        duration: 3000,
                    });
                    return;
                } else if (!_this.productClass.classType || Object.keys(_this.productClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                } else {
                    this.pageNum = type;
                    sessionStorage.pageNum = this.pageNum;
                }
                if (!sessionStorage.subject) {
                    _this.getApplicant();
                }
                if (_this.some.linkman == '' || _this.some.linkman == undefined) {
                    _this.showSome = false;
                }
            }
        },
        // 点击返回
        goback(num) {
            var _this = this;
            if (num == 0) {
                // 如果是编辑
                if (_this.proEditId && sessionStorage.mark === 'bs') {
                    // 清空
                    this.$router.push({
                        path: '/shoppingCart',
                    });
                } else {
                    this.$router.push('/tradeService?mark=bs');
                }
                this.clearTemptData();
                this.cleanSession();
            } else if (num == 1) {
                _this.pageNum = 0;
                sessionStorage.pageNum = _this.pageNum;
            } else if (num == 2) {
                _this.pageNum = 1;
                sessionStorage.pageNum = _this.pageNum;
            }
        },
        // 下一步
        next(num) {
            var _this = this;
            if (num == 0) {
                if (_this.bsName == '' && _this.selectKey != 2) {
                    Toast({
                        message: '请输入商标名称',
                        duration: 3000,
                    });
                    return;
                } else if (_this.desc == '') {
                    Toast({
                        message: '请输入商标说明',
                        duration: 3000,
                    });
                    return;
                } else if (_this.imgcode == '') {
                    Toast({
                        message: '请上传商标图',
                        duration: 3000,
                    });
                    return;
                } else if (!_this.productClass.classType || Object.keys(_this.productClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                } else {
                    _this.pageNum = 1;
                }
                if (!sessionStorage.subject) {
                    _this.getApplicant();
                }
                sessionStorage.formUrlOne = this.$route.path;
                if (_this.some.linkman == '' || _this.some.linkman == undefined) {
                    _this.showSome = false;
                }
                sessionStorage.pageNum = this.pageNum;
            } else if (num == 1) {
                _this.pageNum = 2;
                sessionStorage.pageNum = this.pageNum;
            }
        },
        getApplicant() {
            var _this = this;
            // 获取主体名称
            _this.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    _this.applicant = _data.content;
                    _this.showSome = true;
                } else {
                    _this.addSubject();
                }
            });
        },
        getBsType() {
            var _this = this;
            _this.$axios
                .post('index.php?c=App&a=getBsType', {})
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        _this.bsTypeArr = response.data.content;
                    }
                })
                .catch(function(error) {
                    Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                    });
                });
        },
        // 点击删除
        del_img() {
            var _this = this;
            _this.imgcode = '';
        },
        // 上传图片
        toBase64(e) {
            var _this = this;
            var files = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(files);
            if (files.name.split('.')[1] != 'jpg' && files.name.split('.')[1] != 'jpeg') {
                Toast({
                    message: '请上传jpg格式图片',
                    duration: 3000,
                });
                return;
            }
            if (files.name.split('.')[1] != 'jpg' && files.name.split('.')[1] != 'jpeg') {
                Toast({
                    message: '请上传jpg格式图片',
                    duration: 3000,
                });
                return;
            }
            if (parseInt(files.size) > 500000) {
                Toast({
                    message: '请上传小于500k的图片',
                    duration: 3000,
                });
                return;
            }

            reader.onload = function() {
                let attachment = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                _this.$axios
                    .post('index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: attachment,
                        limit: 'jpg,jpeg',
                        size: '500000*385*230',
                    })
                    .then(function(response) {
                        if (response.data.errcode == 0) {
                            _this.imgcode = response.data.content.url;
                        } else {
                            Toast({
                                message: response.data.errmsg,
                                duration: 3000,
                            });
                        }
                    });
            };
        },
        cleanSession() {
            sessionStorage.removeItem('selectKey');
            // sessionStorage.removeItem('typeN');
            sessionStorage.removeItem('subject');
            sessionStorage.removeItem('pageNum');
            sessionStorage.removeItem('isAgree');
            sessionStorage.removeItem('formUrlOne');
            sessionStorage.removeItem('desc');
            sessionStorage.removeItem('appText');
            sessionStorage.removeItem('appPrice');
            sessionStorage.removeItem('appName');
            sessionStorage.removeItem('appImgcode');
            sessionStorage.removeItem('appIds');
            sessionStorage.removeItem('sales_code');
        },
        //加入清单
        addShopCart() {
            let _this = this;

            if (!this.isAgree) {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (_this.salesCode === '' || !_this.salesCode) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(_this.salesCode)) {
                return false;
            } else {
                _this.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: _this.salesCode,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            Indicator.open({
                                text: '正在提交...',
                                spinnerType: 'fading-circle',
                            });
                            let _msg = {
                                productid: _this.productid,
                                product_name: _this.product_name,
                                feetype: 'Z',
                                bs_type: _this.selectKey,
                                bs_name: _this.bsName,
                                bs_desc: _this.desc,
                                bs_attachment: _this.imgcode,
                                class_detail: _this.productClass.content,
                                other_class_fee: _this.productClass.allPriceBs,
                                price: _this.price,
                                total: _this.totalMoney,
                                subject: _this.applicant,
                            };
                            let id = sessionStorage.editId ? sessionStorage.editId : 0;
                            setTimeout(function() {
                                //提交数据
                                _this.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: JSON.stringify(_msg),
                                        sales_code: _this.salesCode,
                                        id: id,
                                    })
                                    .then(function(response) {
                                        setTimeout(function() {
                                            Indicator.close();
                                        }, 10);
                                        if (response.data.errcode == 0) {
                                            Toast({
                                                message: response.data.errmsg,
                                                duration: 1000,
                                            });
                                            sessionStorage.product = JSON.stringify(response.data.content.product);
                                            _this.cleanSession();

                                            _this.clearTemptData();
                                            setTimeout(function() {
                                                //请求成功跳转清单列表页
                                                _this.$router.push({
                                                    path: '/addSuccess',
                                                });
                                            }, 1000);
                                        } else {
                                            Toast({
                                                message: response.data.errmsg,
                                                duration: 1500,
                                            });
                                        }
                                    })
                                    .catch(function(error) {
                                        setTimeout(function() {
                                            Indicator.close();
                                        }, 10);
                                        Toast({
                                            message: error.data.errmsg,
                                            duration: 3000,
                                        });
                                    });
                            }, 2000);
                        } else {
                            Toast({
                                message: _data.errmsg,
                                duration: 1500,
                            });
                        }
                    });
            }
        },
        // 去结算
        goPayment() {
            let _this = this;
            if (!this.isAgree) {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (_this.salesCode === '' || !_this.salesCode) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(_this.salesCode)) {
                return false;
            } else {
                _this.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: _this.salesCode,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode == 0) {
                            Indicator.open({
                                text: '正在生成支付订单',
                                spinnerType: 'fading-circle',
                            });
                            let _msg = {
                                productid: _this.productid,
                                product_name: _this.product_name,
                                feetype: 'Z',
                                bs_type: _this.selectKey,
                                bs_name: _this.bsName,
                                bs_desc: _this.desc,
                                bs_attachment: _this.imgcode,
                                class_detail: _this.productClass.content,
                                other_class_fee: _this.productClass.allPriceBs,
                                price: _this.price,
                                total: _this.totalMoney,
                                subject: _this.applicant,
                            };
                            let id = sessionStorage.editId ? sessionStorage.editId : 0;
                            setTimeout(function() {
                                //提交数据
                                _this.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: _msg,
                                        sales_code: _this.salesCode,
                                        id: id,
                                    })
                                    .then(function(response) {
                                        if (response.data.errcode == 0) {
                                            _this.id = response.data.content.id;
                                            sessionStorage.product = JSON.stringify(response.data.content.product);
                                            _this.id = response.data.content.id;
                                            // 去结算
                                            sessionStorage.ids = _this.id;
                                            _this.$axios
                                                .post('index.php?c=App&a=setOrder', {
                                                    ids: _this.id,
                                                })
                                                .then(function(response) {
                                                    Indicator.close();
                                                    if (response.data.errcode == 0) {
                                                        let orderId = response.data.content.order_no; //返回的订单id
                                                        // let counter = response.data.content.counter; //返回的订单个数
                                                        let created_time = response.data.content.created_time; //下单时间
                                                        let balance = response.data.content.balance; //平台资金账户余额
                                                        if (orderId) {
                                                            let changeId = sessionStorage.changeId;
                                                            if (changeId) {
                                                                window.location.href =
                                                                    'http://h.huyi.cn/playorder?id=' +
                                                                    orderId +
                                                                    '&price=' +
                                                                    _this.totalMoney +
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
                                                                    'http://h.huyi.cn/playorder?id=' +
                                                                    orderId +
                                                                    '&price=' +
                                                                    _this.totalMoney +
                                                                    '&token=' +
                                                                    sessionStorage.token +
                                                                    '&created_time=' +
                                                                    created_time +
                                                                    '&balance=' +
                                                                    balance;
                                                            }
                                                        }
                                                        //清除数据
                                                        _this.cleanSession();
                                                        _this.clearTemptData();
                                                    } else {
                                                        Toast({
                                                            message: response.data.errmsg,
                                                            duration: 2000,
                                                        });
                                                    }
                                                });
                                        } else {
                                            Toast({
                                                message: response.data.errmsg,
                                                duration: 1500,
                                            });
                                        }
                                    })
                                    .catch(function(error) {
                                        setTimeout(function() {
                                            Indicator.close();
                                        }, 10);
                                        Toast({
                                            message: error.data.errmsg,
                                            duration: 3000,
                                        });
                                    });
                            }, 2000);
                        } else if (_data.errcode == -1) {
                            Toast({
                                message: response.data.errmsg,
                                duration: 1500,
                            });
                        }
                    });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.feekbook-upload {
    .list_item_box {
        width: 100%;
        textarea {
            background: #f1f1f1;
            border-radius: 0.2rem;
            width: 100%;
            padding: 0.22rem;
            border: none;
            font-family: 'weiruanyahei';
            height: 1.4rem;
            box-sizing: border-box;
            resize: none;
            outline: none;
            font-size: 0.3rem;
        }
    }
}
.msg-img {
    .voucher-case {
        display: inline-block;
        width: 2.3rem;
        background-size: auto 100%;
        height: 2.3rem;
        opacity: 1;
        // float: left;
        position: relative;
        border-radius: 0.08rem;
        .img_minus {
            overflow: hidden;
            height: 100%;
            max-width: 100%;
            border: 1px solid #ccc;
            border-radius: 0.04rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .img-voucher {
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100%;
                width: 100%;
                height: 100%;
                max-width: 100%;
                width: 3rem;
                text-align: center;
            }
        }
    }
}
.containerView-main {
    padding-bottom: 2rem !important;
}
.money-detail {
    width: 100%;
    position: fixed;
    bottom: 1.5rem;
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
.register-news-rule {
    justify-content: center;
}
.feekbook-upload {
    background: #fff;
    width: 100%;
    .upload-til {
        font-size: 0.28rem;
        color: #2c3852;
    }
    .upload-title {
        padding-bottom: 0.2rem;
        padding-top: 0.3rem;
    }
    .upload-msg {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .upload-tips {
        color: #999;
        padding-left: 0.26rem;
        font-size: 0.26rem;
    }
    .voucher-center {
        width: 100%;
        background: #fff;
        left: 0;
        padding-bottom: 0.32rem;
        display: inline-block;
        .voucher-case {
            display: inline-block;
            width: 2.3rem;
            background-size: auto 100%;
            height: 2.3rem;
            opacity: 1;
            float: left;
            position: relative;
            border-radius: 0.08rem;
            .img_minus {
                overflow: hidden;
                height: 100%;
                max-width: 100%;
                border: 1px solid #ccc;
                border-radius: 0.04rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .img-voucher {
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: 100%;
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                    width: 3rem;
                    text-align: center;
                    img {
                        text-align: center;
                        height: 0.48rem;
                        margin-top: 0.68rem;
                    }
                    span {
                        font-size: 0.24rem;
                        color: #999;
                        display: block;
                        text-align: center;
                    }
                }
                .upload-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
            .del-icon {
                position: absolute;
                z-index: 2;
                top: -0.235rem;
                right: -0.235rem;
                width: 0.47rem;
                height: 0.47rem;
            }
            &:nth-child(3) {
                margin-right: 0;
            }
        }
    }
}
</style>
