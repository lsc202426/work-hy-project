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
      component: () => import("./components/message/detail.vue"),
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/solve",
      name: "solve",
      component: () => import("./components/message/solve.vue"),
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/recruit",
      name: "recruit",
      component: () => import("./components/recruit/recruit.vue")
    },
    {
      path: "/fill_information",
      name: "fill_information",
      component: () => import("./components/recruit/fill_information.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/oneStation",
      name: "oneStation",
      component: () => import("./components/oneStation/oneStation.vue")
    },
    {
      path: "/website",
      name: "website",
      component: () => import("./components/oneStation/website.vue")
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("./components/oneStation/shop.vue")
    },
    {
      path: "/smallProcedures",
      name: "smallProcedures",
      component: () => import("./components/oneStation/smallProcedures.vue")
    },
    {
      path: "/information",
      name: "information",
      component: () => import("./components/oneStation/information.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: () => import("./components/shoppingCart/shoppingCart.vue"),
        meta: {
          requireAuth: true
        }
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
      component: Capiral,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/material",
      name: "material",
      component: Material,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/editmsg",
      name: "editmsg",
      component: Editmsg,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/support",
      name: "support",
      component: Support,
        meta: {
          requireAuth: true
        }
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
      component: Playorder,
        meta: {
          requireAuth: true
        }
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
      component: PswSetting,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/feekbook",
      name: "feekbook",
      component: Feekbook,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: AboutUs,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/informat",
      name: "informat",
      component: Informat
    },
    {
      path: "/productlist",
      name: "productlist",
      component: productList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/tradeService",
      name: "tradeService",
      component: TradeService
    },
    {
      path: "/fBrand",
      name: "fBrand",
      component: FBrand,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/fSite",
      name: "fSite",
      component: FSite,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/renew",
      name: "renew",
      component: Renew,
        meta: {
          requireAuth: true
        }
    },
    {
      path: "/application",
      name: "application",
      component: Application,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/domain",
      name: "domain",
      component: Domain
    },
    {
      path: "/domainMsg",
      name: "domainMsg",
      component: DomainMsg,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/fillProduct",
      name: "fillProduct",
      component: () => import("./components/trademark/fillProduct.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/applyclass",
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
