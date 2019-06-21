<template>
  <div id="setting" class="setting">
    <nav-header title="设置"></nav-header>
    <div class="setting-block">
        <div class="setting-box">
            <router-link to="/pswSetting">
                <div class="setting-list">
                    <span>密码设置</span>
                </div>
            </router-link>
            <router-link to="/feekbook">

              <div class="setting-list">
                  <span>功能反馈</span>
              </div>
            </router-link>

        </div>
        <div class="setting-box">
          <router-link to="/aboutUs">
            <div class="setting-list">
                <span>关于我们</span>
            </div>
            </router-link>
            <div class="setting-list">
                <span>退出</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting",

  data() {
    return {
      
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    
    getMsg() {
      // let _this = this;
      this.$axios
        .post("", {})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">

</style>
