<template>
  <div class="add-subject">
    <nav-header></nav-header>
    <div class="add-subject-main">
      <h1 class="add-subject-main-title">新增主体</h1>
      <div class="add-subject-main-list">
        <label>类型：</label>
        <select
          v-model="corptype"
          class="select-box"
          :readonly="status === '1' ? 'readonly' : false"
        >
          <option
            v-for="option in options"
            v-bind:value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="add-subject-main-list">
        <label>主体名称</label>
        <input
          type="text"
          v-model="name"
          :readonly="status === '1' ? 'readonly' : false"
          placeholder="请输入主体名称"
        />
      </div>
      <div class="add-subject-main-list">
        <label>证件号码</label>
        <input
          type="text"
          v-model="card_no"
          :readonly="status === '1' ? 'readonly' : false"
          placeholder="请输入证件号码"
        />
      </div>
      <div class="add-subject-main-list">
        <label>联系人</label>
        <input
          type="text"
          v-model="linkman"
          :readonly="status === '1' ? 'readonly' : false"
          placeholder="请输入联系人"
        />
      </div>
      <div class="add-subject-main-list">
        <label>联系电话</label>
        <input type="text" v-model="phone" placeholder="请输入联系电话" />
      </div>
      <div class="add-subject-main-list">
        <label>联系手机</label>
        <input type="text" v-model="mobile" placeholder="请输入联系手机" />
      </div>
      <div class="add-subject-main-list">
        <label>邮箱</label>
        <input type="text" v-model="email" placeholder="请输入邮箱" />
      </div>
      <div class="add-subject-main-list">
        <label>联系地址</label>
        <!-- <input type="text" placeholder="请选择省/市/区" /> -->
        <p class="mcc" @click.stop="selectBtn" v-if="isFirst">
          {{ province }} {{ city }} {{ area }}
        </p>
        <p class="mcc" @click.stop="selectBtn" v-else>请选择省/市/区</p>
      </div>
      <div class="add-subject-main-list">
        <label>详细地址</label>
        <input type="text" v-model="address" placeholder="请输入详细地址" />
      </div>
      <div class="upload">
        <p class="upload-title">{{ upLoadText }}</p>
        <div class="upload-main">
          <div
            class="upload-item"
            v-for="(value, index) in attachments"
            v-show="
              (parseInt(corptype) !== 1 && index < 1) ||
                parseInt(corptype) === 1
            "
            :key="value + index"
            v-bind:style="{
              backgroundImage: value
                ? 'url(' + 'http://oapi.huyi.cn:6180/' + value
                : '' + ')'
            }"
          >
            <i class="cover" v-show="!value"></i>
            <span class="close" @click="closeBtn(index)" v-show="value"></span>
            <p
              class="text"
              v-show="!value && parseInt(corptype) === 1 && index === 0"
            >
              上传正面
            </p>
            <p
              class="text"
              v-show="!value && parseInt(corptype) === 1 && index === 1"
            >
              上传反面
            </p>
            <p
              class="text"
              v-show="!value && parseInt(corptype) !== 1 && index === 0"
            >
              上传
            </p>
            <input
              type="file"
              :disabled="status === '1' ? 'disabled' : false"
              @change="toBase64($event, index)"
              class="upload-img"
            />
          </div>
        </div>
      </div>
      <button class="submit" @click="submitBtn">提交</button>
    </div>
    <div class="add-subject-bottom" v-show="isShow">
      <div class="add-subject-bottom-box" v-clickoutside="hideBox">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </div>
