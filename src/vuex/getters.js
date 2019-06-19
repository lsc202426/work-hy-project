/**
 * 状态的派生属性
 */
import * as GetterTypes from "@/constants/GetterTypes";

export const getters = {
  [GetterTypes.GET_IS_SHOW]: state => {
    return state.isShow;
  }
};
