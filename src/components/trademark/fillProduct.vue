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
                    <input type="text" readonly="readonly" v-model="text" />
                </div>
                <div class="list_item">
                    <span>年限</span>
                    <select v-model="year" @change="choiceYear()">
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
                            <span v-for="item in getSelectClass.classType[index]" :key="item.productid">{{ item.productname }}</span>
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
                <div class="list_item">
                    <span>申请人名称</span>
                    <!-- <select v-model="corpname" @change="choiceCorpname()">
                        <option :value="data.corpname" v-for="item of some" :key="item.corpid">{{ item.corpname }}</option>
                    </select> -->
                    <p class="list-item-right" @click="viewApplyInfo">{{ data.corpname }}</p>
                    <span class="icon_r"></span>
                </div>
                <div class="list_item">
                    <span>联系人</span>
                    <p class="list-item-right">{{ data.linkman }}</p>
                    <!-- <input type="text" readonly="readonly" v-model="data.linkman" /> -->
                </div>
                <div class="list_item">
                    <span>联系电话</span>
                    <p class="list-item-right">{{ data.phone || data.mobile }}</p>
                    <!-- <input type="text" readonly="readonly" v-if="data.phone" v-model="data.phone" /> -->
                    <!-- <input type="text" readonly="readonly" v-else v-model="data.mobile" /> -->
                </div>
                <div class="list_item">
                    <span>联系邮箱</span>
                    <p class="list-item-right">{{ data.email }}</p>
                    <!-- <input type="text" readonly="readonly" v-model="data.email" /> -->
                </div>
                <div class="list_item">
                    <span>联系地址</span>
                    <p class="list-item-right">{{ data.province }} {{ data.city }} {{ data.area }}</p>
                    <!-- <input type="text" readonly="readonly" v-model="data.address" /> -->
                </div>
                <div class="list_item">
                    <span>详细地址</span>
                    <p class="list-item-right">{{ data.address }}</p>
                    <!-- <input type="text" readonly="readonly" v-model="data.address" /> -->
                </div>
            </div>
            <div class="apply-word" v-if="pageNum == 3">
                <h2 class="apply-msg-title">申请信息</h2>
                <div class="apply-msg">
                    <div class="msg-top">
                        <div class="msg-list">
                            <i>申请品牌名称</i>
                            <span>{{ text }}</span>
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
                                    <span v-for="item in getSelectClass.classType[index]" :key="item.productid">{{
                                        item.productname
                                    }}</span>
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
                        <span> {{ corpname }} </span>
                    </div>
                    <div v-if="data.province" class="msg-list">
                        <i>申请人所在区</i>
                        <span> {{ data.province }} {{ data.city }} {{ data.area }} </span>
                    </div>
                    <div v-if="data.phone" class="msg-list">
                        <i>企业地址</i>
                        <span>
                            {{ data.address }}
                        </span>
                    </div>
                    <div class="msg-list msg-list-rg">
                        <i>企业经办人</i>
                        <span> {{ data.linkman }} </span>
                    </div>
                    <div class="msg-list-sp">
                        <div v-if="data.mobile" class="msg-list">
                            <i>联系电话</i>
                            <span>
                                {{ data.mobile }}
                            </span>
                        </div>
                        <div v-if="data.email" class="msg-list">
                            <i>电子邮箱</i>
                            <span>
                                {{ data.email }}
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
                        <div class="detail-list">
                            <span class="detail-left">新增类别费</span>
                            <span class="detail-right">{{ getSelectClass.allPrice * year }} 元</span>
                        </div>
                    </div>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isRead }" @click="readRule"></i>
                    <p @click="readRule">我已阅读<a href="javascript:void(0);">《申请人须知》</a>条款</p>
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
                <div class="detail-list">
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
                <p class="all_price">￥{{ totalMoney + audit + getSelectClass.allPrice * year }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0 || pageNum == 1">
                    下一步
                </div>
                <div class="addCard" @click="next(pageNum)" v-show="pageNum == 2">
                    预览
                </div>
                <div class="addCard-btn" v-show="pageNum == 3">
                    <button class="btn-add" @click="addShopCart">加入申请列表</button>
                    <button class="btn-apply">去付款</button>
                </div>
            </div>
        </div>
        <!-- 商标分类 -->
        <applyClass :year="year" v-show="getSelectClass.isShow"></applyClass>
    </div>
</template>

<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import { Toast, Indicator } from 'mint-ui';
import applyClass from '@/components/trademark/applyClass.vue';
export default {
    name: 'fill_information',
    data() {
        return {
            text: this.$store.state.showTmd.keyword, //搜索过来的申请词
            ids: this.$store.state.showTmd.id, //产品id
            year: 1, //年限
            price: this.$store.state.showTmd.price, //费用
            token: '',
            data: {}, //默认第一条主体数据
            // some: [], //所有主体数据
            corpname: '', //主题名字
            length: '',
            all_price: 0, //总计费用
            pageNum: 0,
            audit: 600,
            product_name: '', //产品名称
            imgArr: [],
            applyType: 1, //补充材料选择类别
            typeText: '请上传商标证书', //材料类型提示
            isRead: false, // 是否阅读申请人须知
            salesCode: '', //销售顾问工号
        };
    },
    components: {
        applyClass,
    },
    created() {
        this.init(); //请求主题数据
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
        // 销毁前情况vuex选中分类
        let _item = {
            isShow: false,
            content: [],
            classType: {},
            allPrice: 0,
        };
        this[MutationTypes.SET_SELECT_CLASS](_item);
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_SELECT_CLASS], [GetterTypes.GET_SHOW_TMD]]),
        ...mapGetters({
            getSelectClass: [GetterTypes.GET_SELECT_CLASS],
            getShowTmd: [GetterTypes.GET_SHOW_TMD],
        }),
        totalMoney() {
            var money = this.year * this.price;
            return money;
        },
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_SELECT_CLASS], [MutationTypes.SET_SHOW_TMD]]),
        ...mapMutations({
            [MutationTypes.SET_SELECT_CLASS]: MutationTypes.SET_SELECT_CLASS,
            [MutationTypes.SET_SHOW_TMD]: MutationTypes.SET_SHOW_TMD,
        }),
        // 检测点击浏览器返回键
        // myFunction() {
        //   var str = location.hash.split("#step")[1];
        //   str ? "" : (str = 0);
        //   // console.log(this.tab.tabIndexState,this.tab.tabIndex)
        //   // if(this.tab.tabIndexState==4){
        //   //     this.tab.tabIndexState = 0;
        //   //     this.tab.tabIndex = 0;
        //   //     return;
        //   // }
        //   if (this.isHashChange && str != this.tab.tabIndexState) {
        //     if (str < this.tab.tabIndexState) {
        //       if (this.tab.tabIndexState == 4) {
        //         this.tab.tabIndexState = 0;
        //         this.tab.tabIndex = 0;
        //         location.hash = "#step" + this.tab.tabIndexState;
        //       } else {
        //         this.lastBtn("isGoBack");
        //       }
        //     } else {
        //       this.nextBtn("isGoBack");
        //       this.nextBtnOptional("isGoBack");
        //     }
        //   } else {
        //     this.isHashChange = true;
        //   }
        // },
        // 点击返回
        goback() {
            const _this = this;
            let num = _this.pageNum;
            if (num == 0) {
                let _item = {
                    isShow: false,
                    id: '',
                    keyword: '',
                    price: '',
                };
                _this[MutationTypes.SET_SHOW_TMD](_item);
            } else if (num == 1) {
                _this.pageNum = 0;
            } else if (num == 2) {
                _this.pageNum = 1;
            } else if (num == 3) {
                _this.pageNum = 2;
            }
            history.pushState(null, null, document.URL);
        },
        // 下一步
        next(num) {
            var _this = this;
            if (num == 0) {
                // 判断是否有选择分类
                if (!_this.getSelectClass.classType || Object.keys(_this.getSelectClass.classType).length <= 0) {
                    Toast({
                        message: '请选择分类',
                        duration: 1500,
                    });
                    return false;
                }
                _this.pageNum = 1;
            } else if (num == 1) {
                _this.getRegist();
                _this.pageNum = 2;
            } else if (num == 2) {
                _this.pageNum = 3;
            }
            // var str = location.hash.split("#step")[1];
            // var url = location.hash;

            // if (str) {
            //   // location.hash =
            // }
            // location.hash = location.hash + "#step" + num;
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
            this.pageNum = num;
        },
        // 初始化
        init() {
            if (sessionStorage.token) {
                this.token = sessionStorage.token;
            }
            const _this = this;
            const index = parseInt(this.$route.query.id);
            switch (index) {
                case 1:
                    _this.product_name = 'A类 （商标名）.商标';
                    break;
                case 2:
                    _this.product_name = 'B类 （商标名+商品/服务名）.商标';
                    break;
                case 8:
                    _this.product_name = 'C类（指定地+商标名）.商标';
                    break;
                case 10:
                    _this.product_name = 'D类 （指定地+商标名+商品/服务项目名）.商标';
                    break;
            }
        },
        // 获取主体
        getRegist() {
            let _this = this;
            _this.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    _this.data = _data.content; //默认赋值第一条
                    _this.corpname = _data.content.corpname; //默认赋值第一个主体信息
                } else {
                    Toast({
                        message: response.data.errmsg,
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
            var _this = this;
            _this[val].splice(i, 1);
        },
        // 上传图片
        toBase64(e) {
            var _this = this;
            if (_this.imgArr.length == 3) {
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
                _this.$axios
                    .post('index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: imgcode,
                    })
                    .then(function(response) {
                        let _item = {
                            fileurl: response.data.content.url,
                        };
                        _this.imgArr.push(_item);
                        console.log(_this.imgArr);
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
            };
            this[MutationTypes.SET_SELECT_CLASS](_item);
        },
        //修改年限
        choiceYear() {
            // 还要算上类别费
            this.all_price = this.year * this.price;
        },
        //修改资质类型
        choiceQuali() {},
        //修改主体信息
        // choiceCorpname() {
        //     let _this = this;
        //     for (let i = 0; i < _this.length; i++) {
        //         //判断选中第几条主体信息，更改data内容
        //         if (_this.corpname == _this.some[i].corpname) {
        //             _this.data = _this.some[i];
        //         }
        //     }
        // },
        // 阅读申请条款
        readRule: function() {
            this.isRead = !this.isRead;
        },
        // 申请主体
        viewApplyInfo: function() {
            const that = this;
        },
        // 加入清单
        addShopCart: function() {
            const that = this;
            if (that.salesCode === '') {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return false;
            }
            Indicator.open({
                text: '检测品牌顾问工号...',
                spinnerType: 'fading-circle',
            });
            // 检测工号
            that.$axios
                .post('index.php?c=App&a=checkSalesCode', {
                    sales_code: that.salesCode,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        setTimeout(function() {
                            Indicator.close();
                            // 设置临时加入数据
                            let temptData = {
                                productid: that.ids,
                                product_name: that.product_name,
                                keyword: that.text,
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
                                    id: that.data.corpid,
                                    name: that.data.corpname,
                                    linkman: that.data.linkman,
                                    phone: that.data.phone,
                                    email: that.data.email,
                                    address: that.data.address,
                                },
                            };
                            that.$axios
                                .post('/index.php?c=App&a=setWishlist', {
                                    data: JSON.stringify(temptData),
                                    sales_code: that.salesCode,
                                })
                                .then(function(response) {
                                    let _data = response.data;
                                    if (_data.errcode === 0) {
                                        Toast({
                                            message: _data.errmsg,
                                            duration: 1500,
                                        });
                                        setTimeout(function() {
                                            that.$router.replace({
                                                path: '/shoppingCart',
                                            });
                                            let _item = {
                                                isShow: false,
                                                content: [],
                                                classType: {},
                                                allPrice: 0,
                                            };
                                            that[MutationTypes.SET_SELECT_CLASS](_item);
                                        }, 1500);
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
                        setTimeout(function() {
                            Indicator.close();
                            Toast({
                                message: _data.errmsg,
                                duration: 1500,
                            });
                        }, 2000);

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
            .detail-right {
            }
        }
    }
}
</style>
