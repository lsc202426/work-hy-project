import Vue from "vue";
import Router from "vue-router";
import Index from "./components/Index.vue";
import OrderList from "./components/order/orderList.vue";
import OrderDetails from "./components/order/orderDetails.vue";
import User from "./components/user/user.vue";

Vue.use(Router);

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
      path: "/",
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
    }
  ]
});
