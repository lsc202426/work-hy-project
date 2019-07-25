<template>
  <div class="fill_information">
    <nav-header title=" "></nav-header>
    <mt-header class="header" fixed>
        <mt-button slot="left" icon="back" @click="goback(pageNum)"></mt-button>
        <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="con_box containerView-main">
      <div class="til-word" v-show="pageNum === 0 || pageNum === 1">
        <div class="title" :class="{ active: pageNum == 0 }">申请信息</div>
        <div class="title" :class="{ active: pageNum == 1 }">申请人信息</div>
      </div>
      <div class="list_box" v-if="pageNum === 0">
        <div class="list_item">
          <span>注册词</span>
          <input type="text" readonly="readonly" v-model="text">
        </div>
        <div class="list_item">
          <span>年限</span>
          <select v-model="year" @change="choiceYear()">
            <option :value="index + 1" v-for="(item, index) of 10" :key="index">{{ item }}</option>
          </select>
          <span class="icon_r"></span>
        </div>

        <div class="list_item">
          <span>注册费用</span>
          <span>￥{{ price }}</span>

          <!-- <input type="text" v-model="price"> -->
        </div>
      </div>
      <div class="list_box" v-if="pageNum === 1">
        <!-- <div class="title">
          <span>申请主体</span>
          <router-link to="/addSubject">
            <span class="title-btn">新增主体</span>
          </router-link>
        </div>-->
        <div class="list_item">
          <span>主体名称</span>
          <select v-model="corpname" @change="choiceCorpname()">
            <option
              :value="item.corpname"
              v-for="item in some"
              :key="item.corpid"
            >{{ item.corpname }}</option>
          </select>
          <span class="icon_r"></span>
        </div>
        <div class="list_item">
          <span>联系人</span>
          <input type="text" readonly="readonly" v-model="data.linkman">
        </div>
        <div class="list_item">
          <span>联系电话</span>
          <input type="text" readonly="readonly" v-if="data.phone" v-model="data.phone">
          <input type="text" readonly="readonly" v-else v-model="data.mobile">
        </div>
        <div class="list_item">
          <span>联系邮箱</span>
          <input type="text" readonly="readonly" v-model="data.email">
        </div>
        <div class="list_item">
          <span>详细地址</span>
          <input type="text" readonly="readonly" v-model="data.address">
        </div>
      </div>
      <div class="apply-word" v-if="pageNum == 2">
        <h2 class="apply-msg-title">申请信息</h2>
        <div class="apply-msg">
          <div class="msg-top">
            <div class="msg-list">
              <i>申请品牌名称</i>
              <span>{{ text }}</span>
            </div>
            <div class="msg-list">
              <i>年限</i>
              <span>{{ year }}年</span>
            </div>
          </div>
        </div>
        <h2 class="apply-msg-title">申请人信息</h2>
        <div class="apply-subject">
          <div class="msg-list">
            <i>企业名称</i>
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
            <div v-if="data.mobile" class="msg-list msg-list-rg">
              <i>联系电话</i>
              <span>{{ data.mobile }}</span>
            </div>
            <div v-if="data.email" class="msg-list">
              <i>电子邮箱</i>
              <span>{{ data.email }}</span>
            </div>
          </div>
        </div>
        <div class="money-detail price-list">
          <div class="money-box">
            <div class="detail-list">
              <span class="detail-left">注册费</span>
              <span class="detail-right" v-if="price > 0">{{ price * year }} 元</span>
            </div>
          </div>
        </div>
        <div class="apply-rule">
          <i :class="{ read: isRead }"></i>
          <p>
            我已阅读
            <a href="#">《申请人须知》</a>条款
          </p>
        </div>
      </div>
    </div>
    <div class="money-detail" v-show="pageNum == 0">
      <div class="money-box">
        <div class="detail-list">
          <span class="detail-left">注册费</span>
          <span class="detail-right" v-if="price > 0">{{ price * year }} 元</span>
        </div>
      </div>
    </div>
    <!-- 品牌顾问工号 -->
    <div class="brand-consultant" v-show="pageNum === 2">
      <div class="brand-consultant-top">
        <label>品牌顾问工号</label>
        <input type="text" v-model="salesCode" placeholder="请输入品牌顾问工号">
      </div>
      <p class="brand-consultant-text">品牌顾问工号就是服务您的专属顾问的工号，如果没有，请联系客服专线：400-628-111</p>
    </div>
    <div class="fill_bottom">
      <div class="bottom_l">
        <p>总计 :</p>
        <p class="all_price">￥{{ price * year }}元</p>
      </div>
      <div class="bottom_r">
        <div class="addCard" @click="next(pageNum)" v-show="pageNum == 0">下一步</div>
        <div class="addCard" @click="next(pageNum)" v-show="pageNum == 1">预览</div>
        <div class="addCard-btn" v-show="pageNum == 2">
          <button class="btn-add" @click="addShopCart">加入申请列表</button>
          <button class="btn-apply">去付款</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';

