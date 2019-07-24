<template>
    <div class="fill_information" :class="{ fill_bot1: pageNum === 2 }">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="con_box containerView-main apply-materials">
            <div class="til-word" v-show="pageNum === 0 || pageNum === 1">
                <div class="title" @click="switchPage(0)" :class="{ active: pageNum == 0 }">
                    申请信息
                </div>
                <div class="title" @click="switchPage(1)" :class="{ active: pageNum == 1 }">
                    申请人信息
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 0">
                <div class="list_box">
                    <div class="list_item">
                        <span>注册词</span>
                        <input type="text" readonly="readonly" v-model="text" />
                    </div>
                    <div class="list_item">
                        <span>年限</span>
                        <select v-model="year" @change="choiceYear()">
                            <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }}</option>
                        </select>
                        <span class="icon_r"></span>
                    </div>
                    <div class="list_item">
                        <span>资质类型</span>
                        <select v-model="qualifications_txt" @change="choiceQuali()">
                            <option :value="qualification.name" v-for="qualification in qualifications" :key="qualification.key">{{
                                qualification.name
                            }}</option>
                        </select>
                        <span class="icon_r"></span>
                    </div>
                </div>
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
                <div class="cost-detail">
                    <span class="cost-detail-left">注册费</span>
                    <span class="cost-detail-right" v-if="price > 0"> {{ price * year }} 元</span>
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 1">
                <div class="list_item">
                    <span>企业名称</span>
                    <p>{{ data.corpname }}</p>
                    <span class="icon_r"></span>
                </div>
                <div class="list_item">
                    <span>联系人</span>
                    <p>{{ data.linkman }}</p>
                </div>
                <div class="list_item">
                    <span>联系电话</span>
                    <p>{{ data.phone || data.mobile }}</p>
                </div>
                <div class="list_item">
                    <span>联系邮箱</span>
                    <p>{{ data.email }}</p>
                </div>
                <div class="list_item">
                    <span>联系地址</span>
                    <p>{{ data.province }} {{ data.city }} {{ data.area }}</p>
                </div>
                <div class="list_item">
                    <span>详细地址</span>
                    <p>{{ data.address }}</p>
                </div>
            </div>
            <div class="apply-word" v-if="pageNum == 2">
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
                    <div class="msg-list">
                        <i>资质类型</i>
                        <span>持商标注册证</span>
                    </div>
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
                        <i>企业名称</i>
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
                <!-- 注册费 -->
                <div class="cost-detail">
                    <span class="cost-detail-left">注册费</span>
                    <span class="cost-detail-right" v-if="price > 0"> {{ price * year }} 元</span>
                </div>
                <div class="apply-rule">
                    <i :class="{ read: isRead }" @click="readRule"></i>
                    <p @click="readRule">我已阅读<a href="javascript:void(0);">《申请人须知》</a>条款</p>
                </div>
            </div>
        </div>
        <!-- 品牌顾问工号 -->
        <div class="brand-consultant" v-show="pageNum === 2">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号" />
            </div>
            <p class="brand-consultant-text">品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：400-628-111</p>
        </div>
        <div class="fill_bottom">
            <div class="bottom_l">
                <p>总计 :</p>
                <p class="all_price">￥{{ all_price }}元</p>
            </div>
            <div class="bottom_r">
                <div class="addCard" @click="next(pageNum)" v-show="pageNum === 0">下一步</div>
                <div class="addCard" @click="next(pageNum)" v-show="pageNum === 1">预览</div>
                <div class="addCard-btn" v-show="pageNum == 2">
                    <button class="btn-add" @click="addCard">加入申请列表</button>
                    <button class="btn-apply">去付款</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
