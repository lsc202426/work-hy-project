import Vue from "vue";
import Vuex from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex);

const state = {
  //例子，是否显示
  isShow: "",
  // 订单分类
  narList: [],
  // 是否选中
  isSelect: {
    status: "",
    isSelect: 0
  },
  //底部菜单选中
  menuShow: "index"
};

export default new Vuex.Store({
  state,
  mutations: mutations.mutations,
  actions: actions.actions,
  getters: getters.getters
});
