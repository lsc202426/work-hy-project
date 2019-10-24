<template>
    <div class="narlist" id="nar">
        <ul id="nar-list">
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
import $ from 'jquery';
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            [GetterTypes.GET_NAR_LIST],
            // [GetterTypes.GET_IS_SELECT]
        ]),
        ...mapGetters({
            getNarList: [GetterTypes.GET_NAR_LIST],
            // getIsSelect: [GetterTypes.GET_IS_SELECT],
        }),
        getIsSelect: function() {
            let isSelect = this.$store.state.isSelect;
            this.$nextTick(() => {
                if (isSelect.isSelect) {
                    let num = isSelect.isSelect;
                    // 获取父元素div的实际宽度
                    let nar = $('#nar').width() / 2;
                    // 获取子元素li的世界宽度（content）
                    let lw =
                        $('#nar-list')
                            .children('li')
                            .width() / 2;
                    // 获取当前选项到左边的距离
                    let lf = document.getElementById('nar-list').children[num].offsetLeft;
                    // 获取父元素距离左边的宽度
                    let pw = document.getElementById('nar-list').offsetLeft / 2;
                    // 求值
                    let sc_left = lf + lw - nar - pw;
                    $('#nar-list').scrollLeft(sc_left);
                }
            });

            return isSelect;
        },
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
