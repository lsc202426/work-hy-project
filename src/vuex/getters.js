/**
 * 状态的派生属性
 */
import * as GetterTypes from '@/constants/GetterTypes';

export const getters = {
    [GetterTypes.GET_IS_SHOW]: state => {
        return state.isShow;
    },
    [GetterTypes.GET_NAR_LIST]: state => {
        return state.narList;
    },
    [GetterTypes.GET_MENU_SHOW]: state => {
        return state.menuShow;
    },
    [GetterTypes.GET_IS_SELECT]: state => {
        return state.isSelect;
    },
    [GetterTypes.GET_SELECT_CLASS]: state => {
        return state.selectClass;
    },
    [GetterTypes.GET_REGISTER_INFO]: state => {
        return state.registerInfo;
    },
    [GetterTypes.GET_SHOW_TMD]: state => {
        return state.showTmd;
    },
    [GetterTypes.GET_SHOW_DZP]: state => {
        return state.showDzp;
    },
    [GetterTypes.GET_DZP_APPLY_INFO]: state => {
        return state.dzpApplyInfo;
    },
    [GetterTypes.GET_TMD_APPLY_INFO]: state => {
        return state.tmdApplyInfo;
    },
    [GetterTypes.GET_TMD_APPLY_CLASS]: state => {
        return state.tmdApplyClass;
    },
    [GetterTypes.GET_SHOW_SB]: state => {
        return state.showSb;
    },
    [GetterTypes.GET_SHOW_YM]: state => {
        return state.showYm;
    },
    [GetterTypes.GET_DCT_APPLY_INFO]: state => {
        return state.dctApplyInfo;
    },

    [GetterTypes.GET_APPLY_INFOR]: state => {
        return state.applyInfor;
    },
};
