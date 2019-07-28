import Vue from 'vue';
import Router from 'vue-router';
import * as MutationTypes from '@/constants/MutationTypes';
import Store from '@/vuex/store.js';
import Index from './components/Index.vue';
// import Home from "./components/Home.vue";
import OrderList from './components/order/orderList.vue';
import OrderDetails from './components/order/orderDetails.vue';
import User from './components/user/user.vue';
import Capiral from './components/user/capiral.vue';
import Material from './components/user/material.vue';
import Editmsg from './components/user/editmsg.vue';
import Support from './components/user/support.vue';
import Login from './components/user/login_v1.vue';
import Loginpd from './components/user/loginPassword.vue';
import LoginCode from './components/user/loginCode.vue';
import PlaySuccess from './components/order/playSuccess.vue';
import Playorder from './components/order/playOrder.vue';
import LoadFailed from './components/commom/loadFailed.vue';
import Sendsuccess from './components/commom/sendSuccess.vue';
import Setting from './components/user/setting.vue';
import PswSetting from './components/user/pswSetting.vue';
import Feekbook from './components/user/feekbook.vue';
import AboutUs from './components/user/aboutUs.vue';
import Informat from './components/informat/informat.vue';
import productList from './components/trademark/productlist.vue';
import TradeService from './components/tService/tradeService.vue';
import FBrand from './components/user/fBrand.vue';
import FSite from './components/user/fSite.vue';
import Renew from './components/message/renew.vue';
import Application from './components/tService/application.vue';
import Domain from './components/tService/domain.vue';
import DomainMsg from './components/tService/domainMsg.vue';
import applyClass from './components/trademark/applyClass.vue';
import RegisterSuccess from './components/user/registerSuccess.vue';
import Register from './components/user/register_v1.vue';
import PrivacyPolicy from './components/user/privacyPolicy.vue';
import Forget from './components/user/forget_v1.vue';
import Contact from './components/service/contact.vue';
import DzpCase from './components/recruit/dzpCase.vue';

