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
        status: '',
        isSelect: 0,
    },
    //底部菜单选中
    menuShow: 'index',
    // 是否显示分类
    selectClass: {
        isShow: false,
        content: [],
        classType: {},
        allPrice: 0,
        temptSelect: {},
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
    // 点商标申请信息
    showTmd: {
        isShow: false,
        id: '',
        keyword: '',
        price: '',
    },
    //点商标
    tmdApplyInfo: {
        keyword: '',
        year: '',
        price: 0,
        all_price: 0,
        audit: 600,
        applyType: 1,
        imgArr: [],
        applicant: {},
        pageNum: 0,
    },
    // 点招聘申请信息
    showDzp: {
        id: '', //产品id
        keyword: '', //申请词
        price: '', //注册费
        product_name: '', //产品名
        year: '', // 年限
    },
    // 点招聘
    dzpApplyInfo: {
        keyword: '', //搜索过来的名字
        year: Number, //年限
        qualifications: [], //资质类型
        selected: Number, //选中资质类型
        price: '', //单价费用
        all_price: '', //总计费用
        product_name: '', //产品名称
        productid: '', //产品id
        pageNum: Number, //当前页
        imgArr: [], //资质图片
        isRead: false, //是否阅读申请人条款
        salesCode: '', //品牌销售顾问
        isShowDzp: false,
        applicant: {},
    },
//点餐厅
	dctApplyInfo:{
		fee_verify:	Number,//手续费	
		productid:'',//产品id
		product_type:'',//产品类型	
		domain:'',//申请词
		price:Number,//单价
		year:Number,//时间
		all_price:Number,//总价
		subject:{},//申请主体
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
        pageNum: 0
    },
};

export default new Vuex.Store({
    state,
    mutations: mutations.mutations,
    actions: actions.actions,
    getters: getters.getters,
});
