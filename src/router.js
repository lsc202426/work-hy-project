import Vue from "vue";
import Router from "vue-router";
import Index from "./components/Index.vue";

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
  ]
});
