<template>
  <div id="editmsg" class="editmsg">
    <nav-header title="编辑资料"></nav-header>
    <div class="edit-msg">
      <div class="edit-list edit-head-port">
        <span>头像</span>
        <div class="user-avatar">
          <div class="user-avatar">
            <div class="user-minus">
              <!-- <img class="head-port" src="../../assets/images/user/head-portairt.png" alt="" v-show="!images"> -->
              <div
                class="head-port"
                :style="{ backgroundImage: 'url(' + imageIntal + ')' }"
                v-show="images == ''"
              ></div>
              <div
                class="head-port"
                :style="{ backgroundImage: 'url(' +'http://oapi.huyi.cn:6180/'+ images + ')' }"
                v-show="images != ''"
              ></div>
              <!-- <img class="head-port" :src="images" alt="" v-show="images"> -->
            </div>
          </div>
          <input type="file" class="change_img" @change="changeImage($event)" />
          <!-- <input type="file" class="change_img" @change="changeImg()"> -->
        </div>
      </div>
      <div class="edit-list">
        <span>昵称</span>
        <p>{{ msgArr.nickname }}</p>
      </div>
      <div class="edit-list username">
        <span>用户名</span>
        <p>{{ msgArr.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "editmsg",
  data() {
    return {
      imageIntal: require("@/assets/images/user/head-portairt.png"),
      images: '',
      msgArr: []
    };
  },
  created() {
    this.getMsg();
    this.getRouter();
  },
  methods: {
    // 更换头像
    changeImage(e) {
      var _this = this;
      var files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      console.log(files)
      reader.onload = function () {
        var imgcode = this.result.replace(
          /^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
          ""
        );
        // console.log(imgcode); //这个就是base64编码
        _this.upload(files.name,imgcode)
      };
    },
    upload(n,imgcode){
      var _this = this;
      _this.$axios.post("index.php?c=App&a=setPortrait", {
        userid: 1,
        filename: n,
        portrait: imgcode
      })
      .then(function(response) {
        _this.images = response.data.content.url;
        Toast({
            message: '更换成功',
            duration: 3000
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    getRouter() {
      // console.log(this.$route.query)
      this.msgArr = this.$route.query;
      this.images = this.msgArr.headPort;
    },
    getMsg() {
      // let _this = this;
      this.$axios
        .post("", {})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss"></style>
