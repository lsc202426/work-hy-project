import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
    //例子，是否显示
    isShow: '',
    // 订单分类
    narList: [],
    // 是否选中
    isSelect: {
        status: 0,
        isSelect: 0,
    },
    //底部菜单选中
    menuShow: 'index',
    // 是否显示分类
    selectClass: {
        content: [],
        classType: {},
        allPrice: 0,
        allPriceBs: 0,
        isShowTotal: false,
    },
    // 暂存注册信息
    registerInfo: {
        lastname: '',
        firstname: '',
        mobile: '',
        code: '',
        password: '',
        confirmPassword: '',
        isAgree: false,
        isGetCode: 0,
        faceid: '',
    },
    //点餐厅
    dctApplyInfo: {
        fee_verify: Number, //手续费
        productid: '', //产品id
        product_type: '', //产品类型
        domain: '', //申请词
        price: Number, //单价
        year: Number, //时间
        all_price: Number, //总价
        subject: {}, //申请主体
    },
    // 商标申请信息
    showSb: {
        isShow: false,
        type: '1',
        name: '',
        imgUrl: '',
        price: 0,
        all_price: 0,
    },
    // 商标申请信息
    showYm: {
        isShow: false,
        year: 1,
        price: '',
        all_price: '',
        pageNum: 0,
    },
    // 选择品牌顾问弹框显隐
    saleMember: {
        key: 0,
        isShow: false,
        list: [],
    },
    // 成功页面信息
    successCon: {
        goUrl: '/user',
        title: '',
        text: '',
        leftBtn: {
            text: '',
            url: '',
        },
        rightBtn: {
            text: '',
            url: '',
            past: '',
        },
    },
};

export default new Vuex.Store({
    state,
    mutations: mutations.mutations,
    actions: actions.actions,
    getters: getters.getters,
});
