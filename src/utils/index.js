import axios from 'axios';
import { Toast } from 'mint-ui';
import router from '@/router.js';
import md5 from 'js-md5';
import _uploader from '@/utils/_uploader.js';
import _canvasImg from '@/utils/_canvasImg.js';
import _idCardValid from '@/utils/_idCardValid.js';
import Store from '@/vuex/store.js';
import * as MutationTypes from '@/constants/MutationTypes';
import hub from '@/hub';

export const uploader = _uploader;
export const canvasImg = _canvasImg;
export const idCardValid = _idCardValid;

/**
 * 获取token
 * @param  {[type]}   null      [description]
 * @return {[type]}            [description]
 */
export const getToken = () => {
    let num = parseInt(sessionStorage.getItem('num'));
    // 重新获取token的次数小于三次
    if (num < 3) {
        // 失效次数
        sessionStorage.setItem('num', (num += 1));
        // uid
        let uid = Math.random()
            .toString(36)
            .substr(2);
        // 时间戳
        let timestamp = Date.parse(new Date());
        //获取存储的登录信息
        let temptLogin = JSON.parse(sessionStorage.getItem('infor'));
        let temtpd = uid + md5(temptLogin.pd) + timestamp;
        axios
            .post('/index.php?c=App&a=getToken', {
                username: temptLogin.un,
                password: temtpd,
                uniqueID: uid,
                timestamp: timestamp,
                dpi_version: 'H5',
            })
            .then(function(response) {
                if (response.data.errcode === 0) {
                    // 更新存储token
                    sessionStorage.setItem('token', response.data.content.access_token);
                    //刷新页面
                    location.reload;
                } else {
                    /*Toast({
                        message: "异地登录",
                        duration: 1500
                    });*/
                    setTimeout(function() {
                        sessionStorage.clear();
                        router.replace({
                            path: '/login',
                        });
                    }, 1500);
                    return false;
                }
            });
    } else {
        // 如果超过三次，提示错误
        Toast({
            message: '登录超时',
            duration: 1500,
        });
        setTimeout(function() {
            sessionStorage.clear();
            router.replace({
                path: '/login',
            });
        }, 1500);
        return false;
    }
};

// 建立一个可存取到该file的url
export const getObjectURL = file => {
    let url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
};
// 设置失焦
export const inputBlur = refs => {
    refs.blur();
};
/**
 * 对象数组排序
 * @param  {Array}  rawData 原始数据数组
 * @param  {String} way     排序方式
 * @return {Array}          排序后结果
 */
export const sortObj = (rawData, way) => {
    let keys = Object.keys(rawData);
    let tempData = {};
    const compare = () => {
        return (val0, val1) => {
            let result = 0;
            switch (way) {
                // 从大到小
                case 'desc':
                    if (val0 < val1) {
                        result = 1;
                    } else if (val0 > val1) {
                        result = -1;
                    } else {
                        result = 0;
                    }
                    break;
                // 从小到大
                case 'asce':
                    if (val0 < val1) {
                        result = -1;
                    } else if (val0 > val1) {
                        result = 1;
                    } else {
                        result = 0;
                    }
                    break;
                default:
                    break;
            }
            return result;
        };
    };
    keys.sort(compare());
    for (let i = 0; i < keys.length; i++) {
        tempData[keys[i]] = rawData[keys[i]];
    }
    return tempData;
};

/**
 * 检查是否有空格
 * @param  {Array}  name name
 * @return {Array}
 */
export const checkFormat = name => {
    // 验证输入内容格式
    if (name.indexOf(' ') > -1) {
        Toast({
            message: '请不要用空格。',
            duration: 3000,
        });
        // this.showHint = true;
        return false;
    }
    // 判断头部或尾部是否含有'-' S
    var hasStr = name.slice(0, 1) == '-';
    var haslast = name.slice(name.length - 1, name.length) == '-';
    if (hasStr || haslast) {
        Toast({
            message: '“-”不能放在开头或结尾。',
            duration: 3000,
        });
        return false;
    }
    // 判断头部或尾部是否含有'-' E

    // 判断头是否含有特殊字符 S
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (regEn.test(name) || regCn.test(name)) {
        Toast({
            message: '请不要用特殊字符（如!、$、&等）。',
            duration: 3000,
        });
        return false;
    }
    return true;
};

