/**
 * 状态的派生属性
 */
import * as GetterTypes from "@/constants/GetterTypes";

export const getters = {
  [GetterTypes.GET_IS_SHOW]: state => {
    return state.isShow;
  },
  [GetterTypes.GET_NAR_LIST]: state => {
    return state.narList;
  },
  [GetterTypes.GET_MENU_SHOW]: state => {
    return state.menuShow;
  }
};
