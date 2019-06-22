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
import TradeSearch from "./components/tService/tradeSearch.vue";
import productList from "./components/trademark/productlist.vue";

Vue.use(Router);
//引入全局组件
import NavBotton from "./components/commom/navBotton.vue";
Vue.component("navBotton", NavBotton);
import NavHeader from "./components/commom/navHeader.vue";
Vue.component("navHeader", NavHeader);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/message",
      name: "message",
      component: () => import("./components/message/index.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("./components/message/detail.vue")
    },
    {
      path: "/solve",
      name: "solve",
      component: () => import("./components/message/solve.vue")
    },
    {
      path: "/recruit",
      name: "recruit",
      component: () => import("./components/recruit/recruit.vue")
    },
    {
      path: "/fill_information",
      name: "fill_information",
      component: () => import("./components/recruit/fill_information.vue")
    },
    {
      path: "/orderlist",
      name: "OrderList",
      component: OrderList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/orderdetails",
      name: "OrderDetails",
      component: OrderDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/capiral",
      name: "capiral",
      component: Capiral
    },
    {
      path: "/material",
      name: "material",
      component: Material
    },
    {
      path: "/editmsg",
      name: "editmsg",
      component: Editmsg
    },
    {
      path: "/support",
      name: "support",
      component: Support
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/loadfailed",
      name: "loadfailed",
      component: LoadFailed
    },
    {
      path: "/playsuccess",
      name: "playsuccess",
      component: PlaySuccess
    },
    {
      path: "/sendsuccess",
      name: "sendsuccess",
      component: Sendsuccess
    },
    {
      path: "/playorder",
      name: "playorder",
      component: Playorder
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/pswSetting",
      name: "pswSetting",
      component: PswSetting
    },
    {
      path: "/feekbook",
      name: "feekbook",
      component: Feekbook
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: AboutUs
    },
    {
      path: "/informat",
      name: "informat",
      component: Informat
    },
    {
      path: "/tradeSearch",
      name: "tradeSearch",
      component: TradeSearch
    },
    {
      path: "/productlist",
      name: "productlist",
      component: productList
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
