<template>
  <div class="fill_information">
    <nav-header title="商标申请"></nav-header>
    <div class="con_box containerView-main">
      <div class="list_box">
        <div class="title">商标信息</div>

        <div class="list_item">
          <span>商标类型</span>
          <select v-model="typeN" @change="choiceType(typeN)">
            <option :value="item.value" v-for="(item,index) of typeArr" :key="index">{{item.name}}</option>
          </select>
          <span class="icon_r"></span>
        </div>
        <div class="list_item">
          <span>商标名称</span>
          <input
            type="text"
            :readonly="typeN == '1'? true :false"
            v-model="text"
            placeholder="文字商标和组合商标才需要填写"
          >
        </div>
        <div class="list_item">
          <span>商标类别</span>
          <!-- <select v-model="qualifications_txt" @change="choiceQuali()">
					    <option :value="qualification.name" v-for="(qualification,index) in qualifications" :key="qualification.key">{{qualification.name}}</option>
          </select>-->
          <span class="icon_r"></span>
        </div>
      </div>
      <!-- 申请主体 -->
      <div class="list_box">
        <div class="title">申请主体</div>
        <div class="list_item">
          <span>主体名称</span>
          <select v-model="corpname" @change="choiceCorpname()">
            <option
              :value="item.corpname"
              v-for="(item,index) in some"
              :key="item.corpid"
            >{{item.corpname}}</option>
          </select>
          <span class="icon_r"></span>
        </div>
        <div class="list_item">
          <span>联系人</span>
          <input type="text" v-model="data.linkman" readonly="readonly">
        </div>
        <div class="list_item">
          <span>联系电话</span>
          <input type="text" v-model="data.mobile" readonly="readonly">
        </div>
        <div class="list_item">
          <span>联系邮箱</span>
          <input type="text" v-model="data.email" readonly="readonly">
        </div>
        <div class="list_item">
          <span>详细地址</span>
          <input type="text" v-model="data.address" readonly="readonly">
        </div>
      </div>
    </div>
    <div class="fill_bottom">
      <div class="bottom_l">
        <p>总计 :</p>
        <p class="all_price">￥320.00元</p>
      </div>
      <div class="bottom_r">
        <div class="addCard">加入清单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "fill_information",
  data() {
    return {
      text: this.$route.query.text, //搜索过来的名字
      year: 1, //年限
      qualifications: [], //资质类型
      qualifications_txt: "", //选中资质类型
      price: this.$route.query.price, //费用
      token: "",
      data: {}, //默认第一条主体数据
      some: [], //所有主体数据
      corpname: "", //主题名字
      length: "",
      typeArr: [
        {
          name: "文字商标",
          value: 0
        },
        {
          name: "图形商标",
          value: 1
        },
        {
          name: "文字图形组合商标",
          value: 2
        }
      ],
      typeN: 0
    };
  },
  created() {
    this.init(); //请求主题数据
    this.intell(); //请求资质数据
  },
  methods: {
    init() {
      if (sessionStorage.token) {
        this.token = sessionStorage.token;
      }
      let _this = this;
      console.log(_this.token);
      // 获取主体名称
      _this.$axios
        .post("index.php?c=App&a=getRegisterSubject", {
          access_token: _this.token
        })
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.some = response.data.content;
            _this.length = _this.some.length; //总共有多少条主题信息
            _this.data = _this.some[0]; //默认赋值第一条
            _this.corpname = _this.some[0].corpname; //默认赋值第一个主体信息
          } else {
            // Toast({
            // 	message: response.data.errmsg,
            // 	duration: 3000
            // });
          }
        })
        .catch(function(error) {
          Toast({
            message: "网络异常，请稍后再试",
            duration: 3000
          });
        });
    },
    //修改类型
    choiceType(val) {
      console.log(this.typeN);
      if (val == "1") {
        this.text = "";
      }
    },

    //修改主体信息
    choiceCorpname() {
      let _this = this;
      for (let i = 0; i < _this.length; i++) {
        //判断选中第几条主体信息，更改data内容
        if (_this.corpname == _this.some[i].corpname) {
          _this.data = _this.some[i];
        }
      }
    },

    intell() {
      let _this = this;
      _this.$axios
        .get("index.php?c=App&a=getDzpType")
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.qualifications = response.data.content;
            _this.qualifications_txt = _this.qualifications[0].name; //默认选中第一个
          } else {
            Toast({
              message: response.data.errmsg,
              duration: 3000
            });
          }
        })
        .catch(function(error) {
          Toast({
            message: "网络异常，请稍后再试",
            duration: 3000
          });
        });
    }
  }
};
</script>

