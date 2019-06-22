<template>
  <div class="nav_botton">
    <div
      v-for="(item, index) in icons"
      :id="item.id"
      :key="index"
      @click="swictNav(item)"
      class="nav_botton_list"
    >
      <img
        class="nav_botton_list_img"
        :src="item.src"
        v-show="item.id !== getMenuShow"
      />
      <img
        class="nav_botton_list_img"
        :src="item.src1"
        v-show="item.id === getMenuShow"
      />
      <label
        class="nav_botton_list_text"
        :class="{ active: item.id === getMenuShow }"
        >{{ item.text }}</label
      >
    </div>
  </div>
</template>

<script>
import * as GetterTypes from "@/constants/GetterTypes";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      icons: [
        {
          id: "index",
          text: "首页",
          src: require("@/assets/images/navBotton/icon_index1.png"),
          src1: require("@/assets/images/navBotton/icon_index2.png")
        },
        {
          id: "informat",
          text: "资讯",
          src: require("@/assets/images/navBotton/icon_look1.png"),
          src1: require("@/assets/images/navBotton/icon_look2.png")
        },
        {
          id: "message",
          text: "消息",
          src: require("@/assets/images/navBotton/icon_mail1.png"),
          src1: require("@/assets/images/navBotton/icon_mail2.png")
        },
        {
          id: "user",
          text: "我的",
          src: require("@/assets/images/navBotton/icon_me1.png"),
          src1: require("@/assets/images/navBotton/icon_me2.png")
        }
      ]
    };
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_MENU_SHOW]]),
    ...mapGetters({
      getMenuShow: [GetterTypes.GET_MENU_SHOW]
    })
  },
  methods: {
    swictNav: function(item) {
      let val = item.id;
      switch (val) {
        case "index":
          this.$router.push("/");
          break;
        case "informat":
          this.$router.push("/informat");
          break;
        case "message":
          this.$router.push("/message");
          break;
        case "user":
          this.$router.push("/user");
          break;
      }
    }
  }
};
</script>
