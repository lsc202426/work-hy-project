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
  narList: [
    { label: "全部", id: 0 },
    { label: "代付款", id: 1 },
    { label: "审核中", id: 2 },
    { label: "待处理", id: 3 },
    { label: "已完成", id: 4 },
    { label: "系统消息", id: 5 },
    { label: "预警消息", id: 6 },
    { label: "站点消息", id: 7 },
    { label: "等等消息", id: 8 }
  ],
  //底部菜单选中
  menuShow: "index"
};

export default new Vuex.Store({
  state,
  mutations: mutations.mutations,
  actions: actions.actions,
  getters: getters.getters
});
