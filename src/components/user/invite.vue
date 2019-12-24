<template>
    <div id="invite">
        <nav-header title="推荐好友"></nav-header>
        <div class="invite-box">
            <div class="invite-list">
                <span>客户名称</span>
                <input type="text" placeholder="请输入客户名称" v-model="name" />
            </div>
            <div class="invite-list">
                <span>联系电话</span>
                <input type="text" placeholder="请输入联系电话" v-model="phone" />
            </div>
            <div class="invite-list">
                <span>联系邮箱</span>
                <input type="text" placeholder="请输入邮箱" v-model="email" />
            </div>
            <div class="invite-list">
                <span>微信</span>
                <input type="text" placeholder="请输入微信号" v-model="weixin" />
            </div>
            <div class="invite-btn">
                <span @click="inviteBtn()">确定</span>
                <p>
                    <router-link to="/integral">我的积分</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    name: 'invite',

    data() {
        return {
            name: '',
            phone: '',
            email: '',
            weixin: '',
        };
    },
    created() {},
    mounted() {},
    methods: {
        inviteBtn() {
            var _this = this;
            if (_this.name == '') {
                Toast({
                    message: '请输入客户名称',
                    duration: 3000,
                });
                return;
            }
            if (_this.phone == '') {
                Toast({
                    message: '请输入联系电话',
                    duration: 3000,
                });
                return;
            }
            _this.$axios
                .post('index.php?c=App&a=setInviteUser', {
                    name: _this.name,
                    phone: _this.phone,
                    email: _this.email,
                    weixin: _this.weixin,
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                        setTimeout(() => {
                            _this.$router.push('/user');
                        }, 3000);
                    } else if (response.data.errcode == '-1') {
                        Toast({
                            message: response.data.errmsg,
                            duration: 3000,
                        });
                    }
                })
                .catch(function(error) {});
        },
    },
};
</script>

<style lang="scss">
#invite {
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
    p {
        font-size: 0.28rem;
        text-align: center;
        padding-top: 0.32rem;
        a {
            color: #0086ff;
        }
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
            border: none;
            font-size: 0.3rem;
        }
    }
}
</style>
