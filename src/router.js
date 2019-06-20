import Vue from "vue";
import Router from "vue-router";
import Index from "./components/Index.vue";
import OrderList from "./components/order/orderList.vue";
import OrderDetails from "./components/order/orderDetails.vue";
import User from "./components/user/user.vue";
import Capiral from "./components/user/capiral.vue";
import Material from "./components/user/material.vue";
import Editmsg from "./components/user/editmsg.vue";
import Support from "./components/user/support.vue";

Vue.use(Router);

//引入全局组件
import NavBotton from "./components/commom/navBotton.vue";
Vue.component("navBotton", NavBotton);
import NavHeader from "./components/commom/navHeader.vue";
Vue.component("navHeader", NavHeader);

export default new Router({
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
      component: () => import("./components/message/index.vue")
    },
    {
      path: "/orderList",
      name: "OrderList",
      component: OrderList
    },
    {
      path: "/orderdetails",
      name: "OrderDetails",
      component: OrderDetails
    },
    {
      path: "/user",
      name: "user",
      component: User
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
    }
  ]
});
