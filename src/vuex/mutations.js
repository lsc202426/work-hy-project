/**
 * 操作状态
 */
import * as MutationTypes from "@/constants/MutationTypes";

export const mutations = {
  [MutationTypes.SET_IS_SHOW]: (state, isShow) => {
    state.isShow = isShow;
  },
  [MutationTypes.SET_NAR_LIST]: (state, narList) => {
    state.narList = narList;
  },
  [MutationTypes.SET_MENU_SHOW]: (state, menuShow) => {
    state.menuShow = menuShow;
  }
};
