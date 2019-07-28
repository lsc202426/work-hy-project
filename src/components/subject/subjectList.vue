<template>
    <div class="subjectList head_box">
        <nav-header title=" "></nav-header>
        <div class="subject_list_box containerView-main" v-if="lists && lists.length > 0">
            <div class="subject_con">
                <div class="subject_con_title">申请人列表</div>
                <div class="exp_txt">
                    按照工信部要求，域名申请人必须实名，若未实名会 被注册局暂停解析（Serverhold），请及时实名
                </div>
                <div class="subject_item" v-for="(list, index) in lists" :key="list.id" @click="editDetail(list.id, index)">
                    <div class="subject_item_list">
                        <span>申请人</span>
                        <span
                            >{{ list.corpname }}
                            <img
                                v-if="list.status == 0 || list.status == -1"
                                @click.stop="verifyReal(list.id)"
                                class="icon_verify_go"
                                src="../../assets/images/subject/icon_real_go.png"
                                alt=""
                            />
                            <i v-if="list.status" class="list_status" :class="{ red: list.status == -1 || list.status == 0 }">{{
                                list.status_name
                            }}</i>
                        </span>
                    </div>
                    <div class="subject_item_list">
                        <span>联系人</span>
                        <span>{{ list.linkman }}</span>
                    </div>
                    <div class="subject_item_list">
                        <span>联系电话</span>
                        <span>{{ list.mobile ? list.mobile : list.phone }}<i class="icon_right"></i></span>
                    </div>
                    <div class="subject_item_list">
                        <span>邮箱</span>
                        <span>
                            {{ list.email }}
                            <img
                                v-if="list.verify_email == 0"
                                @click.stop="verifyEmail(list.id, list.email)"
                                class="icon_verify_go"
                                src="../../assets/images/subject/icon_verify_go.png"
                                alt=""
                            />
                            <i v-if="list.verify_email" class="list_status" :class="{ red: list.status == -1 || list.status == 0 }">{{
                                list.verify_email_name
                            }}</i>
                            <!-- <img
							    v-if="list.verify_email == 0"
							    class="icon_verify"
							    src="../../assets/images/subject/icon_verify_w.png"
							    alt=""
							/>
							<img v-else class="icon_verify" src="../../assets/images/subject/icon_verify_y.png" alt="" /> -->
                        </span>
                    </div>
                    <div class="subject_item_list">
                        <span>详细地址</span>
                        <span>{{ list.address }}</span>
                    </div>
                    <!-- <div class="subject_item_list">
                        <span>审核状态</span>
                        <span
                            :class="{
                                status_d: list.status_name == '待审核',
                                status_y: list.status_name == '已审核',
                                status_w: list.status_name == '未通过',
                            }"
                            >{{ list.status_name }}</span
                        >
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 暂无数据 -->
        <blankPage v-else></blankPage>
        <div class="add_subject_box" :class="{ gray_bg: lists.length <= 0 }">
            <div class="add_subject" @click="addSubject()">
                新增主体
            </div>
        </div>
    </div>
</template>

<script>
import blankPage from '@/components/order/blankPage.vue';
import * as GetterTypes from '@/constants/GetterTypes';
import * as MutationTypes from '@/constants/MutationTypes';
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: 'subjectList',
    data() {
        return {
            lists: [],
        };
    },
    components: {
        blankPage,
    },
    created() {
        this.init();
    },
    computed: {
        ...mapGetters([[GetterTypes.GET_DZP_APPLY_INFO], [GetterTypes.GET_TMD_APPLY_INFO]]),
        ...mapGetters({
            dzpApplyInfo: [GetterTypes.GET_DZP_APPLY_INFO],
            tmdApplyInfo: [GetterTypes.GET_TMD_APPLY_INFO],
        }),
    },
    methods: {
        ...mapMutations([[MutationTypes.SET_DZP_APPLY_INFO], [MutationTypes.SET_TMD_APPLY_INFO]]),
        ...mapMutations({
            [MutationTypes.SET_DZP_APPLY_INFO]: MutationTypes.SET_DZP_APPLY_INFO,
            [MutationTypes.SET_TMD_APPLY_INFO]: MutationTypes.SET_TMD_APPLY_INFO,
        }),
        init() {
            let _this = this;
            _this.$axios.post('index.php?c=App&a=getRegisterSubject').then(function(response) {
                if (response.data.errcode == 0) {
                    _this.lists = response.data.content;
                }
            });
        },
        //添加主体
        addSubject() {
            this.$router.push({
                path: '/addSubject',
            });
        },
        //编辑主体
        editDetail(id, i) {
            if (sessionStorage.formUrl) {
                sessionStorage.subject = JSON.stringify(this.lists[i]);
                // 如果是点招聘
                if (sessionStorage.formUrl === '/dzpinfor') {
                    this.dzpApplyInfo.applicant = this.lists[i];
                    this[MutationTypes.SET_DZP_APPLY_INFO](this.dzpApplyInfo);
                } else if (sessionStorage.formUrl === '/fillProduct') {
                    this.tmdApplyInfo.applicant = this.lists[i];
                    this[MutationTypes.SET_DZP_APPLY_INFO](this.tmdApplyInfo);
                }
                this.$router.push({
                    path: sessionStorage.formUrl,
                });
            } else {
                this.$router.push({
                    path: '/addSubject',
                    query: {
                        id: id,
                    },
                });
            }
        },
        //验证邮箱
        verifyEmail(id, email) {
            this.$router.push({
                path: '/verifyEmail',
                query: {
                    id: id,
                    email: email,
                },
            });
        },
        //实名验证
        verifyReal(id, real) {
            this.$router.push({
                path: '/realName',
                query: {
                    id: id,
                },
            });
        },
    },
};
</script>

<style></style>
