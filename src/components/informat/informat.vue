<template>
  <div class="informat">
    <!-- head -->
    <nav-header title="资讯"></nav-header>
    <div class="informat-box">

        <div class="informat-list" v-for="item in contArr" @click="urlGo(item.url)">

            <div class="bg-left" :style="{backgroundImage: 'url(' +'http://oapi.huyi.cn:6180/'+ item.img + ')'}">
            </div>

            <div class="right">
                <p class="title">{{item.title}}</p>
                <p class="msg">{{item.summary}}</p>
                <div class="bottom">
                    <span class="date">{{item.created_time}}</span>
                    <div class="bot-right">
                        <img src="../../assets/images/informat/read.png" alt="">
                        <span>1125</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav-botton></nav-botton>

  </div>
</template>

<script>
export default {
  name: "informat",
  data() {
    return {
      bg: require("@/assets/images/user/capiral.png"),
      contArr: []
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    // 点击跳转
    urlGo(url){
      location.href = url;
    },
    getMsg(){
      console.log(123)
      let _this = this;
      this.$axios
        .post("index.php?c=App&a=getNews", {
          userid: 1
        })
        .then(function(response) {

          console.log(response);
          _this.contArr = response.data.content.list
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  
};
</script>
