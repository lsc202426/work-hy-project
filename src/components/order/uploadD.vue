<template>
  <div id="feekbook" class="feekbook">
    <nav-header title="上传凭证"></nav-header>
    <div class="feekbook-box containerView-main">
      <div class="textarea-block upload-msg">
        <p class="tips">汇款信息</p>
        <p class="infor">户名：{{ bankInfo.accountname }}</p>
        <p class="infor">账户：{{ bankInfo.bankaccount }}</p>
        <p class="infor">开户行：{{ bankInfo.bankname }}</p>
      </div>
      <div class="feekbook-upload upload-msg-img">
        <p class="upload-til">汇款凭证</p>
        <div class="voucher-center">
          <div class="voucher-case" v-if="imgcode != ''">
            <div class="img_minus setDelBtn-img-hook">
              <div
                class="img-voucher"
                v-bind:style="{
                  backgroundImage:
                    'url(' + imgcode + ')'
                }"
              ></div>
            </div>
            <!-- 删除的小图标 -->
            <img
              src="../../assets/images/user/icon_remove.png"
              class="del-icon setDelBtn-el-hook"
              v-show="imgcode != ''"
              @click="del_img()" />
          </div>
          <!-- 默认图片 -->
          <div class="voucher-case">
            <div class="img_minus setDelBtn-img-hook">
              <label for>
                <div class="img-voucher">
                  <img src="../../assets/images/user/upload-img.png" alt />
                  <span>上传</span>
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
      imgArr: [],
      orderId: this.$route.query.order,
      ids: this.$route.query.ids,
      bankInfo: {},
      imgcode: '',
      attachment: ''
    }
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg(){
        var _this = this;
        
        _this.$axios
          .post("/index.php?c=App&a=getBanks", {
            order_no: _this.orderId
          })
          .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
              _this.bankInfo = _data.content;
            }
          })
          .catch(function(error) {
            
          });
    },
    // 点击删除
    del_img(){
      this.imgcode = '';
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
     /*   if (_this.imgArr.length == 3) {
        Toast({
          message: "上传凭证不可超过3张",
          duration: 3000
        });
        return;
      } */
      var files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = function() {
        
        _this.attachment = this.result.replace(
          /^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
          ""
        );

        _this.imgcode = this.result;
        // _this.$axios
        //   .post("index.php?c=App&a=uploadAttachment", {
        //     filename: files.name,
        //     file_base64: imgcode
        //   })
        //   .then(function(response) {
            // _this.imgArr = _this.imgcode;
            _this.getRemoveRight();
        //   })
        //   .catch(function(error) {
        //     
        //   });
      };
    },
    submitMsg() {
      var _this = this;
      if (_this.imgcode == 0) {
        Toast({
          message: "请上传汇款凭证",
          duration: 3000
        });
        return;
      }
      this.$axios
        .post("index.php?c=App&a=uploadPaymentAttachmet", {
          pay_id: _this.ids,
          attachment: _this.attachment
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
            setTimeout(() => {
              _this.$router.push({
                  path: "/playSuccess",
                  query:{
                      out_order_no: response.data.content.out_order_no
                  }
              });
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