/**
 * 获取品牌顾问工号
 * @param  {String}  id id
 * @return {String}
 */
export const getSalesCode = (id, mark) => {
    axios
        .post('index.php?c=App&a=getSalesCode', {
            id: id,
            mark: mark,
        })
        .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
                let item = {
                    key: 0,
                    isShow: Store.state.saleMember.isShow,
                    list: _data.content.list,
                };
                // 设置选择品牌顾问
                hub.$emit('send-salecode', {
                    salecode: _data.content.code,
                });
                Store.commit(MutationTypes.SET_SALE_MEMBER, item);
            }
        });
};

/**
 * 计算商标分类价格
 * @param  {String} list //分类数据
 * @param  {String} type //商标、点商标
 * @return {String} 返回价格
 */
export const countClassPrice = (list, type) => {
    // 价格
    let bsPrice = 1200;
    let keyPrice = 200;
    // 如果是商标
    if (type === 'bs') {
        bsPrice = 1500;
        keyPrice = 150;
    }
    // 计算大类
    let len = Object.keys(list).length;
    let bigPrice = 0;
    if (len >= 1) {
        bigPrice = (len - 1) * bsPrice;
    }
    // 计算小类
    let smallArrl = [];
    let smallPrice = 0;
    for (let key in list) {
        smallArrl.push(list[key].length);
    }
    for (let i = 0; i < smallArrl.length; i++) {
        if (smallArrl[i] > 10) {
            smallPrice += (smallArrl[i] - 10) * keyPrice;
        }
    }

    return bigPrice + smallPrice;
};

/**
 * 打开推荐品牌顾问弹窗
 * @param  {String}  index
 * @return {String}
 */
export const showSaleBox = index => {
    let item = {
        key: index,
        isShow: true,
        list: Store.state.saleMember.list,
    };
    Store.commit(MutationTypes.SET_SALE_MEMBER, item);
};
/**
 * 关闭推荐品牌顾问弹窗
 * @param  {String}
 * @return {String}
 */
export const closeSaleBox = () => {
    let item = {
        key: 0,
        isShow: false,
        list: Store.state.saleMember.list,
    };
    Store.commit(MutationTypes.SET_SALE_MEMBER, item);
};

/**
 * 验证手机号
 * @param {String} mobile mobile
 * @return {Boolean}
 * 使用示例：
 * 1、引入：import * as utils from '@/utils/index';
 * 2、使用：utils.isMobile(mobile);
 */
export const isMobile = mobile => {
    let regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!regMobile.test(mobile)) {
        Toast({
            message: '请输入正确手机号',
            duration: 2000,
        });
        return false;
    }
    return true;
};

/**
 * 验证邮箱
 * @param {String} email email
 * @return {Boolean}
 * 使用示例：
 * 1、引入：import * as utils from '@/utils/index';
 * 2、使用：utils.isEmail(email);
 */
export const isEmail = email => {
    let regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!regEmail.test(email)) {
        Toast({
            message: '请输入正确邮箱',
            duration: 2000,
        });
        return false;
    }
    return true;
};

/**
 * 禁用浏览器返回
 * 使用示例：
 * 1、引入：import * as utils from '@/utils/index';
 *    或者：import {prohibitGoback} from '@/utils/index';
 * 2、使用：utils.prohibitGoback();
 *    或者：prohibitGoback();
 */
export const prohibitGoback = () => {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });
};

/**
 * 清除会话储存内容，除了token
 * 使用示例：
 * 1、引入：import * as utils from '@/utils/index';
 *    或者：import {clearSession} from '@/utils/index';
 * 2、使用：utils.clearSession();
 *    或者：clearSession();
 */
export const clearSession = () => {
    if (sessionStorage.token) {
        let token = sessionStorage.token;
        sessionStorage.clear();
        localStorage.clear();
        sessionStorage.token = token;
    }
};
