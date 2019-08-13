/**
 * 操作状态
 */
import * as MutationTypes from '@/constants/MutationTypes';

export const mutations = {
    [MutationTypes.SET_IS_SHOW]: (state, isShow) => {
        state.isShow = isShow;
    },
    [MutationTypes.SET_NAR_LIST]: (state, narList) => {
        state.narList = narList;
    },
    [MutationTypes.SET_MENU_SHOW]: (state, menuShow) => {
        state.menuShow = menuShow;
    },
    [MutationTypes.SET_IS_SELECT]: (state, isSelect) => {
        state.isSelect = isSelect;
    },
    [MutationTypes.SET_SELECT_CLASS]: (state, selectClass) => {
        state.selectClass = selectClass;
    },
    [MutationTypes.SET_REGISTER_INFO]: (state, registerInfo) => {
        state.registerInfo = registerInfo;
    },
    [MutationTypes.SET_SHOW_TMD]: (state, showTmd) => {
        state.showTmd = showTmd;
    },
    // [MutationTypes.SET_SHOW_DZP]: (state, showDzp) => {
    //     state.showDzp = showDzp;
    // },
    [MutationTypes.SET_TMD_APPLY_CLASS]: (state, tmdApplyClass) => {
        state.tmdApplyClass = tmdApplyClass;
    },
    [MutationTypes.SET_SHOW_SB]: (state, showSb) => {
        state.showSB = showSb;
    },
    [MutationTypes.SET_SHOW_YM]: (state, showYm) => {
        state.showYM = showYm;
    },
    [MutationTypes.SET_DCT_APPLY_INFO]: (state, dctApplyInfo) => {
        state.dctApplyInfo = dctApplyInfo;
    },

    [MutationTypes.SET_APPLY_INFOR]: (state, applyInfor) => {
        state.applyInfor = applyInfor;
    },
};
