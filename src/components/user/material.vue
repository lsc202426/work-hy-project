<template>
  <div id="material" class="material">
    <!-- <nav-header title="注册资料管理"></nav-header> -->
    <mt-header title="注册资料管理" class="header" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right" @click="change('0')" v-show="checkAll"
        >选择</mt-button
      > -->
      <!-- <mt-button
        icon="more"
        slot="right"
        @click="change('1')"
        v-show="!checkAll"
        >全选</mt-button
      > -->
    </mt-header>
    <div class="containerView-main" v-if="getMsgArr.length != 0">
      <div class="tips">
      <!-- <div class="tips"> -->
        <div class="tips-box">
          <img src="../../assets/images/user/point.png" alt="">
          <span>长按图片保存到相册</span>
        </div>
      </div>
      <div class="capiral-bottom">
        <div class="capiral-box">
          <ul>
            <li v-for="item in getMsgArr" :key="item.id">
              <input type="checkbox" v-show="!checkAll" />
              <img
                class="mater-img"
                :src="'http://oapi.huyi.cn:6180/' + item.filename"
                alt=""
              />
            </li>
            <!-- <li >
              <input type="checkbox" v-show="!checkAll" />
              <img
                class="mater-img"
                src="../../assets/images/user/audit.png"
                alt=""
              />
            </li>
            <li >
              <input type="checkbox" v-show="!checkAll" />
              <img
                class="mater-img"
                src="../../assets/images/user/aboutUs_logo.png"
                alt=""
              />
            </li>
            <li >
              <input type="checkbox" v-show="!checkAll" />
              <img
                class="mater-img"
                src="../../assets/images/user/head-portairt.png"
                alt=""
              />
            </li>
            <li >
              <input type="checkbox" v-show="!checkAll" />
              <img
                class="mater-img"
                src="../../assets/images/user/pending.png"
                alt=""
              />
            </li> -->
            
          </ul>
        </div>
      </div>
    </div>
    <!-- <a>
      <div class="save-img" @click="saveImg($event)">
        <span>保存到相册</span>
      </div>
    </a> -->
    <blank v-if="getMsgArr.length == 0" style="padding-top: 0rem;"></blank>
  </div>
</template>

<script>
import blank from '@/components/order/blankPage.vue'
export default {
  name: "material",

  data() {
    return {
      checkAll: true,
      page: 1,
      getMsgArr: []
    };
  },
  components:{
    blank
  },
  created() {
    this.getMsg();
  },
  methods: {
    // 保存图片
    saveImg(e) {
      
    },
    // 选中图片
    checkImg() {},
    // 切换选择，全选按钮
    // change(num) {
    //   if (num == "0") {
    //     this.checkAll = false;
    //   } else {
    //     // this.checkAll = true;
    //   }
    // },
    // 获取图片
    getMsg() {
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getAttachments", {
          userid: 1,
          p: _this.page
        })
        .then(function(response) {
          console.log(response.data.content.list);
          _this.getMsgArr = response.data.content.list
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss"></style>
