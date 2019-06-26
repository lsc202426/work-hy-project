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
          <select v-model="cateC" @change="choiceQuali()">
					    <option :value="item.name" v-for="(item,index) in cater" :key="item.key">{{item.name}}</option>
          </select>
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
      <div class="feekbook-upload">
        <p class="upload-til">上传附件</p>
        <p class="upload-til upload-tips">请点击上传商标证书图片</p>
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
                  <span>上传图片</span>
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
    </div>
    <div class="fill_bottom">
      <div class="bottom_l">
        <p>总计 :</p>
        <p class="all_price">￥320.00元</p>
      </div>
      <div class="bottom_r" @click="addCard()">
        <div class="addCard">加入清单</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
import { Toast,Indicator } from "mint-ui";

export default {
  name: "fill_information",
  data() {
    return {
      text: '', //搜索过来的名字
      name: this.$route.query.product_name, //搜索过来的名字
      ids: this.$route.query.productid, //搜索过来的名字
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
      typeN: 0,
      cater: [],
      cateC: '',
      cateK: '',
      msg:{},//加入清单提交内容
      imgArr: []

    };
  },
  created() {
    this.init(); //请求主题数据
    // this.intell(); //请求资质数据
    this.getCater();
  },
  methods: {
    init() {
      // console.log(this.ids)
      if (sessionStorage.token) {
        this.token = sessionStorage.token;
      }
      var _this = this;
      // console.log(_this.token);
      // 获取主体名称
      _this.$axios
        .post("index.php?c=App&a=getRegisterSubject")
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
      // if (_this.imgArr.length == 3) {
      //   Toast({
      //     message: "上传凭证不可超过3张",
      //     duration: 3000
      //   });
      //   return;
      // }
      var files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = function() {
        // console.log(imgcode); //这个就是base64编码
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
            console.log(error);
          });
      };
    },
    /* submitMsg() {
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
          console.log(error);
        });
    }, */
    //加入清单
			addCard(){
        let _this=this;
        if(_this.text == ''){
          Toast({
            message: "请输入商标名称",
            duration: 3000
          });
          return ;
        }

				if(this.token){
					setTimeout(function(){
						Indicator.open({
							text: '正在提交',
							spinnerType: 'fading-circle'
						});
					},10);
					_this.msg.productid=_this.ids;//产品id
					_this.msg.product_name=_this.name;//产品名称
					// _this.msg.keyword=_this.text;//申请词
					// _this.msg.year=1;//年限
          _this.msg.feetype='Z';//服务类型

          _this.msg.bs_name = _this.text;
          _this.msg.bs_class = _this.cateK;
          _this.msg.bs_attachment = _this.imgArr;
					// _this.msg.params_type=_this.qualifications_key;//资质类型
					_this.msg.price=_this.price;//单价
					_this.msg.total=_this.price;//总价
					_this.msg.subject={};//主体信息
					_this.msg.subject.id=_this.data.corpid;//主体id
					_this.msg.subject.name=_this.data.corpname;//名字
					_this.msg.subject.linkman=_this.data.linkman;//联系人
					_this.msg.subject.phone=_this.data.phone?_this.data.phone:_this.data.mobile;//联系电话
					_this.msg.subject.email=_this.data.email;//邮箱
					_this.msg.subject.address=_this.data.address;//地址
					let message=JSON.stringify(_this.msg);
					// console.log(message);
					//提交数据
					_this.$axios
					  .post("index.php?c=App&a=setWishlist",{
						  data:message
					  })
					  .then(function(response) {
						setTimeout(function(){
							Indicator.close();
						},10);
					    if (response.data.errcode == 0) {
							Toast({
								message: response.data.errmsg,
								duration: 1000
							});
							setTimeout(function(){
								//请求成功跳转清单列表页
								_this.$router.push({
									path: '/shoppingCart'
								});
							},1000)
					    }else{
							Toast({
								message: response.data.errmsg,
								duration: 1500
							});
						}
					  })
					  .catch(function(error) {
						setTimeout(function(){
							Indicator.close();
						},10);
					    Toast({
					      message: error.data.errmsg,
					      duration: 3000
					    });
					  });
				}
				
			},
    // 选择类别
    choiceQuali(){
				// console.log(this.cateC);
				if(this.cater){
					for(let i=0;i<this.cater.length;i++){
						if(this.cateC==this.cater[i].name){
              this.cateK=this.cater[i].key;
              
						}
					}
				}
				// console.log(this.cateK);
      },
      // 获取类别
    getCater(){
      var _this = this;
      _this.$axios
        .post("index.php?c=App&a=getBsCategory")
        .then(function(response) {
          // console.log(response.data)
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
      // console.log(this.typeN);
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
<style lang="scss" scoped>
.feekbook-upload{
    background: #fff;
    // padding: 0.42rem 0.32rem;
    // position: absolute;
    width: 100%;
    .upload-til{
        font-size: 0.28rem;
        color: #2C3852;
    }
    .upload-tips{
      color: #999;
    }
    .voucher-center{
        width: 100%;
        background: #fff;
        left: 0;
        padding-bottom: 0.32rem;
        display: inline-block;
        .voucher-case{
            display: inline-block;
            width: 1.9rem;
            background-size: auto 100%;
            height: 2.6rem;
            margin-right: 5%;
            opacity: 1;
            float: left;
            position: relative;
            border-radius: 0.08rem;
            margin-top: 5%;
            .img_minus{
                overflow: hidden;
                height: 100%;
                max-width: 100%;
                border: 1px solid #ccc;
                border-radius: 0.04rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .img-voucher{
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: cover;
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                    width: 3rem;
                    text-align: center;
                    img{
                        text-align: center;
                        height: 0.48rem;
                        margin-top: 0.76rem;
                        margin-bottom: 0.18rem;

                    }
                    span{
                        font-size: 0.24rem;
                        color: #999;
                        display: block;
                        text-align: center;
                    }
                }
                .upload-img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
            .del-icon{
                position: absolute;
                z-index: 2;
                top: 0rem;
                right: 0;
                left: 50%;
                width: 0.47rem;
                height: 0.47rem;
                transform: translate(-50%, -50%);
            }
            &:nth-child(3){
                margin-right: 0;
            }
        }
    }
}
</style>