</template>
<script>
// import * as utils from "@/utils/index";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      upLoadText: "上传身份证",
      options: [
        { text: "个人", value: "1" },
        { text: "企业", value: "2" },
        { text: "组织机构", value: "3" },
        { text: "个体工商户", value: "4" }
      ],
      temptData: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right",
          defaultIndex: 0
        },
        {
          flex: 1,
          values: [],
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "left"
        }
      ],
      mp: "",
      mc: "",
      isShow: false,
      // 主体类型
      corptype: "1",
      // 主体名称
      name: "",
      // 证件号码
      card_no: "",
      // 联系人
      linkman: "",
      // 手机
      mobile: "",
      // 联系电话
      phone: "",
      //邮箱
      email: "",
      // 省
      province: "",
      // 市
      city: "",
      // 区
      area: "",
      //详细地址
      address: "",
      // 上传图片
      attachments: ["", ""],
      isFirst: 0,
      // 暂存主体id
      temptId: this.$route.query.id ? this.$route.query.id : "",
      // 主体状态
      status: "0"
    };
  },
  watch: {
    corptype: function() {
      switch (parseInt(this.corptype)) {
        case 1:
          this.upLoadText = "上传身份证";
          break;
        case 2:
          this.upLoadText = "上传营业执照";
          break;
        case 3:
          this.upLoadText = "上传组织机构代码证";
          break;
        case 4:
          this.upLoadText = "上传营业执照";
          break;
        default:
      }
    }
  },
  methods: {
    // 显示
    selectBtn: function() {
      this.isShow = true;
      this.isFirst += 1;
    },
    // 隐藏
    hideBox: function() {
      this.isShow = false;
    },
    onValuesChange(picker, values) {
      const that = this;
      if (that.temptData && that.temptData.length > 0) {
        //   如果省改变
        if (that.mp != values[0]) {
          let temptProvince = [];
          that.temptData.map(function(item) {
            if (values[0] === item.name) {
              item.city.map(function(c) {
                temptProvince.push(c.name);
              });
              picker.setSlotValues(1, temptProvince);
              that.mp = values[0];
              that.mc = values[1];
            }
          });
        }
        // 当市出现变化的时候
        if (that.mc != values[1]) {
          that.temptData.map(function(item) {
            if (values[0] === item.name) {
              item.city.map(function(c) {
                if (values[1] === c.name) {
                  picker.setSlotValues(2, c.districtAndCounty);
                }
              });
            }
          });
        }
        that.province = values[0];
        that.city = values[1];
        that.area = values[2];
      }
    },
    // 清除
    closeBtn: function(index) {
      this.attachments[index] = "";
      // 数据结果太深，强制渲染
      this.$forceUpdate();
    },
    // 上传图片
    toBase64(e, index) {
      var that = this;
      let files = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = function() {
        let imgcode = this.result.replace(
          /^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
          ""
        );
        that.$axios
          .post("/index.php?c=App&a=uploadAttachment", {
            filename: files.name,
            file_base64: imgcode
          })
          .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
              that.attachments[index] = _data.content.url;
              // 数据结果太深，强制渲染
              that.$forceUpdate();
            }
          });
      };
    },
    // 获取省市区
    getProvinceCity: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getProvinceCity", {})
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            that.temptData = _data.content;
            for (let i = 0; i < that.temptData.length; i++) {
              that.slots[0].values.push(that.temptData[i].name);
            }
            for (let i = 0; i < that.temptData[0].city.length; i++) {
              that.slots[1].values.push(that.temptData[0].city[i].name);
            }
            for (
              let i = 0;
              i < that.temptData[0].city[0].districtAndCounty.length;
              i++
            ) {
              that.slots[2].values.push(
                that.temptData[0].city[0].districtAndCounty[i]
              );
            }
          }
        });
    },
    // 提交
    submitBtn: function() {
      const that = this;
      let textTips = "";
      if (!that.name) {
        textTips = "请输入主体名称";
      } else if (!that.linkman) {
        textTips = "请输入联系人";
      } else if (!that.phone) {
        textTips = "请输入联系电话";
      } else if (!that.mobile) {
        textTips = "请输入联系手机";
      } else if (!that.email) {
        textTips = "请输入邮箱";
      } else if (!that.address) {
        textTips = "请输入详细地址";
      }
      if (textTips) {
        Toast({
          message: textTips,
          duration: 1500
        });
        return false;
      }
      that.$axios
        .post("/index.php?c=App&a=setCorpSubject", {
          // 主体类型
          corptype: that.corptype,
          // 主体名称
          name: that.name,
          // 证件号码
          card_no: that.card_no,
          // 联系人
          linkman: that.linkman,
          // 手机
          mobile: that.mobile,
          // 联系电话
          phone: that.phone,
          //邮箱
          email: that.email,
          // 省
          province: that.province,
          // 市
          city: that.city,
          // 区
          area: that.area,
          //详细地址
          address: that.address,
          // 文件名
          attachments: that.attachments
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            Toast({
              message: _data.errmsg,
              duration: 1500
            });
            setTimeout(function() {
              that.$router.push({
                path: "/subjectList"
              });
            }, 1500);
          }
        });
    },
    // 当未编辑时，获取主体详情
    getSubjectInfo: function(id) {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getSubjectInfo", {
          id: id
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            // 主体类型
            that.corptype = _data.content.corptype;
            // 主体名称
            that.name = _data.content.name;
            // 证件号码
            that.card_no = _data.content.card_no;
            // 联系人
            that.linkman = _data.content.linkman;
            // 手机
            that.mobile = _data.content.mobile;
            // 联系电话
            that.phone = _data.content.phone;
            //邮箱
            that.email = _data.content.email;
            // 省
            that.province = _data.content.province;
            // 市
            that.city = _data.content.city;
            // 区
            that.area = _data.content.area;
            //详细地址
            that.address = _data.content.address;
            // 文件名
            that.attachments = _data.content.attachments;
            // 主体状态
            that.status = _data.content.status;
            that.isFirst = 1;
          }
        });
    }
  },
  created() {
    this.getProvinceCity();
    if (this.temptId) {
      this.getSubjectInfo(this.temptId);
    }
  }
};
</script>
