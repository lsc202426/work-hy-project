import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import axios from "./http";
import "./rem";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import md5 from "js-md5";
import clipboard from "clipboard";

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.clipboard = clipboard;
Vue.use(Mint);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
