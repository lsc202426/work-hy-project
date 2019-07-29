<template>
  <div class="fill_information">
    <!-- <nav-header title="商标申请"></nav-header> -->
    <mt-header class="header" fixed>
      <mt-button slot="left" icon="back" @click="goback(pageNum)"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="con_box containerView-main">
      <div class="til-word" v-show="pageNum == 0 || pageNum == 1">
        <div class="title" :class="{ active: pageNum == 0 }" @click="changePage(0)">申请信息</div>
        <div class="title" :class="{ active: pageNum == 1 }" @click="changePage(1)">申请人信息</div>
      </div>
      <div class="list_box" v-if="pageNum == 0">
        <!-- <div class="title">商标信息</div> -->

        <div class="list_item">
          <span>商标类型</span>
          <select v-model="typeN" @change="choiceType(typeK)">
            <option :value="item.name" v-for="(item, index) of typeArr" :key="index">{{ item.name }}</option>
          </select>
          <span class="icon_r" style="transform: rotate(90deg);right: 0.05rem;"></span>
        </div>
        <div class="list_item">
          <span>商标名称</span>
          <input
            type="text"
            v-model="text"
            :readonly="typeK == '2' ? true : false"
            placeholder="文字商标和组合商标才需要填写"
          >
        </div>
        <!-- <div class="list_item">
          <span>商标类别</span>
          <select v-model="cateC" @change="choiceQuali()">
            <option
              :value="item.name"
              v-for="(item, index) in cater"
              :key="item.key"
              >{{ item.name }}</option
            >
          </select>
          <span class="icon_r"></span>
        </div>-->
        <div class="feekbook-upload">
          <p class="upload-til upload-title">上传商标图片</p>

          <div class="upload-msg">
            <div class="voucher-center">
              <div class="voucher-case" v-if="imgcode != ''">
                <div class="img_minus setDelBtn-img-hook">
                  <div
                    class="img-voucher"
                    v-bind:style="{
                        backgroundImage: 'url(' + imgcode + ')'
                    }"
                  ></div>
                </div>
                <!-- 删除的小图标 -->
                <img
                  src="../../assets/images/user/icon_remove.png"
                  class="del-icon setDelBtn-el-hook"
                  v-show="imgcode != ''"
                  @click="del_img()"
                >
              </div>
              <!-- 默认图片 -->
              <div class="voucher-case" v-if="imgcode == ''">
                <div class="img_minus setDelBtn-img-hook">
                  <label for>
                    <div class="img-voucher">
                      <img src="../../assets/images/user/upload-img.png" alt>
                      <span>上传图片</span>
                    </div>
                    <input type="hidden" class="verify-right-hook" v-model="imgArr[0]">
                    <input
                      type="file"
                      id="img_input"
                      name="img_input"
                      @change="toBase64($event)"
                      class="upload-img"
                    >
                  </label>
                </div>
              </div>
            </div>
            <p class="upload-til upload-tips">
              *上传图片大小为小于500K，图片类型只能为*.jpg格式,宽度 < 385px,高度 <
              230px。黑白颜色申请的，请上传黑白图；彩色申请的，请务必上传彩图。
            </p>
          </div>
        </div>
        <div class="list_item" @click="applyClass()">
          <span>类别</span>
          <div class="list_item-tips">
            <p class="tp">请选择类别</p>
            <p>(超出10个类需另付费)</p>
          </div>
          <span class="icon_r"></span>
        </div>
        <!-- 商标选中类别 -->
        <div class="apply-class-item">
            <div class="apply-class-item-list" v-for="(val, index) in getSelectClass.classType" :key="index">
                <h2 class="apply-class-item-list-title">
                    第{{ index.split('、')[0] }}类  {{ index.split('、')[1] }}
                </h2>
                <div class="apply-class-item-list-main">
                    <span v-for="item in getSelectClass.classType[index]" :key="item.id">{{ item.name }}</span>
                </div>
            </div>
        </div>
        
      </div>
      <!-- 申请主体 -->
      <div class="list_box" v-if="pageNum == 1 && hasSubject">
        <div class="list_item" @click.stop="gosubjectList()">
          <span>申请人名称</span>
          <input type="text" readonly="readonly" v-model="some.corpname">

          <span class="icon_r"></span>
        </div>
        <div class="list_item">
          <span>联系人</span>
          <input type="text" v-model="some.linkman" readonly="readonly">
        </div>
        <div class="list_item">
          <span>联系电话</span>
          <input type="text" v-model="some.mobile" readonly="readonly">
        </div>
        <div class="list_item">
          <span>联系邮箱</span>
          <input type="text" v-model="some.email" readonly="readonly">
        </div>
        <div class="list_item">
          <span>详细地址</span>
          <input type="text" v-model="some.address" readonly="readonly">
        </div>
      </div>
      <!-- 确认信息 -->
      <div class="apply-word" v-if="pageNum == 2">
        <h2 class="apply-msg-title">申请信息</h2>
        <div class="apply-msg">
          <div class="msg-top">
            <div class="msg-list">
              <i>商标名</i>
              <span>{{ text }}</span>
            </div>
            <div class="msg-list">
              <i>商标类型</i>
              <span>{{ typeN }}</span>
            </div>
          </div>
          <div class="msg-img">
            <div class="msg-list">
              <i>商标图片</i>
              <div class="voucher-case">
                <div class="img_minus setDelBtn-img-hook">
                  <div
                    class="img-voucher"
                    v-bind:style="{
                                backgroundImage: 'url(' + imgcode + ')'
                            }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="msg-bot msg-list">
            <i>类别</i>
            
            <div class="category">
                <div class="category-list" v-for="(val, index) in getSelectClass.classType" :key="index">
                    <p>第{{ index.split('、')[0] }}类  {{ index.split('、')[1] }}</p>
                    <div class="category-small">
                        <span v-for="item in getSelectClass.classType[index]" :key="item.id">{{ item.name }}</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <h2 class="apply-msg-title">申请人信息</h2>
        <div class="apply-subject">
          <div class="msg-list">
            <i>申请人名称</i>
            <span>{{ corpname }}</span>
          </div>
          <div v-if="data.province" class="msg-list">
            <i>申请人所在区</i>
            <span>{{ data.province }} {{ data.city }} {{ data.area }}</span>
          </div>
          <div v-if="data.phone" class="msg-list">
            <i>企业地址</i>
            <span>{{ data.address }}</span>
          </div>
          <div class="msg-list">
            <i>企业经办人</i>
            <span>{{ data.linkman }}</span>
          </div>
          <div class="msg-list-sp">
            <div v-if="data.mobile" class="msg-list">
              <i>联系电话</i>
              <span>{{ data.mobile }}</span>
            </div>
            <div v-if="data.email" class="msg-list msg-list-rg">
              <i>电子邮箱</i>
              <span>{{ data.email }}</span>
            </div>
          </div>
        </div>
        <div class="money-detail price-list">
          <div class="money-box">
            <div class="detail-list">
              <span class="detail-left">注册费</span>
              <span class="detail-right" v-if="price > 0">{{ price.split('.')[0]}} 元</span>
            </div>
            <div class="detail-list" v-show="parseInt(getSelectClass.allPriceBs * year) > 0">
                <span class="detail-left">新增类别费</span>
                <span class="detail-right">{{ getSelectClass.allPriceBs * year }} 元</span>
            </div>
          </div>
        </div>
        <div class="register-news-rule">
          <i :class="{ active: isAgree == 'true' }" @click="switchAgree"></i>
          <span class="register-news-rule-agree">
            我已阅读
            <span class="register-news-rule-privacy" @click="goAnchor('《申请人须知》','4')">《申请人须知》</span>条款
          </span>
        </div>
      </div>
    </div>
    <div class="money-detail" v-show="pageNum == 0">
        <div class="money-box">
            <div class="detail-list">
                <span class="detail-left">注册费</span>
                <span class="detail-right" v-if="price > 0"> {{ price.split('.')[0] }} 元</span>
            </div>
            <div class="detail-list" v-show="parseInt(getSelectClass.allPriceBs * year) > 0">
                <span class="detail-left">新增类别费</span>
                <span class="detail-right">{{ getSelectClass.allPriceBs * year }} 元</span>
            </div>
        </div>
    </div>
    <!-- 品牌顾问工号 -->
    <div class="brand-consultant" v-show="pageNum == 2">
      <div class="brand-consultant-top">
        <label>品牌顾问工号</label>
        <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号">
      </div>
      <p class="brand-consultant-text">品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：400-628-1118</p>
    </div>
    <div class="fill_bottom">
      <div class="bottom_l">
        <p>总计 :</p>
        <p class="all_price">￥{{ totalMoney }}元</p>
      </div>
      <div class="bottom_r">
        <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0">下一步</div>
        <div class="addCard" @click="next(pageNum)" v-show="pageNum == 1">预览</div>
        <div class="addCard-btn" v-show="pageNum == 2">
          <button class="btn-add" @click="addShopCart()">加入申请列表</button>
          <button class="btn-apply" @click="goPayment()">去付款</button>
        </div>
      </div>
    </div>
    <applyClass :year="year" v-if="getSelectClass.isShow"></applyClass>
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
import $ from 'jquery';
import { Toast, Indicator,MessageBox } from 'mint-ui';
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
import applyClass from '@/components/trademark/applyClass.vue';
import * as utils from '@/utils/index';
export default {
  name: 'fill_information',
  data() {
    return {
      text: sessionStorage.appText ? sessionStorage.appText : '', //搜索过来的名字
      name: sessionStorage.appName ? sessionStorage.appName : this.$route.query.product_name, //搜索过来的名字
      ids: sessionStorage.appIds ? sessionStorage.appIds : this.$route.query.productid, //搜索过来的id
      year: 1, //年限
      qualifications: [], //资质类型
      qualifications_txt: '', //选中资质类型
      price: sessionStorage.appPrice ? sessionStorage.appPrice : this.$route.query.price, //费用
      all_price: sessionStorage.appAppPrice ? sessionStorage.appAppPrice : this.$route.query.price,
      token: '',
      data: {}, //默认第一条主体数据
      some: [], //所有主体数据
      corpname: '', //主题名字
      length: '',
      typeArr: [],
      typeN: '',
      typeK: '',
      cater: [],
      cateC: '',
      cateK: '',
      msg: {}, //加入清单提交内容
      imgArr: [],
      imgcode: sessionStorage.appImgcode ? sessionStorage.appImgcode : '',
      imgcodeLin: '',
      attachment: '',
      imgShow: false,
      pageNum: sessionStorage.pageNum ? sessionStorage.pageNum : 0,
      isAgree: sessionStorage.isAgree ? sessionStorage.isAgree : 'false', // 是否阅读申请人须知
      salesCode: sessionStorage.salesCode ? sessionStorage.salesCode : '',
      hasSubject: false  //是否有申请人信息
    };
  },
  components: {
    applyClass,
  },
  created() {
    this.init(); //请求主题数据
    // this.intell(); //请求资质数据
    this.getCater();
    this.getType();
    if(!sessionStorage.mark){
        sessionStorage.mark = this.$route.query.mark;
    }
    // console.log(this.imgcode,this.imgShow,8855)
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_SELECT_CLASS]]),
    ...mapGetters({
      getSelectClass: [GetterTypes.GET_SELECT_CLASS],
    }),
    totalMoney() {
      let money = 0;
        money = this.year * this.price + this.getSelectClass.allPriceBs * this.year;
        // console.log(this.getSelectClass.allPriceBs)
        return money;
    },
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_SELECT_CLASS]]),
    ...mapMutations({
      [MutationTypes.SET_SELECT_CLASS]: MutationTypes.SET_SELECT_CLASS,
    }),
    // 选择类别
    applyClass: function() {
      let _item = {
        isShow: true,
        content: this.getSelectClass.content,
        classType: this.getSelectClass.classType,
        allPrice: this.getSelectClass.allPrice,
        allPriceBs: this.getSelectClass.allPriceBs,
        applyClass: this.getSelectClass.applyClass,
        temptCurList: this.getSelectClass.temptCurList,
        curList: this.getSelectClass.curList,
        temtpClass: this.getSelectClass.temtpClass,
        temptSelect: this.getSelectClass.temptSelect,
        isShowTotal: true
      };
    //   console.log(_item)
      this[MutationTypes.SET_SELECT_CLASS](_item);
    },
    // 清空缓存数据
    clearTemptData: function() {
      const that = this;
      // 情况

      let _item2 = {
        isShow: false,
        content: [],
        classType: {},
        allPriceBs: 0,
        allPrice: 0,
        applyClass: [],
        temptCurList: {},
        curList: [],
        temtpClass: {},
        temptSelect: {},
      };
      this[MutationTypes.SET_SELECT_CLASS](_item2);
      sessionStorage.removeItem('formUrl');
    },
    //前往申请人须知页面
    goAnchor(type, num) {
      sessionStorage.formUrl = this.$route.path;
      sessionStorage.appIds = this.ids;
      sessionStorage.appName = this.name;
      sessionStorage.appText = this.text;
      sessionStorage.appPrice = this.price;
      sessionStorage.appAppPrice = this.all_price;
      sessionStorage.appImgcode = this.imgcode;
      sessionStorage.pageNum = this.pageNum;

      sessionStorage.isAgree = this.isAgree;
      sessionStorage.salesCode = this.salesCode;

      //console.log(typeof sessionStorage.isAgree)
        // console.log(this.$route.query.mark)
      this.$router.push({
        path: '/aboutPro',
        query: {
          til: type,
          mark: sessionStorage.mark,
          txt_type: num
        },
      });
    },
    //是否阅读申请人须知
    switchAgree() {
        if(this.isAgree=="true"){
            this.isAgree="false";
            sessionStorage.isAgree = this.isAgree;

        }else{
            this.isAgree="true";
            sessionStorage.isAgree = this.isAgree;

        }
    //   this.isAgree = !this.isAgree;
    },
    //修改主体
    gosubjectList() {
      sessionStorage.formUrl = this.$route.path;
      sessionStorage.appIds = this.ids;
      sessionStorage.appName = this.name;
      sessionStorage.appText = this.text;
      sessionStorage.appPrice = this.price;
      sessionStorage.appAppPrice = this.all_price;
      sessionStorage.appImgcode = this.imgcode;
      sessionStorage.pageNum = this.pageNum;
      
      this.$router.push({
        path: '/subjectList',
      });
    },
    //新增主体
    addSubject() {
      sessionStorage.formUrl = this.$route.path;
      sessionStorage.appIds = this.ids;
      sessionStorage.appName = this.name;
      sessionStorage.appText = this.text;
      sessionStorage.appPrice = this.price;
      sessionStorage.appAppPrice = this.all_price;
      sessionStorage.appImgcode = this.imgcode;

      sessionStorage.pageNum = this.pageNum;
      
      this.$router.push({
        path: '/addSubject',
      });
    },

    //点击切换
    changePage(type) {
      var _this = this;
        //console.log(type)
        if(type == 0){
             this.pageNum = type;
            _this.getRemoveRight();

            }else if(type == 1){
                if (_this.text == '' && _this.typeK != 2) {
            Toast({
                message: '请输入商标名称',
                duration: 3000,
            });
            return;
            } else if (_this.imgcode == '') {
            Toast({
                message: '请上传商标图',
                duration: 3000,
            });
            return;
            } else if (!_this.getSelectClass.classType || Object.keys(_this.getSelectClass.classType).length <= 0) {
                Toast({
                    message: '请选择分类',
                    duration: 1500,
                });
                return false;
            } else {
            // _this.pageNum = 1;
             this.pageNum = type;
            }

            if (sessionStorage.subject) {
                _this.getSome()
            } else{
                _this.getApplicant();
            }
        }
    },
    // 点击返回
    goback(num) {
      var _this = this;
      if (num == 0) {
          this.$router.push('/tradeService?mark=bs');
          this.clearTemptData();

      } else if (num == 1) {
        _this.pageNum = 0;
        _this.getRemoveRight();
      } else if (num == 2) {
        _this.pageNum = 1;
        // _this.getRegist();
      }
    },
    // 下一步
    next(num) {
      var _this = this;
      if (num == 0) {
        if (_this.text == '' && _this.typeK != 2) {
          Toast({
            message: '请输入商标名称',
            duration: 3000,
          });
          return;
        } else if (_this.imgcode == '') {
          Toast({
            message: '请上传商标图',
            duration: 3000,
          });
          return;
        } else if (!_this.getSelectClass.classType || Object.keys(_this.getSelectClass.classType).length <= 0) {
            Toast({
                message: '请选择分类',
                duration: 1500,
            });
            return false;
        } else {
          _this.pageNum = 1;
        }
        // _this.getApplicant();
        if (sessionStorage.subject) {
            _this.getSome()
        } else{
            _this.getApplicant();
        }
      } else if (num == 1) {
          if (this.hasSubject) {
                // sessionStorage.subject = JSON.stringify(this.subject);
                // this.$router.push({
                //     path: '/confirmOrder',
                // });
                _this.pageNum = 2;

            } else {
                MessageBox.confirm('', {
                    message: '暂无申请人信息，是否前往新增',
                    title: '提示',
                    showCancelButton: true, //是否显示取消按钮
                    closeOnClickModal: false, //点击遮罩层是否可以关闭
                })
                .then(action => {
                    if (action == 'confirm') {
                        this.addSubject();
                    }
                })
                .catch(err => {
                    if (err == 'cancel') {
                        this.hasSubject = false;
                        //取消的回调
                    }
                });
            }
      }
    },
    init() {
      var _this = this;

      if (sessionStorage.subject) {
        //   console.log(1421)
        _this.getSome()
      } else if(!sessionStorage.subject && _this.pageNum == 1){
        //   console.log(75)

        _this.getApplicant();
      }
    },
    getSome(){
        var _this = this;
        _this.hasSubject = true;

        this.some = JSON.parse(sessionStorage.subject);
        this.address = this.some.province + this.some.city + this.some.area; //联系地址
        this.addressT = this.some.address.replace(this.address, ''); //详细地址
        _this.data = _this.some; //默认赋值第一条
        _this.corpname = _this.some.corpname;
        // _this.imgShow = true;
        // console.log(this.some)
        setTimeout(() => {
            sessionStorage.removeItem('pageNum')
        }, 1000);
        _this.getRemoveRight();
    },
    getApplicant(){
        var _this = this;
        // 获取主体名称
        _this.$axios.post('index.php?c=App&a=getApplicant').then(function(response) {
          if (response.data.errcode == 0) {
            _this.some = response.data.content;
            _this.length = _this.some.length; //总共有多少条主题信息
            _this.data = _this.some; //默认赋值第一条
            sessionStorage.subject = JSON.stringify(_this.some);

            _this.corpname = _this.some.corpname; //默认赋值第一个主体信息
            _this.hasSubject=true;

          } else {
            _this.hasSubject=false;
            MessageBox.confirm("", {
                    message: response.data.errmsg+"，是否前往新增",
                    title: "提示",
                    showCancelButton: true,//是否显示取消按钮
                    closeOnClickModal:false,//点击遮罩层是否可以关闭
                })
                .then(action => {
                    if (action == "confirm") {
                        _this.addSubject();
                    }
                })
                .catch(err => {
                    if (err == "cancel") {
                        _this.hasSubject=false;

                        //取消的回调
                    }
                });
          }
        });
    },
    getType() {
      var _this = this;
      _this.$axios
        .post('index.php?c=App&a=getBsType', {})
        .then(function(response) {
          if (response.data.errcode == 0) {
            _this.typeArr = response.data.content;
            _this.typeN = response.data.content[0].name;
            _this.typeK = response.data.content[0].key;
          }
        })
        .catch(function(error) {
          Toast({
            message: error.data.errmsg,
            duration: 3000,
          });
        });
    },
    // 点击删除
    del_img() {
      var _this = this;
      _this.imgShow = false;
      _this.imgcode = '';
    },
    //  删减号移到右边
    getRemoveRight() {
      this.$nextTick(function() {
        $('.setDelBtn-el-hook').each(function() {
          var el = this;
          var mr = Math.round(
            $(el)
              .siblings('.setDelBtn-img-hook')
              .width()
          );
          $(el).css('margin-left', mr / 100 + 'rem');
        });
      });
    },
    // 上传图片
    toBase64(e) {
      var _this = this;

      var files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
    //   console.log(files.name)
      if (files.name.split('.')[1] != 'jpg' && files.name.split('.')[1] != 'jpeg') {
        Toast({
          message: '请上传jpg格式图片',
          duration: 3000,
        });
        return;
      }
      if (parseInt(files.size) > 500000) {
        Toast({
          message: '请上传小于500k的图片',
          duration: 3000,
        });
        return;
      }

      reader.onload = function() {
        _this.attachment = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
        _this.imgcodeLin = this.result;
        _this.$axios
          .post('index.php?c=App&a=uploadAttachment', {
            filename: files.name,
            file_base64: _this.attachment,
            limit: 'jpg,jpeg',
            size: '500000*385*230',
          })
          .then(function(response) {
            if (response.data.errcode == 0) {
              _this.imgcode = _this.imgcodeLin;
              _this.imgShow = true;
              _this.attachment = response.data.content.url;
            } else {
              Toast({
                message: response.data.errmsg,
                duration: 3000,
              });
            }
            // _this.imgArr.push(response.data.content.url);
            _this.getRemoveRight();
          })
          .catch(function() {
            _this.imgShow = false;
          });
      };
    },

    //加入清单
    addShopCart() {
      let _this = this;

      if (this.isAgree == 'false') {
        Toast({
          message: '请先阅读《申请人须知》条款',
          duration: 1500,
        });
        return;
      } else if (_this.salesCode === '') {
        Toast({
          message: '请输入品牌顾问工号',
          duration: 1500,
        });
        return;
      }else if (!utils.checkFormat(_this.salesCode)) {
            return false;
        } else {
        Indicator.open({
          text: '正在检测品牌顾问',
          spinnerType: 'fading-circle',
        });
        setTimeout(() => {
          _this.$axios
            .post('index.php?c=App&a=checkSalesCode', {
              sales_code: _this.salesCode,
            })
            .then(function(response) {
              let _data = response.data;
              //console.log(response);
              if (_data.errcode === 0) {
                Indicator.open({
                  text: '正在提交',
                  spinnerType: 'fading-circle',
                });
                _this.msg.productid = _this.ids; //产品id
                _this.msg.product_name = _this.name; //产品名称
                _this.msg.feetype = 'Z'; //服务类型

                _this.msg.bs_type = _this.typeK; //类型key
                _this.msg.bs_name = _this.text; //商标名称
                _this.msg.bs_class = _this.cateK; //类别key
                _this.msg.bs_attachment = _this.attachment; //图形商标
                _this.msg.class_detail = _this.getSelectClass.content,//商标分类
                _this.msg.other_class_fee = _this.getSelectClass.allPriceBs,
                _this.msg.price = _this.price; //单价
                _this.msg.total = _this.price; //总价
                _this.msg.subject = {}; //主体信息
                _this.msg.subject.id = _this.data.corpid; //主体id
                _this.msg.subject.name = _this.data.corpname; //名字
                _this.msg.subject.linkman = _this.data.linkman; //联系人
                _this.msg.subject.phone = _this.data.phone ? _this.data.phone : _this.data.mobile; //联系电话
                _this.msg.subject.email = _this.data.email; //邮箱
                _this.msg.subject.address = _this.data.address; //地址
                // _this.msg.sales_code = _this.data.salesCode; //品牌顾问
                
                let message = JSON.stringify(_this.msg);
                setTimeout(function() {
                  //提交数据
                  _this.$axios
                    .post('index.php?c=App&a=setWishlist', {
                      data: message,
                      sales_code: _this.salesCode
                    })
                    .then(function(response) {
                      setTimeout(function() {
                        Indicator.close();
                      }, 10);
                      if (response.data.errcode == 0) {
                        Toast({
                          message: response.data.errmsg,
                          duration: 1000,
                        });
                        sessionStorage.product = JSON.stringify(response.data.content.product);
                        _this.clearTemptData();
                        setTimeout(function() {
                          //请求成功跳转清单列表页
                            _this.$router.push({
                              path: '/addSuccess',
                            });
                        }, 1000);
                      } else {
                        Toast({
                          message: response.data.errmsg,
                          duration: 1500,
                        });
                      }
                    })
                    .catch(function(error) {
                      setTimeout(function() {
                        Indicator.close();
                      }, 10);
                      Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                      });
                    });
                }, 2000);
              } else {
                Toast({
                  message: _data.errmsg,
                  duration: 1500,
                });
              }
            });
        }, 2000);
      }
    },
    // 去付款
    goPayment() {
      let _this = this;
      if (this.isAgree == 'false') {
        Toast({
          message: '请先阅读《申请人须知》条款',
          duration: 1500,
        });
        return;
      } else if (_this.salesCode === '') {
        Toast({
          message: '请输入品牌顾问工号',
          duration: 1500,
        });
        return;
      }else if (!utils.checkFormat(_this.salesCode)) {
        return false;
      } else {
        Indicator.open({
          text: '正在检测品牌顾问',
          spinnerType: 'fading-circle',
        });
        setTimeout(() => {
          _this.$axios
            .post('index.php?c=App&a=checkSalesCode', {
              sales_code: _this.salesCode,
            })
            .then(function(response) {
              let _data = response.data;
              //console.log(response);

              if (_data.errcode == 0) {
                Indicator.open({
                  text: '正在生成订单...',
                  spinnerType: 'fading-circle',
                });

                _this.msg.productid = _this.ids; //产品id
                _this.msg.product_name = _this.name; //产品名称
                _this.msg.feetype = 'Z'; //服务类型

                _this.msg.bs_type = _this.typeK; //类型key
                _this.msg.bs_name = _this.text; //商标名称
                _this.msg.bs_class = _this.cateK; //类别key
                _this.msg.bs_attachment = _this.attachment; //图形商标
                _this.msg.class_detail = _this.getSelectClass.content,//商标分类
                _this.msg.other_class_fee = _this.getSelectClass.allPriceBs,
                _this.msg.price = _this.price; //单价
                _this.msg.total = _this.price; //总价
                _this.msg.subject = {}; //主体信息
                _this.msg.subject.id = _this.data.corpid; //主体id
                _this.msg.subject.name = _this.data.corpname; //名字
                _this.msg.subject.linkman = _this.data.linkman; //联系人
                _this.msg.subject.phone = _this.data.phone ? _this.data.phone : _this.data.mobile; //联系电话
                _this.msg.subject.email = _this.data.email; //邮箱
                _this.msg.subject.address = _this.data.address; //地址
                let message = JSON.stringify(_this.msg);
                setTimeout(function() {
                  //提交数据
                  _this.$axios
                    .post('index.php?c=App&a=setWishlist', {
                      data: message,
                      sales_code: _this.salesCode,
                    })
                    .then(function(response) {
                        if (response.data.errcode == 0) {
                        _this.id = response.data.content.id;
                        sessionStorage.product = JSON.stringify(response.data.content.product);
                        _this.id = response.data.content.id;

                        _this.$axios
                          .post('index.php?c=App&a=setOrder', {
                            ids: _this.id,
                          })
                          .then(function(response) {
                            Indicator.close();
                            if (response.data.errcode == 0) {
                              let orderId = response.data.content.order_no; //返回的订单id
                              let counter = response.data.content.counter; //返回的订单个数
                              //清除数据
                              sessionStorage.removeItem('appIds');
                              sessionStorage.removeItem('appName');
                              sessionStorage.removeItem('appText');
                              sessionStorage.removeItem('appPrice');
                              sessionStorage.removeItem('appAppPrice');
                              sessionStorage.removeItem('appImgcode');
                                _this.clearTemptData();

                              if (orderId) {
                                window.location.href =
                                  'http://h.huyi.cn/playorder?id=' + orderId + '&price=' + _this.all_price + '&token=' + _this.token;
                              }
                            } else {
                              Toast({
                                message: response.data.errmsg,
                                duration: 2000,
                              });
                            }
                          })
                          .catch(function(error) {
                            Indicator.close();
                            Toast({
                              message: error.data.errmsg,
                              duration: 2000,
                            });
                          });
                      } else {
                        Toast({
                          message: response.data.errmsg,
                          duration: 1500,
                        });
                      }
                    })
                    .catch(function(error) {
                      setTimeout(function() {
                        Indicator.close();
                      }, 10);
                      Toast({
                        message: error.data.errmsg,
                        duration: 3000,
                      });
                    });
                }, 2000);
              } else if (_data.errcode == -1) {
                Toast({
                  message: response.data.errmsg,
                  duration: 1500,
                });
              }
            })
            .catch(function(error) {});
        }, 2000);
      }
    },
    // 选择类别
    choiceQuali() {
      if (this.cater) {
        for (let i = 0; i < this.cater.length; i++) {
          if (this.cateC == this.cater[i].name) {
            this.cateK = this.cater[i].key;
          }
        }
      }
    },
    // 获取类别
    getCater() {
      var _this = this;
      _this.$axios.post('index.php?c=App&a=getBsCategory').then(function(response) {
        if (response.data.errcode == 0) {
          _this.cater = response.data.content;
          _this.cateC = response.data.content[0].name;
          _this.cateK = response.data.content[0].key;
        } else {
          // Toast({
          // 	message: response.data.errmsg,
          // 	duration: 3000
          // });
        }
      });
    },
    //修改类型
    choiceType() {
      var _this = this;
      if (this.typeArr) {
        for (let i = 0; i < this.typeArr.length; i++) {
          if (this.typeN == this.typeArr[i].name) {
            this.typeK = this.typeArr[i].key;
            if (this.typeK == '2') {
              _this.text = '';
            }
          }
        }
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
      _this.$axios.get('index.php?c=App&a=getDzpType').then(function(response) {
        if (response.data.errcode == 0) {
          _this.qualifications = response.data.content;
          _this.qualifications_txt = _this.qualifications[0].name; //默认选中第一个
        } else {
          Toast({
            message: response.data.errmsg,
            duration: 3000,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.msg-img {
  .voucher-case {
    display: inline-block;
    width: 2.3rem;
    background-size: auto 100%;
    height: 2.3rem;
    opacity: 1;
    // float: left;
    position: relative;
    border-radius: 0.08rem;
    .img_minus {
      overflow: hidden;
      height: 100%;
      max-width: 100%;
      border: 1px solid #ccc;
      border-radius: 0.04rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .img-voucher {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100%;
        height: 100%;
        max-width: 100%;
        width: 3rem;
        text-align: center;
      }
    }
  }
}
.containerView-main {
  padding-bottom: 2rem !important;
}
.money-detail {
  width: 100%;
  position: fixed;
    bottom: 1.5rem;
    padding: 0.32rem;
    background: #fff;
  .money-box {
    background: #f7f7f7;
    border-radius: 0.18rem;
    padding: 0.28rem 0.3rem;
    .detail-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #686d7f;
      .detail-left {
        position: relative;
        padding-left: 0.2rem;
        &:after {
          content: '';
          display: inline-block;
          background: #686d7f;
          width: 0.08rem;
          height: 0.08rem;
          border-radius: 5rem;
          position: absolute;
          left: 0;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
    }
  }
}
.register-news-rule {
  justify-content: center;
}
.feekbook-upload {
  background: #fff;
  // padding: 0.42rem 0.32rem;
  // position: absolute;
  width: 100%;
  .upload-til {
    font-size: 0.28rem;
    color: #2c3852;
  }
  .upload-title {
    padding-bottom: 0.2rem;
    padding-top: 0.3rem;
  }
  .upload-msg {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .upload-tips {
    color: #999;
    padding-left: 0.26rem;
    font-size: 0.26rem;
  }
  .voucher-center {
    width: 100%;
    background: #fff;
    left: 0;
    padding-bottom: 0.32rem;
    display: inline-block;
    .voucher-case {
      display: inline-block;
      width: 2.3rem;
      background-size: auto 100%;
      height: 2.3rem;
      // margin-right: 5%;
      opacity: 1;
      float: left;
      position: relative;
      border-radius: 0.08rem;
      // margin-top: 5%;
      .img_minus {
        overflow: hidden;
        height: 100%;
        max-width: 100%;
        border: 1px solid #ccc;
        border-radius: 0.04rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img-voucher {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          width: 100%;
          height: 100%;
          max-width: 100%;
          width: 3rem;
          text-align: center;
          img {
            text-align: center;
            height: 0.48rem;
            margin-top: 0.68rem;
            // margin-bottom: 0.18rem;
          }
          span {
            font-size: 0.24rem;
            color: #999;
            display: block;
            text-align: center;
          }
        }
        .upload-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .del-icon {
        position: absolute;
        z-index: 2;
        top: 0rem;
        right: 0;
        left: 50%;
        width: 0.47rem;
        height: 0.47rem;
        transform: translate(-50%, -50%);
      }
      &:nth-child(3) {
        margin-right: 0;
      }
    }
  }
}
</style>
