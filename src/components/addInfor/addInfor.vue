<template>
    <div class="add-infor">
        <mt-header class="header" title="补充资料" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="main containerView-main">
            <div class="tips">
                <p v-if="material.tips" v-html="material.tips.replace('\\n', '<br /><br />')"></p>
            </div>
            <div class="main-apply-list">
                <h2>申请人信息</h2>
                <div class="main-apply-list-item">
                    <p>{{ material.name }}</p>
                    <span class="unre-viewed">{{ material.status_name }}</span>
                </div>
                <div class="main-apply-list-item rbg" v-if="parseInt(material.corp_supply) === 1" @click="realName">
                    <p>去实名</p>
                </div>
                <div class="main-apply-list-item rbg" v-if="parseInt(material.verify_email) === 0" @click="verifyEmail">
                    <p>验证邮箱</p>
                </div>
            </div>
            <div class="main-apply-list">
                <h2>产品</h2>
                <div
                    class="main-apply-list-item rbg f_tar"
                    v-for="(item, index) in material.products"
                    :key="index"
                    @click="goAddInfor(item)"
                >
                    <p>{{ item.keyword }}</p>
                    <span class="f_tar_s">{{ item.material_status_name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderId: this.$route.query.id,
            tips: '',
            material: {},
        };
    },
    created() {
        this.getMaterialIndex();
        // 清除点商标存储信息
        if (sessionStorage.addTmd) {
            sessionStorage.removeItem('addTmd');
        }
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        //返回
        goback() {
            if (sessionStorage.backUrl == 'orderdetails') {
                this.$router.push({
                    path: '/orderdetails',
                    query: {
                        id: this.orderId,
                    },
                });
                sessionStorage.removeItem('backUrl');
            } else {
                this.$router.push({
                    path: '/orderList',
                });
            }
        },
        // 获取补充资料信息
        getMaterialIndex: function() {
            const that = this;
            that.$axios
                .post('/index.php?c=App&a=getMaterialIndex', {
                    order_no: that.orderId,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.material = _data.content;
                    }
                });
        },
        // 去补充资料
        goAddInfor: function(item) {
            if (item.mark === 'tmd') {
                this.$router.push({
                    path: '/addInfoTmd',
                    query: { mark: item.mark, itemid: item.itemid, orderId: this.orderId },
                });
            } else {
                this.$router.push({
                    path: '/addInforDetail',
                    query: { mark: item.mark, itemid: item.itemid, orderId: this.orderId },
                });
            }
        },
        // 实名
        realName: function() {
            this.$router.push({
                path: '/realName',
                query: {
                    id: this.material.id,
                    path: this.$route.path,
                    orderId: this.orderId,
                },
            });
        },
        //邮箱
        verifyEmail: function() {
            this.$router.push({
                path: '/verifyEmail',
                query: {
                    id: this.material.id,
                    email: this.material.email,
                    path: this.$route.path,
                    orderId: this.orderId,
                },
            });
        },
    },
};
</script>
