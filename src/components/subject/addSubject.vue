<template>
    <div class="add-subject">
        <!-- <nav-header></nav-header> -->
        <mt-header title="" class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="add-subject-main">
            <h1 class="add-subject-main-title">申请人信息</h1>
            <div class="add-subject-main-list">
                <label>类型：</label>
                <!-- <input type="text" readonly="readonly" v-model="options[corptype].name" v-else /> -->
                <p v-if="status === '1' || status === '2' || detailStatus != ''">{{ options[corptype] ? options[corptype].name : '' }}</p>
                <select v-model="corptype" @change="switchType()" class="select-box" v-else>
                    <option v-for="option in options" v-bind:value="option.key" :key="option.key">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>申请人</label>
                <input
                    type="text"
                    v-model="name"
                    :readonly="status === '1' || status === '2' || detailStatus != '' ? 'readonly' : false"
                    placeholder="请输入申请人名称"
                />
            </div>
            <!-- <div class="add-subject-main-list">
				<label>证件号码</label>
				<input type="text" v-model="card_no" :readonly="status === '1' ? 'readonly' : false" placeholder="请输入证件号码" />
			</div> -->
            <div class="add-subject-main-list">
                <label>联系人</label>
                <input
                    type="text"
                    v-model="linkman"
                    :readonly="status === '1' || status === '2' || detailStatus != '' ? 'readonly' : false"
                    placeholder="请输入联系人"
                />
            </div>
            <div class="add-subject-main-list">
                <label>联系电话</label>
                <input type="text" v-model="phone" :readonly="detailStatus != '' ? 'readonly' : false" placeholder="请输入联系电话" />
            </div>
            <!-- <div class="add-subject-main-list">
                <label>联系手机</label>
                <input
                    type="number"
                    v-model.number="mobile"
                    :readonly="detailStatus != '' ? 'readonly' : false"
                    placeholder="请输入联系手机"
                />
            </div> -->
            <div class="add-subject-main-list">
                <label>邮箱</label>
                <input
                    type="text"
                    v-model="email"
                    :readonly="verify_email == '1' || detailStatus != '' ? 'readonly' : false"
                    placeholder="请输入邮箱"
                />
            </div>
            <div class="add-subject-main-list">
                <label>联系地址</label>
                <div class="mcc" @click.stop="selectBtn" :class="{ active: detailStatus == '' }">
                    <p v-if="province || city || area">{{ province }} {{ city }} {{ area }}</p>
                    <p v-else>请选择省/市/区</p>
                </div>
            </div>
            <div class="add-subject-main-list">
                <label>详细地址</label>
                <input type="text" v-model="address" :readonly="detailStatus != '' ? 'readonly' : false" placeholder="请输入详细地址" />
            </div>
            <!-- <div class="upload">
				<p class="upload-title" v-show="parseInt(corptype) === 0">上传身份证</p>
				<p class="upload-title" v-show="parseInt(corptype) === 1">
					上传营业执照
				</p>
				<p class="upload-title" v-show="parseInt(corptype) === 2">
					上传组织机构代码证
				</p>
				<p class="upload-title" v-show="parseInt(corptype) === 3">
					上传营业执照
				</p>
				<div class="upload-main">
					<div class="upload-item" v-for="(value, index) in attachments" v-show="
              (parseInt(corptype) !== 0 && index < 1) ||
                parseInt(corptype) === 0
            "
					 :key="value + index" v-bind:style="{
              backgroundImage: value
                ? 'url(' + configs.api.public_domain + value
                : '' + ')'
            }">
						<i class="cover" v-show="!value"></i>
						<span class="close" @click="closeBtn(index)" v-show="value"></span>
						<p class="text" v-show="!value && parseInt(corptype) === 0 && index === 0">
							上传正面
						</p>
						<p class="text" v-show="!value && parseInt(corptype) === 0 && index === 1">
							上传反面
						</p>
						<p class="text" v-show="!value && parseInt(corptype) !== 0 && index === 0">
							上传
						</p>
						<input type="file" :disabled="status === '1' ? 'disabled' : false" @change="toBase64($event, index)" class="upload-img" />
					</div>
				</div>
			</div> -->
            <button class="submit" @click="submitBtn" v-if="detailStatus == ''">提交</button>
        </div>
        <div class="add-subject-bottom" v-if="isShow" @touchmove.prevent>
            <div class="add-subject-bottom-box" v-clickoutside="hideBox">
                <div class="menu">
                    <button class="cancle" @click="switchCity(0)">取消</button>
                    <span>选择省市区</span>
                    <button class="sure-btn" @click="switchCity(1)">确认</button>
                </div>
                <mt-picker :slots="slots" value-key="name" @change="onValuesChange" :class="{ iscity: isShowCity }"></mt-picker>
            </div>
        </div>
    </div>
