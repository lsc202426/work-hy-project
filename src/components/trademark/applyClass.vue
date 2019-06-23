<template>
  <div class="apply-class">
    <!-- head -->
    <nav-header title="申请类别"></nav-header>
    <div class="apply-class-main bscroll" ref="bscroll">
      <ul class="bscroll-container">
        <li v-for="(item, index) in 20">{{ index }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      classType: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      let bscrollDom = this.$refs.bscroll;
      this.aBScroll = new BScroll(bscrollDom, {});
    });
  },
  methods: {
    getClassType: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getBsClass", { userid: 1 })
        .then(function(response) {
          console.log(response);
          that.classType = response.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getClassType();
  }
};
</script>
