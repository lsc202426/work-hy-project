<template>
  <div id="feekbook" class="feekbook">
    <nav-header title="功能反馈"></nav-header>
    <div class="feekbook-box containerView-main">
      <div class="textarea-block">
        <textarea
          v-model="text"
          name="textarea-body"
          id="textarea-ids"
          placeholder="请输入您要反馈的内容"
        ></textarea>
      </div>
      <div class="feekbook-upload">
        <p class="upload-til">上传凭证（不超过3张）</p>
        <div class="voucher-center">
          <div class="voucher-case" v-for="(item,index) in imgArr" :key="index">
            <div class="img_minus setDelBtn-img-hook" v-show="imgArr.length">
              <div
                class="img-voucher"
                v-bind:style="{
                  backgroundImage:
                    'url(' + 'http://oapi.huyi.cn:6180/' + item + ')'
                }"
              ></div>
            </div>
            <!-- 删除的小图标 -->
            <img
              src="../../assets/images/user/icon_remove.png"
              class="del-icon setDelBtn-el-hook"
              v-show="imgArr[0]"
              @click="del_img($event,index,'imgArr')" />
          </div>
          <!-- 默认图片 -->
          <div class="voucher-case">
            <div class="img_minus setDelBtn-img-hook">
              <label for>
                <div class="img-voucher">
                  <img src="../../assets/images/user/upload-img.png" alt />
                  <span>上传截图</span>
                </div>
                <input
                  type="hidden"
                  class="verify-right-hook"
                  v-model="imgArr[0]"
                />
                <input
                  type="file"
                  id="img_input"
                  name="img_input"
                  @change="toBase64($event)"
                  class="upload-img"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="psw-submit" @click="submitMsg()">
        <span>提交</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { Toast } from "mint-ui";

export default {
  name: "feekbook",

  data() {
    return {
      text: "",
      imgArr: []
    };
  },
  created() {
    // this.getMsg();
  },
  methods: {
    // 点击删除
    del_img(e, i,val){
      var _this = this;
      _this[val].splice(i, 1);
    },
    //  删减号移到右边
    getRemoveRight() {
      this.$nextTick(function() {
        $(".setDelBtn-el-hook").each(function() {
          var el = this;
          var mr = Math.round(
            $(el)
              .siblings(".setDelBtn-img-hook")
              .width()
          );
          $(el).css("margin-left", mr / 100 + "rem");
        });
      });
    },
    // 上传图片
    toBase64(e) {
      var _this = this;
      if (_this.imgArr.length == 3) {
        Toast({
          message: "上传凭证不可超过3张",
          duration: 3000
        });
        return;
      }
      var files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = function() {
        var imgcode = this.result.replace(
          /^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
          ""
        );

        _this.$axios
          .post("index.php?c=App&a=uploadAttachment", {
            filename: files.name,
            file_base64: imgcode
          })
          .then(function(response) {
            _this.imgArr.push(response.data.content.url);
            _this.getRemoveRight();
          })
          .catch(function(error) {
          });
      };
    },
    submitMsg() {
      var _this = this;
      if (_this.text == "") {
        Toast({
          message: "请输入您要反馈的内容",
          duration: 3000
        });
        return;
      }
      this.$axios
        .post("index.php?c=App&a=setFeedback", {
          content: _this.text,
          data: _this.imgArr
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
            setTimeout(() => {
              _this.$router.push("/setting");
            }, 3000);
          }
        })
        .catch(function(error) {
        });
    }
  }
};
</script>

<style lang="scss"></style>
