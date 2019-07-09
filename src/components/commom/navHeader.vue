<template>
  <mt-header :title="title" class="header" fixed>
    <mt-button slot="left" icon="back" @click="goback"></mt-button>
    <mt-button slot="right"></mt-button>
  </mt-header>
</template>

<style>
#app .mint-header {
  background-color: #fff;
  height: 0.9rem;
  border-bottom: 1px solid #f1f1f1;
}
#app .mint-header-title {
  color: #2c3852;
  font-family: PingFangHK-Regular;
  font-size: 0.32rem;
}
#app .mint-header-button.is-left {
  color: #2c3852;
}
#app .mint-header .mint-button {
  padding-left: 4px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  //声明接受父组件参数
  // props: ["title"],
  props:{
      title: '', // 标题内容
      gobackurl: ''
  },
  methods: {
        goback(){
					if(sessionStorage.payMade){
						sessionStorage.removeItem('payMade');
					}
          if(this.gobackurl){
            this.$router.push({
              path: this.gobackurl
            })
          }else{
            this.$router.go(-1)
          }
        }
    }
};
</script>
