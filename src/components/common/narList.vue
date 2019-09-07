<template>
    <div class="narlist">
        <ul>
            <li
                v-for="(item, index) in getNarList"
                :key="index"
                :class="{ active: getIsSelect.isSelect === index }"
                @click="change(item, index)"
            >
                <span>{{ item.name.name || item.name }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_NAR_LIST], [GetterTypes.GET_IS_SELECT]]),
        ...mapGetters({
            getNarList: [GetterTypes.GET_NAR_LIST],
            getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_NAR_LIST], [MutationTypes.SET_IS_SELECT]]),
        ...mapMutations({
            [MutationTypes.SET_NAR_LIST]: MutationTypes.SET_NAR_LIST,
            [MutationTypes.SET_IS_SELECT]: MutationTypes.SET_IS_SELECT,
        }),
        change: function(item, index) {
            const that = this;
            let _item = {
                status: item.key,
                isSelect: index,
            };
            that[MutationTypes.SET_IS_SELECT](_item);
        },
    },
};
</script>
