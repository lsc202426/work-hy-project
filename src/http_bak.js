import axios from 'axios';
import Qs from 'qs';
import { Indicator, Toast } from 'mint-ui';
import router from './router.js';
import config from '@/utils/configs.js';

if (process.env.NODE_ENV === 'development') {
    // 设置默认本地axios提交url
    axios.defaults.baseURL = config.api.public_domain;
} else {
    // 设置默认线上axios提交url
    axios.defaults.baseURL = config.api.public_domain;
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            // eslint-disable-next-line no-self-assign
            config.data = config.data; //防止post请求参数无法传到后台
        }
        config.data = {
            ...config.data,
            access_token: sessionStorage.token,
        };
        config.data = Qs.stringify(config.data);
        if (config.url === '/index.php?c=App&a=checkLogin') {
            Indicator.open({
                text: '登录中...',
                spinnerType: 'fading-circle',
            });
        }
        //请求loading
        else if (config.url === '/index.php?c=App&a=setFaceID') {
            Indicator.open({
                text: '人脸识别中...',
                spinnerType: 'fading-circle',
            });
        } else {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle',
            });
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截
axios.interceptors.response.use(
    function(res) {
        //隐藏loading
        Indicator.close();
        // 如果账号在其他地方登陆
        if (res.data.errcode == '10002') {
            //  提示错误
            Toast({
                message: '异地登录',
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
        // 授权失效
        else if (res.data.errcode == '10003' || res.data.errcode == '10001') {
            // utils.getToken();
            //  提示错误
            Toast({
                message: res.data.errmsg ? res.data.errmsg : '登录过期',
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
        // errcode 0
        else if (res.data.errcode == '-1') {
            if (
                res.config.url.indexOf('/index.php?c=App&a=checkLogin') !== -1 ||
                res.config.url.indexOf('/index.php?c=App&a=setFaceID') !== -1
            ) {
                return res;
            }
            Toast({
                message: res.data.errmsg ? res.data.errmsg : '操作失败',
                duration: 1500,
            });
        }
        return res;
    },
    function(error) {
        //隐藏loading
        Indicator.close();
        Toast({
            message: error.errmsg ? error.errmsg : '服务器异常',
            duration: 1500,
        });
        return Promise.reject(error);
    }
);
export default axios;
