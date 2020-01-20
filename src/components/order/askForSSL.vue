<template>
    <div class="askForSSL" id="askForSSL">
        <nav-header :title="titleText"></nav-header>
        <div class="invite-box">
            <div class="invite-list">
                <span>单位名称</span>
                <input type="text" :readonly="is_ssl == 1" placeholder="请输入单位名称" v-model="company" />
            </div>
            <div class="invite-list">
                <span>联系人</span>
                <input type="text" :readonly="is_ssl == 1" placeholder="请输入联系人" v-model="name" />
            </div>
            <div class="invite-list">
                <span>联系电话</span>
                <input type="text" :readonly="is_ssl == 1" placeholder="请输入联系电话" v-model="phone" />
            </div>
            <div class="invite-list">
                <span>联系邮箱</span>
                <input type="text" :readonly="is_ssl == 1" placeholder="请输入联系邮箱" v-model="email" />
            </div>
            <div class="invite-btn" v-if="is_ssl != 1">
                <span @click="askBtn()">提交</span>
            </div>
        </div>
    </div>
</template>

<script>
import * as MutationTypes from '@/constants/MutationTypes';
import { mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
import * as utils from '@/utils/index';
export default {
    name: 'askForSSL',
    data() {
        return {
            company: '',
            name: '',
            phone: '',
            email: '',
            is_ssl: this.$route.query.is_ssl,
            keyword: this.$route.query.keyword,
            titleText: this.$route.query.is_ssl == 1 ? 'SSL证书' : '申请SSL证书',
        };
    },
    created() {
        if (this.is_ssl && this.is_ssl == 1) {
            this.$axios
                .post('index.php?c=App&a=getSsl', {
                    domain: this.keyword,
                })
                .then(res => {
                    let data = res.data;
                    if (data.errcode == 0) {
                        let content = data.content;
                        this.company = content.corpname;
                        this.name = content.linkman;
                        this.phone = content.phone;
                        this.email = content.email;
                    }
                });
        }
    },
    mounted() {},
    methods: {
        ...mapMutations([[MutationTypes.SET_IS_SELECT]]),
        ...mapMutations({
            [MutationTypes.SET_IS_SELECT]: MutationTypes.SET_IS_SELECT,
        }),
        askBtn() {
            let textTips = '';
            if (this.company == '') {
                textTips = '请输入单位名称';
            } else if (this.name == '') {
                textTips = '请输入联系人';
            } else if (this.phone == '') {
                textTips = '请输入联系电话或手机号';
            } else if (!utils.isPhone(this.phone)) {
                return false;
            } else if (this.email == '') {
                textTips = '请输入电子邮箱';
            } else if (!utils.isEmail(this.email)) {
                return false;
            }
            if (textTips) {
                Toast({
                    message: textTips,
                    duration: 2000,
                });
                return false;
            } else {
                this.$axios
                    .post('index.php?c=App&a=setSsl', {
                        domain: this.keyword,
                        corpname: this.company,
                        linkman: this.name,
                        phone: this.phone,
                        email: this.email,
                    })
                    .then(res => {
                        let data = res.data;
                        if (data.errcode == 0) {
                            Toast({
                                message: res.data.errmsg,
                                duration: 2000,
                            });
                            setTimeout(() => {
                                let _value = {};
                                this.$router.push({
                                    path: '/orderlist',
                                });
                                _value = {
                                    isSelect: 5,
                                    status: 4,
                                };
                                this[MutationTypes.SET_IS_SELECT](_value);
                            }, 2000);
                        }
                    });
            }
        },
    },
};
</script>

<style lang="scss">
.askForSSL {
    height: 100%;
}
.invite-btn {
    padding-top: 0.72rem;
    span {
        background: linear-gradient(131deg, rgba(15, 179, 254, 1) 0%, rgba(0, 134, 255, 1) 100%);
        color: #fff;
        border-radius: 0.5rem;
        width: 100%;
        display: inline-block;
        text-align: center;
        padding: 0.24rem 0;
        font-size: 0.34rem;
    }
}
.invite-box {
    padding: 0 0.34rem;
    .invite-list {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        font-size: 0.3rem;
        padding: 0.34rem 0;
        span {
            flex: none;
            width: 1.68rem;
            color: #2c3852;
        }
        input {
            flex: auto;
            width: 100%;
            border: none;
            font-size: 0.3rem;
        }
    }
}
</style>
