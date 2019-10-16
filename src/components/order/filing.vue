<template>
    <div class="filing">
        <nav-header title="备案"></nav-header>
        <div class="add-subject-main">
            <h1 class="add-subject-main-title">{{title}}</h1>
            <div class="add-subject-main-list">
                <label>单位名称</label>
                <input
                    type="text"
                    v-model="companyName"
                    placeholder="请填写单位名称"
                />
            </div>
            <div class="add-subject-main-list">
                <label>单位性质</label>
                <select
                    v-model="companyNature"
                    @change="switchNature()"
                    class="select-box"
                >
                    <option v-for="nature in natures" :value="nature.key" :key="nature.key">
                        {{ nature.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>单位证件类型</label>
                <select
                    v-model="companyType"
                    @change="switchType()"
                    class="select-box"
                >
                    <option v-for="certificate in certificates" :value="certificate.key" :key="certificate.key">
                        {{ certificate.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>单位有效证件号码</label>
                <input
                    type="text"
                    v-model="idNumber"
                    placeholder="请填写单位有效证件号码"
                />
            </div>
            <div class="add-subject-main-list">
                <label>单位有效证件住所</label>
                <input
                    type="text"
                    v-model="companyAddress"
                    placeholder="请填写单位有效证件号码"
                />
            </div>
            <div class="add-subject-main-list">
                <label>单位所在省市区</label>
                <!-- <input type="text" placeholder="请选择省/市/区" /> -->
                <p class="mcc" @click.stop="selectBtn" v-if="(province || city || area) && detailStatus == ''">
                    {{ province }} {{ city }} {{ area }}
                </p>
                <p class="mcc" @click.stop="selectBtn" v-if="!province && detailStatus == ''">请选择省/市/区</p>

                <p class="mcc" :readonly="detailStatus != '' ? 'readonly' : false" v-if="(province || city || area) && detailStatus != ''">
                    {{ province }} {{ city }} {{ area }}
                </p>
                <p class="mcc" :readonly="detailStatus != '' ? 'readonly' : false" v-if="!province && detailStatus != ''">
                    请选择省/市/区
                </p>
            </div>
            <div class="add-subject-main-list">
                <label>单位地址</label>
                <input type="text" v-model="address" placeholder="请填写单位地址" />
            </div>
            <div class="add-subject-main-list">
                <label>投资者</label>
                <input
                    type="text"
                    v-model="investor"
                    placeholder="请填写投资者名称"
                />
            </div>
            <h1 class="add-subject-main-title basic">{{basicData}}</h1>
            <div class="add-subject-main-list">
                <label>负责人姓名</label>
                <input
                    type="text"
                    v-model="subjectName"
                    placeholder="请填写姓名"
                />
            </div>
            <div class="add-subject-main-list">
                <label>有效证件</label>
                <select
                    v-model="subjectType"
                    @change="switchSubjType()"
                    class="select-box"
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
                    v-model="subjectNum"
                    placeholder="请填写有效证件号码"
                />
            </div>
            <div class="add-subject-main-list">
                <label>手机号码</label>
                <input
                    type="number"
                    v-model.number="mobile"
                    placeholder="请填写手机号码"
                />
            </div>
            <div class="add-subject-main-list">
                <label>联系电话</label>
                <input
                    type="text"
                    v-model="phone"
                    placeholder="请输入联系电话"
                />
            </div>
            <div class="add-subject-main-list">
                <label>应急电话</label>
                <input
                    type="number"
                    v-model.number="urgentMobile"
                    placeholder="请填写应急电话"
                />
            </div>
            <div class="add-subject-main-list">
                <label>电子邮箱</label>
                <input
                    type="email"
                    v-model="email"
                    placeholder="请填写电子邮箱"
                />
            </div>
            <div class="add-subject-main-list">
                <label>备注</label>
                <input
                    type="text"
                    v-model="remarks"
                    placeholder="请填写备注"
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
            <button class="submit" @click="submitBtn()">确定</button>
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
export default {
    name:"filing",
    data() {
        return {
            title:"ICP备案主体信息",
            basicData:"主体负责人基本情况",
            companyName:"",//单位名称
            companyNature:"",//单位性质选中项
            natures:[],//单位性质
            companyType:"1",//单位证件类型选中项
            certificates:[
                {
                    key:"1",
                    name:"营业执照(个人或企业)"
                },
                {
                    key:"2",
                    name:"身份证"
                },
            ],//单位证件类型
            subjectType:"1",//有效证件选中项
            subjects:[
                {
                    key:"1",
                    name:"居民身份证"
                },
                {
                    key:"2",
                    name:"驾驶证"
                },
            ],//有效证件
            subjectNum:"15465465454545454562",//有效证件号码
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
            idNumber:"468464616544646878",//单位有效证件号码
            companyAddress:"广东省广州市天河区林和西都市华庭",//单位有效住所
            province: '',// 省
            city: '',// 市
            area: '',// 区
            address: '',//详细地址
            temptValue: [],// 省市区临时存储变化
            detailStatus: this.$route.query.status ? this.$route.query.status : '',
            isShowCity: false, //是否显示市
            isShow: false,//区域选择弹窗
            investor:"环球商域有限公司",//投资者
            subjectName:"",//负责人姓名
            mobile:"13562222222",//手机号码
            phone:"020-4815244",//联系电话
            urgentMobile:"13800138000",//应急电话
            email:"",//电子邮箱
            remarks:"",//备注
        }
    },
    created() {
        this.init();//初始化获取申请人信息
        this.getProvinceCity();//获取省市区
    },
    methods: {
        //获取申请人信息
        init() {
            this.$axios.get('/index.php?c=App&a=getCorporationType').then(res => {
                if (res.data.errcode == 0) {
                    this.natures = res.data.content;
                    this.companyNature = this.natures[1].key;
                } else {
                    Toast({
                        message: res.data.errmsg,
                        duration: 1500,
                    });
                }
            });
        },
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
        switchNature(){

        },
        //修改单位证件类型
        switchType(){

        },
        //修改有效证件
        switchSubjType(){

        },
        //确认提交
        submitBtn(){

        }
    },
}
</script>
<style lang="scss" scoped>
    .filing{
        height: 100%;
        .add-subject-main{
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            .add-subject-main-title{
                padding:0.15rem 0;
                font-size: 0.34rem;
                font-weight: 500;
            }
        }
        .add-subject-main-list{
            label{
                width:auto;
                min-width: 1.8rem;
                padding-right: 0.3rem;
            }
            input{
                max-width: 4rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .basic{
            margin:0.5rem 0 0.1rem 0;
        }
    }
</style>