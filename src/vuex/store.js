import Vue from "vue";
import Vuex from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex);

const state = {
  //例子，是否显示
  isShow: ""
};

export default new Vuex.Store({
  state,
  mutations: mutations.mutations,
  actions: actions.actions,
  getters: getters.getters
});
