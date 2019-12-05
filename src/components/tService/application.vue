<template>
    <div class="fill_information" :class="{ fill_bot: pageNum === 0, fill_bot3: pageNum === 2 }">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
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
                    <span class="icons-down"></span>
                </div>
                <div class="list_item" v-show="selectKey !== '2'">
                    <span>商标名称</span>
                    <input type="text" v-model="bsName" placeholder="文字商标和组合商标才需要填写" />
                </div>
                <div class="feekbook-upload">
                    <p class="upload-title">商标说明</p>
                    <div class="list_item_box">
                        <textarea
                            class="list_item_text"
                            name=""
                            id=""
                            v-model="desc"
                            placeholder="请填写商标说明
例：商标由中文“*”英文“*”及图形构成，无特殊含义"
                        ></textarea>
                    </div>
                </div>
                <div class="feekbook-upload">
                    <div class="upload-title-box">
                        <p class="upload-title-box-title">商标图样</p>
                        <div class="upload-title-type" v-if="selectKey == '1'">
                            <div class="upload-title-type-item" @click="switchUploadType(2)">
                                <i class="icons" :class="{ active: uploadType === 2 }"></i>
                                <span class="text">自动生成</span>
                            </div>
                            <div class="upload-title-type-item" @click="switchUploadType(1)">
                                <i class="icons" :class="{ active: uploadType === 1 }"></i>
                                <span class="text">手动生成</span>
                            </div>
                        </div>
                    </div>
                    <div class="upload-msg" v-if="uploadType === 1">
                        <div class="voucher-center">
                            <div class="voucher-case" @click="showVantImg()" v-if="imgcode != ''">
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
                                    @click.stop="del_img()"
                                />
                            </div>
                            <!-- 默认图片 -->
                            <div class="voucher-case" v-if="imgcode == ''" @click="showFiles()">
                                <div class="img_minus setDelBtn-img-hook">
                                    <label for>
                                        <div class="img-voucher">
                                            <img src="../../assets/images/user/upload-img.png" alt />
                                            <span>上传图片</span>
                                        </div>
                                        <!-- <input type="file" id="img_input" name="img_input" @change="toBase64($event)" class="upload-img" /> -->
                                    </label>
                                </div>
                            </div>
                        </div>
                        <p class="upload-til upload-tips">
                            *上传图片大小为小于500K，图片类型只能为*.jpg格式,宽度 < 385px,高度 < 230px。<br />黑白颜色申请的，请上传黑白图；彩色申请的，请务必上传彩图。
                        </p>
                    </div>
                    <!-- 自动生成 -->
                    <div class="generate-image" v-if="uploadType === 2">
                        <div class="generate-image-left">
                            <div v-if="imgcode" @click="showVantImg()">
                                <img
                                    src="../../assets/images/user/icon_remove.png"
                                    class="del-icon"
                                    v-show="imgcode != ''"
                                    @click.stop="del_img()"
                                />
                                <img class="text-logo" :src="configs.api.public_domain + imgcode" alt="" />
                            </div>
                            <p v-else class="islogo">暂无图片</p>
                        </div>
                        <div class="generate-image-right">
                            <p class="tips">*商标含有文字不应过多，文字过多易造成商标显著性不强而被驳回。</p>
                            <p class="tips">申请商标应符合法律规定，请勿模仿或复制他人已经注册的商标，以免侵犯他人的合法权益。</p>
                            <button class="generate-image-btn" @click="toImage()">生成图片</button>
                        </div>
                    </div>
                </div>
                <div class="list_item bdtop" @click="applyClass()">
                    <span>商品服务项</span>
                    <div class="list_item-tips">
                        <p class="tp">请选择</p>
                        <!-- <p>(超出10个类需另付费)</p> -->
                    </div>
                    <!-- <span class="icon_r"></span> -->
                    <i class="bdtop-icons-down"></i>
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
            <div class="list_box list_box_news" v-if="pageNum == 1">
                <div class="list_item" @click.stop="gosubjectList()">
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
                    <p class="list-item-right">{{ applicant.province }} {{ applicant.city }} {{ applicant.area }}</p>
                </div>
                <div class="list_item">
                    <span>详细地址</span>
                    <p class="list-item-right">{{ applicant.address }}</p>
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
                                        @click="showVantImg()"
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
                        <i>商品服务项</i>
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
                            <span class="detail-left">申请费</span>
                            <span class="detail-right" v-if="price > 0">￥{{ parseInt(price) }}</span>
                        </div>
                        <div class="detail-list" v-show="parseInt(productClass.allPriceBs * year) > 0">
                            <span class="detail-left">商品服务项</span>
                            <span class="detail-right">￥{{ productClass.allPriceBs * year }}</span>
                        </div>
                        <div class="detail-list allprice">
                            <span>总计：</span>
                            <span class="detail-right">￥{{ totalMoney }}</span>
                        </div>
                    </div>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isAgree }" @click="switchAgree"></i>
                    <p>我已阅读<a href="javascript:void(0);" @click="goAnchor('申请人须知', '4')">《申请人须知》</a>条款</p>
                </div>
                <div class="brand-bottom-btn">
                    <div class="brand-consultant">
                        <div class="brand-consultant-top">
                            <label>品牌顾问工号</label>
                            <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号" />
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
        <!-- <div class="money-detail" v-show="pageNum == 0">
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
        </div> -->
        <!-- 品牌顾问工号 -->
        <!-- <div class="brand-consultant" v-show="pageNum == 2">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号" />
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
        </div> -->
        <div class="fill_bottom news-fill_bottom">
            <div class="money-detail money-detail-news" v-show="pageNum !== 2">
                <div class="money-box">
                    <div class="detail-list allprice">
                        <span>总计：</span>
                        <span class="detail-right">￥{{ totalMoney }}</span>
                    </div>
                </div>
            </div>
            <div class="fill_bottom_btn">
                <button class="next" @click="next(pageNum)" v-show="pageNum == 0">下一步</button>
                <button class="next" @click="next(pageNum)" v-show="pageNum == 1">预览</button>
                <div class="addCard-btn" v-show="pageNum == 2">
                    <button class="btn-add" @click="addShopCart()">加入申请列表</button>
                    <button class="btn-apply" @click="goPayment()">去付款</button>
                </div>
            </div>
        </div>
        <!-- 推荐品牌顾问 -->
        <sale-code :corpid="applicant.corpid || applicant.id"></sale-code>
        <!-- 上传资料 -->
        <upload-files v-show="isShowFiles" mark="bs" len="1"></upload-files>
        <!-- 图片预览 -->
        <van-image-preview v-model="vant_ImgShow" :images="vant_ImgArr" :start-position="vant_ImgIndex"></van-image-preview>
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
            pageNum: 0,
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
            // 是否显示上传文件弹框
            isShowFiles: false,
            // 是否显示vant 图片预览组件
            vant_ImgShow: false,
            // vant 图片预览组件的index
            vant_ImgIndex: 0,
            // vatn 图片预览组件的数组
            vant_ImgArr: [],
            // 是否为自动上传
            uploadType: 1,
            // 自动生成图片
            isGenerateImg: '',
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
        } else if (this.proEditId && sessionStorage.mark === 'bs') {
            // 如果是编辑
            this.getTmdEdit(this.proEditId);
        }
        // 获取商标分类
        this.getBsType();
        // 触发获取品牌顾问
        hub.$on('send-salecode', ({ salecode }) => {
            this.salesCode = salecode;
        });
        // 触发获取上传资料
        hub.$on('upfiles-img', ({ item, isType }) => {
            const that = this;
            if (isType && isType === 'us') {
                item.map(function(_item) {
                    that.imgcode = _item.fileurl;
                });
                // 更新存儲
                that.temptStorage();
            } else {
                that.imgcode = item.fileurl;
            }
        });
        // 触发获取上传资料弹框显隐
        hub.$on('upfiles-close', ({ ishow }) => {
            this.isShowFiles = ishow;
        });
    },
    watch: {
        // 监听页码，判断是否获取销售顾问
        pageNum: async function() {
            const that = this;
            if (that.pageNum === 2) {
                if (that.applicant.corpid || that.applicant.id) {
                    // if (that.getSaleMember.list.length <= 0) {
                    //     utils.getSalesCode(that.applicant.corpid || that.applicant.id);
                    // }
                    utils.getSalesCode(that.applicant.corpid || that.applicant.id, 'bs');
                }
            }
        },
        // 监听类型 文字商标和组合商标才需要填写
        selectKey: function() {
            if (this.selectKey == 2) {
                this.bsName = '';
                this.uploadType = 1;
            }
        },
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SALE_MEMBER]]),
        ...mapGetters({
            getSaleMember: [GetterTypes.GET_SALE_MEMBER],
        }),
        // 计算总金额
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
        // 实时更新
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
    methods: {
        // 切换类型生成类型
        switchUploadType: function(index) {
            if (this.selectKey == 2) {
                return false;
            }
            this.uploadType = index;
        },
        // 自动生成logo图
        toImage() {
            const that = this;
            if (!that.bsName || that.bsName === '') {
                Toast({
                    message: '商标名不能为空',
                    duration: 2000,
                });
                return false;
            }
            // 调用绘制方法
            // that.$axios.post('index.php?c=App&a=createImg', { word: that.bsName, type: 1 }).then(function(response) {
            //     let _data = response.data;
            //     if (_data.errcode == 0) {
            //         that.imgcode = _data.content.url;
            //     }
            // });
            let result = utils.canvasImg.drawLogo(that.bsName, '64px 黑体');
            let attachment = result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
            let temptItem = {
                filename: 'text—logo',
                file_base64: attachment,
            };
            that.$axios.post('index.php?c=App&a=uploadAttachment', temptItem).then(function(response) {
                if (response.data.errcode == 0) {
                    that.imgcode = response.data.content.url;
                } else {
                    Toast({
                        message: response.data.errmsg,
                        duration: 2000,
                    });
                }
            });
        },
        // 选择推荐品牌顾问
        selectMembr: function(index) {
            utils.showSaleBox(index);
        },
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
                    // 商标分类数据重组
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
        // 选择商标类别
        applyClass: function() {
            this.$router.push({
                path: '/applyClass',
                query: {
                    path: 'application',
                },
            });
        },
        //前往申请人须知页面
        goAnchor(type, num) {
            sessionStorage.formUrl = this.$route.path;
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: 'bs',
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
        // 清空缓存数据
        clearTemptData: function() {
            sessionStorage.removeItem('productClass');
            sessionStorage.removeItem('proEditId');
            sessionStorage.removeItem('formUrl');
            sessionStorage.removeItem('rgInfor');
        },
        // 下一步判断
        nextJudge: function() {
            const that = this;
            if (that.bsName == '' && that.selectKey != 2) {
                Toast({
                    message: '请输入商标名称',
                    duration: 3000,
                });
                return;
            } else if (that.desc == '') {
                Toast({
                    message: '请输入商标说明',
                    duration: 3000,
                });
                return;
            } else if (that.imgcode == '') {
                Toast({
                    message: '请上传商标图',
                    duration: 3000,
                });
                return;
            } else if (!that.productClass.classType || Object.keys(that.productClass.classType).length <= 0) {
                Toast({
                    message: '请选择商品服务项',
                    duration: 1500,
                });
                return false;
            } else {
                that.pageNum = 1;
            }
            if (Object.keys(that.applicant).length <= 0) {
                that.showSome = false;
                that.getApplicant();
            }
        },
        //切换页码
        changePage(type) {
            if (type == 0) {
                this.pageNum = type;
            } else if (type == 1) {
                this.nextJudge();
            }
        },
        // 下一步
        next(num) {
            if (num == 0) {
                this.nextJudge();
            } else if (num == 1) {
                this.pageNum = 2;
            }
        },
        // 点击返回
        goback() {
            let num = this.pageNum;
            if (num == 0) {
                // 如果是编辑
                if (this.proEditId && sessionStorage.mark === 'bs') {
                    this.$router.push({
                        path: '/shoppingCart',
                    });
                } else {
                    // 搜索
                    this.$router.push('/tradeService?mark=bs');
                }
                this.clearTemptData();
                // 隐藏vant图片预览
                this.vant_ImgShow = false;
            } else if (num == 1) {
                this.pageNum = 0;
            } else if (num == 2) {
                // 如果弹框未关闭，点击浏览器返回，关闭
                utils.closeSaleBox();
                // 隐藏vant图片预览
                this.vant_ImgShow = false;
                this.pageNum = 1;
            }
            history.pushState(null, null, document.URL);
        },
        // 获取申请人信息
        getApplicant() {
            const that = this;
            // 获取主体名称
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
        // 获取商标类型
        getBsType() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getBsType', {})
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        that.bsTypeArr = response.data.content;
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
            this.imgcode = '';
        },
        // 上传资料
        showFiles: function() {
            this.isShowFiles = true;
        },
        // 预览图片
        showVantImg: function() {
            this.vant_ImgShow = true;
            this.vant_ImgArr = [];
            this.vant_ImgArr.push(this.configs.api.public_domain + this.imgcode);
        },
        // 上传商标图片
        toBase64(e) {
            const that = this;
            let files = e.target.files[0];
            let reader = new FileReader();
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
                that.$axios
                    .post('index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: attachment,
                        limit: 'jpg,jpeg',
                        size: '500000*385*230',
                    })
                    .then(function(response) {
                        if (response.data.errcode == 0) {
                            that.imgcode = response.data.content.url;
                        } else {
                            Toast({
                                message: response.data.errmsg,
                                duration: 3000,
                            });
                        }
                    });
            };
        },
        //加入申请列表
        addShopCart() {
            const that = this;
            if (!this.isAgree) {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (that.salesCode === '' || !that.salesCode) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(that.salesCode)) {
                return false;
            } else {
                that.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: that.salesCode,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            Indicator.open({
                                text: '正在提交...',
                                spinnerType: 'fading-circle',
                            });
                            let _msg = {
                                productid: that.productid,
                                product_name: that.product_name,
                                feetype: 'Z',
                                bs_type: that.selectKey,
                                bs_name: that.bsName,
                                bs_desc: that.desc,
                                bs_attachment: that.imgcode,
                                class_detail: that.productClass.content,
                                other_class_fee: that.productClass.allPriceBs,
                                price: that.price,
                                total: that.totalMoney,
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
                            setTimeout(function() {
                                //提交数据
                                that.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: JSON.stringify(_msg),
                                        sales_code: that.salesCode,
                                        id: that.proEditId,
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
                                            sessionStorage.mark = 'bs';
                                            that.clearTemptData();
                                            setTimeout(function() {
                                                //请求成功跳转清单列表页
                                                that.$router.push({
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
            let that = this;
            if (!this.isAgree) {
                Toast({
                    message: '请先阅读《申请人须知》条款',
                    duration: 1500,
                });
                return;
            } else if (that.salesCode === '' || !that.salesCode) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return;
            } else if (!utils.checkFormat(that.salesCode)) {
                return false;
            } else {
                that.$axios
                    .post('index.php?c=App&a=checkSalesCode', {
                        sales_code: that.salesCode,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode == 0) {
                            Indicator.open({
                                text: '正在生成支付订单',
                                spinnerType: 'fading-circle',
                            });
                            let _msg = {
                                productid: that.productid,
                                product_name: that.product_name,
                                feetype: 'Z',
                                bs_type: that.selectKey,
                                bs_name: that.bsName,
                                bs_desc: that.desc,
                                bs_attachment: that.imgcode,
                                class_detail: that.productClass.content,
                                other_class_fee: that.productClass.allPriceBs,
                                price: that.price,
                                total: that.totalMoney,
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
                            setTimeout(function() {
                                //提交数据
                                that.$axios
                                    .post('index.php?c=App&a=setWishlist', {
                                        data: JSON.stringify(_msg),
                                        sales_code: that.salesCode,
                                        id: that.proEditId,
                                    })
                                    .then(function(response) {
                                        if (response.data.errcode == 0) {
                                            let id = response.data.content.id;
                                            sessionStorage.product = JSON.stringify(response.data.content.product);
                                            // 去结算
                                            sessionStorage.ids = id;
                                            that.$axios
                                                .post('index.php?c=App&a=setOrder', {
                                                    ids: id,
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
                                                                    that.configs.api.public_english_url +
                                                                    '/playorder?id=' +
                                                                    orderId +
                                                                    '&price=' +
                                                                    that.totalMoney +
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
                                                                    that.configs.api.public_english_url +
                                                                    '/playorder?id=' +
                                                                    orderId +
                                                                    '&price=' +
                                                                    that.totalMoney +
                                                                    '&token=' +
                                                                    sessionStorage.token +
                                                                    '&created_time=' +
                                                                    created_time +
                                                                    '&balance=' +
                                                                    balance;
                                                            }
                                                        }
                                                        //清除数据
                                                        that.clearTemptData();
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
            background: #ffffff;
            border-radius: 0.08rem;
            width: 100%;
            padding: 0.22rem;
            border: 0.02rem solid #e4e4e4;
            font-family: 'weiruanyahei';
            height: 1.86rem;
            box-sizing: border-box;
            resize: none;
            outline: none;
            font-size: 0.28rem;
            appearance: none;
            -moz-appearance: none; /* Firefox */
            -webkit-appearance: none; /* Safari 和 Chrome */
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
            border: 0.02rem dashed #e5e5e5;
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
    // padding-bottom: 2.6rem !important;
}
// 商品服务项添加border
.bdtop {
    border-top: 1px solid #f1f1f1;
    .bdtop-icons-down {
        margin-left: 0.36rem;
        display: block;
        width: 0.24rem;
        height: 0.14rem;
        background: url(../../assets/images/common/icons-down.png) right center no-repeat;
        background-size: 100% 100%;
    }
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
// 自动生成图片
.generate-image {
    display: flex;
    margin-bottom: 0.32rem;
    &-left {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.32rem;
        flex: none;
        width: 2.4rem;
        height: 2.4rem;
        border: 0.02rem dashed #e5e5e5;
        .text-logo {
            display: block;
            max-width: 2.36rem;
            max-height: 2.36rem;
        }
        .del-icon {
            position: absolute;
            z-index: 2;
            top: -0.235rem;
            right: -0.235rem;
            width: 0.47rem;
            height: 0.47rem;
        }
        .islogo {
            font-size: 0.26rem;
            color: #666666;
            text-align: center;
        }
    }
    &-right {
        .tips {
            font-size: 0.24rem;
            color: #999999;
            line-height: 0.3rem;
            font-family: 'SansCN-Light';
        }
        .generate-image-btn {
            display: block;
            margin-top: 0.2rem;
            width: 2.2rem;
            height: 0.7rem;
            font-size: 0.3rem;
            color: #ffffff;
            background: linear-gradient(131deg, rgba(15, 179, 254, 1) 0%, rgba(0, 134, 255, 1) 100%);
            border-radius: 0.04rem;
        }
    }
}
.feekbook-upload {
    background: #fff;
    width: 100%;
    .upload-til {
        font-size: 0.28rem;
        color: #2c3852;
    }
    .upload-title {
        flex: none;
        padding-bottom: 0.2rem;
        padding-top: 0.3rem;
    }
    .upload-title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: auto;
        margin: 0.28rem 0;
        &-title {
            font-size: 0.3rem;
        }
        .upload-title-type {
            display: flex;
            flex: auto;
            justify-content: flex-end;
            &-item {
                margin-left: 0.66rem;
                display: flex;
                align-items: center;
                .icons {
                    display: block;
                    margin-right: 0.16rem;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.36rem;
                    overflow: hidden;
                    background: url(../../assets/images/shoppingCart/icon_notCheck.png) center center no-repeat;
                    background-size: contain;
                    &.active {
                        background: url(../../assets/images/shoppingCart/icon_checked.png) center center no-repeat;
                        background-size: contain;
                    }
                }
                .text {
                    font-size: 0.3rem;
                }
            }
        }
        .icons-down {
            width: 0.24rem;
            height: 0.14rem;
            background: url(../../assets/images/common/icons-down.png) right center no-repeat;
            background-size: 100% 100%;
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
        }
    }
    .upload-msg {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .upload-tips {
        color: #999;
        padding-left: 0.32rem;
        font-size: 0.24rem;
        line-height: 0.3rem;
        font-family: 'SansCN-Light';
    }
    .voucher-center {
        display: inline-block;
        background: #fff;
        padding-bottom: 0.32rem;
        .voucher-case {
            display: inline-block;
            width: 2.4rem;
            background-size: auto 100%;
            height: 2.4rem;
            opacity: 1;
            float: left;
            position: relative;
            border-radius: 0.08rem;
            .img_minus {
                overflow: hidden;
                height: 100%;
                max-width: 100%;
                border: 0.02rem dashed #e5e5e5;
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
