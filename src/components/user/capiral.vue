<template>
  <div id="capiral" class="capiral head-capiral">
    <div class="capiral-top">
      <nav-header title="余额"></nav-header>
      <div class="capiral-top-money">
        <div class="capiral-top-word">
          <span>账户余额</span>
        </div>
        <div class="capiral-top-num">
          <span class="capiral-top-moneyN">{{ capiralArr.balance }}</span>
          <span>元</span>
        </div>
      </div>
    </div>
    <div class="capiral-main">
      <div class="capiral-bottom">
        <div class="capiral-detail">
          余额明细
        </div>
        <div class="detail-block">
          <div
            class="detail-list"
            v-for="item in capiralArr.list"
            :key="item.id"
          >
            <div class="detail-top">
              <span class="detail-t-pay">{{ item.type }}</span>
              <span class="detail-t-money">{{ item.money }}元</span>
            </div>
            <div class="detail-bottom">
              <span class="detail-b-order">订单号：{{ item.order_no }}</span>
              <span class="detail-b-num">{{ item.created_time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// $(function() {
//   window.addEventListener("scroll",function() {
//       var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//         console.log(scrollTop,1212)
//       if (scrollTop > 1) {
//         $(".capiral").removeClass("head-capiral");
//         // $('#app .mint-header').css('transition','all .5s');
//       } else {
//         $(".capiral").addClass("head-capiral");
//         // $('#app .mint-header').css('transition','all .5s');
//       }
//     }
//   );
// });
export default {
  name: "capiral",

  data() {
    return {
      headPort: require("@/assets/images/user/support.png"),
      page: 1,
      capiralArr: []
    };
  },
  created() {
    this.getMsg();
  },
  mounted() {
    // window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    // showIcon() {
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //   if(scrollTop >1){
    //     console.log(1232)
    //   }
    // },
    getMsg() {
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getMyCapital", {
          userid: 1,
          p: _this.page
        })
        .then(function(response) {
          _this.capiralArr = response.data.content;
          console.log(_this.capiralArr);
          _this.capiralArr.balance = _this.capiralArr.balance.split(".")[0];
          // _this.capiralArr.list.forEach((item,index) => {
          //     item.money.split('.')[0]
          //     console.log(item,index)
          // });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss"></style>