</template>
<script>
import * as utils from '@/utils/index';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            options: [],
            temptData: [],
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    defaultIndex: 0,
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot2',
                    defaultIndex: 0,
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    defaultIndex: 0,
                },
            ],
            mp: '',
            mc: '',
            isShow: false,
            // 主体类型
            corptype: '1',
            // 主体名称
            name: '',
            // 证件号码
            card_no: '',
            // 联系人
            linkman: '',
            // 手机
            // mobile: '',
            // 联系电话
            phone: '',
            //邮箱
            email: '',
            // 省
            province: '',
            // 市
            city: '',
            // 区
            area: '',
            //详细地址
            address: '',
            // 上传图片
            attachments: ['', ''],
            // 暂存主体id
            temptId: this.$route.query.id ? this.$route.query.id : '',
            // 主体状态
            status: '0',
            // 省市区临时存储变化
            temptValue: [],
            // 是否为详情页过来
            detailStatus: this.$route.query.status ? this.$route.query.status : '',
            // 是否显示城市选择
            isShowCity: false,
            // 邮箱是否已验证
            verify_email: this.$route.query.verify_email ? this.$route.query.verify_email : '0',
        };
    },
    mounted() {
        let _this = this;
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', _this.goback, false);
        }
    },
    destroyed() {
        let _this = this;
        window.removeEventListener('popstate', _this.goback, false);
    },
    methods: {
        goback() {
            var that = this;
            if (sessionStorage.formUrlOne && !that.$route.query.isFrom) {
                let formUrlOne = sessionStorage.formUrlOne;
                that.$router.push({
                    path: formUrlOne,
                });
            } else if (that.detailStatus != '') {
                that.$router.go(-1);
            } else {
                that.$router.push({
                    path: '/subjectList',
                });
            }
        },
        // 监听类型变化
        switchType: function() {
            switch (parseInt(this.corptype)) {
                case 0:
                    this.attachments = ['', ''];
                    break;
                case 1:
                    this.attachments = [''];
                    break;
                case 2:
                    this.attachments = [''];
                    break;
                case 3:
                    this.attachments = [''];
                    break;
                default:
            }
        },
        // 显示
        selectBtn: function() {
            const that = this;
            if (that.detailStatus !== '') {
                return false;
            }
            that.isShow = true;
            // 设置默认选中
            that.$nextTick(function() {
                // 设置省
                that.slots[0].values = that.temptData;
                //  遍历省
                that.temptData.map(function(item, index) {
                    if (that.province === item.name) {
                        that.slots[0].defaultIndex = index;
                        that.slots[1].values = item.city;
                        // 遍历市
                        item.city.map(function(item1, index1) {
                            if (that.city === item1.name) {
                                that.slots[1].defaultIndex = index1;
                                that.slots[2].values = item1.districtAndCounty;
                                // 遍历区
                                item1.districtAndCounty.map(function(item2, index2) {
                                    if (that.area === item2) {
                                        that.slots[2].defaultIndex = index2;
                                    }
                                });
                            }
                        });
                    }
                });
            });
        },
        // 隐藏
        hideBox: function() {
            this.isShow = false;
        },
        // 选择省市区
        switchCity: function(type) {
            let that = this;
            that.isShow = false;
            // 确认
            if (type === 1) {
                that.province = that.temptValue[0].name;
                that.city = that.temptValue[1].name;
                if (that.isShowCity) {
                    that.city = '';
                }
                that.area = that.temptValue[2];
            }
        },
        onValuesChange(picker, values) {
            const that = this;
            if (that.temptData && that.temptData.length > 0) {
                //   如果省改变
                if (that.mp != values[0]) {
                    let temptProvince = [];
                    that.temptData.map(function(item) {
                        if (values[0].name === item.name) {
                            item.city.map(function(c) {
                                temptProvince.push(c);
                            });
                            that.isShowCity = false;
                            if (temptProvince.length <= 1) {
                                that.isShowCity = true;
                            }
                            picker.setSlotValues(1, temptProvince);
                            that.mp = values[0].name;
                            that.mc = values[1].name;
                        }
                    });
                }
                // 当市出现变化的时候
                if (that.mc != values[1]) {
                    that.temptData.map(function(item) {
                        if (values[0].name === item.name) {
                            item.city.map(function(c) {
                                if (values[1].name === c.name) {
                                    picker.setSlotValues(2, c.districtAndCounty);
                                }
                            });
                        }
                    });
                }
            }
            that.temptValue = values;
        },
        // 清除
        closeBtn: function(index) {
            this.attachments[index] = '';
            // 数据结果太深，强制渲染
            this.$forceUpdate();
        },
        // 上传图片
        toBase64(e, index) {
            var that = this;
            let files = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                let imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                that.$axios
                    .post('/index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: imgcode,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            that.attachments[index] = _data.content.url;
                            // 数据结果太深，强制渲染
                            that.$forceUpdate();
                        }
                    });
            };
        },
        // 获取省市区
        getProvinceCity: function() {
            const that = this;
            that.$axios.post('/index.php?c=App&a=getProvinceCity', {}).then(function(response) {
                let _data = response.data;
                if (_data.errcode === 0) {
                    that.temptData = _data.content;
                    that.slots[0].values = that.temptData;
                    that.slots[1].values = that.temptData[0].city;
                    that.slots[2].values = that.temptData[0].city[0].districtAndCounty;
                }
            });
        },
        //获取申请人信息
        init() {
            this.$axios.get('/index.php?c=App&a=getCorporationType').then(res => {
                if (res.data.errcode == 0) {
                    this.options = res.data.content;
                    this.corptype = this.options[0].key;
                } else {
                    Toast({
                        message: res.data.errmsg,
                        duration: 1500,
                    });
                }
            });
        },
        // 提交
        submitBtn: function() {
            const that = this;
            let textTips = '';
            // 验证手机号
            // let regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
            let regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!that.name) {
                textTips = '请输入申请人';
            } else if (!that.linkman) {
                textTips = '请输入联系人';
            } else if (!that.phone) {
                textTips = '请输入联系电话或手机号';
            } else if (!utils.isPhone(this.phone)) {
                return false;
            }
            // else if (!that.mobile) {
            //     textTips = '请输入联系手机';
            // }
            // else if (!regMobile.test(that.mobile)) {
            //     textTips = '请输入正确的手机号';
            //     that.mobile = '';
            // }
            else if (!that.email) {
                textTips = '请输入邮箱';
            } else if (!regEmail.test(that.email)) {
                textTips = '请输入正确邮箱！';
                that.email = '';
            } else if (!that.province) {
                textTips = '请选择省/市/区';
            } else if (!that.address) {
                textTips = '请输入详细地址';
            }
            if (textTips) {
                Toast({
                    message: textTips,
                    duration: 1500,
                });
                return false;
            }
            let _item = {
                // 主体类型
                corptype: that.corptype,
                // 主体名称
                name: that.name,
                // 证件号码
                //card_no: that.card_no,
                // 联系人
                linkman: that.linkman,
                // 手机
                // mobile: that.mobile,
                // 联系电话
                phone: that.phone,
                //邮箱
                email: that.email,
                // 省
                province: that.province,
                // 市
                city: that.city,
                // 区
                area: that.area,
                //详细地址
                address: that.address,
                // 文件名
                //attachments: that.attachments,
            };
            let temptLink = '/index.php?c=App&a=setCorpSubject';
            //判断是编辑还是新增
            if (that.temptId) {
                _item.id = that.temptId;
                temptLink = '/index.php?c=App&a=setSubjectInfo';
            }
            that.$axios.post(temptLink, _item).then(function(response) {
                let _data = response.data;
                if (_data.errcode === 0) {
                    if (sessionStorage.formUrl && !that.$route.query.isFrom) {
                        let formUrl = sessionStorage.formUrl;
                        that.$router.push({
                            path: formUrl,
                        });
                        // sessionStorage.removeItem('formUrl');
                        sessionStorage.removeItem('formUrlOne');
                    } else {
                        that.$router.push({
                            path: '/subjectList',
                        });
                    }
                }
            });
        },
        // 当未编辑时，获取主体详情
        getSubjectInfo: function(id) {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getSubjectInfo', {
                    id: id,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        // 主体类型
                        that.corptype = _data.content.corptype;
                        // 主体名称
                        that.name = _data.content.name;
                        // 证件号码
                        //that.card_no = _data.content.card_no;
                        // 联系人
                        that.linkman = _data.content.linkman;
                        // 手机
                        // that.mobile = _data.content.mobile;
                        // 联系电话
                        that.phone = _data.content.phone;
                        //邮箱
                        that.email = _data.content.email;
                        // 省
                        that.province = _data.content.province;
                        // 市
                        that.city = _data.content.city;
                        // 区
                        that.area = _data.content.area;
                        //详细地址
                        that.address = _data.content.address;
                        // 文件名
                        //that.attachments = _data.content.attachments;
                        // 主体状态
                        that.status = _data.content.status;
                    }
                });
        },
    },
    created() {
        this.init(); //获取申请人信息
        this.getProvinceCity();
        if (this.temptId) {
            this.getSubjectInfo(this.temptId);
        }
        // console.log(this.detailStatus)
    },
};
</script>
