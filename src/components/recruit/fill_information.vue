<template>
    <div class="fill_information" :class="{ fill_bot1: pageNum === 2 }">
        <mt-header class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="con_box containerView-main apply-materials" v-if="showSome">
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
                    <div class="list_item">
                        <span>资质类型</span>
                        <select v-model="selected">
                            <option value="0">请选择资质类型</option>
                            <option :value="item.key" v-for="item in qualifications" :key="item.key">{{ item.name }}</option>
                        </select>
                        <span class="icons-down"></span>
                    </div>
                </div>
                <div class="feekbook-upload">
                    <p class="apply-materials-little-title" v-if="qualifications[selected] && selected == 0">
                        请上传{{ qualifications[selected].name }}
                    </p>
                    <p class="apply-materials-little-title" v-if="qualifications[selected - 1]">
                        请上传{{ qualifications[selected - 1].name }}
                    </p>

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
                <div class="cost-detail">
                    <span class="cost-detail-left">注册费</span>
                    <span class="cost-detail-right" v-if="price > 0"> {{ price * year }} 元</span>
                </div>
            </div>
            <div class="list_box" v-if="pageNum == 1">
                <div>
                    <div class="list_item">
                        <span>申请人名称</span>
                        <p class="list-item-right" @click="viewApplyInfo">
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
                    <div class="msg-list">
                        <i>资质类型</i>
                        <span>{{ qualifications[selected - 1].name }}</span>
                    </div>
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
                        <i>企业名称</i>
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
                        <div class="msg-list">
                            <i>联系电话</i>
                            <span>
                                {{ applicant.phone }}
                            </span>
                        </div>
                        <div v-if="applicant.email" class="msg-list  msg-list-rg">
                            <i>电子邮箱</i>
                            <span>
                                {{ applicant.email }}
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
                    <p>我已阅读<a href="javascript:void(0);" @click="viewPrivacy('申请人须知', '4')">《申请人须知》</a>条款</p>
                </div>
            </div>
        </div>
        <!-- 品牌顾问工号 -->
        <div class="brand-consultant" v-show="pageNum === 2">
            <div class="brand-consultant-top">
                <label>品牌顾问工号</label>
                <input type="text" v-model="sales_code" placeholder="请输入品牌顾问工号" />
            </div>
            <p class="brand-consultant-text">品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：400-628-1118</p>
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
                    <button class="btn-add" @click="addCard('add')" v-show="!isChange">加入申请列表</button>
                    <button class="btn-apply" @click="addCard('play')">去结算</button>
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
            //无申请人信息页面整体不显示
            showSome: true,
            // 注册名
            keyword: JSON.parse(sessionStorage.getItem('dzpSearch')) ? JSON.parse(sessionStorage.getItem('dzpSearch')).keyword : '',
            // 注册年限
            year: '1',
            // 产品注册费
            price: JSON.parse(sessionStorage.getItem('dzpSearch')) ? JSON.parse(sessionStorage.getItem('dzpSearch')).price : '',
            // 产品名称
            product_name: JSON.parse(sessionStorage.getItem('dzpSearch'))
                ? JSON.parse(sessionStorage.getItem('dzpSearch')).product_name
                : '',
            // 产品id
            productid: JSON.parse(sessionStorage.getItem('dzpSearch')) ? JSON.parse(sessionStorage.getItem('dzpSearch')).id : '',
            // 资质类型
            qualifications: [],
            // 选择资质类型id
            selected: 0,
            // 当前页码
            pageNum: 0,
            //上传的资质类型附件
            imgArr: [],
            // 申请人信息
            applicant: {},
            // 是否阅读申请人须知
            isRead: false,
            // 品牌销售顾问号
            sales_code: '',
            // 是否为换词
            isChange: sessionStorage.changeId ? true : false,
        };
    },
    watch: {
        pageNum: async function() {
            const that = this;
            if (that.pageNum == 2) {
                if (that.applicant.corpid || that.applicant.id) {
                    that.sales_code = await utils.getSalesCode(that.applicant.corpid || that.applicant.id);
                }
            }
        },
    },
    computed: {
        //修改年限
        all_price: function() {
            let allMoney = 0;
            allMoney = (this.year * this.price).toFixed(2);
            return allMoney;
        },
    },
    created() {
        const that = this;
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('dzp')) {
            let temptDzp = JSON.parse(sessionStorage.getItem('dzp'));
            that.keyword = temptDzp.keyword;
            that.year = temptDzp.year;
            that.price = temptDzp.price;
            that.product_name = temptDzp.product_name;
            that.productid = temptDzp.productid;
            that.selected = temptDzp.selected;
            that.qualifications = temptDzp.qualifications;
            that.imgArr = temptDzp.imgArr;
            that.pageNum = temptDzp.pageNum;
            that.applicant = temptDzp.applicant;
            that.isRead = temptDzp.isRead;
            that.sales_code = temptDzp.sales_code;
            // 判断是否有申请人信息
            if (!temptDzp.applicant || Object.keys(temptDzp.applicant).length <= 0) {
                if (sessionStorage.formUrlOne) {
                    that.pageNum = 0;
                } else {
                    that.pageNum = 1;
                    that.getApplicant();
                }
            }
        }
        //判断是否是从申请列表过来
        else if (sessionStorage.proEditId && sessionStorage.mark == 'dzp') {
            let id = sessionStorage.proEditId;
            //获取申请信息
            that.$axios
                .post('/index.php?c=App&a=getWishlistItem', {
                    id: id,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        let wishListItem = res.data.content;
                        that.sales_code = wishListItem.sales_code;
                        that.year = wishListItem.year;
                        that.selected = wishListItem.params_type;
                        that.keyword = wishListItem.keyword;
                        that.price = wishListItem.price;
                        that.product_name = wishListItem.product_name;
                        that.productid = wishListItem.productid;
                        that.imgArr = wishListItem.material;
                        that.applicant = wishListItem.subject;
                        // 设置阅读申请人须知已读
                        that.isRead = true;
                        // 清除proEditId
                        sessionStorage.removeItem('proEditId');
                        // 存储编辑id
                        sessionStorage.EditId = id;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                        //获取信息失败，返回搜索页
                        setTimeout(() => {
                            that.$router.push({
                                path: '/restaurant',
                            });
                        }, 2000);
                    }
                });
        }
        that.intell(); //请求资质数据
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
    methods: {
        // 暂存数据，公共方法
        temptStorage: function() {
            const that = this;
            let _item = {
                keyword: that.keyword,
                year: that.year,
                price: that.price,
                product_name: that.product_name,
                productid: that.productid,
                qualifications: that.qualifications,
                selected: that.selected,
                imgArr: that.imgArr,
                pageNum: that.pageNum,
                applicant: that.applicant,
                isRead: that.isRead,
                sales_code: that.sales_code,
            };
            sessionStorage.setItem('dzp', JSON.stringify(_item));
        },

        // 清空暂存缓存信息
        clearTemptData: function() {
            sessionStorage.removeItem('dzp');
            sessionStorage.removeItem('formUrl');
            sessionStorage.removeItem('ids');
            sessionStorage.removeItem('names');
            sessionStorage.removeItem('EditId');
            sessionStorage.removeItem('formUrlOne');
        },
        // 点击返回
        goback() {
            const that = this;
            let num = that.pageNum;
            if (num == 0) {
                if (sessionStorage.EditId) {
                    this.$router.push({
                        path: 'shoppingCart',
                    });
                } else {
                    this.$router.push({
                        path: '/recruit',
                        query: {
                            mark: 'dzp',
                            keyword: sessionStorage.getItem('dzpKeyWord'),
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
        // 获取申请人信息
        getApplicant: function() {
            let that = this;
            that.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.applicant = _data.content;
                    that.showSome = true;
                } else if (parseInt(_data.errcode) === 20001) {
                    that.addApplyInfo();
                } else {
                    Toast({
                        message: _data.errmsg,
                        duration: 3000,
                    });
                }
            });
        },
        // 下一步
        next(num) {
            var that = this;
            if (num == 0) {
                if (that.selected == 0) {
                    Toast({
                        message: '请选择资质类型',
                        duration: 3000,
                    });
                    return false;
                }
                if (that.imgArr.length <= 0) {
                    Toast({
                        message: '请上传资质证明',
                        duration: 3000,
                    });
                    return false;
                }
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getApplicant();
                }
                sessionStorage.formUrlOne = this.$route.path;
                that.pageNum = 1;
            } else if (num == 1) {
                if (Object.keys(that.applicant).length <= 0) {
                    that.getApplicant();
                    return false;
                }
                that.pageNum = 2;
            }
        },
        // 切换上下页
        switchPage: function(num) {
            const that = this;
            if (num !== 0 && that.imgArr.length <= 0) {
                Toast({
                    message: '请上传资质证明',
                    duration: 3000,
                });
                return false;
            }
            if (num === 1) {
                if (Object.keys(that.applicant).length <= 0) {
                    that.showSome = false;
                    that.getApplicant();
                }
            }
            this.pageNum = num;
        },
        //请求资质数据
        intell() {
            let that = this;
            that.$axios.post('index.php?c=App&a=getDzpType').then(function(response) {
                if (response.data.errcode == 0) {
                    that.qualifications = response.data.content;
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
        // 选中新增主体
        viewApplyInfo: function() {
            // 跳转路由
            this.$router.push({
                path: '/subjectList',
            });
            sessionStorage.formUrl = '/dzpinfor';
        },
        // 添加主体
        addApplyInfo: function() {
            this.$router.push({
                path: '/addSubject',
            });
            sessionStorage.formUrl = '/dzpinfor';
        },
        // 阅读申请条款
        readRule: function() {
            this.isRead = !this.isRead;
        },
        //前往申请人须知页面
        viewPrivacy(type, num) {
            this.isRead = true;
            this.$router.push({
                path: '/aboutPro',
                query: {
                    til: type,
                    mark: 'dzp',
                    txt_type: num,
                },
            });
        },
        //加入清单
        addCard(typeName) {
            let that = this;
            if (!that.isRead) {
                Toast({
                    message: '请阅读《申请人须知》条款',
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
            that.$axios
                .post('index.php?c=App&a=checkSalesCode', {
                    sales_code: that.sales_code,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        let addApplyList = {
                            productid: that.productid, //产品id
                            product_name: that.product_name, //产品名称
                            keyword: that.keyword, //申请词
                            year: that.year, //年限
                            feetype: 'Z', //服务类型
                            params_type: that.selected, //资质类型
                            material_type: that.selected, //材料类型
                            price: that.price, //单价
                            total: that.all_price, //总价
                            material: that.imgArr,
                            subject: {
                                id: that.applicant.corpid || that.applicant.id, //主体id
                                name: that.applicant.corpname || that.applicant.name, //名字
                                linkman: that.applicant.linkman, //联系人
                                phone: that.applicant.phone ? that.applicant.phone : that.applicant.mobile, //联系电话
                                email: that.applicant.email, //邮箱
                                address: that.applicant.address, //地址
                                province: that.applicant.province, //省
                                city: that.applicant.city, //市
                                area: that.applicant.area, //区
                            },
                        };
                        let id = sessionStorage.EditId ? sessionStorage.EditId : 0;
                        Indicator.open({
                            text: '正在提交..',
                            spinnerType: 'fading-circle',
                        });
                        setTimeout(function() {
                            //提交数据
                            that.$axios
                                .post('index.php?c=App&a=setWishlist', {
                                    data: JSON.stringify(addApplyList),
                                    sales_code: that.sales_code,
                                    id: id,
                                })
                                .then(function(response) {
                                    setTimeout(function() {
                                        Indicator.close();
                                    }, 10);
                                    if (response.data.errcode == 0) {
                                        if (typeName === 'add') {
                                            Toast({
                                                message: response.data.errmsg,
                                                duration: 1000,
                                            });
                                            setTimeout(function() {
                                                //请求成功跳转清单列表页
                                                that.$router.push({
                                                    path: '/addSuccess',
                                                });
                                                // 清除缓存数据
                                                that.clearTemptData();
                                                // 暂存推荐
                                                sessionStorage.product = JSON.stringify(response.data.content.product);
                                                sessionStorage.mark = 'dzp';
                                                //清除搜索缓存
                                                sessionStorage.removeItem('dzpSearch');
                                            }, 1000);
                                        } else if (typeName === 'play') {
                                            // 清除缓存数据
                                            that.clearTemptData();
                                            //清除搜索缓存
                                            sessionStorage.removeItem('dzpSearch');
                                            // 跳转结算页
                                            sessionStorage.ids = response.data.content.id;
                                            that.$router.replace({
                                                path: '/account',
                                            });
                                        }
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
                            message: response.data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
    },
};
</script>
