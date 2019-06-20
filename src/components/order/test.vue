<template>
  <div class="login">
    登陆
  </div>
</template>

<script>
import * as GetterTypes from "@/constants/GetterTypes";
import * as MutationTypes from "@/constants/MutationTypes";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {};
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_IS_SHOW]]),
    ...mapGetters({
      getIsShow: [GetterTypes.GET_IS_SHOW]
    })
  },
  methods: {
    ...mapMutations([[MutationTypes.SET_IS_SHOW]]),
    ...mapMutations({
      [MutationTypes.SET_IS_SHOW]: MutationTypes.SET_IS_SHOW
    })
  }
};
</script>
