<template>
  <div class="narlist">
    <ul>
      <li
        v-for="item in getNarList"
        :key="item.id"
        :class="{ active: selectedId === item.id }"
        @click="change(item)"
      >
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import * as GetterTypes from "@/constants/GetterTypes";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedId: 0
    };
  },
  computed: {
    ...mapGetters([[GetterTypes.GET_NAR_LIST]]),
    ...mapGetters({
      getNarList: [GetterTypes.GET_NAR_LIST]
    })
  },
  methods: {
    change: function(item) {
      this.selectedId = item.id;
    }
  }
};
</script>
