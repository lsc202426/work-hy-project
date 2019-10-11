import Vue from 'vue';
import Router from 'vue-router';
import * as MutationTypes from '@/constants/MutationTypes';
import Store from '@/vuex/store.js';
import Index from './components/Index.vue';

Vue.use(Router);
//引入全局组件
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
            component: () => import('./components/order/orderList.vue'),
            // meta: {
            //   requireAuth: true
            // }
        },
        {
            path: '/orderdetails', //订单详情
            name: 'OrderDetails',
            component: () => import('./components/order/orderDetails.vue'),
            // meta: {
            //   requireAuth: true
            // }
        },
        {
            path: '/user', //我的
            name: 'user',
            component: () => import('./components/user/user.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/capiral', //余额
            name: 'capiral',
            component: () => import('./components/user/capiral.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/material', //注册资料管理
            name: 'material',
            component: () => import('./components/user/material.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/editmsg', //编辑资料
            name: 'editmsg',
            component: () => import('./components/user/editmsg.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/support', //帮助支持
            name: 'support',
            component: () => import('./components/user/support.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/login', //登录
            name: 'login',
            component: () => import('./components/user/login_v1.vue'),
        },
        {
            path: '/loginpd', //密码登录
            name: 'loginpd',
            component: () => import('./components/user/loginPassword.vue'),
        },
        {
            path: '/logincode', //验证码登录
            name: 'logincode',
            component: () => import('./components/user/loginCode.vue'),
        },
        {
            path: '/loadfailed', //加载失败
            name: 'loadfailed',
            component: () => import('./components/common/loadFailed.vue'),
        },
        {
            path: '/playsuccess', //支付成功
            name: 'playsuccess',
            component: () => import('./components/order/playSuccess.vue'),
        },
        {
            path: '/sendsuccess', //成功
            name: 'sendsuccess',
            component: () => import('./components/common/sendSuccess.vue'),
        },
        {
            path: '/playorder', //支付
            name: 'playorder',
            component: () => import('./components/order/playOrder.vue'),
            // meta: {
            //   requireAuth: true
            // }
        },
        {
            path: '/setting', //设置
            name: 'setting',
            component: () => import('./components/user/setting.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/pswSetting', //密码设置
            name: 'pswSetting',
            component: () => import('./components/user/pswSetting.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/feekbook', //功能反馈
            name: 'feekbook',
            component: () => import('./components/user/feekbook.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/aboutUs', //关于我们
            name: 'aboutUs',
            component: () => import('./components/user/aboutUs.vue'),
        },
        {
            path: '/informat', //资讯
            name: 'informat',
            component: () => import('./components/informat/informat.vue'),
        },
        {
            path: '/productlist', //点商标服务
            name: 'productlist',
            component: () => import('./components/trademark/productlist.vue'),
        },
        {
            path: '/tradeService', //商标服务
            name: 'tradeService',
            component: () => import('./components/tService/tradeService.vue'),
        },
        {
            path: '/fBrand', //品牌预警
            name: 'fBrand',
            component: () => import('./components/user/fBrand.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/fSite', //站点预警
            name: 'fSite',
            component: () => import('./components/user/fSite.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/renew', //续费
            name: 'renew',
            component: () => import('./components/message/renew.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/application', //商标申请
            name: 'application',
            component: () => import('./components/tService/application.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/domain', //域名服务
            name: 'domain',
            component: () => import('./components/tService/domain.vue'),
        },
        {
            path: '/domainMsg', //域名服务信息
            name: 'domainMsg',
            component: () => import('./components/tService/domainMsg.vue'),
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
            component: () => import('./components/trademark/applyClass.vue'),
        },
        {
            path: '/uploadD', //申请类别
            name: 'uploadD',
            component: () => import('./components/order/uploadD.vue'),
            // meta: {
            //     requireAuth: true,
            // },
        },
        {
            path: '/registersuccess', //注册成功
            name: 'RegisterSuccess',
            component: () => import('./components/user/registerSuccess.vue'),
        },
        {
            path: '/register', //注册
            name: 'Register',
            component: () => import('./components/user/register_v1.vue'),
        },
        {
            path: '/privacy', //隐私条款
            name: 'PrivacyPolicy',
            component: () => import('./components/user/privacyPolicy.vue'),
        },
        {
            path: '/forget', //忘记密码
            name: 'Forget',
            component: () => import('./components/user/forget_v1.vue'),
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
            component: () => import('./components/service/contact.vue'),
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
            component: () => import('./components/recruit/dzpCase.vue'),
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
            path: '/realName', //实名认证
            name: 'realName',
            component: () => import('./components/subject/realName.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/aboutPro', //网站信息预览
            name: 'aboutPro',
            component: () => import('./components/about/aboutPro.vue'),
        },
        {
            path: '/addInfor', //补充资料
            name: 'addInfor',
            component: () => import('./components/addInfor/addInfor.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/customer', //智能客服
            name: 'customer',
            component: () => import('./components/user/customer.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/addInforDetail', //补充资料
            name: 'addInforDetail',
            component: () => import('./components/addInfor/addInforDetail.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/phoneSetting', //补充资料
            name: 'phoneSetting',
            component: () => import('./components/user/phoneSetting.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/myproduct', //我的产品-首页
            name: 'myproduct',
            component: () => import('./components/product/MyProduct.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/productone', //我的产品-点商标，点招聘
            name: 'productone',
            component: () => import('./components/product/ProductOne.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/productsite', //我的产品--网站
            name: 'productsite',
            component: () => import('./components/product/productSite.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/productbs', //我的产品-商标
            name: 'productbs',
            component: () => import('./components/product/productBs.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/issueInvoice', //开具发票
            name: 'issueInvoice',
            component: () => import('./components/order/issueInvoice.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/contract', //开具合同
            name: 'contract',
            component: () => import('./components/order/contract.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/invDetail', //发票详情
            name: 'invDetail',
            component: () => import('./components/order/invDetail.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/contDetail', //发票详情
            name: 'contDetail',
            component: () => import('./components/order/contDetail.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/analysis', //我的产品--解析
            name: 'analysis',
            component: () => import('./components/product/Analysis.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/analysislist', //我的产品--解析
            name: 'analysislist',
            component: () => import('./components/product/AnalysisList.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/account', //结算
            name: 'account',
            component: () => import('./components/account/account.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/moreContent', //发票更多内容
            name: 'moreContent',
            component: () => import('./components/account/moreContent.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/refund', //申请退款
            name: 'refund',
            component: () => import('./components/order/refund.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/refunddetail', //申请退款
            name: 'refunddetail',
            component: () => import('./components/order/refundDetail.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/extension', //商标续展
            name: 'extension',
            component: () => import('./components/trademarkSome/extension.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/alteration', //商标变更
            name: 'alteration',
            component: () => import('./components/trademarkSome/alteration.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/transfer', //商标转让
            name: 'transfer',
            component: () => import('./components/trademarkSome/transfer.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/certificate', //证书
            name: 'certificate',
            component: () => import('./components/order/certificate.vue'),
            // meta: {
            //     requireAuth: true,
            // },
        },
        {
            path: '/productCode', //二维码
            name: 'productCode',
            component: () => import('./components/order/productCode.vue'),
            // meta: {
            //     requireAuth: true,
            // },
        },
        {
            path: '/subSuccess', //成功页面
            name: 'subSuccess',
            component: () => import('./components/common/subSuccess.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/contractAndInvoice', //合同与发票
            name: 'contractAndInvoice',
            component: () => import('./components/user/contractAndInvoice.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/evaluate', //合同与发票
            name: 'evaluate',
            component: () => import('./components/order/evaluate.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/contractList', //申领合同列表
            name: 'contractList',
            component: () => import('./components/order/contractList.vue'),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/issueInvoiceList', //开具发票列表
            name: 'issueInvoiceList',
            component: () => import('./components/order/issueInvoiceList.vue'),
            meta: {
                requireAuth: true,
            },
        },
        //路由通配符，防止找不到路由，页面空白。
        {
            path: '*',
            component: Index,
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
