import axios from "axios";
import Qs from "qs";

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
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