export default {
    name: 'fill_information',
    data() {
        return {
            text: this.$store.state.showDzp.keyword, //搜索过来的名字
            year: 1, //年限
            qualifications: [], //资质类型
            qualifications_txt: '', //选中资质类型
            qualifications_key: '', //选中资质key
            price: this.$store.state.showDzp.price, //单价费用
            token: '',
            data: {}, //默认第一条主体数据
            some: [], //所有主体数据
            corpname: '', //主题名字
            length: '',
            all_price: this.$store.state.showDzp.price, //总计费用
            product_name: this.$store.state.showDzp.product_name, //产品名称
            productid: this.$store.state.showDzp.id, //产品id
            message: {}, //加入清单提交内容
            pageNum: 0,
            imgArr: [],
            typeText: '请上传商标证书', //材料类型提示
            isRead: false,
            salesCode: '',
            isShowDzp: this.$store.state.showDzp.isShow,
        };
    },
    created() {
        this.init(); //请求主题数据
        this.intell(); //请求资质数据
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_SHOW_DZP]]),
        ...mapMutations({
            [MutationTypes.SET_SHOW_DZP]: MutationTypes.SET_SHOW_DZP,
        }),
        // 点击返回
        goback() {
            const that = this;
            let num = that.pageNum;
            if (num == 0) {
                let _item = {
                    isShow: false,
                    id: '',
                    keyword: '',
                    price: '',
                    product_name: '',
                };
                that[MutationTypes.SET_SHOW_DZP](_item);
            } else if (num == 1) {
                that.pageNum = 0;
            } else if (num == 2) {
                that.pageNum = 1;
            } else if (num == 3) {
                that.pageNum = 2;
            }
            history.pushState(null, null, document.URL);
        },
        // 初始化
        init() {
            if (sessionStorage.token) {
                this.token = sessionStorage.token;
            }
            let _this = this;
            _this.$axios.post('index.php?c=App&a=getRegisterSubject').then(function(response) {
                if (response.data.errcode == 0) {
                    _this.some = response.data.content;
                    _this.length = _this.some.length; //总共有多少条主题信息
                    _this.data = _this.some[0]; //默认赋值第一条
                    _this.corpname = _this.some[0].corpname; //默认赋值第一个主体信息
                } else {
                    Toast({
                        message: response.data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
        //修改年限
        choiceYear() {
            this.all_price = (this.year * this.price).toFixed(2);
        },
        //修改资质类型
        choiceQuali() {
            if (this.qualifications) {
                for (let i = 0; i < this.qualifications.length; i++) {
                    if (this.qualifications_txt == this.qualifications[i].name) {
                        this.qualifications_key = this.qualifications[i].key;
                    }
                }
            }
        },
        //修改主体信息
        choiceCorpname() {
            let _this = this;
            for (let i = 0; i < _this.length; i++) {
                //判断选中第几条主体信息，更改data内容
                if (_this.corpname == _this.some[i].corpname) {
                    _this.data = _this.some[i];
                }
            }
        },
        // 下一步
        next(num) {
            var _this = this;
            if (num == 0) {
                _this.pageNum = 1;
            } else if (num == 1) {
                _this.pageNum = 2;
            } else if (num == 2) {
                _this.pageNum = 3;
            }
        },
        // 切换上下页
        switchPage: function(num) {
            this.pageNum = num;
        },
        //请求资质数据
        intell() {
            let _this = this;
            _this.$axios.post('index.php?c=App&a=getDzpType').then(function(response) {
                if (response.data.errcode == 0) {
                    _this.qualifications = response.data.content;
                    _this.qualifications_txt = _this.qualifications[0].name; //默认选中第一个
                    _this.qualifications_key = _this.qualifications[0].key;
                } else {
                    Toast({
                        message: response.data.errmsg,
                        duration: 3000,
                    });
                }
            });
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
                    });
            };
        },
        // 阅读申请条款
        readRule: function() {
            this.isRead = !this.isRead;
        },
        //加入清单
        addCard() {
            let _this = this;
            if (_this.salesCode === '') {
                Toast({
                    message: '请输入品牌顾问工号',
                    duration: 1500,
                });
                return false;
            }
            _this.$axios
                .post('index.php?c=App&a=checkSalesCode', {
                    sales_code: _this.salesCode,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        if (_this.token) {
                            setTimeout(function() {
                                Indicator.open({
                                    text: '正在提交',
                                    spinnerType: 'fading-circle',
                                });
                            }, 10);

                            _this.message = {
                                productid: _this.productid, //产品id
                                product_name: _this.product_name, //产品名称
                                keyword: _this.text, //申请词
                                year: _this.year, //年限
                                feetype: 'Z', //服务类型
                                params_type: _this.qualifications_key, //资质类型
                                price: _this.price, //单价
                                total: _this.all_price, //总价
                                material: _this.imgArr,
                                subject: {
                                    id: _this.data.corpid, //主体id
                                    name: _this.data.corpname, //名字
                                    linkman: _this.data.linkman, //联系人
                                    phone: _this.data.phone ? _this.data.phone : _this.data.mobile, //联系电话
                                    email: _this.data.email, //邮箱
                                    address: _this.data.address, //地址
                                },
                            };

                            //提交数据
                            _this.$axios
                                .post('index.php?c=App&a=setWishlist', {
                                    data: JSON.stringify(_this.message),
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
                                        setTimeout(function() {
                                            //请求成功跳转清单列表页
                                            _this.$router.push({
                                                path: '/shoppingCart',
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
                        }
                    }
                });
        },
    },
};
</script>
