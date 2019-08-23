<template>
    <div class="fill_information" :class="{ fill_bot: pageNum == 0, fill_bot1: pageNum === 3 }">
        <!-- <nav-header title=" "></nav-header> -->
        <mt-header class="header" fixed>
            <!-- <router-link to="/" slot="left"> -->
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <!-- </router-link> -->
            <mt-button slot="right"></mt-button>
        </mt-header>

        <div class="con_box containerView-main" v-if="showSome">
            <div class="til-word" v-show="pageNum === 0 || pageNum === 1 || pageNum === 2">
                <div class="title" @click="switchPage(0)" :class="{ active: pageNum == 0 }">
                    申请信息
                </div>
                <div class="title" @click="switchPage(1)" :class="{ active: pageNum == 1 }">
                    申请材料
                </div>
                <div class="title" @click="switchPage(2)" :class="{ active: pageNum == 2 }">
                    申请人信息
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 0">
                <div class="list_item">
                    <span>申请品牌名称</span>
                    <input type="text" readonly="readonly" v-model="keyword" />
                </div>
                <div class="list_item">
                    <span>年限</span>
                    <select v-model="year">
                        <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }}</option>
                    </select>
                    <span class="icons-down"></span>
                </div>

                <div class="list_item" @click="applyClass()">
                    <span>类别</span>
                    <div class="list_item-tips">
                        <p class="tp">请选择类别</p>
                        <p>(超出10个类需另付费)</p>
                    </div>
                    <span class="icons-down"></span>
                </div>
                <!-- 商标选中类别 -->
                <div class="apply-class-item">
                    <div class="apply-class-item-list" v-for="(val, index) in productClass.classType" :key="index">
                        <h2 class="apply-class-item-list-title">
                            {{ index }}
                        </h2>
                        <div class="apply-class-item-list-main">
                            <span v-for="item in productClass.classType[index]" :key="item.id">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 1">
                <div class="apply-materials">
                    <div class="apply-materials-tips">
                        注册须提交以下资料，申请提交注册审核须5个工作日 以下资料可在提交订单后3天内补齐。
                    </div>
                    <div class="apply-materials-top-title">商标权利证明</div>
                    <div class="apply-materials-menu">
                        <span
                            v-for="list in typeListText"
                            :key="list.key"
                            @click="switchType(list)"
                            :class="{ active: applyType == list.key }"
                        >
                            {{ list.name }}
                        </span>
                    </div>
                    <p class="apply-materials-title">
                        上传图片
                    </p>
                    <div class="feekbook-upload">
                        <p class="apply-materials-little-title">{{ typeText }}</p>
                        <div class="voucher-center">
                            <div class="voucher-case" v-for="(item, index) in imgArr" :key="index">
                                <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
                                    <div
                                        class="img-voucher"
                                        v-bind:style="{
                                            backgroundImage: 'url(' + configs.api.public_domain + item.fileurl + ')',
                                        }"
                                    ></div>
                                </div>
                                <!-- 删除的小图标 -->
                                <img
                                    src="../../assets/images/user/icon_remove.png"
                                    class="del-icon setDelBtn-el-hook"
                                    v-show="imgArr[0]"
                                    @click="del_img($event, index, 'imgArr')"
                                />
                            </div>
                            <!-- 默认图片 -->
                            <div class="voucher-case">
                                <div class="img_minus setDelBtn-img-hook">
                                    <label for>
                                        <div class="img-voucher">
                                            <img src="../../assets/images/user/upload-img.png" alt />
                                            <span>上传图片</span>
                                        </div>
                                        <input type="hidden" class="verify-right-hook" v-model="imgArr[0]" />
                                        <input type="file" id="img_input" name="img_input" @change="toBase64($event)" class="upload-img" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 2">
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
            <div class="apply-word" v-if="pageNum == 3">
                <h2 class="apply-msg-title">申请信息</h2>
                <div class="apply-msg">
                    <div class="msg-top">
                        <div class="msg-list">
                            <i>申请品牌名称</i>
                            <span>{{ keyword }}</span>
                        </div>
                        <div class="msg-list">
                            <i>年限</i>
                            <span>{{ year }}年</span>
                        </div>
                    </div>
                    <div class="msg-bot msg-list">
                        <i>类别</i>
                        <div class="category">
                            <div class="category-list" v-for="(val, index) in productClass.classType" :key="index">
                                <p>{{ index }}</p>
                                <div class="category-small">
                                    <span v-for="item in productClass.classType[index]" :key="item.id">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="apply-msg-title">申请材料</h2>
                <div class="apply-materials-list">
                    <p class="apply-materials-list-title">商标权利证明</p>
                    <!-- <h2 class="apply-materials-list-type">{{ typeText }}</h2> -->
                    <div class="apply-materials-list-img">
                        <a
                            href="javascript:void(0);"
                            v-for="(list, i) in imgArr"
                            :key="i"
                            v-bind:style="{
                                backgroundImage: 'url(' + configs.api.public_domain + list.fileurl + ')',
                            }"
                        ></a>
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
                            <span class="detail-left">注册费</span>
                            <span class="detail-right" v-if="price > 0"> {{ price * year }} 元</span>
                        </div>
                        <div class="detail-list">
                            <span class="detail-left">审核费</span>
                            <span class="detail-right">{{ audit }} 元</span>
                        </div>
                        <div class="detail-list" v-show="parseInt(productClass.allPrice) > 0">
                            <span class="detail-left">新增类别费</span>
                            <span class="detail-right">{{ productClass.allPrice * year }} 元</span>
                        </div>
                    </div>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isRead }" @click="readRule"></i>
                    <p>我已阅读<a href="javascript:void(0);" @click="viewPrivacy('申请人须知', '4')">《申请人须知》</a>条款</p>
                </div>
            </div>
        </div>
        <div class="money-detail" v-show="pageNum == 0">
            <div class="money-box">
                <div class="detail-list">
                    <span class="detail-left">注册费</span>
                    <span class="detail-right" v-if="price > 0"> {{ parseInt(price) * year }} 元</span>
                </div>
                <div class="detail-list">
                    <span class="detail-left">审核费</span>
                    <span class="detail-right">{{ audit }} 元</span>
                </div>
                <div class="detail-list" v-show="parseInt(productClass.allPrice) > 0">
                    <span class="detail-left">新增类别费</span>
                    <span class="detail-right">{{ productClass.allPrice * year }} 元</span>
                </div>
            </div>
        </div>
        <!-- 品牌顾问工号 -->
        <div class="brand-consultant" v-show="pageNum === 3">
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
                <p class="all_price">￥{{ totalMoney }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0 || pageNum == 1">
                    下一步
                </div>
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 2">
                    预览
                </div>
                <div class="addCard-btn" v-show="pageNum == 3">
                    <button class="btn-add" @click="addShopCart('add')" v-show="!isChange">加入申请列表</button>
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
            // 产品id
            productId: JSON.parse(sessionStorage.getItem('tmdSearch')) ? JSON.parse(sessionStorage.getItem('tmdSearch')).productId : '', //产品id
            //产品，名称
            product_name: '',
            // 注册年限
            year: 1,
            // 价格
            price: JSON.parse(sessionStorage.getItem('tmdSearch')) ? JSON.parse(sessionStorage.getItem('tmdSearch')).price : 0, //费用
            // 申请人信息
            applicant: {},
            // 当前页码
            pageNum: 0,
            //审核费
            audit: 600,
            //上传材料附件
            imgArr: [],
            //补充材料选择类别
            applyType: 1,
            //材料类型提示
            typeText: '请上传商标证书',
            // 是否阅读申请人须知
            isRead: false,
            //销售顾问工号
            salesCode: '',
            //点商标资质类型
            typeListText: [],
            // 无申请人信息整个不显示
            showSome: true,
            //本地存储的分类
            productClass: JSON.parse(sessionStorage.getItem('productClass')) ? JSON.parse(sessionStorage.getItem('productClass')) : {},
            // 编辑id
            proEditId: sessionStorage.proEditId ? sessionStorage.proEditId : 0,
            // 是否为换词
            isChange: sessionStorage.changeId ? true : false,
            // 是否为续费
            renewalInfor: JSON.parse(sessionStorage.getItem('renewalInfor')) ? JSON.parse(sessionStorage.getItem('renewalInfor')) : '',
        };
    },
    created() {
        const that = this;
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('tmd')) {
            let temptTmd = JSON.parse(sessionStorage.getItem('tmd'));
            that.keyword = temptTmd.keyword;
            that.productId = temptTmd.productId;
            that.year = temptTmd.year;
            that.price = temptTmd.price;
            that.applicant = temptTmd.applicant;
            that.pageNum = temptTmd.pageNum;
            that.audit = temptTmd.audit;
            that.product_name = temptTmd.product_name;
            that.imgArr = temptTmd.imgArr;
            that.applyType = temptTmd.applyType;
            that.typeText = temptTmd.typeText;
            that.isRead = temptTmd.isRead;
            that.salesCode = temptTmd.salesCode;
            that.typeListText = temptTmd.typeListText;
            if (!temptTmd.applicant || Object.keys(temptTmd.applicant).length <= 0) {
                if (that.pageNum === 2) {
                    //离开了，有formUrlOne，新增
                    if (sessionStorage.formUrlOne) {
                        that.pageNum = 1;
                    } else {
                        that.getRegist();
                    }
                }
            }
        }
        // 如果是编辑
        else if (that.proEditId && sessionStorage.mark === 'tmd') {
            that.getTmdEdit(that.proEditId);
        } else if (that.renewalInfor) {
            // 如果是续费
            that.getOrderItemInfo(that.renewalInfor.itemid, 1);
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
            if (that.pageNum === 3) {
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
        // 实时计算金额
        totalMoney() {
            let money = 0;
            let newAdd = 0;
            if (this.productClass && this.productClass.allPrice) {
                newAdd = this.year * this.productClass.allPrice;
            }
            money = this.year * this.price + this.audit + newAdd;
            return money;
        },
    },
    methods: {
        // 刷新，存储信息
        temptStorage: function() {
            const that = this;
            let tmdInfo = {
                keyword: that.keyword,
                productId: that.productId,
                year: that.year,
                price: that.price,
                applicant: that.applicant,
                pageNum: that.pageNum,
                audit: that.audit,
                product_name: that.product_name,
                imgArr: that.imgArr,
                applyType: that.applyType,
                typeText: that.typeText,
                isRead: that.isRead,
                salesCode: that.salesCode,
                typeListText: that.typeListText,
            };

            sessionStorage.tmd = JSON.stringify(tmdInfo);
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
        // 编辑、续费存储信息
        setInfor: function(item) {
            const that = this;
            that.keyword = item.keyword;
            that.productId = item.productid;
            that.year = parseInt(item.year);
            that.price = parseInt(item.price);
            that.audit = parseInt(item.verify_fee);
            that.product_name = item.product_name;
            that.imgArr = item.material;
            that.applyType = item.material_type;
            that.salesCode = item.sales_code ? item.sales_code : '';
            that.applicant = item.subject;
            // 分类
            let classType = {};
            item.class_detail.map(function(item1) {
                item1.detail.map(function(item2) {
                    classType[item1.categoryName] = item2.products;
                });
            });
            let _item = {
                content: item.class_detail,
                classType: utils.sortObj(classType, 'asce'), //内容展示的数据结构,
                allPrice: parseInt(item.other_class_fee) / parseInt(that.year),
                allPriceBs: 0,
            };
            // 申请人须知，设置为已读
            that.isRead = true;
            // 本地存储分类
            that.productClass = _item;
            sessionStorage.productClass = JSON.stringify(_item);
        },
        // 点击返回
        goback() {
            const that = this;
            let num = parseInt(that.pageNum);
            if (num == 0) {
                // 如果是编辑
                if (that.proEditId && sessionStorage.mark === 'tmd') {
                    // 清空
                    that.$router.push({
                        path: '/shoppingCart',
                    });
                } else if (that.renewalInfor) {
                    // 如果是编辑
                    that.$router.push({
                        path: that.renewalInfor.fromPath,
                        query: {
                            id: that.renewalInfor.order_no,
                        },
                    });
                } else {
                    // 清空
                    that.$router.push({
                        path: '/productlist',
                        query: {
                            mark: 'tmd',
                        },
                    });
                }
                that.clearTemptData();
            } else if (num == 1) {
                that.pageNum = 0;
            } else if (num == 2) {
                that.pageNum = 1;
            } else if (num == 3) {
                that.pageNum = 2;
            }
            history.pushState(null, null, document.URL);
        },
        // 下一步
        next(num) {
            var that = this;
            if (num == 0) {
                // 判断是否有选择分类
                if (!that.productClass.classType || Object.keys(that.productClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
                if (that.typeListText.length <= 0) {
                    that.getTypeText();
                }
                that.pageNum = 1;
            } else if (num == 1) {
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getRegist();
                }
                that.pageNum = 2;
            } else if (num == 2) {
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getRegist();
                    return false;
                }
                that.pageNum = 3;
            }
        },
        // 切换上下页
        switchPage: function(num) {
            if (num !== 0) {
                // 判断是否有选择分类
                if (!this.productClass.classType || Object.keys(this.productClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
            }
            if (this.pageNum === 1 && this.typeListText.length <= 0) {
                this.getTypeText();
            }
            if (Object.keys(this.applicant).length <= 0) {
                if (num === 2 || num === 3) {
                    this.showSome = false;
                    this.getRegist();
                    if (num === 3) {
                        return false;
                    }
                }
            }
            this.pageNum = num;
        },
        // 初始化
        init() {
            const that = this;

            const index = parseInt(that.productId);
            switch (index) {
                case 1:
                    that.product_name = 'A类 （商标名）.商标';
                    break;
                case 2:
                    that.product_name = 'B类 （商标名+商品/服务名）.商标';
                    break;
                case 8:
                    that.product_name = 'C类 （指定地+商标名）.商标';
                    break;
                case 10:
                    that.product_name = 'D类 （指定地+商标名+商品/服务项目名）.商标';
                    break;
            }
        },
        // 获取点商标资质类型
        getTypeText: function() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getTmdMaterialType', {}).then(function(response) {
                let _data = response.data;
                if (_data.errcode === 0) {
                    that.typeListText = _data.content;
                    // 如果是编辑过来的
                    if (that.proEditId && sessionStorage.mark === 'tmd') {
                        that.typeText = that.typeListText[parseInt(that.applyType) - 1].tips;
                    }
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 1500,
                    });
                }
            });
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
        // 切换选择类型
        switchType: function(list) {
            this.applyType = list.key;
            this.typeText = list.tips;
        },
        // 点击删除
        del_img(e, i, val) {
            var that = this;
            that[val].splice(i, 1);
        },
        // 上传图片
        toBase64(e) {
            var that = this;
            if (that.imgArr.length == 3) {
                Toast({
                    message: '上传图片不可超过3张',
                    duration: 3000,
                });
                return;
            }
            var files = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                var imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                that.$axios
                    .post('index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: imgcode,
                    })
                    .then(function(response) {
                        let _item = {
                            fileurl: response.data.content.url,
                        };
                        that.imgArr.push(_item);
                    });
            };
        },
        // 选择类别
        applyClass: function() {
            const that = this;
            that.$router.push({
                path: '/applyClass',
                query: {
                    year: that.year,
                    path: 'fillProduct',
                },
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
            sessionStorage.formUrl = '/fillProduct';
            // 跳转路由
            this.$router.push({
                path: '/subjectList',
            });
        },
        // 新增申请人
        addSubject: function() {
            sessionStorage.formUrl = '/fillProduct';
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
            sessionStorage.removeItem('tmd');
            sessionStorage.removeItem('productClass');

            if (this.renewalInfor) {
                sessionStorage.removeItem('renewalInfor');
            }
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
                            productid: that.productId,
                            product_name: that.product_name,
                            keyword: that.keyword,
                            feetype: that.renewalInfor ? 'X' : 'Z',
                            year: that.year,
                            price: that.price,
                            verify_fee: that.audit,
                            other_class_fee: that.productClass.allPrice,
                            total: that.totalMoney,
                            class_detail: that.productClass.content,
                            material_type: that.applyType,
                            material: that.imgArr,
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
