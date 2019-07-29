<template>
    <div class="fill_information" :class="{ fill_bot: pageNum == 0, fill_bot1: pageNum === 3 }">
        <!-- <nav-header title=" "></nav-header> -->
        <mt-header class="header" fixed>
            <!-- <router-link to="/" slot="left"> -->
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <!-- </router-link> -->
            <mt-button slot="right"></mt-button>
        </mt-header>

        <div class="con_box containerView-main">
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
                    <span>申请词</span>
                    <input type="text" readonly="readonly" v-model="keyword" />
                </div>
                <div class="list_item">
                    <span>年限</span>
                    <select v-model="year">
                        <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }}</option>
                    </select>
                    <span class="icon_r"></span>
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
                    <div class="apply-class-item-list" v-for="(val, index) in getSelectClass.classType" :key="index">
                        <h2 class="apply-class-item-list-title">
                            {{ index }}
                        </h2>
                        <div class="apply-class-item-list-main">
                            <span v-for="item in getSelectClass.classType[index]" :key="item.id">{{ item.name }}</span>
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
                        <span @click="switchType(1)" :class="{ active: applyType === 1 }">商标证</span>
                        <span @click="switchType(2)" :class="{ active: applyType === 2 }">独创品牌</span>
                        <span @click="switchType(3)" :class="{ active: applyType === 3 }">商标使用证明</span>
                        <span @click="switchType(4)" :class="{ active: applyType === 4 }">商标许可证</span>
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
                                            backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + item.fileurl + ')',
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
                <div v-if="isSubject">
                    <div class="list_item">
                        <span>申请人名称</span>
                        <p class="list-item-right" @click="viewApplyInfo">{{ applicant.corpname || applicant.name }}</p>
                        <span class="icon_r"></span>
                    </div>
                    <div class="list_item">
                        <span>联系人</span>
                        <p class="list-item-right">{{ applicant.linkman }}</p>
                    </div>
                    <div class="list_item">
                        <span>联系电话</span>
                        <p class="list-item-right">{{ applicant.phone || applicant.mobile }}</p>
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
                            <div class="category-list" v-for="(val, index) in getSelectClass.classType" :key="index">
                                <p>{{ index }}</p>
                                <div class="category-small">
                                    <span v-for="item in getSelectClass.classType[index]" :key="item.id">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="apply-msg-title">申请材料</h2>
                <div class="apply-materials-list">
                    <p class="apply-materials-list-title">商标权利证明</p>
                    <h2 class="apply-materials-list-type">商标证</h2>
                    <div class="apply-materials-list-img">
                        <a
                            href="javascript:void(0);"
                            v-for="(list, i) in imgArr"
                            :key="i"
                            v-bind:style="{
                                backgroundImage: 'url(' + 'http://oapi.huyi.cn:6180/' + list.fileurl + ')',
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
                    <div v-if="applicant.phone" class="msg-list">
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
                        <div v-if="applicant.mobile" class="msg-list">
                            <i>联系电话</i>
                            <span>
                                {{ applicant.mobile }}
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
                        <div class="detail-list" v-show="parseInt(getSelectClass.allPrice * year) > 0">
                            <span class="detail-left">新增类别费</span>
                            <span class="detail-right">{{ getSelectClass.allPrice * year }} 元</span>
                        </div>
                    </div>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isRead }" @click="readRule"></i>
                    <p @click="readRule">
                        我已阅读<a href="javascript:void(0);" @click="viewPrivacy('申请人须知', '4')">《申请人须知》</a>条款
                    </p>
                </div>
            </div>
        </div>
        <div class="money-detail" v-show="pageNum == 0">
            <div class="money-box">
                <div class="detail-list">
                    <span class="detail-left">注册费</span>
                    <span class="detail-right" v-if="price > 0"> {{ price * year }} 元</span>
                </div>
                <div class="detail-list">
                    <span class="detail-left">审核费</span>
                    <span class="detail-right">{{ audit }} 元</span>
                </div>
                <div class="detail-list" v-show="parseInt(getSelectClass.allPrice * year) > 0">
                    <span class="detail-left">新增类别费</span>
                    <span class="detail-right">{{ getSelectClass.allPrice * year }} 元</span>
                </div>
            </div>
        </div>
        <!-- 品牌顾问工号 -->
        <div class="brand-consultant" v-show="pageNum === 3">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号" />
            </div>
            <p class="brand-consultant-text">品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：400-628-111</p>
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
                    <button class="btn-add" @click="addShopCart('add')">加入申请列表</button>
                    <button class="btn-apply" @click="addShopCart('play')">去付款</button>
                </div>
            </div>
        </div>
        <!-- 商标分类 -->
        <applyClass :year="year" v-if="getSelectClass.isShow"></applyClass>
    </div>
</template>

