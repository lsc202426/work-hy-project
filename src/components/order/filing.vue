<template>
    <div class="filing">
        <nav-header title="备案"></nav-header>
        <div class="add-subject-main">
            <h1 class="add-subject-main-title">{{ title }}</h1>
            <div class="add-subject-main-list">
                <label>单位名称</label>
                <input type="text" v-model.trim="corpname" placeholder="请填写单位名称" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>单位性质</label>
                <select
                    v-model.trim="corptype"
                    @change="switchNature()"
                    class="select-box"
                    :readonly="is_icp == 1"
                    :class="{ readOn: is_icp == 1 }"
                >
                    <option v-for="nature in natures" :value="nature.key" :key="nature.key">
                        {{ nature.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>单位证件类型</label>
                <select
                    v-model.trim="corp_cardtype"
                    @change="switchType()"
                    class="select-box"
                    :readonly="is_icp == 1"
                    :class="{ readOn: is_icp == 1 }"
                >
                    <option v-for="certificate in certificates" :value="certificate.key" :key="certificate.key">
                        {{ certificate.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>单位有效证件号码</label>
                <input type="text" v-model.trim="cardno" ref="checkIdCard" placeholder="请填写单位有效证件号码" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>单位有效证件住所</label>
                <input type="text" v-model.trim="address" placeholder="请填写单位有效证件住所" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>单位所在省市区</label>
                <!-- <input type="text" placeholder="请选择省/市/区" /> -->
                <p class="mcc mcc_over" @click.stop="selectBtn" v-if="(province || city || area) && detailStatus == ''">
                    {{ province }} {{ city }} {{ area }}
                </p>
                <p class="mcc" @click.stop="selectBtn" v-if="!province && detailStatus == ''">请选择省/市/区</p>

                <p
                    class="mcc mcc_over"
                    :class="{ readOn: is_icp == 1 }"
                    :readonly="detailStatus != '' ? 'readonly' : false"
                    v-if="(province || city || area) && detailStatus != ''"
                >
                    {{ province }} {{ city }} {{ area }}
                </p>
                <p class="mcc" :readonly="detailStatus != '' ? 'readonly' : false" v-if="!province && detailStatus != ''">
                    请选择省/市/区
                </p>
            </div>
            <div class="add-subject-main-list">
                <label>单位地址</label>
                <input type="text" v-model.trim="corp_address" placeholder="请填写单位地址" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>投资者</label>
                <input type="text" v-model.trim="investor" placeholder="请填写投资者名称" :readonly="is_icp == 1" />
            </div>
            <h1 class="add-subject-main-title basic">{{ basicData }}</h1>
            <div class="add-subject-main-list">
                <label>负责人姓名</label>
                <input type="text" v-model.trim="linkman" placeholder="请填写姓名" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>有效证件</label>
                <select
                    v-model.trim="linkman_cardtype"
                    @change="switchSubjType()"
                    class="select-box"
                    :readonly="is_icp == 1"
                    :class="{ readOn: is_icp == 1 }"
                >
                    <option v-for="subject in subjects" :value="subject.key" :key="subject.key">
                        {{ subject.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>有效证件号码</label>
                <input
                    type="text"
                    v-model.trim="linkman_cardno"
                    ref="checkCardno"
                    placeholder="请填写有效证件号码"
                    :readonly="is_icp == 1"
                />
            </div>
            <div class="add-subject-main-list">
                <label>手机号码</label>
                <input type="number" v-model.trim="mobile" placeholder="请填写手机号码" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>联系电话</label>
                <input type="text" v-model.trim="phone" placeholder="请填写联系电话" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>应急电话</label>
                <input type="number" v-model.trim="back_phone" placeholder="请填写应急电话" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>电子邮箱</label>
                <input type="email" v-model.trim="email" placeholder="请填写电子邮箱" :readonly="is_icp == 1" />
            </div>
            <div class="add-subject-main-list">
                <label>备注</label>
                <input
                    type="text"
                    v-model.trim="remarks"
                    :placeholder="is_icp != 1 ? '请填写备注（非必填）' : ''"
                    :readonly="is_icp == 1"
                />
            </div>
            <!-- <div class="add-subject-main-list">
                <label>申请人</label>
                <input
                    type="text"
                    v-model="name"
                    :readonly="status === '1' || status === '2' || detailStatus != '' ? 'readonly' : false"
                    placeholder="请输入申请人名称"
                />
            </div> -->
            <button class="submit" @click.prevent="submitBtn()" v-show="is_icp != 1">确定</button>
            <customer-service></customer-service>
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
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    name: 'filing',
    data() {
        return {
            title: 'ICP备案主体信息',
            basicData: '主体负责人基本情况',
            domain: this.$route.query.domain,
            corpname: '', //单位名称
            corptype: '1', //单位性质选中项
            natures: [
                {
                    key: '1',
                    name: '企业',
                },
                {
                    key: '2',
                    name: '个人',
                },
            ], //单位性质
            corp_cardtype: '1', //单位证件类型选中项
            certificates: [
                {
                    key: '1',
                    name: '营业执照',
                },
                {
                    key: '2',
                    name: '居民身份证',
                },
            ], //单位证件类型
            linkman_cardtype: '1', //有效证件选中项
            subjects: [
                {
                    key: '1',
                    name: '居民身份证',
                },
            ], //有效证件
            linkman_cardno: '', //有效证件号码
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
            cardno: '', //单位有效证件号码
            address: '', //单位有效住所
            province: '', // 省
            city: '', // 市
            area: '', // 区
            corp_address: '', //详细地址
            temptValue: [], // 省市区临时存储变化
            detailStatus: this.$route.query.status ? this.$route.query.status : '',
            isShowCity: false, //是否显示市
            isShow: false, //区域选择弹窗
            investor: '', //投资者
            linkman: '', //负责人姓名
            mobile: '', //手机号码
            phone: '', //联系电话
            back_phone: '', //应急电话
            email: '', //电子邮箱
            remarks: '', //备注
            is_icp: this.$route.query.is_icp, //是否已经备案过
            icpContent: {}, //备案信息内容
        };
    },
    created() {
        if (this.is_icp && this.is_icp == 1) {
            this.$axios
                .post('index.php?c=App&a=getIcp', {
                    domain: this.domain,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.icpContent = res.data.content;
                        this.corpname = this.icpContent.corpname;
                        this.corptype = this.icpContent.corptype;
                        this.corp_cardtype = this.icpContent.corp_cardtype;
                        this.cardno = this.icpContent.cardno;
                        this.address = this.icpContent.address;
                        this.province = this.icpContent.province;
                        this.city = this.icpContent.city;
                        this.area = this.icpContent.area;
                        this.detailStatus = 1;
                        this.corp_address = this.icpContent.corp_address;
                        this.investor = this.icpContent.investor;
                        this.linkman = this.icpContent.linkman;
                        this.linkman_cardtype = this.icpContent.linkman_cardtype;
                        this.linkman_cardno = this.icpContent.linkman_cardno;
                        this.mobile = this.icpContent.mobile;
                        this.phone = this.icpContent.phone;
                        this.back_phone = this.icpContent.back_phone;
                        this.email = this.icpContent.email;
                        this.remarks = this.icpContent.remarks;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 2000,
                        });
                    }
                });
        } else {
            //this.init();
            this.getProvinceCity(); //获取省市区
        }
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_IS_SELECT]]),
        ...mapMutations({
            [MutationTypes.SET_IS_SELECT]: MutationTypes.SET_IS_SELECT,
        }),
        // init(){
        //     this.$axios.post('index.php?c=App&a=getIcp',{
        //         domain: this.domain,
        //     })
        //     .then((res)=>{
        //         console.log(res);
        //     })
        // },
        // 显示
        selectBtn: function() {
            const that = this;
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
        //修改单位性质
        switchNature() {},
        //修改单位证件类型
        switchType() {},
        //修改有效证件
        switchSubjType() {},
        //确认提交
        submitBtn() {
            let textTips = '';
            // 验证手机号
            let regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
            let regPhone = /^0\d{2,3}-?\d{7,8}$/;
            let regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!this.corpname) {
                textTips = '请输入单位名称';
            } else if (!this.cardno) {
                textTips = '请输入单位有效证件号码';
            } else if (this.corp_cardtype == '2') {
                // 检验身份证
                let row = utils.idCardValid.idCardValid(this.cardno);
                if (!row.pass) {
                    textTips = row.msg;
                    this.$refs.checkIdCard.focus();
                }
            } else if (!this.address) {
                textTips = '请输入单位有效证件住所';
            } else if (!this.province) {
                textTips = '请选择省/市/区';
            } else if (!this.corp_address) {
                textTips = '请输入单位地址';
            } else if (!this.investor) {
                textTips = '请输入投资者';
            } else if (!this.linkman) {
                textTips = '请输入负责人姓名';
            } else if (!this.linkman_cardno) {
                textTips = '请输入有效证件号码';
            } else if (this.linkman_cardno) {
                // 检验身份证
                let row = utils.idCardValid.idCardValid(this.linkman_cardno);
                if (!row.pass) {
                    textTips = row.msg;
                    this.$refs.checkCardno.focus();
                }
            } else if (!this.mobile) {
                textTips = '请输入手机号码';
            } else if (!regMobile.test(this.mobile)) {
                textTips = '请输入正确的手机号';
            } else if (!this.phone) {
                textTips = '请输入联系电话或手机号';
            } else if (!regMobile.test(this.phone) && !regPhone.test(this.phone)) {
                textTips = '请输入正确的联系电话或手机号';
            } else if (!this.back_phone) {
                textTips = '请输入联系电话或手机号';
            } else if (!regMobile.test(this.back_phone) && !regPhone.test(this.back_phone)) {
                textTips = '请输入正确的应急电话或手机号';
            } else if (!this.email) {
                textTips = '请输入电子邮箱';
            } else if (!regEmail.test(this.email)) {
                textTips = '请输入正确的电子邮箱';
            }
            if (textTips) {
                Toast({
                    message: textTips,
                    duration: 2000,
                });
                return false;
            } else {
                this.$axios
                    .post('index.php?c=App&a=setIcp', {
                        domain: this.domain,
                        corpname: this.corpname,
                        corptype: this.corptype,
                        corp_cardtype: this.corp_cardtype,
                        cardno: this.cardno,
                        address: this.address,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        corp_address: this.corp_address,
                        investor: this.investor,
                        linkman: this.linkman,
                        linkman_cardtype: this.linkman_cardtype,
                        linkman_cardno: this.linkman_cardno,
                        mobile: this.mobile,
                        phone: this.phone,
                        back_phone: this.back_phone,
                        email: this.email,
                        remarks: this.remarks,
                    })
                    .then(res => {
                        let _data = res.data;
                        if (_data.errcode == 0) {
                            Toast({
                                message: res.data.errmsg,
                                duration: 2000,
                            });
                            setTimeout(() => {
                                let _value = {};
                                this.$router.push({
                                    path: '/orderlist',
                                });
                                _value = {
                                    isSelect: 4,
                                    status: 4,
                                };
                                this[MutationTypes.SET_IS_SELECT](_value);
                            }, 2000);
                        } else {
                            Toast({
                                message: res.data.errmsg,
                                duration: 2000,
                            });
                        }
                    });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.filing {
    height: 100%;
    .add-subject-main {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        .add-subject-main-title {
            padding: 0.15rem 0;
            font-size: 0.34rem;
            font-weight: 500;
        }
    }
    .add-subject-main-list {
        label {
            width: auto;
            min-width: 1.8rem;
            padding-right: 0.3rem;
        }
        input {
            max-width: 4rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .basic {
        margin: 0.5rem 0 0.1rem 0;
    }
}
</style>
