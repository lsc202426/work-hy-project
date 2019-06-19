import Vue from "vue";
import Router from "vue-router";
import Index from "./components/Index.vue";
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
      path: "/user",
      name: "user",
      component: User
    },

  ]
});
