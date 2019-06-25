import axios from "axios";
import Qs from "qs";
import { Indicator, Toast } from "mint-ui";

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
      config.data = Qs.stringify(config.data); //防止post请求参数无法传到后台
    }
		config.data = {
				...config.data,
				access_token:sessionStorage.token
		}
		config.data = qs.stringify(config.data);
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
const that = this;
// 响应拦截
axios.interceptors.response.use(
  function(res) {
    // 如果账号在其他地方登陆
    if (res.data.content.errcode === 10002) {
      //  提示错误
      Toast({
        message: res.data.content.errmsg,
        duration: 1500
      });
      setTimeout(function() {
        sessionStorage.clear();
        that.$router.replace({
          path: "/login"
        });
      }, 1500);
      return false;
    }
    //隐藏loading
    Indicator.close();
    return res;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default axios;