Vue.use(Router);
//引入全局组件
import NavBotton from './components/commom/navBotton.vue';
Vue.component('navBotton', NavBotton);
import NavHeader from './components/commom/navHeader.vue';
Vue.component('navHeader', NavHeader);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/service', //消息
            name: 'service',
            component: () => import('./components/service/service.vue'),
        },
        {
            path: '/message', //消息
            name: 'message',
            component: () => import('./components/message/index.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/detail', //消息详情
            name: 'detail',
            component: () => import('./components/message/detail.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/solve', //查看问题单
            name: 'solve',
            component: () => import('./components/message/solve.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/recruit', //点招聘
            name: 'recruit',
            component: () => import('./components/recruit/recruit.vue'),
        },
        {
            path: '/dzpinfor', //点招聘主体信息
            name: 'dzpinfor',
            component: () => import('./components/recruit/fill_information.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/oneStation', //一站通
            name: 'oneStation',
            component: () => import('./components/oneStation/oneStation.vue'),
        },
        {
            path: '/website', //品牌官网
            name: 'website',
            component: () => import('./components/oneStation/website.vue'),
        },
        {
            path: '/shop', //品牌网店
            name: 'shop',
            component: () => import('./components/oneStation/shop.vue'),
        },
        {
            path: '/smallProcedures', //小程序网店
            name: 'smallProcedures',
            component: () => import('./components/oneStation/smallProcedures.vue'),
        },
        {
            path: '/information', //主体信息
            name: 'information',
            component: () => import('./components/oneStation/information.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/shoppingCart', //清单
            name: 'shoppingCart',
            component: () => import('./components/shoppingCart/shoppingCart.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/download', //下载
            name: 'download',
            component: () => import('./components/download/download.vue'),
        },
        {
            path: '/orderlist', //订单列表
            name: 'OrderList',
            component: OrderList,
            // meta: {
            //   requireAuth: true
            // }
        },
        {
            path: '/orderdetails', //订单详情
            name: 'OrderDetails',
            component: OrderDetails,
            // meta: {
            //   requireAuth: true
            // }
        },
        {
            path: '/user', //我的
            name: 'user',
            component: User,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/capiral', //余额
            name: 'capiral',
            component: Capiral,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/material', //注册资料管理
            name: 'material',
            component: Material,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/editmsg', //编辑资料
            name: 'editmsg',
            component: Editmsg,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/support', //帮助支持
            name: 'support',
            component: Support,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/login', //登录
            name: 'login',
            component: Login,
        },
        {
            path: '/loginpd', //密码登录
            name: 'loginpd',
            component: Loginpd,
        },
        {
            path: '/logincode', //验证码登录
            name: 'logincode',
            component: LoginCode,
        },
        {
            path: '/loadfailed', //加载失败
            name: 'loadfailed',
            component: LoadFailed,
        },
        {
            path: '/playsuccess', //支付成功
            name: 'playsuccess',
            component: PlaySuccess,
        },
        {
            path: '/sendsuccess', //成功
            name: 'sendsuccess',
            component: Sendsuccess,
        },
        {
            path: '/playorder', //支付
            name: 'playorder',
            component: Playorder,
            // meta: {
            //   requireAuth: true
            // }
        },
        {
            path: '/setting', //设置
            name: 'setting',
            component: Setting,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/pswSetting', //密码设置
            name: 'pswSetting',
            component: PswSetting,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/feekbook', //功能反馈
            name: 'feekbook',
            component: Feekbook,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/aboutUs', //关于我们
            name: 'aboutUs',
            component: AboutUs,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/informat', //资讯
            name: 'informat',
            component: Informat,
        },
        {
            path: '/productlist', //点商标服务
            name: 'productlist',
            component: productList,
        },
        {
            path: '/tradeService', //商标服务
            name: 'tradeService',
            component: TradeService,
        },
        {
            path: '/fBrand', //品牌预警
            name: 'fBrand',
            component: FBrand,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/fSite', //站点预警
            name: 'fSite',
            component: FSite,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/renew', //续费
            name: 'renew',
            component: Renew,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/application', //商标申请
            name: 'application',
            component: Application,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/domain', //域名服务
            name: 'domain',
            component: Domain,
        },
        {
            path: '/domainMsg', //域名服务信息
            name: 'domainMsg',
            component: DomainMsg,
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/fillProduct', //点商标服务信息
            name: 'fillProduct',
            component: () => import('./components/trademark/fillProduct.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/applyclass', //申请类别
            name: 'applyclass',
            component: applyClass,
        },
        {
            path: '/uploadD', //申请类别
            name: 'uploadD',
            component: () => import('./components/order/uploadD.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/registersuccess', //注册成功
            name: 'RegisterSuccess',
            component: RegisterSuccess,
        },
        {
            path: '/register', //注册
            name: 'Register',
            component: Register,
        },
        {
            path: '/privacy', //隐私条款
            name: 'PrivacyPolicy',
            component: PrivacyPolicy,
        },
        {
            path: '/forget', //忘记密码
            name: 'Forget',
            component: Forget,
        },
        {
            path: '/addSubject', //新增主体
            name: 'addSubject',
            component: () => import('./components/subject/addSubject.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/subjectList', //主体列表
            name: 'subjectList',
            component: () => import('./components/subject/subjectList.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/verifyEmail', //验证邮箱
            name: 'verifyEmail',
            component: () => import('./components/subject/verifyEmail.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/contact', //联系互易
            name: 'contact',
            component: Contact,
        },
        {
            path: '/addSuccess', //验证邮箱
            name: 'addSuccess',
            component: () => import('./components/order/addSuccess.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/integral', //验证邮箱
            name: 'integral',
            component: () => import('./components/user/integral.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/invite', //验证邮箱
            name: 'invite',
            component: () => import('./components/user/invite.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/informatDetail', //验证邮箱
            name: 'informatDetail',
            component: () => import('./components/informat/informatDetail.vue'),
        },
        {
            path: '/restaurant', //点餐厅
            name: 'restaurant',
            component: () => import('./components/restaurant/restaurant.vue'),
        },
        {
            path: '/restaurantFill', //点餐厅申请信息
            name: 'restaurantFill',
            component: () => import('./components/restaurant/restaurantFill.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/applicantFill', //点餐厅申请人信息填写
            name: 'applicantFill',
            component: () => import('./components/restaurant/applicantFill.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/confirmOrder', //点餐厅预览
            name: 'confirmOrder',
            component: () => import('./components/restaurant/confirmOrder.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/dzpcase', //点招聘案例
            name: 'dzpcase',
            component: DzpCase,
        },
        {
            path: '/restaurantWeb', //网站申请信息
            name: 'restaurantWeb',
            component: () => import('./components/oneStation/restaurantWeb.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/applicantWeb', //网站申请人信息填写
            name: 'applicantWeb',
            component: () => import('./components/oneStation/applicantWeb.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/confirmWeb', //网站信息预览
            name: 'confirmWeb',
            component: () => import('./components/oneStation/confirmWeb.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/addinfor', //补充资料
            name: 'addinfor',
            component: () => import('./components/commom/addInfor.vue'),
            meta: {
                requireAuth: true,
            },
        },
    ],
});
// 验证是否需要登录
router.beforeEach((to, from, next) => {
    // 监听路由设置当前路由底部菜单高亮
    //console.log(to, from);
    Store.commit(MutationTypes.SET_MENU_SHOW, to.name);
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (sessionStorage.getItem('token')) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        }
    } else {
        next();
    }
    next();
});
export default router;
