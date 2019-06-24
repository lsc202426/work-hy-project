import Vue from "vue";
import Router from "vue-router";
import * as MutationTypes from "@/constants/MutationTypes";
import Store from "@/vuex/store.js";
import Index from "./components/Index.vue";
import OrderList from "./components/order/orderList.vue";
import OrderDetails from "./components/order/orderDetails.vue";
import User from "./components/user/user.vue";
import Capiral from "./components/user/capiral.vue";
import Material from "./components/user/material.vue";
import Editmsg from "./components/user/editmsg.vue";
import Support from "./components/user/support.vue";
import Login from "./components/user/login.vue";
import PlaySuccess from "./components/order/playSuccess.vue";
import Playorder from "./components/order/playOrder.vue";
import LoadFailed from "./components/commom/loadFailed.vue";
import Sendsuccess from "./components/commom/sendSuccess.vue";
import Setting from "./components/user/setting.vue";
import PswSetting from "./components/user/pswSetting.vue";
import Feekbook from "./components/user/feekbook.vue";
import AboutUs from "./components/user/aboutUs.vue";
import Informat from "./components/informat/informat.vue";
import productList from "./components/trademark/productlist.vue";
import TradeService from "./components/tService/tradeService.vue";
import FBrand from "./components/user/fBrand.vue";
import FSite from "./components/user/fSite.vue";
import Renew from "./components/renew/index.vue";
import Application from "./components/tService/application.vue";
import Domain from "./components/tService/domain.vue";
import DomainMsg from "./components/tService/domainMsg.vue";
import applyClass from "./components/trademark/applyClass.vue";

Vue.use(Router);
//引入全局组件
import NavBotton from "./components/commom/navBotton.vue";
Vue.component("navBotton", NavBotton);
import NavHeader from "./components/commom/navHeader.vue";
Vue.component("navHeader", NavHeader);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/message",//消息
      name: "message",
      component: () => import("./components/message/index.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/detail",//消息详情
      name: "detail",
      component: () => import("./components/message/detail.vue")
    },
    {
      path: "/solve",//查看问题单
      name: "solve",
      component: () => import("./components/message/solve.vue")
    },
    {
      path: "/recruit",//点招聘
      name: "recruit",
      component: () => import("./components/recruit/recruit.vue")
    },
    {
      path: "/fill_information",//点招聘主体信息
      name: "fill_information",
      component: () => import("./components/recruit/fill_information.vue")
    },
    {
      path: "/oneStation",//一站通
      name: "oneStation",
      component: () => import("./components/oneStation/oneStation.vue")
    },
    {
      path: "/website",//品牌官网
      name: "website",
      component: () => import("./components/oneStation/website.vue")
    },
    {
      path: "/shop",//品牌网店
      name: "shop",
      component: () => import("./components/oneStation/shop.vue")
    },
    {
      path: "/smallProcedures",//小程序网店
      name: "smallProcedures",
      component: () => import("./components/oneStation/smallProcedures.vue")
    },
    {
      path: "/information",//主体信息
      name: "information",
      component: () => import("./components/oneStation/information.vue")
    },
    {
      path: "/shoppingCart",//清单
      name: "shoppingCart",
      component: () => import("./components/shoppingCart/shoppingCart.vue")
    },
		{
		  path: "/download",//下载
		  name: "download",
		  component: () => import("./components/download/download.vue")
		},
    {
      path: "/orderlist",//订单列表
      name: "OrderList",
      component: OrderList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/orderdetails",//订单详情
      name: "OrderDetails",
      component: OrderDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/user",//我的
      name: "user",
      component: User,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/capiral",//余额
      name: "capiral",
      component: Capiral
    },
    {
      path: "/material",//注册资料管理
      name: "material",
      component: Material
    },
    {
      path: "/editmsg",//编辑资料
      name: "editmsg",
      component: Editmsg
    },
    {
      path: "/support",//帮助支持
      name: "support",
      component: Support
    },
    {
      path: "/login",//登录
      name: "login",
      component: Login
    },
    {
      path: "/loadfailed",//加载失败
      name: "loadfailed",
      component: LoadFailed
    },
    {
      path: "/playsuccess",//支付成功
      name: "playsuccess",
      component: PlaySuccess
    },
    {
      path: "/sendsuccess",//成功
      name: "sendsuccess",
      component: Sendsuccess
    },
    {
      path: "/playorder",//支付
      name: "playorder",
      component: Playorder
    },
    {
      path: "/setting",//设置
      name: "setting",
      component: Setting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/pswSetting",//密码设置
      name: "pswSetting",
      component: PswSetting
    },
    {
      path: "/feekbook",//功能反馈
      name: "feekbook",
      component: Feekbook
    },
    {
      path: "/aboutUs",//关于我们
      name: "aboutUs",
      component: AboutUs
    },
    {
      path: "/informat",//资讯
      name: "informat",
      component: Informat
    },
    {
      path: "/productlist",//点商标服务
      name: "productlist",
      component: productList
    },
    {
      path: "/tradeService",//商标服务
      name: "tradeService",
      component: TradeService
    },
    {
      path: "/fBrand",//品牌预警
      name: "fBrand",
      component: FBrand
    },
    {
      path: "/fSite",//站点预警
      name: "fSite",
      component: FSite
    },
    {
      path: "/renew",//续费
      name: "renew",
      component: Renew
    },
    {
      path: "/application",//商标申请
      name: "application",
      component: Application
    },
    {
      path: "/domain",//域名服务
      name: "domain",
      component: Domain
    },
    {
      path: "/domainMsg",//域名服务信息
      name: "domainMsg",
      component: DomainMsg
    },
    {
      path: "/fillProduct",//点商标服务信息
      name: "fillProduct",
      component: () => import("./components/trademark/fillProduct.vue")
    },
    {
      path: "/applyclass",//申请类别
      name: "applyclass",
      component: applyClass
    }
  ]
});
// 验证是否需要登录
router.beforeEach((to, from, next) => {
  // 监听路由设置当前路由底部菜单高亮
  Store.commit(MutationTypes.SET_MENU_SHOW, to.name);
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
  next();
});
export default router;
