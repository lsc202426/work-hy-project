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
