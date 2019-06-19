/**
 * 操作状态
 */
import * as MutationTypes from "@/constants/MutationTypes";

export const mutations = {
  [MutationTypes.SET_IS_SHOW]: (state, isShow) => {
    state.isShow = isShow;
  }
};