export default {
  name: 'fill_information',
  data() {
    return {
      text: this.$route.query.name, //搜索过来的名字
      year: 1, //年限
      qualifications: [], //资质类型
      qualifications_txt: '', //选中资质类型
      price: this.$route.query.price, //费用
      token: '',
      data: {}, //默认第一条主体数据
      some: [], //所有主体数据
      corpname: '', //主题名字
      length: '',
      all_price: this.$route.query.price, //总计费用
      msg: {}, //加入清单提交内容
      product_name: this.$route.query.product_name, //产品名称
      productid: this.$route.query.productid, //产品id
      pageNum: 0,
      salesCode: '', // 顾问工号
      isRead: false, // 是否阅读申请人须知
    };
  },
  created() {
    this.init(); //请求主题数据
    // this.intell(); //请求资质数据
  },
  methods: {
      // 点击返回
    goback(num) {
        var _this = this;
        if (num == 0) {
            this.$router.back(-1);
            
        } else if (num == 1) {
            _this.pageNum = 0;
        } else if (num == 2) {
            _this.pageNum = 1;
            // _this.getRegist();
        } 
    },
    // 下一步
    next(num) {
      var _this = this;
      if (num == 0) {
        _this.pageNum = 1;
      } else if (num == 1) {
        _this.pageNum = 2;
      }
    },
    // 加入清单
    addShopCart() {
        let _this = this;
        if (_this.salesCode === '') {
            Toast({
                message: '请输入品牌顾问工号',
                duration: 1500,
            });
            return false;
        }
        _this.$axios.post('index.php?c=App&a=checkSalesCode', {
            sales_code: _this.salesCode,
        })
        .then(function(response) {
            let _data = response.data;
            if (_data.errcode === 0) {
                    Indicator.open({
                        text: '正在提交',
                        spinnerType: 'fading-circle',
                    });
                
                _this.msg.productid = _this.productid; //产品id
                _this.msg.product_name = _this.product_name; //产品名称
                _this.msg.keyword = _this.text; //申请词
                _this.msg.year = _this.year; //年限
                _this.msg.feetype = 'Z'; //服务类型
                // _this.msg.params_type=_this.qualifications_txt;//资质类型
                _this.msg.price = _this.price; //单价
                _this.msg.total = _this.all_price; //总价
                _this.msg.subject = {}; //主体信息
                _this.msg.subject.id = _this.data.corpid; //主体id
                _this.msg.subject.name = _this.data.corpname; //名字
                _this.msg.subject.linkman = _this.data.linkman; //联系人
                _this.msg.subject.phone = _this.data.phone ? _this.data.phone : _this.data.mobile; //联系电话
                _this.msg.subject.email = _this.data.email; //邮箱
                _this.msg.subject.address = _this.data.address; //地址
                setTimeout(function() {
                    
                    //提交数据
                    _this.$axios
                    .post('index.php?c=App&a=setWishlist', {
                        data: JSON.stringify(_this.msg),
                    })
                    .then(function(response) {
                        console.log(response.data.content.product)
                        setTimeout(function() {
                            Indicator.close();
                        }, 10);
                        if (response.data.errcode == 0) {
                            Toast({
                                message: response.data.errmsg,
                                duration: 1000,
                            });
                            sessionStorage.product = JSON.stringify(response.data.content.product);
                            
                            console.log(sessionStorage.product)
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
            }
        })
    },
    init() {
      if (sessionStorage.token) {
        this.token = sessionStorage.token;
      }
      let _this = this;
      _this.$axios.post('index.php?c=App&a=getRegisterSubject').then(function(response) {
        if (response.data.errcode == 0) {
          _this.some = response.data.content;
          _this.length = _this.some.length; //总共有多少条主题信息
          _this.data = _this.some[0]; //默认赋值第一条
          _this.corpname = _this.some[0].corpname; //默认赋值第一个主体信息
        } else {
          Toast({
            message: response.data.errmsg,
            duration: 3000,
          });
        }
      });
    },
    //修改年限
    choiceYear() {
      this.all_price = this.year * this.price;
    },
    //修改资质类型
    choiceQuali() {},
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
.money-detail{
    width: 100%;
    .money-box{
        background: #f7f7f7;
        border-radius: 0.18rem;
        padding: 0.28rem 0.3rem;
        .detail-list{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #686d7f;
            .detail-left{
                position: relative;
                padding-left: 0.2rem;
                &:after{
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
.containerView-main{
    padding-bottom: 3rem !important;
}
.apply-word .msg-list-sp .msg-list{
    margin-right: 0.2rem;
}
.apply-msg{
    padding: 0.2rem 0 0.4rem;
}
.apply-subject{
    padding: 0.2rem 0 0.5rem;
}
.apply-msg-title{
    font-weight: bold;
}
.til-word {
  display: flex;
  align-items: center;
  padding-top: 0.32rem;
  .title {
    font-size: 0.26rem;
    color: #6f7181;
    padding-right: 0.52rem;
    white-space: nowrap;
  }
  .active {
    color: #2c3852;
    font-size: 0.44rem;
  }
  .title-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 0;
    a {
      font-size: 0.26rem;
      color: #6f7181;
      line-height: 0.5rem;
      border: 1px solid #0086ff;
      border-radius: 0.5rem;
      display: inherit;
      span {
        color: #0086ff;
        font-size: 0.28rem;
        font-weight: 400;
        padding: 0 0.2rem;
      }
    }
  }
}
</style>

