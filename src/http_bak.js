import axios from "axios";
import Qs from "qs";
import {Indicator} from 'mint-ui';

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
      config.data = config.data; //防止post请求参数无法传到后台
    }
		config.data = {
				...config.data,
				access_token:sessionStorage.token
		}
		config.data = Qs.stringify(config.data);
		//请求loading
		Indicator.open({
			text: '加载中...',
			spinnerType: 'fading-circle'
		});
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(function(config){
	//隐藏loading
	Indicator.close();
	//获取到config中的data,进行加工
	return config;
})
export default axios;
