<template>
    <div class="fill_information" :class="{ fill_bot: pageNum !== 3, fill_bot3: pageNum === 3 }">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>

        <div class="con_box containerView-main" v-if="showSome">
            <div class="til-word" v-show="pageNum === 0 || pageNum === 1 || pageNum === 2">
                <div class="title" @click="switchPage(0)" :class="{ active: pageNum == 0 }">
                    申请信息
                </div>
                <div class="title" @click="switchPage(1)" :class="{ active: pageNum == 1 }">
                    申请人信息
                </div>
                <div class="title" @click="switchPage(2)" :class="{ active: pageNum == 2 }">
                    申请材料
                </div>
            </div>
            <div class="list_box news-class" v-if="pageNum == 0">
                <div class="list_item">
                    <span>申请品牌名称</span>
                    <p class="apply-keyword">{{ keyword }}</p>
                </div>
                <div class="list_item news-list-item">
                    <div class="news-list">
                        <span>年限</span>
                        <select v-model="year" class="select-right">
                            <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }} 年</option>
                        </select>
                    </div>
                    <div class="news-list lt-bottom">
                        <div class="bg-color">￥{{ price | numToInt }}/年</div>
                        <div>费用：￥{{ price * year }}</div>
                    </div>
                </div>
                <div class="apply-class-list" v-if="product_mark == 'TMD_S'" @click="applyClass()">
                    <div class="apply-class-item">
                        <span class="left-type">类别 <i class="icon-doubt"></i></span>
                        <div class="right">
                            <i class="right-text">{{ classTypeList && classTypeList.length > 0 ? '已选类别' : '请选择类别' }}</i>
                            <span class="icons-down"></span>
                        </div>
                    </div>
                    <div class="apply-class-item tips-text">
                        <div class="tips-left">
                            <!-- <p>超过1个大类，每大类加收1200元</p>
                            <p>每个大类含10个小类，超过10个小类</p>
                            <p>每小类加收200元</p> -->
                        </div>
                        <span class="tips-price">费用：￥{{ allPrice }}</span>
                    </div>
                </div>
                <!-- 商标选中类别 -->
                <!-- <div class="apply-class-item" v-if="productClass.classType && Object.keys(productClass.classType).length > 0">
                    <div class="apply-class-item-bdmain">
                        <p class="apply-class-item-bdmain-tips">超过一个大类，每大类加收<span>1200</span>元</p>
                        <div class="apply-class-box">
                            <div class="apply-class-box-top">
                                <h2 class="apply-class-box-top-title">已选择的商标类别</h2>
                                <button class="delete-all" @click="deleteAllClass()">删除全部类别</button>
                            </div>
                            <div class="apply-class-item-list" v-for="(val, index, key) in productClass.classType" :key="index">
                                <div class="apply-class-item-list-top">
                                    <h2 @click="editClass(index)">{{ index }}</h2>
                                    <div class="right-delete">
                                        <span v-if="key <= 0">
                                            {{
                                                productClass.classType[index].length > 10
                                                    ? '￥' + (productClass.classType[index].length - 10) * 200
                                                    : ''
                                            }}
                                        </span>
                                        <span v-else>
                                            ￥{{
                                                productClass.classType[index].length > 10
                                                    ? 1200 + (productClass.classType[index].length - 10) * 200
                                                    : 1200
                                            }}
                                        </span>
                                        <button class="delete-single" @click="deleteSingle(index)"></button>
                                    </div>
                                </div>
                                <div class="apply-class-item-list-main" @click="editClass(index)">
                                    <span v-for="item in productClass.classType[index]" :key="item.id + item.name">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- 商标选中类别 v1.2 2020.01.07-->
                <div class="apply-class-item" v-if="classTypeList && classTypeList.length > 0">
                    <div class="apply-class-item-bdmain">
                        <p class="apply-class-item-bdmain-tips">超过一个大类，每大类加收<span>1200</span>元</p>
                        <div class="apply-class-box">
                            <div class="apply-class-box-top">
                                <h2 class="apply-class-box-top-title">已选择的商标类别</h2>
                                <button class="delete-all" @click="deleteAllClass()">删除全部类别</button>
                            </div>
                            <div class="apply-class-item-list" v-for="(val, index) in classTypeList" :key="index">
                                <div class="apply-class-item-list-top">
                                    <h2 @click="editClass(val)">{{ val.categoryName }}</h2>
                                    <div class="right-delete">
                                        <button class="delete-single" @click="deleteSingle(index)"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 审核费 -->
                <div
                    class="apply-audit-fee"
                    :class="{
                        'bd-top': product_mark == 'TMD_S' && (!classTypeList || classTypeList.length <= 0),
                    }"
                >
                    <p class="apply-audit-fee-title">审核费</p>
                    <div class="apply-audit-fee-money">
                        <span class="bg-color">￥{{ audit }}/个</span>
                        <!-- <span>费用:￥{{ audit }}</span> -->
                    </div>
                </div>
                <!-- 如果是全类别 -->
                <div class="apply-allclass-tips" v-if="product_mark !== 'TMD_S'">
                    已选择{{ product_name }}
                    <!-- {{ product_mark == 'TMD_F1' ? '全类别保护-独创品牌' : product_mark == 'TMD_F2' ? '全类别保护-知名品牌' : '' }} -->
                </div>
            </div>
            <div class="list_box list_box_news" v-if="pageNum == 1">
                <div>
                    <div class="list_item">
                        <span>类型</span>
                        <p class="list-item-right">{{ applicant.corptype_name }}</p>
                    </div>
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
            <div class="list_box list_box_news" v-if="pageNum == 2">
                <div class="apply-materials">
                    <!-- <div class="apply-materials-tips">
                        注册须提交以下资料，申请提交注册审核须5个工作日 以下资料可在提交订单后3天内补齐。
                    </div> -->
                    <!-- <div class="apply-materials-top-title">商标权利证明</div> -->
                    <!-- <div class="apply-materials-menu">
                        <span
                            v-for="list in typeListText"
                            :key="list.key"
                            @click="switchType(list)"
                            :class="{ active: applyType == list.key }"
                        >
                            {{ list.name }}
                        </span>
                    </div> -->
                    <div class="list_item">
                        <span>选择证明</span>
                        <select v-model="applyType" class="apply-type">
                            <option :value="list.key" v-for="(list, key) in typeListText" :key="key">{{ list.name }}</option>
                        </select>
                        <span class="icons-down"></span>
                    </div>
                    <p class="apply-materials-title">
                        上传图片
                    </p>
                    <div class="feekbook-upload">
                        <p class="apply-materials-little-title" v-for="(text, i) of typeListText[applyType].tipsThree" :key="i">
                            {{ text }}
                        </p>
                        <div class="voucher-center">
                            <div class="voucher-case" @click="showVantImg(index)" v-for="(item, index) in imgArr" :key="index">
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
                                    @click.stop="del_img($event, index, 'imgArr')"
                                />
                            </div>
                            <!-- 默认图片 -->
                            <div class="voucher-case" @click="showFiles()">
                                <div class="img_minus setDelBtn-img-hook">
                                    <label for>
                                        <div class="img-voucher">
                                            <img src="../../assets/images/user/upload-img.png" alt />
                                            <span>上传图片</span>
                                        </div>
                                        <!-- <input type="hidden" class="verify-right-hook" v-model="imgArr[0]" /> -->
                                        <!-- <input type="file" id="img_input" name="img_input" @change="toBase64($event)" class="upload-img" /> -->
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <p v-if="product_mark !== 'TMD_S'">
                            <!-- {{ product_mark == 'TMD_F1' ? '全类别保护-独创品牌' : product_mark == 'TMD_F2' ? '全类别保护-知名品牌' : '' }} -->
                            {{ product_name }}
                        </p>
                        <div class="category" v-else>
                            <div class="category-list" v-for="(val, index) in classTypeList" :key="index">
                                <p>{{ val.categoryName }}</p>
                                <!-- <div class="category-small">
                                    <span v-for="item in productClass.classType[index]" :key="item.id">{{ item.name }}</span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="apply-msg-title">申请材料</h2>
                <div class="apply-materials-list">
                    <p class="apply-materials-list-title">{{ typeListText[applyType].name }}</p>
                    <div class="apply-materials-list-img">
                        <a
                            href="javascript:void(0);"
                            v-for="(list, i) in imgArr"
                            :key="i"
                            @click="showVantImg(i)"
                            v-bind:style="{
                                backgroundImage: 'url(' + configs.api.public_domain + list.fileurl + ')',
                            }"
                        ></a>
                    </div>
                </div>
                <h2 class="apply-msg-title">申请人信息</h2>
                <div class="apply-subject">
                    <div class="msg-list">
                        <i>类型</i>
                        <span> {{ applicant.corptype_name }} </span>
                    </div>
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
                            <span class="detail-right" v-if="price > 0">￥{{ price * year }}</span>
                        </div>
                        <div class="detail-list">
                            <span class="detail-left">审核费</span>
                            <span class="detail-right">￥{{ audit }}</span>
                        </div>
                        <div class="detail-list" v-show="parseInt(allPrice) > 0">
                            <span class="detail-left">新增类别费</span>
                            <span class="detail-right">￥{{ allPrice }}</span>
                        </div>
                        <div class="detail-list allprice">
                            <span>总计：</span>
                            <span class="detail-right">￥{{ totalMoney }}</span>
                        </div>
                    </div>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isRead }" @click="readRule"></i>
                    <p>我已阅读<a href="javascript:void(0);" @click="viewPrivacy('申请人须知', '4')">《申请人须知》</a>条款</p>
                </div>
                <div class="brand-bottom-btn">
                    <div class="brand-consultant" v-show="pageNum === 3">
                        <div class="brand-consultant-top">
                            <label>品牌顾问工号</label>
                            <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
                        </div>
                        <div class="brand-consultant-text">
                            <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                            <p>或推荐以下品牌顾问给你选择：</p>
                            <div class="sale_code_member">
                                <span v-for="(item, index) of getSaleMember.list" :key="index" @click.stop="selectMembr(index)">
                                    {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="fill_bottom_btn">
                        <div class="addCard-btn">
                            <button class="btn-add" @click="addShopCart('add')" v-show="!isChange">加入申请列表</button>
                            <button class="btn-apply" @click="addShopCart('play')">付款</button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- <div class="money-detail" v-show="pageNum == 0">
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
        </div> -->
        <!-- 品牌顾问工号 -->
        <!-- <div class="brand-consultant" v-show="pageNum === 3">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
            </div>
            <div class="brand-consultant-text">
                <p>品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：{{ configs.api.link_phone }}</p>
                <p>或推荐以下品牌顾问给你选择：</p>
                <div class="sale_code_member">
                    <span v-for="(item, index) of getSaleMember.list" :key="index" @click.stop="selectMembr(index)">
                        {{ item.name }}<i v-if="index < getSaleMember.list.length - 1">、</i>
                    </span>
                </div>
            </div>
        </div> -->
        <div class="fill_bottom news-fill_bottom">
            <!-- <div class="bottom_l">
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
                    <button class="btn-apply" @click="addShopCart('play')">去付款</button>
                </div>
            </div> -->
            <!-- <div class="fill_bottom_price">
                <div class="price-list" v-show="pageNum == 0">
                    <span class="price-left">注册费</span>
                    <span class="price-right" v-if="price > 0"> ￥{{ parseInt(price) * year }}</span>
                </div>
                <div class="price-list" v-show="pageNum == 0">
                    <span class="price-left">审核费</span>
                    <span class="price-right">￥{{ audit }}</span>
                </div>
                <div class="price-list" v-show="pageNum == 0">
                    <span class="price-left">新增类别费</span>
                    <span class="price-right">￥{{ parseInt(productClass.allPrice) > 0 ? productClass.allPrice * year : 0 }}</span>
                </div>
                <div class="price-list allprice">
                    <span class="price-left">总计：</span>
                    <span class="price-right">￥{{ totalMoney }}</span>
                </div>
            </div> -->
            <div class="money-detail money-detail-news" v-show="pageNum !== 3">
                <div class="money-box">
                    <!-- <div class="detail-list" v-show="pageNum == 0">
                        <span class="detail-left">注册费</span>
                        <span class="detail-right" v-if="price > 0">￥{{ price * year }}</span>
                    </div>
                    <div class="detail-list" v-show="pageNum == 0">
                        <span class="detail-left">审核费</span>
                        <span class="detail-right">￥{{ audit }}</span>
                    </div>
                    <div class="detail-list" v-show="parseInt(productClass.allPrice) > 0 && pageNum == 0">
                        <span class="detail-left">新增类别费</span>
                        <span class="detail-right">￥{{ productClass.allPrice * year }}</span>
                    </div> -->
                    <div class="detail-list allprice">
                        <span>总计：</span>
                        <span class="detail-right">￥{{ totalMoney }}</span>
                    </div>
                </div>
            </div>
            <div class="fill_bottom_btn">
                <button class="next" v-if="pageNum !== 3" @click="next(pageNum)">下一步</button>
                <div class="addCard-btn" :class="{ 'addCard-btn-one': isChange }" v-else>
                    <button class="btn-add" @click="addShopCart('add')" v-show="!isChange">加入申请列表</button>
                    <button class="btn-apply" @click="addShopCart('play')">付款</button>
                </div>
            </div>
        </div>
        <!-- 推荐品牌顾问 -->
        <sale-code :corpid="applicant.corpid || applicant.id"></sale-code>
        <!-- 上传资料 -->

        <upload-files v-show="isShowFiles" :len="3 - imgArr.length"></upload-files>
        <!-- 图片预览 -->
        <van-image-preview v-model="vant_ImgShow" :images="vant_ImgArr" :start-position="vant_ImgIndex"></van-image-preview>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import * as utils from '@/utils/index';
import * as GetterTypes from '@/constants/GetterTypes';
import { mapGetters } from 'vuex';
import hub from '@/hub';
export default {
    name: 'fill_information',
    data() {
        return {
            // 注册词
            keyword: JSON.parse(sessionStorage.getItem('tmdSearch')) ? JSON.parse(sessionStorage.getItem('tmdSearch')).tmdDomain : '',
            // 产品id
            productId: JSON.parse(sessionStorage.getItem('tmdSearch')) ? JSON.parse(sessionStorage.getItem('tmdSearch')).productId : '',
            //产品，名称
            product_name: '',
            // 注册年限
            year: 1,
            // 价格
            price: JSON.parse(sessionStorage.getItem('tmdSearch')) ? JSON.parse(sessionStorage.getItem('tmdSearch')).price : 0,
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
            typeText: [],
            // 是否阅读申请人须知
            isRead: false,
            //销售顾问工号
            sales_code: '',
            //点商标资质类型
            typeListText: {},
            // 无申请人信息整个不显示
            showSome: true,
            //本地存储的分类
            // productClass: JSON.parse(sessionStorage.getItem('productClass')) ? JSON.parse(sessionStorage.getItem('productClass')) : {},
            // 编辑id
            proEditId: sessionStorage.proEditId ? sessionStorage.proEditId : 0,
            // 是否为换词
            isChange: sessionStorage.changeId ? true : false,
            // 是否为续费
            renewalInfor: JSON.parse(sessionStorage.getItem('renewalInfor')) ? JSON.parse(sessionStorage.getItem('renewalInfor')) : '',
            // 是否显示上传文件弹框
            isShowFiles: false,
            // 是否显示vant 图片预览组件
            vant_ImgShow: false,
            // vant 图片预览组件的index
            vant_ImgIndex: 0,
            // vatn 图片预览组件的数组
            vant_ImgArr: [],
            // 是否为全品类
            product_mark: sessionStorage.getItem('tmd_mark') ? sessionStorage.getItem('tmd_mark') : '',
            // 存储商标分类 v1.2
            classTypeList: sessionStorage.getItem('checkLists') ? JSON.parse(sessionStorage.getItem('checkLists')) : [],
        };
    },
    created() {
        const that = this;
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('rgInfor')) {
            let temptTmd = JSON.parse(sessionStorage.getItem('rgInfor'));
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
            // that.sales_code = temptTmd.sales_code;
            that.typeListText = temptTmd.typeListText;
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
        else if (that.proEditId && sessionStorage.mark === 'tmd') {
            that.getTmdEdit(that.proEditId);
        } else if (that.renewalInfor) {
            // 如果是续费
            that.getOrderItemInfo(that.renewalInfor.itemid, 1);
        }
        this.init();
        // 触发获取品牌顾问
        hub.$on('send-salecode', ({ salecode }) => {
            this.sales_code = salecode;
        });
        // 触发获取上传资料
        hub.$on('upfiles-img', ({ item, isType }) => {
            const that = this;
            if (isType && isType === 'us') {
                item.map(function(_item) {
                    that.imgArr.push(_item);
                });
                // 更新存儲
                that.temptStorage();
            } else {
                that.imgArr.push(item);
            }
        });
        // 触发获取上传资料弹框显隐
        hub.$on('upfiles-close', ({ ishow }) => {
            this.isShowFiles = ishow;
        });
    },
    updated() {
        const that = this;
        // 变更实时存储（方法待定）
        that.temptStorage();
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
                    // if (that.getSaleMember.list.length <= 0) {
                    //     utils.getSalesCode(that.applicant.corpid || that.applicant.id, 'tmd');
                    // }
                    // 请求获取推荐品牌顾问
                    utils.getSalesCode(that.applicant.corpid || that.applicant.id, 'tmd');
                }
            }
        },
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SALE_MEMBER]]),
        ...mapGetters({
            getSaleMember: [GetterTypes.GET_SALE_MEMBER],
        }),
        // 新增类别费
        allPrice: function() {
            let newAdd = 0;
            if (this.classTypeList && this.classTypeList.length > 0) {
                newAdd = parseInt((this.classTypeList.length - 1) * 1200 * this.year);
            }
            return newAdd;
        },
        // 实时计算金额
        totalMoney() {
            let money = 0;
            money = this.year * this.price + this.audit + this.allPrice;
            return money;
        },
    },
    methods: {
        // 删除全部商标分类
        deleteAllClass: function() {
            sessionStorage.removeItem('checkLists');
            this.classTypeList = [];
        },
        // 编辑单个分类
        editClass: function(val) {
            this.applyClass(val.categoryKey);
        },
        // 删除单个
        deleteSingle: function(val) {
            delete this.classTypeList.splice(val, 1);
            // 更新存储
            sessionStorage.checkLists = JSON.stringify(this.classTypeList);

            // let temptClassList = this.productClass;
            // // 删除对应
            // delete temptClassList.classType[val];
            // temptClassList.content.map((item, index) => {
            //     if (item.categoryName === val) {
            //         temptClassList.content.splice(index, 1);
            //     }
            // });
            // // 先清空，再赋值，触发计算机属性响应
            // this.productClass = {};
            // this.productClass = temptClassList;
            // // 强制渲染
            // this.$forceUpdate();
            // // 更新存储
            // sessionStorage.productClass = JSON.stringify(temptClassList);
        },
        // 选择推荐品牌顾问
        selectMembr: function(index) {
            utils.showSaleBox(index);
        },
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
                // sales_code: that.sales_code,
                typeListText: that.typeListText,
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
            that.sales_code = item.sales_code ? item.sales_code : '';
            that.applicant = item.subject;
            // 分类
            // let classType = {};
            // item.class_detail.map(function(item1) {
            //     classType[item1.categoryName] = [];
            //     item1.detail.map(function(item2) {
            //         item2.products.map(item3 => {
            //             classType[item1.categoryName].push(item3);
            //         });
            //     });
            // });
            // let _item = {
            //     content: item.class_detail,
            //     classType: utils.sortObj(classType, 'asce'), //内容展示的数据结构,
            // };
            // // 本地存储分类
            // that.productClass = _item;
            // sessionStorage.productClass = JSON.stringify(_item);

            // 2020.01.07 -- 新版v1.2  分类
            if (item.class_detail) {
                // 兼容写法
                if (item.class_detail.detail) {
                    // 是否有商标分类
                    that.classTypeList = item.class_detail.detail;
                    if (item.class_detail.detail.length > 0) {
                        sessionStorage.checkLists = JSON.stringify(that.classTypeList);
                    }
                }
                // 是否有区分-单全品分类
                if (item.class_detail.item_mark) {
                    that.product_mark = item.class_detail.item_mark;
                    sessionStorage.tmd_mark = that.product_mark;
                }
            }
            // 申请人须知，设置为已读
            that.isRead = true;
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
                // 隐藏上传文件弹框
                that.isShowFiles = false;
                that.vant_ImgShow = false;
            } else if (num == 3) {
                // 如果弹框未关闭，点击浏览器返回，关闭
                utils.closeSaleBox();
                that.vant_ImgShow = false;
                that.pageNum = 2;
            }
            history.pushState(null, null, document.URL);
            // 滚动条置顶
            // that.scrollBottom();
        },
        // 下一步
        next(num) {
            var that = this;
            if (num == 0) {
                // 判断是否有选择分类
                if ((!that.classTypeList || that.classTypeList.length <= 0) && that.product_mark == 'TMD_S') {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getRegist();
                }
            }
            that.pageNum = num + 1;
            // 滚动条置顶
            // that.scrollBottom();
        },
        // 切换上下页
        switchPage: function(num) {
            if (num !== 0) {
                // 判断是否有选择分类
                if ((!this.classTypeList || this.classTypeList.length <= 0) && this.product_mark == 'TMD_S') {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
            }
            if (Object.keys(this.applicant).length <= 0) {
                if (num === 1) {
                    this.showSome = false;
                    this.getRegist();
                } else {
                    return false;
                }
            }
            this.pageNum = num;
            // 滚动条置顶
            // this.scrollBottom();
        },
        // 初始化
        init() {
            const that = this;
            const index = parseInt(that.productId);
            // switch (index) {
            //     case 1:
            //         that.product_name = 'A类 （商标名）.商标';
            //         break;
            //     case 2:
            //         that.product_name = 'B类 （商标名+商品/服务名）.商标';
            //         break;
            //     case 8:
            //         that.product_name = 'C类 （指定地+商标名）.商标';
            //         break;
            //     case 10:
            //         that.product_name = 'D类 （指定地+商标名+商品/服务项目名）.商标';
            //         break;
            // }
            // 获取产品列表
            that.$axios
                .post('index.php?c=App&a=getProducts', {
                    mark: 'tmd',
                    p: 1,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode == 0) {
                        _data.content.list[0].list.map(item => {
                            if (item.id == index) {
                                that.product_name = item.title;
                            }
                        });
                    } else {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                });

            // 获取点商标资质类型
            if (Object.keys(that.typeListText).length <= 0) {
                that.getTypeText();
            }
        },
        // 获取点商标资质类型
        getTypeText: function() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getTmdMaterialType', {}).then(function(response) {
                let _data = response.data;
                if (_data.errcode === 0) {
                    _data.content.map(function(_item) {
                        _item.tipsThree = _item.tips.split('\\n');
                        that.typeListText[_item.key] = _item;
                    });
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
        // switchType: function(list) {
        //     this.applyType = list.key;
        //     this.typeText = list.tips;
        // },
        // 点击删除
        del_img(e, i, val) {
            var that = this;
            that[val].splice(i, 1);
        },
        // 上传资料
        showFiles: function() {
            if (this.imgArr.length == 3) {
                Toast({
                    message: '上传图片不可超过3张',
                    duration: 3000,
                });
                return;
            }
            this.isShowFiles = true;
        },
        // 预览图片
        showVantImg: function(index) {
            this.vant_ImgShow = true;
            this.vant_ImgIndex = index;
            this.vant_ImgArr = [];
            this.imgArr.map(item => {
                this.vant_ImgArr.push(this.configs.api.public_domain + item.fileurl);
            });
        },
        // 上传图片
        // toBase64(e) {
        //     var that = this;
        //     if (that.imgArr.length == 3) {
        //         Toast({
        //             message: '上传图片不可超过3张',
        //             duration: 3000,
        //         });
        //         return;
        //     }
        //     var files = e.target.files[0];
        //     var reader = new FileReader();
        //     reader.readAsDataURL(files);
        //     reader.onload = function() {
        //         var imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
        //         that.$axios
        //             .post('index.php?c=App&a=uploadAttachment', {
        //                 filename: files.name,
        //                 file_base64: imgcode,
        //             })
        //             .then(function(response) {
        //                 let _item = {
        //                     fileurl: response.data.content.url,
        //                 };
        //                 that.imgArr.push(_item);
        //             });
        //     };
        // },
        // 选择类别
        applyClass: function(key) {
            const that = this;
            that.$router.push({
                path: '/applyClassTmd',
                query: {
                    year: that.year,
                    key: key,
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
            sessionStorage.removeItem('rgInfor');
            sessionStorage.removeItem('checkLists');
            sessionStorage.removeItem('tmd_mark');
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
            if (that.sales_code === '' || !that.sales_code) {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return false;
            }
            if (!utils.checkFormat(that.sales_code)) {
                return false;
            }
            // 检测工号
            that.$axios
                .post('index.php?c=App&a=checkSalesCode', {
                    sales_code: that.sales_code,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Indicator.close();
                        // 判断是否为全类别
                        let temptTypeClass = {
                            item_mark: that.product_mark,
                            type: that.product_mark == 'TMD_S' ? 1 : 2,
                            detail: that.classTypeList,
                        };
                        // 设置临时加入数据
                        let temptData = {
                            productid: that.productId,
                            product_name: that.product_name,
                            keyword: that.keyword,
                            feetype: sessionStorage.isRenew ? 'X' : 'Z',
                            year: that.year,
                            price: that.price,
                            verify_fee: that.audit,
                            other_class_fee: that.allPrice,
                            total: that.totalMoney,
                            class_detail: temptTypeClass,
                            material_type: that.applyType,
                            material: that.imgArr,
                            subject: {
                                id: that.applicant.corpid || that.applicant.id,
                                name: that.applicant.corpname || that.applicant.name,
                                corptype_name: that.applicant.corptype_name,
                                linkman: that.applicant.linkman,
                                phone: that.applicant.phone,
                                email: that.applicant.email,
                                address: that.applicant.address,
                                province: that.applicant.province,
                                city: that.applicant.city,
                                area: that.applicant.area,
                            },
                        };
                        let text = '正在提交...';
                        if (typeName === 'play') {
                            text = '正在生成支付订单';
                        }
                        Indicator.open({
                            text: text,
                            spinnerType: 'fading-circle',
                        });
                        setTimeout(function() {
                            that.$axios
                                .post('/index.php?c=App&a=setWishlist', {
                                    data: JSON.stringify(temptData),
                                    sales_code: that.sales_code,
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
                                            let ids = response.data.content.id;
                                            that.$axios
                                                .post('index.php?c=App&a=setOrder', {
                                                    ids: ids,
                                                })
                                                .then(function(response) {
                                                    if (response.data.errcode == 0) {
                                                        //如果是换词，删除列表项
                                                        if (that.isChange) {
                                                            that.$axios
                                                                .post('index.php?c=App&a=delWishlist', {
                                                                    ids: ids,
                                                                })
                                                                .then(function() {});
                                                        }
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
                                                            // 清空
                                                            sessionStorage.removeItem('tmdSearch');
                                                            that.clearTemptData();
                                                        }
                                                    } else {
                                                        Toast({
                                                            message: response.data.errmsg,
                                                            duration: 2000,
                                                        });
                                                    }
                                                    Indicator.close();
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
        },
    },
};
</script>

<style scoped lang="scss">
.support-msg {
    font-size: 0.36rem;
    color: #2c3852;
}
</style>
