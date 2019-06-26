import axios from "axios";
import { Toast } from "mint-ui";
import router from "@/router.js";
import md5 from "js-md5";

/**
 * 获取token
 * @param  {[type]}   null      [description]
 * @return {[type]}            [description]
 */
export const getToken = () => {
  let num = parseInt(sessionStorage.getItem("num"));
  // 重新获取token的次数小于三次
  if (num < 3) {
    // 失效次数
    sessionStorage.setItem("num", (num += 1));
    // uid
    let uid = Math.random()
      .toString(36)
      .substr(2);
    // 时间戳
    let timestamp = Date.parse(new Date());
    //获取存储的登录信息
    let temptLogin = JSON.parse(sessionStorage.getItem("infor"));
    let temtpd = uid + md5(temptLogin.pd) + timestamp;
    axios
      .post("/index.php?c=App&a=getToken", {
        username: temptLogin.un,
        password: temtpd,
        uniqueID: uid,
        timestamp: timestamp,
        dpi_version: "H5"
      })
      .then(function(response) {
        if (response.data.errcode === 0) {
          // 更新存储token
          sessionStorage.setItem("token", response.data.content.access_token);
          //刷新页面
          location.reload;
        }
      });
  } else {
    // 如果超过三次，提示错误
    Toast({
      message: "登录超时",
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
};
