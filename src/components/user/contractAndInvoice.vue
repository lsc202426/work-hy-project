<template>
    <div id="setting" class="setting">
        <nav-header title="合同与发票" gobackurl="/user"></nav-header>
        <div class="setting-block">
            <div class="setting-box">
                <router-link to="/contractList">
                    <div class="setting-list">
                        <span>申领合同</span>
                    </div>
                </router-link>
                <router-link to="/issueInvoiceList">
                    <div class="setting-list">
                        <span>开具发票</span>
                    </div>
                </router-link>
            </div>
            <div class="setting-box">
                <router-link :to="{path:'/contractList',query:{past:'past'}}">
                    <div class="setting-list">
                        <span>历史合同</span>
                    </div>
                </router-link>
                <router-link :to="{path:'/issueInvoiceList',query:{past:'past'}}">
                    <div class="setting-list">
                        <span>历史发票</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contractAndInvoice',
    data() {
        return {};
    },
    created() {
    },
    methods: {
        goback(){
            this.$router.push({
                path: '/user',
            });
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
};
</script>
