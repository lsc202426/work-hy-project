import axios from "axios";
import Qs from "qs";
import { Indicator, Toast } from "mint-ui";
import router from "./router.js";
import * as utils from "@/utils/index";

if (process.env.NODE_ENV === "development") {
  // 设置默认本地axios提交url
  axios.defaults.baseURL = "http://oapi.huyi.cn:6180/";
} else {
  // 设置默认线上axios提交url
  axios.defaults.baseURL = "http://oapi.huyi.cn:6180/";
}
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.request.use(
  config => {
    if (config.method == "post") {
      // eslint-disable-next-line no-self-assign
      config.data = config.data; //防止post请求参数无法传到后台
    }
    config.data = {
      ...config.data,
      access_token: sessionStorage.token
    };
    config.data = Qs.stringify(config.data);
    //请求loading
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
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
    if (res.data.errcode === "10002") {
      //  提示错误
      Toast({
        message: "异地登录",
        duration: 1500
      });
      setTimeout(function() {
        sessionStorage.clear();
        router.replace({
          path: "/login"
        });
      }, 1500);
      return false;
    }
    // 授权失效小于三次续补
    else if (res.data.errcode === "10003") {
      utils.getToken();
    }
    // errcode 0
    else if (res.data.errcode === "-1") {
      Toast({
        message: "操作失败",
        duration: 1500
      });
    }
    return res;
  },
  function(error) {
    Toast({
      message: "服务器异常",
      duration: 1500
    });
    return Promise.reject(error);
  }
);
export default axios;