<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import { Toast, Indicator, MessageBox } from 'mint-ui';
import applyClass from '@/components/trademark/applyClass.vue';
import * as utils from '@/utils/index';
export default {
    name: 'fill_information',
    data() {
        return {
            keyword: sessionStorage.getItem('tmdDomain'), //搜索过来的申请词
            ids: this.$store.state.showTmd.id, //产品id
            year: 1, //年限
            price: this.$store.state.showTmd.price, //费用
            applicant: {}, //主体数据
            // all_price: 0, //总计费用
            pageNum: 0,
            audit: 600,
            product_name: '', //产品名称
            imgArr: [],
            applyType: 1, //补充材料选择类别
            typeText: '请上传商标证书', //材料类型提示
            isRead: false, // 是否阅读申请人须知
            salesCode: '', //销售顾问工号
            isSubject: false,
        };
    },
    components: {
        applyClass,
    },
    created() {
        const that = this;
        let _Infor = that.getApplyInfor;
        if (_Infor && Object.keys(_Infor).length > 0) {
            that.year = _Infor.year;
            that.price = _Infor.price;
            that.all_price = _Infor.all_price;
            that.audit = _Infor.audit;
            that.applyType = _Infor.applyType;
            that.imgArr = _Infor.imgArr;
            that.pageNum = _Infor.pageNum;
            that.isRead = _Infor.isRead;
            that.salesCode = _Infor.salesCode;
            if (_Infor.pageNum === 2 && _Infor.applicant && Object.keys(_Infor.applicant).length > 0) {
                that.applicant = _Infor.applicant;
                that.isSubject = true;
            } else {
                that.getRegist();
            }
        }

        this.init();
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
    computed: {
        ...mapGetters([[GetterTypes.GET_SELECT_CLASS], [GetterTypes.GET_SHOW_TMD], [GetterTypes.GET_APPLY_INFOR]]),
        ...mapGetters({
            getSelectClass: [GetterTypes.GET_SELECT_CLASS],
            getShowTmd: [GetterTypes.GET_SHOW_TMD],
            getApplyInfor: [GetterTypes.GET_APPLY_INFOR],
        }),
        totalMoney() {
            let money = 0;
            money = this.year * this.price + this.audit + this.getSelectClass.allPrice * this.year;
            return money;
        },
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_SELECT_CLASS], [MutationTypes.SET_SHOW_TMD], [MutationTypes.SET_APPLY_INFOR]]),
        ...mapMutations({
            [MutationTypes.SET_SELECT_CLASS]: MutationTypes.SET_SELECT_CLASS,
            [MutationTypes.SET_SHOW_TMD]: MutationTypes.SET_SHOW_TMD,
            [MutationTypes.SET_APPLY_INFOR]: MutationTypes.SET_APPLY_INFOR,
        }),
        // 点击返回
        goback() {
            const that = this;
            let num = that.pageNum;
            if (num == 0) {
                // 清空
                this.$router.push({
                    path: '/productlist',
                    query: {
                        mark: 'tmd',
                        keyword: sessionStorage.getItem('tmdKeyWord'),
                    },
                });
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
                if (!that.getSelectClass.classType || Object.keys(that.getSelectClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
                that.pageNum = 1;
            } else if (num == 1) {
                that.pageNum = 2;
                if (Object.keys(that.applicant).length <= 0) {
                    that.getRegist();
                }
            } else if (num == 2) {
                if (Object.keys(that.applicant).length <= 0) {
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
                if (!this.getSelectClass.classType || Object.keys(this.getSelectClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
            }
            if (Object.keys(this.applicant).length <= 0) {
                if (num === 2 || num === 3) {
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
            const index = parseInt(this.$route.query.id);
            switch (index) {
                case 1:
                    that.product_name = 'A类 （商标名）.商标';
                    break;
                case 2:
                    that.product_name = 'B类 （商标名+商品/服务名）.商标';
                    break;
                case 8:
                    that.product_name = 'C类（指定地+商标名）.商标';
                    break;
                case 10:
                    that.product_name = 'D类 （指定地+商标名+商品/服务项目名）.商标';
                    break;
            }
        },
        // 获取主体
        getRegist() {
            let that = this;
            that.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.isSubject = true;
                    that.applicant = _data.content; //默认赋值第一条
                } else if (parseInt(_data.errcode) === 20001) {
                    that.isSubject = false;
                    MessageBox.confirm('', {
                        message: _data.errmsg + '，是否前往新增',
                        title: '提示',
                        showCancelButton: true, //是否显示取消按钮
                        closeOnClickModal: false, //点击遮罩层是否可以关闭
                    })
                        .then(action => {
                            if (action == 'confirm') {
                                that.addSubject();
                            }
                        })
                        .catch(err => {
                            if (err == 'cancel') {
                                //取消的回调
                            }
                        });
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
        // 切换选择类型
        switchType: function(num) {
            this.applyType = num;
            switch (num) {
                case 1:
                    this.typeText = '请上传商标证书';
                    break;
                case 2:
                    this.typeText = '请上传独创品牌证';
                    break;
                case 3:
                    this.typeText = '请上传商标使用证明';
                    break;
                case 4:
                    this.typeText = '请上传商标许可证';
                    break;
            }
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
                    message: '上传凭证不可超过3张',
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
            let _item = {
                isShow: true,
                content: this.getSelectClass.content,
                classType: this.getSelectClass.classType,
                allPrice: this.getSelectClass.allPrice,
                allPriceBs: 0,
                temptSelect: this.getSelectClass.temptSelect,
            };
            this[MutationTypes.SET_SELECT_CLASS](_item);
        },
        // 阅读申请条款
        readRule: function() {
            this.isRead = !this.isRead;
        },
        //前往申请人须知页面
        viewPrivacy(type, num) {
            const that = this;
            that.isRead = true;
            let _item = {
                keyword: that.keyword,
                year: that.year,
                price: that.price,
                all_price: that.totalMoney,
                audit: that.audit,
                applyType: that.applyType,
                imgArr: that.imgArr,
                pageNum: that.pageNum,
                applicant: that.applicant,
                isRead: that.isRead,
                salesCode: that.salesCode,
            };
            console.log(_item);
            that[MutationTypes.SET_APPLY_INFOR](_item);
            that.$router.push({
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
            const that = this;
            let _item = {
                keyword: that.keyword,
                year: that.year,
                price: that.price,
                all_price: that.totalMoney,
                audit: that.audit,
                applyType: that.applyType,
                imgArr: that.imgArr,
                pageNum: that.pageNum,
            };
            that[MutationTypes.SET_APPLY_INFOR](_item);
            sessionStorage.formUrl = '/fillProduct';
            // 跳转路由
            that.$router.push({
                path: '/subjectList',
            });
        },
        // 新增申请人
        addSubject: function() {
            const that = this;
            let _item = {
                keyword: that.keyword,
                year: that.year,
                price: that.price,
                all_price: that.totalMoney,
                audit: that.audit,
                applyType: that.applyType,
                imgArr: that.imgArr,
                pageNum: that.pageNum,
            };
            that[MutationTypes.SET_APPLY_INFOR](_item);
            sessionStorage.formUrl = '/fillProduct';
            // 跳转路由
            that.$router.push({
                path: '/addSubject',
            });
        },
        // 清空缓存数据
        clearTemptData: function() {
            const that = this;
            // 情况
            let _item = {
                id: '',
                price: '',
            };
            that[MutationTypes.SET_SHOW_TMD](_item);
            that[MutationTypes.SET_APPLY_INFOR]({});
            let _item2 = {
                isShow: false,
                content: [],
                classType: {},
                allPrice: 0,
                allPriceBs: 0,
                temptSelect: {},
            };
            this[MutationTypes.SET_SELECT_CLASS](_item2);
            sessionStorage.removeItem('formUrl');
            sessionStorage.removeItem('tmdKeyWord');
            sessionStorage.removeItem('tmdDomain');
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
            if (that.salesCode === '') {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return false;
            }
            if (!utils.checkFormat(that.salesCode)) {
                return false;
            }
            Indicator.open({
                text: '检测品牌顾问工号...',
                spinnerType: 'fading-circle',
            });
            setTimeout(function() {
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
                                productid: that.ids,
                                product_name: that.product_name,
                                keyword: that.keyword,
                                feetype: 'Z',
                                year: that.year,
                                price: that.price,
                                verify_fee: that.audit,
                                other_class_fee: that.getSelectClass.allPrice * that.year,
                                total: that.totalMoney + that.audit + that.getSelectClass.allPrice * that.year,
                                class_detail: that.getSelectClass.content,
                                material_type: that.applyType,
                                material: that.imgArr,
                                subject: {
                                    id: that.applicant.corpid,
                                    name: that.applicant.corpname,
                                    linkman: that.applicant.linkman,
                                    phone: that.applicant.phone,
                                    email: that.applicant.email,
                                    address: that.applicant.address,
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

                                                    that.clearTemptData();
                                                }, 1500);
                                            } else if (typeName === 'play') {
                                                // 生成订单
                                                that.$axios
                                                    .post('index.php?c=App&a=setOrder', {
                                                        ids: response.data.content.id,
                                                    })
                                                    .then(function(response) {
                                                        setTimeout(function() {
                                                            Indicator.close();
                                                        }, 10);
                                                        if (response.data.errcode == 0) {
                                                            window.location.href =
                                                                'http://h.huyi.cn/playorder?id=' +
                                                                response.data.content.order_no +
                                                                '&price=' +
                                                                that.totalMoney +
                                                                '&token=' +
                                                                sessionStorage.token;
                                                            // 清空
                                                            that.clearTemptData();
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
            }, 2000);
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
            .detail-right {
            }
        }
    }
}
</style>
